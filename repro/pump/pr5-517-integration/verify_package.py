#!/usr/bin/env python3
"""Read-only verification of PR #5 integrated with upstream two-curve source."""
import base64
import gzip
import hashlib
import json
import sys
from pathlib import Path

from solders.transaction import VersionedTransaction

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from build_source_manifest import source_manifest  # noqa: E402


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def read_json(name):
    raw = (HERE / name).read_bytes()
    return json.loads(gzip.decompress(raw) if raw[:2] == b"\x1f\x8b" else raw)


def signed(row):
    raw = base64.b64decode(row["transaction_base64"], validate=True)
    tx = VersionedTransaction.from_bytes(raw)
    assert all(tx.verify_with_results())
    return raw


def verify():
    index = read_json("receipt-index.json")
    assert index["source_base"] == "517d77db988d8c63b6cf476f0be138c5a4f3128a"
    assert index["source_input_count"] == 37
    candidate = (HERE / "candidate.so").read_bytes()
    assert sha(candidate) == index["candidate_sha256"]
    assert len(candidate) == index["candidate_bytes"]
    target = (ROOT / "evidence/original/pump/deployed.so").read_bytes()
    assert sha(target) == index["original_sha256"]
    assert sha((ROOT / "evidence/original/pump_amm/deployed.so").read_bytes()) == index["original_amm_sha256"]
    for name, expected in index["artifacts_sha256"].items():
        assert sha((HERE / name).read_bytes()) == expected, name
    builds = [read_json(f"build-{letter}-build-comparison.json") for letter in "ab"]
    assert builds[0]["source_sha256"] == builds[1]["source_sha256"]
    assert len(builds[0]["source_sha256"]) == index["source_input_count"]
    assert source_manifest(ROOT / "programs/pump", ROOT / "programs/pump", ROOT,
                           cwd=ROOT) == builds[0]["source_sha256"]
    for relative, expected in builds[0]["source_sha256"].items():
        assert sha((ROOT / relative).read_bytes()) == expected, relative
    for letter, build in zip("ab", builds):
        attempt = read_json(f"build-{letter}-build-attempt.json")
        assert attempt["returncode"] == 0 and attempt["source_unchanged"]
        assert attempt["source_sha256"] == build["source_sha256"]
        assert build["selected_toolchain"] == "v1.44"
        assert build["comparison"]["candidate_sha256"] == index["candidate_sha256"]
        assert build["comparison"]["original_sha256"] == index["original_sha256"]
        assert not build["comparison"]["full_byte_equality"]
        assert build["comparison"]["first_difference"] == 24
        assert sha(gzip.decompress((HERE / f"build-{letter}.log.gz").read_bytes())) == build["build_log_sha256"]
    receipts = {
        "upstream-native-56.json.gz": (56, ("error", "events", "inner", "return_data", "before", "after")),
        "upstream-two-curve-20.json.gz": (20, ("error", "events", "inner", "return_data", "before", "after", "pump_calls", "token_calls")),
        "recovered-core-34.json.gz": (34, ("error", "before", "after", "events", "inner", "return_data")),
        "recovered-routes-72.json.gz": (72, ("error", "before", "after", "events", "inner", "return_data")),
        "inherited-quote-control-507.json.gz": (507, ("error", "before_accounts", "after_accounts", "rollback", "event_payloads", "inner_instructions", "return_data")),
        "inherited-volume-341.json.gz": (341, ("before", "after", "error", "events", "inner", "return", "decoded_user")),
    }
    summary = {}
    for name, (expected_count, fields) in receipts.items():
        report = read_json(name)
        rows = report.get("results", report.get("cases"))
        assert isinstance(rows, list) and len(rows) == expected_count
        if name == "upstream-native-56.json.gz":
            assert report["candidate_sha256"] == index["candidate_sha256"]
            assert report["original_pump_sha256"] == index["original_sha256"]
            assert report["captured_amm_sha256"] == index["original_amm_sha256"]
            assert report["passed"] == expected_count
        elif name == "upstream-two-curve-20.json.gz":
            assert report["candidate_sha256"] == index["candidate_sha256"]
            assert report["case_count"] == expected_count
            assert report["verified_outer_signatures"] == 40
            assert report["original_pump_cpi_cases"] == 18
            assert report["inputs_unchanged"] is True
            bound = report["provenance"]["compiled_candidate_binding"]
            assert bound["candidate_sha256"] == index["candidate_sha256"]
            assert bound["actual_source_sha256"] == builds[0]["source_sha256"]
            assert bound["report_sha256"] == sha((HERE / "build-a-build-comparison.json").read_bytes())
            assert bound["attempt_sha256"] == sha((HERE / "build-a-build-attempt.json").read_bytes())
            for relative, expected in report["provenance"]["repository_inputs"].items():
                assert sha((ROOT / relative).read_bytes()) == expected, relative
        elif name.startswith("recovered-"):
            assert report["candidate_pump_sha256"] == index["candidate_sha256"]
            assert report["original_pump_sha256"] == index["original_sha256"]
            assert report["original_amm_sha256"] == index["original_amm_sha256"]
            script = "pump_multi_hop_curve_differential.py" if name == "recovered-core-34.json.gz" else "pump_multi_hop_curve_route_matrix.py"
            assert report["script_sha256"] == sha((HERE / "harness" / script).read_bytes())
            assert report["harness_sha256"] == sha((HERE / "harness/pump_amm_multi_hop_differential.py").read_bytes())
        elif name.startswith("inherited-quote"):
            assert report["cases"] == expected_count and report["mismatches"] == 0
            assert index["candidate_sha256"] in report["bound_inputs_sha256"].values()
        else:
            assert report["candidate_sha256"] == index["candidate_sha256"]
            assert report["original_sha256"] == index["original_sha256"]
            assert not report["mismatches"]
        verified = 0
        for row in rows:
            original = row.get("target", row.get("original"))
            recovered = row["candidate"]
            assert row.get("mismatches", row.get("different_fields", row.get("diff", []))) in ([], None)
            assert all(original[field] == recovered[field] for field in fields)
            assert signed(original) == signed(recovered)
            verified += 2
        summary[name] = {"cases": expected_count, "verified_transactions": verified}
    assert summary == index["signed_replays"]
    return {"candidate_sha256": index["candidate_sha256"], "clean_builds": 2,
            "cases": sum(x["cases"] for x in summary.values()),
            "verified_transactions": sum(x["verified_transactions"] for x in summary.values()),
            "suites": summary}


if __name__ == "__main__":
    print(json.dumps(verify(), indent=2))
