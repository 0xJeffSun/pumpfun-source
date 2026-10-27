"""Check restoration path and index-to-blob consistency before any file writes."""
from pathlib import Path
import copy
import gzip
import hashlib
import importlib.util
import json
import os
import tempfile
import unittest

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

    def test_unlisted_nested_manifest_and_cache(self):
        for name in ['nested/manifest.json','__pycache__/unlisted.pyc']:
            with self.subTest(name=name), tempfile.TemporaryDirectory() as td:
                root = Path(td)
                (root/'package-sha256.json').write_text('{}')
                path = root/name
                path.parent.mkdir()
                path.write_bytes(b'{}')
                with self.assertRaisesRegex(AssertionError,'packet manifest'):
                    restore.verify_package(root)

    def test_symlink_packet_entry(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            (root/'package-sha256.json').write_text('{}')
            try:
                (root/'alias').symlink_to(root/'package-sha256.json')
            except OSError as exc:
                self.skipTest(str(exc))
            with self.assertRaisesRegex(AssertionError,'packet symlink'):
                restore.verify_package(root)

    @unittest.skipUnless(hasattr(os,'mkfifo'),'FIFO creation is POSIX-only')
    def test_special_packet_entry(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            (root/'package-sha256.json').write_text('{}')
            os.mkfifo(root/'fifo')
            with self.assertRaisesRegex(AssertionError,'packet special file'):
                restore.verify_package(root)


if __name__ == '__main__':
    unittest.main()
