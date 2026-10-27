"""Regression checks for wrong-control and failed-baseline acceptance."""
import importlib.util
from pathlib import Path
import tomllib
import unittest

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('matrix_verify', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
w = v.module('wrapper_scope_tests', HERE / 'wrapper_check.py')


class ControlScope(unittest.TestCase):
    def test_positive_delivery(self):
        value = v.actual_invocations(v.raw(HERE / 'builds/both-providers/stderr.log.gz').decode(), 'both-providers')
        self.assertEqual(value['flags'], dict(solana_instructions_sysvar='no', curve_accounts='no'))

    def test_opposite_value_rejected(self):
        log = v.raw(HERE / 'builds/alloc-provider-yes/stderr.log.gz').decode()
        with self.assertRaisesRegex(ValueError, 'flag delivery'):
            v.actual_invocations(log, 'alloc-provider')

    def test_wrong_crate_rejected(self):
        log = v.raw(HERE / 'builds/error-provider/stderr.log.gz').decode()
        with self.assertRaisesRegex(ValueError, 'flag delivery'):
            v.actual_invocations(log, 'alloc-provider')

    def test_incomplete_build_rejected(self):
        log = v.raw(HERE / 'builds/baseline/stderr.log.gz').decode()
        log = '\n'.join(s for s in log.splitlines() if '--crate-name curve_accounts ' not in s)
        with self.assertRaisesRegex(ValueError, 'compilation cohort'):
            v.actual_invocations(log, 'baseline')

    def test_controls_only_change_manifest(self):
        sources = {r['path']: v.raw(HERE / 'sources' / (r['path'] + '.gz'))
                   for r in v.read(HERE / 'source-inputs.json')['source_files']}
        for label in v.controls.VARIANTS[1:]:
            result = v.controls.control_source(sources, label)
            self.assertEqual([n for n in sources if sources[n] != result[n]], ['Cargo.toml'])
            manifest = tomllib.loads(result['Cargo.toml'].decode())
            self.assertIn('--remap-path-prefix=curve-accounts/=', manifest['profile']['release']['package']['curve-accounts']['rustflags'])

    def test_direct_controls_hold_arguments_fixed(self):
        for label in ('baseline', 'alloc-provider'):
            parent = HERE / 'direct' / label
            v.direct_pair(v.read(parent / 'replay/launch.json.gz'), v.read(parent / 'toggle/launch.json.gz'), label)

    def pair(self):
        parent = HERE / 'direct/baseline'
        return v.read(parent / 'replay/launch.json.gz'), v.read(parent / 'toggle/launch.json.gz')

    def test_metadata_change_rejected(self):
        replay, toggle = self.pair()
        toggle['command'] = ['metadata=changed' if a.startswith('metadata=') else a for a in toggle['command']]
        with self.assertRaisesRegex(ValueError, 'other arguments'):
            v.direct_pair(replay, toggle, 'baseline')

    def test_cwd_change_rejected(self):
        replay, toggle = self.pair()
        toggle['cwd'] += '/different'
        with self.assertRaisesRegex(ValueError, 'changed cwd'):
            v.direct_pair(replay, toggle, 'baseline')

    def test_environment_change_rejected(self):
        replay, toggle = self.pair()
        toggle['environment']['CARGO_PKG_VERSION'] = 'different'
        with self.assertRaisesRegex(ValueError, 'changed environment'):
            v.direct_pair(replay, toggle, 'baseline')

    def test_extra_flag_rejected(self):
        replay, toggle = self.pair()
        toggle['command'].append('-Copt-level=0')
        with self.assertRaisesRegex(ValueError, 'other arguments'):
            v.direct_pair(replay, toggle, 'baseline')

    def wrapper_records(self, label='portable-fixed'):
        return v.read(HERE / 'wrapper-control/builds' / label / 'records.json.gz')

    def test_complete_wrapper_traces(self):
        for label in ('passthrough', 'omit-repeat', 'portable-fixed'):
            mode = 'passthrough' if label == 'passthrough' else 'omit-sysvar-no'
            self.assertEqual(len(w.compile_rows(self.wrapper_records(label), mode)), 163)

    def test_incomplete_wrapper_traces_rejected(self):
        for label in ('omit', 'portable-omit'):
            with self.assertRaisesRegex(ValueError, 'compilation cohort'):
                w.compile_rows(self.wrapper_records(label), 'omit-sysvar-no')

    def test_wrapper_second_argument_change_rejected(self):
        rows = self.wrapper_records()
        changed = next(r for r in rows if r['removed'])
        changed['after'].append('-Copt-level=0')
        with self.assertRaisesRegex(ValueError, 'additional arguments'):
            w.compile_rows(rows, 'omit-sysvar-no')

    def test_wrapper_wrong_crate_rejected(self):
        rows = self.wrapper_records()
        changed = next(r for r in rows if r['removed'])
        for key in ('before', 'after'):
            args = changed[key]; args[args.index('--crate-name') + 1] = 'curve_accounts'
        with self.assertRaisesRegex(ValueError, 'wrong crate'):
            w.compile_rows(rows, 'omit-sysvar-no')

    def test_wrapper_duplicate_receipt_rejected(self):
        rows = self.wrapper_records(); rows.append(rows[0])
        with self.assertRaisesRegex(ValueError, 'duplicate wrapper record'):
            w.compile_rows(rows, 'omit-sysvar-no')

    def test_reused_pid_with_distinct_record_id_allowed(self):
        rows = self.wrapper_records(); rows[1]['pid'] = rows[0]['pid']
        self.assertNotEqual(rows[1]['record_id'], rows[0]['record_id'])
        self.assertEqual(len(w.compile_rows(rows, 'omit-sysvar-no')), 163)

    def test_missing_wrapper_compile_rejected(self):
        rows = self.wrapper_records()
        row = next(r for r in rows if '--emit=dep-info,metadata,link' in r['before'] and not r['removed'])
        rows.remove(row)
        with self.assertRaisesRegex(ValueError, 'compilation cohort'):
            w.compile_rows(rows, 'omit-sysvar-no')


if __name__ == '__main__':
    unittest.main()
