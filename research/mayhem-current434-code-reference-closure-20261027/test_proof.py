"""Mutation controls exercise executable bytes, not report counters."""
from pathlib import Path
import importlib.util
import os
import shutil
import struct
import tempfile
import unittest
from unittest.mock import patch

P = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('code_reference_proof', P / 'proof.py')
proof = importlib.util.module_from_spec(spec)
spec.loader.exec_module(proof)


def pointer(image, pc, target):
    changed = bytearray(image)
    struct.pack_into('<I', changed, pc + 4, target & 0xffffffff)
    struct.pack_into('<I', changed, pc + 12, target >> 32)
    return bytes(changed)


class MutationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.original, cls.candidate = proof.inputs()
        cls.report = proof.inspect(cls.original, cls.candidate)
        cls.o, cls.c = proof.elves(cls.original, cls.candidate)
        cls.site = cls.report['references'][0]

    def report_with_pointer(self, site, target):
        pc = site['candidate'] + site['offset']
        image = pointer(self.candidate, pc, target)
        report = proof.inspect(self.original, image)
        # Relocation normalization and direct-call closure alone miss this.
        self.assertEqual(report['summary']['matched_windows'], 434)
        self.assertEqual(report['summary']['direct_closed_windows'], 425)
        self.assertFalse(any(x['candidate'] == site['candidate']
                             and x['offset'] == site['offset'] and x['closed']
                             for x in report['references']))
        return report

    def test_retained_report(self):
        self.assertEqual(proof.verify(), self.report['summary'])

    @unittest.skipUnless(hasattr(os, 'mkfifo'), 'FIFO control needs a POSIX host')
    def test_unlisted_special_file_is_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            copied = Path(directory) / 'packet'
            shutil.copytree(P, copied)
            os.mkfifo(copied / 'unlisted.fifo')
            with patch.object(proof, 'P', copied):
                with self.assertRaisesRegex(AssertionError, 'Special file'):
                    proof.verify()

    def test_every_distinct_pointer_rejects_wrong_function(self):
        sites = {(x['candidate'], x['offset']): x for x in self.report['references']}
        for site in sites.values():
            with self.subTest(candidate=site['candidate'], offset=site['offset']):
                self.report_with_pointer(site, self.c.lo)

    def test_pointer_into_function_interior_is_unclosed(self):
        report = self.report_with_pointer(self.site, self.site['candidate_target'] + 8)
        self.assertGreater(report['summary']['malformed_pairs'], 0)

    def test_code_to_data_pointer_is_unclosed(self):
        report = self.report_with_pointer(self.site, self.c.sec['.rodata']['address'])
        self.assertGreater(report['summary']['malformed_pairs'], 0)

    def test_missing_pointer_relocation_changes_body(self):
        pc = self.site['candidate'] + self.site['offset']
        image = bytearray(self.candidate)
        struct.pack_into('<I', image, self.c.rel[pc]['record_offset'] + 8, 0)
        report = proof.inspect(self.original, bytes(image))
        self.assertFalse(any(x['candidate'] == self.site['candidate']
                             and x['offset'] == self.site['offset']
                             for x in report['references']))

    def test_pointee_body_corruption_propagates(self):
        # O0141's u8 Debug function pointer has a single target and caller.
        site = next(x for x in self.report['references'] if x['id'] == 'O0141')
        image = bytearray(self.candidate)
        image[site['candidate_target'] + 1] ^= 1
        report = proof.inspect(self.original, bytes(image))
        self.assertFalse(any(x['id'] == 'O0141' and x['closed']
                             for x in report['references']))
        self.assertLess(report['summary']['direct_and_code_reference_closed_windows'],
                        report['summary']['direct_closed_windows'])

    def test_non_code_data_remains_explicitly_outside_scope(self):
        address = next(x['candidate'] for x in self.report['references'] if x['id'] == 'O0072')
        windows, _ = proof.matcher.tables(self.c)
        data = next(x for x in windows[address]['data_references'] if x['kind'] == 'data')
        changed = pointer(self.candidate, address + data['offset'],
                          self.c.sec['.rodata']['address'])
        report = proof.inspect(self.original, changed)
        self.assertEqual(report['summary'], self.report['summary'])
        self.assertNotEqual(report['candidate_symbols_sha256'],
                            self.report['candidate_symbols_sha256'])


if __name__ == '__main__':
    unittest.main(verbosity=2)
