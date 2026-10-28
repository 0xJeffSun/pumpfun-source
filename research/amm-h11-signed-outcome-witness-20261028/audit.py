#!/usr/bin/env python3
"""Independently audit each case/transaction/outcome association."""
import argparse, base64, gzip, hashlib, json, re
from pathlib import Path

from solders.transaction import Transaction

HERE = Path(__file__).resolve().parent
ORIGINAL_SHA = "6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7"
CANDIDATE_SHA = "e708c278cdda90f08f0aafb8739d857c69b5878bca78ab16d62af820ca3c7231"
AMM = "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
EXPECTED = {"admin": 668, "sync": 222, "claim": 807, "accumulator": 76, "edges": 32, "schedule": 5}
sha = lambda data: hashlib.sha256(data).hexdigest()
canonical = lambda value: json.dumps(value, sort_keys=True, separators=(",", ":")).encode()


def clean_compute(logs):
    return [line for line in logs if not re.fullmatch(r"Program \S+ consumed \d+ of \d+ compute units", line)]


def clean_source(logs):
    out = []
    for line in clean_compute(logs):
        line = re.sub(r"(?<=panicked at )[^\s:]+:[0-9]+(?::[0-9]+)?", "<source>", line)
        line = re.sub(r"(?<=thrown in )[^\s:]+:[0-9]+", "<source>", line)
        out.append(line)
    return out


def behavior_digest(snapshot):
    rows = [row for row in snapshot if row["account"] is None or not row["account"]["executable"]]
    return sha(canonical(rows))


def report_match(outcome, execution):
    if "transaction_base64" in outcome:
        assert outcome["transaction_base64"] == execution["transaction_base64"], "report transaction"
    assert outcome["error"] == execution["error"], "report error"
    assert outcome["logs"] == execution["logs"], "report logs"
    if "events" in outcome: assert outcome["events"] == execution["events"], "report events"
    if "inner" in outcome: assert outcome["inner"] == execution["inner_instructions"], "report CPI"
    if "return_data" in outcome: assert outcome["return_data"] == execution["return_data"], "report return data"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path)
    args = parser.parse_args()
    root = args.root.resolve() if args.root else HERE.parents[1]
    assert (root / "requirements.txt").is_file(), "repository root"

    # Reject extra, omitted, symlinked, or special packet entries before reading payloads.
    actual = set()
    for path in HERE.rglob("*"):
        assert not path.is_symlink(), "packet symlink"
        assert path.is_file() or path.is_dir(), "packet special file"
        if path.is_file(): actual.add(path.relative_to(HERE).as_posix())
    manifest = json.loads((HERE / "MANIFEST.json").read_text())["files"]
    assert actual == set(manifest) | {"MANIFEST.json"}, "packet file inventory"
    for name, digest in manifest.items(): assert sha((HERE / name).read_bytes()) == digest, name

    evidence = HERE / "evidence"
    provenance = json.loads((evidence / "provenance.json").read_text())
    summary = json.loads((evidence / "summary.json").read_text())
    case_manifest = json.loads((evidence / "case-manifest.json").read_text())
    assert provenance["original_sha256"] == ORIGINAL_SHA
    assert provenance["candidate_sha256"] == CANDIDATE_SHA
    original = root / "evidence/original/pump_amm/deployed.so"
    assert sha(original.read_bytes()) == ORIGINAL_SHA
    published = root / provenance["published_candidate_path"]
    assert sha(published.read_bytes()) == provenance["published_candidate_gzip_sha256"]
    assert sha(gzip.decompress(published.read_bytes())) == CANDIDATE_SHA
    assert provenance["capture_sha256"] == sha((HERE / "capture.py").read_bytes())
    assert provenance["replay_sha256"] == sha((HERE / "replay.py").read_bytes())
    for name, digest in provenance["inputs"].items(): assert sha((root / name).read_bytes()) == digest, name
    for name, digest in provenance["fixtures"].items(): assert sha((HERE / name).read_bytes()) == digest, name

    case_ids, occurrence_ids, computed_manifest = set(), set(), []
    cases = transactions = signatures = functional = 0
    raw_logs = noncompute_logs = source_only = other_logs = 0
    suite_results = []
    expected_schedule = {
        "negative-end": "TransactionErrorInstructionError((0, Fieldless(ProgramFailedToComplete)))",
        "end-before-start": "TransactionErrorInstructionError((0, Fieldless(ProgramFailedToComplete)))",
        "active-control": None,
        "equality-control": "TransactionErrorInstructionError((0, Tagged(InstructionErrorCustom(6035))))",
        "zero-supply": None,
    }
    for suite, expected_count in EXPECTED.items():
        report = json.loads(gzip.decompress((evidence / "reports" / (suite + ".json.gz")).read_bytes()))
        witness = json.loads(gzip.decompress((evidence / "witnesses" / (suite + ".json.gz")).read_bytes()))
        assert witness["suite"] == suite and witness["case_count"] == expected_count
        assert report["case_count"] == len(report["cases"]) == len(witness["cases"]) == expected_count
        assert report["original_sha256"] == ORIGINAL_SHA and report["candidate_sha256"] == CANDIDATE_SHA
        assert not report.get("mismatches", [])
        fixture_sha = sha((HERE / witness["fixture"]).read_bytes())
        assert fixture_sha == witness["fixture_sha256"]
        suite_signatures = 0
        for index, (report_case, case) in enumerate(zip(report["cases"], witness["cases"])):
            identity = {"suite": suite, "index": index, "input": report_case["input"], "fixture_sha256": fixture_sha}
            case_id = sha(canonical(identity))
            assert case["case_id"] == case_id and case["index"] == index and case["input"] == report_case["input"]
            assert case_id not in case_ids; case_ids.add(case_id)
            computed_manifest.append({"case_id": case_id, "suite": suite, "index": index,
                                      "input_sha256": sha(canonical(case["input"])), "fixture_sha256": fixture_sha})
            left, right = case["executions"]
            txs = []
            for side, execution, report_outcome, executable in [
                ("original", left, report_case["original"], ORIGINAL_SHA),
                ("candidate", right, report_case["candidate"], CANDIDATE_SHA),
            ]:
                occurrence = case_id + ":" + side
                assert execution["side"] == side and execution["occurrence_id"] == occurrence
                assert occurrence not in occurrence_ids; occurrence_ids.add(occurrence)
                raw = base64.b64decode(execution["transaction_base64"], validate=True)
                assert execution["transaction_sha256"] == sha(raw)
                tx = Transaction.from_bytes(raw); checks = tx.verify_with_results()
                assert checks and all(checks) and execution["all_signatures_verified"]
                assert execution["signature_count"] == len(checks)
                assert execution["message_sha256"] == sha(bytes(tx.message))
                assert execution["amm_program_sha256"] == executable
                assert execution["loaded_programs"][AMM]["sha256"] == executable
                assert execution["prestate_digest"] == behavior_digest(execution["prestate"])
                assert execution["poststate_digest"] == behavior_digest(execution["poststate"])
                assert execution["logs_sha256"] == sha(canonical(execution["logs"]))
                assert execution["report_outcome_sha256"] == sha(canonical(report_outcome))
                outcome = {key: execution[key] for key in ["error", "poststate_digest", "changed_nonexecutable_accounts",
                           "events", "inner_instructions", "return_data", "logs_sha256"]}
                assert execution["outcome_sha256"] == sha(canonical(outcome))
                report_match(report_outcome, execution)
                for program in execution["loaded_programs"].values():
                    if program["path"] in provenance["inputs"]:
                        assert program["sha256"] == provenance["inputs"][program["path"]]
                txs.append(tx); suite_signatures += len(checks)
            assert bytes(txs[0].message) == bytes(txs[1].message), "paired transaction message"
            behavior = {
                "prestate": left["prestate_digest"] == right["prestate_digest"],
                "error": left["error"] == right["error"],
                "poststate": left["poststate_digest"] == right["poststate_digest"],
                "rollback_effects": left["changed_nonexecutable_accounts"] == right["changed_nonexecutable_accounts"],
                "inner_instructions": left["inner_instructions"] == right["inner_instructions"],
                "events": left["events"] == right["events"],
                "return_data": left["return_data"] == right["return_data"],
            }
            assert case["behavioral_comparison"] == behavior and all(behavior.values())
            logs = {"exact": left["logs"] == right["logs"],
                    "excluding_compute": clean_compute(left["logs"]) == clean_compute(right["logs"]),
                    "excluding_compute_and_source_coordinates": clean_source(left["logs"]) == clean_source(right["logs"])}
            assert case["log_comparison"] == logs
            raw_logs += not logs["exact"]; noncompute_logs += not logs["excluding_compute"]
            source_only += (not logs["excluding_compute"] and logs["excluding_compute_and_source_coordinates"])
            other_logs += not logs["excluding_compute_and_source_coordinates"]
            functional += not all(behavior.values())
            if suite == "schedule":
                expected_error = expected_schedule[report_case["name"]]
                assert left["error"] == right["error"] == expected_error
            cases += 1; transactions += 2
        assert witness["transaction_count"] == 2 * expected_count
        assert witness["signature_count"] == suite_signatures
        signatures += suite_signatures
        suite_results.append({"suite": suite, "cases": expected_count, "transactions": 2 * expected_count,
                              "signatures": suite_signatures})

    assert case_manifest == {"case_count": len(computed_manifest), "core_1805": 1805,
                             "schedule_anchors": 5, "cases": computed_manifest}
    assert len(case_ids) == cases == 1810 and len(occurrence_ids) == transactions == 3620
    computed = {
        "core_cases": 1805, "schedule_anchor_cases": 5, "case_outcome_associations": cases,
        "executions": transactions, "verified_signature_fields": signatures,
        "functional_mismatches": functional, "raw_log_differences": raw_logs,
        "noncompute_log_differences": noncompute_logs,
        "source_coordinate_only_log_differences": source_only,
        "other_log_differences_after_documented_normalization": other_logs,
    }
    for key, value in computed.items(): assert summary[key] == value, key
    assert summary["overlap"] == {"with_pr436_full_suite": 1773, "new_edge_cases_relative_to_pr436_full_suite": 32,
                                  "schedule_anchors_already_in_pr436": 5,
                                  "note": "Overlapping case counts are not additive unique coverage."}
    print(json.dumps({"status": "PASS", **computed, "unique_occurrence_ids": len(occurrence_ids),
                      "candidate_sha256": CANDIDATE_SHA, "original_sha256": ORIGINAL_SHA,
                      "suite_results": suite_results}, indent=2))


if __name__ == "__main__":
    main()
