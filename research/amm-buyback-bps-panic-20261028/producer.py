#!/usr/bin/env python3
"""Build research/amm-buyback-bps-panic-20261028 receipts.

A global-config buyback_basis_points above the valid maximum (10000)
panics the v2 trade paths: buyback_fee = protocol_fee * bps / 10000
exceeds protocol_fee, tripping the `buyback_fee never exceeds
protocol_fee` expect. Original panics in state/global_config.rs:391;
the #424 control and #427 candidate panic in trade_v2.rs:122 (buy)
and pool.rs:21 (sell): same message, moved sites. Valid bps trades
succeed identically on all images.
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
    base, f, pool, quote, userbase, userquote, vaultbase, vaultquote,
)
from pump_amm_trade_v2_differential import FEES, buyback, feeconfig, volume

ROOT = Path.home() / "workspace/pumpfun-sparse"
OUT = ROOT / "research/amm-buyback-bps-panic-20261028"
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

CASES = [
    # (label, instruction, buyback_bps, amount, limit, expected)
    # expected: ("panic", orig_site, other_site) or ("success",)
    ("buy_v2-buyback-65535", "buy_v2", 65535, 10**10, 10**9,
     ("panic", "state/global_config.rs:391:14", "instructions/swap/trade_v2.rs:122:14")),
    ("buy_v2-buyback-10001", "buy_v2", 10001, 10**10, 10**9,
     ("panic", "state/global_config.rs:391:14", "instructions/swap/trade_v2.rs:122:14")),
    ("sell_v2-buyback-65535", "sell_v2", 65535, 10**10, 1,
     ("panic", "state/global_config.rs:391:14", "state/pool.rs:21:18")),
    ("sell_v2-buyback-10001", "sell_v2", 10001, 10**10, 1,
     ("panic", "state/global_config.rs:391:14", "state/pool.rs:21:18")),
    ("buy_v2-buyback-5000-success", "buy_v2", 5000, 10**10, 10**9, ("success",)),
    ("sell_v2-buyback-10000-success", "sell_v2", 10000, 10**10, 1, ("success",)),
]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def panic_site(logs):
    for line in logs:
        if "panicked at programs/pump-amm/src/" in line:
            return line.split("programs/pump-amm/src/")[1].split(":")[0] + ":" + \
                line.split("programs/pump-amm/src/")[1].split(":")[1] + ":" + \
                line.split("programs/pump-amm/src/")[1].split(":")[2].split("\\")[0]
    return None


def snap(vm, keys):
    out = {}
    for k in keys:
        a = vm.get_account(k)
        out[str(k)] = {"owner": str(a.owner), "lamports": a.lamports,
                       "executable": a.executable, "data_hex": a.data.hex()} if a else None
    return out


def buyback_patch(value):
    def ov(h, m):
        a = h.vm.get_account(CONFIG_KEY)
        d = bytearray(a.data)
        d[899:907] = struct.pack("<Q", value)
        h.vm.set_account(CONFIG_KEY, Account(a.lamports, bytes(d), a.owner))
    return ov


receipts_global = []
report_cases = []
for index, (label, name, bps, amount, limit, expected) in enumerate(CASES):
    ix = next(x for x in IDL["instructions"] if x["name"] == name)
    keys = [pool, PAYER.pubkey(), CONFIG_KEY, base, quote, userbase, userquote,
            vaultbase, vaultquote, TOKEN, TOKEN, Pubkey.default(), volume,
            feeconfig, buyback, EVENT, PROGRAM]
    row = {"case": {"instruction": name, "label": label, "buyback_bps": bps,
                    "amount": amount, "limit": limit}}
    success_afters = []
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
        buyback_patch(bps)(SimpleNamespace(vm=vm), metas)
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
        site = panic_site(logs)
        payer = str(PAYER.pubkey())
        payer_delta = before[payer]["lamports"] - after[payer]["lamports"]
        if expected[0] == "panic":
            assert payer_delta == 5000, (label, image, payer_delta)
            assert failed and err is not None and "ProgramFailedToComplete" in err, (label, image, err)
            want = expected[1] if image == "original" else expected[2]
            assert site == want, (label, image, site, want)
            assert "buyback_fee never exceeds protocol_fee" in "\n".join(logs)
            assert all(before[k] == after[k] for k in before if k != payer), (label, image, "rollback")
        else:
            assert not failed and err is None, (label, image, err)
            success_afters.append(after)
        receipts_global.append({
            "sequence": len(receipts_global), "vm": len(receipts_global),
            "context": {"index": index, "image": image, "instruction": name, "label": label},
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
            "error": err, "rollback_except_payer_fee": failed, "payer_fee_lamports": payer_delta,
        })
        row[image] = {"error": err, "logs": logs,
                      "accounts": {k: v for k, v in after.items()}}
        print(f"  {label} [{image}] error={err} panic_site={site}")
    if expected[0] == "success":
        # Program accounts (executable) hold the image bytes themselves and
        # differ by construction; every data account must agree instead.
        def data_states(snap):
            return {k: v for k, v in snap.items()
                    if v is None or not v["executable"]}
        assert data_states(success_afters[0]) == data_states(success_afters[1]) == \
            data_states(success_afters[2]), (label, "success states must agree across images")
    report_cases.append(row)

(OUT / "runtime").mkdir(parents=True, exist_ok=True)
raw = b"\n".join(json.dumps(r).encode() for r in receipts_global) + b"\n"
(OUT / "runtime/raw-transactions.jsonl.gz").write_bytes(gzip.compress(raw, mtime=0))
report = {
    "scope": "Fresh normally signed original/control/candidate triples showing that "
             "a global-config buyback_basis_points above the valid maximum "
             "(10000) panics the v2 trade paths: buyback_fee = protocol_fee "
             "* bps / 10000 exceeds protocol_fee, tripping the "
             "`buyback_fee never exceeds protocol_fee` expect. The original "
             "panics in state/global_config.rs:391; the #424 control and "
             "#427 candidate panic in trade_v2.rs:122 (buy) and pool.rs:21 "
             "(sell): same message, moved sites. Valid bps trades succeed "
             "identically on all images.",
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
    "classifications": {"buyback-panic": 4, "success-agreement": 2},
    "mismatches": [0, 1, 2, 3],
    "cases": report_cases,
    "transaction_receipts": {"path": "raw-transactions.jsonl.gz",
                             "sha256": sha((OUT / "runtime/raw-transactions.jsonl.gz").read_bytes())},
}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(
    json.dumps(report, indent=1).encode(), mtime=0))
print("cases:", len(report_cases), "receipts:", len(receipts_global))
print("wrote:", OUT / "runtime/report.json.gz")
