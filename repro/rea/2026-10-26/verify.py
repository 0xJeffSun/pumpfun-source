#!/usr/bin/env python3
"""Verify saved REA evidence without executing or rebuilding a program."""
import hashlib
import json
import argparse
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
SHA = lambda data: hashlib.sha256(data).hexdigest()


def read(name):
    return json.loads((HERE / name).read_text())


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--current", action="store_true", help="Also bind current source to this historical checkpoint")
    args = parser.parse_args()
    original = ROOT / "evidence/dependencies/donation_relay/deployed.so"
    expected = "367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563"
    assert SHA(original.read_bytes()) == expected
    exported = read("relay-business-export.json")
    assert exported["subject"]["digest"]["sha256"] == expected
    result = exported["normalized_result"]
    assert result["counts"]["written"] == 23 and result["counts"]["failed"] == 0
    index = read("relay-business/decompile-index.json")
    assert index["target_sha256"] == expected
    windows = {f"0x{r['start']:x}": r for r in read("original-windows.json")}
    ordinals = []
    for function in index["functions"]:
        window = windows[function["address"]]
        ranges = function["body"]["ranges"]
        assert len(ranges) == 1 and not function["body"]["non_contiguous"]
        assert int(ranges[0]["start"], 16) == window["start"]
        assert int(ranges[0]["end"], 16) + 1 == window["start"] + window["bytes"]
        path = (HERE / "relay-business" / function["relative_path"]).resolve()
        assert path.is_relative_to((HERE / "relay-business").resolve())
        assert SHA(path.read_bytes()) == function["sha256"]
        ordinals.append(window["ordinal"])
    assert sorted(ordinals) == list(range(90, 113))
    baseline = read("baseline-summary.json")
    assert baseline["original_normalized_match_windows"] == 476
    assert baseline["original_raw_match_windows"] == 107
    assert not baseline["whole_file_equal"]
    if args.current:
        for name, digest in read("baseline-source-manifest.json").items():
            assert SHA((ROOT / "programs/donation-relay" / name).read_bytes()) == digest, name
    assert len(read("source-trials.json")) == 7
    print(json.dumps({"original_unchanged": True, "verified_complete_function_ranges": 23,
                      "current_source_matches_baseline": True if args.current else None, "normalized_windows": 476,
                      "raw_windows": 107, "whole_file_equal": False}, indent=2))


if __name__ == "__main__":
    main()
