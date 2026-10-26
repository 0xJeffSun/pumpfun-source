#!/usr/bin/env python3
"""Mutation tests ensuring the byte comparator cannot hide code/padding changes."""
import json
from pathlib import Path
import shutil
import struct
import subprocess
import sys
import tempfile
import unittest
from compare import compare
class ComparisonTests(unittest.TestCase):
    def test_equal(self): self.assertTrue(compare(b'abc\0\0',b'abc\0\0')['full_byte_equality'])
    def test_code_mutation(self): self.assertEqual(compare(b'abc\0\0',b'axc\0\0')['first_difference'],1)
    def test_padding_mutation(self): self.assertEqual(compare(b'abc\0\0',b'abc\0x')['first_difference'],4)
    def test_truncated_padding(self): self.assertFalse(compare(b'abc\0\0',b'abc\0')['full_byte_equality'])
    def test_extended_padding(self): self.assertFalse(compare(b'abc\0',b'abc\0\0')['full_byte_equality'])
    def test_empty(self): self.assertEqual(compare(b'a',b'')['first_difference'],0)
class ComparisonCliTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        (self.root / 'scripts').mkdir()
        source = Path(__file__).resolve().parent
        for name in ('compare.py', 'analyze.py'):
            shutil.copyfile(source / name, self.root / 'scripts' / name)
        (self.root / 'repro').mkdir()
        (self.root / 'repro/programs.json').write_text('{"pump": "fixture"}')
        (self.root / 'evidence/original/pump').mkdir(parents=True)
        # Minimal ELF64 with a null section and no loadable segments. Its file
        # extent is 128 bytes; allocation-tail tests append bytes after that.
        ident = b'\x7fELF\x02\x01' + bytes(10)
        header = struct.pack('<HHIQQQIHHHHHH', 3, 247, 1, 0, 0, 64,
                             0, 64, 56, 0, 64, 1, 0)
        self.raw = ident + header + bytes(64)
        self.original = self.root / 'evidence/original/pump/deployed.so'
        self.candidate = self.root / 'candidate.so'

    def run_comparison(self, original, candidate, *flags):
        self.original.write_bytes(original)
        self.candidate.write_bytes(candidate)
        output = self.root / 'comparison'
        process = subprocess.run(
            [sys.executable, str(self.root / 'scripts/compare.py'), 'pump',
             str(self.candidate), '--output', str(output), *flags],
            capture_output=True, text=True)
        # Allocation-image creation must never modify either input.
        self.assertEqual(self.original.read_bytes(), original)
        self.assertEqual(self.candidate.read_bytes(), candidate)
        report = output / 'comparison.json'
        return process, json.loads(report.read_text()) if report.exists() else None

    def test_raw_equal_strict_gate_succeeds(self):
        process, report = self.run_comparison(self.raw, self.raw, '--require-raw-equality')
        self.assertEqual(process.returncode, 0, process.stderr)
        self.assertTrue(report['candidate_input_comparison']['full_byte_equality'])
        self.assertEqual(report['comparison_scope'], 'unmodified_candidate_input')
        self.assertEqual(report['padding_bytes_added'], 0)

    def test_padding_equality_is_separate_from_raw_identity(self):
        process, report = self.run_comparison(self.raw + bytes(16), self.raw,
                                              '--pad-zero-to-allocation')
        self.assertEqual(process.returncode, 0, process.stderr)
        self.assertTrue(report['full_byte_equality'])
        self.assertFalse(report['candidate_input_comparison']['full_byte_equality'])
        self.assertEqual(report['candidate_input_comparison']['length_difference'], -16)
        self.assertEqual(report['candidate_input_comparison']['first_difference'], 128)
        self.assertEqual(report['candidate_input_sha256'],
                         report['candidate_input_comparison']['candidate_sha256'])
        self.assertEqual(report['comparison_scope'], 'zero_padded_allocation_image')
        self.assertEqual(report['padding_bytes_added'], 16)
        self.assertEqual((self.root / 'comparison/candidate.deployed.so').read_bytes(),
                         self.raw + bytes(16))

    def test_strict_gate_rejects_padding_only_equality(self):
        process, report = self.run_comparison(self.raw + bytes(16), self.raw,
                                              '--pad-zero-to-allocation',
                                              '--require-raw-equality')
        self.assertEqual(process.returncode, 1, process.stderr)
        self.assertTrue(report['full_byte_equality'])
        self.assertFalse(report['candidate_input_comparison']['full_byte_equality'])

    def test_strict_gate_accepts_equal_input_when_padding_adds_nothing(self):
        process, report = self.run_comparison(self.raw, self.raw,
                                              '--pad-zero-to-allocation',
                                              '--require-raw-equality')
        self.assertEqual(process.returncode, 0, process.stderr)
        self.assertEqual(report['padding_bytes_added'], 0)
        self.assertTrue(report['candidate_input_comparison']['full_byte_equality'])

    def test_short_input_fails_without_padding(self):
        process, report = self.run_comparison(self.raw + bytes(16), self.raw,
                                              '--require-raw-equality')
        self.assertEqual(process.returncode, 1, process.stderr)
        self.assertFalse(report['full_byte_equality'])

    def test_padding_cannot_hide_code_change(self):
        changed = bytearray(self.raw)
        changed[24] = 1  # Change the ELF entry point without invalidating layout.
        process, report = self.run_comparison(self.raw + bytes(16), bytes(changed),
                                              '--pad-zero-to-allocation',
                                              '--require-raw-equality')
        self.assertEqual(process.returncode, 1, process.stderr)
        self.assertFalse(report['full_byte_equality'])
        self.assertEqual(report['candidate_input_comparison']['first_difference'], 24)

    def test_nonzero_allocation_suffix_is_rejected(self):
        process, report = self.run_comparison(self.raw + b'\x01', self.raw,
                                              '--pad-zero-to-allocation')
        self.assertEqual(process.returncode, 2)
        self.assertIn('captured allocation suffix is nonzero', process.stderr)
        self.assertIsNone(report)

    def test_oversized_candidate_is_rejected(self):
        process, report = self.run_comparison(self.raw, self.raw + b'\0',
                                              '--pad-zero-to-allocation')
        self.assertEqual(process.returncode, 2)
        self.assertIn('candidate exceeds allocation', process.stderr)
        self.assertIsNone(report)


if __name__=='__main__': unittest.main()
