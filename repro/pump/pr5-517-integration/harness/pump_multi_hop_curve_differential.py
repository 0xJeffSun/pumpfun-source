#!/usr/bin/env python3
"""Offline AMM-to-Pump multi-hop curve differential with real PDA CPI signing.

The pinned original AMM remains loaded in every isolated VM. Only the Pump
program ELF changes between target and candidate runs. Fresh VMs are mandatory
because the historical reusable harness caches loaded program IDs by path.
"""

import argparse
import base64
import hashlib
import json
import os
import re
from pathlib import Path

from solders.transaction import Transaction

os.environ["PUMP_AMM_FRESH_VM"] = "1"
import pump_amm_multi_hop_differential as mh  # noqa: E402


ROOT = next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump/deployed.so').is_file())
ORIGINAL_PUMP = ROOT / "evidence/original/pump/deployed.so"
ORIGINAL_AMM = ROOT / "evidence/original/pump_amm/deployed.so"


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def cases():
    result = [{"name": "curve_buy", "sell": False, "amount": 10**6, "limit": 1},
              {"name": "curve_sell", "sell": True, "amount": 10**6, "limit": 1}]
    for sell in (False, True):
        for amount in (0, 1, 2, 3, 10, 1000, 10**9):
            result.append({"name": f"amount_{sell}_{amount}", "sell": sell,
                           "amount": amount, "limit": 1})
        for mutation in ("curve_mayhem", "curve_complete", "curve_wrong_owner",
                         "curve_short", "missing_remaining"):
            result.append({"name": f"{mutation}_{sell}", "sell": sell,
                           "amount": 10**6, "limit": 1, "mutation": mutation})
    result.extend([
        {"name": "curve_then_amm_buy", "sell": False, "route": "curve_then_amm",
         "amount": 10**6, "limit": 1},
        {"name": "curve_then_amm_sell", "sell": True, "route": "curve_then_amm",
         "amount": 10**6, "limit": 1},
        {"name": "buy_insufficient_lamports_large", "sell": False,
         "amount": 10**12, "limit": 1},
        {"name": "buy_insufficient_lamports_max", "sell": False,
         "amount": 2**64 - 1, "limit": 1},
        {"name": "sell_net_zero", "sell": True,
         "amount": 100_000, "limit": 1},
        {"name": "sell_reserve_overflow_large", "sell": True,
         "amount": 10**10, "limit": 1},
        {"name": "sell_reserve_overflow_huge", "sell": True,
         "amount": 10**12, "limit": 1},
        {"name": "sell_insufficient_tokens_max", "sell": True,
         "amount": 2**64 - 1, "limit": 1},
    ])
    return result


def override(case):
    route = (mh.curve_then_amm(case["sell"]) if case.get("route") == "curve_then_amm"
             else mh.curve_route(case["sell"]))
    mutation = case.get("mutation")
    if mutation is None:
        return route

    def apply(harness, metas):
        route(harness, metas)
        if mutation == "curve_mayhem":
            mh.mutate(mh.CURVE, 81, b"\x01")(harness, metas)
        elif mutation == "curve_complete":
            mh.mutate(mh.CURVE, 48, b"\x01")(harness, metas)
        elif mutation == "curve_wrong_owner":
            mh.mutate(mh.CURVE, 0, b"", owner=mh.Pubkey.default())(harness, metas)
        elif mutation == "curve_short":
            mh.mutate(mh.CURVE, 0, b"", length=165)(harness, metas)
        elif mutation == "missing_remaining":
            metas[16:] = []
        else:
            raise ValueError(mutation)

    return apply


def normalized_logs(lines):
    return [re.sub(r" consumed \d+ of \d+ compute units",
                   " consumed <units> of <budget> compute units", line)
            for line in lines]


def execute(case, pump_binary):
    row = mh.run(amount=case["amount"], limit=case["limit"],
                 sell=case["sell"], overrides=override(case),
                 pump_binary=pump_binary)
    tx = Transaction.from_bytes(base64.b64decode(row["transaction_base64"], validate=True))
    assert all(tx.verify_with_results())
    row["outer_signature_verified"] = True
    row["outer_signature"] = str(tx.signatures[0])
    row["normalized_logs"] = normalized_logs(row["logs"])
    row["pump_instruction_logged"] = any(
        line == "Program log: Instruction: MultiHopCurveSwap" for line in row["logs"])
    return row


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--candidate", type=Path)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    original_hash = sha(ORIGINAL_PUMP)
    amm_hash = sha(ORIGINAL_AMM)
    candidate_hash = sha(args.candidate) if args.candidate else None
    rows = []
    for case in cases():
        target = execute(case, ORIGINAL_PUMP)
        candidate = execute(case, args.candidate) if args.candidate else None
        different = []
        if candidate is not None:
            different = [field for field in ("error", "before", "after",
                                             "events", "inner", "return_data")
                         if target[field] != candidate[field]]
        rows.append({"case": case, "target": target,
                     "candidate": candidate, "different_fields": different})
    assert sha(ORIGINAL_PUMP) == original_hash and sha(ORIGINAL_AMM) == amm_hash
    if args.candidate:
        assert sha(args.candidate) == candidate_hash
    for row in rows[:2]:
        assert row["target"]["error"] is None
        assert row["target"]["pump_instruction_logged"]
    report = {"scope": __doc__,
              "harness_origin_commit": "d71c78a50fcf5564a5ae80d484b3130becd8c310",
              "original_pump_sha256": original_hash,
              "original_amm_sha256": amm_hash,
              "candidate_pump_sha256": candidate_hash,
              "harness_sha256": sha(Path(mh.__file__)),
              "script_sha256": sha(Path(__file__)),
              "fresh_vm_required": True,
              "cases": rows,
              "behavior_mismatches": [row["case"]["name"] for row in rows
                                      if row["different_fields"]]}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps({"cases": len(rows),
                      "target_successes": sum(row["target"]["error"] is None for row in rows),
                      "candidate_successes": None if not args.candidate else sum(
                          row["candidate"]["error"] is None for row in rows),
                      "behavior_mismatches": report["behavior_mismatches"],
                      "output": str(args.output)}))


if __name__ == "__main__":
    main()
