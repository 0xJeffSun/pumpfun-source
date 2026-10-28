"""Sensitivity checks for source immediates, normalization and runtime logs."""
from pathlib import Path
import copy
import gzip
import importlib.util
import json
import shutil
import struct
import tempfile
from unittest.mock import patch

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


verifier = module("fee_negative_verifier", HERE / "verify.py")
verifier.verify_packet_inputs()
integrity_rejected = 0
with tempfile.TemporaryDirectory(prefix="amm-fee-input-controls-") as temporary:
    copied = Path(temporary) / "packet"
    shutil.copytree(HERE, copied)
    extra = copied / "extra/MANIFEST.json"
    extra.parent.mkdir()
    extra.write_text("{}")
    with patch.object(verifier, "HERE", copied):
        try:
            verifier.verify_packet_inputs()
        except AssertionError as error:
            assert str(error) == "['extra/MANIFEST.json']"
            integrity_rejected += 1
        else:
            raise AssertionError("unlisted nested manifest was accepted")
    extra.unlink()
    extra.parent.rmdir()
    copied_manifest = copied / "MANIFEST.json"
    saved_manifest = Path(temporary) / "original-manifest.json"
    copied_manifest.rename(saved_manifest)
    copied_manifest.symlink_to(saved_manifest)
    real_read_text = Path.read_text
    def reject_manifest_read(path, *args, **kwargs):
        if path == copied_manifest:
            raise RuntimeError("symlink manifest read before filesystem validation")
        return real_read_text(path, *args, **kwargs)
    with patch.object(verifier, "HERE", copied), patch.object(Path, "read_text", reject_manifest_read):
        try:
            verifier.verify_packet_inputs()
        except AssertionError:
            integrity_rejected += 1
        else:
            raise AssertionError("symlink manifest was accepted")

real_read_bytes = Path.read_bytes
manifest = json.loads((HERE / "MANIFEST.json").read_text())
for name in manifest["repository_inputs"]:
    target = ROOT / name
    def changed_helper(path, target=target):
        data = real_read_bytes(path)
        return data + b"\n# altered analysis input\n" if path == target else data
    with patch.object(Path, "read_bytes", changed_helper):
        try:
            verifier.verify_packet_inputs()
        except AssertionError as error:
            assert str(error) == name
            integrity_rejected += 1
        else:
            raise AssertionError("altered repository helper was accepted: " + name)
assert integrity_rejected == 5

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
      "relocation normalization control behaved as specified; "
      "nested/symlink manifests and three altered repository helpers rejected")
