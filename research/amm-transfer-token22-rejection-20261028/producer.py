#!/usr/bin/env python3
"""Build research/amm-transfer-token22-rejection-20261028 receipts.

transfer_creator_fees_to_pump and its v2 cannot move
Token-2022 quote fees, pinned at runtime:
- the base transfers drain the AMM creator vault of 1000
  (the pump-side ATA is derived inside the handler, not a
  passed account, so the packet pins the vault drain);
- a Token-2022 quote mint fails 2023
  ConstraintAssociatedTokenTokenProgram for both versions,
  at 1% and 50% fees alike, because the handlers'
  associated-token constraint requires the vault to be
  associated under the Token program passed in.
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
    f, poolraw, quote, token, userbase,
)
from pump_amm_admin_differential import OUTSIDER

ROOT = Path.home() / "workspace/pumpfun-sparse"
OUT = ROOT / "research/amm-transfer-token22-rejection-20261028"
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

CREATOR = OUTSIDER.pubkey()
AUTH, _BUMP = Pubkey.find_program_address([b'creator_vault', bytes(CREATOR)], PROGRAM)
VAULT = Pubkey.find_program_address([bytes(AUTH), bytes(TOKEN), bytes(quote)], ATA)[0]
PUMP = Pubkey.from_string(__import__('json').load(open(ROOT / 'evidence/upstream/pump.json'))['address'])
PUMPVAULT = Pubkey.find_program_address([b'creator-vault', bytes(CREATOR)], PUMP)[0]
PUMPATA = Pubkey.find_program_address([bytes(PUMPVAULT), bytes(TOKEN), bytes(quote)], ATA)[0]

# (instruction, label, override, expected)
# override: None | ("tf", bps)
# expected: ("transfer", vault_spent) | ("error", code, fragment)
CASES = [
    ("transfer_creator_fees_to_pump", "transfer-token22-v1-base", None, ("transfer", 1000)),
    ("transfer_creator_fees_to_pump", "transfer-token22-v1-quote-tf100", ("tf", 100), ("error", "2023", "ConstraintAssociatedTokenTokenProgram")),
    ("transfer_creator_fees_to_pump", "transfer-token22-v1-quote-tf5000", ("tf", 5000), ("error", "2023", "ConstraintAssociatedTokenTokenProgram")),
    ("transfer_creator_fees_to_pump_v2", "transfer-token22-v2-base", None, ("transfer", 1000)),
    ("transfer_creator_fees_to_pump_v2", "transfer-token22-v2-quote-tf100", ("tf", 100), ("error", "2023", "ConstraintAssociatedTokenTokenProgram")),
    ("transfer_creator_fees_to_pump_v2", "transfer-token22-v2-quote-tf5000", ("tf", 5000), ("error", "2023", "ConstraintAssociatedTokenTokenProgram")),
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
for index, (instruction, label, override, expected) in enumerate(CASES):
    ix = next(x for x in IDL["instructions"] if x["name"] == instruction)
    if instruction.endswith("_v2"):
        keys = [PAYER.pubkey(), quote, TOKEN, Pubkey.default(), ATA, CREATOR, AUTH, VAULT, PUMPVAULT, PUMPATA, EVENT, PROGRAM]
    else:
        keys = [quote, TOKEN, Pubkey.default(), ATA, CREATOR, AUTH, VAULT, PUMPVAULT, EVENT, PROGRAM]
    row = {"case": {"instruction": instruction, "label": label,
                    "vault": str(VAULT),
                    "override": list(override) if override else None,
                    "expected": list(expected)}}
    pairs = set()
    for image in ("original", "control", "candidate"):
        h = Harness(IMAGES[image])
        vm = h.vm
        vm.set_clock(Clock(100, 1234567890, 0, 0, 1234567890))
        for pid, n in ((TOKEN, 'spl_token'), (TOKEN22, 'spl_token_2022'), (ATA, 'associated_token')):
            vm.add_program_from_file(pid, str(ROOT / 'evidence/dependencies' / n / 'deployed.so'))
        rrow = f["accounts"]["quote_mint"]
        vm.set_account(quote, Account(rrow["lamports"], base64.b64decode(rrow["data_base64"]), TOKEN))
        vm.set_account(VAULT, Account(min(2**64 - 1, 1000 + 2039280), token(quote, AUTH, 1000, True), TOKEN))
        vm.set_account(AUTH, Account(10**9, b"", Pubkey.default()))
        vm.set_account(PUMPVAULT, Account(10**9, b"", Pubkey.default()))
        vm.set_account(PUMPATA, Account(0, b"", Pubkey.default()))
        metas = [AccountMeta(k, bool(a.get("signer")), bool(a.get("writable")))
                 for k, a in zip(keys, ix["accounts"])]
        if override is not None and override[0] == "tf":
            bps = override[1]
            mint = vm.get_account(quote)
            d = bytearray(mint.data[:82]); d += bytes(83) + bytes([1])
            conf = bytes(72) + struct.pack("<QQH", 0, 2**64 - 1, bps) * 2
            d += struct.pack("<HH", 1, len(conf)) + conf
            vm.set_account(quote, Account(mint.lamports, bytes(d), TOKEN22))
            a = vm.get_account(VAULT)
            dd = bytearray(a.data[:165]); dd += bytes([2]) + struct.pack("<HHQ", 2, 8, 0)
            vm.set_account(VAULT, Account(a.lamports, bytes(dd), TOKEN22))
        before_keys = sorted({str(m.pubkey) for m in metas} | {str(PAYER.pubkey())}, key=str)
        before = snap(vm, [Pubkey.from_string(k) for k in before_keys])
        tx = Transaction.new_signed_with_payer(
            [Instruction(PROGRAM, bytes(ix["discriminator"]), metas)],
            PAYER.pubkey(), [PAYER], vm.latest_blockhash())
        raw = bytes(tx)
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
        if expected[0] == "transfer":
            assert not failed and err is None, (label, image, err)
            spent = amount_at(before[str(VAULT)]["data_hex"], 64) - amount_at(after[str(VAULT)]["data_hex"], 64)
            assert spent == expected[1], (label, image, spent, expected)
            pairs.add(spent)
            observed = {"vault_spent": spent}
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
            "context": {"index": index, "image": image, "instruction": instruction,
                        "label": label},
            "transaction_base64": base64.b64encode(raw).decode(),
            "signatures": [str(s) for s in tx.signatures],
            "transaction_sha256": sha(raw),
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
    if expected[0] == "transfer":
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
report = {"schema": 1, "packet": "amm-transfer-token22-rejection-20261028",
          "case_count": len(report_cases), "mismatches": [],
          "scope": ("transfer_creator_fees_to_pump and v2 with a Token-2022 quote mint, "
                    "fresh VM per case per image (original / #424 control / #427 candidate). "
                    "Receipts are stored as parts to stay under GitHub's 25MB web-upload limit; "
                    "verify.py reads them in order."),
          "image_sha256": IMAGE_SHA,
          "cases": report_cases,
          "counts": {"vms": len(receipts_global),
                     "transactions": len(receipts_global),
                     "signature_fields": len(receipts_global)},
          "input_sha256": {n: sha((ROOT / n).read_bytes()) for n in [
              "research/amm-multi-hop-group-slice-recovery/artifacts/candidate.so.gz",
              "research/amm-transfer-fee-diagnostic-recovery/artifacts/candidate.so.gz",
              "research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json",
              "research/imported-lab/analysis/pump_fun/config-snapshot.json",
              "evidence/upstream/pump_amm.json",
              "evidence/upstream/pump.json",
              "evidence/dependencies/spl_token/deployed.so",
              "evidence/dependencies/spl_token_2022/deployed.so",
              "evidence/original/pump_fees/deployed.so"]},
          "transaction_receipts": {"parts": parts}}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(json.dumps(report, indent=1).encode(), mtime=0))
print(f"cases: {len(report_cases)} receipts: {len(receipts_global)}")
print(f"wrote: {OUT / 'runtime/report.json.gz'}")
