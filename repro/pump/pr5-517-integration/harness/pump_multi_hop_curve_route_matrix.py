#!/usr/bin/env python3
"""Signed AMM-to-Pump token-quoted and two-curve route matrix on fresh local VMs."""

import argparse
import base64
import hashlib
import json
import os
import struct
from pathlib import Path

from solders.account import Account
from solders.pubkey import Pubkey
from solders.transaction import Transaction

os.environ["PUMP_AMM_FRESH_VM"] = "1"
import pump_amm_multi_hop_differential as mh  # noqa: E402


ROOT = next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump/deployed.so').is_file())
PUMP = ROOT / "evidence/original/pump/deployed.so"
AMM = ROOT / "evidence/original/pump_amm/deployed.so"
AMOUNTS = (0, 1, 2, 3, 10, 100, 1000, 100_000, 10**6, 2 * 10**6, 10**7, 10**9)
BOUNDARY_BUYS = (15_706_322, 15_706_323, 15_706_324, 15_706_325,
                 20_000_000, 100_000_000)


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def override(route, sell, exotic_creator_bps=None, mutation=None):
    def apply(harness, metas):
        route(sell)(harness, metas)
        if exotic_creator_bps is not None:
            account = harness.vm.get_account(mh.PUMP_FEES)
            data = bytearray(account.data)
            struct.pack_into("<Q", data, 169, exotic_creator_bps)
            harness.vm.set_account(mh.PUMP_FEES,
                                   Account(account.lamports, bytes(data), account.owner))
        if mutation is not None:
            group, change = mutation.split("_", 1)
            key = (mh.CURVE if group == "first" and route == mh.amm_then_curve
                   else mh.CURVE if (group == "first") != sell
                   else mh.CV2)
            if change == "complete":
                mh.mutate(key, 48, b"\x01")(harness, metas)
            elif change == "mayhem":
                mh.mutate(key, 81, b"\x01")(harness, metas)
            elif change == "wrong_owner":
                mh.mutate(key, 0, b"", owner=Pubkey.default())(harness, metas)
            else:
                raise ValueError(mutation)
    return apply


def execute(binary, route, sell, amount, exotic_creator_bps=None, mutation=None):
    row = mh.run(amount=amount, limit=1, sell=sell,
                 overrides=override(route, sell, exotic_creator_bps, mutation),
                 pump_binary=binary)
    tx = Transaction.from_bytes(base64.b64decode(row["transaction_base64"], validate=True))
    assert all(tx.verify_with_results())
    row["outer_signature_verified"] = True
    row["outer_signature"] = str(tx.signatures[0])
    return row


def cases():
    result = []
    for name in ("amm_then_curve", "two_curves"):
        for sell in (False, True):
            for amount in AMOUNTS:
                result.append({"route": name, "sell": sell, "amount": amount})
    result.extend({"route": "amm_then_curve", "sell": False, "amount": amount}
                  for amount in BOUNDARY_BUYS)
    for name, sell in (("amm_then_curve", False), ("two_curves", False),
                       ("two_curves", True)):
        result.append({"route": name, "sell": sell, "amount": 10**6,
                       "exotic_creator_bps": 77})
    for name, sell in (("amm_then_curve", False), ("two_curves", False),
                       ("two_curves", True)):
        for group in (("first",) if name == "amm_then_curve" else ("first", "second")):
            for change in ("complete", "mayhem", "wrong_owner"):
                result.append({"route": name, "sell": sell, "amount": 10**6,
                               "mutation": f"{group}_{change}"})
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--candidate", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    identities = {"original_pump_sha256": sha(PUMP),
                  "original_amm_sha256": sha(AMM),
                  "candidate_pump_sha256": sha(args.candidate)}
    routes = {"amm_then_curve": mh.amm_then_curve,
              "two_curves": mh.two_curves}
    rows = []
    for case in cases():
        route = routes[case["route"]]
        kwargs = dict(route=route, sell=case["sell"], amount=case["amount"],
                      exotic_creator_bps=case.get("exotic_creator_bps"),
                      mutation=case.get("mutation"))
        target = execute(PUMP, **kwargs)
        candidate = execute(args.candidate, **kwargs)
        fields = ("error", "before", "after", "events", "inner", "return_data")
        rows.append({"case": case, "target": target, "candidate": candidate,
                     "different_fields": [key for key in fields
                                          if target[key] != candidate[key]]})
    assert sha(PUMP) == identities["original_pump_sha256"]
    assert sha(AMM) == identities["original_amm_sha256"]
    assert sha(args.candidate) == identities["candidate_pump_sha256"]
    unsupported = [i for i, row in enumerate(rows) if row["different_fields"]]
    report = {"scope": __doc__, "harness_origin_commit": "d71c78a50fcf5564a5ae80d484b3130becd8c310",
              **identities, "fresh_vm_required": True,
              "script_sha256": sha(Path(__file__)),
              "harness_sha256": sha(Path(mh.__file__)),
              "cases": rows, "mismatches": unsupported}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps({"cases": len(rows), "exact": len(rows) - len(unsupported),
                      "mismatches": [{"case": rows[i]["case"],
                                      "different_fields": rows[i]["different_fields"]}
                                     for i in unsupported],
                      "target_successes": sum(row["target"]["error"] is None for row in rows),
                      "candidate_successes": sum(row["candidate"]["error"] is None for row in rows),
                      "output": str(args.output)}))


if __name__ == "__main__":
    main()
