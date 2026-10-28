#!/usr/bin/env python3
"""Fail-closed checks shared by the L30 evidence verifier and controls."""
from pathlib import Path
import base64
import hashlib
import json
import re

MESSAGE = "Program log: Nothing to sweep for fee bucket {}"
COMPUTE = re.compile(r"^Program \S+ consumed \d+ of \d+ compute units$")
STRUCTURED = ("error", "accounts", "events", "inner", "return_data")


def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def normalized_logs(lines):
    return [line for line in lines if not COMPUTE.fullmatch(line)]


def bucket_for(case):
    op = case["op"]
    assert op in ("sweep_creator_fee", "sweep_protocol_fee")
    return 1 if op == "sweep_creator_fee" else 0


def case_digest(case):
    raw = json.dumps(case, sort_keys=True, separators=(",", ":")).encode()
    return hashlib.sha256(raw).hexdigest()


def structured_view(outcome):
    """Return state/CPI/event/return fields while excluding logs and compute."""
    result = {key: value for key, value in outcome.items()
              if key not in ("logs", "relevant_logs", "transaction_base64", "compute_units", "compute_units_consumed",
                             "program_sha256")}
    if "metadata" in result:
        result["metadata"] = {key: value for key, value in result["metadata"].items()
                              if key not in ("logs", "compute_units_consumed")}
    return result


def validate_source(parent, candidate):
    old = "let amount=if creator{cf}else{pf};if amount==0{return Ok(());}"
    new = ('let amount=if creator{cf}else{pf};if amount==0{msg!('
           '"Nothing to sweep for fee bucket {}",if creator{1u8}else{0u8});return Ok(());}')
    assert parent.count(old) == 1 and parent.count(new) == 0
    assert candidate == parent.replace(old, new)
    assert len(parent.splitlines()) == len(candidate.splitlines()) == 162


def validate_affected_rows(rows, expected_indices):
    assert len(rows) == len(expected_indices) == 84
    assert len({row["index"] for row in rows}) == len(rows)
    assert {row["index"] for row in rows} == set(expected_indices)
    assert len({row["path"] for row in rows}) == len(rows)
    for row in rows:
        assert row["path"] == f"fee_sweeps/cases/{row['index']}"
        assert row["bucket"] == bucket_for(row["case"])
        assert row["case_sha256"] == case_digest(row["case"])


def validate_focused(candidate, baseline, expected_indices):
    """Check exact message-only restoration over the same signed case corpus."""
    assert candidate["case_count"] == baseline["case_count"]
    assert len(candidate["cases"]) == len(baseline["cases"]) == candidate["case_count"]
    assert not candidate["mismatches"] and not baseline["mismatches"]
    expected = set(expected_indices)
    observed = set()
    baseline_missing = set()
    for index, (fresh, before) in enumerate(zip(candidate["cases"], baseline["cases"])):
        assert fresh["case"] == before["case"]
        assert fresh["original"] == before["original"]
        assert structured_view(fresh["candidate"]) == structured_view(fresh["original"]), index
        assert structured_view(before["candidate"]) == structured_view(before["original"]), index
        original_logs = normalized_logs(fresh["original"].get("logs", []))
        candidate_logs = normalized_logs(fresh["candidate"].get("logs", []))
        baseline_logs = normalized_logs(before["candidate"].get("logs", []))
        assert candidate_logs == original_logs, index
        if "op" not in fresh["case"]:
            assert not any(MESSAGE.format(value) in original_logs for value in (0, 1))
            assert baseline_logs == original_logs
            continue
        bucket = bucket_for(fresh["case"])
        message = MESSAGE.format(bucket)
        has_message = message in original_logs
        assert not any(MESSAGE.format(other) in original_logs for other in (0, 1) if other != bucket)
        if has_message:
            observed.add(index)
            removed = list(original_logs)
            removed.remove(message)
            assert baseline_logs == removed, index
            baseline_missing.add(index)
        else:
            assert baseline_logs == original_logs, index
    assert observed == expected
    assert baseline_missing == expected
    return {"cases": candidate["case_count"], "affected": len(observed),
            "bucket_0": sum(bucket_for(candidate["cases"][i]["case"]) == 0 for i in observed),
            "bucket_1": sum(bucket_for(candidate["cases"][i]["case"]) == 1 for i in observed)}


def assert_digest(blob, expected):
    assert hashlib.sha256(blob).hexdigest() == expected


def verify_signed_transaction(encoded):
    from solders.transaction import Transaction
    raw = base64.b64decode(encoded, validate=True)
    Transaction.from_bytes(raw).verify()


def verify_manifest(folder, manifest):
    folder = Path(folder)
    actual = {str(path.relative_to(folder)) for path in folder.rglob("*")
              if path.is_file() and path.name != "MANIFEST.json"}
    assert actual == set(manifest), sorted(actual ^ set(manifest))
    assert all(not path.is_symlink() for path in folder.rglob("*"))
    for relative, expected in manifest.items():
        path = folder / relative
        assert path.is_file() and not path.is_symlink()
        assert sha256(path) == expected, relative
