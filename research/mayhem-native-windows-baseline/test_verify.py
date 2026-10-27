import gzip
import importlib.util
import io
import json
from pathlib import Path
import shutil
import struct
import subprocess
import sys
import tarfile
import tempfile
import unittest

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('native_packet_verify', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
REPO = HERE.parents[1]


class NativeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.m = v.load('native_test_layer', REPO / v.PARENT / 'tools/layer01.py')
        cls.prior = v.read(REPO / v.PARENT / 'prior-inventory.json.gz')['original_rows']
        cls.admitted = v.read(REPO / 'research/mayhem-quote-validator-followups/analysis.json')['baseline-clean']['matches']
        cls.sources = {r['path']: r['sha256'] for r in v.read(HERE / 'source-inputs.json')['source_files']}

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.package = self.root / 'packet'
        shutil.copytree(HERE, self.package, ignore=shutil.ignore_patterns('__pycache__'))

    def put(self, name, value):
        data = (json.dumps(value, indent=2) + '\n').encode()
        path = self.package / name
        path.write_bytes(gzip.compress(data, mtime=0) if path.suffix == '.gz' else data)

    def mutate_result(self, label, mutate, expected):
        name = 'builds/' + label + '/result.json.gz'
        result = v.read(self.package / name)
        mutate(result)
        self.put(name, result)
        with self.assertRaisesRegex(ValueError, expected):
            v.build_checks(self.package, self.sources)

    def elf_inputs(self):
        for name, data in [('base', v.raw(REPO / v.PARENT / 'artifacts/recovered-symbols.so.gz')),
                           ('native', v.raw(HERE / 'builds/build-01/symbols.so.gz'))]:
            (self.root / name).write_bytes(data)
        return (self.m.Elf(self.root / 'base'), self.m.Elf(self.root / 'native'),
                self.m.Elf(REPO / 'evidence/original/mayhem/deployed.so'))

    def test_default_verification_reports_baseline_failure(self):
        result = v.verify(REPO)
        self.assertFalse(result['published_baseline_reproduced'])
        self.assertTrue(result['native_full_builds_equal'])
        self.assertEqual(result['fresh_executions'], 0)
        self.assertEqual(result['new_original_windows'], 0)

    def test_source_mutation(self):
        p = self.package / 'sources/src/state.rs.gz'
        p.write_bytes(gzip.compress(v.raw(p) + b'\n', mtime=0))
        with self.assertRaisesRegex(ValueError, 'source content differs'):
            v.source_checks(REPO, self.package)

    def test_lock_identity_mutation(self):
        data = v.read(self.package / 'locked-packages.json')
        data[0]['checksum'] = '0' * 64
        self.put('locked-packages.json', data)
        with self.assertRaisesRegex(ValueError, 'dependency list'):
            v.source_checks(REPO, self.package)

    def test_failed_root_build(self):
        self.mutate_result('build-01', lambda r: r.__setitem__('returncode', 1), 'root build did not succeed')

    def test_no_root_invocation(self):
        self.mutate_result('build-01', lambda r: r.__setitem__('root_invocations', 0), 'root build did not succeed')

    def test_source_changed_after_build(self):
        self.mutate_result('portable-replay', lambda r: r.__setitem__('source_unchanged', False), 'root build did not succeed')

    def test_bad_strip_exit(self):
        self.mutate_result('build-01', lambda r: r['strip'].__setitem__('returncode', 1), 'strip failed')

    def test_offline_flag_missing(self):
        name = 'builds/build-01/launch.json.gz'
        row = v.read(self.package / name)
        row['command'].remove('--offline')
        self.put(name, row)
        with self.assertRaisesRegex(ValueError, 'build command differs'):
            v.build_checks(self.package, self.sources)

    def test_missing_fresh_target_observation(self):
        name = 'builds/portable-replay/launch.json.gz'
        row = v.read(self.package / name)
        row['target_directory_initially_absent'] = False
        self.put(name, row)
        with self.assertRaisesRegex(ValueError, 'fresh-target'):
            v.build_checks(self.package, self.sources)

    def test_changed_replay_artifact_with_resealed_receipt(self):
        path = self.package / 'builds/portable-replay/symbols.so.gz'
        data = bytearray(v.raw(path))
        data[300] ^= 1
        path.write_bytes(gzip.compress(data, mtime=0))
        name = 'builds/portable-replay/result.json.gz'
        row = v.read(self.package / name)
        row['outputs']['symbols.so'] = v.identity(data)
        self.put(name, row)
        with self.assertRaisesRegex(ValueError, 'fresh full build is unequal'):
            v.build_checks(self.package, self.sources)

    def test_instruction_mutation_beyond_outer_hashes(self):
        baseline, native, original = self.elf_inputs()
        original_row = next(r for r in self.prior if r['id'] == 'O0094')
        target = original.window(original_row['start'], original_row['end'])
        matches = [w for w in v.functions(native) if v.shape(w) == v.shape(target)]
        self.assertEqual(len(matches), 1)
        data = bytearray(native.b)
        data[matches[0]['start']] ^= 8
        native.b = bytes(data)
        with self.assertRaisesRegex(ValueError, 'admitted correspondence changed'):
            v.compare(self.m, baseline, native, original, self.prior, self.admitted)

    def test_call_mask_does_not_prove_raw_call_equality(self):
        _, native, _ = self.elf_inputs()
        window = next(w for w in v.functions(native) if w['direct'])
        before = v.shape(window)
        data = bytearray(native.b)
        pc = window['direct'][0]['pc']
        immediate, = struct.unpack_from('<i', data, pc + 4)
        struct.pack_into('<i', data, pc + 4, immediate + 1)
        native.b = bytes(data)
        after = native.window(window['start'], window['end'])
        self.assertEqual(v.shape(after), before)
        self.assertNotEqual(after['raw_sha256'], window['raw_sha256'])

    def test_vendor_map_must_derive_from_archive(self):
        path = self.root / 'demo.crate'
        with tarfile.open(path, 'w:gz') as archive:
            member = tarfile.TarInfo('demo-1.0/src/lib.rs')
            data = b'// source\n'
            member.size = len(data)
            archive.addfile(member, io.BytesIO(data))
        record = dict(package_sha256=v.digest(path.read_bytes()), checksum_file_sha256='0'*64,
                      checksum_file_newline='\n', file_count=1)
        b = v.load('native_build_test', HERE / 'build.py')
        with self.assertRaisesRegex(ValueError, 'does not derive'):
            v.crate_archive_check(path, 'demo-1.0', record, b.safe)

    def test_crlf_vendor_metadata_is_preserved(self):
        path = self.root / 'demo.crate'
        source = b'// original LF source\n'
        with tarfile.open(path, 'w:gz') as archive:
            member = tarfile.TarInfo('demo-1.0/src/lib.rs')
            member.size = len(source)
            archive.addfile(member, io.BytesIO(source))
        package_hash = v.digest(path.read_bytes())
        checksum = (json.dumps(dict(package=package_hash, files={'src/lib.rs': v.digest(source)})) + '\r\n').encode()
        record = dict(package_sha256=package_hash, checksum_file_sha256=v.digest(checksum),
                      checksum_file_newline='\r\n', file_count=1)
        b = v.load('native_crlf_test', HERE / 'build.py')
        v.crate_archive_check(path, 'demo-1.0', record, b.safe)
        record['checksum_file_newline'] = '\n'
        with self.assertRaisesRegex(ValueError, 'does not derive'):
            v.crate_archive_check(path, 'demo-1.0', record, b.safe)

    def test_missing_dependency_compilation_with_updated_log_receipt(self):
        path = self.package / 'builds/build-01/stderr.log.gz'
        lines = v.raw(path).splitlines(keepends=True)
        index = next(i for i, line in enumerate(lines) if b'rustc.exe --crate-name build_script_build ' in line)
        del lines[index]
        data = b''.join(lines)
        path.write_bytes(gzip.compress(data, mtime=0))
        name = 'builds/build-01/result.json.gz'
        row = v.read(self.package / name)
        row['logs']['stderr.log'] = v.identity(data)
        self.put(name, row)
        with self.assertRaisesRegex(ValueError, 'dependency compilation cohort differs'):
            v.build_checks(self.package, self.sources)

    def test_parent_artifact_change(self):
        rows = v.read(HERE / 'inputs.json')['files']
        b = v.load('native_pin_test', HERE / 'build.py')
        target = self.root / 'repo'
        row = next(r for r in rows if 'recovered-symbols' in r['path'])
        p = target / row['path']
        p.parent.mkdir(parents=True)
        p.write_bytes(b'wrong bytes')
        with self.assertRaisesRegex(ValueError, 'component differs'):
            b.pin(target, [row])

    def test_minimal_relocated_checkout(self):
        repo = self.root / 'minimal'
        package = repo / 'research/mayhem-native-windows-baseline'
        shutil.copytree(HERE, package, ignore=shutil.ignore_patterns('__pycache__'))
        for row in v.read(HERE / 'inputs.json')['files']:
            destination = repo / row['path']
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(REPO / row['path'], destination)
        result = subprocess.run([sys.executable, '-I', str(package / 'verify.py'), '--repo', str(repo)],
                                cwd=self.root, capture_output=True, text=True, timeout=120)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertFalse(json.loads(result.stdout)['published_baseline_reproduced'])


if __name__ == '__main__':
    unittest.main()
