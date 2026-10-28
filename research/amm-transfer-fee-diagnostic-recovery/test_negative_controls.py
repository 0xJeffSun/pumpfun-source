"""Sensitivity checks for source immediates, normalization and runtime logs."""
from pathlib import Path
import copy
import gzip
import importlib.util
import json
import struct

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


analysis = module("fee_negative_analysis", HERE / "analysis.py")
parent = module("fee_negative_parent", ROOT / "research/amm-mint-fee-reader-recovery/analysis.py")
fields = module("fee_negative_fields", analysis.FIELDS)
original_raw = (ROOT / "evidence/original/pump_amm/deployed.so").read_bytes()
candidate_raw = gzip.decompress((HERE / "artifacts/candidate-symbols.so.gz").read_bytes())
original = parent.image(original_raw)
candidate = parent.image(candidate_raw)

rejected = 0
for _, old_start, new_start, size, line in analysis.TARGETS:
    records = fields.source_fields(candidate, new_start, size)
    assert len(records) == 1 and records[0]["line"] == line
    mutated = bytearray(candidate_raw)
    struct.pack_into("<i", mutated, records[0]["line_store"] + 4, line + 1)
    changed = parent.image(bytes(mutated))
    assert parent.signature(original, old_start, size) != parent.signature(changed, new_start, size)
    assert fields.source_fields(changed, new_start, size)[0]["line"] == line + 1
    rejected += 1

# Relocated addresses are intentionally normalized, while raw bytes remain sensitive.
_, old_start, new_start, size, _ = analysis.TARGETS[0]
relocation = candidate.pattern(new_start, size)[0]["offset"] + new_start
mutated = bytearray(candidate_raw)
mutated[relocation + 4] ^= 1
relocated = parent.image(bytes(mutated))
assert parent.signature(original, old_start, size) == parent.signature(relocated, new_start, size)
assert candidate.b[new_start:new_start + size] != relocated.b[new_start:new_start + size]

runtime = module("fee_negative_runtime", HERE / "runtime_check.py")
report = json.loads(gzip.decompress((HERE / "runtime/report.json.gz").read_bytes()))
bad = copy.deepcopy(report)
logs = bad["cases"][41]["candidate"]["logs"]
at = next(index for index, value in enumerate(logs) if "AnchorError thrown in programs/pump-amm/src/utils/transfer_fee.rs:32" in value)
logs[at] = logs[at].replace("transfer_fee.rs:32", "transfer_fee.rs:31")
try:
    runtime.audit(bad)
except AssertionError:
    rejected += 1
else:
    raise AssertionError("mutated candidate diagnostic was accepted")

assert rejected == 5
print("PASS: four source-line mutations and one runtime-diagnostic mutation rejected; "
      "relocation normalization control behaved as specified")
