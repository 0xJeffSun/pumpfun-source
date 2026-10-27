"""Source-only shallow-checkout regression; no repository network or executable inputs."""
from pathlib import Path
import importlib.util
import json
import os
import shutil
import subprocess
import tempfile
import unittest
from unittest.mock import patch

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
spec = importlib.util.spec_from_file_location('checked_in_sources', HERE / 'source_checkout.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)

class SourceCheckoutTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.sources = v.reconstruct(ROOT)
        cls.rows = json.loads((ROOT / v.PACKAGE / 'baseline-sources.json').read_bytes())['files']

    def fixture(self, root):
        shutil.copytree(ROOT / v.PACKAGE, root / v.PACKAGE, ignore=shutil.ignore_patterns('__pycache__'))
        for row in self.rows.values():
            p = root / row['path']
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_bytes((ROOT / row['path']).read_bytes())

    def test_all_three_exact_maps(self):
        variants = json.loads((ROOT / v.PACKAGE / 'variants.json').read_bytes())['variants']
        self.assertEqual(list(self.sources), v.ORDER)
        for label, source in self.sources.items():
            self.assertEqual(len(source), 60)
            self.assertEqual({n: v.digest(b) for n,b in source.items()}, variants[label]['files'])

    def test_export_without_git_or_subprocess(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t) / 'export'
            self.fixture(root)
            with patch.object(subprocess, 'Popen', side_effect=AssertionError('subprocess forbidden')):
                self.assertEqual(v.reconstruct(root), self.sources)
            self.assertFalse((root / '.git').exists())

    def test_actual_depth_one_local_checkout(self):
        # Only a tiny synthetic local fixture is cloned; never this repository or a remote.
        with tempfile.TemporaryDirectory() as t:
            base = Path(t); origin = base / 'origin'; clone = base / 'shallow'
            self.fixture(origin)
            env = {'PATH': os.environ['PATH'], 'HOME': str(base), 'GIT_CONFIG_NOSYSTEM': '1',
                   'GIT_CONFIG_GLOBAL': os.devnull, 'LC_ALL': 'C'}
            def git(cwd, *args, check=True):
                return subprocess.run(['git', '-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid',
                                       '-c', 'gc.auto=0', *args], cwd=cwd, env=env,
                                      stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=check)
            git(origin, 'init', '-q'); git(origin, 'add', '-f', '.')
            git(origin, 'commit', '-qm', 'fixture source')
            old = git(origin, 'rev-parse', 'HEAD').stdout.decode().strip()
            (origin / 'fixture-marker').write_text('second fixture commit\n')
            git(origin, 'add', 'fixture-marker'); git(origin, 'commit', '-qm', 'fixture tip')
            git(base, '-c', 'protocol.file.allow=always', 'clone', '-q', '--depth=1', origin.as_uri(), str(clone))
            self.assertEqual(git(clone, 'rev-parse', '--is-shallow-repository').stdout.strip(), b'true')
            row = next(iter(self.rows.values()))
            self.assertTrue((clone / row['path']).is_file())
            self.assertNotEqual(git(clone, 'show', old + ':' + row['path'], check=False).returncode, 0)
            self.assertNotEqual(git(clone, 'show', row['revision'] + ':' + row['path'], check=False).returncode, 0)
            with patch.object(subprocess, 'Popen', side_effect=AssertionError('source loader invoked Git')):
                self.assertEqual(v.reconstruct(clone), self.sources)

    def test_changed_public_source_rejected(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t) / 'tree'; self.fixture(root)
            p = root / self.rows['Cargo.lock']['path']; p.write_bytes(p.read_bytes() + b'\n')
            with self.assertRaisesRegex(AssertionError, 'public source hash'): v.reconstruct(root)

    def test_missing_source_has_no_fallback(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t) / 'tree'; self.fixture(root)
            (root / self.rows['Cargo.lock']['path']).unlink()
            with self.assertRaises(AssertionError): v.reconstruct(root)

    def test_manifest_cannot_be_resealed(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t) / 'tree'; self.fixture(root)
            p = root / v.PACKAGE / 'manifest.json'; p.write_bytes(p.read_bytes() + b'\n')
            with self.assertRaisesRegex(AssertionError, 'historical source manifest'): v.reconstruct(root)

    def test_source_symlink_even_identical_bytes(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t) / 'tree'; self.fixture(root)
            p = root / self.rows['Cargo.lock']['path']; target = Path(t) / 'same-lock'
            target.write_bytes(p.read_bytes()); p.unlink(); p.symlink_to(target)
            with self.assertRaises(AssertionError): v.reconstruct(root)

    def test_symlink_ancestor(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t) / 'tree'; self.fixture(root)
            alias = Path(t) / 'alias'; alias.symlink_to(root, target_is_directory=True)
            with self.assertRaises(AssertionError): v.reconstruct(alias)

    def test_unsafe_paths(self):
        for name in ['', '.', '../bad', '/bad', 'a/../b', 'a//b', 'a\\b']:
            with self.subTest(name=name), self.assertRaises(AssertionError): v.safe_file(ROOT, name)

    def test_no_artifact_or_runtime_reads(self):
        original = Path.read_bytes
        allowed = {ROOT / row['path'] for row in self.rows.values()}
        allowed.update(p for p in (ROOT / v.PACKAGE).rglob('*') if p.is_file())
        def guarded(path):
            self.assertFalse(path.name.endswith(('.so', '.gz', '.bz2', '.zip', '.bin')))
            self.assertIn(path, allowed)
            return original(path)
        with patch.object(Path, 'read_bytes', guarded): self.assertEqual(v.reconstruct(ROOT), self.sources)

if __name__ == '__main__': unittest.main()
