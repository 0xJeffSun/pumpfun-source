"""Actual byte mutations on copies; originals/captures are never edited."""
import copy
import gzip
import importlib.util
import json
from pathlib import Path
import struct
import unittest

P = Path(__file__).resolve().parent
s = importlib.util.spec_from_file_location('tagged_audit_tests', P / 'audit.py')
a = importlib.util.module_from_spec(s)
s.loader.exec_module(a)


class Scope(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.original = (a.R / a.ORIGINAL).read_bytes()
        cls.candidate = gzip.decompress((a.R / a.SYMBOLS).read_bytes())
        cls.cohort = json.loads((a.R / a.COHORT).read_bytes())
        cls.expected = json.loads((P / 'expected.json').read_bytes())

    def rejected(self, changes):
        mutated = bytearray(self.candidate)
        for address, value in changes:
            mutated[address:address + len(value)] = value
        try:
            result = a.analyze(self.original, bytes(mutated), self.cohort)
        except (AssertionError, KeyError, StopIteration, UnicodeError, struct.error):
            return
        self.assertNotEqual(result['references'], self.expected['references'])

    def test_message_last_byte(self):
        self.rejected([(666913 + 26, b'X')])

    def test_kind_byte(self):
        self.rejected([(683944 + 16, b'\x26')])

    def test_message_length(self):
        self.rejected([(683944 + 8, struct.pack('<Q', 28))])

    def test_message_pointer(self):
        self.rejected([(683944 + 4, struct.pack('<I', 666914))])

    def test_table_item_count(self):
        self.rejected([(684232 + 24, struct.pack('<Q', 1))])

    def test_control_group_last_byte(self):
        self.rejected([(667592 + 7, b'\xfe')])

    def test_tagged_error_read_width(self):
        self.rejected([(624072 + 32, b'\x61')])

    def test_control_group_read_width(self):
        self.rejected([(40136 + 288, b'\x61')])

    def test_initializer_copy_width(self):
        self.rejected([(314560 + 5352 + 4, struct.pack('<i', 40))])

    def test_actual_incoming_call(self):
        self.rejected([(409168 + 896 + 4, struct.pack('<i', 1))])

    def test_vtable_formatter_routing(self):
        self.rejected([(690664 + 28, struct.pack('<I', 626592))])

    def test_no_padding_or_neighbor_extent_claim(self):
        # Integrity pins still reject these changed artifacts. The selected
        # contract deliberately does not observe error alignment padding or
        # the byte after the witnessed eight-byte control group.
        for address in (683944 + 17, 667592 + 8):
            mutated = bytearray(self.candidate)
            mutated[address] ^= 1
            result = a.analyze(self.original, bytes(mutated), self.cohort)
            self.assertNotEqual(a.digest(mutated), a.digest(self.candidate))
            self.assertEqual(result['references'], self.expected['references'])
            self.assertEqual(result['summary'], self.expected['summary'])


if __name__ == '__main__':
    unittest.main()
