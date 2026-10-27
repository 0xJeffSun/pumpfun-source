"""Check restoration path and index-to-blob consistency before any file writes."""
from pathlib import Path
import copy
import gzip
import hashlib
import importlib.util
import json
import unittest
import subprocess
import sys

P = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('checkpoint_restore', P / 'restore.py')
restore = importlib.util.module_from_spec(spec)
spec.loader.exec_module(restore)


class RestoreTests(unittest.TestCase):
    def test_package_hashes(self):
        files = {str(f.relative_to(P)): hashlib.sha256(f.read_bytes()).hexdigest()
                 for f in P.rglob('*') if f.is_file() and f != P / 'package-sha256.json'}
        self.assertEqual(files, json.loads((P / 'package-sha256.json').read_bytes()))

    def test_real_index(self):
        index = json.loads(gzip.decompress((P / 'index.json.gz').read_bytes()))
        manifest = json.loads((P / 'archive-manifest.json').read_bytes())
        restore.check_index(index, manifest)

    def test_relative_paths(self):
        self.assertEqual(str(restore.safe('fees-next-trial/source/Cargo.toml')),
                         'fees-next-trial/source/Cargo.toml')

    def test_unsafe_paths(self):
        for path in ('', '.', '/absolute', '../escape', 'a/../escape',
                     'C:/absolute', 'C:relative', 'a\\escape', 'a//b', 'a/./b'):
            with self.subTest(path=path), self.assertRaises(AssertionError):
                restore.safe(path)

    def test_missing_blob(self):
        index = json.loads(gzip.decompress((P / 'index.json.gz').read_bytes()))
        manifest = json.loads((P / 'archive-manifest.json').read_bytes())
        changed = copy.deepcopy(index)
        next(iter(changed['files'].values()))['blob'] = '0' * 64
        with self.assertRaises(AssertionError):
            restore.check_index(changed, manifest)

    def test_incorrect_blob_size(self):
        index = json.loads(gzip.decompress((P / 'index.json.gz').read_bytes()))
        manifest = json.loads((P / 'archive-manifest.json').read_bytes())
        changed = copy.deepcopy(index)
        next(iter(changed['files'].values()))['bytes'] += 1
        with self.assertRaises(AssertionError):
            restore.check_index(changed, manifest)


    def test_optimized_verification_rejected(self):
        result = subprocess.run([sys.executable, '-O', '-B', str(P / 'restore_combined.py')], capture_output=True, text=True)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('without Python -O', result.stderr)

    def test_base_binding(self):
        anchor = json.loads((P / 'base.json').read_bytes())
        base = P.parent / 'fees-residual-source-checkpoint-20261027'
        self.assertEqual(hashlib.sha256((base / 'restore_combined.py').read_bytes()).hexdigest(), anchor['restore_combined_sha256'])
        self.assertEqual(hashlib.sha256((base / 'archive-manifest.json').read_bytes()).hexdigest(), anchor['archive_manifest_sha256'])

    def test_current_inventory_overlay(self):
        index = json.loads(gzip.decompress((P / 'index.json.gz').read_bytes()))
        base = json.loads(gzip.decompress((P.parent / 'fees-residual-source-checkpoint-20261027/index.json.gz').read_bytes()))
        combined = dict(base['current_files'])
        combined.update(index['files'])
        for name in index['removed_since_base']:
            del combined[name]
        self.assertEqual(combined, index['current_files'])


if __name__ == '__main__':
    unittest.main()
