import struct
from types import SimpleNamespace
import unittest

from generate import ROOT, corrected_module


class RelativeCallTests(unittest.TestCase):
    def test_register_nibble_and_loader_relocations(self):
        decoder = corrected_module().decode_instruction
        data = struct.pack('<BBhi', 0x85, 0x10, 0, 1)
        internal, size = decoder(data, 0, SimpleNamespace(funcs=[], relocations={}))
        self.assertEqual(size, 8)
        self.assertEqual(internal['call_target'], 16)
        self.assertNotIn('extern_symbol', internal)
        external, _ = decoder(data, 0, SimpleNamespace(funcs=[], relocations={0: {'type': 10, 'symbol': 'sol_log_'}}))
        self.assertEqual(external['extern_symbol'], 'sol_log_')
        self.assertNotIn('call_target', external)
        syscall, _ = decoder(struct.pack('<BBhi', 0x85, 0, 0, 123), 0, SimpleNamespace(funcs=[], relocations={}))
        self.assertIn('syscall', syscall)

    def test_original_relative_call_targets_are_all_recovered(self):
        module = corrected_module()
        from window_elf_reader import Elf
        for program, count in [('pump', 10591), ('pump_amm', 7223), ('mayhem', 4768)]:
            elf = Elf(ROOT / f'evidence/original/{program}/deployed.so')
            with self.subTest(program=program):
                self.assertEqual(len(elf.calls), count)
                for offset, target in elf.calls.items():
                    row, _ = module.decode_instruction(elf.b, offset, elf)
                    self.assertEqual(row['call_target'], target)
                    self.assertNotIn('extern_symbol', row)


if __name__ == '__main__':
    unittest.main()
