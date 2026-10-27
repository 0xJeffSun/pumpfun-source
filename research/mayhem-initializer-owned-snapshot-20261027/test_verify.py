"""Small mutation tests; no compilation or target execution."""
from pathlib import Path
import gzip
import hashlib
import importlib.util
import io
import json
import os
import subprocess
import shutil
import sys
import tarfile
import tempfile
import unittest

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('snapshot_verify', HERE/'verify.py')
V = importlib.util.module_from_spec(spec)
spec.loader.exec_module(V)


class EvidenceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.valid = V.verify()

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.packet = Path(self.temp.name)/'packet'
        shutil.copytree(HERE, self.packet)
        self.old = V.P
        V.P = self.packet
        self.addCleanup(setattr, V, 'P', self.old)

    def seal(self):
        data = {str(p.relative_to(self.packet)): hashlib.sha256(p.read_bytes()).hexdigest()
                for p in self.packet.rglob('*') if p.is_file() and p.name != 'manifest.json'}
        (self.packet/'manifest.json').write_text(json.dumps(data, indent=2)+'\n')

    def rejects(self):
        with self.assertRaises((AssertionError, KeyError, ValueError)):
            V.verify()

    def report(self, change):
        p = self.packet/'runtime/pump-cpi.json.gz'
        value = json.loads(gzip.decompress(p.read_bytes()))
        change(value)
        p.write_bytes(gzip.compress(json.dumps(value).encode(), mtime=0))
        self.seal()

    def test_retained_boundaries(self):
        self.assertEqual((self.valid['prior_slots'], self.valid['snapshot_slots']), (101,104))
        self.assertFalse(self.valid['complete_initializer_match'])

    def test_unlisted_special_file(self):
        os.mkfifo(self.packet/'unlisted.pipe')
        self.rejects()

    def test_broken_symlink(self):
        (self.packet/'broken-link').symlink_to('missing')
        self.rejects()

    def test_optimized_python_rejected(self):
        result = subprocess.run([sys.executable, '-O', '-B', str(HERE/'verify.py')],
                                capture_output=True, text=True)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('verification requires assertions', result.stderr)

    def test_extra_source(self):
        p = self.packet/'source.tar.gz'
        values = V.archive(p)
        values['unexpected.rs'] = b'// extra\n'
        data = io.BytesIO()
        with tarfile.open(fileobj=data, mode='w') as tar:
            for name, body in values.items():
                member = tarfile.TarInfo(name)
                member.size = len(body)
                tar.addfile(member, io.BytesIO(body))
        p.write_bytes(gzip.compress(data.getvalue(), mtime=0))
        self.seal()
        self.rejects()

    def test_false_complete_body(self):
        p = self.packet/'body-proof.json'
        value = json.loads(p.read_bytes())
        value['snapshot']['complete_normalized_equal'] = True
        p.write_text(json.dumps(value))
        self.seal()
        self.rejects()

    def test_changed_repeat(self):
        p = self.packet/'artifacts/repeat/candidate.so.gz'
        body = bytearray(gzip.decompress(p.read_bytes()))
        body[-1] ^= 1
        p.write_bytes(gzip.compress(body, mtime=0))
        result = self.packet/'builds/repeat/result.json'
        value = json.loads(result.read_bytes())
        value['candidate_sha256'] = hashlib.sha256(body).hexdigest()
        result.write_text(json.dumps(value))
        self.seal()
        self.rejects()

    def test_changed_case_option(self):
        self.report(lambda r: r['cases'][1]['case'].__setitem__('duration_hours', 222))
        self.rejects()

    def test_missing_execution(self):
        def change(r):
            for side in ['original_executions','candidate_executions']:
                r['cases'][0][side].pop()
        self.report(change)
        self.rejects()

    def test_duplicate_execution(self):
        def change(r):
            for side in ['original_executions','candidate_executions']:
                values = r['cases'][0][side]
                assert len(values) == 2
                values[1] = values[0]
        self.report(change)
        self.rejects()

    def test_wrong_program_attestation(self):
        def change(r):
            row = r['cases'][0]['candidate_executions'][0]
            row['program_accounts']['MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e']['sha256'] = '0'*64
        self.report(change)
        self.rejects()


if __name__ == '__main__':
    unittest.main()
