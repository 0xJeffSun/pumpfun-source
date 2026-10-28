#!/usr/bin/env python3
"""Verify the Pump Main L30 empty-fee-sweep parity packet."""
from collections import Counter
from pathlib import Path
import base64
import csv
import difflib
import gzip
import hashlib
import importlib.util
import json
import re
import struct
import sys

if not __debug__:
    raise SystemExit("run without -O")
sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
ROOT = next(path for path in P.parents if (path / "evidence/original/pump/deployed.so").is_file())
PARENT = ROOT / "research/claude-pump-integration-20261027/r37-layout-30"
BASE_SOURCE = PARENT / "source/programs/pump/src/sweep_fees.rs"
CAND_SOURCE = P / "proposed/sweep_fees.rs"
ORIGINAL = ROOT / "evidence/original/pump/deployed.so"
ORIGINAL_SHA = "7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d"
PARENT_STRIPPED = "d90e49c69de901ce642470016c99a33c398815fe4a4a4c8962c7c5f2973c010b"
PARENT_UNSTRIPPED = "bb93433848be3ac21506ad4c4b985751bb828036ed725586420f4d589489ba44"
CANDIDATE_STRIPPED = "3b8588e551e30dde30fc41d39443a59753202d5af1b8b8e4cde44584ab3c2a27"
CANDIDATE_UNSTRIPPED = "eb6b008a7b2d447067aaecb4c16b19e3c7e5dc4f5aaca387fbeadcee2d36a28f"
TOOL_SHA = {
    "rustc": "1f26338cc2cabd0a6057dcbd0528bba262b23ca1296d357a55304ee31d1d9e5a",
    "cargo": "cd27e4113fc155b5e79fca97c1cc5447ef89d1c8ce3d0e1e5679d2dd7a9ab0ef",
    "objcopy": "8f79cc9a0eab0bd1b19a2ad789e5cb5e6f22d16c2f147d58ca30b9b51d2231e1",
}

spec = importlib.util.spec_from_file_location("parity_checks", P / "parity_checks.py")
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)
sha = checks.sha256


def read(path):
    raw = Path(path).read_bytes()
    return json.loads(gzip.decompress(raw) if raw[:2] == b"\x1f\x8b" else raw)


def pairs(value, path=""):
    if isinstance(value, dict):
        if isinstance(value.get("original"), dict) and isinstance(value.get("candidate"), dict):
            yield path.lstrip("/"), value
        for key, child in value.items():
            if key not in ("original", "candidate"):
                yield from pairs(child, path + "/" + key)
    elif isinstance(value, list):
        for index, child in enumerate(value):
            yield from pairs(child, path + "/" + str(index))


def verify_manifest():
    checks.verify_manifest(P, json.loads((P / "MANIFEST.json").read_text()))


def verify_source():
    parent, candidate = BASE_SOURCE.read_text(), CAND_SOURCE.read_text()
    checks.validate_source(parent, candidate)
    expected = "".join(difflib.unified_diff(
        parent.splitlines(True), candidate.splitlines(True),
        "a/programs/pump/src/sweep_fees.rs", "b/programs/pump/src/sweep_fees.rs", n=3))
    assert (P / "source.patch").read_text() == expected
    record = read(P / "source-correction.json")
    assert record["parent_sha256"] == sha(BASE_SOURCE) == "89ae80f858a66f3cb2597a434bdbbb60c6b82e531f6b967f93519fb35db449b0"
    assert record["proposed_sha256"] == sha(CAND_SOURCE) == "7785b8d9ac34c2499996b97d2b8984058b6ea802926dade88443013ae4fcce01"
    assert record["parent_lines"] == record["proposed_lines"] == 162
    assert record["changed_physical_lines"] == [147]


def map_primary_sources(record, flavor):
    marker = flavor + "-source/"
    for recorded, digest in record["primary_source_sha256"].items():
        assert marker in recorded
        relative = recorded.split(marker, 1)[1]
        path = CAND_SOURCE if flavor == "candidate" and relative == "src/sweep_fees.rs" else PARENT / "source/programs/pump" / relative
        assert sha(path) == digest, relative


def warning_headers(text):
    return re.findall(r"^warning: .+$", text, re.MULTILINE)


def physical_inputs(path):
    rows = [json.loads(line) for line in Path(path).read_text().splitlines()]
    assert len(rows) == 210
    return Counter((re.sub(r"^.*?/cargo-home/", "cargo-home/", row["original_source"]), row["sha256"])
                   for row in rows)


def verify_builds():
    assert sha(ORIGINAL) == ORIGINAL_SHA
    assert sha(PARENT / "candidate.so") == PARENT_STRIPPED
    assert sha(PARENT / "unstripped.so") == PARENT_UNSTRIPPED
    baseline = read(P / "builds/baseline/build-comparison.json")
    records = [("baseline", baseline, "baseline")]
    for name in ("candidate-1", "candidate-2"):
        records.append((name, read(P / f"builds/{name}/build-comparison.json"), "candidate"))
    warnings = None
    physical = None
    for name, record, flavor in records:
        folder = P / "builds" / name
        assert record["returncode"] == 0 and record["source_unchanged"] and record["workspace_layout"]
        assert record["selected_toolchain"] == "v1.44" and record["tool_sha256"] == TOOL_SHA
        profile = record["target_library_profile"]
        assert profile["name"] == "linux-v1.44-sbpf" and profile["status"] == "verified"
        assert profile["profile_spec_sha256"] == "7e2461b5ec54416d6b64508af1e2677f63afd83d35e9a3eeae6ca877ae879f1e"
        assert len(profile["cache_context"]["target_libraries"]) == 25
        assert sha(folder / "target-library-profile-files.json") == profile["file_manifest_sha256"] == "a769d7293191d15f5610521fa86ac83dc267be964130369cff116f9ea933cbe8"
        map_primary_sources(record, flavor)
        stripped = record["comparison"]["candidate_sha256"]
        unstripped = record["unstripped_sha256"]
        if name == "baseline":
            assert stripped == PARENT_STRIPPED and unstripped == PARENT_UNSTRIPPED
        else:
            assert sha(folder / "candidate.so") == stripped == CANDIDATE_STRIPPED
            assert sha(folder / "unstripped.so") == unstripped == CANDIDATE_UNSTRIPPED
        log = (folder / "build.log").read_text(errors="replace")
        assert "stack offset" not in log.lower()
        headers = warning_headers(log)
        assert len(headers) == 61 and headers[-1].startswith("warning: `pump-recovered` (lib) generated 60 warnings")
        warnings = headers if warnings is None else warnings
        assert headers == warnings
        inputs = physical_inputs(folder / "physical-source-calls.jsonl")
        physical = inputs if physical is None else physical
        assert inputs == physical
    assert (P / "builds/candidate-1/candidate.so").read_bytes() == (P / "builds/candidate-2/candidate.so").read_bytes()
    assert (P / "builds/candidate-1/unstripped.so").read_bytes() == (P / "builds/candidate-2/unstripped.so").read_bytes()


def elf_functions(blob):
    shoff, = struct.unpack_from("<Q", blob, 0x28)
    shentsize, shnum, shstrndx = struct.unpack_from("<HHH", blob, 0x3A)
    headers = [struct.unpack_from("<IIQQQQIIQQ", blob, shoff + i * shentsize) for i in range(shnum)]
    names = headers[shstrndx]
    secname = lambda off: blob[names[4] + off:blob.index(b"\0", names[4] + off)].decode()
    text_index = next(i for i, header in enumerate(headers) if secname(header[0]) == ".text")
    out = []
    for header in headers:
        if header[1] != 2:
            continue
        strings = headers[header[6]]
        for index in range(header[5] // 24):
            no, info, _, section, value, size = struct.unpack_from("<IBBHQQ", blob, header[4] + index * 24)
            if info & 15 == 2 and section == text_index and size:
                name = blob[strings[4] + no:blob.index(b"\0", strings[4] + no)].decode()
                out.append((value, size, name))
    return out


def recompute_inventory(path):
    sys.path.insert(0, str(ROOT / "scripts"))
    from pump_compare_function_bytes import normalize, body
    from pump_quote_control_function_match import sections
    original, candidate = ORIGINAL.read_bytes(), Path(path).read_bytes()
    original_sections, candidate_sections = sections(original), sections(candidate)
    by = {}
    for start, size, name in elf_functions(candidate):
        raw = body(candidate, candidate_sections, start, size)
        normalized, _ = normalize(raw, start, candidate_sections)
        by.setdefault((size, hashlib.sha256(normalized).hexdigest()), []).append(
            {"start": start, "name": name, "raw": hashlib.sha256(raw).hexdigest()})
    rows = []
    with (ROOT / "repro/reconstruction-status-2026-10-26/functions.tsv").open() as stream:
        for row in csv.DictReader(stream, delimiter="\t"):
            if row["program"] != "pump" or row["variant"] != "selected":
                continue
            start, end = int(row["original_start"]), int(row["original_end"])
            raw = body(original, original_sections, start, end - start)
            normalized, _ = normalize(raw, start, original_sections)
            matches = by.get((end - start, hashlib.sha256(normalized).hexdigest()), [])
            rows.append({"start": start, "end": end, "bytes": end - start,
                         "normalized_matches": matches,
                         "raw_match": any(match["raw"] == hashlib.sha256(raw).hexdigest() for match in matches)})
    counts = {"total": len(rows), "raw": sum(row["raw_match"] for row in rows),
              "normalized": sum(bool(row["normalized_matches"]) for row in rows),
              "unmatched": sum(not row["normalized_matches"] for row in rows),
              "matched_text_bytes": sum(row["bytes"] for row in rows if row["normalized_matches"])}
    return {"candidate_sha256": hashlib.sha256(candidate).hexdigest(), "counts": counts, "windows": rows}


def verify_inventory():
    saved = read(P / "measurement/inventory.json.gz")
    observed = recompute_inventory(P / "builds/candidate-1/unstripped.so")
    assert observed == saved
    expected = {"total": 1035, "raw": 166, "normalized": 989,
                "unmatched": 46, "matched_text_bytes": 1444792}
    assert observed["counts"] == expected
    parent = read(PARENT / "inventory.json.gz")
    assert parent["counts"] == expected
    for key in ("normalized_matches", "raw_match"):
        before = {row["start"] for row in parent["windows"] if row[key]}
        after = {row["start"] for row in observed["windows"] if row[key]}
        assert before == after
    comparison = read(P / "measurement/inventory-comparison.json")
    assert not comparison["normalized_gains"] and not comparison["normalized_losses"]
    assert not comparison["raw_gains"] and not comparison["raw_losses"]
    assert comparison["sweep_handler"] == {"baseline_start": "0x7cc18", "baseline_size": 8224,
                                             "candidate_start": "0x7cc18", "candidate_size": 8496,
                                             "normalized_match": False, "raw_match": False}


def verify_signed_transactions(data):
    encoded = set()
    occurrences = 0
    for _, row in pairs(data):
        for side in ("original", "candidate"):
            value = row[side].get("transaction_base64")
            if value is not None:
                occurrences += 1
                encoded.add(value)
    for value in encoded:
        checks.verify_signed_transaction(value)
    return occurrences, len(encoded)


def map_loader_input(recorded):
    marker = "pumpfun-source-pump-l30-fee-sweep/"
    assert marker in recorded
    return ROOT / recorded.split(marker, 1)[1]


def validate_loader_receipt(path, allowed):
    receipt = read(path)
    assert {row["elf_sha256"] for row in receipt["loads"]} == set(allowed)
    assert all(row["program_bytes"] == 36 and row["programdata_bytes"] == 10485760
               and row["elf_prefix_unchanged"] and row["zero_allocation_tail"] for row in receipt["loads"])
    for recorded, digest in receipt["input_sha256"].items():
        assert sha(map_loader_input(recorded)) == digest
    return len(receipt["loads"])


def verify_focused():
    baseline = read(P / "runtime/focused/baseline.json.gz")
    candidate = read(P / "runtime/focused/candidate.json.gz")
    summary = read(P / "runtime/focused-summary.json")
    expected = set(summary["affected_indices"])
    result = checks.validate_focused(candidate, baseline, expected)
    assert result == {"cases": 504, "affected": 84, "bucket_0": 43, "bucket_1": 41}
    affected = read(P / "runtime/affected-cases.json")
    checks.validate_affected_rows(affected, expected)
    assert {row["transaction_sha256"] for row in affected} == {
        hashlib.sha256(base64.b64decode(candidate["cases"][row["index"]]["candidate"]["transaction_base64"])).hexdigest()
        for row in affected}
    occurrences, distinct = verify_signed_transactions(candidate)
    assert occurrences > distinct and distinct == summary["distinct_signed_transactions"] == 105
    baseline_receipt = P / "runtime/focused/baseline.loader.json"
    candidate_receipt = P / "runtime/focused/candidate.loader.json"
    assert sha(baseline_receipt) == summary["loader_receipts"]["baseline"]["sha256"]
    assert sha(candidate_receipt) == summary["loader_receipts"]["candidate"]["sha256"]
    assert validate_loader_receipt(baseline_receipt, (ORIGINAL_SHA, PARENT_STRIPPED)) == 1512
    assert validate_loader_receipt(candidate_receipt, (ORIGINAL_SHA, CANDIDATE_STRIPPED)) == 1512


def verify_full_runtime():
    fresh = read(P / "runtime/full.json.gz")
    old = read(PARENT / "full.json.gz")
    summary = read(P / "runtime/full-summary.json")
    assert fresh["case_count"] == summary["cases"] == 10468 and len(fresh["suites"]) == summary["suites"] == 44
    assert not fresh["mismatches"] and not fresh["diagnostics"]["mismatches"]
    fresh_rows = dict(pairs(fresh["suites"])); old_rows = dict(pairs(old["suites"]))
    assert fresh_rows.keys() == old_rows.keys() and len(fresh_rows) == 10468
    changed = set()
    for where, row in fresh_rows.items():
        before = old_rows[where]
        assert checks.structured_view(row["original"]) == checks.structured_view(row["candidate"]), where
        assert checks.normalized_logs(before["original"]["logs"]) == checks.normalized_logs(row["original"]["logs"])
        old_logs = checks.normalized_logs(before["candidate"]["logs"])
        new_logs = checks.normalized_logs(row["candidate"]["logs"])
        if old_logs != new_logs:
            added = checks.MESSAGE.format(1 if row["case"]["op"] == "sweep_creator_fee" else 0)
            reduced = list(new_logs); reduced.remove(added)
            assert reduced == old_logs and new_logs.count(added) == old_logs.count(added) + 1
            changed.add(where)
        for side in ("original", "candidate"):
            a = before[side].get("transaction_base64"); b = row[side].get("transaction_base64")
            if a is not None and b is not None:
                assert a == b
    assert changed == set(summary["fee_message_paths"]) and len(changed) == 84
    occurrences, distinct = verify_signed_transactions(fresh)
    assert occurrences == summary["signed_transaction_occurrences_reverified"] == 18268
    assert distinct == summary["distinct_signed_transactions"] == 2407
    receipts = fresh["loader_receipts"]
    assert len(receipts) == 44
    loads = 0
    for suite, binding in receipts.items():
        path = P / "runtime/full-loader-receipts" / f"{suite}.loader.json"
        assert sha(path) == binding["sha256"]
        count = validate_loader_receipt(path, (ORIGINAL_SHA, CANDIDATE_STRIPPED))
        assert count == binding["load_count"]
        loads += count
    assert loads == summary["loader_loads"] == 23834
    review = read(P / "runtime/ordered-log-review.json")
    assert review["counts"] == summary["ordered_log_counts"]
    assert review["families"] == summary["ordered_log_families"]
    assert summary["ordered_log_counts"]["non_filename_mismatches"] == 54
    assert summary["ordered_log_families"]["source_file_path_only"] == 52


def verify_summary():
    summary = read(P / "verification-summary.json")
    assert summary["status"] == "passed"
    assert summary["parent"]["stripped_sha256"] == PARENT_STRIPPED
    assert summary["candidate"]["stripped_sha256"] == CANDIDATE_STRIPPED
    assert summary["candidate"]["normalized_windows"] == 989
    assert summary["candidate"]["raw_windows"] == 166
    assert summary["runtime"]["missing_sweep_notices_before"] == 84
    assert summary["runtime"]["missing_sweep_notices_after"] == 0
    assert summary["runtime"]["non_filename_log_differences_after"] == 54


def main():
    verify_manifest()
    verify_source()
    verify_builds()
    verify_inventory()
    verify_focused()
    verify_full_runtime()
    verify_summary()
    print("PASS: L30 fee-sweep parity packet verified")
    print("  builds: 2 identical candidate ELFs")
    print("  windows: 989 normalized, 166 raw, zero losses")
    print("  runtime: 84/84 notices restored; 44 suites, 10,468 cases")


if __name__ == "__main__":
    main()
