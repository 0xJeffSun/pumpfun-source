"""Counterexamples for raw function identity and evidence bindings."""
from pathlib import Path
import gzip
import importlib.util
import json
import shutil
import socket
import struct
import subprocess
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('scanner_verify_test', ROOT / 'verify.py')
v = importlib.util.module_from_spec(spec); spec.loader.exec_module(v)
c = v.c

class EvidenceTests(unittest.TestCase):
    def copy(self):
        directory = tempfile.TemporaryDirectory(); self.addCleanup(directory.cleanup)
        destination = Path(directory.name) / 'packet'
        shutil.copytree(ROOT, destination)
        return destination

    def seal(self, root):
        data = {p.relative_to(root).as_posix(): c.sha(p.read_bytes()) for p in root.rglob('*')
                if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
        (root / 'manifest.json').write_text(json.dumps(data, indent=2) + '\n')

    def save(self, path, data):
        data = (json.dumps(data, indent=2) + '\n').encode()
        path.write_bytes(gzip.compress(data, mtime=0) if path.suffix == '.gz' else data)

    def rewrite_object(self, root, data, archive=True):
        directory = root / 'evidence/controller-recovered'
        old = v.raw(directory / 'crate.o.gz')
        result = v.read(directory / 'result.json.gz')
        container = v.raw(directory / (c.ARCHIVE + '.gz'))
        self.assertEqual(container.count(old), 1)
        if archive:
            container = container.replace(old, data, 1)
            (directory / (c.ARCHIVE + '.gz')).write_bytes(gzip.compress(container, mtime=0))
        (directory / 'crate.o.gz').write_bytes(gzip.compress(data, mtime=0))
        body = c.functions(data)[c.SYMBOL]['data']
        (directory / 'supported_mint_data.bin.gz').write_bytes(gzip.compress(body, mtime=0))
        result.update(object_sha256=c.sha(data), archive_sha256=c.sha(container), sha256=c.sha(body), bytes=len(body))
        self.save(directory / 'result.json.gz', result)
        self.seal(root)

    def test_relocated_replay_without_network_or_processes(self):
        root = self.copy()
        with patch.object(socket, 'socket', side_effect=AssertionError('network forbidden')), patch.object(subprocess, 'Popen', side_effect=AssertionError('process forbidden')):
            report = v.verify(root)
        self.assertEqual(sum(row['original_equal'] for row in report['cases'].values()), 4)
        self.assertFalse(report['whole_amm_build'])

    def test_same_size_branch_change_is_not_normalized_away(self):
        root = self.copy(); data = bytearray(v.raw(root / 'evidence/controller-recovered/crate.o.gz'))
        rows, _ = c.sections(data); function = c.functions(data)[c.SYMBOL]
        at = rows[function['section']][4] + function['value'] + 3 * 8 + 2
        data[at] ^= 1
        self.rewrite_object(root, bytes(data))
        with self.assertRaisesRegex(ValueError, 'raw original function identity'): v.verify(root)

    def test_other_function_change_is_rejected(self):
        root = self.copy(); data = bytearray(v.raw(root / 'evidence/controller-recovered/crate.o.gz'))
        rows, _ = c.sections(data); functions = c.functions(data)
        function = next(row for name,row in functions.items() if 'calculate_fee' in name)
        data[rows[function['section']][4] + function['value'] + 4] ^= 1
        self.rewrite_object(root, bytes(data))
        with self.assertRaisesRegex(ValueError, 'unchanged companion functions'): v.verify(root)

    def test_scanner_relocation_is_rejected(self):
        root = self.copy(); data = bytearray(v.raw(root / 'evidence/controller-recovered/crate.o.gz'))
        rows, _ = c.sections(data); function = c.functions(data)[c.SYMBOL]
        index = next(i for i,row in enumerate(rows) if row[1] in (4,9) and row[5])
        table = struct.unpack_from('<Q', data, 40)[0]
        struct.pack_into('<I', data, table + index * 64 + 44, function['section'])
        self.rewrite_object(root, bytes(data))
        with self.assertRaisesRegex(ValueError, 'no scanner relocations'): v.verify(root)

    def test_archive_and_object_must_agree(self):
        root = self.copy(); data = bytearray(v.raw(root / 'evidence/controller-recovered/crate.o.gz'))
        rows, _ = c.sections(data); function = c.functions(data)[c.SYMBOL]
        data[rows[function['section']][4] + 3*8 + 2] ^= 1
        self.rewrite_object(root, bytes(data), archive=False)
        with self.assertRaisesRegex(ValueError, 'archive object binding'): v.verify(root)

    def test_companion_call_retarget_is_rejected(self):
        root = self.copy(); data = bytearray(v.raw(root / 'evidence/controller-recovered/crate.o.gz'))
        rows, _ = c.sections(data)
        row = next(row for row in rows if row[1] == 9 and row[5] >= 32)
        first = struct.unpack_from('<Q', data, row[4] + 8)[0]
        second = struct.unpack_from('<Q', data, row[4] + 24)[0]
        self.assertNotEqual(first, second)
        struct.pack_into('<Q', data, row[4] + 8, second)
        self.rewrite_object(root, bytes(data))
        with self.assertRaisesRegex(ValueError, 'unchanged relocation targets'): v.verify(root)

    def test_compiler_flags_are_pinned(self):
        root = self.copy(); path = root / 'evidence/controller-recovered/launch.json.gz'; record = v.read(path)
        record['command'] += ['-C', 'llvm-args=-disable-branch-fold=true']; self.save(path, record); self.seal(root)
        with self.assertRaisesRegex(ValueError, 'standard compiler flags'): v.verify(root)

    def test_source_substitution_is_rejected(self):
        root = self.copy(); path = root / 'sources/recovered.rs'; path.write_bytes(path.read_bytes() + b'// changed\n'); self.seal(root)
        with self.assertRaisesRegex(ValueError, 'source patch binding'): v.verify(root)

    def test_wrong_compiler_identity_is_rejected(self):
        root = self.copy(); path = root / 'evidence/controller-recovered/launch.json.gz'; record = v.read(path)
        record['compiler_sha256'] = '0' * 64; self.save(path, record); self.seal(root)
        with self.assertRaisesRegex(ValueError, 'compiler identity and success'): v.verify(root)

    def test_nonfresh_controller_is_rejected(self):
        root = self.copy(); path = root / 'evidence/controller-recovered/launch.json.gz'; record = v.read(path)
        record['fresh_output'] = False; self.save(path, record); self.seal(root)
        with self.assertRaisesRegex(ValueError, 'fresh controller SDK binding'): v.verify(root)

    def test_negative_cannot_be_claimed_exact(self):
        root = self.copy(); path = root / 'cases.json'; cases = v.read(path)
        cases['near-match']['exact'] = True; cases['initial-readable']['exact'] = False
        self.save(path, cases); self.seal(root)
        with self.assertRaisesRegex(ValueError, 'raw original function identity'): v.verify(root)

    def test_whole_program_claim_is_rejected(self):
        root = self.copy(); path = root / 'scope.json'; scope = v.read(path)
        scope['whole_amm_build'] = True; self.save(path, scope); self.seal(root)
        with self.assertRaisesRegex(ValueError, 'bounded scope'): v.verify(root)

    def test_original_allocation_is_not_silently_changed(self):
        root = self.copy(); path = root / 'inputs/original.so.gz'; data = bytearray(v.raw(path)); data[-1] ^= 1
        path.write_bytes(gzip.compress(data, mtime=0)); self.seal(root)
        with self.assertRaisesRegex(ValueError, 'original capture identity'): v.verify(root)

if __name__ == '__main__':
    unittest.main()
