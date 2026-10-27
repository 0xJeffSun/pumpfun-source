import copy
import importlib.util
import io
import json
import os
from pathlib import Path
import shutil
import struct
import subprocess
import sys
import tarfile
import tempfile
import unittest
from unittest.mock import patch

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('alloc_verify', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
a = v.load_analysis()
REPO = Path(os.environ.get('ALLOC_PROVENANCE_REPO', HERE.parents[1]))


class ProvenanceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        v.pin_files(REPO, v.read(HERE / 'inputs.json')['files'])
        cls.elf, cls.method = a.helpers(REPO)
        cls.objects = a.load_objects()
        cls.metadata = a.read(HERE / 'provenance.json')
        cls.result = a.derive(REPO)
        cls.row = cls.result['hosts']['linux']['selected_type_id']
        cls.key = 'linux/' + cls.row['object_sha256'] + '.o'
        cls.obj = cls.elf.Elf(cls.objects[cls.key])
        cls.f = cls.row['function']
        cls.capture = cls.elf.Elf((REPO / a.CAPTURE).read_bytes())

    def test_complete_reproduction(self):
        result = v.verify(REPO)
        self.assertEqual(result['raw_capture_ranges'], 2)
        self.assertEqual(result['new_raw_ranges'], 0)
        self.assertEqual(result['paired_linked_functions'], 4)
        self.assertFalse(result['historical_type_identity_proven'])
        self.assertTrue(all(not x['release_membership_rechecked'] for x in result['archive_checks'].values()))

    def test_all_objects_and_family_selection(self):
        self.assertEqual(len(self.objects), 4)
        for host, row in self.result['hosts'].items():
            self.assertEqual(row['total_object_function_records'], 99)
            self.assertEqual(len(row['selected_type_id']['object_references']), 1)
            self.assertEqual(len(row['selected_type_id']['linked_functions']), 2)
        self.assertFalse(self.result['hosts']['darwin']['selected_type_id']['capture_matches'])

    def test_constants_are_only_host_body_difference(self):
        self.assertEqual(len(self.result['host_body_differing_offsets']), 16)
        self.assertEqual(self.row['constants'], dict(r0='0xb48b06e23bc32191', r1='0x802914a71efcf08e'))
        self.assertEqual(self.result['possible_linked_to_capture_pairs'], 4)
        self.assertFalse(self.result['unique_copy_attribution'])

    def test_wrong_lddw_destination_rejected(self):
        raw = bytearray.fromhex(self.row['raw_hex']); raw[1] = 2
        with self.assertRaisesRegex(ValueError, 'LDDW shape'):
            a.decode_type_id(raw)

    def test_nonzero_continuation_rejected(self):
        raw = bytearray.fromhex(self.row['raw_hex']); raw[8] = 1
        with self.assertRaisesRegex(ValueError, 'LDDW shape'):
            a.decode_type_id(raw)

    def test_wrong_terminal_instruction_rejected(self):
        raw = bytearray.fromhex(self.row['raw_hex']); raw[32] = 0x85
        with self.assertRaisesRegex(ValueError, 'terminal instruction'):
            a.decode_type_id(raw)

    def test_changed_constant_fails_linked_binding_without_hash_gate(self):
        objects = dict(self.objects)
        raw = bytearray(objects[self.key]); raw[self.f['offset'] + 4] ^= 1
        objects[self.key] = bytes(raw)
        with patch.object(a, 'load_objects', return_value=objects):
            with self.assertRaisesRegex(ValueError, 'linked body differs'):
                a.derive(REPO)

    def table(self):
        table = self.row['object_references'][0]
        index = table['section_index']
        section = self.obj.sections[index]
        return table, section, index

    def test_redirected_table_relocation_rejected(self):
        table, section, index = self.table()
        rel, = [r for r in self.obj.sections if r['type'] == 9 and r['info'] == index]
        target_symbol = next(r['symbol_index'] for r in table['relocations'] if r['offset'] == 24)
        raw = bytearray(self.obj.data)
        for at in range(rel['offset'], rel['offset'] + rel['size'], 16):
            if struct.unpack_from('<Q', raw, at)[0] == 56:
                struct.pack_into('<Q', raw, at + 8, (target_symbol << 32) | 1)
                break
        with self.assertRaisesRegex(ValueError, 'one referring StringError table'):
            a.object_references(self.elf.Elf(bytes(raw)), self.f)

    def test_changed_table_size_word_rejected(self):
        _, section, _ = self.table()
        raw = bytearray(self.obj.data); struct.pack_into('<Q', raw, section['offset'] + 8, 16)
        with self.assertRaisesRegex(ValueError, 'size/alignment'):
            a.object_references(self.elf.Elf(bytes(raw)), self.f)

    def test_nonzero_object_addend_rejected(self):
        _, section, _ = self.table()
        raw = bytearray(self.obj.data); raw[section['offset'] + 56] = 1
        with self.assertRaisesRegex(ValueError, 'object pointer addend'):
            a.object_references(self.elf.Elf(bytes(raw)), self.f)

    def test_nonzero_capture_pointer_low_word_rejected(self):
        pointer = self.row['capture_matches'][0]['start_pointer_references'][0]
        raw = bytearray(self.capture.data); raw[pointer['file_offset']] = 1
        with self.assertRaisesRegex(ValueError, 'stored pointer low word'):
            a.capture_matches(self.elf.Elf(bytes(raw)), bytes.fromhex(self.row['raw_hex']), self.method)

    def test_capture_pointer_to_continuation_rejected(self):
        pointer = self.row['capture_matches'][0]['start_pointer_references'][0]
        raw = bytearray(self.capture.data)
        struct.pack_into('<Q', raw, pointer['file_offset'], (pointer['target'] + 8) << 32)
        with self.assertRaisesRegex(ValueError, 'continuation/noninstruction'):
            a.capture_matches(self.elf.Elf(bytes(raw)), bytes.fromhex(self.row['raw_hex']), self.method)

    def test_loader_relocation_overlap_rejected(self):
        raw = bytearray(self.capture.data)
        _, rel = self.capture.section_named('.rel.dyn')
        for at in range(rel['offset'], rel['offset'] + rel['size'], 16):
            address, info = struct.unpack_from('<QQ', raw, at)
            if info & 0xffffffff == 8 and address not in (728232, 731888, 732032):
                struct.pack_into('<Q', raw, at, 599768)
                break
        else:
            self.fail('missing negative-control relocation')
        with self.assertRaisesRegex(ValueError, 'loader relocation overlap'):
            a.capture_matches(self.elf.Elf(bytes(raw)), bytes.fromhex(self.row['raw_hex']), self.method)

    def test_arbitrary_tar_member_rejected_without_extraction(self):
        with tempfile.TemporaryDirectory() as temp:
            p = Path(temp)
            shutil.copyfile(HERE / 'provenance.json', p / 'provenance.json')
            with tarfile.open(p / 'objects.tar.gz', 'w:gz') as t:
                member = tarfile.TarInfo('../escape'); member.size = 1
                t.addfile(member, io.BytesIO(b'x'))
            with self.assertRaisesRegex(ValueError, 'unexpected/duplicate'):
                a.load_objects(p)
            self.assertFalse((p.parent / 'escape').exists())

    def test_wrong_release_archive_rejected(self):
        with tempfile.TemporaryDirectory() as temp:
            p = Path(temp) / 'archive'; p.write_bytes(b'not the release')
            with self.assertRaisesRegex(ValueError, 'release archive size differs'):
                v.archive_membership(p, 'linux', self.metadata, self.objects, self.elf)

    def test_minimal_relocated_isolated_cli(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp); package = root / 'research/mayhem-alloc-typeid-provenance'
            package.mkdir(parents=True)
            for row in v.read(HERE / 'manifest.json')['files'] + [dict(path='manifest.json')]:
                target = package / row['path']; target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(HERE / row['path'], target)
            for row in v.read(HERE / 'inputs.json')['files']:
                target = root / row['path']; target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(REPO / row['path'], target)
            run = subprocess.run([sys.executable, '-I', '-B', str(package / 'verify.py')],
                                 cwd=root, capture_output=True, text=True)
            self.assertEqual(run.returncode, 0, run.stderr)
            self.assertEqual(json.loads(run.stdout)['raw_capture_ranges'], 2)


if __name__ == '__main__':
    unittest.main()
