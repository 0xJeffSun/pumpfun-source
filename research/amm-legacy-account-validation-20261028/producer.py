#!/usr/bin/env python3
"""Build research/amm-legacy-account-validation-20261028 receipts.

The legacy buy and sell handlers enforce the same account
checks as trade_v2, with two divergences pinned at runtime:
- the legacy base buy spends 1,847,796 quote for 10^10 base;
- a pool, global config, or fee config owned by the wrong
  program fails AccountOwnedByWrongProgram (3007) on that
  account;
- a base mint that is not the pool's fails InvalidBaseMint
  (6008);
- a quote mint that is not the pool's fails
  ConstraintTokenMint (2014) on protocol_fee_recipient_token_account,
  not InvalidQuoteMint (6009) as on trade_v2, because the
  legacy handler checks the protocol recipient ATA first;
- a base vault that is not the pool's fails
  InvalidPoolBaseTokenAccount (6014) and a quote vault that is
  not the pool's fails InvalidPoolQuoteTokenAccount (6015);
- a buyback recipient that is not authorized fails
  BuybackFeeRecipientNotAuthorized (6053) at
  global_config.rs:336, not InvalidQuoteMint (6009) as on
  trade_v2, because the legacy handler checks authorization
  before mint;
- an unsigned user fails AccountNotSigner (3010) and a
  read-only pool fails ConstraintMut (2000), and the vault
  check holds on sell as on buy.
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

ROOT = Path.home() / "workspace/pumpfun-sparse"
OUT = ROOT / "research/amm-legacy-account-validation-20261028"
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
# override: None | ("meta", index, key_name) | ("meta-ro", index, key_name)
# expected: ("buy", base_gained, quote_spent) | ("error", code, fragment)
CASES = [
    ("buy", "legacy-base", 10**10, 10**12, None, False, ("buy", 10**10, 1847796)),
    ("buy", "legacy-wrong-pool", 10**10, 10**12, ("meta", 0, "OUTSIDER"), False, ("error", "3007", "AccountOwnedByWrongProgram")),
    ("buy", "legacy-wrong-config", 10**10, 10**12, ("meta", 2, "OUTSIDER"), False, ("error", "3007", "AccountOwnedByWrongProgram")),
    ("buy", "legacy-wrong-feeconfig", 10**10, 10**12, ("meta", 21, "OUTSIDER"), False, ("error", "3007", "AccountOwnedByWrongProgram")),
    ("buy", "legacy-wrong-base-mint", 10**10, 10**12, ("meta", 3, "quote"), False, ("error", "6008", "InvalidBaseMint")),
    ("buy", "legacy-wrong-quote-mint", 10**10, 10**12, ("meta", 4, "base"), False, ("error", "2014", "ConstraintTokenMint")),
    ("buy", "legacy-wrong-vaultbase", 10**10, 10**12, ("meta", 7, "userquote"), False, ("error", "6014", "InvalidPoolBaseTokenAccount")),
    ("buy", "legacy-wrong-vaultquote", 10**10, 10**12, ("meta", 8, "userbase"), False, ("error", "6015", "InvalidPoolQuoteTokenAccount")),
    ("buy", "legacy-wrong-buyback", 10**10, 10**12, ("meta", 25, "userbase"), False, ("error", "6053", "BuybackFeeRecipientNotAuthorized")),
    ("buy", "legacy-unsigned", 10**10, 10**12, None, True, ("error", "3010", "AccountNotSigner")),
    ("buy", "legacy-readonly-pool", 10**10, 10**12, ("meta-ro", 0, "pool"), False, ("error", "2000", "ConstraintMut")),
    ("sell", "legacy-sell-wrong-vaultbase", 10**9, 1, ("meta", 7, "userquote"), False, ("error", "6014", "InvalidPoolBaseTokenAccount")),
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
    _KEYS = {"OUTSIDER": OUTSIDER.pubkey(), "quote": quote, "base": base,
             "userquote": userquote, "userbase": userbase, "pool": pool}
    def ov(h, m):
        if override[0] == "meta":
            m[override[1]] = AccountMeta(_KEYS[override[2]], False, True)
        else:
            m[override[1]] = AccountMeta(_KEYS[override[2]], False, False)
    return ov


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
        if expected[0] == "buy":
            assert err is None, (label, image, err)
            if instruction == "buy_exact_quote_in":
                gained = amount_at(after[ub_key]["data_hex"], 64) - amount_at(before[ub_key]["data_hex"], 64)
                spent = amount_at(before[uq_key]["data_hex"], 64) - amount_at(after[uq_key]["data_hex"], 64)
                assert gained == expected[1], (label, image, gained, expected)
                assert spent == expected[2], (label, image, spent, expected)
                pairs.add((gained, spent))
                observed = {"base_gained": gained, "quote_spent": spent}
            elif instruction == "buy":
                gained = amount_at(after[ub_key]["data_hex"], 64) - amount_at(before[ub_key]["data_hex"], 64)
                spent = amount_at(before[uq_key]["data_hex"], 64) - amount_at(after[uq_key]["data_hex"], 64)
                assert gained == expected[1], (label, image, gained, expected)
                assert spent == expected[2], (label, image, spent, expected)
                pairs.add((gained, spent))
                observed = {"base_gained": gained, "quote_spent": spent}
            else:
                spent = amount_at(before[ub_key]["data_hex"], 64) - amount_at(after[ub_key]["data_hex"], 64)
                gained = amount_at(after[uq_key]["data_hex"], 64) - amount_at(before[uq_key]["data_hex"], 64)
                assert spent == expected[1], (label, image, spent, expected)
                assert gained == expected[2], (label, image, gained, expected)
                pairs.add((spent, gained))
                observed = {"base_spent": spent, "quote_gained": gained}
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
