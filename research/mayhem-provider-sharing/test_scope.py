"""Corruption controls for source sharing and its deliberately incomplete proof."""
from pathlib import Path
import copy
import json
import struct
import tempfile
import unittest
from unittest.mock import patch
import sys

sys.dont_write_bytecode = True
import verify as v


class Scope(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory()
        cls.directory = Path(cls.tmp.name)
        cls.reader = v.module('scope_reader', v.P / 'reader.py')
        cls.providers = v.module('scope_providers', v.P / 'providers.py')
        cls.original = cls.reader.Elf(v.ROOT / 'evidence/original/mayhem/deployed.so')
        cls.rows = v.load(v.ROOT / v.PARENT / 'audit.json')['rows']
        cls.before_bytes = v.raw(v.ROOT / v.PARENT / 'artifacts/recovered/symbols.so.gz')
        cls.after_bytes = v.raw(v.P / 'artifacts/recovered/symbols.so.gz')
        cls.before = cls.image(cls.before_bytes, 'before')
        cls.after = cls.image(cls.after_bytes, 'after')
        cls.proof = v.load(v.P / 'provider-proof.json')

    @classmethod
    def image(cls, data, name):
        p = cls.directory / name
        p.write_bytes(data)
        return cls.reader.Elf(p)

    @classmethod
    def tearDownClass(cls):
        cls.tmp.cleanup()

    def check(self, image):
        return self.providers.inspect(self.original, self.before, image, self.rows)

    def test_current_provider_relationships(self):
        self.assertEqual(self.check(self.after), self.proof)

    def test_old_duplicate_providers_rejected(self):
        with self.assertRaises(AssertionError):
            self.check(self.before)

    def test_constructor_instruction_corruption(self):
        b = bytearray(self.after_bytes)
        b[self.proof['constructor']['candidate']] ^= 1
        with self.assertRaises(AssertionError):
            self.check(self.image(bytes(b), 'instruction'))

    def test_normalized_call_redirect_rejected(self):
        b = bytearray(self.after_bytes)
        ctor = self.proof['constructor']
        call = ctor['immediate_callees'][0]
        pc = ctor['candidate'] + call['offset']
        other = ctor['candidate']
        struct.pack_into('<i', b, pc + 4, (other - pc - 8) // 8)
        self.assertEqual(self.after.norm(ctor['candidate'], ctor['candidate'] + ctor['bytes']),
                         self.image(bytes(b), 'redirect').norm(ctor['candidate'], ctor['candidate'] + ctor['bytes']))
        with self.assertRaises(AssertionError):
            self.check(self.image(bytes(b), 'redirect-check'))

    def test_vtable_scalar_corruption(self):
        ctor = self.proof['constructor']
        table = self.after.window(ctor['candidate'], ctor['candidate'] + ctor['bytes'])['data_references'][0]['target']
        b = bytearray(self.after_bytes)
        b[table + 8] ^= 1
        with self.assertRaises(AssertionError):
            self.check(self.image(bytes(b), 'vtable'))

    def test_unlisted_nested_manifest_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            p = Path(td)
            (p / 'file').write_bytes(b'evidence')
            (p / 'manifest.json').write_text(json.dumps({'file': v.sha(b'evidence')}))
            v.manifest(p)
            (p / 'nested').mkdir()
            (p / 'nested/manifest.json').write_text('{}')
            with self.assertRaises(AssertionError):
                v.manifest(p)

    def test_parent_source_substitution_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            p = Path(td)
            (p / 'source.tar.gz').write_bytes((v.ROOT / v.PARENT / 'source.tar.gz').read_bytes())
            for name in ('source-inputs.json', 'source.patch'):
                (p / name).write_bytes(v.raw(v.P / name))
            with patch.object(v, 'P', p), self.assertRaises(AssertionError):
                v.sources(v.ROOT)

    def test_initializer_case_inventory_rejected(self):
        m = v.module('scope_runtime', v.P / 'runtime_check.py')
        original_load = m.load

        def changed(path):
            value = original_load(path)
            if path == v.P / 'runtime/qualified/rejections.json.gz':
                value = copy.deepcopy(value)
                value['cases'][0], value['cases'][1] = value['cases'][1], value['cases'][0]
            return value

        candidate = v.raw(v.P / 'artifacts/recovered/candidate.so.gz')
        previous = v.raw(v.ROOT / v.PARENT / 'artifacts/unqualified/candidate.so.gz')
        with patch.object(m, 'load', changed), self.assertRaises(AssertionError):
            m.verify(v.ROOT, candidate, previous)


if __name__ == '__main__':
    unittest.main()
