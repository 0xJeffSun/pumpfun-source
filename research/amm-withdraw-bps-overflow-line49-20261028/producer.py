#!/usr/bin/env python3
"""Build research/amm-withdraw-bps-overflow-line49-20261028 receipts.

Line 49 (calculate_fee overflow) was the one open row of the bps-overflow
family: it needs a fee input above u64::MAX*10000/bps (about 2.81e18 at
bps 65535). Withdraw supplies it: with the pool quote vault maxed out and
the full LP supply burned, quote_amount is about u64::MAX, so
amount_after_fee's inner calculate_fee overflows at line 49 on the
original and the #427 candidate (control: 22). Valid-bps and no-patch
variants fail identically later (token-transfer overflow / LP burn),
showing the divergence is specific to the malformed-bps fee math.
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
    CONFIG, CONFIG_KEY, EVENT, IDL, OUTSIDER, PAYER, PROGRAM, RAW, TOKEN, TOKEN22,
    base, f, lp, pool, poolraw, quote, supply, token, transferfee, userbase,
    userlp, userquote, vaultbase, vaultquote,
)

ROOT = Path.home() / "workspace/pumpfun-sparse"
OUT = ROOT / "research/amm-withdraw-bps-overflow-line49-20261028"


def _decompress(path):
    # Distinct output per source packet: both artifacts are named candidate.so.gz.
    out = Path("/tmp") / ("line49-" + path.parent.parent.name + "-candidate.so")
    if not out.exists():
        out.write_bytes(gzip.decompress(path.read_bytes()))
    return out


IMAGES = {
    "original": ROOT / "evidence/original/pump_amm/deployed.so",
    "control": _decompress(ROOT / "research/amm-multi-hop-group-slice-recovery/artifacts/candidate.so.gz"),
    "candidate": _decompress(ROOT / "research/amm-transfer-fee-diagnostic-recovery/artifacts/candidate.so.gz"),
}
IMAGE_SHA = {
    "original": "6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7",
    "control": "7a300434dced61413bde10788594b427d5649563e0223efcf09e6b214aff7ad3",
    "candidate": "d17a657baf5cc19736a924c41e75424604411ddbe9f6e72cddf41ab72a695007",
}

CASES = [
    # (label, bps or None, expected lines or agreement error)
    ("withdraw-bps-65535-vault-max", 65535, (49, 22, 49)),
    ("withdraw-bps-10001-vault-max", 10001, (49, 22, 49)),
    ("withdraw-bps-100-vault-max-agreement", 100, "14"),
    ("withdraw-no-patch-vault-max-agreement", None, "1"),
]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def diag_line(logs):
    for line in logs:
        if "transfer_fee.rs:" in line:
            return int(line.split("transfer_fee.rs:")[1].split(".")[0])
    return None


def snap(vm, keys):
    out = {}
    for k in keys:
        a = vm.get_account(k)
        out[str(k)] = {"owner": str(a.owner), "lamports": a.lamports,
                       "executable": a.executable, "data_hex": a.data.hex()} if a else None
    return out


def vault_max(h, m):
    a = h.vm.get_account(vaultquote)
    d = bytearray(a.data)
    d[64:72] = struct.pack("<Q", 2**64 - 1)
    h.vm.set_account(vaultquote, Account(a.lamports, bytes(d), a.owner))


receipts_global = []
report_cases = []
for index, (label, bps, expected) in enumerate(CASES):
    ix = next(x for x in IDL["instructions"] if x["name"] == "withdraw")
    metas = [AccountMeta(k, sign, w) for k, sign, w in [
        (pool, False, True), (CONFIG_KEY, False, False), (PAYER.pubkey(), True, False),
        (base, False, False), (quote, False, False), (lp, False, True),
        (userbase, False, True), (userquote, False, True), (userlp, False, True),
        (vaultbase, False, True), (vaultquote, False, True),
        (TOKEN, False, False), (TOKEN22, False, False),
        (EVENT, False, False), (PROGRAM, False, False)]]
    row = {"case": {"instruction": "withdraw", "mint": "quote", "label": label,
                    "bps": bps, "maximum_fee": 2**64 - 1 if bps else None,
                    "lp_token_amount_in": supply, "vault_quote_balance": 2**64 - 1}}
    for image_offset, image in enumerate(("original", "control", "candidate")):
        h = Harness(IMAGES[image])
        vm = h.vm
        vm.set_clock(Clock(100, 1234567890, 0, 0, 1234567890))
        for pid, path in ((TOKEN, "evidence/dependencies/spl_token/deployed.so"),
                          (TOKEN22, "evidence/dependencies/spl_token_2022/deployed.so")):
            vm.add_program_from_file(pid, str(ROOT / path))
        glob = bytearray(RAW)
        glob[56] = 0
        vm.set_account(CONFIG_KEY, Account(CONFIG["lamports"], bytes(glob), PROGRAM))
        for n in ["base_mint", "quote_mint", "pool_base_token_account", "pool_quote_token_account"]:
            rrow = f["accounts"][n]
            vm.set_account(Pubkey.from_string(f["keys"][n]),
                           Account(rrow["lamports"], base64.b64decode(rrow["data_base64"]),
                                   Pubkey.from_string(rrow["owner"])))
        data = bytearray(poolraw)
        data[245:261] = (0).to_bytes(16, "little", signed=True)
        data[271:287] = bytes(16)
        vm.set_account(pool, Account(f["accounts"]["pool"]["lamports"], bytes(data), PROGRAM))
        mint = struct.pack("<I", 1) + bytes(pool) + struct.pack("<Q", supply) + bytes([9, 1]) + bytes(36)
        vm.set_account(lp, Account(10**9, mint, TOKEN22))
        for k, m, own, amt, nat in ((userbase, base, TOKEN, 10**15, False),
                                    (userquote, quote, TOKEN, 10**15, True),
                                    (userlp, lp, TOKEN22, supply // 2, False)):
            vm.set_account(k, Account(amt + 2039280 if nat else 10**9,
                                      token(m, PAYER.pubkey(), amt, nat), own))
        if bps is not None:
            transferfee(quote, bps, 2**64 - 1)(SimpleNamespace(vm=vm), metas)
        vault_max(SimpleNamespace(vm=vm), metas)
        args = bytes(ix["discriminator"]) + struct.pack("<QQQ", supply, 0, 0)
        before_keys = sorted({str(m.pubkey) for m in metas}, key=str)
        before = snap(vm, [Pubkey.from_string(k) for k in before_keys])
        tx = Transaction.new_signed_with_payer(
            [Instruction(PROGRAM, args, metas)], PAYER.pubkey(), [PAYER], vm.latest_blockhash())
        raw = bytes(tx)
        checks = tx.verify_with_results()
        assert checks and all(checks), "new transaction must verify"
        r = vm.send_transaction(tx)
        failed = isinstance(r, FailedTransactionMetadata)
        meta = r.meta() if failed else r
        after = snap(vm, [Pubkey.from_string(k) for k in before_keys])
        err = str(r.err()) if failed else None
        logs = meta.logs()
        line = diag_line(logs)
        payer = str(PAYER.pubkey())
        assert failed, (label, image, "all four cases must fail")
        if isinstance(expected, tuple):
            assert line == expected[image_offset], (label, image, line, expected)
            assert err is not None and "6023" in err, (label, image, err)
        else:
            assert line is None and err is not None and expected in err, (label, image, err, line)
        assert before[payer]["lamports"] - after[payer]["lamports"] == 5000, (label, image)
        assert all(before[k] == after[k] for k in before if k != payer), (label, image, "rollback")
        receipts_global.append({
            "sequence": len(receipts_global), "vm": len(receipts_global),
            "context": {"index": index, "image": image, "instruction": "withdraw",
                        "mint": "quote", "label": label},
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
                               "sha256": "15a2e615a42e20f31714bbaaee43002ae6f1cda2e8d7118243117ab3c1342e2d"}},
            "error": err, "rollback_except_payer_fee": True, "payer_fee_lamports": 5000,
        })
        row[image] = {"error": err, "logs": logs,
                      "accounts": {k: v for k, v in after.items()}}
        print(f"  {label} [{image}] error={err} diag_line={line}")
    report_cases.append(row)

(OUT / "runtime").mkdir(parents=True, exist_ok=True)
raw = b"\n".join(json.dumps(r).encode() for r in receipts_global) + b"\n"
(OUT / "runtime/raw-transactions.jsonl.gz").write_bytes(gzip.compress(raw, mtime=0))
report = {
    "scope": "Fresh normally signed original/control/candidate triples closing the "
             "last open row of the bps-overflow family (see "
             "research/amm-transfer-fee-bps-overflow-20261028 and "
             "research/amm-trade-v2-bps-overflow-20261028): line 49, the "
             "calculate_fee overflow. It needs a fee input above "
             "u64::MAX*10000/bps (about 2.81e18 at bps 65535). Withdraw "
             "supplies it: the pool quote vault is maxed (u64::MAX) and the "
             "full LP supply is burned, so quote_amount is about u64::MAX "
             "and amount_after_fee's inner calculate_fee overflows at line "
             "49 on the original and the #427 candidate (control: 22). "
             "The valid-bps and no-patch variants fail identically later "
             "(quote-transfer overflow / LP burn), so the divergence is "
             "specific to the malformed-bps fee math, not the maxed vault.",
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
    "classifications": {"line-49-overflow": 2, "agreement-later-stage": 2},
    "mismatches": [0, 1],
    "cases": report_cases,
    "transaction_receipts": {"path": "raw-transactions.jsonl.gz",
                             "sha256": sha((OUT / "runtime/raw-transactions.jsonl.gz").read_bytes())},
}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(
    json.dumps(report, indent=1).encode(), mtime=0))
print("cases:", len(report_cases), "receipts:", len(receipts_global))
print("wrote:", OUT / "runtime/report.json.gz")
