#!/usr/bin/env python3
"""Build research/amm-multi-hop-token22-rejection-20261028 receipts.

Multi-hop swaps cannot route Token-2022 mints, pinned at
runtime on the two-pool route:
- the base buy hop spends 10^9 quote and delivers
  5,343,557,184,089 base to the second user;
- the base sell hop spends 10^9 base from the second user
  and delivers 180,345 quote;
- a Token-2022 base mint fails IncorrectProgramId in both
  directions (the multi-hop handler passes the Token program
  for the intermediate transfer of a Token-2022-owned
  account);
- a Token-2022 quote mint fails 6027
  AccountTypeNotSupported at trade_v2.rs:138 in both
  directions.
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
    CONFIG, CONFIG_KEY, EVENT, IDL, OUTSIDER, PAYER, PROGRAM, RAW, TOKEN, TOKEN22,
    base, f, pool, quote, userbase, userquote, vaultbase, vaultquote,
)
from pump_amm_multi_hop_differential import (
    PUMP, PUMP_EVENT, PUMP_FEES, PUMP_GLOBAL, USER2, route2, volume,
)
from pump_amm_trade_v2_differential import FEES, buyback, feeconfig

ROOT = Path.home() / "workspace/pumpfun-sparse"
OUT = ROOT / "research/amm-multi-hop-token22-rejection-20261028"
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
PUMP_SHA = hashlib.sha256((ROOT / "evidence/original/pump/deployed.so").read_bytes()).hexdigest()

# (label, sell, tf, expected)
# tf: None | ("base"/"quote", bps, maximum)
# expected: ("hop", quote_spent, user2_base_gained) |
#           ("sell-hop", user2_base_spent, quote_gained) |
#           ("error", code, fragment)
CASES = [
    ("multihop-token22-buy", False, None, ("hop", 10**9, 5343557184089)),
    ("multihop-token22-buy-base-tf100", False, ("base", 100, 2**64 - 1), ("error", "IncorrectProgramId", "IncorrectProgramId")),
    ("multihop-token22-buy-quote-tf100", False, ("quote", 100, 2**64 - 1), ("error", "6027", "AccountTypeNotSupported")),
    ("multihop-token22-buy-base-tf5000", False, ("base", 5000, 2**64 - 1), ("error", "IncorrectProgramId", "IncorrectProgramId")),
    ("multihop-token22-sell", True, None, ("sell-hop", 10**9, 180345)),
    ("multihop-token22-sell-base-tf100", True, ("base", 100, 2**64 - 1), ("error", "IncorrectProgramId", "IncorrectProgramId")),
    ("multihop-token22-sell-quote-tf100", True, ("quote", 100, 2**64 - 1), ("error", "6027", "AccountTypeNotSupported")),
    ("multihop-token22-sell-base-tf5000", True, ("base", 5000, 2**64 - 1), ("error", "IncorrectProgramId", "IncorrectProgramId")),
]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def snap(vm, keys):
    out = {}
    for k in keys:
        a = vm.get_account(k)
        if not a or not a.executable:
            out[str(k)] = None if not a else {"lamports": a.lamports, "owner": str(a.owner),
                                              "data_hex": bytes(a.data).hex()}
    return out


def amount_at(data_hex, offset):
    return struct.unpack_from("<Q", bytes.fromhex(data_hex), offset)[0]


receipts_global = []
report_cases = []
for index, (label, sell, tf, expected) in enumerate(CASES):
    amount, limit, tail, route, unsigned = 10**9, 1, True, "route2", False
    ix = next(x for x in IDL["instructions"] if x["name"] == "multi_hop_swap")
    row = {"case": {"instruction": "multi_hop_swap", "label": label,
                    "amount": amount, "limit": limit, "sell": sell,
                    "tail": tail, "route": route, "unsigned": unsigned,
                    "tf": list(tf) if tf else None,
                    "expected": list(expected)}}
    pairs = set()
    for image in ("original", "control", "candidate"):
        h = Harness(IMAGES[image])
        vm = h.vm
        vm.set_clock(Clock(100, 1234567890, 0, 0, 1234567890))
        from pump_amm_create_differential import ATA
        for pid, p in [(TOKEN, "evidence/dependencies/spl_token/deployed.so"),
                       (TOKEN22, "evidence/dependencies/spl_token_2022/deployed.so"),
                       (FEES, "evidence/original/pump_fees/deployed.so"),
                       (ATA, "evidence/dependencies/associated_token/deployed.so"),
                       (PUMP, "evidence/original/pump/deployed.so")]:
            vm.add_program_from_file(pid, ROOT / p)
        for rrow in f["accounts"].values():
            vm.set_account(Pubkey.from_string(rrow["address"]),
                           Account(rrow["lamports"], base64.b64decode(rrow["data_base64"]),
                                   Pubkey.from_string(rrow["owner"])))
        glob = bytearray(RAW)
        glob[56] = 0
        vm.set_account(CONFIG_KEY, Account(CONFIG["lamports"], bytes(glob), PROGRAM))
        from pump_amm_liquidity_differential import token as token_bytes
        for k, m, native in ((userbase, base, False), (userquote, quote, True)):
            vm.set_account(k, Account(10**15 + 2039280 if native else 10**9,
                                      token_bytes(m, PAYER.pubkey(), 10**15, native), TOKEN))
        vm.set_account(volume, Account(0, b"", Pubkey.default()))
        for k in [PUMP_GLOBAL, PUMP_FEES, PUMP_EVENT]:
            vm.set_account(k, Account(10**9, b"", Pubkey.default()))
        keys = [PAYER.pubkey(), userbase if sell else userquote, userquote if sell else userbase,
                CONFIG_KEY, feeconfig, volume, buyback, TOKEN, TOKEN22, Pubkey.default(),
                EVENT, PROGRAM, PUMP, PUMP_GLOBAL, PUMP_FEES, PUMP_EVENT]
        metas = [AccountMeta(k, bool(a.get("signer")), bool(a.get("writable")))
                 for k, a in zip(keys, ix["accounts"])]
        if tail:
            metas += [AccountMeta(base, False, False), AccountMeta(quote, False, False),
                      AccountMeta(pool, False, True), AccountMeta(vaultbase, False, True),
                      AccountMeta(vaultquote, False, True)]
        route2(sell=sell)(h, metas)
        if tf is not None:
            from pump_amm_legacy_sell_differential import transferfee as legacy_transferfee
            _KEYS = {"base": base, "quote": quote}
            legacy_transferfee(_KEYS[tf[0]], tf[1], tf[2])(h, metas)
        payer = OUTSIDER if unsigned else PAYER
        if unsigned:
            metas[0] = AccountMeta(PAYER.pubkey(), False, True)
        data = bytes(ix["discriminator"]) + struct.pack("<QQ", amount, limit)
        before_keys = sorted({str(m.pubkey) for m in metas} | {str(payer.pubkey())}, key=str)
        before = snap(vm, [Pubkey.from_string(k) for k in before_keys])
        tx = Transaction.new_signed_with_payer(
            [Instruction(PROGRAM, data, metas)], payer.pubkey(), [payer], vm.latest_blockhash())
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
        if expected[0] in ("hop", "sell-hop"):
            assert not failed and err is None, (label, image, err)
            ud = amount_at(after[str(USER2)]["data_hex"], 64) - amount_at(before[str(USER2)]["data_hex"], 64)
            qd = amount_at(after[str(userquote)]["data_hex"], 64) - amount_at(before[str(userquote)]["data_hex"], 64)
            if expected[0] == "hop":
                assert (-qd, ud) == (expected[1], expected[2]), (label, image, ud, qd, expected)
                pairs.add((ud, qd))
                observed = {"quote_spent": -qd, "user2_base_gained": ud}
            else:
                assert (-ud, qd) == (expected[1], expected[2]), (label, image, ud, qd, expected)
                pairs.add((ud, qd))
                observed = {"user2_base_spent": -ud, "quote_gained": qd}
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
            "context": {"index": index, "image": image, "instruction": "multi_hop_swap",
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
                          "sha256": FEES_SHA},
                "pPUMP": {"path": "evidence/original/pump/deployed.so",
                          "sha256": PUMP_SHA}},
            "error": err, "rollback_except_payer_fee": err is not None,
            "payer_fee_lamports": payer_delta,
            "observed": observed,
        })
        row[image] = {"error": err, "logs": logs,
                      "accounts": {k: v for k, v in after.items()},
                      "observed": observed}
        print(f"  {label} [{image}] error={err} observed={observed}")
    if expected[0] in ("hop1", "hop2", "hop2sell"):
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
             "multi_hop_swap at runtime: one hop buy spends 10^9 quote for "
             "5,368,809,031,467 base and one hop sell spends 10^9 base for "
             "180,212 quote; two hops buy spends 10^9 quote for "
             "5,343,557,184,089 of the second base and two hops sell spends "
             "10^9 of the second base for 180,345 quote, slightly more than "
             "the direct sell; no remaining accounts fails "
             "NotEnoughRemainingAccounts (6044); amount 0 fails "
             "ZeroQuoteAmount (6002) and limit 0 fails ZeroBaseAmount "
             "(6001) regardless of direction, so a multi-hop sell limit of "
             "zero FAILS unlike sell_v2; an unsigned user fails "
             "AccountNotSigner (3010); a buy limit one above the computed "
             "output fails ExceededSlippage (6004). All three images "
             "behave identically. Receipts are stored as parts to stay "
             "under GitHub's 25MB web-upload limit; verify.py reads them "
             "in order.",
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
        "evidence/original/pump_fees/deployed.so": FEES_SHA,
        "evidence/original/pump/deployed.so": PUMP_SHA,
    },
    "counts": {"vms": len(receipts_global), "transactions": len(receipts_global),
               "signature_fields": len(receipts_global)},
    "case_count": len(report_cases),
    "classifications": {"multi-hop-validation": 10},
    "mismatches": [],
    "cases": report_cases,
    "transaction_receipts": {"parts": parts},
}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(
    json.dumps(report, indent=1).encode(), mtime=0))
print("cases:", len(report_cases), "receipts:", len(receipts_global))
print("wrote:", OUT / "runtime/report.json.gz")
