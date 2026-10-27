"""Offline tests against an operator-supplied, unmodified npm package.

Only the twelve recorded files, package metadata and license are copied into
small test fixtures. These tests do not claim to exercise Ghidra.
"""
import argparse
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

import prepare

PACKAGE = None
NODE = shutil.which('node')


class PreparationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name).resolve()
        self.source = self.root / 'package'
        self.output = self.root / 'adapter'
        self.dependencies = self.root / 'node_modules'
        self.dependencies.mkdir()
        recipe, _ = prepare.recorded_recipe()
        self.rows = recipe['files']
        for name in ['package.json', 'LICENSE'] + [row['file'] for row in self.rows]:
            target = self.source / name
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(PACKAGE / name, target)
        self.before = prepare.inventory(self.source)

    def run_prepare(self):
        return prepare.prepare(self.source, self.output, self.dependencies)

    def test_matches_independently_recorded_adapter_and_preserves_source(self):
        report = self.run_prepare()
        self.assertEqual(report['matched_adapter_files'], 12)
        self.assertEqual(prepare.inventory(self.source), self.before)
        for row in self.rows:
            self.assertEqual(prepare.sha((self.output / row['file']).read_bytes()), row['adapter_sha256'])
        self.assertEqual((self.output / 'node_modules').resolve(), self.dependencies)
        self.assertEqual(json.loads((self.output / prepare.REPORT).read_bytes()), report)

    def test_existing_directory_and_contents_are_untouched(self):
        self.output.mkdir()
        sentinel = self.output / 'keep'
        sentinel.write_bytes(b'preserve')
        with self.assertRaisesRegex(ValueError, 'already exists'):
            self.run_prepare()
        self.assertEqual(sentinel.read_bytes(), b'preserve')
        self.assertEqual(list(self.output.iterdir()), [sentinel])

    def test_dangling_output_symlink_is_not_followed(self):
        missing = self.root / 'missing'
        self.output.symlink_to(missing, target_is_directory=True)
        with self.assertRaisesRegex(ValueError, 'already exists'):
            self.run_prepare()
        self.assertTrue(self.output.is_symlink())
        self.assertFalse(missing.exists())

    def test_mutated_input_is_rejected_before_creating_output(self):
        path = self.source / self.rows[-1]['file']
        path.write_bytes(path.read_bytes() + b'\n')
        with self.assertRaisesRegex(ValueError, 'differs from the recorded input'):
            self.run_prepare()
        self.assertFalse(self.output.exists())

    def test_other_version_is_not_silently_adapted(self):
        path = self.source / 'package.json'
        package = json.loads(path.read_bytes())
        package['version'] = '6.8.1'
        path.write_text(json.dumps(package))
        with self.assertRaisesRegex(ValueError, 'only the recorded'):
            self.run_prepare()
        self.assertFalse(self.output.exists())

    def test_output_inside_source_is_rejected(self):
        with self.assertRaisesRegex(ValueError, 'must not overlap'):
            prepare.prepare(self.source, self.source / 'adapter', self.dependencies)
        self.assertEqual(prepare.inventory(self.source), self.before)

    def test_package_symlink_is_rejected_without_reading_its_target(self):
        (self.source / 'external').symlink_to(self.root / 'absent')
        with self.assertRaisesRegex(ValueError, 'Package symlink'):
            self.run_prepare()
        self.assertFalse(self.output.exists())

    def test_conflicting_nested_dependencies_are_rejected(self):
        (self.source / 'node_modules').mkdir()
        with self.assertRaisesRegex(ValueError, 'separate nested dependency tree'):
            self.run_prepare()
        self.assertFalse(self.output.exists())

    @unittest.skipUnless(NODE, 'Node is required to test the header checker')
    def test_header_checker_authenticates_module_before_import(self):
        package = self.root / 'untrusted-adapter'
        module = package / 'dist/domain/elfFixedHeader.js'
        module.parent.mkdir(parents=True)
        (package / 'package.json').write_text('{"type":"module"}')
        module.write_text("import { writeFileSync } from 'node:fs';\n"
                          "writeFileSync('module-executed', 'unexpected');\n"
                          "export const readElfFixedHeader = () => ({ ok: false });\n")
        result = subprocess.run(
            [NODE, str(Path(__file__).with_name('check_headers.mjs')), str(package)],
            cwd=self.root, capture_output=True, text=True, timeout=10,
        )
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('AssertionError', result.stderr)
        self.assertFalse((self.root / 'module-executed').exists())


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    args, remaining = parser.parse_known_args()
    PACKAGE = args.source.resolve(strict=True)
    unittest.main(argv=[__file__, *remaining])
