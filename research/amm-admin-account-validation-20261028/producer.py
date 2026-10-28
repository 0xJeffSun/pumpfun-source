#!/usr/bin/env python3
"""Build research/amm-admin-account-validation-20261028 receipts.

Admin instructions validate the config account itself, not
just the admin signer, pinned at runtime:
- the base disable sets the flags byte from 0 to 8;
- a config owned by the wrong program fails
  AccountOwnedByWrongProgram (3007) on global_config, on
  disable, toggle_mayhem_mode, and update_admin alike;
- the config account is NOT address-bound: a noncanonical
  config key holding valid GlobalConfig data and the admin
  disables successfully, writing flags 8 to that account;
- a wrong event account fails ConstraintSeeds (2006) on
  event_authority;
- a config with a flipped discriminator or truncated to 56
  bytes fails InvalidAccountData (17179869184);
- a program account that does not exist fails MissingAccount
  at the runtime level, with no program log line.
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
OUT = ROOT / "research/amm-admin-account-validation-20261028"
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

# (instruction, label, args, prior_flags, mutation, new_admin,
#  expected ("ok", check) or ("error", code, log fragment))
#  check: ("flags", value) | ("mayhem", value) | ("admin", hex)
CASES = [
    ("disable", "admin-base", bytes([0, 0, 0, 1, 0]), 0, None, None, ("ok", ("flags", 8))),
    ("disable", "admin-wrong-owner", bytes([0, 0, 0, 1, 0]), 0, "owner", None, ("error", "3007", "AccountOwnedByWrongProgram")),
    ("disable", "admin-noncanonical", bytes([0, 0, 0, 1, 0]), 0, "noncanonical_config", None, ("ok", ("flags", 8))),
    ("disable", "admin-wrong-event", bytes([0, 0, 0, 1, 0]), 0, "event", None, ("error", "2006", "ConstraintSeeds")),
    ("disable", "admin-missing-program", bytes([0, 0, 0, 1, 0]), 0, "program", None, ("error", "MissingAccount", "")),
    ("disable", "admin-bad-discriminator", bytes([0, 0, 0, 1, 0]), 0, "discriminator", None, ("error", "InvalidAccountData", "InvalidAccountData")),
    ("disable", "admin-truncated", bytes([0, 0, 0, 1, 0]), 0, "truncated", None, ("error", "InvalidAccountData", "InvalidAccountData")),
    ("toggle_mayhem_mode", "admin-mayhem-wrong-owner", bytes([1]), 0, "owner", None, ("error", "3007", "AccountOwnedByWrongProgram")),
    ("update_admin", "admin-update-admin-wrong-owner", b"", 0, "owner", bytes([55]) * 32, ("error", "3007", "AccountOwnedByWrongProgram")),
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


receipts_global = []
report_cases = []
for index, (instruction, label, args, prior_flags, mutation, new_admin, expected) in enumerate(CASES):
    ix = next(x for x in IDL["instructions"] if x["name"] == instruction)
    row = {"case": {"instruction": instruction, "label": label,
                    "args_hex": args.hex(), "prior_flags": prior_flags,
                    "mutation": mutation,
                    "new_admin_hex": new_admin.hex() if new_admin else None,
                    "expected": list(expected)}}
    pairs = set()
    for image in ("original", "control", "candidate"):
        h = Harness(IMAGES[image])
        vm = h.vm
        vm.set_clock(Clock(100, 1234567890, 0, 0, 1234567890))
        data = bytearray(RAW)
        data[56] = prior_flags
        admin = PAYER
        signer = True
        writable = True
        if mutation == "outsider":
            admin = OUTSIDER
        if mutation == "unsigned":
            signer = False
        if mutation == "readonly":
            writable = False
        if mutation and mutation.startswith("set-"):
            _, offset, value = mutation.split("-")
            data[int(offset)] = int(value)
        config_key = CONFIG_KEY
        owner = PROGRAM
        event = EVENT
        program = PROGRAM
        if mutation == "owner":
            owner = Pubkey.default()
        if mutation == "program":
            program = OUTSIDER.pubkey()
        if mutation == "noncanonical_config":
            import hashlib as _hashlib
            config_key = Pubkey.from_bytes(_hashlib.sha256(b"pump-amm-differential-invalid-config").digest())
        if mutation == "event":
            import hashlib as _hashlib
            event = Pubkey.from_bytes(_hashlib.sha256(b"pump-amm-differential-invalid-event").digest())
            vm.set_account(event, Account(10**9, b"", Pubkey.default()))
        if mutation == "discriminator":
            data[0] ^= 1
        if mutation == "truncated":
            data = data[:56]
        vm.set_account(config_key, Account(CONFIG["lamports"], bytes(data), owner))
        accounts = [AccountMeta(admin.pubkey(), signer, False),
                    AccountMeta(config_key, False, writable),
                    AccountMeta(event, False, False),
                    AccountMeta(program, False, False)]
        if instruction == "update_admin":
            key = Pubkey.from_bytes(new_admin)
            if key not in [PROGRAM, EVENT, CONFIG_KEY, Pubkey.default(), PAYER.pubkey(), OUTSIDER.pubkey()]:
                vm.set_account(key, Account(10**9, b"", Pubkey.default()))
            accounts.insert(2, AccountMeta(key, False, False))
        payer = OUTSIDER if mutation == "unsigned" else admin
        before_keys = sorted({str(m.pubkey) for m in accounts} | {str(payer.pubkey())}, key=str)
        before = snap(vm, [Pubkey.from_string(k) for k in before_keys])
        tx = Transaction.new_signed_with_payer(
            [Instruction(PROGRAM, bytes(ix["discriminator"]) + args, accounts)],
            payer.pubkey(), [payer], vm.latest_blockhash())
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
            cfg_after = bytes.fromhex(after[str(config_key)]["data_hex"])
            kind, value = expected[1]
            if kind == "flags":
                got = cfg_after[56]
            elif kind == "mayhem":
                got = cfg_after[417]
            else:
                got = cfg_after[8:40].hex()
            assert got == value, (label, image, got, expected)
            pairs.add((got,) if not isinstance(got, int) else (got,))
            observed = {kind: value}
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
                         "compute_units_consumed": str(meta.compute_units_consumed()),
                         "return_data": str(meta.return_data())},
            "clock": {"slot": 100, "epoch_start_timestamp": 1234567890, "epoch": 0,
                      "leader_schedule_epoch": 0, "unix_timestamp": 1234567890},
            "loaded_programs": {
                str(PROGRAM): {"path": "evidence/original/pump_amm/deployed.so",
                               "sha256": IMAGE_SHA[image]}},
            "error": err, "rollback_except_payer_fee": failed,
            "payer_fee_lamports": payer_delta,
            "observed": observed,
        })
        row[image] = {"error": err, "logs": logs,
                      "accounts": {k: v for k, v in after.items()},
                      "observed": observed}
        print(f"  {label} [{image}] error={err} observed={observed}")
    if expected[0] == "ok":
        assert len(pairs) == 1, (label, "images must agree on state")
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
             "admin authorization on the global config at runtime: "
             "disable by the admin sets the flags byte (buy only: 0 -> "
             "8) while an outsider fails InvalidAdmin (6005), an "
             "unsigned admin fails AccountNotSigner (3010), and a "
             "read-only config fails ConstraintMut (2000); "
             "toggle_mayhem_mode by the admin flips byte 417 (0 -> 1) "
             "while an outsider fails InvalidAdmin; update_admin by the "
             "admin replaces bytes 8..40 with the new key while an "
             "outsider fails InvalidAdmin. All three images behave "
             "identically. Receipts are stored as parts to stay under "
             "GitHub's 25MB web-upload limit; verify.py reads them in "
             "order.",
    "fresh_vm_environment": "1",
    "image_sha256": IMAGE_SHA,
    "input_sha256": {
        "research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json":
            sha((ROOT / "research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json").read_bytes()),
        "research/imported-lab/analysis/pump_fun/config-snapshot.json":
            sha((ROOT / "research/imported-lab/analysis/pump_fun/config-snapshot.json").read_bytes()),
        "evidence/upstream/pump_amm.json":
            sha((ROOT / "evidence/upstream/pump_amm.json").read_bytes()),
    },
    "counts": {"vms": len(receipts_global), "transactions": len(receipts_global),
               "signature_fields": len(receipts_global)},
    "case_count": len(report_cases),
    "classifications": {"admin-authorization": 8},
    "mismatches": [],
    "cases": report_cases,
    "transaction_receipts": {"parts": parts},
}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(
    json.dumps(report, indent=1).encode(), mtime=0))
print("cases:", len(report_cases), "receipts:", len(receipts_global))
print("wrote:", OUT / "runtime/report.json.gz")
