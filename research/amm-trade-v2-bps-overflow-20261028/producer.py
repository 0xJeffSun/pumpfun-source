#!/usr/bin/env python3
"""Build research/amm-trade-v2-bps-overflow-20261028 receipts.

Six cases x three images (original / #424 control / #427 candidate), all
fresh LiteSVM executions with normally signed transactions, reusing the
repository's own trade-v2 differential harness setup and its
trade_transferfee mint override (bps above the SPL-valid maximum).

Cases: sell_v2 and buy_v2 with quote-mint bps 65535 / 10001. The sell path
reports line 57 (control: 28) via amount_after_fee; the buy path reports
line 67 (control: 35) via amount_before_fee. The amount-1 sell case errors
identically (6004) on all images: no divergence at the boundary.
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
from solders.litesvm import LiteSVM
from solders.pubkey import Pubkey
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata

from pump_amm_admin_differential import Harness
from pump_amm_liquidity_differential import (
    CONFIG, CONFIG_KEY, EVENT, IDL, OUTSIDER, PAYER, PROGRAM, RAW, TOKEN, TOKEN22,
    base, f, pool, quote, userbase, userquote, vaultbase, vaultquote,
)
from pump_amm_trade_v2_differential import FEES, buyback, feeconfig, trade_transferfee, volume

ROOT = Path.home() / "workspace/pumpfun-sparse"
OUT = ROOT / "research/amm-trade-v2-bps-overflow-20261028"
AMM = PROGRAM


def _decompress(path):
    # Distinct output per source packet: both artifacts are named candidate.so.gz.
    out = Path("/tmp") / ("trade-overflow-" + path.parent.parent.name + "-candidate.so")
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
FEES_SHA = hashlib.sha256((ROOT / "evidence/original/pump_fees/deployed.so").read_bytes()).hexdigest()

CASES = [
    # (label, instruction, bps, amount, limit, expected lines or agreement error)
    ("sell_v2-bps-65535-amount-10000000000", "sell_v2", 65535, 10**10, 1, (57, 28, 57)),
    ("sell_v2-bps-10001-amount-10000000000", "sell_v2", 10001, 10**10, 1, (57, 28, 57)),
    ("sell_v2-bps-65535-amount-1-agreement", "sell_v2", 65535, 1, 1, "6004"),
    ("buy_v2-bps-65535-amount-10000000000", "buy_v2", 65535, 10**10, 10**9, (67, 35, 67)),
    ("buy_v2-bps-10001-amount-10000000000", "buy_v2", 10001, 10**10, 10**9, (67, 35, 67)),
    ("buy_v2-bps-65535-amount-1", "buy_v2", 65535, 1, 10**9, (67, 35, 67)),
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


receipts_global = []
case_index = 0
report_cases = []
for label, name, bps, amount, limit, expected in CASES:
    ix = next(x for x in IDL["instructions"] if x["name"] == name)
    keys = [pool, PAYER.pubkey(), CONFIG_KEY, base, quote, userbase, userquote,
            vaultbase, vaultquote, TOKEN, TOKEN, Pubkey.default(), volume,
            feeconfig, buyback, EVENT, PROGRAM]
    row = {"case": {"instruction": name, "mint": "quote", "label": label,
                    "bps": bps, "maximum_fee": 2**64 - 1, "amount": amount, "limit": limit}}
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
        trade_transferfee(quote, bps, 2**64 - 1)(SimpleNamespace(vm=vm), metas)
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
        line = diag_line(logs)
        payer = str(PAYER.pubkey())
        if isinstance(expected, tuple):
            want = expected[image_offset]
            assert line == want, (label, image, line, want)
            assert err is not None and "6023" in err, (label, image, err)
        else:
            assert line is None and err is not None and expected in err, (label, image, err, line)
        assert failed, (label, image, "all six cases must fail")
        assert before[payer]["lamports"] - after[payer]["lamports"] == 5000, (label, image)
        assert all(before[k] == after[k] for k in before if k != payer), (label, image, "rollback")
        receipts_global.append({
            "sequence": len(receipts_global), "vm": len(receipts_global),
            "context": {"index": case_index, "image": image, "instruction": name,
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
                               "sha256": "15a2e615a42e20f31714bbaaee43002ae6f1cda2e8d7118243117ab3c1342e2d"},
                str(FEES): {"path": "evidence/original/pump_fees/deployed.so",
                            "sha256": FEES_SHA}},
            "error": err, "rollback_except_payer_fee": True, "payer_fee_lamports": 5000,
        })
        row[image] = {"error": err, "logs": logs,
                      "accounts": {k: v for k, v in after.items()}}
        print(f"  {label} [{image}] error={err} diag_line={line}")
    report_cases.append(row)
    case_index += 1

(OUT / "runtime").mkdir(parents=True, exist_ok=True)
raw = b"\n".join(json.dumps(r).encode() for r in receipts_global) + b"\n"
(OUT / "runtime/raw-transactions.jsonl.gz").write_bytes(gzip.compress(raw, mtime=0))
report = {
    "scope": "Fresh normally signed original/control/candidate triples extending the "
             "bps-overflow family (see research/amm-transfer-fee-bps-overflow-20261028) "
             "from liquidity deposit/withdraw to the v2 trade instructions. The quote-mint "
             "fee entry carries bps above the SPL-valid maximum (10001, 65535); the "
             "decoder accepts any u16 bps, so the malformed schedule reaches the trade "
             "fee arithmetic. Sell reports line 57 (control: 28) via amount_after_fee; "
             "buy reports line 67 (control: 35) via amount_before_fee.",
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
    "classifications": {"line-57-overflow": 2, "line-67-overflow": 3, "agreement-6004": 1},
    "mismatches": [0, 1, 3, 4, 5],
    "cases": report_cases,
    "transaction_receipts": {"path": "raw-transactions.jsonl.gz",
                             "sha256": sha((OUT / "runtime/raw-transactions.jsonl.gz").read_bytes())},
}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(
    json.dumps(report, indent=1).encode(), mtime=0))
print("cases:", len(report_cases), "receipts:", len(receipts_global))
print("wrote:", OUT / "runtime/report.json.gz")
