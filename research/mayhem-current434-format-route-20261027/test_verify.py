"""Mutate ELF operands/data and exercise the trace model's boundary rules."""
from pathlib import Path
import importlib.util
import os
import shutil
import struct
import tempfile
import unittest
from unittest.mock import patch

P = Path(__file__).resolve().parent


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


reader = module('format_test_reader', P / 'reader.py')
verifier = module('format_test_verifier', P / 'verify.py')


class RouteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.original, cls.candidate = reader.proof.inputs()
        cls.o, cls.c = reader.proof.elves(cls.original, cls.candidate)
        cls.report = reader.inspect()
        cls.trace = cls.report['traces'][1]
        rows = reader.json.loads((reader.proof.M / 'original-windows.json').read_text())
        cls.ow = {r['start']: cls.o.window(r['start'], r['start']+r['bytes']) for r in rows}
        cls.cw, _ = reader.proof.matcher.tables(cls.c)
        cls.groups, _, _closed, _ = reader.proof.matcher.relation(cls.ow, cls.cw)
        cls.caller = cls.groups[reader.proof.matcher.key(cls.ow[reader.ROLES['anchor_program_error_log']])][0]

    def offset(self, address):
        section = next(s for s in self.c.sections if s['type'] != 8 and s['address'] <= address < s['address']+s['size'])
        return section['offset']+address-section['address']

    def set_lddw(self, image, address, target):
        at = self.offset(address)
        struct.pack_into('<I', image, at+4, target & 0xffffffff)
        struct.pack_into('<I', image, at+12, target >> 32)

    def rejected(self, image, tag=1):
        with self.assertRaises(AssertionError):
            reader.inspect((self.original, bytes(image)), tag=tag)

    def test_saved_verification(self):
        self.assertEqual(verifier.verify()['unique_indirect_sites'], 3)

    def test_masked_argument_formatter(self):
        changed = bytearray(self.candidate)
        self.set_lddw(changed, self.caller+176, 0)
        self.rejected(changed)

    def test_writer_vtable_slot(self):
        word = next(x for x in self.trace['data_reads'] if x['caller']=='fmt_write' and x['offset']==648)
        changed = bytearray(self.candidate)
        struct.pack_into('<I', changed, self.offset(word['address'])+4, 0)
        self.rejected(changed)

    def test_prefix_literal(self):
        event = next(x for x in self.trace['events'] if x['callee']=='string_write_str')
        changed = bytearray(self.candidate)
        changed[self.offset(event['string_pointer'])] ^= 1
        self.rejected(changed)

    def test_each_debug_literal(self):
        for tag in range(1,26):
            with self.subTest(tag=tag):
                event = reader.inspect(tag=tag)['traces'][1]['events'][-1]
                changed = bytearray(self.candidate)
                changed[self.offset(event['string_pointer'])] ^= 1
                self.rejected(changed, tag)

    def test_piece_lengths(self):
        lengths = [x for x in self.trace['data_reads'] if x['caller']=='format_inner' and x['offset']==56]
        self.assertEqual(len(lengths), 4)
        for word in lengths:
            with self.subTest(address=word['address']):
                changed = bytearray(self.candidate)
                struct.pack_into('<Q', changed, self.offset(word['address']), word['value']+1)
                self.rejected(changed)
        changed = bytearray(self.candidate)
        for word, delta in zip(lengths, [1,-1,0,0]):
            struct.pack_into('<Q', changed, self.offset(word['address']), word['value']+delta)
        self.rejected(changed)

    def test_callback_register(self):
        address = next(x['target'] for x in self.trace['events'] if x['callee']=='fmt_write')
        changed = bytearray(self.candidate)
        struct.pack_into('<i', changed, self.offset(address+720)+4, 4)
        self.rejected(changed)

    def test_equivalent_alias_positive(self):
        actual = next(x['target'] for x in self.trace['events'] if x['callee']=='program_error_debug')
        alias = next(a for a in self.groups[reader.proof.matcher.key(self.ow[reader.ROLES['program_error_debug']])] if a!=actual)
        changed = bytearray(self.candidate)
        self.set_lddw(changed, self.caller+176, alias)
        self.assertEqual(reader.inspect((self.original, bytes(changed)))['selected_indirect_dispatches'], 3)

    def test_beyond_counted_literal_positive(self):
        event = self.trace['events'][-1]
        changed = bytearray(self.candidate)
        changed[self.offset(event['string_pointer']+event['length'])] ^= 1
        self.assertEqual(reader.inspect((self.original, bytes(changed)))['selected_indirect_dispatches'], 3)

    @unittest.skipUnless(hasattr(os, 'mkfifo'), 'POSIX special-file check')
    def test_special_file_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            copied = Path(directory)/'packet'
            shutil.copytree(P, copied)
            os.mkfifo(copied/'unlisted.fifo')
            with patch.object(verifier, 'P', copied), self.assertRaises(AssertionError):
                verifier.verify()


class ModelTests(unittest.TestCase):
    def interpret(self, code):
        t = reader.Trace.__new__(reader.Trace)
        t.reg = [0]*11
        t.pc = t.start = 0
        t.role = 'test'
        t.side = 'test'
        t.steps, t.events, t.data_reads, t.frames = [],[],[],[]
        t.image = type('Image',(),{'rel':{}})()
        t.raw = lambda address,size: code[address:address+size]
        t.call = lambda *args: True
        t.run()
        return t.reg[0]

    def instruction(self, op, value=0, off=0):
        return struct.pack('<BBhi',op,0,off,value)

    def test_u64_arithmetic(self):
        i = self.instruction
        self.assertEqual(self.interpret(i(0xb7,-1)+i(0x07,1)+i(0x8d)),0)
        self.assertEqual(self.interpret(i(0xb7,-1)+i(0x27,2)+i(0x8d)),reader.MASK-1)
        self.assertEqual(self.interpret(i(0xb7,-1)+i(0x67,1)+i(0x8d)),reader.MASK-1)

    def test_signed_comparisons(self):
        i = self.instruction
        for op,expected in [(0x65,7),(0x75,7),(0xd5,reader.MASK)]:
            with self.subTest(op=op):
                self.assertEqual(self.interpret(i(0xb7,-1)+i(op,0,1)+i(0xb7,7)+i(0x8d)),expected)

    def test_overlapping_opaque_memory(self):
        t = reader.Trace.__new__(reader.Trace)
        t.mem = {}
        p = 1<<40
        t.write(p,8,0)
        t.write(p+3,2,None)
        self.assertIsNone(t.read(p,8))
        self.assertIsNone(t.read(p+2,4))
        self.assertEqual(t.read(p,2),0)
        t.write(p+3,1,9)
        self.assertIsNone(t.read(p,8))
        t.write(p+4,1,7)
        self.assertEqual(t.read(p,8),9<<24|7<<32)


if __name__ == '__main__':
    unittest.main(verbosity=2)
