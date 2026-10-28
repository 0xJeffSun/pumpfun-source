"""Recompute the complete PumpSwap inventory and the recovered error closure."""
from collections import Counter
from pathlib import Path
import gzip
import hashlib
import importlib.util
import json
import struct

if not __debug__:
    raise SystemExit("Run without -O")

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
PARENT = ROOT / "research/amm-mint-fee-reader-recovery"
BASELINE = (ROOT / "repro/pump_amm/v2-mint-clone-recovery-20261028/results/new-proofs/"
            "lineage/independent-current/build/artifacts/unstripped.so")
ORIGINAL_START = 0x40100
CANDIDATE_START = 0x3B4F0
SIZE = 520
SOURCE = b"programs/pump-amm/src/instructions/swap/multi_hop_swap.rs"


def digest(data):
    return hashlib.sha256(data).hexdigest()


def load_module(path):
    spec = importlib.util.spec_from_file_location("amm_group_slice_parent", path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def subtract(left, right):
    return sum((left - right).values())


def recompute():
    parent = load_module(PARENT / "analysis.py")
    original_raw = (ROOT / "evidence/original/pump_amm/deployed.so").read_bytes()
    baseline_raw = BASELINE.read_bytes()
    candidate_raw = gzip.decompress((HERE / "artifacts/candidate-symbols.so.gz").read_bytes())
    candidate_stripped = gzip.decompress((HERE / "artifacts/candidate.so.gz").read_bytes())

    assert digest(original_raw) == "6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7"
    assert digest(baseline_raw) == "5a88488575f04a7a6078fd2188a94be7f4664e228a7c482b26aec1f2d6fe784c"
    assert digest(candidate_raw) == "d35beab66073f1739d7d371a67160675d5b0a2f047605325b9cda189167ad947"
    assert digest(candidate_stripped) == "7a300434dced61413bde10788594b427d5649563e0223efcf09e6b214aff7ad3"

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
    assert len(original_windows) == 785
    assert (sum(baseline_normalized.values()), sum(baseline_raw_matches.values())) == (660, 159)
    assert (sum(candidate_normalized.values()), sum(candidate_raw_matches.values())) == (661, 159)

    gains = candidate_normalized - baseline_normalized
    losses = baseline_normalized - candidate_normalized
    raw_gains = candidate_raw_matches - baseline_raw_matches
    raw_losses = baseline_raw_matches - candidate_raw_matches
    target_signature = parent.signature(original, ORIGINAL_START, SIZE)
    target_key_count = gains[target_signature]
    assert target_key_count == 1 and sum(gains.values()) == 1 and not losses
    assert not raw_gains and not raw_losses
    matching = [(start, size) for start, size in candidate_functions
                if size == SIZE and parent.signature(candidate, start, size) == target_signature]
    assert matching == [(CANDIDATE_START, SIZE)]
    assert parent.signature(stripped, CANDIDATE_START, SIZE) == target_signature
    assert original.b[ORIGINAL_START:ORIGINAL_START + SIZE] != candidate.b[CANDIDATE_START:CANDIDATE_START + SIZE]

    original_sizes = parent.function_sizes(original_windows)
    candidate_sizes = parent.function_sizes(candidate_functions)
    original_calls = {row["offset"]: row["target"]
                      for row in original.callsites(ORIGINAL_START, SIZE)}
    candidate_calls = {row["offset"]: row["target"]
                       for row in candidate.callsites(CANDIDATE_START, SIZE)}
    assert original_calls.keys() == candidate_calls.keys() == {40, 184, 272, 472}
    calls = []
    for offset in sorted(original_calls):
        old, new = original_calls[offset], candidate_calls[offset]
        old_size, new_size = original_sizes[old], candidate_sizes[new]
        equal = parent.signature(original, old, old_size) == parent.signature(candidate, new, new_size)
        assert equal
        calls.append({"offset": offset, "original_target": old, "candidate_target": new,
                      "original_bytes": old_size, "candidate_bytes": new_size,
                      "normalized_equal": True,
                      "raw_equal": original.b[old:old + old_size] == candidate.b[new:new + new_size]})

    expected_relocations = [
        {"offset": offset, "type": 8, "symbol": ""}
        for offset in (24, 72, 168, 216, 240, 256, 376)
    ]
    assert original.pattern(ORIGINAL_START, SIZE) == expected_relocations
    assert candidate.pattern(CANDIDATE_START, SIZE) == expected_relocations
    assert stripped.pattern(CANDIDATE_START, SIZE) == expected_relocations

    # Validate the concrete records reached by every relocation, not only the
    # relocation offsets masked by normalized comparison.
    for offset in (24, 168):
        old = parent.instruction_pointer(original, ORIGINAL_START + offset)
        new = parent.instruction_pointer(candidate, CANDIDATE_START + offset)
        assert original.b[old:old + 4] == candidate.b[new:new + 4] == struct.pack("<I", 44)
    old = parent.instruction_pointer(original, ORIGINAL_START + 216)
    new = parent.instruction_pointer(candidate, CANDIDATE_START + 216)
    message = b"a Display implementation returned an error unexpectedly"
    assert original.b[old:old + len(message)] == candidate.b[new:new + len(message)] == message

    vtables = []
    for offset, metadata, slots in ((72, (24, 8), (0, 24, 32, 40)),
                                    (240, (0, 1), (0, 24))):
        old = parent.instruction_pointer(original, ORIGINAL_START + offset)
        new = parent.instruction_pointer(candidate, CANDIDATE_START + offset)
        assert struct.unpack("<QQ", original.b[old + 8:old + 24]) == metadata
        assert struct.unpack("<QQ", candidate.b[new + 8:new + 24]) == metadata
        targets = []
        for slot in slots:
            old_target = parent.data_pointer(original, old + slot)
            new_target = parent.data_pointer(candidate, new + slot)
            old_size, new_size = original_sizes[old_target], candidate_sizes[new_target]
            assert parent.signature(original, old_target, old_size) == parent.signature(candidate, new_target, new_size)
            targets.append({"slot": slot, "original_target": old_target,
                            "candidate_target": new_target, "bytes": old_size})
        vtables.append({"offset": offset, "value_size": metadata[0],
                        "value_align": metadata[1], "targets": targets})

    locations = []
    for label, elf, start in (("original", original, ORIGINAL_START),
                              ("candidate", candidate, CANDIDATE_START)):
        location = parent.instruction_pointer(elf, start + 256)
        filename = parent.data_pointer(elf, location)
        length, line, column = struct.unpack("<QII", elf.b[location + 8:location + 24])
        value = elf.b[filename:filename + length]
        assert value == b"/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs"
        assert (line, column) == (2559, 14)
        locations.append({"artifact": label, "filename": value.decode(), "line": line, "column": column})
    old = parent.instruction_pointer(original, ORIGINAL_START + 376)
    new = parent.instruction_pointer(candidate, CANDIDATE_START + 376)
    assert original.b[old:old + len(SOURCE)] == candidate.b[new:new + len(SOURCE)] == SOURCE

    return {
        "schema": 1,
        "scope": "Fallback recovery after the 664-byte Token-2022 decoder remained unmatched.",
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
        "target": {
            "original_offset": ORIGINAL_START,
            "candidate_offset": CANDIDATE_START,
            "bytes": SIZE,
            "original_raw_sha256": digest(original.b[ORIGINAL_START:ORIGINAL_START + SIZE]),
            "candidate_raw_sha256": digest(candidate.b[CANDIDATE_START:CANDIDATE_START + SIZE]),
            "normalized_sha256": digest(original.normalized[ORIGINAL_START:ORIGINAL_START + SIZE]),
            "raw_equal": False,
            "normalized_equal": True,
            "direct_calls": calls,
            "relocations": expected_relocations,
            "vtables": vtables,
            "locations": locations,
            "source_path": SOURCE.decode(),
            "source_line": 307,
            "source_column": 2,
            "error_number": 6044,
        },
    }


if __name__ == "__main__":
    print(json.dumps(recompute(), indent=2, sort_keys=True))
