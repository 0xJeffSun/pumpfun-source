"""Mutation tests for source/identity binding and complete compiler observations."""
import copy
import importlib.util
from pathlib import Path
import subprocess
import unittest

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('identity_verifier', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


class EvidenceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.baseline = v.read(HERE / 'builds/passthrough/records.json.gz')
        cls.rows = v.read(HERE / 'builds/relative/records.json.gz')
        cls.mapping = v.derive_map(cls.baseline)
        cls.paths = v.derive_paths()

    def rows_copy(self):
        return copy.deepcopy(self.rows)

    def validate(self, rows, mapping=None):
        return v.check_records(rows, 'published-with-paths-relative', self.mapping if mapping is None else mapping, self.paths)

    def target(self, rows):
        return next(r for r in rows if v.is_compile(r['before']) and v.is_target(r['before']))

    def test_published_binding(self):
        self.assertEqual(len(self.mapping), 85)
        self.assertEqual(sum(a != b for (a, _), b in self.mapping.items()), 65)

    def test_complete_observations(self):
        _, counts = self.validate(self.rows)
        self.assertEqual((counts['crate_compilations'], counts['source_inputs_relativized']), (163, 82))

    def test_wrong_metadata_value(self):
        mapping = dict(self.mapping)
        key = next(iter(mapping))
        mapping[key] = '0000000000000000'
        with self.assertRaisesRegex(ValueError, 'forwarded argument'):
            self.validate(self.rows, mapping)

    def test_missing_metadata_binding(self):
        mapping = dict(self.mapping)
        mapping.pop(next(iter(mapping)))
        with self.assertRaisesRegex(ValueError, 'unbound metadata'):
            self.validate(self.rows, mapping)

    def test_additional_codegen_edit(self):
        rows = self.rows_copy()
        self.target(rows)['after'].append('-Copt-level=0')
        with self.assertRaisesRegex(ValueError, 'forwarded argument'):
            self.validate(rows)

    def test_host_edit_rejected(self):
        rows = self.rows_copy()
        host = next(r for r in rows if v.is_compile(r['before']) and not v.is_target(r['before']))
        host['after'].append('-Copt-level=0')
        with self.assertRaisesRegex(ValueError, 'forwarded argument'):
            self.validate(rows)

    def test_missing_compile_observation(self):
        rows = self.rows_copy()
        rows.remove(self.target(rows))
        with self.assertRaisesRegex(ValueError, 'incomplete compiler trace'):
            self.validate(rows)

    def test_duplicate_observation(self):
        with self.assertRaisesRegex(ValueError, 'duplicate wrapper record'):
            self.validate(self.rows + [self.rows[0]])

    def test_missing_auxiliary_observation(self):
        rows = self.rows_copy()
        rows.remove(next(r for r in rows if not v.is_compile(r['before'])))
        with self.assertRaisesRegex(ValueError, 'auxiliary compiler cohort'):
            self.validate(rows)

    def test_false_replacement_receipt(self):
        rows = self.rows_copy()
        self.target(rows)['metadata_replaced'] = 0
        with self.assertRaisesRegex(ValueError, 'forwarded argument'):
            self.validate(rows)

    def test_source_identity_preserves_version(self):
        self.assertNotEqual(v.source_key('C:/work/pkg-1.2.3/src/lib.rs'), v.source_key('/work/pkg-1.2.4/src/lib.rs'))
        self.assertEqual(v.source_key('C:/work/2026-10-26/vendor/pkg-1.2.3/src/lib.rs'), 'pkg-1.2.3/src/lib.rs')

    def test_no_source_outside_cwd(self):
        with self.assertRaises(ValueError):
            v.relative_source('C:/work/other/src/lib.rs', 'C:/work/pkg-1.2.3')
        with self.assertRaisesRegex(ValueError, 'escapes'):
            v.relative_source('C:/work/pkg-1.2.3/../other.rs', 'C:/work/pkg-1.2.3')

    def test_relative_input_resolves_same_file(self):
        self.assertEqual(v.relative_source('C:\\work\\pkg-1.2.3\\src\\lib.rs', 'C:\\work\\pkg-1.2.3'), 'src/lib.rs')

    def test_source_flag_is_not_source_argument(self):
        self.assertEqual(v.source(['src/lib.rs', '--remap-path-prefix=src/lib.rs=elsewhere.rs']), 'src/lib.rs')

    def test_unbound_dependency_rejected(self):
        units = v.published_units(v.raw(HERE / 'reference/main-build.log').decode())
        row = next(a for a in units if '--extern' in a and any('.rmeta' in x for x in a))
        i = next(i for i, a in enumerate(row) if '.rmeta' in a)
        row[i] = row[i].rsplit('/', 1)[0] + '/libmissing-dependency.rmeta'
        with self.assertRaisesRegex(ValueError, 'unbound target dependency'):
            v.dependency_edges(units)

    def test_cargo_log_binds_actual_arguments(self):
        rows = [copy.deepcopy(r) for r in self.rows if v.is_compile(r['before'])]
        rows[0]['before'].append('--invented-argument')
        folder = HERE / 'builds/relative'
        env = v.read(folder / 'launch.json.gz')['environment_overrides']
        with self.assertRaisesRegex(ValueError, 'Cargo log and actual'):
            v.cargo_binding(v.raw(folder / 'stderr.log.gz').decode(), rows, env['RUSTC_WRAPPER'], env['RUSTC'])

    def test_windows_quotes_and_trailing_slashes(self):
        args = ['C:\\Program Files\\rustc.exe', '--cfg', 'feature="default"', 'C:\\space dir\\', '', 'a\\"b']
        self.assertEqual(v.windows_split(subprocess.list2cmdline(args)), args)

    def test_normalized_equality_does_not_imply_raw_identity(self):
        findings = v.read(HERE / 'findings.json')['builds']
        self.assertTrue(findings['published']['ordered_normalized_text_equal'])
        self.assertFalse(findings['published']['raw_reference_equal'])
        self.assertTrue(findings['relative']['raw_reference_equal'])
        self.assertNotEqual(v.digest(v.raw(HERE / 'reference/original.so.gz')), v.RAW)


if __name__ == '__main__':
    unittest.main()
