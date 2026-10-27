#!/usr/bin/env python3
"""Verify the artifact-backed Relay shared-worker recovery packet."""
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import tomllib

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
sha = lambda raw: hashlib.sha256(raw).hexdigest()


def load(path):
    raw = path.read_bytes()
    return json.loads(gzip.decompress(raw) if path.name.endswith(".gz") else raw)


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def artifact(descriptor):
    path = Path(descriptor["path"])
    path = ROOT / path if path.parts and path.parts[0] == "repro" else HERE / path
    raw = gzip.decompress(path.read_bytes())
    assert len(raw) == descriptor["bytes"]
    assert sha(raw) == descriptor["sha256"]
    return raw


def saved_analysis(label, name):
    path = HERE / "analysis" / label / name
    if not path.exists() and not name.endswith(".gz"):
        path = path.with_suffix(path.suffix + ".gz")
    return load(path)


def main():
    manifest = load(HERE / "manifest.json")
    actual = {
        str(path.relative_to(HERE))
        for path in HERE.rglob("*")
        if path.is_file() and path.name != "manifest.json" and "__pycache__" not in path.parts
    }
    assert set(manifest) == actual
    for name, digest in manifest.items():
        path = HERE / name
        assert not path.is_symlink() and path.resolve().is_relative_to(HERE)
        assert sha(path.read_bytes()) == digest, name
    for name, digest in load(HERE / "parents.json").items():
        assert sha((ROOT / name).read_bytes()) == digest, name

    metadata = load(HERE / "metadata.json")
    assert metadata["source_revision"] == "ba7883511942965c5c9def03971bdaff84963d6b"
    assert metadata["source_packet"] == "repro/donation-relay/shared-worker-source-proposal"
    assert not metadata["whole_file_equal"] and not metadata["binary_patching"]
    assert not metadata["allocation_padding"]

    source_module = module(
        "worker_artifact_source_packet",
        ROOT / "repro/donation-relay/shared-worker-source-proposal/verify.py",
    )
    source_module.check_manifest()
    baseline_sources, recovered_sources = source_module.sources()
    source_maps = load(ROOT / "repro/donation-relay/shared-worker-source-proposal/source-inputs.json")
    assert {name: sha(raw) for name, raw in baseline_sources.items()} == source_maps["baseline"]
    assert {name: sha(raw) for name, raw in recovered_sources.items()} == source_maps["recovered"]
    assert [name for name in baseline_sources if baseline_sources[name] != recovered_sources[name]] == ["src/shared_donation.rs"]

    expected = load(ROOT / "repro/donation-relay/shared-worker-source-proposal/expected.json")
    baseline_artifacts = metadata["baseline_artifacts"]
    recovered_artifacts = metadata["variants"]["recovered"]["artifacts"]
    assert baseline_artifacts["candidate"]["sha256"] == "c6ae09b906b3c6a88042e40b02e0a2f6598268061d7527b667c0e631655a3921"
    assert baseline_artifacts["symbols"]["sha256"] == "786d74595e015abb6a0eee39bc94ad0ce6304e4b066227c5a4f8a8ff8f327e4c"
    assert recovered_artifacts["candidate"]["sha256"] == expected["candidate_sha256"]
    assert recovered_artifacts["symbols"]["sha256"] == expected["symbols_sha256"]
    for descriptors in (baseline_artifacts, recovered_artifacts):
        for descriptor in descriptors.values():
            artifact(descriptor)

    toolchain = load(HERE / "toolchain.json")
    assert toolchain["release"] == "v1.48"
    assert toolchain["archive_bytes"] == 516334851
    assert toolchain["archive_sha256"] == "a9d3157f937d5f6faf4321a35a8035e0f827114a663b0150db492e893ec27597"
    assert toolchain["sdk_file_count"] == 2873 and toolchain["sdk_map_matches_published_manifest"]
    assert toolchain["sdk_files_manifest_sha256"] == sha((ROOT / toolchain["sdk_files_manifest"]).read_bytes())
    assert toolchain["tools"]["rustc"]["sha256"] == "89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d"
    assert toolchain["tools"]["cargo"]["sha256"] == "5614db715dddef5793dc5dc6403fea384993ea429337620aab9020438356d8ca"
    assert toolchain["tools"]["llvm-objcopy"]["sha256"] == "3a871eab7279dee53f2580e8a022c980305738b575755b7d3529a6230ec4f672"
    assert "rustc 1.84.1-dev" in toolchain["versions"]["rustc"]["output"]
    image = load(HERE / "build-environment.json")
    assert len(image) == 1 and image[0]["Id"].endswith("6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50")
    assert image[0]["Architecture"] == "amd64" and image[0]["Os"] == "linux"

    registry = load(HERE / "registry-check.json")
    lock = tomllib.loads(recovered_sources["Cargo.lock"].decode())
    locked = {
        (row["name"], row["version"]): row["checksum"]
        for row in lock["package"]
        if str(row.get("source", "")).startswith("registry+")
    }
    observed = {(row["name"], row["version"]): row["archive_sha256"] for row in registry["packages"]}
    assert observed == locked and len(observed) == registry["package_count"] == 253
    assert sum(len(row["files"]) for row in registry["packages"]) == registry["file_count"] == 7968
    assert registry["all_archive_checksums_match_lock"] and registry["all_extracted_file_checksums_match"]
    assert registry["lockfile_sha256"] == sha(recovered_sources["Cargo.lock"])

    for label, source_map, expected_artifacts in (
        ("baseline", source_maps["baseline"], baseline_artifacts),
        ("recovered", source_maps["recovered"], recovered_artifacts),
    ):
        launch = load(HERE / "builds" / label / "launch.json")
        result = load(HERE / "builds" / label / "result.json")
        log = (HERE / "builds" / label / "build.log").read_bytes()
        assert launch["source_inputs"] == source_map and launch["fresh_target"]
        assert launch["network"] == "none" and launch["platform"] == "linux/amd64"
        assert launch["compiler_archive_sha256"] == toolchain["archive_sha256"]
        assert launch["rustc_sha256"] == toolchain["tools"]["rustc"]["sha256"]
        assert launch["llvm_objcopy_sha256"] == toolchain["tools"]["llvm-objcopy"]["sha256"]
        assert result["exit_code"] == 0 and result["source_unchanged"] and result["compiled_root"]
        assert not result["binary_patching"] and not result["allocation_padding"]
        assert result["build_log_sha256"] == sha(log)
        assert log.count(b"--crate-name donation_relay_source_proposal ") == 1
        assert result["candidate_sha256"] == expected_artifacts["candidate"]["sha256"]
        assert result["candidate_bytes"] == expected_artifacts["candidate"]["bytes"]
        assert result["symbols_sha256"] == expected_artifacts["symbols"]["sha256"]
        assert result["symbols_bytes"] == expected_artifacts["symbols"]["bytes"]
    for label in ("failed-cache", "failed-sparse"):
        result = load(HERE / "builds" / label / "result.json")
        log = (HERE / "builds" / label / "build.log").read_bytes()
        assert result["exit_code"] == 101 and result["source_unchanged"] and not result["compiled_root"]
        assert result["build_log_sha256"] == sha(log)
        assert b"no matching package named `anchor-spl` found" in log

    analysis_module = module("worker_artifact_recompute", HERE / "analyze.py")
    analysis = analysis_module.analyze()
    for label, files in analysis.items():
        for name, value in files.items():
            assert saved_analysis(label, name) == value, (label, name)
    before = analysis["baseline"]
    after = analysis["recovered"]
    before_summary = before["comparison-summary.json"]
    after_summary = after["comparison-summary.json"]
    assert before_summary["original_normalized_match_windows"] == 482
    assert after_summary["original_normalized_match_windows"] == expected["normalized_windows"] == 483
    assert after_summary["original_raw_match_windows"] == expected["raw_windows"] == 130
    assert after_summary["unmatched_original_windows"] == 9
    assert after_summary["candidate_sha256"] == expected["candidate_sha256"]
    assert after_summary["unstripped_sha256"] == expected["symbols_sha256"]
    assert not after_summary["whole_file_equal"]
    before_matches = {row["ordinal"] for row in before["match-ledger.json"] if row["normalized_candidate_indices"]}
    after_matches = {row["ordinal"] for row in after["match-ledger.json"] if row["normalized_candidate_indices"]}
    assert after_matches - before_matches == {112} and not before_matches - after_matches
    assert [row["ordinal"] for row in after["match-ledger.json"] if not row["normalized_candidate_indices"]] == list(range(92, 101))
    workers = [row for row in after["candidate-function-ledger.json"]
               if any("13donate_shared" in name for name in row["names"])]
    assert len(workers) == 1
    worker = workers[0]
    original_worker = after["original-function-ledger.json"][112]
    assert worker["bytes"] == original_worker["bytes"] == expected["worker_bytes"] == 10248
    assert worker["normalized_sha256"] == original_worker["normalized_sha256"] == expected["worker_normalized_sha256"]
    witnesses = [row for row in after["match-witnesses.json"]
                 if row["original_ordinal"] == 112 and row["candidate_index"] == worker["index"]]
    assert len(witnesses) == 1 and not witnesses[0]["raw_body"]
    assert len(witnesses[0]["direct_calls"]) == metadata["analysis"]["worker_direct_calls"] == 51
    assert all(call["normalized_body_pair"] for call in witnesses[0]["direct_calls"])

    runtime = load(HERE / "fresh-runtime.json.gz")
    assert runtime["original_sha256"] == expected["original_sha256"]
    assert runtime["candidate_sha256"] == expected["candidate_sha256"]
    assert runtime["runner_sha256"] == sha((HERE / "replay_saved.py").read_bytes())
    assert runtime["harness_sha256"] == sha((ROOT / "repro/donation-relay/local-validation-proposal/harness_proposal.py").read_bytes())
    assert runtime["token2022_sha256"] == sha((ROOT / "evidence/dependencies/spl_token_2022/deployed.so").read_bytes())
    assert runtime["case_count"] == len(runtime["cases"]) == metadata["runtime"]["case_count"] == 536
    assert not runtime["failures"] and all(row["original_reproduced"] for row in runtime["cases"])
    fixtures = {json.dumps(row["fixture"], sort_keys=True, separators=(",", ":")) for row in runtime["cases"]}
    assert len(fixtures) == 534
    for name, digest in runtime["input_reports"].items():
        assert sha((ROOT / name).read_bytes()) == digest, name
    assert metadata["runtime"]["sha256"] == sha((HERE / "fresh-runtime.json.gz").read_bytes())

    print("PASS: Linux v1.48 baseline exact; Relay worker 112 recovered; 483/492; 51/51 callees; 536/536 replay")


if __name__ == "__main__":
    main()
