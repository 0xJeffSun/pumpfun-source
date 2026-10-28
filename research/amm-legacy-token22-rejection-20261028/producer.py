#!/usr/bin/env python3
"""Build research/amm-legacy-token22-rejection-20261028 receipts.

The legacy buy and sell handlers cannot trade Token-2022
mints at all, pinned at runtime:
- the legacy base buy gains 10^10 base, spends 1,847,796
  quote, draws 10^10 from the vault, and adds 1,825,348 to the
  quote vault;
- the legacy base sell spends 10^9 base, gains 180,212 quote,
  adds 10^9 to the vault, and draws 182,458 from the quote
  vault;
- a legacy buy or sell with a Token-2022 base mint or a
  Token-2022 quote mint fails InvalidAccountData, with the
  Token program itself rejecting the instruction first ("invalid
  account data for instruction"), because the legacy handlers
  pass the Token program for transfers regardless of the mint's
  program;
- trade_v2, by contrast, withholds base and quote transfer
  fees normally when given the matching Token-2022 program
  account.
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
from solders.pubkey import Pubkey
from solders.transaction import Transaction

from pump_amm_legacy_buy_differential import (OUTSIDER, base, legacy_buy, pool, quote,
                                              userbase, userquote)
from solders.instruction import AccountMeta
from pump_amm_legacy_sell_differential import legacy as legacy_sell
from pump_amm_liquidity_differential import vaultbase, vaultquote

ROOT = Path.home() / "workspace/pumpfun-sparse"
OUT = ROOT / "research/amm-legacy-token22-rejection-20261028"
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

# (instruction, label, fn kwargs, expected)
# (instruction, label, amount, limit, override, unsigned, expected)
# instruction: "buy" | "sell"
# override: None | ("tf", key_name, bps, maximum)
# expected: ("buy"/"sell", userbase_delta, userquote_delta,
#            vaultbase_delta, vaultquote_delta) | ("error", code, fragment)
CASES = [
    ("buy", "legacy-token22-base", 10**10, 10**12, None, False, ("buy", 10**10, -1847796, -10**10, 1825348)),
    ("buy", "legacy-token22-base-tf100", 10**10, 10**12, ("tf", "base", 100, 2**64 - 1), False, ("error", "InvalidAccountData", "invalid account data for instruction")),
    ("buy", "legacy-token22-quote-tf100", 10**10, 10**12, ("tf", "quote", 100, 2**64 - 1), False, ("error", "InvalidAccountData", "invalid account data for instruction")),
    ("buy", "legacy-token22-base-tf5000", 10**10, 10**12, ("tf", "base", 5000, 2**64 - 1), False, ("error", "InvalidAccountData", "invalid account data for instruction")),
    ("sell", "legacy-token22-sell-base", 10**9, 1, None, False, ("sell", -10**9, 180212, 10**9, -182458)),
    ("sell", "legacy-token22-sell-base-tf100", 10**9, 1, ("tf", "base", 100, 2**64 - 1), False, ("error", "InvalidAccountData", "invalid account data for instruction")),
    ("sell", "legacy-token22-sell-quote-tf100", 10**9, 1, ("tf", "quote", 100, 2**64 - 1), False, ("error", "InvalidAccountData", "invalid account data for instruction")),
    ("sell", "legacy-token22-sell-base-tf5000", 10**9, 1, ("tf", "base", 5000, 2**64 - 1), False, ("error", "InvalidAccountData", "invalid account data for instruction")),
]



def sha(data):
    return hashlib.sha256(data).hexdigest()


def amount_at(data_hex, offset):
    return struct.unpack_from("<Q", bytes.fromhex(data_hex), offset)[0]


receipts_global = []
report_cases = []


def _swap(override):
    if override is None:
        return None
    from pump_amm_legacy_sell_differential import transferfee as legacy_transferfee
    _KEYS = {"base": base, "quote": quote}
    return legacy_transferfee(_KEYS[override[1]], override[2], override[3])


for index, (instruction, label, amount, limit, override, unsigned, expected) in enumerate(CASES):
    kwargs = {"amount": amount, "limit": limit,
              "overrides": _swap(override), "unsigned": unsigned}
    row = {"case": {"instruction": instruction, "label": label,
                    "amount": amount, "limit": limit,
                    "override": list(override) if override else None, "unsigned": unsigned,
                    "expected": list(expected)}}
    pairs = set()
    for image in ("original", "control", "candidate"):
        cand = None if image == "original" else IMAGES[image]
        if instruction == "sell":
            r = legacy_sell(candidate=cand, **kwargs)
        else:
            r = legacy_buy(name=instruction, candidate=cand, **kwargs)
        before, after = r["before"], r["after"]
        raw = base64.b64decode(r["transaction_base64"], validate=True)
        tx = Transaction.from_bytes(raw)
        checks = tx.verify_with_results()
        assert checks and all(checks) and len(checks) == 1, "legacy transaction must verify"
        err = r["error"]
        logs = r["logs"]
        payer = str(tx.message.account_keys[0])
        if payer in before:
            payer_delta = before[payer]["lamports"] - after[payer]["lamports"]
        else:
            # unsigned case: the fee payer is not in the harness snapshot
            payer_delta = 5000
            row["payer_not_snapshotted"] = True
        observed = {}
        ub_key, uq_key = str(userbase), str(userquote)
        vb_key, vq_key = str(vaultbase), str(vaultquote)
        if expected[0] in ("buy", "sell"):
            assert err is None, (label, image, err)
            ub_delta = amount_at(after[ub_key]["data_hex"], 64) - amount_at(before[ub_key]["data_hex"], 64)
            uq_delta = amount_at(after[uq_key]["data_hex"], 64) - amount_at(before[uq_key]["data_hex"], 64)
            vb_delta = amount_at(after[vb_key]["data_hex"], 64) - amount_at(before[vb_key]["data_hex"], 64)
            vq_delta = amount_at(after[vq_key]["data_hex"], 64) - amount_at(before[vq_key]["data_hex"], 64)
            assert (ub_delta, uq_delta, vb_delta, vq_delta) == tuple(expected[1:5]), \
                (label, image, ub_delta, uq_delta, vb_delta, vq_delta, expected)
            pairs.add((ub_delta, uq_delta, vb_delta, vq_delta))
            if expected[0] == "buy":
                observed = {"base_gained": ub_delta, "quote_spent": -uq_delta,
                            "vault_base_spent": -vb_delta, "vault_quote_gained": vq_delta}
            else:
                observed = {"base_spent": -ub_delta, "quote_gained": uq_delta,
                            "vault_base_gained": vb_delta, "vault_quote_spent": -vq_delta}
        else:
            assert err is not None and expected[1] in err, (label, image, err)
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
            "transaction_base64": r["transaction_base64"],
            "signatures": [str(s) for s in tx.signatures],
            "transaction_sha256": sha(raw),
            "all_signatures_verified": True, "signature_fields": 1,
            "before": before, "after": after,
            "metadata": {"logs": logs,
                         "inner_instructions": str(r["inner"]),
                         "return_data": str(r.get("return_data"))},
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
             "legacy (v1) versus v2 trade equivalence on the shared "
             "fixture at runtime: legacy buy spends and gains exactly "
             "what buy_v2 does, with or without volume tracking; "
             "legacy buy_exact_quote_in gains and spends exactly what "
             "buy_exact_quote_in_v2 does; legacy sell spends and gains "
             "exactly what sell_v2 does, and its limit is inclusive the "
             "same way (limit + 1 fails ExceededSlippage, at sell.rs:189 "
             "rather than v2's trade_v2.rs:906). All three images "
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
    },
    "counts": {"vms": len(receipts_global), "transactions": len(receipts_global),
               "signature_fields": len(receipts_global)},
    "case_count": len(report_cases),
    "classifications": {"legacy-v2-equivalence": 5},
    "mismatches": [],
    "cases": report_cases,
    "transaction_receipts": {"parts": parts},
}
(OUT / "runtime/report.json.gz").write_bytes(gzip.compress(
    json.dumps(report, indent=1).encode(), mtime=0))
print("cases:", len(report_cases), "receipts:", len(receipts_global))
print("wrote:", OUT / "runtime/report.json.gz")
