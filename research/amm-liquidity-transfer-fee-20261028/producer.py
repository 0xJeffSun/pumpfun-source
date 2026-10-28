#!/usr/bin/env python3
"""Build research/amm-liquidity-transfer-fee-20261028 receipts.

Deposit grosses the quote up and withdraw nets it down under a
quote transfer fee, pinned at runtime on the as-is fixture pool:
- deposit with no fee spends 29,312,410 quote for 10^9 LP;
- deposit with a 1% fee spends 29,608,495 (gross-up +296,085);
- deposit with a 50% fee spends 58,624,820 (exactly double);
- deposit with a 100% fee fails Overflow (6023) in
  amount_before_fee, and a 100% fee at the deposit cap fails the
  same way;
- a deposit whose quote cap is the no-fee spend fails
  ExceededSlippage (6004), because the grossed-up spend exceeds it;
- withdraw with no fee gains 29,312,409 quote for 10^9 LP burned;
- withdraw with a 1% fee gains 29,019,284 (net -293,125);
- withdraw with a 100% fee gains 0 quote and still burns the LP;
- a withdraw whose quote minimum is the no-fee receipt fails
  ExceededSlippage (6004), because the net receipt is smaller.
Base amounts are identical with and without the fee in every case.
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
    base, f, lp, pool, poolraw, quote, supply, token, userbase,
    userlp, userquote, vaultbase, vaultquote,
)

ROOT = Path.home() / "workspace/pumpfun-sparse"
OUT = ROOT / "research/amm-liquidity-transfer-fee-20261028"
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

# (instruction, label, amount, base_limit, quote_limit, tf,
#  expected ("ok", base_delta, quote_delta, lp_delta) or
#  ("error", code, log fragment))
MX = 2**64 - 1
CASES = [
    ("deposit", "deposit-nofee", 10**9, MX, MX, None, ("ok", -160619895224, -29312410, 10**9)),
    ("deposit", "deposit-tf100", 10**9, MX, MX, (100, MX), ("ok", -160619895224, -29608495, 10**9)),
    ("deposit", "deposit-tf5000", 10**9, MX, MX, (5000, MX), ("ok", -160619895224, -58624820, 10**9)),
    ("deposit", "deposit-tf10000", 10**9, MX, MX, (10000, MX), ("error", "6023", "Overflow")),
    ("deposit", "deposit-tf10001", 10**9, MX, MX, (10001, MX), ("error", "6023", "Overflow")),
    ("deposit", "deposit-tf100-max-nofee", 10**9, MX, 29312410, (100, MX), ("error", "6004", "ExceededSlippage")),
    ("withdraw", "withdraw-nofee", 10**9, 0, 0, None, ("ok", 160619895223, 29312409, -10**9)),
    ("withdraw", "withdraw-tf100", 10**9, 0, 0, (100, MX), ("ok", 160619895223, 29019284, -10**9)),
    ("withdraw", "withdraw-tf10000", 10**9, 0, 0, (10000, MX), ("ok", 160619895223, 0, -10**9)),
    ("withdraw", "withdraw-tf100-min-nofee", 10**9, 0, 29312409, (100, MX), ("error", "6004", "ExceededSlippage")),
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
for index, (instruction, label, amount, base_limit, quote_limit, tf, expected) in enumerate(CASES):
    ix = next(x for x in IDL["instructions"] if x["name"] == instruction)
    metas = [AccountMeta(k, sign, w) for k, sign, w in [
        (pool, False, True), (CONFIG_KEY, False, False), (PAYER.pubkey(), True, False),
        (base, False, False), (quote, False, False), (lp, False, True),
        (userbase, False, True), (userquote, False, True), (userlp, False, True),
        (vaultbase, False, True), (vaultquote, False, True),
        (TOKEN, False, False), (TOKEN22, False, False),
        (EVENT, False, False), (PROGRAM, False, False)]]
    row = {"case": {"instruction": instruction, "label": label,
                    "expected": list(expected), "amount": amount,
                    "base_limit": base_limit, "quote_limit": quote_limit,
                    "tf": list(tf) if tf else None}}
    pairs = set()
    for image in ("original", "control", "candidate"):
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
        vm.set_account(pool, Account(f["accounts"]["pool"]["lamports"], bytes(poolraw), PROGRAM))
        mint = struct.pack("<I", 1) + bytes(pool) + struct.pack("<Q", supply) + bytes([9, 1]) + bytes(36)
        vm.set_account(lp, Account(10**9, mint, TOKEN22))
        for k, m, own, amt, nat in ((userbase, base, TOKEN, 10**15, False),
                                    (userquote, quote, TOKEN, 10**15, True),
                                    (userlp, lp, TOKEN22, supply // 2, False)):
            vm.set_account(k, Account(amt + 2039280 if nat else 10**9,
                                      token(m, PAYER.pubkey(), amt, nat), own))
        if tf is not None:
            from pump_amm_liquidity_differential import transferfee
            transferfee(quote, tf[0], tf[1])(SimpleNamespace(vm=vm), metas)
        args = bytes(ix["discriminator"]) + struct.pack("<QQQ", amount, base_limit, quote_limit)
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
        payer = str(PAYER.pubkey())
        payer_delta = before[payer]["lamports"] - after[payer]["lamports"]
        observed = {}
        if expected[0] == "ok":
            assert not failed and err is None, (label, image, err)
            ub_key, uq_key, ul_key = str(userbase), str(userquote), str(userlp)
            base_delta = amount_at(after[ub_key]["data_hex"], 64) - amount_at(before[ub_key]["data_hex"], 64)
            quote_delta = amount_at(after[uq_key]["data_hex"], 64) - amount_at(before[uq_key]["data_hex"], 64)
            lp_delta = amount_at(after[ul_key]["data_hex"], 64) - amount_at(before[ul_key]["data_hex"], 64)
            assert (base_delta, quote_delta, lp_delta) == (expected[1], expected[2], expected[3]), \
                (label, image, base_delta, quote_delta, lp_delta, expected)
            if instruction == "deposit":
                observed = {"base_spent": -base_delta, "quote_spent": -quote_delta, "lp_gained": lp_delta}
            else:
                observed = {"base_gained": base_delta, "quote_gained": quote_delta, "lp_burned": -lp_delta}
            pairs.add((base_delta, quote_delta, lp_delta))
        else:
            assert failed and err is not None and expected[1] in err, (label, image, err)
            assert expected[2] in "\n".join(logs), (label, image, logs[-3:])
            assert payer_delta == 5000, (label, image, payer_delta)
            site = next((l for l in logs if "thrown in" in l or "caused by account" in l), None)
            row.setdefault("error_sites", {})[image] = site
            assert all(before[k] == after[k] for k in before if k != payer), \
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
                               "sha256": IMAGE_SHA[image]},
                str(TOKEN): {"path": "evidence/dependencies/spl_token/deployed.so",
                             "sha256": "8190d3f7ceb6cb7a7a8d8924bff89f9f611e15ce1f806f2b6237f3311a98f697"},
                str(TOKEN22): {"path": "evidence/dependencies/spl_token_2022/deployed.so",
                               "sha256": "15a2e615a42e20f31714bbaaee43002ae6f1cda2e8d7118243117ab3c1342e2d"}},
            "error": err, "rollback_except_payer_fee": failed,
            "payer_fee_lamports": payer_delta,
            "observed": observed,
        })
        row[image] = {"error": err, "logs": logs,
                      "accounts": {k: v for k, v in after.items()},
                      "observed": observed}
        print(f"  {label} [{image}] error={err} observed={observed}")
    if expected[0] == "ok":
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
report = {
    "scope": "Fresh normally signed original/control/candidate triples pinning "
             "liquidity transfer-fee netting at runtime on the as-is "
             "fixture pool: deposit grosses the quote up (1% fee spends "
             "29,608,495, 50% spends exactly double, 100% fails Overflow "
             "in amount_before_fee) and a quote cap at the no-fee spend "
             "fails ExceededSlippage; withdraw nets the quote down (1% "
             "gains 29,019,284, 100% gains 0 and still burns the LP) and "
             "a quote minimum at the no-fee receipt fails ExceededSlippage. "
             "Base amounts are identical with and without the fee. All "
             "three images behave identically. Receipts are stored as "
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
    },
    "counts": {"vms": len(receipts_global), "transactions": len(receipts_global),
               "signature_fields": len(receipts_global)},
    "case_count": len(report_cases),
    "classifications": {"liquidity-transfer-fee": 10},
    "mismatches": [],
    "cases": report_cases,
    "transaction_receipts": {"parts": parts},
}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(
    json.dumps(report, indent=1).encode(), mtime=0))
print("cases:", len(report_cases), "receipts:", len(receipts_global))
print("wrote:", OUT / "runtime/report.json.gz")
