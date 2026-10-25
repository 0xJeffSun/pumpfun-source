"""Verify the copied PR #5 remap receipt without a public source checkout."""

import gzip
import hashlib
import json
from pathlib import Path


HERE = Path(__file__).resolve().parent
PARENT = HERE.parent


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


manifest = json.loads((HERE / "manifest-sha256.json").read_text())
actual = {path.name: sha(path.read_bytes()) for path in HERE.iterdir()
          if path.is_file() and path.name not in ("manifest-sha256.json", "snapshot_verify.py", "README.md")}
assert actual == manifest
analysis = json.loads((HERE / "analysis.json").read_text())
build = json.loads((HERE / "build-comparison.json").read_text())
attempt = json.loads((HERE / "build-attempt.json").read_text())
base_build = json.loads((PARENT / "pr5-517-integration/build-a-build-comparison.json").read_text())
candidate = (HERE / "candidate.so").read_bytes()
wrapper = (HERE / "pump_rustc_source_path_wrapper.sh").read_bytes()
invocation = json.loads((HERE / "invocation.json").read_text())
assert sha(candidate) == build["comparison"]["candidate_sha256"] == analysis["binary"]["remapped"]["sha256"]
assert len(candidate) == build["comparison"]["candidate_bytes"] == 1_679_928
assert build["source_sha256"] == base_build["source_sha256"] == attempt["source_sha256"]
assert build["sdk_source_sha256"] == base_build["sdk_source_sha256"]
assert build["rustc_sha256"] == base_build["rustc_sha256"]
assert build["selected_toolchain"] == "v1.44"
assert attempt["returncode"] == 0 and attempt["source_unchanged"]
assert sha(gzip.decompress((HERE / "build.log.gz").read_bytes())) == build["build_log_sha256"]
assert sha(wrapper) == analysis["wrapper_sha256"] == invocation["wrapper_sha256"]
assert analysis["binary"]["base"]["sha256"] == base_build["comparison"]["candidate_sha256"]
assert analysis["binary"]["target"]["sha256"] == build["comparison"]["original_sha256"]
assert analysis["locations"]["counts"] == {
    "target_pump": 54, "base_source_shaped": 127,
    "base_pump_attributed": 91, "remapped_pump": 91,
    "unremapped_generic_src_lib": 36,
}
assert analysis["locations"]["path_line_column_overlap"]["remapped"] == 1
assert analysis["locations"]["remapped_common_path_records_matching_length_no_nul"]
assert analysis["section_deltas"]["remapped_minus_base"][".rodata"] == 400
assert analysis["section_deltas"]["remapped_minus_base"][".text"] == 0
assert analysis["section_deltas"]["relocations_remapped_minus_target"] == -859
assert analysis["section_deltas"]["elf_extent_remapped_minus_target"] == -254_872
assert analysis["whole_programdata_equal"] is False
print(json.dumps({"candidate_sha256": sha(candidate),
                  "source_inputs": len(build["source_sha256"]),
                  "remapped_pump_locations": 91,
                  "target_location_overlap": 1,
                  "elf_extent_gap": -254_872}))
