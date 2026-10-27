"""Negative controls for the exact Pump successor's current-file boundary."""
from pathlib import Path
import importlib.util
import hashlib
import json
import shutil
import sys
import tempfile
import unittest
from unittest.mock import patch

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
sys.path.insert(0, str(HERE))
import common
import pump_round9_current as successor


class CurrentPumpControls(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.historical = json.loads((ROOT / 'repro/layered-passes/pass-27/current-metadata/bindings.json').read_text())
        cls.transition = successor.transition()

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        files = set(self.historical['assets']) | set(self.transition['added_scripts'])
        files.update(self.transition['pump_source_after'])
        for role, compiled in self.historical['compiled'].items():
            if role != 'pump':
                files.update(compiled['source'])
        files.update(['repro/status.json', 'repro/layered-passes/pass-26/current-guards/rules.json'])
        for name in files:
            target = self.root / name
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(ROOT / name, target)

    def tearDown(self):
        self.tmp.cleanup()

    def verify(self):
        return successor.verify_surface(self.root, self.historical, common.source_names)

    def change(self, name):
        with (self.root / name).open('ab') as stream:
            stream.write(b'\n# unreviewed change\n')

    def reject(self):
        with self.assertRaises(AssertionError):
            self.verify()

    def test_exact_successor_passes(self):
        self.verify()

    def test_changed_pump_source_rejected(self):
        self.change('programs/pump/src/lib.rs')
        self.reject()

    def test_extra_pump_source_rejected(self):
        (self.root / 'programs/pump/src/unreviewed.rs').write_text('pub fn unknown() {}\n')
        self.reject()

    def test_changed_other_program_rejected(self):
        self.change('programs/pump-fees/src/lib.rs')
        self.reject()

    def test_extra_other_program_source_rejected(self):
        (self.root / 'programs/pump-fees/src/unreviewed.rs').write_text('pub fn unknown() {}\n')
        self.reject()

    def test_changed_old_script_rejected(self):
        self.change('scripts/analyze.py')
        self.reject()

    def test_changed_admitted_script_rejected(self):
        self.change('scripts/pump_create_mayhem_differential.py')
        self.reject()

    def test_unlisted_script_rejected(self):
        (self.root / 'scripts/unreviewed.py').write_text('print("unknown")\n')
        self.reject()

    def test_changed_other_selection_rejected(self):
        p = self.root / 'repro/status.json'
        status = json.loads(p.read_text())
        status['pump_fees']['candidate_sha256'] = '0' * 64
        p.write_text(json.dumps(status))
        self.reject()

    def test_changed_pump_selection_rejected(self):
        p = self.root / 'repro/status.json'
        status = json.loads(p.read_text())
        status['pump']['candidate_sha256'] = '0' * 64
        p.write_text(json.dumps(status))
        self.reject()

    def test_workflow_drift_rejected(self):
        self.change('.github/workflows/verify.yml')
        self.reject()

    def test_admitted_source_drift_rejected(self):
        self.change('programs/pump/src/incentives.rs')
        with self.assertRaises(AssertionError):
            successor.admitted_path(self.root, 'programs/pump/src/incentives.rs')

    def test_other_old_inactive_path_not_admitted(self):
        with self.assertRaises(AssertionError):
            successor.admitted_path(self.root, 'scripts/fixtures/signer_stub.so')

    def test_symlink_source_rejected(self):
        p = self.root / 'programs/pump/src/lib.rs'
        contents = p.read_bytes()
        p.unlink()
        target = self.root / 'replacement.rs'
        target.write_bytes(contents)
        p.symlink_to(target)
        self.reject()

    def test_resealed_transition_data_rejected(self):
        p = self.root / 'pump-round9-transition.json'
        p.write_text(json.dumps({**self.transition, 'published_commit': '0' * 40}))
        with patch.object(successor, 'HERE', self.root):
            with self.assertRaises(AssertionError):
                successor.transition()


class PackageMembershipControls(unittest.TestCase):
    def test_root_manifest_only_is_exempt(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            package = root / 'package'
            package.mkdir()
            content = package / 'body.txt'
            content.write_text('saved evidence\n')
            manifest = package / 'MANIFEST.json'
            manifest.write_text(json.dumps({'body.txt': hashlib.sha256(content.read_bytes()).hexdigest()}))
            digest = hashlib.sha256(manifest.read_bytes()).hexdigest()
            successor.verify_package(root, 'package', digest)
            nested = package / 'unlisted'
            nested.mkdir()
            (nested / 'MANIFEST.json').write_text('{}\n')
            with self.assertRaises(AssertionError):
                successor.verify_package(root, 'package', digest)


if __name__ == '__main__':
    unittest.main()
