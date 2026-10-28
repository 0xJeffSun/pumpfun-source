#!/usr/bin/env python3
"""Build research/amm-boost-transfer-fee-20261028 receipts.

boost_buy_and_burn under transfer fees, pinned at runtime:
- the no-fee boost spends 10^9 quote from the boost vault
  ATA, adds 10^9 to the quote vault, and draws
  5,391,870,655,895 base from the base vault (burned);
- a quote fee is withheld on the vault transfer: 1% leaves
  990,000,000 in the quote vault and 5,338,379,201,831 base
  drawn; 50% leaves 500,000,000 and 2,706,767,012,738;
- a 100% quote fee fails 6002 ZeroQuoteAmount at
  boost.rs:255, because the net quote is zero;
- a base fee is invisible to the burn: 1% and 50% base fees
  give byte-identical results to the no-fee case, because
  burning is not a transfer;
- the slippage floor is fee-VISIBLE, unlike buy_exact's
  gross-based floor: a 1% fee case with the floor set to
  the no-fee exact output fails 6004 ExceededSlippage at
  boost.rs:274, because the net base output is smaller.
"""
import base64
import gzip
import hashlib
import json
import struct
import sys
from pathlib import Path

import os
sys.path.insert(0, str(Path.home() / "workspace/pumpfun-sparse/scripts"))
os.chdir(Path.home() / "workspace/pumpfun-sparse")
from solders.account import Account
from solders.clock import Clock
from solders.instruction import AccountMeta, Instruction
from solders.pubkey import Pubkey
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata

from pump_amm_admin_differential import Harness
from pump_amm_liquidity_differential import (
    EVENT, IDL, PAYER, PROGRAM, TOKEN, TOKEN22,
    f, mutate, pool, poolraw, quote, token,
)
from pump_amm_admin_differential import OUTSIDER
from pump_amm_boost_burn_differential import BOOST, BOOST_ATA, boost_transferfee
from pump_amm_liquidity_differential import CONFIG, CONFIG_KEY, RAW, base, vaultbase, vaultquote

ROOT = Path.home() / "workspace/pumpfun-sparse"
OUT = ROOT / "research/amm-boost-transfer-fee-20261028"
WS = Path.home() / "workspace/slop-verify"
ATA = Pubkey.from_string('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')

IMAGES = {
    "original": ROOT / "evidence/original/pump_amm/deployed.so",
    "control": WS / "control.so",
    "candidate": WS / "candidate.so",
}
IMAGE_SHA = {
    "original": "6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7",
    "control": "7a300434dced61413bde10788594b427d5649563e0223efcf09e6b214aff7ad3",
    "candidate": "d17a657baf5cc19736a924c41e75424604411ddbe9f6e72cddf41ab72a695007",
}
FEES_SHA = hashlib.sha256((ROOT / "evidence/original/pump_fees/deployed.so").read_bytes()).hexdigest()

# (label, limit, tf, expected)
# tf: None | ("base"/"quote", bps, maximum)
# expected: ("boost", vaultquote_delta, vaultbase_delta, boost_ata_spent) |
#           ("error", code, fragment)
CASES = [
    ("boost-nofee", 0, None, ("boost", 10**9, -5391870655895, 10**9)),
    ("boost-quote-tf100", 0, ("quote", 100, 2**64 - 1), ("boost", 990000000, -5338379201831, 10**9)),
    ("boost-quote-tf5000", 0, ("quote", 5000, 2**64 - 1), ("boost", 500000000, -2706767012738, 10**9)),
    ("boost-quote-tf10000", 0, ("quote", 10000, 2**64 - 1), ("error", "6002", "ZeroQuoteAmount")),
    ("boost-base-tf100", 0, ("base", 100, 2**64 - 1), ("boost", 10**9, -5391870655895, 10**9)),
    ("boost-base-tf5000", 0, ("base", 5000, 2**64 - 1), ("boost", 10**9, -5391870655895, 10**9)),
    ("boost-nofee-limit-plus1", 5391870655896, None, ("error", "6004", "ExceededSlippage")),
    ("boost-quote-tf100-limit-nofee-exact", 5391870655895, ("quote", 100, 2**64 - 1), ("error", "6004", "ExceededSlippage")),
]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def snap(vm, keys):
    out = {}
    for k in keys:
        a = vm.get_account(k)
        out[str(k)] = {"owner": str(a.owner), "lamports": a.lamports,
                       "executable": a.executable, "data_hex": a.data.hex()} if a else None
    return out


def amount_at(data_hex, offset):
    return struct.unpack_from("<Q", bytes.fromhex(data_hex), offset)[0]


receipts_global = []
report_cases = []
for index, (label, limit, tf, expected) in enumerate(CASES):
    ix = next(x for x in IDL["instructions"] if x["name"] == "boost_buy_and_burn")
    keys = [pool, PAYER.pubkey(), CONFIG_KEY, base, quote, vaultbase, vaultquote,
            BOOST, BOOST_ATA, TOKEN, TOKEN, EVENT, PROGRAM]
    row = {"case": {"instruction": "boost_buy_and_burn", "label": label,
                    "amount": 10**9, "limit": limit,
                    "tf": list(tf) if tf else None,
                    "expected": list(expected)}}
    pairs = set()
    for image in ("original", "control", "candidate"):
        h = Harness(IMAGES[image])
        vm = h.vm
        vm.set_clock(Clock(100, 1234567890, 0, 0, 1234567890))
        for pid, n in ((TOKEN, 'spl_token'), (TOKEN22, 'spl_token_2022'), (ATA, 'associated_token')):
            vm.add_program_from_file(pid, str(ROOT / 'evidence/dependencies' / n / 'deployed.so'))
        for rrow in f["accounts"].values():
            vm.set_account(Pubkey.from_string(rrow["address"]),
                           Account(rrow["lamports"], base64.b64decode(rrow["data_base64"]),
                                   Pubkey.from_string(rrow["owner"])))
        raw = bytearray(RAW)
        raw[907:939] = bytes(PAYER.pubkey())
        raw[939] = 1
        vm.set_account(CONFIG_KEY, Account(CONFIG["lamports"], bytes(raw), PROGRAM))
        mutate(pool, 245, (10**9).to_bytes(16, 'little', signed=True))(h, [])
        vm.set_account(BOOST, Account(10**9, b"", Pubkey.default()))
        vm.set_account(BOOST_ATA, Account(10**12 + 2039280, token(quote, BOOST, 10**12, True), TOKEN))
        metas = [AccountMeta(k, bool(a.get("signer")), bool(a.get("writable")))
                 for k, a in zip(keys, ix["accounts"])]
        if tf is not None:
            _KEYS = {"base": base, "quote": quote}
            boost_transferfee(_KEYS[tf[0]], tf[1], tf[2])(h, metas)
        data = bytes(ix["discriminator"]) + struct.pack("<QQ", 10**9, limit)
        before_keys = sorted({str(m.pubkey) for m in metas} | {str(PAYER.pubkey())}, key=str)
        before = snap(vm, [Pubkey.from_string(k) for k in before_keys])
        tx = Transaction.new_signed_with_payer(
            [Instruction(PROGRAM, data, metas)], PAYER.pubkey(), [PAYER], vm.latest_blockhash())
        raw_tx = bytes(tx)
        checks = tx.verify_with_results()
        assert checks and all(checks), "new transaction must verify"
        r = vm.send_transaction(tx)
        failed = isinstance(r, FailedTransactionMetadata)
        meta = r.meta() if failed else r
        after = snap(vm, [Pubkey.from_string(k) for k in before_keys])
        err = str(r.err()) if failed else None
        logs = meta.logs()
        payer_key = str(PAYER.pubkey())
        payer_delta = before[payer_key]["lamports"] - after[payer_key]["lamports"]
        observed = {}
        if expected[0] == "boost":
            assert not failed and err is None, (label, image, err)
            vq_delta = amount_at(after[str(vaultquote)]["data_hex"], 64) - amount_at(before[str(vaultquote)]["data_hex"], 64)
            vb_delta = amount_at(after[str(vaultbase)]["data_hex"], 64) - amount_at(before[str(vaultbase)]["data_hex"], 64)
            ata_key = str(metas[8].pubkey)
            ata_spent = amount_at(before[ata_key]["data_hex"], 64) - amount_at(after[ata_key]["data_hex"], 64)
            assert (vq_delta, vb_delta, ata_spent) == tuple(expected[1:4]), \
                (label, image, vq_delta, vb_delta, ata_spent, expected)
            pairs.add((vq_delta, vb_delta, ata_spent))
            observed = {"vault_quote_gained": vq_delta, "vault_base_spent": -vb_delta,
                        "boost_ata_spent": ata_spent}
        else:
            assert failed and err is not None and expected[1] in err, (label, image, err)
            assert expected[2] in "\n".join(logs), (label, image, logs[-3:])
            assert payer_delta == 5000, (label, image, payer_delta)
            site = next((l for l in logs if "thrown in" in l or "caused by account" in l), None)
            row.setdefault("error_sites", {})[image] = site
            assert all(before[k] == after[k] for k in before if k != payer_key), \
                (label, image, "rollback")
        receipts_global.append({
            "sequence": len(receipts_global), "vm": len(receipts_global),
            "context": {"index": index, "image": image, "instruction": "boost_buy_and_burn",
                        "label": label},
            "transaction_base64": base64.b64encode(raw_tx).decode(),
            "signatures": [str(s) for s in tx.signatures],
            "transaction_sha256": sha(raw_tx),
            "all_signatures_verified": True, "signature_fields": 1,
            "before": before, "after": after,
            "metadata": {"signature": str(meta.signature()), "logs": logs,
                         "inner_instructions": str(meta.inner_instructions()),
                         "return_data": str(meta.return_data())},
            "clock": {"slot": 100, "epoch_start_timestamp": 1234567890, "epoch": 0,
                      "leader_schedule_epoch": 0, "unix_timestamp": 1234567890},
            "loaded_programs": {
                "pAMM": {"path": "evidence/original/pump_amm/deployed.so",
                         "sha256": IMAGE_SHA[image]},
                "pFEES": {"path": "evidence/original/pump_fees/deployed.so",
                          "sha256": FEES_SHA}},
            "error": err, "rollback_except_payer_fee": err is not None,
            "payer_fee_lamports": payer_delta,
            "observed": observed,
        })
        row[image] = {"error": err, "logs": logs,
                      "accounts": {k: v for k, v in after.items()},
                      "observed": observed}
        print(f"  {label} [{image}] error={err} observed={observed}")
    if expected[0] == "boost":
        assert len(pairs) == 1, (label, "images must agree on amounts")
    report_cases.append(row)

(OUT / "runtime").mkdir(parents=True, exist_ok=True)
lines = [json.dumps(r).encode() for r in receipts_global]
parts = []
for i in range(0, len(lines), 10):
    chunk = lines[i:i + 10]
    data = gzip.compress(b"\n".join(chunk) + b"\n", mtime=0)
    name = f"runtime/raw-transactions-part{i // 10 + 1}.jsonl.gz"
    (OUT / name).write_bytes(data)
    parts.append({"path": name, "sha256": sha(data), "receipts": len(chunk)})
    print(name, len(data), "bytes")
repo_inputs = [
    "research/amm-multi-hop-group-slice-recovery/artifacts/candidate.so.gz",
    "research/amm-transfer-fee-diagnostic-recovery/artifacts/candidate.so.gz",
    "research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json",
    "research/imported-lab/analysis/pump_fun/config-snapshot.json",
    "evidence/upstream/pump_amm.json",
    "evidence/dependencies/spl_token/deployed.so",
    "evidence/dependencies/spl_token_2022/deployed.so",
    "evidence/original/pump_fees/deployed.so",
]
report = {"schema": 1, "packet": "amm-boost-transfer-fee-20261028",
          "case_count": len(report_cases), "mismatches": [],
          "scope": ("boost_buy_and_burn under base and quote transfer fees, "
                    "fresh VM per case per image (original / #424 control / #427 candidate). "
                    "Receipts are stored as parts to stay under GitHub's 25MB web-upload limit; "
                    "verify.py reads them in order."),
          "image_sha256": IMAGE_SHA,
          "cases": report_cases,
          "counts": {"vms": len(receipts_global),
                     "transactions": len(receipts_global),
                     "signature_fields": len(receipts_global)},
          "input_sha256": {n: sha((ROOT / n).read_bytes()) for n in repo_inputs},
          "transaction_receipts": {"parts": parts}}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(json.dumps(report, indent=1).encode(), mtime=0))
print(f"cases: {len(report_cases)} receipts: {len(receipts_global)}")
print(f"wrote: {OUT / 'runtime/report.json.gz'}")
