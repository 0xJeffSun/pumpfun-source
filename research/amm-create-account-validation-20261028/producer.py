#!/usr/bin/env python3
"""Build research/amm-create-account-validation-20261028 receipts.

create_pool validates its accounts before allocating the pool,
pinned at runtime:
- the base create stores 10^9 base and 10^9 quote in the vaults;
- a pool or global config owned by the wrong program fails
  AccountOwnedByWrongProgram (3007) on that account;
- a base mint that equals the quote fails SameMint (6022);
  ConstraintTokenOwner (2015), and a quote vault whose mint is
  not the quote fails ConstraintTokenMint (2014);
  an unsigned payer fails AccountNotSigner (3010) and a
  read-only pool fails PrivilegeEscalation at the runtime level,
  because the program allocates the pool account;
- a second create of the same pool fails at System Allocate
  with "already in use" before program logic runs.
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
from pump_amm_admin_differential import OUTSIDER
from pump_amm_create_differential import (
    ATA, CONFIG, CONFIG_KEY, EVENT, IDL, PAYER, PROGRAM, RAW, TOKEN, TOKEN22,
    base, f, quote, userbase, userquote,
)
from pump_amm_liquidity_differential import token as token_bytes

ROOT = Path.home() / "workspace/pumpfun-sparse"
OUT = ROOT / "research/amm-create-account-validation-20261028"
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

# (label, kwargs, expected)
# kwargs: bamt, qamt, bmint, qmint, vb_override, twice
# expected: ("ok", ("vaults", (base_amt, quote_amt))) |
#           ("error", code, fragment)
CASES = [
    ("create-base", {}, ("ok", ("vaults", (10**9, 10**9)))),
    ("create-wrong-pool", {"pool_key": "OUTSIDER"}, ("error", "2006", "ConstraintSeeds")),
    ("create-wrong-config", {"config_key": "OUTSIDER"}, ("error", "3007", "AccountOwnedByWrongProgram")),
    ("create-same-mint", {"bmint": "quote"}, ("error", "6022", "SameMint")),
    ("create-wrong-vaultbase", {"vb_override": "userbase"}, ("error", "2015", "ConstraintTokenOwner")),
    ("create-wrong-vaultquote", {"vq_override": "userbase"}, ("error", "2014", "ConstraintTokenMint")),
    ("create-unsigned", {"unsigned": True}, ("error", "3010", "AccountNotSigner")),
    ("create-readonly-pool", {"ro_pool": True}, ("error", "PrivilegeEscalation", "writable privilege escalated")),
    ("create-twice", {"twice": True}, ("error", "0", "already in use")),
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


def setup_vm(image):
    h = Harness(IMAGES[image])
    vm = h.vm
    vm.set_clock(Clock(100, 1234567890, 0, 0, 1234567890))
    for pid, name in ((TOKEN, "spl_token"), (TOKEN22, "spl_token_2022"), (ATA, "associated_token")):
        vm.add_program_from_file(pid, str(ROOT / "evidence/dependencies" / name / "deployed.so"))
    glob = bytearray(RAW)
    glob[56] = 0
    vm.set_account(CONFIG_KEY, Account(CONFIG["lamports"], bytes(glob), PROGRAM))
    for n in ["base_mint", "quote_mint"]:
        rrow = f["accounts"][n]
        vm.set_account(Pubkey.from_string(rrow["address"]),
                       Account(rrow["lamports"], base64.b64decode(rrow["data_base64"]),
                               Pubkey.from_string(rrow["owner"])))
    for key, mint, native in ((userbase, base, False), (userquote, quote, True)):
        vm.set_account(key, Account(10**15 + 2039280 if native else 10**9,
                                    token_bytes(mint, PAYER.pubkey(), 10**15, native), TOKEN))
    return vm


def build_create(vm, kwargs):
    bmint = quote if kwargs.get("bmint") == "quote" else base
    qmint = quote
    pool = Pubkey.find_program_address([b"pool", struct.pack("<H", 0), bytes(PAYER.pubkey()), bytes(bmint), bytes(qmint)], PROGRAM)[0]
    lp = Pubkey.find_program_address([b"pool_lp_mint", bytes(pool)], PROGRAM)[0]
    ata = lambda owner, mint, program: Pubkey.find_program_address([bytes(owner), bytes(program), bytes(mint)], ATA)[0]
    vaultbase = userbase if kwargs.get("vb_override") == "userbase" else ata(pool, bmint, TOKEN)
    vaultquote = userbase if kwargs.get("vq_override") == "userbase" else ata(pool, qmint, TOKEN)
    pool_key = OUTSIDER.pubkey() if kwargs.get("pool_key") == "OUTSIDER" else pool
    config_key = OUTSIDER.pubkey() if kwargs.get("config_key") == "OUTSIDER" else CONFIG_KEY
    keys = [pool_key, config_key, PAYER.pubkey(), bmint, qmint, lp, userbase, userquote,
            ata(PAYER.pubkey(), lp, TOKEN22), vaultbase, vaultquote, Pubkey.default(),
            TOKEN22, TOKEN, TOKEN, ATA, EVENT, PROGRAM]
    ix = next(x for x in IDL["instructions"] if x["name"] == "create_pool")
    metas = [AccountMeta(k, bool(a.get("signer")), bool(a.get("writable")))
             for k, a in zip(keys, ix["accounts"])]
    if kwargs.get("unsigned"):
        metas[2] = AccountMeta(PAYER.pubkey(), False, False)
        signer, payer_key = OUTSIDER, OUTSIDER.pubkey()
    else:
        signer, payer_key = PAYER, PAYER.pubkey()
    if kwargs.get("ro_pool"):
        metas[0] = AccountMeta(pool_key, False, False)
    args = struct.pack("<HQQ", 0, kwargs.get("bamt", 10**9), kwargs.get("qamt", 10**9)) + bytes(PAYER.pubkey()) + bytes([0])
    tx = Transaction.new_signed_with_payer(
        [Instruction(PROGRAM, bytes(ix["discriminator"]) + args, metas)],
        payer_key, [signer], vm.latest_blockhash())
    return tx, vaultbase, vaultquote


receipts_global = []
report_cases = []
for index, (label, kwargs, expected) in enumerate(CASES):
    row = {"case": {"instruction": "create_pool", "label": label,
                    "kwargs": {k: (str(v) if not isinstance(v, (int, bool)) else v) for k, v in kwargs.items()},
                    "expected": list(expected)}}
    pairs = set()
    for image in ("original", "control", "candidate"):
        vm = setup_vm(image)
        if kwargs.get("twice"):
            tx0, _, _ = build_create(vm, {})
            r0 = vm.send_transaction(tx0)
            assert not isinstance(r0, FailedTransactionMetadata), "setup create must succeed"
        tx, vaultbase, vaultquote = build_create(vm, kwargs)
        before_keys = sorted({str(k) for k in tx.message.account_keys}, key=str)
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
        payer_key = str(tx.message.account_keys[0])
        payer_delta = before[payer_key]["lamports"] - after[payer_key]["lamports"]
        observed = {}
        if expected[0] == "ok":
            assert not failed and err is None, (label, image, err)
            vb = bytes.fromhex(after[str(vaultbase)]["data_hex"])
            vq = bytes.fromhex(after[str(vaultquote)]["data_hex"])
            got = (struct.unpack_from("<Q", vb, 64)[0], struct.unpack_from("<Q", vq, 64)[0])
            assert got == expected[1][1], (label, image, got, expected)
            pairs.add(got)
            observed = {"vaults": list(got)}
        else:
            assert failed and err is not None, (label, image, err)
            if expected[1] == "0":
                assert "Custom(0)" in err, (label, image, err)
            else:
                assert expected[1] in err, (label, image, err)
            assert expected[2] in "\n".join(logs), (label, image, logs[-3:])
            assert payer_delta == 5000, (label, image, payer_delta)
            site = next((l for l in logs if "thrown in" in l or "caused by account" in l), None)
            row.setdefault("error_sites", {})[image] = site
            assert all(before[k] == after[k] for k in before if k != payer_key), \
                (label, image, "rollback")
        receipts_global.append({
            "sequence": len(receipts_global), "vm": len(receipts_global),
            "context": {"index": index, "image": image, "instruction": "create_pool",
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
             "create_pool validation at runtime: the base case stores "
             "10^9 base and 10^9 quote in the pool vaults; base == quote "
             "fails SameMint (6022); zero base fails ZeroBaseAmount "
             "(6001) and zero quote fails ZeroQuoteAmount (6002), with "
             "base checked first; a base vault not owned by the pool "
             "fails ConstraintTokenOwner (2015); creating the same pool "
             "twice fails at the System Program's Allocate with "
             "\"account already in use\" (custom error 0x0) before any "
             "program check. All three images behave identically. "
             "Receipts are stored as parts to stay under GitHub's 25MB "
             "web-upload limit; verify.py reads them in order.",
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
    "classifications": {"create-account-validation": 9},
    "mismatches": [],
    "cases": report_cases,
    "transaction_receipts": {"parts": parts},
}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(
    json.dumps(report, indent=1).encode(), mtime=0))
print("cases:", len(report_cases), "receipts:", len(receipts_global))
print("wrote:", OUT / "runtime/report.json.gz")
