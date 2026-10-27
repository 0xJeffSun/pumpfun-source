#!/usr/bin/env python3
"""Verify this frozen layout checkpoint without compiling or executing a program."""
import argparse
import base64
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import struct
import sys
import tempfile

from solders.transaction import Transaction

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
sha = lambda b: hashlib.sha256(b).hexdigest()


def load(name):
    raw = (HERE / name).read_bytes()
    return json.loads(gzip.decompress(raw) if name.endswith(".gz") else raw)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--current", action="store_true")
    args = parser.parse_args()
    for name, expected in load("manifest.json").items():
        assert sha((HERE / name).read_bytes()) == expected, name
    for name, expected in load("source-manifest.json").items():
        assert sha((HERE / "source" / name).read_bytes()) == expected, name
        if args.current:
            assert sha((ROOT / "programs/donation-relay" / name).read_bytes()) == expected, name
    spec = importlib.util.spec_from_file_location("layout_elf_analysis", HERE / "analyze.py")
    analysis = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(analysis)
    original = ROOT / "evidence/dependencies/donation_relay/deployed.so"
    with tempfile.TemporaryDirectory(prefix="relay-layout-verify-") as temporary:
        directory = Path(temporary)
        (directory / "original.so").symlink_to(original)
        for name in ["candidate.so", "unstripped.so", "original-windows.json"]:
            (directory / name).symlink_to(HERE / name)
        derived = analysis.analyze(directory)
    assert derived["comparison-summary.json"] == load("comparison-summary.json")
    for name in ["match-ledger.json", "original-function-ledger.json", "candidate-function-ledger.json",
                 "section-comparison.json", "match-witnesses.json"]:
        assert derived[name] == load(name + ".gz"), name
    from collections import Counter
    reference = load("predecessor-ledger.json")
    prior_bytes = (ROOT / reference["path"]).read_bytes()
    assert sha(prior_bytes) == reference["sha256"]
    prior = json.loads(gzip.decompress(prior_bytes))
    current = derived["candidate-function-ledger.json"]
    bodies = lambda rows: Counter((r["bytes"], r["normalized_sha256"]) for r in rows)
    # Every other complete emitted body must retain its preceding normalized bytes.
    changed = [i for i, (a, b) in enumerate(zip(prior, current))
               if (a["bytes"], a["normalized_sha256"]) != (b["bytes"], b["normalized_sha256"])]
    assert len(prior) == len(current) == 492 and changed == [90]
    target = derived["original-function-ledger.json"][90]
    assert current[90]["bytes"] == target["bytes"] == 2496
    assert current[90]["normalized_sha256"] == target["normalized_sha256"]
    witness = next(w for w in derived["match-witnesses.json"]
                   if w["original_ordinal"] == 90 and w["candidate_index"] == 90)
    assert witness["recursive_call_shape_closed"] and not witness["raw_body"]
    order = load("business-order.json")
    original_rows = derived["original-function-ledger.json"]
    assert len(order["rows"]) == 27
    for record in order["rows"]:
        i = record["ordinal"]
        assert record["candidate_names"] == current[i]["names"]
        assert record["normalized_at_ordinal"] == (original_rows[i]["normalized_sha256"] == current[i]["normalized_sha256"])
    assert order["normalized_matches_at_business_ordinal"] == 15
    summary = derived["comparison-summary.json"]
    assert summary["original_normalized_match_windows"] == 477
    assert not summary["whole_file_equal"]
    locations = {}
    for label, binary in [("original", original), ("layout", HERE / "candidate.so")]:
        elf = analysis.Elf(binary.read_bytes())
        rows = []
        for address, relocation in elf.relocations.items():
            if relocation["type"] != 8:
                continue
            try:
                packed, size, line, column = struct.unpack("<QQII", elf.at(address, 24))
                filename = elf.at(packed >> 32, size).decode()
                if "/events/v1/" in filename:
                    rows.append((filename, line, column))
            except (ValueError, UnicodeDecodeError, struct.error):
                continue
        locations[label] = sorted(rows)
    assert len(locations["original"]) == 4 and locations["original"] == locations["layout"]
    harness = ROOT / "repro/donation-relay/local-validation-proposal/harness_proposal.py"
    assert sha(harness.read_bytes()) == "fd6df62699bc5732fffca65d7e6b5c1c872746180563ca3e320f7dbe11f7cb1b"
    spec = importlib.util.spec_from_file_location("layout_frozen_runtime_comparator", harness)
    comparator = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(comparator)
    records = 0
    wires = set()
    for path in sorted((HERE / "runtime").glob("*.json.gz")):
        data = load(str(path.relative_to(HERE)))
        for row in data["cases"]:
            results = row.get("results", row)
            assert comparator.comparable(results["original"]) == comparator.comparable(results["candidate"])
            for label in ["original", "candidate"]:
                raw = base64.b64decode(results[label]["transaction_base64"], validate=True)
                Transaction.from_bytes(raw).verify()
                wires.add(sha(raw))
            records += 1
    assert records == 527
    identities = load("current/identity.json")
    for kind, name in [("stripped", "candidate.so"), ("unstripped", "unstripped.so")]:
        assert identities[kind]["equal"]
        assert identities[kind]["candidate_sha256"] == sha((HERE / name).read_bytes())
        assert identities[kind]["current_sha256"] == identities[kind]["candidate_sha256"]
    print(json.dumps({"normalized_matches": 477, "raw_matches": 107,
                      "event_source_descriptors_equal": 4, "runtime_case_records": records,
                      "unique_signed_transactions": len(wires),
                      "current_source_checked": args.current, "whole_file_equal": False}, indent=2))


if __name__ == "__main__":
    main()
