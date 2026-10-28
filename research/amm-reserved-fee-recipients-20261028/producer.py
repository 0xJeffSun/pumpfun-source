#!/usr/bin/env python3
"""Build research/amm-reserved-fee-recipients-20261028 receipts.

set_reserved_fee_recipients writes a whitelist into the global
config, pinned at runtime:
- with exactly 8 funded remaining accounts it stores the whitelist
  PDA argument at 353..385 and the eight recipient keys at
  385..641;
- a second call replaces the list wholesale (0x11..0x18 overwrite
  0x01..0x08), it does not append;
- with 7 or 0 remaining accounts it fails NotEnoughRemainingAccounts
  (6044); with 8 unfunded accounts it fails ConstraintRentExempt
  (2005) on the first recipient;
- outsider fails InvalidAdmin (6005), unsigned fails
  AccountNotSigner (3010), read-only config fails ConstraintMut
  (2000), all with rollback.
The IDL account order is global_config, admin, event_authority,
program; passing them admin-first fails AccountOwnedByWrongProgram
(3007) and is not used here.
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
    CONFIG, CONFIG_KEY, EVENT, IDL, OUTSIDER, PAYER, PROGRAM, RAW,
)

ROOT = Path.home() / "workspace/pumpfun-sparse"
OUT = ROOT / "research/amm-reserved-fee-recipients-20261028"
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

W = Pubkey.find_program_address([b"reserved_fee_recipients"], PROGRAM)[0]
KEYS8 = [Pubkey.from_bytes(bytes([i + 1]) * 32) for i in range(8)]
KEYS9 = [Pubkey.from_bytes(bytes([0x11 + i]) * 32) for i in range(8)]

# (label, remaining, fund, mutation, replace_first, expected)
# expected: ("ok", ("reserved", (pda_hex, first_byte, last_byte))) |
#           ("error", code, fragment)
CASES = [
    ("reserved-8", KEYS8, True, None, False, ("ok", ("reserved", (bytes(W).hex(), 1, 8)))),
    ("reserved-replace", KEYS9, True, None, True, ("ok", ("reserved", (bytes(W).hex(), 0x11, 0x18)))),
    ("reserved-7", KEYS8[:7], True, None, False, ("error", "6044", "NotEnoughRemainingAccounts")),
    ("reserved-0", [], True, None, False, ("error", "6044", "NotEnoughRemainingAccounts")),
    ("reserved-unfunded-8", KEYS8, False, None, False, ("error", "2005", "ConstraintRentExempt")),
    ("reserved-outsider", KEYS8, True, "outsider", False, ("error", "6005", "InvalidAdmin")),
    ("reserved-unsigned", KEYS8, True, "unsigned", False, ("error", "3010", "AccountNotSigner")),
    ("reserved-readonly", KEYS8, True, "readonly", False, ("error", "2000", "ConstraintMut")),
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


def build_tx(vm, remaining, admin, signer, writable):
    ix = next(x for x in IDL["instructions"] if x["name"] == "set_reserved_fee_recipients")
    keys = {"global_config": CONFIG_KEY, "admin": admin.pubkey(),
            "event_authority": EVENT, "program": PROGRAM}
    metas = [AccountMeta(keys[a["name"]], bool(a.get("signer")) and signer,
                         bool(a.get("writable")) and writable) for a in ix["accounts"]]
    metas += [AccountMeta(k, False, False) for k in remaining]
    payer = OUTSIDER if not signer else admin
    tx = Transaction.new_signed_with_payer(
        [Instruction(PROGRAM, bytes(ix["discriminator"]) + bytes(W), metas)],
        payer.pubkey(), [payer], vm.latest_blockhash())
    return tx, payer


receipts_global = []
report_cases = []
for index, (label, remaining, fund, mutation, replace_first, expected) in enumerate(CASES):
    row = {"case": {"instruction": "set_reserved_fee_recipients", "label": label,
                    "remaining_count": len(remaining), "fund": fund,
                    "mutation": mutation, "replace_first": replace_first,
                    "expected": list(expected)}}
    pairs = set()
    for image in ("original", "control", "candidate"):
        h = Harness(IMAGES[image])
        vm = h.vm
        vm.set_clock(Clock(100, 1234567890, 0, 0, 1234567890))
        vm.set_account(CONFIG_KEY, Account(CONFIG["lamports"], bytes(RAW), PROGRAM))
        admin = PAYER
        signer = True
        writable = True
        if mutation == "outsider":
            admin = OUTSIDER
        if mutation == "unsigned":
            signer = False
        if mutation == "readonly":
            writable = False
        if replace_first:
            for k in KEYS8:
                vm.set_account(k, Account(10**9, b"", Pubkey.default()))
            tx0, payer0 = build_tx(vm, KEYS8, PAYER, True, True)
            r0 = vm.send_transaction(tx0)
            assert not isinstance(r0, FailedTransactionMetadata), "setup call must succeed"
        if fund:
            for k in remaining:
                vm.set_account(k, Account(10**9, b"", Pubkey.default()))
        tx, payer = build_tx(vm, remaining, admin, signer, writable)
        before_keys = sorted({str(k) for k in tx.message.account_keys} | {str(payer.pubkey())}, key=str)
        before = snap(vm, [Pubkey.from_string(k) for k in before_keys])
        raw = bytes(tx)
        checks = tx.verify_with_results()
        assert checks and all(checks), "new transaction must verify"
        r = vm.send_transaction(tx)
        failed = isinstance(r, FailedTransactionMetadata)
        meta = r.meta() if failed else r
        after = snap(vm, [Pubkey.from_string(k) for k in before_keys])
        err = str(r.err()) if failed else None
        logs = meta.logs()
        payer_key = str(payer.pubkey())
        payer_delta = before[payer_key]["lamports"] - after[payer_key]["lamports"]
        observed = {}
        if expected[0] == "ok":
            assert not failed and err is None, (label, image, err)
            cfg_after = bytes.fromhex(after[str(CONFIG_KEY)]["data_hex"])
            got = (cfg_after[353:385].hex(), cfg_after[385], cfg_after[610])
            assert got == expected[1][1], (label, image, got, expected)
            pairs.add(got)
            observed = {"reserved": list(got)}
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
            "context": {"index": index, "image": image, "instruction": "set_reserved_fee_recipients",
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
                         "sha256": IMAGE_SHA[image]}},
            "error": err, "rollback_except_payer_fee": err is not None,
            "payer_fee_lamports": payer_delta,
            "observed": observed,
        })
        row[image] = {"error": err, "logs": logs,
                      "accounts": {k: v for k, v in after.items()},
                      "observed": observed}
        print(f"  {label} [{image}] error={err} observed={observed}")
    if expected[0] == "ok":
        assert len(pairs) == 1, (label, "images must agree")
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
             "set_reserved_fee_recipients on the global config at runtime: "
             "exactly 8 funded remaining accounts store the whitelist PDA "
             "at 353..385 and the eight recipient keys at 385..641; a "
             "second call replaces the list wholesale; 7 or 0 remaining "
             "accounts fail NotEnoughRemainingAccounts (6044); 8 "
             "unfunded accounts fail ConstraintRentExempt (2005); "
             "outsider, unsigned and read-only calls fail with 6005, "
             "3010 and 2000, all with rollback. All three images behave "
             "identically. Receipts are stored as parts to stay under "
             "GitHub's 25MB web-upload limit; verify.py reads them in order.",
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
    },
    "counts": {"vms": len(receipts_global), "transactions": len(receipts_global),
               "signature_fields": len(receipts_global)},
    "case_count": len(report_cases),
    "classifications": {"reserved-fee-recipients": 8},
    "mismatches": [],
    "cases": report_cases,
    "transaction_receipts": {"parts": parts},
}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(
    json.dumps(report, indent=1).encode(), mtime=0))
print("cases:", len(report_cases), "receipts:", len(receipts_global))
print("wrote:", OUT / "runtime/report.json.gz")
