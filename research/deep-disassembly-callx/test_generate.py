"""Regression checks for immediate-form register calls."""
from collections import Counter
from pathlib import Path
import struct
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parent))
import generate
from generate import ROOT, archived_module, corrected_module

# Register numbers in the immediate of every retained opcode 0x8d.
EXPECTED = {
    'pump': {2: 61, 3: 21, 4: 54, 5: 3, 9: 5},
    'pump_amm': {2: 40, 3: 21, 4: 54, 5: 3, 9: 5},
    'pump_fees': {2: 51, 3: 18, 4: 44, 5: 3, 9: 5},
    'mayhem': {2: 25, 3: 20, 4: 34, 5: 4, 7: 5, 8: 3, 9: 2},
    'relay': {2: 33, 3: 15, 4: 34, 5: 3, 7: 2, 8: 2},
}
PATHS = {
    'pump': ROOT / 'evidence/original/pump/deployed.so',
    'pump_amm': ROOT / 'evidence/original/pump_amm/deployed.so',
    'pump_fees': ROOT / 'evidence/original/pump_fees/deployed.so',
    'mayhem': ROOT / 'evidence/original/mayhem/deployed.so',
    'relay': ROOT / 'evidence/dependencies/donation_relay/deployed.so',
}


def encode(dst, src, off, imm):
    return struct.pack('<BBhi', 0x8d, (src << 4) | dst, off, imm)


class CallxTests(unittest.TestCase):
    def test_immediate_form_and_rejected_shapes(self):
        decoder = corrected_module().decode_instruction
        elf = type('Elf', (), {'funcs': [], 'relocations': {}})()
        accepted, size = decoder(encode(0, 0, 0, 2), 0, elf)
        self.assertEqual(size, 8)
        self.assertEqual(accepted['mnemonic'], 'callx r2')
        self.assertNotIn('call_target', accepted)
        self.assertNotIn('syscall', accepted)
        self.assertNotIn('extern_symbol', accepted)
        self.assertEqual(decoder(encode(0, 0, 0, 10), 0, elf)[0]['mnemonic'], 'callx r10')
        for raw in (encode(0, 0, 0, 11), encode(0, 0, 0, -1), encode(0, 2, 0, 0), encode(3, 0, 0, 0), encode(0, 0, 1, 2)):
            row, _ = decoder(raw, 0, elf)
            self.assertTrue(row['mnemonic'].startswith('raw_0x8d '), row['mnemonic'])

    def test_reviewed_checkout_forms_and_source_drift(self):
        original = generate.SOURCE.read_bytes().replace(b'\r\n', b'\n')
        with tempfile.TemporaryDirectory() as folder:
            source = Path(folder) / 'deep_disassembly.py'
            with patch.object(generate, 'SOURCE', source):
                for data in (original, original.replace(b'\n', b'\r\n')):
                    source.write_bytes(data)
                    self.assertEqual(corrected_module().decode_instruction(encode(0, 0, 0, 4), 0, type('Elf', (), {})())[0]['mnemonic'], 'callx r4')
                source.write_bytes(original + b'\n# changed\n')
                with self.assertRaisesRegex(ValueError, 'reviewed disassembler source'):
                    corrected_module()

    def test_original_register_calls(self):
        archived = archived_module().decode_instruction
        corrected = corrected_module().decode_instruction
        from window_elf_reader import Elf
        for program, expected in EXPECTED.items():
            elf = Elf(PATHS[program])
            found = Counter()
            changed = 0
            other_changes = 0
            for start, end in zip(elf.entries, elf.entries[1:] + [elf.hi]):
                at = start
                while at < end:
                    before, before_size = archived(elf.b, at, elf)
                    after, after_size = corrected(elf.b, at, elf)
                    self.assertEqual(before_size, after_size)
                    if before['opcode'] == '0x8d':
                        self.assertEqual(after['mnemonic'], f"callx r{before['imm']}")
                        self.assertEqual(before['mnemonic'], f"raw_0x8d r0,r0,0,{before['imm']}")
                        found[before['imm']] += 1
                    mnemonic_changed = before['mnemonic'] != after['mnemonic']
                    before_copy = dict(before)
                    after_copy = dict(after)
                    before_copy.pop('mnemonic')
                    after_copy.pop('mnemonic')
                    self.assertEqual(before_copy, after_copy)
                    if mnemonic_changed:
                        changed += 1
                        if before['opcode'] != '0x8d':
                            other_changes += 1
                    at += after_size
            with self.subTest(program=program):
                self.assertEqual(dict(found), expected)
                self.assertEqual(changed, sum(expected.values()))
                self.assertEqual(other_changes, 0)

    def test_mayhem_witness(self):
        from window_elf_reader import Elf
        elf = Elf(PATHS['mayhem'])
        offset = 0x638
        self.assertEqual(elf.b[offset:offset + 8].hex(), '8d00000002000000')
        before, _ = archived_module().decode_instruction(elf.b, offset, elf)
        after, _ = corrected_module().decode_instruction(elf.b, offset, elf)
        self.assertEqual(before['mnemonic'], 'raw_0x8d r0,r0,0,2')
        self.assertEqual(after['mnemonic'], 'callx r2')


if __name__ == '__main__':
    unittest.main()
