"""Evidence-scope regression tests; no compiler or target execution."""
import copy
import importlib.util
from pathlib import Path
import unittest

P = Path(__file__).resolve().parent
s = importlib.util.spec_from_file_location('sharing_verify', P / 'verify.py')
v = importlib.util.module_from_spec(s); s.loader.exec_module(v)


class EvidenceScope(unittest.TestCase):
    def test_actual_provider_flag(self):
        log = v.raw(P / 'builds/provider/stderr.log.gz').decode()
        self.assertEqual(v.actual_invocations(log, 'provider')['controlled_crates'], ['solana_instructions_sysvar'])

    def test_wrong_dependency_flag_rejected(self):
        log = v.raw(P / 'builds/consumer/stderr.log.gz').decode()
        with self.assertRaisesRegex(ValueError, 'different crate'):
            v.actual_invocations(log, 'provider')

    def test_missing_flag_rejected(self):
        log = v.raw(P / 'builds/provider/stderr.log.gz').decode().replace('-Zshare-generics=no ', '')
        with self.assertRaises(ValueError):
            v.actual_invocations(log, 'provider')

    def test_incomplete_build_rejected(self):
        log = v.raw(P / 'builds/provider/stderr.log.gz').decode()
        log = '\n'.join(line for line in log.splitlines() if '--crate-name pump_interface ' not in line)
        with self.assertRaisesRegex(ValueError, 'compilation cohort'):
            v.actual_invocations(log, 'provider')

    def test_only_manifest_changes(self):
        rows = v.read(P / 'source-inputs.json')['source_files']
        source = {r['path']: v.raw(P / 'sources' / (r['path'] + '.gz')) for r in rows}
        after = v.control_source(source, 'provider')
        self.assertEqual(set(after), set(source))
        self.assertEqual([n for n in source if source[n] != after[n]], ['Cargo.toml'])
        self.assertIn(b'[profile.release.package.solana-instructions-sysvar]', after['Cargo.toml'])

    def test_archive_member_is_exact_object(self):
        key = 'baseline/solana_instructions_sysvar'; record = v.read(P / 'objects.json')[key]
        archive = v.raw(P / 'objects' / (key + '.rlib.gz'))
        self.assertEqual(v.archive_members(archive)[record['member']], v.raw(P / 'objects' / (key + '.o.gz')))

    def test_truncated_archive_rejected(self):
        archive = v.raw(P / 'objects/baseline/solana_instructions_sysvar.rlib.gz')
        with self.assertRaises(ValueError):
            v.archive_members(archive[:-10])

    def test_undefined_consumer_and_defined_provider(self):
        route = v.read(P / 'findings.json')['routes']['baseline']['burn']
        consumer = v.Object(v.raw(P / 'objects/baseline/spl_token_2022_interface.o.gz'))
        provider = v.Object(v.raw(P / 'objects/baseline/solana_instructions_sysvar.o.gz'))
        self.assertEqual(consumer.symbols[route['grow_symbol']]['section'], 0)
        self.assertNotEqual(provider.symbols[route['grow_symbol']]['section'], 0)

    def test_divergent_call_targets_rejected(self):
        caller = dict(direct=[dict(offset=912, target=100), dict(offset=1320, target=200)])
        with self.assertRaisesRegex(ValueError, 'one helper'):
            v.routed_call({}, caller, (912, 1320))

    def test_missing_call_offset_rejected(self):
        caller = dict(direct=[dict(offset=912, target=100)])
        with self.assertRaisesRegex(ValueError, 'offsets differ'):
            v.routed_call({}, caller, (912, 1320))


if __name__ == '__main__':
    unittest.main()
