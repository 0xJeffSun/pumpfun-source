#!/usr/bin/env python3
"""Recompute the complete baseline and recovered Relay window analyses."""
import argparse
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import shutil
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def read_artifact(descriptor):
    path = Path(descriptor["path"])
    path = ROOT / path if path.parts and path.parts[0] == "repro" else HERE / path
    raw = gzip.decompress(path.read_bytes())
    assert len(raw) == descriptor["bytes"]
    assert hashlib.sha256(raw).hexdigest() == descriptor["sha256"]
    return raw


def analyze():
    metadata = json.loads((HERE / "metadata.json").read_text())
    parser = module(
        "worker_artifact_public_parser",
        ROOT / "repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py",
    )
    variants = {
        "baseline": metadata["baseline_artifacts"],
        "recovered": metadata["variants"]["recovered"]["artifacts"],
    }
    result = {}
    with tempfile.TemporaryDirectory(prefix="relay-worker-artifact-analysis-") as temp:
        directory = Path(temp)
        shutil.copyfile(ROOT / "evidence/dependencies/donation_relay/deployed.so", directory / "original.so")
        shutil.copyfile(
            ROOT / "repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json",
            directory / "original-windows.json",
        )
        for label, artifacts in variants.items():
            (directory / "candidate.so").write_bytes(read_artifact(artifacts["candidate"]))
            (directory / "unstripped.so").write_bytes(read_artifact(artifacts["symbols"]))
            result[label] = parser.analyze(directory)
    return result


def write_analysis(result):
    for label, files in result.items():
        directory = HERE / "analysis" / label
        directory.mkdir(parents=True, exist_ok=True)
        for name, value in files.items():
            payload = (json.dumps(value, indent=2, sort_keys=True) + "\n").encode()
            path = directory / name
            if name.endswith(".gz") or path.with_suffix(path.suffix + ".gz").exists():
                if not name.endswith(".gz"):
                    path = path.with_suffix(path.suffix + ".gz")
                path.write_bytes(gzip.compress(payload, mtime=0))
            else:
                path.write_bytes(payload)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    result = analyze()
    if args.write:
        write_analysis(result)
    before = result["baseline"]["comparison-summary.json"]
    after = result["recovered"]["comparison-summary.json"]
    baseline_matches = {
        row["ordinal"] for row in result["baseline"]["match-ledger.json"]
        if row["normalized_candidate_indices"]
    }
    recovered_matches = {
        row["ordinal"] for row in result["recovered"]["match-ledger.json"]
        if row["normalized_candidate_indices"]
    }
    print(json.dumps({
        "baseline_normalized": before["original_normalized_match_windows"],
        "recovered_normalized": after["original_normalized_match_windows"],
        "raw": after["original_raw_match_windows"],
        "gained": sorted(recovered_matches - baseline_matches),
        "lost": sorted(baseline_matches - recovered_matches),
        "unmatched": after["unmatched_original_windows"],
    }, indent=2))


if __name__ == "__main__":
    main()
