#!/usr/bin/env python3
"""Verify frozen source, artifacts, and signed offline receipts; no VM execution."""
import base64
import gzip
import hashlib
import json
from pathlib import Path

from solders.transaction import Transaction

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
FIELDS = ["error", "accounts", "events", "inner", "return_data"]
sha = lambda b: hashlib.sha256(b).hexdigest()


def load(name):
    path = HERE / name
    return json.loads(gzip.decompress(path.read_bytes()) if name.endswith(".gz") else path.read_bytes())


def main():
    for name, expected in load("manifest.json").items():
        assert sha((HERE / name).read_bytes()) == expected, name
    original = ROOT / "evidence/original/pump/deployed.so"
    original_hash = sha(original.read_bytes())
    for kind in ["baseline", "fixed2"]:
        record = load(kind + "/build-attempt.json")
        assert record["returncode"] == 0 and record["source_unchanged"]
        assert record["selected_toolchain"] == "v1.44"
        for path, digest in record["source_sha256"].items():
            relative = path.split("/programs/pump/", 1)[1]
            assert sha((HERE / kind / "source" / relative).read_bytes()) == digest
        assert original.read_bytes() != (HERE / kind / "candidate.so").read_bytes()
    targeted = load("fee-differential-fixed2.json.gz")
    assert targeted["original_sha256"] == original_hash
    assert targeted["baseline_sha256"] == sha((HERE / "baseline/candidate.so").read_bytes())
    assert targeted["fixed_sha256"] == sha((HERE / "fixed2/candidate.so").read_bytes())
    baseline_failures = 0
    unique_wires = set()
    for row in targeted["cases"]:
        baseline_failures += any(row["original"][key] != row["baseline"][key] for key in FIELDS)
        assert all(row["original"][key] == row["fixed"][key] for key in FIELDS)
        assert row["original"]["transaction_base64"] == row["baseline"]["transaction_base64"] == row["fixed"]["transaction_base64"]
        raw = base64.b64decode(row["original"]["transaction_base64"], validate=True)
        Transaction.from_bytes(raw).verify()
        unique_wires.add(sha(raw))
    assert len(targeted["cases"]) == 25 and baseline_failures == 17
    current = load("current/build-attempt.json")
    assert current["returncode"] == 0 and current["source_unchanged"]
    for path, digest in current["source_sha256"].items():
        relative = path.split("programs/pump/", 1)[1]
        assert sha((HERE / "fixed2/source" / relative).read_bytes()) == digest
    identities = load("current/identity.json")
    for kind, filename in [("stripped", "candidate.so"), ("unstripped", "unstripped.so")]:
        digest = sha((HERE / "fixed2" / filename).read_bytes())
        assert identities[kind]["equal"]
        assert identities[kind]["fixed_sha256"] == identities[kind]["current_sha256"] == digest
    expanded = load("expanded-corpus.json.gz")
    assert expanded["original_sha256"] == original_hash
    assert expanded["candidate_sha256"] == targeted["fixed_sha256"]
    assert expanded["case_count"] == len(expanded["cases"]) == 206
    for row in expanded["cases"]:
        assert all(row["original"][key] == row["candidate"][key] for key in FIELDS)
        for side in ["original", "candidate"]:
            raw = base64.b64decode(row[side]["transaction_base64"], validate=True)
            Transaction.from_bytes(raw).verify()
            unique_wires.add(sha(raw))
    print(json.dumps({"targeted_cases": 25, "baseline_failures": 17,
                      "expanded_cases": 206, "candidate_failures": 0,
                      "unique_signed_wires_verified": len(unique_wires),
                      "whole_original_byte_equality": False}, indent=2))


if __name__ == "__main__":
    main()
