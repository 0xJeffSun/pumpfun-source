#!/usr/bin/env python3
"""Mutation checks for the measured compiler controls and their receipts."""
import gzip
import importlib.util
import json
from pathlib import Path
import shutil
import struct
import tempfile
import unittest
from unittest import mock

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('controls_verify', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


def put(path, data):
    path.write_bytes(gzip.compress(data, mtime=0) if path.suffix == '.gz' else data)


def save(path, value):
    put(path, (json.dumps(value, indent=2) + '\n').encode())


class EvidenceTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.repo = Path(self.tmp.name).resolve()
        self.package = self.repo / 'research/mayhem-root-codegen-controls'
        shutil.copytree(HERE, self.package, ignore=shutil.ignore_patterns('__pycache__'))
        for row in v.read(HERE / 'inputs.json')['files']:
            path = self.repo / row['path']
            path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(HERE.parent.parent / row['path'], path)

    def seal(self):
        save(self.package / 'manifest.json', dict(files=[dict(path=p.relative_to(self.package).as_posix(),
             **v.identity(p.read_bytes())) for p in sorted(self.package.rglob('*'))
             if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts]))

    def folder(self, label='paths', series='exploratory'):
        return self.package / 'builds' / series / label

    def edit_json(self, path, edit):
        value = v.read(path)
        edit(value)
        save(path, value)

    def edit_log(self, edit):
        folder = self.folder()
        data = edit(v.raw(folder / 'stderr.log.gz'))
        put(folder / 'stderr.log.gz', data)
        self.edit_json(folder / 'result.json.gz', lambda x: x['logs'].update({'stderr.log': v.identity(data)}))

    def edit_both_artifacts(self, label, edit):
        data = edit(bytearray(v.raw(self.folder(label) / 'symbols.so.gz')))
        for series in ('exploratory', 'replay'):
            folder = self.folder(label, series)
            put(folder / 'symbols.so.gz', data)
            self.edit_json(folder / 'result.json.gz', lambda x: x.update(symbols=v.identity(data)))
        self.edit_json(self.package / 'expected-artifacts.json', lambda x: x.update({label: v.identity(data)}))
        self.seal()

    def test_relocated_no_git_compiler_or_subprocess(self):
        with mock.patch('subprocess.run', side_effect=AssertionError('subprocess')), \
             mock.patch('subprocess.Popen', side_effect=AssertionError('process')), \
             mock.patch('subprocess.check_output', side_effect=AssertionError('subprocess')):
            result = v.verify(self.repo, self.package)
        self.assertEqual(result['retained_root_compilations'], 8)
        self.assertEqual(result['new_original_windows'], 0)
        self.assertFalse((self.repo / '.git').exists())

    def test_failed_build_rejected_after_reseal(self):
        self.edit_json(self.folder() / 'result.json.gz', lambda x: x.update(returncode=1))
        self.seal()
        with self.assertRaisesRegex(ValueError, 'unsuccessful'):
            v.verify(self.repo, self.package)

    def test_missing_actual_compilation_rejected(self):
        self.edit_log(lambda b: b.replace(b'--crate-name mayhem_recovered ', b'--crate-name different_root '))
        self.seal()
        with self.assertRaisesRegex(ValueError, 'actual root-only'):
            v.verify(self.repo, self.package)

    def test_unexpected_dependency_compilation_rejected(self):
        self.edit_log(lambda b: b + b'\n     Running x/rustc.exe --crate-name hidden_dependency --target sbpf-solana-solana\n')
        self.seal()
        with self.assertRaisesRegex(ValueError, 'actual root-only'):
            v.verify(self.repo, self.package)

    def test_missing_flag_in_actual_log_rejected(self):
        self.edit_log(lambda b: b.replace(b'--remap-path-prefix=src/state.rs=', b'--changed-flag=src/state.rs='))
        self.seal()
        with self.assertRaisesRegex(ValueError, 'did not receive control flag'):
            v.verify(self.repo, self.package)

    def test_different_environment_rejected(self):
        self.edit_json(self.folder() / 'launch.json.gz', lambda x: x['environment_overrides'].update(CARGO_NET_OFFLINE='false'))
        self.seal()
        with self.assertRaisesRegex(ValueError, 'controlled launch'):
            v.verify(self.repo, self.package)

    def test_changed_source_bytes_rejected(self):
        path = self.repo / v.PARENT / 'sources/src/lib.rs.gz'
        put(path, v.raw(path) + b'\n')
        with self.assertRaisesRegex(ValueError, 'source content'):
            v.source_checks(self.repo)

    def test_changed_source_map_rejected(self):
        path = self.repo / v.PARENT / 'builds/build-01/launch.json.gz'
        self.edit_json(path, lambda x: x['source_inputs'].update({'src/lib.rs': '0' * 64}))
        with self.assertRaisesRegex(ValueError, 'source map'):
            v.source_checks(self.repo)

    def test_dependency_cohort_rejected(self):
        self.edit_json(self.package / 'dependency-inputs.json', lambda x: x.pop(next(iter(x))))
        self.seal()
        with self.assertRaisesRegex(ValueError, 'dependency cache cohort'):
            v.verify(self.repo, self.package)

    def test_replay_failure_rejected(self):
        self.edit_json(self.folder(series='replay') / 'result.json.gz', lambda x: x.update(status='FAILED'))
        self.seal()
        with self.assertRaisesRegex(ValueError, 'replay failed'):
            v.verify(self.repo, self.package)

    def test_opcode_change_rejected_after_all_artifact_pins_updated(self):
        def mutate(data):
            offset = v.read(self.package / 'findings.json.gz')['artifacts']['native']['changed_ranges']
            self.assertEqual(offset, [])
            # First text instruction has a retained function-shape obligation.
            m = v.load('test_layer', self.repo / v.GLOBAL / 'tools/layer01.py')
            path = self.repo / 'temporary.so'
            path.write_bytes(data)
            elf = m.Elf(path)
            data[elf.lo] ^= 1
            return bytes(data)
        self.edit_both_artifacts('paths', mutate)
        with self.assertRaisesRegex(ValueError, 'function shapes changed|original match cohort'):
            v.verify(self.repo, self.package)

    def test_normalized_call_change_still_fails_raw_path_control(self):
        def mutate(data):
            m = v.load('test_layer_call', self.repo / v.GLOBAL / 'tools/layer01.py')
            path = self.repo / 'temporary.so'
            path.write_bytes(data)
            elf = m.Elf(path)
            for offset in range(elf.lo, elf.hi, 8):
                if data[offset:offset + 2] == b'\x85\x10':
                    struct.pack_into('<i', data, offset + 4, struct.unpack_from('<i', data, offset + 4)[0] + 1)
                    return bytes(data)
            self.fail('no direct relative call')
        self.edit_both_artifacts('paths', mutate)
        with self.assertRaisesRegex(ValueError, 'path remap changed instructions|original match cohort'):
            v.verify(self.repo, self.package)

    def test_claimed_new_recovery_rejected_after_reseal(self):
        self.edit_json(self.package / 'findings.json.gz', lambda x: x.update(new_original_windows=1))
        self.seal()
        with self.assertRaisesRegex(ValueError, 'recomputed findings'):
            v.verify(self.repo, self.package)

    def test_unsafe_evidence_path_rejected(self):
        with self.assertRaisesRegex(ValueError, 'unsafe evidence path'):
            v.safe_file(self.repo, '../outside')

    def test_unlisted_file_rejected(self):
        (self.package / 'unexpected.txt').write_text('new')
        with self.assertRaisesRegex(ValueError, 'packet membership'):
            v.verify(self.repo, self.package)

    def test_relabeling_addition_as_replacement_rejected(self):
        path = self.package / 'metadata-option/added/launch.json.gz'
        self.edit_json(path, lambda x: x.update(metadata_values=['e3c44ab51b8399da']))
        self.seal()
        with self.assertRaisesRegex(ValueError, 'probe inputs differ'):
            v.verify(self.repo, self.package)

    def test_replacing_added_object_and_receipt_rejected(self):
        root = self.package / 'metadata-option'
        data = v.raw(root / 'published/probe.o.gz')
        put(root / 'added/probe.o.gz', data)
        self.edit_json(root / 'added/result.json.gz', lambda x: x.update(object=v.identity(data)))
        self.seal()
        with self.assertRaisesRegex(ValueError, 'repeated metadata'):
            v.verify(self.repo, self.package)

    def test_altered_tiny_compiler_identity_rejected(self):
        path = self.package / 'metadata-option/native/launch.json.gz'
        self.edit_json(path, lambda x: x.update(compiler_sha256='0' * 64))
        self.seal()
        with self.assertRaisesRegex(ValueError, 'probe compiler differs'):
            v.verify(self.repo, self.package)


if __name__ == '__main__':
    unittest.main()
