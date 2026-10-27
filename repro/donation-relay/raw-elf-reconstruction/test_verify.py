#!/usr/bin/env python3
"""Small offline mutation/format/path tests; no real target VM or receipt read."""
from pathlib import Path
import hashlib, json, shutil, struct, tempfile, unittest
from unittest.mock import patch
import allocate, elf_extent, prepare, verify
P = Path(__file__).resolve().parent

def tiny_elf():
    ident = b'\x7fELF\x02\x01\x01' + bytes(9)
    header = struct.pack('<16sHHIQQQIHHHHHH', ident, 3, 247, 1, 0, 64, 120, 0, 64, 56, 1, 64, 1, 0)
    program = struct.pack('<IIQQQQQQ', 1, 5, 184, 0, 0, 0, 0, 8)
    return header + program + bytes(64)

class Tests(unittest.TestCase):
    def test_packet(self):
        self.assertEqual(len(verify.verify_packet()), 492)
    def test_default_has_no_artifact_input(self):
        reads = []
        original = Path.read_bytes
        def read(p):
            reads.append(p)
            self.assertTrue(p.is_relative_to(P))
            self.assertNotIn(p.suffix, ('.so', '.gz', '.bin'))
            return original(p)
        with patch.object(Path, 'read_bytes', read):
            verify.verify_packet()
        self.assertTrue(reads)
    def test_extent(self):
        self.assertEqual(elf_extent.elf_extent(tiny_elf()), 184)
    def test_truncated(self):
        with self.assertRaises(ValueError): elf_extent.elf_extent(tiny_elf()[:-1])
    def test_wrong_class(self):
        data = bytearray(tiny_elf()); data[4] = 1
        with self.assertRaises(ValueError): elf_extent.elf_extent(data)
    def test_allocation(self):
        data = tiny_elf()
        self.assertEqual(allocate.allocation_image(data, 200), data + bytes(16))
        self.assertEqual(len(data), 184)
    def test_too_small(self):
        with self.assertRaises(ValueError): allocate.allocation_image(tiny_elf(), 183)
    def test_tail_not_compiler_input(self):
        with self.assertRaises(ValueError): allocate.allocation_image(tiny_elf() + bytes(8), 200)
    def test_raw_comparison_mutations(self):
        compiled = tiny_elf(); capture = compiled + bytes(16)
        with tempfile.TemporaryDirectory() as td:
            p = Path(td)
            (p/'expected.json').write_text(json.dumps({'capture_sha256':verify.H(capture),'capture_bytes':200,'compiler_elf_sha256':verify.H(compiled),'compiler_elf_bytes':184}))
            with patch.object(verify, 'P', p):
                self.assertTrue(verify.compare(capture, compiled, capture)['generated_allocation_image_equal'])
                for original, candidate, exported in [(capture, compiled[:-1]+b'\1', None),(capture[:-1]+b'\1', compiled, None),(capture, compiled, capture[:-1]+b'\1')]:
                    with self.assertRaises(ValueError): verify.compare(original, candidate, exported)
    def test_source_and_output_symlinks(self):
        with tempfile.TemporaryDirectory() as td:
            p = Path(td); base = p/'base'; base.mkdir(); (base/'lib.rs').write_text('pub fn value() -> u64 { 7 }\n')
            packet = p/'packet'; packet.mkdir()
            (packet/'baseline-inputs.json').write_text(json.dumps({'files':prepare.source_files(base)}))
            (packet/'inferred-text-layout.ld').write_text('/* metadata */\n')
            with patch.object(prepare, 'P', packet):
                self.assertEqual(len(prepare.prepare(base, p/'out')), 2)
                (p/'broken').symlink_to(p/'absent')
                with self.assertRaises(ValueError): prepare.prepare(base, p/'broken')
                (p/'ancestor').symlink_to(p/'out', target_is_directory=True)
                with self.assertRaises(ValueError): prepare.prepare(base, p/'ancestor'/'new')
                (base/'unexpected').write_text('extra')
                with self.assertRaises(ValueError): prepare.prepare(base, p/'mutant')
    def test_packet_mutation_and_symlink(self):
        with tempfile.TemporaryDirectory() as td:
            packet=Path(td)/'packet';shutil.copytree(P,packet,ignore=shutil.ignore_patterns('__pycache__'))
            with patch.object(verify,'P',packet):
                (packet/'unexpected').write_text('extra')
                with self.assertRaises(ValueError):verify.verify_packet()
                (packet/'unexpected').unlink();(packet/'unexpected').symlink_to(packet/'expected.json')
                with self.assertRaises(ValueError):verify.verify_packet()
    def test_order_directive_mutation(self):
        with tempfile.TemporaryDirectory() as td:
            packet=Path(td)/'packet';shutil.copytree(P,packet,ignore=shutil.ignore_patterns('__pycache__'))
            path=packet/'inferred-text-layout.ld';path.write_text(path.read_text().replace('    *(.text*)','    BYTE(0);\n    *(.text*)'))
            m=packet/'manifest.json';manifest=json.loads(m.read_text());manifest['files']['inferred-text-layout.ld']=verify.H(path.read_bytes());m.write_text(json.dumps(manifest))
            with patch.object(verify,'P',packet):
                with self.assertRaises(ValueError):verify.verify_packet()

if __name__ == '__main__':
    unittest.main()
