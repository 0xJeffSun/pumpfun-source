"""Regression checks for wrong-control and failed-baseline acceptance."""
import importlib.util
from pathlib import Path
import tomllib
import unittest

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('matrix_verify', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


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


if __name__ == '__main__':
    unittest.main()
