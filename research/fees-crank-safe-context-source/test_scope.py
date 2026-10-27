#!/usr/bin/env python3
"""Source-only regression tests; no compiler, target, network or replay inputs."""
from pathlib import Path
import json
import shutil
import tempfile
import unittest
import subprocess
import sys
from source_tools import apply_file, inventory, materialize, parse_patch, read_under, relative, verify

PACKAGE = Path(__file__).resolve().parent

class ScopeTests(unittest.TestCase):
    def copy(self, directory):
        out = Path(directory) / 'packet'
        shutil.copytree(PACKAGE, out)
        return out

    def test_default_claims_are_source_only(self):
        m, hunks = verify(PACKAGE)
        self.assertEqual(len(hunks), 3)
        self.assertEqual((len(m['before']), len(m['after'])), (47, 48))
        for key in ['runtime_verified', 'native_build_verified', 'whole_binary_identity_verified']:
            self.assertIs(m[key], False)
        self.assertIs(m['public_parent_materialization_provided'], False)

    def test_new_file_patch_round_trip(self):
        patch = '--- a/src/x.rs\n+++ b/src/x.rs\n@@ -0,0 +1,2 @@\n+one\n+two\n'
        hunks = parse_patch(patch)['src/x.rs']
        self.assertEqual(apply_file(b'', hunks), b'one\ntwo\n')
        self.assertEqual(apply_file(b'one\ntwo\n', hunks, reverse=True), b'')

    def test_hunk_context_is_exact(self):
        hunks = parse_patch('--- a/a.rs\n+++ b/a.rs\n@@ -1 +1 @@\n-old\n+new\n')['a.rs']
        with self.assertRaises(ValueError):
            apply_file(b'other\n', hunks)

    def test_truncated_hunk_rejected(self):
        with self.assertRaises(ValueError):
            parse_patch('--- a/a.rs\n+++ b/a.rs\n@@ -1 +1 @@\n-old\n')

    def test_traversal_paths_rejected(self):
        for name in ['../x', '/tmp/x', 'a/../x', 'a//x', 'a\\x', '']:
            with self.subTest(name=name), self.assertRaises(ValueError):
                relative(name)

    def test_changed_override_rejected(self):
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            out = self.copy(directory)
            p = out / 'source/crank_donation_fee_pda.rs'
            p.write_bytes(p.read_bytes() + b'// drift\n')
            with self.assertRaises(ValueError):
                verify(out)

    def test_changed_patch_rejected(self):
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            out = self.copy(directory)
            p = out / 'source.patch'
            p.write_bytes(p.read_bytes() + b'not a source patch\n')
            with self.assertRaises(ValueError):
                verify(out)

    def test_runtime_claim_rejected(self):
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            out = self.copy(directory)
            p = out / 'manifest.json'
            m = json.loads(p.read_text())
            m['runtime_verified'] = True
            p.write_text(json.dumps(m))
            with self.assertRaises(ValueError):
                verify(out)

    def test_undeclared_file_rejected(self):
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            out = self.copy(directory)
            (out / 'unexpected.txt').write_text('This is not a declared source input.')
            with self.assertRaises(ValueError):
                verify(out)

    def test_symlink_override_rejected(self):
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            out = self.copy(directory)
            p = out / 'source/crank_donation_fee_pda.rs'
            external = Path(directory) / 'source-copy.rs'
            external.write_bytes(p.read_bytes())
            p.unlink()
            p.symlink_to(external)
            with self.assertRaises(ValueError):
                verify(out)

    def test_wrong_parent_creates_no_output(self):
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            parent, output = Path(directory) / 'parent', Path(directory) / 'output'
            parent.mkdir()
            with self.assertRaises(ValueError):
                materialize(PACKAGE, parent, output)
            self.assertFalse(output.exists())

    def test_symlink_output_ancestor_rejected(self):
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            root = Path(directory)
            parent, outside = root / 'parent', root / 'outside'
            parent.mkdir()
            outside.mkdir()
            alias = root / 'alias'
            alias.symlink_to(outside, target_is_directory=True)
            with self.assertRaisesRegex(ValueError, 'Symlink output ancestor'):
                materialize(PACKAGE, parent, alias / 'new')
            self.assertFalse((outside / 'new').exists())

    def test_existing_output_is_never_overwritten(self):
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            output = Path(directory) / 'output'
            output.mkdir()
            sentinel = output / 'keep.txt'
            sentinel.write_text('keep')
            with self.assertRaises(ValueError):
                materialize(PACKAGE, Path(directory), output)
            self.assertEqual(sentinel.read_text(), 'keep')

    def test_broken_extra_symlink_rejected(self):
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            out = self.copy(directory)
            (out / 'broken-extra').symlink_to(Path(directory) / 'absent')
            with self.assertRaisesRegex(ValueError, 'Symlink packet'):
                verify(out)

    def test_symlink_source_root_rejected(self):
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            root = Path(directory)
            real = root / 'real'
            real.mkdir()
            alias = root / 'alias'
            alias.symlink_to(real, target_is_directory=True)
            with self.assertRaisesRegex(ValueError, 'Symlink source root'):
                inventory(alias)

    def test_symlink_packet_root_rejected(self):
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            alias = Path(directory) / 'packet'
            alias.symlink_to(PACKAGE, target_is_directory=True)
            with self.assertRaisesRegex(ValueError, 'Symlink packet'):
                verify(alias)

    def test_symlink_source_ancestor_rejected(self):
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            root=Path(directory);real=root/'real';(real/'source').mkdir(parents=True)
            alias=root/'alias';alias.symlink_to(real,target_is_directory=True)
            with self.assertRaisesRegex(ValueError,'Symlink source root'):
                inventory(alias/'source')

    def test_resealed_runtime_claim_rejected(self):
        import hashlib
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            out=self.copy(directory);p=out/'source-inputs.json';m=json.loads(p.read_text());m['runtime_verified']=True;p.write_text(json.dumps(m))
            seal=json.loads((out/'manifest.json').read_text());seal['source-inputs.json']=hashlib.sha256(p.read_bytes()).hexdigest();(out/'manifest.json').write_text(json.dumps(seal))
            with self.assertRaisesRegex(ValueError,'cannot attest'):
                verify(out)

    def test_resealed_false_public_parent_rejected(self):
        import hashlib
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            out=self.copy(directory);p=out/'source-inputs.json';m=json.loads(p.read_text());m['public_parent_materialization_provided']=True;p.write_text(json.dumps(m))
            seal=json.loads((out/'manifest.json').read_text());seal['source-inputs.json']=hashlib.sha256(p.read_bytes()).hexdigest();(out/'manifest.json').write_text(json.dumps(seal))
            with self.assertRaisesRegex(ValueError,'external exact'):
                verify(out)

    def test_resealed_parent_map_drift_rejected(self):
        import hashlib
        with tempfile.TemporaryDirectory(dir=Path(tempfile.gettempdir()).resolve()) as directory:
            out=self.copy(directory);p=out/'source-inputs.json';m=json.loads(p.read_text());m['before']['Cargo.lock']='0'*64;p.write_text(json.dumps(m))
            seal=json.loads((out/'manifest.json').read_text());seal['source-inputs.json']=hashlib.sha256(p.read_bytes()).hexdigest();(out/'manifest.json').write_text(json.dumps(seal))
            with self.assertRaisesRegex(ValueError,'Pinned complete source map'):
                verify(out)

    def test_optimized_python_fails_before_parsers(self):
        result = subprocess.run([sys.executable, '-I', '-O', '-B', str(PACKAGE / 'compare.py'), '--help'], capture_output=True, text=True, timeout=10)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Optimized Python disables integrity assertions', result.stderr)

if __name__ == '__main__':
    unittest.main()
