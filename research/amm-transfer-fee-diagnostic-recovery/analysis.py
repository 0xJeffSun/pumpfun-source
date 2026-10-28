"""Recompute the PumpSwap transfer-fee diagnostic recovery."""
from pathlib import Path
import gzip
import hashlib
import importlib.util
import json

if not __debug__:
    raise SystemExit("Run without -O")

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
PARENT = ROOT / "research/amm-mint-fee-reader-recovery/analysis.py"
FIELDS = (ROOT / "repro/pump_amm/v2-mint-clone-recovery-20261028/results/"
          "new-proofs/lineage/independent-current/source_fields.py")
BASELINE = ROOT / "research/amm-multi-hop-group-slice-recovery/artifacts/candidate-symbols.so.gz"
SOURCE = "programs/pump-amm/src/utils/transfer_fee.rs"
TARGETS = (
    ("from_mint", 0x74128, 0x29D78, 1312, 32),
    ("calculate_fee", 0x74648, 0x2A298, 696, 49),
    ("amount_after_fee", 0x74900, 0x2A550, 640, 57),
    ("amount_before_fee", 0x74B80, 0x2A7D0, 688, 67),
)


def digest(data):
    return hashlib.sha256(data).hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def subtract(left, right):
    return sum((left - right).values())


def recompute(candidate_raw=None, candidate_stripped=None):
    parent = module("fee_diagnostic_parent", PARENT)
    fields = module("fee_diagnostic_fields", FIELDS)
    original_raw = (ROOT / "evidence/original/pump_amm/deployed.so").read_bytes()
    baseline_raw = gzip.decompress(BASELINE.read_bytes())
    if candidate_raw is None:
        candidate_raw = gzip.decompress((HERE / "artifacts/candidate-symbols.so.gz").read_bytes())
    if candidate_stripped is None:
        candidate_stripped = gzip.decompress((HERE / "artifacts/candidate.so.gz").read_bytes())

    assert digest(original_raw) == "6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7"
    assert digest(baseline_raw) == "d35beab66073f1739d7d371a67160675d5b0a2f047605325b9cda189167ad947"
    assert digest(candidate_raw) == "c8f754063a2aa1d0b8d6f228c46401ba85571546f0234dc81c9eb8927eb12376"
    assert digest(candidate_stripped) == "d17a657baf5cc19736a924c41e75424604411ddbe9f6e72cddf41ab72a695007"

    original = parent.image(original_raw)
    baseline = parent.image(baseline_raw)
    candidate = parent.image(candidate_raw)
    stripped = parent.image(candidate_stripped)
    original_windows = parent.windows(original)
    baseline_functions = parent.functions(baseline)
    candidate_functions = parent.functions(candidate)
    normalized_original = parent.capacity(original, original_windows)
    raw_original = parent.capacity(original, original_windows, raw=True)
    baseline_normalized = normalized_original & parent.capacity(baseline, baseline_functions)
    candidate_normalized = normalized_original & parent.capacity(candidate, candidate_functions)
    baseline_raw_matches = raw_original & parent.capacity(baseline, baseline_functions, raw=True)
    candidate_raw_matches = raw_original & parent.capacity(candidate, candidate_functions, raw=True)
    gains = candidate_normalized - baseline_normalized
    losses = baseline_normalized - candidate_normalized
    raw_gains = candidate_raw_matches - baseline_raw_matches
    raw_losses = baseline_raw_matches - candidate_raw_matches

    assert len(original_windows) == 785
    assert (sum(baseline_normalized.values()), sum(baseline_raw_matches.values())) == (661, 159)
    assert (sum(candidate_normalized.values()), sum(candidate_raw_matches.values())) == (665, 159)
    assert sum(gains.values()) == 4 and not losses and not raw_gains and not raw_losses

    original_sizes = parent.function_sizes(original_windows)
    candidate_sizes = parent.function_sizes(candidate_functions)
    results = []
    for name, old_start, new_start, size, line in TARGETS:
        signature = parent.signature(original, old_start, size)
        assert gains[signature] == 1
        assert parent.signature(candidate, new_start, size) == signature
        assert parent.signature(stripped, new_start, size) == signature
        assert original.b[old_start:old_start + size] != candidate.b[new_start:new_start + size]
        original_fields = fields.source_fields(original, old_start, size)
        candidate_fields = fields.source_fields(candidate, new_start, size)
        assert len(original_fields) == len(candidate_fields) == 1
        for record, start in ((original_fields[0], old_start), (candidate_fields[0], new_start)):
            assert record["filename"] == SOURCE and record["line"] == line
            assert record["line_store"] - start == {1312: 1032, 696: 592, 640: 536, 688: 584}[size]

        original_calls = {row["offset"]: row["target"] for row in original.callsites(old_start, size)}
        candidate_calls = {row["offset"]: row["target"] for row in candidate.callsites(new_start, size)}
        assert original_calls.keys() == candidate_calls.keys()
        calls = []
        for offset in sorted(original_calls):
            old_target, new_target = original_calls[offset], candidate_calls[offset]
            old_size, new_size = original_sizes[old_target], candidate_sizes[new_target]
            equal = parent.signature(original, old_target, old_size) == parent.signature(candidate, new_target, new_size)
            calls.append({
                "offset": offset,
                "original_target": old_target,
                "candidate_target": new_target,
                "original_bytes": old_size,
                "candidate_bytes": new_size,
                "normalized_equal": equal,
                "raw_equal": original.b[old_target:old_target + old_size] == candidate.b[new_target:new_target + new_size],
            })
        unmatched_calls = [call for call in calls if not call["normalized_equal"]]
        if name == "from_mint":
            assert unmatched_calls == [{
                "offset": 200,
                "original_target": 0xF31D8,
                "candidate_target": 0xF7C90,
                "original_bytes": 664,
                "candidate_bytes": 656,
                "normalized_equal": False,
                "raw_equal": False,
            }]
        else:
            assert not unmatched_calls
        assert original.pattern(old_start, size) == candidate.pattern(new_start, size)
        results.append({
            "name": name,
            "original_offset": old_start,
            "candidate_offset": new_start,
            "bytes": size,
            "raw_equal": False,
            "normalized_equal": True,
            "source": {"filename": SOURCE, "line": line, "column": None,
                       "column_note": "Anchor Source records do not encode a column."},
            "relocations": original.pattern(old_start, size),
            "direct_calls": calls,
        })

    return {
        "schema": 1,
        "artifacts": {
            "original_sha256": digest(original_raw),
            "baseline_unstripped_sha256": digest(baseline_raw),
            "candidate_unstripped_sha256": digest(candidate.b),
            "candidate_stripped_sha256": digest(candidate_stripped),
        },
        "inventory": {
            "original_windows": 785,
            "baseline_normalized": sum(baseline_normalized.values()),
            "candidate_normalized": sum(candidate_normalized.values()),
            "baseline_raw": sum(baseline_raw_matches.values()),
            "candidate_raw": sum(candidate_raw_matches.values()),
            "new_normalized_windows": subtract(candidate_normalized, baseline_normalized),
            "lost_normalized_windows": subtract(baseline_normalized, candidate_normalized),
            "new_raw_windows": subtract(candidate_raw_matches, baseline_raw_matches),
            "lost_raw_windows": subtract(baseline_raw_matches, candidate_raw_matches),
        },
        "targets": results,
    }


if __name__ == "__main__":
    print(json.dumps(recompute(), indent=2, sort_keys=True))
