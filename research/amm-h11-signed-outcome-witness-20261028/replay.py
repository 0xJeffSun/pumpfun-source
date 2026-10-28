#!/usr/bin/env python3
"""Replay and assemble transaction-bound outcome witnesses for the final #436 ELF."""
import argparse, concurrent.futures, gzip, hashlib, json, os, re, subprocess, sys, tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
ORIGINAL_SHA = "6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7"
CANDIDATE_SHA = "e708c278cdda90f08f0aafb8739d857c69b5878bca78ab16d62af820ca3c7231"
PUBLISHED = ROOT / "research/amm-v2-selector-union-recovery/builds/candidate/candidate.so.gz"
sha = lambda data: hashlib.sha256(data).hexdigest()
canonical = lambda value: json.dumps(value, sort_keys=True, separators=(",", ":")).encode()

SPECS = [
    ("admin", "fixtures/incentives.py", 668, ["--family", "admin"]),
    ("sync", "fixtures/incentives.py", 222, ["--family", "sync"]),
    ("claim", "fixtures/incentives.py", 807, ["--family", "claim"]),
    ("accumulator", "fixtures/accumulator.py", 76, []),
    ("edges", "fixtures/edges.py", 32, []),
    ("schedule", "fixtures/schedule/producer.py", 5, []),
]


def clean_compute(logs):
    return [line for line in logs if not re.fullmatch(r"Program \S+ consumed \d+ of \d+ compute units", line)]


def clean_source(logs):
    out = []
    for line in clean_compute(logs):
        line = re.sub(r"(?<=panicked at )[^\s:]+:[0-9]+(?::[0-9]+)?", "<source>", line)
        line = re.sub(r"(?<=thrown in )[^\s:]+:[0-9]+", "<source>", line)
        out.append(line)
    return out


def gzip_json(path, value):
    with path.open("wb") as raw:
        with gzip.GzipFile(filename="", mode="wb", fileobj=raw, mtime=0, compresslevel=9) as compressed:
            compressed.write(canonical(value) + b"\n")


def read_report(path, schedule):
    data = gzip.decompress(path.read_bytes()) if schedule else path.read_bytes()
    return json.loads(data)


def report_match(outcome, observed):
    if "transaction_base64" in outcome:
        assert outcome["transaction_base64"] == observed["transaction_base64"]
    assert outcome["error"] == observed["error"]
    assert outcome["logs"] == observed["logs"]
    if "events" in outcome:
        assert outcome["events"] == observed["events"]
    if "inner" in outcome:
        assert outcome["inner"] == observed["inner_instructions"]
    if "return_data" in outcome:
        assert outcome["return_data"] == observed["return_data"]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    output = args.output.resolve()
    assert not output.exists()
    output.mkdir(parents=True)
    (output / "reports").mkdir(); (output / "witnesses").mkdir()

    original = ROOT / "evidence/original/pump_amm/deployed.so"
    assert sha(original.read_bytes()) == ORIGINAL_SHA
    published_compressed_sha = sha(PUBLISHED.read_bytes())
    candidate_bytes = gzip.decompress(PUBLISHED.read_bytes())
    assert sha(candidate_bytes) == CANDIDATE_SHA

    with tempfile.TemporaryDirectory(prefix="amm-h11-witness-") as temporary:
        temporary = Path(temporary)
        candidate = temporary / "candidate.so"; candidate.write_bytes(candidate_bytes)

        def execute(spec):
            suite, script_rel, count, extra = spec
            script = HERE / script_rel
            report = temporary / (suite + (".json.gz" if suite == "schedule" else ".json"))
            observations = temporary / (suite + "-observations.json.gz")
            command = [sys.executable, "-I", "-B", str(HERE / "capture.py"), "--suite", suite,
                       "--output", str(observations), "--script", str(script), "--",
                       "--candidate", str(candidate), "--output", str(report), *extra]
            env = {**os.environ, "PYTHONDONTWRITEBYTECODE": "1", "PYTHONPATH": str(ROOT / "scripts")}
            result = subprocess.run(command, cwd=ROOT, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
            return spec, report, observations, result

        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
            completed = list(executor.map(execute, SPECS))

        all_cases, summaries = [], []
        raw_log_differences = noncompute_differences = source_only_differences = other_log_differences = 0
        total_signatures = total_transactions = functional_mismatches = 0
        for spec, report_path, observations_path, result in completed:
            suite, script_rel, expected_count, _ = spec
            assert result.returncode == 0, (suite, result.stdout)
            schedule = suite == "schedule"
            report = read_report(report_path, schedule)
            if schedule:
                report["case_count"] = len(report["cases"])
            observations = json.loads(gzip.decompress(observations_path.read_bytes()))
            assert report["case_count"] == expected_count and len(report["cases"]) == expected_count
            assert not report.get("mismatches", [])
            assert report["original_sha256"] == ORIGINAL_SHA and report["candidate_sha256"] == CANDIDATE_SHA
            assert observations["transaction_count"] == 2 * expected_count
            script_sha = sha((HERE / script_rel).read_bytes())
            report_script_sha = report.get("script_sha256", report.get("producer_sha256"))
            assert observations["script_sha256"] == report_script_sha == script_sha
            cases = []
            for index, row in enumerate(report["cases"]):
                left, right = observations["records"][2 * index:2 * index + 2]
                assert left["amm_program_sha256"] == ORIGINAL_SHA
                assert right["amm_program_sha256"] == CANDIDATE_SHA
                original_outcome, candidate_outcome = row["original"], row["candidate"]
                report_match(original_outcome, left); report_match(candidate_outcome, right)
                input_value = row["input"]
                identity = {"suite": suite, "index": index, "input": input_value, "fixture_sha256": script_sha}
                case_id = sha(canonical(identity))
                for side, observed, report_outcome in [("original", left, original_outcome), ("candidate", right, candidate_outcome)]:
                    observed["side"] = side
                    observed["occurrence_id"] = case_id + ":" + side
                    observed["report_outcome_sha256"] = sha(canonical(report_outcome))
                    outcome = {key: observed[key] for key in ["error", "poststate_digest", "changed_nonexecutable_accounts",
                               "events", "inner_instructions", "return_data", "logs_sha256"]}
                    observed["outcome_sha256"] = sha(canonical(outcome))
                behavior = {
                    "prestate": left["prestate_digest"] == right["prestate_digest"],
                    "error": left["error"] == right["error"],
                    "poststate": left["poststate_digest"] == right["poststate_digest"],
                    "rollback_effects": left["changed_nonexecutable_accounts"] == right["changed_nonexecutable_accounts"],
                    "inner_instructions": left["inner_instructions"] == right["inner_instructions"],
                    "events": left["events"] == right["events"],
                    "return_data": left["return_data"] == right["return_data"],
                }
                exact_logs = left["logs"] == right["logs"]
                noncompute_logs = clean_compute(left["logs"]) == clean_compute(right["logs"])
                source_normalized = clean_source(left["logs"]) == clean_source(right["logs"])
                raw_log_differences += not exact_logs
                noncompute_differences += not noncompute_logs
                source_only_differences += (not noncompute_logs and source_normalized)
                other_log_differences += not source_normalized
                functional_mismatches += not all(behavior.values())
                assert all(behavior.values()), (suite, index, behavior)
                cases.append({"case_id": case_id, **identity, "executions": [left, right],
                              "behavioral_comparison": behavior,
                              "log_comparison": {"exact": exact_logs, "excluding_compute": noncompute_logs,
                                                 "excluding_compute_and_source_coordinates": source_normalized}})
                all_cases.append({"case_id": case_id, "suite": suite, "index": index,
                                  "input_sha256": sha(canonical(input_value)), "fixture_sha256": script_sha})
            if schedule:
                expected = {
                    "negative-end": "TransactionErrorInstructionError((0, Fieldless(ProgramFailedToComplete)))",
                    "end-before-start": "TransactionErrorInstructionError((0, Fieldless(ProgramFailedToComplete)))",
                    "active-control": None,
                    "equality-control": "TransactionErrorInstructionError((0, Tagged(InstructionErrorCustom(6035))))",
                    "zero-supply": None,
                }
                for witness, report_case in zip(cases, report["cases"]):
                    assert witness["executions"][0]["error"] == witness["executions"][1]["error"] == expected[report_case["name"]]
            gzip_json(output / "reports" / (suite + ".json.gz"), report)
            witness = {"suite": suite, "fixture": script_rel, "fixture_sha256": script_sha,
                       "case_count": expected_count, "transaction_count": observations["transaction_count"],
                       "signature_count": observations["signature_count"], "cases": cases}
            gzip_json(output / "witnesses" / (suite + ".json.gz"), witness)
            total_transactions += observations["transaction_count"]
            total_signatures += observations["signature_count"]
            summaries.append({"suite": suite, "cases": expected_count, "transactions": observations["transaction_count"],
                              "signatures": observations["signature_count"], "stdout_sha256": sha(result.stdout.encode())})

    input_paths = [
        "scripts/pump_amm_admin_differential.py", "scripts/pump_amm_reusable_harness.py",
        "evidence/upstream/pump_amm.json", "research/imported-lab/analysis/pump_fun/config-snapshot.json",
        "evidence/original/pump_amm/deployed.so", "evidence/dependencies/spl_token/deployed.so",
        "evidence/dependencies/spl_token_2022/deployed.so", "evidence/dependencies/associated_token/deployed.so",
    ]
    provenance = {
        "original_sha256": ORIGINAL_SHA, "candidate_sha256": CANDIDATE_SHA,
        "published_candidate_gzip_sha256": published_compressed_sha,
        "published_candidate_path": "research/amm-v2-selector-union-recovery/builds/candidate/candidate.so.gz",
        "capture_sha256": sha((HERE / "capture.py").read_bytes()),
        "replay_sha256": sha(Path(__file__).read_bytes()),
        "inputs": {name: sha((ROOT / name).read_bytes()) for name in input_paths},
        "fixtures": {path.relative_to(HERE).as_posix(): sha(path.read_bytes()) for path in sorted((HERE / "fixtures").rglob("*.py"))},
        "normalization": {
            "behavioral_fields": "none",
            "logs": "reported both raw and with compute-unit lines excluded; source filename/line/column labels are separately normalized only for categorization",
            "compute_line_regex": r"Program \S+ consumed \d+ of \d+ compute units",
            "source_coordinate_rules": [r"(?<=panicked at )[^\s:]+:[0-9]+(?::[0-9]+)?", r"(?<=thrown in )[^\s:]+:[0-9]+"],
        },
    }
    case_manifest = {"case_count": len(all_cases), "core_1805": sum(1 for row in all_cases if row["suite"] != "schedule"),
                     "schedule_anchors": sum(1 for row in all_cases if row["suite"] == "schedule"), "cases": all_cases}
    summary = {"core_cases": 1805, "schedule_anchor_cases": 5, "case_outcome_associations": len(all_cases),
               "executions": total_transactions, "verified_signature_fields": total_signatures,
               "functional_mismatches": functional_mismatches, "raw_log_differences": raw_log_differences,
               "noncompute_log_differences": noncompute_differences,
               "source_coordinate_only_log_differences": source_only_differences,
               "other_log_differences_after_documented_normalization": other_log_differences,
               "suites": sorted(summaries, key=lambda row: row["suite"]),
               "overlap": {"with_pr436_full_suite": 1773, "new_edge_cases_relative_to_pr436_full_suite": 32,
                           "schedule_anchors_already_in_pr436": 5,
                           "note": "Overlapping case counts are not additive unique coverage."}}
    (output / "provenance.json").write_text(json.dumps(provenance, indent=2) + "\n")
    (output / "case-manifest.json").write_text(json.dumps(case_manifest, indent=2) + "\n")
    (output / "summary.json").write_text(json.dumps(summary, indent=2) + "\n")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
