"""Adversarial controls for the new source, Sharing body, targets and receipts."""
from pathlib import Path
from functools import lru_cache
import hashlib
import json
import struct
import tempfile
import unittest
from unittest.mock import patch
import sys

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import verify as v


class SharingControls(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.w = v.module('test_sharing_windows', v.ROOT / 'research/fees-composed-frontier188/window_map.py')
        cls.w.m.elf_layout = lru_cache(maxsize=8)(cls.w.m.elf_layout)
        cls.w.m.relocations = lru_cache(maxsize=8)(cls.w.m.relocations)
        cls.parent = v.module('test_sharing_parent', v.PARENT / 'verify.py')
        cls.prior = v.module('test_sharing_prior', v.ROOT / 'research/fees-qualified-linker-layout/verify.py')
        cls.original = (v.ROOT / 'evidence/original/pump_fees/deployed.so').read_bytes()
        cls.image = v.read(HERE / 'builds/candidate/symbols.so')
        cls.before = cls.parent.read(v.PARENT / 'artifacts/candidate-symbols.so')
        cls.frame = next(x for x in cls.w.windows(cls.image) if 'create_fee_sharing_config14create_sharing' in (x['name'] or ''))
        cls.rows = list(cls.w.m.instructions(cls.image, cls.frame['address'], cls.frame['bytes']))
        cls.relocations = dict(cls.w.m.relocations(cls.image))

    def file_offset(self, address):
        section = next(x for x in self.w.m.elf_layout(self.image)['sections']
                       if x['address'] <= address < x['address'] + x['size'] and x['flags'] & 2)
        return section['offset'] + address - section['address']

    def reject_body(self, image):
        with self.assertRaises((AssertionError, KeyError, ValueError)):
            v.check_sharing(self.w, self.original, image)

    def test_complete_sharing_body_passes(self):
        self.assertEqual(v.check_sharing(self.w, self.original, self.image),
                         {'instructions': 1510, 'direct_targets': 64, 'external_targets': 1})

    def test_previous_unmatched_body_rejected(self):
        self.reject_body(self.before)

    def test_changed_load_rejected(self):
        image = bytearray(self.image)
        image[self.file_offset(self.frame['address'] + 176)] ^= 1
        self.reject_body(bytes(image))

    def test_redirected_normalized_call_rejected(self):
        call = next(x for x in self.rows if 'call_target' in x and self.relocations.get(self.frame['address'] + x['offset'], 0) & 0xffffffff != 10)
        target = next(x for x in self.w.windows(self.image)
                      if x['signature'] != next(y['signature'] for y in self.w.windows(self.image) if y['address'] == call['call_target']))
        at = self.frame['address'] + call['offset']
        image = bytearray(self.image)
        struct.pack_into('<i', image, self.file_offset(at) + 4, (target['address'] - at - 8) // 8)
        changed = next(x for x in self.w.windows(bytes(image)) if x['address'] == self.frame['address'])
        self.assertEqual(changed['signature'], self.frame['signature'])
        self.reject_body(bytes(image))

    def test_redirected_external_symbol_rejected(self):
        call = next(x for x in self.rows if self.relocations.get(self.frame['address'] + x['offset'], 0) & 0xffffffff == 10)
        at = self.frame['address'] + call['offset']
        symbols = self.w.dynamic_symbols(self.image)
        old = self.relocations[at] >> 32
        new = next(i for i, x in enumerate(symbols) if x['index'] == 0 and x['name'] and x['name'] != symbols[old]['name'])
        image = bytearray(self.image)
        rel = next(x for x in self.w.m.elf_layout(self.image)['sections'] if x['name'] == '.rel.dyn')
        field = next(p for p in range(rel['offset'], rel['offset'] + rel['size'], 16)
                     if struct.unpack_from('<Q', image, p)[0] == at)
        struct.pack_into('<Q', image, field + 8, (new << 32) | 10)
        self.reject_body(bytes(image))

    def test_nonpointer_data_mutation_rejected(self):
        image = bytearray(self.image)
        section = next(x for x in self.w.m.elf_layout(self.image)['sections'] if x['name'] == '.data.rel.ro')
        image[section['offset'] + 16] ^= 1
        with self.assertRaises(AssertionError):
            self.parent.check_data(self.w, self.original, bytes(image), v.read(HERE / 'builds/candidate/link.map').decode())

    def test_linker_byte_injection_rejected(self):
        with self.assertRaises(AssertionError):
            v.check_recipe(self.parent, v.load(HERE / 'layout/readonly-order.json'),
                           v.read(HERE / 'layout/ordered.ld') + b'BYTE(0)\n')

    def test_previous_source_substitution_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            path = root / 'overrides' / v.SOURCE
            path.parent.mkdir(parents=True)
            path.write_bytes(self.parent.source_inputs()[v.SOURCE])
            (root / 'source-inputs.json').write_bytes(v.read(HERE / 'source-inputs.json'))
            (root / 'source.patch').write_bytes(v.read(HERE / 'source.patch'))
            with patch.object(v, 'HERE', root):
                with self.assertRaises(AssertionError):
                    v.source_inputs(self.parent)

    def test_unlisted_nested_manifest_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'proof.txt').write_text('retained evidence\n')
            (root / 'manifest.json').write_text(json.dumps({'proof.txt': hashlib.sha256((root / 'proof.txt').read_bytes()).hexdigest()}))
            v.check_manifest(root)
            (root / 'nested').mkdir()
            (root / 'nested/manifest.json').write_text('{}')
            with self.assertRaises(AssertionError):
                v.check_manifest(root)

    def test_runtime_count_mutation_rejected(self):
        with self.assertRaises(AssertionError):
            self.prior.check_runtime({'candidate_sha256': v.sha(self.image), 'original_sha256': v.sha(self.original), 'case_count': 17330},
                                     {}, v.sha(self.original), v.sha(self.image))


if __name__ == '__main__':
    unittest.main()
