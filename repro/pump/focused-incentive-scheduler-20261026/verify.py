"""Verify frozen Pump scheduler evidence without running any program."""
import base64
import gzip
import hashlib
import json
from pathlib import Path

from solders.transaction import Transaction

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
FIELDS = ("before", "after", "error", "events", "inner", "return")


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load(name):
    data = (HERE / name).read_bytes()
    return json.loads(gzip.decompress(data) if data[:2] == b"\x1f\x8b" else data)


def main():
    for name, digest in load("manifest.json").items():
        assert sha(HERE / name) == digest, name
    original = sha(ROOT / "evidence/original/pump/deployed.so")
    for phase in ("baseline", "recovered"):
        build = load(f"{phase}/build-comparison.json")
        assert build["returncode"] == 0 and build["source_unchanged"]
        assert build["selected_toolchain"] == "v1.44"
        assert build["comparison"]["original_sha256"] == original
        assert build["comparison"]["candidate_sha256"] == sha(HERE / phase / "candidate.so")
        assert not build["comparison"]["full_byte_equality"]
        for path, digest in build["source_sha256"].items():
            relative = Path(path).relative_to("programs/pump")
            assert sha(HERE / phase / "source" / relative) == digest, path
    build = load("recovered/build-comparison.json")
    candidate = sha(HERE / "recovered/candidate.so")
    assert sha(HERE / "recovered/unstripped.so") == build["unstripped_sha256"]
    repeated = load("repeat/build-comparison.json")
    assert repeated["source_sha256"] == build["source_sha256"]
    assert repeated["comparison"]["candidate_sha256"] == candidate
    assert repeated["unstripped_sha256"] == build["unstripped_sha256"]
    evidence = load("final-boundaries.json.gz")
    assert evidence["candidate_sha256"] == candidate
    assert evidence["original_sha256"] == original
    assert evidence["compiled_source_sha256"] == build["source_sha256"]
    assert evidence["case_count"] == len(evidence["cases"]) == 575
    assert evidence["mismatches"] == []
    wires = set()
    for row in evidence["cases"]:
        assert row["differences"] == []
        assert all(row["original"][key] == row["candidate"][key] for key in FIELDS)
        wire = row["original"]["transaction_base64"]
        assert wire == row["candidate"]["transaction_base64"]
        Transaction.from_bytes(base64.b64decode(wire, validate=True)).verify()
        wires.add(wire)
    baseline = load("baseline-counterexamples.json.gz")
    assert baseline["candidate_sha256"] == sha(HERE / "baseline/candidate.so")
    assert baseline["original_sha256"] == original
    assert len(baseline["cases"]) == 5
    for row in baseline["cases"]:
        assert row["differences"]
        Transaction.from_bytes(base64.b64decode(row["original"]["transaction_base64"], validate=True)).verify()
    admin = load("final-admin.json.gz")
    assert admin["candidate_sha256"] == candidate
    assert admin["summary"]["cases"] == admin["summary"]["matched"] == 98
    quote = load("final-quote.json.gz")
    assert quote["cases"] == 507 and quote["mismatches"] == 0
    assert candidate in quote["bound_inputs_sha256"].values()
    assert original in quote["bound_inputs_sha256"].values()
    for name, count in (("final-volume.json.gz", 341), ("final-sell.json.gz", 206)):
        data = load(name)
        assert data["candidate_sha256"] == candidate
        assert data["mismatches"] == [] and len(data["cases"]) == count
    extensions = load("final-v3-extensions.json.gz")
    assert extensions["candidate_sha256"] == candidate
    assert extensions["case_count"] == 126 and extensions["mismatches"] == []
    assert all(row["match"] for row in extensions["cases"])
    if (HERE / "full-regression.json.gz").exists():
        full = load("full-regression.json.gz")
        assert full["candidate_sha256"] == candidate
        assert full["original_sha256"] == original
        assert full["case_count"] == 9259 and full["mismatches"] == []
        assert len(full["suites"]) == 38
        assert sum(suite["case_count"] for suite in full["suites"].values()) == 9259
        assert all(not suite.get("mismatches", suite.get("failures", []))
                   for suite in full["suites"].values())
    print(json.dumps({"scheduler_cases": 575, "baseline_counterexamples": 5,
                      "unique_scheduler_signed_wires": len(wires),
                      "admin_regression": 98, "quote_control_regression": 507,
                      "volume_regression": 341, "sell_v2_regression": 206,
                      "v3_extension_regression": 126,
                      "whole_program_byte_equal": False}, indent=2))


if __name__ == "__main__":
    main()
