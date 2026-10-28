#!/usr/bin/env python3
"""Verify the L24 zero-cashback log-parity packet from repository files."""
from collections import Counter
from pathlib import Path
import base64, csv, difflib, gzip, hashlib, importlib.util, json, re, struct, subprocess, sys, tempfile

if not __debug__:
    raise SystemExit("run without -O")
sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
ROOT = next(p for p in P.parents if (p / "evidence/original/pump/deployed.so").is_file())
PARENT = ROOT / "research/claude-pump-integration-20261027/r37-layout-24"
BASE_SOURCE = PARENT / "source/programs/pump/src/token_incentives/claim_token_incentives.rs"
CAND_SOURCE = P / "source/programs/pump/src/token_incentives/claim_token_incentives.rs"
ORIGINAL = ROOT / "evidence/original/pump/deployed.so"
NEEDLE = "Program log: No cashback to claim"
CANDIDATE_SHA = "4ad9ec9994783cb8a02d4e1552cc411bfa6f9c0ab9a531fe459774a15aeb68ba"
UNSTRIPPED_SHA = "1dbf8fd73a130261fc650e1a93480ce90fb1fa9c34e74f8e217cbca37951f998"
PARENT_CANDIDATE_SHA = "b9fbdf84d77a89000be5764721f1ca3eaa81bbd45972e825f36e658a6360774c"
PARENT_UNSTRIPPED_SHA = "5fe112da2524ca529305d24bd411020daf144abff7258e58f1fedfa3f336faff"
ORIGINAL_SHA = "7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d"
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()


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


def assert_digest(blob, expected):
    assert hashlib.sha256(blob).hexdigest() == expected


def verify_manifest():
    manifest = json.loads((P / "MANIFEST.json").read_text())
    actual = {str(path.relative_to(P)) for path in P.rglob("*") if path.is_file() and path.name != "MANIFEST.json"}
    assert actual == set(manifest), sorted(actual ^ set(manifest))
    for name, digest in manifest.items():
        path = P / name
        assert path.is_file() and not path.is_symlink() and sha(path) == digest, name
    assert all(not path.is_symlink() for path in P.rglob("*"))


def expected_source_patch(base, candidate):
    rel = "programs/pump/src/token_incentives/claim_token_incentives.rs"
    return "".join(difflib.unified_diff(base.splitlines(True), candidate.splitlines(True),
                                        "a/" + rel, "b/" + rel, n=3))


def validate_source(base, candidate):
    old1 = 'if amount==0{return Ok(());}'
    new1 = 'if amount==0{msg!("No cashback to claim");return Ok(());}'
    assert base.count(old1) == 2 and base.count(new1) == 0
    assert candidate == base.replace(old1, new1)
    assert len(base.splitlines()) == len(candidate.splitlines()) == 350


def verify_source():
    base, candidate = BASE_SOURCE.read_text(), CAND_SOURCE.read_text()
    validate_source(base, candidate)
    assert (P / "source.patch").read_text() == expected_source_patch(base, candidate)
    assert sha(BASE_SOURCE) == "6d55490c742ff33cadddf8b7ff01e46501c316ef878b9215f865138ac9947862"
    assert sha(CAND_SOURCE) == "f4291e1d083291ca969e1a84f8bfc4011abe1cf605b4aa2f539685f337280971"


def map_primary_sources(record):
    for name, digest in record["primary_source_sha256"].items():
        marker = "programs/pump/"
        rel = name.split(marker, 1)[1]
        path = CAND_SOURCE if rel == "src/token_incentives/claim_token_incentives.rs" else PARENT / "source/programs/pump" / rel
        assert sha(path) == digest, rel


def warning_headers(raw):
    return re.findall(r"^warning: .+$", raw, re.MULTILINE)


def verify_builds():
    parent_log = gzip.decompress((PARENT / "build.log.gz").read_bytes()).decode(errors="replace")
    parent_warnings = warning_headers(parent_log)
    assert len(parent_warnings) == 55 and parent_warnings[-1].startswith("warning: `pump-recovered` (lib) generated 54 warnings")
    for name in ("build-1", "build-2"):
        folder = P / "builds" / name
        record = json.loads((folder / "build-comparison.json").read_text())
        assert record["returncode"] == 0 and record["source_unchanged"] and record["workspace_layout"]
        assert record["selected_toolchain"] == "v1.44"
        assert record["comparison"]["candidate_sha256"] == sha(folder / "candidate.so") == CANDIDATE_SHA
        assert record["unstripped_sha256"] == sha(folder / "unstripped.so") == UNSTRIPPED_SHA
        assert record["tool_sha256"]["rustc"] == "1f26338cc2cabd0a6057dcbd0528bba262b23ca1296d357a55304ee31d1d9e5a"
        assert record["tool_sha256"]["cargo"] == "cd27e4113fc155b5e79fca97c1cc5447ef89d1c8ce3d0e1e5679d2dd7a9ab0ef"
        profile = record["target_library_profile"]
        assert profile["name"] == "linux-v1.44-sbf" and profile["status"] == "verified"
        assert profile["cache_context"]["prepared_sdk_manifest_sha256"] == "adf16f1a6fec616fccfb40a1c71102c1e82452ddcafc1bb1241eca66ee04c965"
        assert sha(folder / "target-library-profile-files.json") == profile["file_manifest_sha256"]
        map_primary_sources(record)
        log = (folder / "build.log").read_text(errors="replace")
        assert "stack offset" not in log.lower()
        assert warning_headers(log) == parent_warnings
    assert (P / "builds/build-1/candidate.so").read_bytes() == (P / "builds/build-2/candidate.so").read_bytes()
    assert (P / "builds/build-1/unstripped.so").read_bytes() == (P / "builds/build-2/unstripped.so").read_bytes()


def elf_functions(blob):
    shoff, = struct.unpack_from("<Q", blob, 0x28)
    shentsize, shnum, shstrndx = struct.unpack_from("<HHH", blob, 0x3A)
    headers = [struct.unpack_from("<IIQQQQIIQQ", blob, shoff + i * shentsize) for i in range(shnum)]
    names = headers[shstrndx]
    secname = lambda off: blob[names[4] + off:blob.index(b"\0", names[4] + off)].decode()
    text_index = next(i for i, h in enumerate(headers) if secname(h[0]) == ".text")
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
    os_, cs = sections(original), sections(candidate)
    by = {}
    for start, size, name in elf_functions(candidate):
        raw = body(candidate, cs, start, size)
        normalized, _ = normalize(raw, start, cs)
        by.setdefault((size, hashlib.sha256(normalized).hexdigest()), []).append(
            {"start": start, "name": name, "raw": hashlib.sha256(raw).hexdigest()})
    rows = []
    with (ROOT / "repro/reconstruction-status-2026-10-26/functions.tsv").open() as stream:
        for row in csv.DictReader(stream, delimiter="\t"):
            if row["program"] != "pump" or row["variant"] != "selected":
                continue
            start, end = int(row["original_start"]), int(row["original_end"])
            raw = body(original, os_, start, end - start)
            normalized, _ = normalize(raw, start, os_)
            matches = by.get((end - start, hashlib.sha256(normalized).hexdigest()), [])
            rows.append({"start": start, "end": end, "bytes": end - start,
                         "normalized_matches": matches,
                         "raw_match": any(m["raw"] == hashlib.sha256(raw).hexdigest() for m in matches)})
    counts = {"total": len(rows), "raw": sum(r["raw_match"] for r in rows),
              "normalized": sum(bool(r["normalized_matches"]) for r in rows),
              "unmatched": sum(not r["normalized_matches"] for r in rows),
              "matched_text_bytes": sum(r["bytes"] for r in rows if r["normalized_matches"])}
    return {"candidate_sha256": hashlib.sha256(candidate).hexdigest(), "counts": counts, "windows": rows}


def verify_inventory():
    saved = read(P / "inventory.json.gz")
    observed = recompute_inventory(P / "builds/build-1/unstripped.so")
    assert observed == saved
    assert observed["counts"] == {"total": 1035, "raw": 148, "normalized": 977,
                                  "unmatched": 58, "matched_text_bytes": 1416296}
    parent = read(PARENT / "inventory.json.gz")
    for key in ("normalized_matches", "raw_match"):
        before = {row["start"] for row in parent["windows"] if row[key]}
        after = {row["start"] for row in observed["windows"] if row[key]}
        assert before <= after and before == after
    comparison = json.loads((P / "inventory-comparison.json").read_text())
    assert not comparison["normalized_gains"] and not comparison["normalized_losses"]
    assert not comparison["raw_gains"] and not comparison["raw_losses"]


def expected_message_paths():
    old = read(PARENT / "full.json.gz")
    result = set()
    for where, row in pairs(old["suites"]):
        if NEEDLE in row["original"].get("logs", []) and NEEDLE not in row["candidate"].get("logs", []):
            result.add(where)
    assert len(result) == 34
    return result


def validate_focused(data, expected):
    rows = list(pairs(data["cases"]))
    assert len(rows) == data["case_count"] == 283 and not data["mismatches"]
    observed = set()
    for where, row in rows:
        full = "cashback/cases/" + where
        for key in ("error", "accounts", "events", "inner", "return_data"):
            assert row["original"][key] == row["candidate"][key], (full, key)
        original_has = NEEDLE in row["original"].get("logs", [])
        candidate_has = NEEDLE in row["candidate"].get("logs", [])
        assert original_has == candidate_has
        if candidate_has:
            observed.add(full)
    assert observed == expected


def verify_signed_transaction(encoded):
    from solders.transaction import Transaction
    raw = base64.b64decode(encoded, validate=True)
    Transaction.from_bytes(raw).verify()


def verify_loader_receipts(full):
    assert len(full["loader_receipts"]) == 44
    for suite, binding in full["loader_receipts"].items():
        path = P / "runtime/loader-receipts" / (suite + ".loader.json")
        assert sha(path) == binding["sha256"]
        receipt = json.loads(path.read_text())
        assert len(receipt["loads"]) == binding["load_count"]
        assert {row["elf_sha256"] for row in receipt["loads"]} == {ORIGINAL_SHA, CANDIDATE_SHA}
        assert all(row["program_bytes"] == 36 and row["programdata_bytes"] == 10485760
                   and row["elf_prefix_unchanged"] and row["zero_allocation_tail"] for row in receipt["loads"])
        for recorded, digest in receipt["input_sha256"].items():
            relative = recorded.split("pumpfun-source-pump-cashback-parity/", 1)[1]
            assert sha(ROOT / relative) == digest


def retained_fresh_comparison(new_path):
    compute = re.compile(r"^Program \S+ consumed \d+ of \d+ compute units$")
    norm = lambda lines: [line for line in lines if not compute.fullmatch(line)]
    old = read(PARENT / "full.json.gz")
    new = read(new_path)
    old_rows = {where: row for where, row in pairs(old["suites"])}
    counts = Counter()
    transactions_old, transactions_new = set(), set()
    changed = []
    for where, row in pairs(new["suites"]):
        before = old_rows.pop(where)
        counts["rows"] += 1
        left, right = norm(before["candidate"]["logs"]), norm(row["candidate"]["logs"])
        if left == right:
            counts["exact_candidate_logs_excluding_compute"] += 1
        elif [line for line in right if line != NEEDLE] == left and right.count(NEEDLE) == left.count(NEEDLE) + 1:
            counts["cashback_message_only_changes"] += 1
            changed.append(where)
        else:
            counts["unexpected_candidate_log_changes"] += 1
        counts["exact_original_logs_excluding_compute"] += norm(before["original"]["logs"]) == norm(row["original"]["logs"])
        for side in ("original", "candidate"):
            a, b = before[side].get("transaction_base64"), row[side].get("transaction_base64")
            if a is not None and b is not None:
                counts["transaction_fields_compared"] += 1
                counts["transaction_fields_equal"] += a == b
                transactions_old.add(a); transactions_new.add(b)
    assert not old_rows and counts["rows"] == 10468
    assert counts["exact_candidate_logs_excluding_compute"] == 10434
    assert counts["cashback_message_only_changes"] == 34 and not counts["unexpected_candidate_log_changes"]
    assert counts["exact_original_logs_excluding_compute"] == 10468
    assert counts["transaction_fields_compared"] == counts["transaction_fields_equal"] == 18268
    assert transactions_old == transactions_new and len(transactions_new) == 2407
    return dict(counts), sorted(changed), transactions_new


def verify_runtime():
    expected = expected_message_paths()
    focused = read(P / "runtime/cashback-focused.json.gz")
    assert focused["candidate_sha256"] == CANDIDATE_SHA and focused["original_sha256"] == ORIGINAL_SHA
    validate_focused(focused, expected)
    full_path = P / "runtime/full.json.gz"
    full = read(full_path)
    assert full["candidate_sha256"] == CANDIDATE_SHA and full["original_sha256"] == ORIGINAL_SHA
    assert full["case_count"] == 10468 and len(full["suites"]) == 44 and not full["mismatches"]
    assert full["loader_profile"] == "captured-upgradeable" and not full["diagnostics"]["mismatches"]
    verify_loader_receipts(full)
    counts, changed, transactions = retained_fresh_comparison(full_path)
    stored = json.loads((P / "runtime/retained-to-fresh-comparison.json").read_text())
    assert stored["counts"]["rows"] == counts["rows"]
    assert stored["cashback_message_paths"] == changed and stored["source_coordinates_normalized"] is False
    for encoded in transactions:
        verify_signed_transaction(encoded)
    oracle = ROOT / "repro/pump/main-contract-round47-20261027/ordinary-logs"
    sys.path.insert(0, str(oracle))
    from audit import audit_inputs
    with tempfile.TemporaryDirectory() as directory:
        folder = Path(directory)
        review = audit_inputs([(full_path, 10468)], folder / "review.json", folder / "mismatches.jsonl.gz")
    assert review["counts"]["non_filename_mismatches"] == 107
    assert review["families"] == {"source_file_path_only": 52, "missing_fee_bucket_zero_notice": 84,
                                  "missing_creator_non_system_notice": 5, "missing_canonical_pool_notice": 3,
                                  "ordinary_message_order": 6, "missing_creator_quote_frozen_notice": 9}
    saved = json.loads((P / "runtime/ordered-log-review.json").read_text())
    assert saved["counts"] == review["counts"] and saved["families"] == review["families"]


def main():
    verify_manifest()
    assert sha(ORIGINAL) == ORIGINAL_SHA
    assert sha(PARENT / "candidate.so") == PARENT_CANDIDATE_SHA
    assert sha(PARENT / "unstripped.so") == PARENT_UNSTRIPPED_SHA
    subprocess.run([sys.executable, str(PARENT / "verify.py")], cwd=ROOT, check=True,
                   stdout=subprocess.DEVNULL)
    verify_source()
    verify_builds()
    verify_inventory()
    verify_runtime()
    print(json.dumps({"verified": True, "normalized": 977, "raw": 148,
                      "runtime_cases": 10468, "missing_cashback_notices": 0,
                      "non_filename_log_differences": 107,
                      "candidate_sha256": CANDIDATE_SHA,
                      "unstripped_sha256": UNSTRIPPED_SHA}, indent=2))


if __name__ == "__main__":
    main()
