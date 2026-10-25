"""Focused synthetic file-inventory tests; never invoke build/main/download/run."""
import builtins
from contextlib import contextmanager
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest import mock

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("reviewed_helper", HERE / "core_linux_v144_build.py")
helper = importlib.util.module_from_spec(spec)
spec.loader.exec_module(helper)


@contextmanager
def forbid_reading(excluded):
    """Trap Path.open, builtin open and io.open, including indirect copy reads."""
    calls = []
    original_path_open = Path.open
    original_builtin_open = builtins.open
    original_io_open = io.open

    def check(path, mode):
        if isinstance(path, int):
            return
        path = Path(path)
        if "r" in mode or "+" in mode:
            calls.append(str(path))
            if excluded(path):
                raise AssertionError("Excluded file opened for reading: " + str(path))

    def path_open(path, mode="r", *args, **kwargs):
        check(path, mode)
        return original_path_open(path, mode, *args, **kwargs)

    def builtin_open(path, mode="r", *args, **kwargs):
        check(path, mode)
        return original_builtin_open(path, mode, *args, **kwargs)

    def io_open(path, mode="r", *args, **kwargs):
        check(path, mode)
        return original_io_open(path, mode, *args, **kwargs)

    with mock.patch.object(Path, "open", path_open), mock.patch.object(builtins, "open", builtin_open), mock.patch.object(io, "open", io_open):
        yield calls


class KeypairRetentionTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="file-inventory-", dir=HERE)
        self.root = Path(self.temp.name)
        self.addCleanup(self.temp.cleanup)

    def write(self, name, content=b"synthetic excluded test content"):
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(content)
        return path

    def attempt(self):
        output = self.root / "attempt"
        output.mkdir()
        attempt = helper.Attempt(output)
        attempt.state.update(build_attempts=1, status="failed", error="synthetic prior failure")
        attempt.save()
        return attempt

    def test_parameterized_exclusion_precedes_any_file_open(self):
        blocked = self.write("custom/omit.json")
        safe = self.write("custom/include.bin", b"ordinary test data")
        omitted = []
        with forbid_reading(lambda p: p == blocked):
            rows = helper.tree_hashes(blocked.parent, exclude=lambda p: str(p) == "omit.json", excluded_paths=omitted)
        self.assertEqual(omitted, ["omit.json"])
        self.assertEqual(set(rows), {"include.bin"})
        self.assertEqual(rows["include.bin"]["sha256"], hashlib.sha256(b"ordinary test data").hexdigest())

    def test_nested_excluded_directories_and_symlinks_are_not_opened(self):
        self.write("tree/blocked-keypair.json/child.bin")
        self.write("tree/nested/generated-keypair.json")
        self.write("tree/keep.bin", b"safe")
        (self.root / "tree/alias-keypair.json").symlink_to(self.root / "tree/blocked-keypair.json", target_is_directory=True)
        omitted = []
        with forbid_reading(helper.generated_keypair_path):
            rows = helper.tree_hashes(self.root / "tree", exclude=helper.generated_keypair_path, excluded_paths=omitted)
        self.assertEqual(set(rows), {"keep.bin"})
        self.assertEqual(set(omitted), {"blocked-keypair.json", "nested/generated-keypair.json", "alias-keypair.json"})

    def test_failure_retention_omits_target_and_artifact_keys(self):
        attempt = self.attempt()
        self.write("attempt/target/deploy/candidate-keypair.json")
        self.write("attempt/target/build/object.bin", b"object")
        self.write("attempt/artifacts/pump_fees_candidate-keypair.json")
        self.write("attempt/artifacts/pump_fees_candidate.so", b"synthetic candidate bytes")
        with forbid_reading(helper.generated_keypair_path):
            helper.retain_generated_outputs(attempt)
            helper.seal_evidence(attempt)
        self.assertEqual(attempt.state["status"], "failed")
        self.assertEqual(attempt.state["excluded_generated_keypair_paths"], ["artifacts/pump_fees_candidate-keypair.json", "target/deploy/candidate-keypair.json"])
        self.assertEqual((attempt.evidence / "pump_fees_candidate.so").read_bytes(), b"synthetic candidate bytes")
        self.assertEqual(set(json.loads((attempt.evidence / "artifact-files.json").read_text())), {"pump_fees_candidate.so"})
        self.assertEqual(set(json.loads((attempt.evidence / "target-files.json").read_text())), {"build/object.bin"})
        for name in ["artifact-files.json", "target-files.json", "artifact-hashes.json", "attempt.json"]:
            self.assertNotIn("synthetic excluded test content", (attempt.evidence / name).read_text())

    def test_final_evidence_manifest_never_reads_an_unexpected_key_file(self):
        attempt = self.attempt()
        self.write("attempt/evidence/nested/unexpected-keypair.json")
        self.write("attempt/evidence/ordinary.bin", b"safe")
        with forbid_reading(helper.generated_keypair_path):
            helper.seal_evidence(attempt)
            helper.seal_evidence(attempt)
        rows = json.loads((attempt.evidence / "artifact-hashes.json").read_text())
        self.assertNotIn("artifact-hashes.json", rows)
        self.assertNotIn("nested/unexpected-keypair.json", rows)
        self.assertEqual(attempt.state["excluded_generated_keypair_paths"], ["evidence/nested/unexpected-keypair.json"])
        for name, row in rows.items():
            self.assertEqual(helper.digest(attempt.evidence / name), row["sha256"])

    def test_unexpected_source_key_is_rejected_before_any_file_open(self):
        self.write("source/expected.rs", b"source")
        self.write("source/extra-keypair.json")
        with forbid_reading(lambda p: True) as reads:
            with self.assertRaisesRegex(ValueError, "Source file paths differ"):
                helper.source_hashes(self.root / "source", {"expected.rs": hashlib.sha256(b"source").hexdigest()})
        self.assertEqual(reads, [])

    def test_candidate_symlink_cannot_copy_keypair_contents(self):
        attempt = self.attempt()
        key = self.write("attempt/artifacts/pump_fees_candidate-keypair.json")
        (attempt.output / "artifacts/pump_fees_candidate.so").symlink_to(key)
        with forbid_reading(helper.generated_keypair_path):
            with self.assertRaisesRegex(ValueError, "not a symlink"):
                helper.retain_generated_outputs(attempt)
        self.assertFalse((attempt.evidence / "pump_fees_candidate.so").exists())

    def test_excluded_metadata_contains_only_paths(self):
        self.write("names/one-keypair.json")
        self.write("names/nested/two-keypair.json")
        with forbid_reading(lambda p: True) as reads:
            rows = helper.excluded_keypair_paths(self.root / "names")
        self.assertEqual(rows, ["nested/two-keypair.json", "one-keypair.json"])
        self.assertEqual(reads, [])
        self.assertTrue(all(isinstance(row, str) for row in rows))


if __name__ == "__main__":
    unittest.main(verbosity=2)
