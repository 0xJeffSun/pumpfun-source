"""Mutation controls for command, input, raw-object and comparison boundaries."""
import copy
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('controlled_verify_tests', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
REPO = HERE.parents[1]


class ProbeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.alloc = v.load_module('probe_test_alloc', REPO / v.PARENT / 'analyze.py')
        cls.elf, cls.method = cls.alloc.helpers(REPO)
        cls.linux = (HERE / 'run/linux/relay_typeid_probe.o').read_bytes()
        cls.parsed = v.derive_object(cls.linux, cls.alloc, cls.elf, cls.method)

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.package = Path(self.temp.name) / 'packet'
        shutil.copytree(HERE, self.package, ignore=shutil.ignore_patterns('__pycache__'))

    def write_json(self, name, value):
        (self.package / name).write_text(json.dumps(value) + '\n', encoding='utf-8')

    def commands(self, mutate):
        rows = v.read(self.package / 'run/commands.json')
        mutate(rows)
        self.write_json('run/commands.json', rows)
        with self.assertRaises(ValueError):
            v.validate_run(self.package)

    def test_complete_packet(self):
        self.assertEqual(v.verify(REPO)['newly_added_raw_capture_ranges'], 0)

    def test_optimization_drift_rejected(self):
        self.commands(lambda r: r[3]['arguments'].__setitem__(7, 'opt-level=2'))

    def test_wrong_sysroot_rejected(self):
        self.commands(lambda r: r[3]['arguments'].__setitem__(16, '..\\darwin-sysroot\\rust'))

    def test_failed_exit_rejected(self):
        self.commands(lambda r: r[3].__setitem__('exit', 1))

    def test_missing_compilation_rejected(self):
        self.commands(lambda r: r.pop())

    def test_output_not_recorded_rejected(self):
        self.commands(lambda r: r[3]['outputs'].pop('relay_typeid_probe.o'))

    def test_source_change_rejected(self):
        (self.package / 'source/probe.rs').write_bytes(b'// changed\n')
        with self.assertRaisesRegex(ValueError, 'input differs'):
            v.validate_run(self.package)

    def test_zero_exit_empty_object_rejected_even_with_updated_receipt(self):
        (self.package / 'run/linux/relay_typeid_probe.o').write_bytes(b'')
        rows = v.read(self.package / 'run/commands.json')
        rows[3]['outputs']['relay_typeid_probe.o'] = v.identity(b'')
        self.write_json('run/commands.json', rows)
        with self.assertRaisesRegex(ValueError, 'compiler output differs'):
            v.validate_run(self.package)

    def test_repeat_difference_rejected_even_with_updated_receipt(self):
        p = self.package / 'run/linux-repeat/relay_typeid_probe.s'
        raw = p.read_bytes() + b'\n'
        p.write_bytes(raw)
        rows = v.read(self.package / 'run/commands.json')
        rows[-1]['outputs'][p.name] = v.identity(raw)
        self.write_json('run/commands.json', rows)
        with self.assertRaisesRegex(ValueError, 'complete Linux repeat differs'):
            v.validate_run(self.package)

    def test_component_duplication_rejected(self):
        data = v.read(self.package / 'linux-components.json')
        data['files'][-1] = copy.deepcopy(data['files'][0])
        self.write_json('linux-components.json', data)
        with self.assertRaisesRegex(ValueError, 'duplicate component'):
            v.component_metadata(self.package)

    def test_publisher_digest_disagreement_rejected(self):
        data = v.read(self.package / 'windows-components.json')
        data['archive_sha256'] = '0' * 64
        self.write_json('windows-components.json', data)
        with self.assertRaisesRegex(ValueError, 'publisher digest differs'):
            v.component_metadata(self.package)

    def test_incomplete_observation_rejected(self):
        data = v.read(self.package / 'run/observation.json')
        data['successful_compilations'] = 3
        self.write_json('run/observation.json', data)
        with self.assertRaisesRegex(ValueError, 'incomplete compilation'):
            v.validate_run(self.package)

    def test_wrong_io_control_symbol_rejected(self):
        raw = self.linux.replace(b'io_error_type_id', b'io_error_type_XX')
        with self.assertRaisesRegex(ValueError, 'function selection'):
            v.derive_object(raw, self.alloc, self.elf, self.method)

    def test_nonconstant_instruction_rejected(self):
        raw = bytearray(self.linux)
        raw[self.parsed['boxed_string_error']['function']['offset']] = 0x07
        with self.assertRaisesRegex(ValueError, 'LDDW shape'):
            v.derive_object(bytes(raw), self.alloc, self.elf, self.method)

    def test_vtable_type_id_addend_rejected(self):
        raw = bytearray(self.linux)
        obj = self.elf.Elf(raw)
        table = self.parsed['string_error_table'][0]
        raw[obj.sections[table['section_index']]['offset'] + 56] = 1
        with self.assertRaisesRegex(ValueError, 'nonzero object pointer'):
            v.derive_object(bytes(raw), self.alloc, self.elf, self.method)

    def test_actual_constant_change_rejected_beyond_output_hash_gate(self):
        rows = v.read(self.package / 'run/commands.json')
        for label, index in [('linux', 3), ('linux-repeat', 5)]:
            p = self.package / 'run' / label / 'relay_typeid_probe.o'
            raw = bytearray(p.read_bytes())
            raw[self.parsed['boxed_string_error']['function']['offset'] + 4] ^= 1
            p.write_bytes(raw)
            rows[index]['outputs'][p.name] = v.identity(raw)
        self.write_json('run/commands.json', rows)
        with self.assertRaisesRegex(ValueError, 'fresh body differs'):
            v.derive(REPO, self.package)

    def test_manifest_catches_changed_component_identity(self):
        data = v.read(self.package / 'linux-components.json')
        data['files'][0]['sha256'] = '0' * 64
        self.write_json('linux-components.json', data)
        with self.assertRaisesRegex(ValueError, 'input differs'):
            v.package_integrity(self.package)

    def test_small_wrong_archive_rejected_before_tar_parsing(self):
        path = Path(self.temp.name) / 'wrong.tar.bz2'
        path.write_bytes(b'not a release archive')
        with self.assertRaisesRegex(ValueError, 'publisher archive differs'):
            v.archive_check(path, v.component_metadata()['linux'])

    def test_replay_difference_rejected_with_updated_receipt(self):
        p = self.package / 'replay/windows/relay_typeid_probe.s'
        raw = p.read_bytes() + b'\n'
        p.write_bytes(raw)
        rows = v.read(self.package / 'replay/commands.json')
        rows[2]['outputs'][p.name] = v.identity(raw)
        self.write_json('replay/commands.json', rows)
        with self.assertRaisesRegex(ValueError, 'fresh replay output differs'):
            v.validate_replay(self.package)

    def test_replay_failed_observation_rejected(self):
        data = v.read(self.package / 'replay/observation.json')
        data['status'] = 'FAILED'
        self.write_json('replay/observation.json', data)
        with self.assertRaisesRegex(ValueError, 'incomplete compilation'):
            v.validate_replay(self.package)

    def test_relocated_minimal_tree_with_isolated_python(self):
        repo = Path(self.temp.name) / 'minimal'
        package = repo / 'research/mayhem-controlled-sysroot-probe'
        shutil.copytree(HERE, package, ignore=shutil.ignore_patterns('__pycache__'))
        for row in v.read(HERE / 'inputs.json')['files']:
            dest = repo / row['path']
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(REPO / row['path'], dest)
        r = subprocess.run([sys.executable, '-I', str(package / 'verify.py'), '--repo', str(repo)],
                           cwd=self.temp.name, capture_output=True, text=True, timeout=120)
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        result = json.loads(r.stdout)
        self.assertEqual(result['fresh_compiler_executions'], 0)
        self.assertTrue(all(not x['release_membership_rechecked'] for x in result['archive_checks'].values()))


if __name__ == '__main__':
    unittest.main()
