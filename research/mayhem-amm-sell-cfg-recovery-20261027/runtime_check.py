"""Recheck frozen signed receipts with the unchanged trade verifier; run no VM."""
from pathlib import Path
import base64
import gzip
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile

MAYHEM = "MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e"
COHORT = "work/mayhem-priority-20261027/amm-body-audit/revisit-cases.json"


def sha(data):
    return hashlib.sha256(data).hexdigest()


def verify(root, packet, controls):
    original = (root / "evidence/original/mayhem/deployed.so").read_bytes()
    frozen = packet / "runtime/frozen"
    bindings = json.loads((packet / "runtime/frozen-inputs.json").read_bytes())
    assert set(bindings) == {
        "scripts/mayhem_pump_swap_differential.py", "scripts/mayhem_pump_swap_fixture.py",
        "scripts/verify_mayhem_pump_swap.py", COHORT,
        "research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json",
        "research/imported-lab/analysis/pump_fun/config-snapshot.json",
    }
    for name, digest in bindings.items():
        assert sha((frozen / name).read_bytes()) == digest
    canonical = json.loads((frozen / COHORT).read_bytes())["cases"]
    assert [c["name"] for c in canonical] == [
        "normal", "cap", "reference-overflow", "slippage", "retained-overflow",
        "effective-negative", "effective-overflow", "zero-base-reserve", "paused",
    ]
    result, original_runs = {}, {}
    with tempfile.TemporaryDirectory(prefix="amm-cfg-receipts-") as directory:
        directory = Path(directory)
        for name in bindings:
            target = directory / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes((frozen / name).read_bytes())
        target = directory / "evidence/original/mayhem/deployed.so"
        target.parent.mkdir(parents=True)
        target.write_bytes(original)
        environment = dict(os.environ, PYTHONDONTWRITEBYTECODE="1")
        for label in controls:
            candidate = gzip.decompress((packet / f"controls/{label}/candidate.so.gz").read_bytes())
            digest = sha(candidate)
            assert digest == controls[label]["candidate_sha256"]
            candidate_path = directory / "candidate.so"
            candidate_path.write_bytes(candidate)
            groups, cases, signed, successes = [], 0, 0, 0
            for family in ["native", "token"]:
                receipt_path = packet / f"runtime/{label}/{family}.json.gz"
                report = json.loads(gzip.decompress(receipt_path.read_bytes()))
                assert report["candidate_sha256"] == digest and report["candidate_bytes"] == len(candidate)
                assert report["original_sha256"] == sha(original)
                assert report["case_count"] == 9 and report["signed_transactions"] == 18
                assert report["successful_original_cases"] == 2
                assert not report["mismatches"] and not report["normalized_log_differences"]
                expected = [dict(c, instruction="sell_pump_swap", token_quote=family == "token",
                                 quote_token22=False, tokens=c.get("tokens", 10**9)) for c in canonical]
                assert [row["case"] for row in report["cases"]] == expected
                assert set(report["harness_sha256"]) == set(bindings) - {"scripts/verify_mayhem_pump_swap.py"}
                for name, expected_digest in report["harness_sha256"].items():
                    assert bindings[name] == expected_digest
                original_records = [row["original"] for row in report["cases"]]
                if family in original_runs:
                    assert original_records == original_runs[family]
                else:
                    original_runs[family] = original_records
                for row in report["cases"]:
                    assert not row["different_fields"] and not row["normalized_log_difference"]
                    logs = lambda side: [line for line in row[side]["metadata"]["logs"]
                                         if not re.search(r" consumed \d+ of \d+ compute units", line)]
                    assert logs("original") == logs("candidate")
                    for side, expected_digest in [("original", sha(original)), ("candidate", digest)]:
                        record = row[side]
                        assert record["signature_verified"]
                        for phase in ["before", "after"]:
                            account = record[phase][MAYHEM]
                            assert account["executable"] and account["data_sha256"] == expected_digest
                            if account["data_base64"] is not None:
                                assert sha(base64.b64decode(account["data_base64"], validate=True)) == expected_digest
                        signed += 1
                    cases += 1
                    successes += row["original"]["error"] is None
                output = directory / "checked.json"
                subprocess.run([sys.executable, "-B", str(directory / "scripts/verify_mayhem_pump_swap.py"),
                                "--receipts", str(receipt_path), "--candidate", str(candidate_path),
                                "--output", str(output)], env=environment, check=True,
                               stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
                checked = json.loads(output.read_bytes())
                assert checked["case_count"] == 9 and checked["verified_signed_transactions"] == 18
                assert checked["successful_cases"] == 2 and checked["rejection_cases"] == 7
                groups.append({"family": family, "receipt_sha256": sha(receipt_path.read_bytes()),
                               "checked": checked, "exact_non_compute_logs_equal": True,
                               "executable_account_digests_bound": True})
            assert (cases, signed, successes) == (18, 36, 4)
            result[label] = {"candidate_sha256": digest, "case_pairs": cases,
                             "signed_records": signed, "successful_pairs": successes,
                             "signature_recheck_performed": True, "groups": groups}
    return {"controls": result, "unique_case_family_pairs": 18,
            "total_replayed_pairs": 36, "total_signed_records": 72,
            "fresh_original_records_equal_across_controls": True,
            "scope": "Frozen local VM receipts, including producer-reported executable-account digest attestations; no new VM run, exhaustive proof or live-chain claim."}
