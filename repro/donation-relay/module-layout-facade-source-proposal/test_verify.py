import importlib.util
from pathlib import Path
import tempfile
import unittest

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('natural_layout_verify_test', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


class Tests(unittest.TestCase):
    def test_static(self):
        v.manifest()
        self.assertEqual(len(v.static_reports()), 6)

    def test_safe_paths(self):
        for name in ['', '../escape', '/absolute', 'a/../b', './x', 'a\\b', 'a//b']:
            with self.subTest(name=name), self.assertRaises(AssertionError):
                v.safe(name)

    def test_materialize(self):
        with tempfile.TemporaryDirectory() as parent:
            output = Path(parent) / 'source'
            v.materialize(output, 'security-order', v.variants())
            self.assertEqual(len([p for p in output.rglob('*') if p.is_file()]), 60)
            with self.assertRaises(AssertionError):
                v.materialize(output, 'security-order', v.variants())

    def test_symlink_destination(self):
        with tempfile.TemporaryDirectory() as parent:
            folder = Path(parent)
            (folder / 'real').mkdir()
            (folder / 'link').symlink_to(folder / 'real', target_is_directory=True)
            with self.assertRaises(AssertionError):
                v.materialize(folder / 'link/source', 'security-order', v.variants())

    def test_input_mutation(self):
        with tempfile.TemporaryDirectory() as parent:
            import shutil
            output = Path(parent) / 'packet'
            shutil.copytree(HERE, output)
            with (output / 'base-source/src/lib.rs').open('ab') as handle:
                handle.write(b'\n// mutation\n')
            with self.assertRaises(AssertionError):
                v.manifest(output)
            with self.assertRaises(AssertionError):
                v.variants(output)

    def test_default_reads_no_artifacts_or_receipts(self):
        from unittest.mock import patch
        real = Path.read_bytes
        def guarded(path):
            self.assertFalse(str(path).endswith(('.so', '.gz')))
            self.assertNotIn('fresh-runtime', str(path))
            self.assertNotIn('launch.json', str(path))
            self.assertNotIn('result.json', str(path))
            return real(path)
        with patch.object(Path, 'read_bytes', guarded):
            self.assertEqual(len(v.static_reports()), 6)

    def test_facade_changes_only_root_dependency_edge(self):
        import copy, tomllib
        sources = v.variants()
        before = sources['security-order']
        after = sources['anchor-facade']
        self.assertEqual(sorted(n for n in before if before[n] != after[n]),
                         ['Cargo.lock', 'Cargo.toml', 'src/codec/wire.rs', 'src/lib.rs'])
        a = tomllib.loads(before['Cargo.lock'].decode())
        b = tomllib.loads(after['Cargo.lock'].decode())
        root = next(p for p in a['package'] if p['name'] == 'donation-relay-source-proposal')
        self.assertEqual(root['dependencies'].count('solana-program'), 1)
        root['dependencies'].remove('solana-program')
        self.assertEqual(a, b)


if __name__ == '__main__':
    unittest.main()
