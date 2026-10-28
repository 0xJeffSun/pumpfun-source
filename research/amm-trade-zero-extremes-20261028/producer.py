#!/usr/bin/env python3
"""Build research/amm-trade-zero-extremes-20261028 receipts.

trade_v2 zero and extreme inputs are validated per side, pinned
at runtime:
- buy_v2 amount 0 fails ZeroBaseAmount (6001) and limit 0 fails
  ZeroQuoteAmount (6002);
- sell_v2 amount 0 fails ZeroBaseAmount (6001), but limit 0
  SUCCEEDS and sells 10^9 for 180,212: a sell limit of zero means
  accept anything, while a buy limit of zero is invalid;
- buy_exact_quote_in_v2 amount 0 fails ZeroQuoteAmount (6002)
  and limit 0 fails ZeroBaseAmount (6001), and a limit exactly
  equal to the computed output (54,115,018,303) passes;
- buy_v2 for more than the pool reserves fails
  BuyMoreBaseAmountThanPoolReserves (6016);
- sell_v2 for more than the user holds fails with the token
  program's insufficient funds (error 1), not a program error.
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
OUT = ROOT / "research/amm-trade-zero-extremes-20261028"
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

# (instruction, label, amount, limit, expected)
# expected: ("buy", base_gained, quote_spent) |
#           ("sell", base_spent, quote_gained) |
#           ("error", code, log fragment)
CASES = [
    ("buy_v2", "buy-zero-amount", 0, 1, ("error", "6001", "ZeroBaseAmount")),
    ("buy_v2", "buy-zero-limit", 10**10, 0, ("error", "6002", "ZeroQuoteAmount")),
    ("sell_v2", "sell-zero-amount", 0, 1, ("error", "6001", "ZeroBaseAmount")),
    ("sell_v2", "sell-zero-limit-ok", 10**9, 0, ("sell", 10**9, 180212)),
    ("buy_exact_quote_in_v2", "buy-exact-zero-amount", 0, 1, ("error", "6002", "ZeroQuoteAmount")),
    ("buy_exact_quote_in_v2", "buy-exact-zero-limit", 10**7, 0, ("error", "6001", "ZeroBaseAmount")),
    ("buy_exact_quote_in_v2", "buy-exact-limit-exact", 10**7, 54115018303, ("buy", 54115018303, 10**7)),
    ("buy_v2", "buy-u64max", 2**64 - 1, 2**64 - 1, ("error", "6016", "BuyMoreBaseAmountThanPoolReserves")),
    ("sell_v2", "sell-u64max", 2**64 - 1, 0, ("error", "1", "insufficient funds")),
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
for index, (instruction, label, amount, limit, expected) in enumerate(CASES):
    ix = next(x for x in IDL["instructions"] if x["name"] == instruction)
    keys = [pool, PAYER.pubkey(), CONFIG_KEY, base, quote, userbase, userquote,
            vaultbase, vaultquote, TOKEN, TOKEN, Pubkey.default(), volume,
            feeconfig, buyback, EVENT, PROGRAM]
    row = {"case": {"instruction": instruction, "label": label,
                    "expected": list(expected), "amount": amount, "limit": limit}}
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
        data = bytes(ix["discriminator"]) + struct.pack("<QQ", amount, limit)
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
        if expected[0] in ("buy", "sell"):
            assert not failed and err is None, (label, image, err)
            uq_key, ub_key = str(userquote), str(userbase)
            base_delta = amount_at(after[ub_key]["data_hex"], 64) - amount_at(before[ub_key]["data_hex"], 64)
            quote_delta = amount_at(after[uq_key]["data_hex"], 64) - amount_at(before[uq_key]["data_hex"], 64)
            if expected[0] == "buy":
                assert base_delta == expected[1], (label, image, base_delta, expected)
                assert -quote_delta == expected[2], (label, image, quote_delta, expected)
                pairs.add((base_delta, -quote_delta))
                observed = {"base_gained": base_delta, "quote_spent": -quote_delta}
            else:
                assert -base_delta == expected[1], (label, image, base_delta, expected)
                assert quote_delta == expected[2], (label, image, quote_delta, expected)
                pairs.add((-base_delta, quote_delta))
                observed = {"base_spent": -base_delta, "quote_gained": quote_delta}
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
    if expected[0] in ("buy", "sell"):
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
             "trade_v2 zero and extreme inputs at runtime: buy_v2 "
             "amount 0 fails ZeroBaseAmount (6001) and limit 0 fails "
             "ZeroQuoteAmount (6002); sell_v2 amount 0 fails ZeroBaseAmount "
             "(6001) but limit 0 SUCCEEDS and sells 10^9 for 180,212, so a "
             "sell limit of zero means accept anything while a buy limit "
             "of zero is invalid; buy_exact_quote_in_v2 amount 0 fails "
             "ZeroQuoteAmount (6002) and limit 0 fails ZeroBaseAmount "
             "(6001), and a limit exactly equal to the computed output "
             "(54,115,018,303) passes; buy_v2 for more than the pool "
             "reserves fails BuyMoreBaseAmountThanPoolReserves (6016); "
             "sell_v2 for more than the user holds fails with the token "
             "program's insufficient funds (error 1), not a program error. "
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
    "classifications": {"trade-zero-extremes": 9},
    "mismatches": [],
    "cases": report_cases,
    "transaction_receipts": {"parts": parts},
}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(
    json.dumps(report, indent=1).encode(), mtime=0))
print("cases:", len(report_cases), "receipts:", len(receipts_global))
print("wrote:", OUT / "runtime/report.json.gz")
