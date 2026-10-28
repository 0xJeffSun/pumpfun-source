#!/usr/bin/env python3
"""Build research/amm-buy-exact-base-transfer-fee-20261028 receipts.

buy_exact_quote_in_v2 with a base transfer fee, pinned at
runtime: the vault sends the gross base output and the user
spends the same quote in every case, but the user receives
the net base (54,115,018,303 with no fee, 53,573,868,119 at
1%, 27,057,509,151 at 50%, 0 at 100%). The slippage floor
(min_base_amount_out) is checked against the GROSS computed
output, not the net delivery: a 1% fee case with the floor set
to the gross exact value succeeds while delivering only the
net amount, and the floor fails only at gross+1 (6040
BuySlippageBelowMinBaseAmountOut at trade_v2.rs:816).
"""
import base64
import gzip
import hashlib
import json
import struct
import sys
from pathlib import Path
from types import SimpleNamespace

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
    CONFIG, CONFIG_KEY, EVENT, IDL, PAYER, PROGRAM, RAW, TOKEN, TOKEN22,
    base, f, pool, quote, userbase, userquote, vaultbase, vaultquote,
)
from pump_amm_trade_v2_differential import FEES, buyback, feeconfig, trade_transferfee, volume

ROOT = Path.home() / "workspace/pumpfun-sparse"
OUT = ROOT / "research/amm-buy-exact-base-transfer-fee-20261028"
WS = Path.home() / "workspace/slop-verify"

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

# (label, tf (bps, maximum) or None, expected ("spend", base, spent) or ("error", code, log fragment))
CASES = [
    # (label, limit, tf, expected)
    # tf: None | (bps, maximum); expected: ("gain", base_gained, quote_spent,
    #   vault_base_spent, vault_quote_gained) | ("error", code, fragment)
    ("buy-exact-base-nofee", 1, None, ("gain", 54115018303, 10000000, 54115018303, 9954074)),
    ("buy-exact-base-tf100", 1, (100, 2**64 - 1), ("gain", 53573868119, 10000000, 54115018303, 9954074)),
    ("buy-exact-base-tf5000", 1, (5000, 2**64 - 1), ("gain", 27057509151, 10000000, 54115018303, 9954074)),
    ("buy-exact-base-tf10000", 1, (10000, 2**64 - 1), ("gain", 0, 10000000, 54115018303, 9954074)),
    ("buy-exact-base-tf100-limit-gross-exact", 54115018303, (100, 2**64 - 1), ("gain", 53573868119, 10000000, 54115018303, 9954074)),
    ("buy-exact-base-tf100-limit-net-exact", 53573868119, (100, 2**64 - 1), ("gain", 53573868119, 10000000, 54115018303, 9954074)),
    ("buy-exact-base-nofee-limit-plus1", 54115018304, None, ("error", "6040", "BuySlippageBelowMinBaseAmountOut")),
    ("buy-exact-base-tf100-limit-plus1", 54115018304, (100, 2**64 - 1), ("error", "6040", "BuySlippageBelowMinBaseAmountOut")),
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
    ix = next(x for x in IDL["instructions"] if x["name"] == "buy_exact_quote_in_v2")
    keys = [pool, PAYER.pubkey(), CONFIG_KEY, base, quote, userbase, userquote,
            vaultbase, vaultquote, TOKEN, TOKEN, Pubkey.default(), volume,
            feeconfig, buyback, EVENT, PROGRAM]
    row = {"case": {"instruction": "buy_exact_quote_in_v2", "label": label,
                    "tf": list(tf) if tf else None,
                    "expected": list(expected), "amount": 10**7, "limit": limit}}
    pairs = set()
    for image_offset, image in enumerate(("original", "control", "candidate")):
        h = Harness(IMAGES[image])
        vm = h.vm
        vm.set_clock(Clock(100, 1234567890, 0, 0, 1234567890))
        for pid, path in ((TOKEN, "evidence/dependencies/spl_token/deployed.so"),
                          (TOKEN22, "evidence/dependencies/spl_token_2022/deployed.so"),
                          (FEES, "evidence/original/pump_fees/deployed.so")):
            vm.add_program_from_file(pid, str(ROOT / path))
        glob = bytearray(RAW)
        glob[56] = 0
        vm.set_account(CONFIG_KEY, Account(CONFIG["lamports"], bytes(glob), PROGRAM))
        for n, rrow in f["accounts"].items():
            vm.set_account(Pubkey.from_string(rrow["address"]),
                           Account(rrow["lamports"], base64.b64decode(rrow["data_base64"]),
                                   Pubkey.from_string(rrow["owner"])))
        from pump_amm_liquidity_differential import token as token_bytes
        for k, m, native in ((userbase, base, False), (userquote, quote, True)):
            vm.set_account(k, Account(10**15 + 2039280 if native else 10**9,
                                      token_bytes(m, PAYER.pubkey(), 10**15, native), TOKEN))
        vm.set_account(volume, Account(0, b"", Pubkey.default()))
        metas = [AccountMeta(k, bool(r.get("signer")), bool(r.get("writable")))
                 for k, r in zip(keys, ix["accounts"])]
        if tf is not None:
            trade_transferfee(base, tf[0], tf[1])(SimpleNamespace(vm=vm), metas)
        data = bytes(ix["discriminator"]) + struct.pack("<QQ", 10**7, limit)
        before_keys = sorted({str(m.pubkey) for m in metas}, key=str)
        before = snap(vm, [Pubkey.from_string(k) for k in before_keys])
        tx = Transaction.new_signed_with_payer(
            [Instruction(PROGRAM, data, metas)], PAYER.pubkey(), [PAYER], vm.latest_blockhash())
        raw = bytes(tx)
        checks = tx.verify_with_results()
        assert checks and all(checks), "new transaction must verify"
        r = vm.send_transaction(tx)
        failed = isinstance(r, FailedTransactionMetadata)
        meta = r.meta() if failed else r
        after = snap(vm, [Pubkey.from_string(k) for k in before_keys])
        err = str(r.err()) if failed else None
        logs = meta.logs()
        payer = str(PAYER.pubkey())
        payer_delta = before[payer]["lamports"] - after[payer]["lamports"]
        observed = {}
        if expected[0] == "gain":
            assert not failed and err is None, (label, image, err)
            uq_key, ub_key = str(userquote), str(userbase)
            vb_key, vq_key = str(vaultbase), str(vaultquote)
            spent = amount_at(before[uq_key]["data_hex"], 64) - amount_at(after[uq_key]["data_hex"], 64)
            gained = amount_at(after[ub_key]["data_hex"], 64) - amount_at(before[ub_key]["data_hex"], 64)
            vb_spent = amount_at(before[vb_key]["data_hex"], 64) - amount_at(after[vb_key]["data_hex"], 64)
            vq_gained = amount_at(after[vq_key]["data_hex"], 64) - amount_at(before[vq_key]["data_hex"], 64)
            assert (gained, spent, vb_spent, vq_gained) == tuple(expected[1:5]), \
                (label, image, gained, spent, vb_spent, vq_gained, expected)
            pairs.add((gained, spent, vb_spent, vq_gained))
            observed = {"base_gained": gained, "quote_spent": spent,
                        "vault_base_spent": vb_spent, "vault_quote_gained": vq_gained}
        else:
            assert failed and err is not None and expected[1] in err, (label, image, err)
            assert expected[2] in "\n".join(logs), (label, image, logs[-3:])
            assert payer_delta == 5000, (label, image, payer_delta)
            site = next((l for l in logs if "thrown in" in l), None)
            row.setdefault("error_sites", {})[image] = site
            assert all(before[k] == after[k] for k in before if k != payer), \
                (label, image, "rollback")
        receipts_global.append({
            "sequence": len(receipts_global), "vm": len(receipts_global),
            "context": {"index": index, "image": image, "instruction": "buy_exact_quote_in_v2",
                        "label": label},
            "transaction_base64": base64.b64encode(raw).decode(),
            "signatures": [str(s) for s in tx.signatures],
            "transaction_sha256": sha(raw),
            "all_signatures_verified": True, "signature_fields": 1,
            "before": before, "after": after,
            "metadata": {"signature": str(meta.signature()), "logs": logs,
                         "inner_instructions": str(meta.inner_instructions()),
                         "compute_units_consumed": str(meta.compute_units_consumed()),
                         "return_data": str(meta.return_data())},
            "clock": {"slot": 100, "epoch_start_timestamp": 1234567890, "epoch": 0,
                      "leader_schedule_epoch": 0, "unix_timestamp": 1234567890},
            "loaded_programs": {
                str(PROGRAM): {"path": "evidence/original/pump_amm/deployed.so",
                               "sha256": IMAGE_SHA[image]},
                str(TOKEN): {"path": "evidence/dependencies/spl_token/deployed.so",
                             "sha256": "8190d3f7ceb6cb7a7a8d8924bff89f9f611e15ce1f806f2b6237f3311a98f697"},
                str(TOKEN22): {"path": "evidence/dependencies/spl_token_2022/deployed.so",
                               "sha256": "15a2e615a42e20f31714bbaaee43002ae6f1cda2e8d7118243117ab3c1342e2d"},
                str(FEES): {"path": "evidence/original/pump_fees/deployed.so",
                            "sha256": FEES_SHA}},
            "error": err, "rollback_except_payer_fee": failed,
            "payer_fee_lamports": payer_delta,
            "observed": observed,
        })
        row[image] = {"error": err, "logs": logs,
                      "accounts": {k: v for k, v in after.items()},
                      "observed": observed}
        print(f"  {label} [{image}] error={err} observed={observed}")
    if expected[0] == "spend":
        assert len(pairs) == 1, (label, "images must agree on base and spend")
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
report = {
    "scope": "Fresh normally signed original/control/candidate triples pinning "
             "the exact-quote buy under a transfer-fee mint at runtime. "
             "The handler first computes the quote surviving the transfer "
             "fee (amount_after_fee) and then grosses the pool-bound quote "
             "back up (amount_before_fee). A 1% fee reduces base out and "
             "spends under budget; a small maximum_fee cap binds and "
             "restores nearly the no-fee base; a 50% fee halves the "
             "effective quote; a 100% fee leaves available == 0 and fails "
             "with 6039 BuyNotEnoughQuoteTokensToCoverFees; any bps above "
             "10000 makes the fee exceed the amount, so amount_after_fee "
             "underflows with 6023 Overflow at utils/transfer_fee.rs:57. "
             "All three images behave identically. Receipts are stored as "
             "parts to stay under GitHub's 25MB web-upload limit; verify.py "
             "reads them in order.",
    "fresh_vm_environment": "1",
    "image_sha256": IMAGE_SHA,
    "input_sha256": {
        "research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json":
            sha((ROOT / "research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json").read_bytes()),
        "research/imported-lab/analysis/pump_fun/config-snapshot.json":
            sha((ROOT / "research/imported-lab/analysis/pump_fun/config-snapshot.json").read_bytes()),
        "evidence/upstream/pump_amm.json":
            sha((ROOT / "evidence/upstream/pump_amm.json").read_bytes()),
        "evidence/dependencies/spl_token/deployed.so":
            sha((ROOT / "evidence/dependencies/spl_token/deployed.so").read_bytes()),
        "evidence/dependencies/spl_token_2022/deployed.so":
            sha((ROOT / "evidence/dependencies/spl_token_2022/deployed.so").read_bytes()),
        "evidence/original/pump_fees/deployed.so":
            sha((ROOT / "evidence/original/pump_fees/deployed.so").read_bytes()),
    },
    "counts": {"vms": len(receipts_global), "transactions": len(receipts_global),
               "signature_fields": len(receipts_global)},
    "case_count": len(report_cases),
    "classifications": {"buy-exact-transfer-fee": 7},
    "mismatches": [],
    "cases": report_cases,
    "transaction_receipts": {"parts": parts},
}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(
    json.dumps(report, indent=1).encode(), mtime=0))
print("cases:", len(report_cases), "receipts:", len(receipts_global))
print("wrote:", OUT / "runtime/report.json.gz")
