"""Mutation checks for the partial ownership evidence boundary."""
from pathlib import Path
import base64
import copy
import gzip
import hashlib
import importlib.util
import io
import json
import os
import shutil
import subprocess
import sys
import tarfile
import tempfile
import unittest
import uuid

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
ROOT = P.parents[1]


def module(path):
    spec = importlib.util.spec_from_file_location('mut_' + uuid.uuid4().hex, path)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


def seal(path):
    result = {str(p.relative_to(path)): hashlib.sha256(p.read_bytes()).hexdigest()
              for p in path.rglob('*') if p.is_file() and p != path/'manifest.json'}
    (path/'manifest.json').write_text(json.dumps(result, indent=2, sort_keys=True) + '\n')


class EvidenceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.verifier = module(P/'verify.py')
        cls.runtime = module(P/'runtime_check.py')
        cls.metadata = json.loads((P/'metadata.json').read_bytes())
        cls.report = json.loads(gzip.decompress((P/'runtime/buy-native.json.gz').read_bytes()))
        cls.cases = json.loads(gzip.decompress((P/'runtime/frozen/work/mayhem-priority-20261027/buyv2-body-audit/bounded-cases.json.gz').read_bytes()))['cases']

    def mutation(self, change, reseal=True):
        with tempfile.TemporaryDirectory(prefix='ownership-mutation-') as td:
            target = Path(td)/'packet'
            shutil.copytree(P, target)
            change(target)
            if reseal:
                seal(target)
            with self.assertRaises((AssertionError, ValueError, RuntimeError, OSError)):
                module(target/'verify.py').verify(ROOT)

    def check_report(self, report):
        return self.runtime.check_group(report, self.cases, 'buy', 'native',
                                        self.metadata['roles']['q18']['candidate_sha256'],
                                        self.metadata['original_sha256'])

    def test_complete_packet(self):
        result = self.verifier.verify(ROOT)
        self.assertEqual((result['normalized_windows'], result['new_full_windows']), (432, 0))
        self.assertEqual(result['runtime']['saved_signed_records'], 96)

    def test_extra_regular_file(self):
        self.mutation(lambda p: (p/'unlisted.txt').write_text('extra'), reseal=False)

    def test_symbolic_link(self):
        self.mutation(lambda p: (p/'unlisted-link').symlink_to('README.md'), reseal=False)

    @unittest.skipUnless(hasattr(os, 'mkfifo'), 'FIFO unavailable')
    def test_special_file(self):
        self.mutation(lambda p: os.mkfifo(p/'unlisted-fifo'), reseal=False)

    def test_inner_metadata_pin(self):
        def change(p):
            value = json.loads((p/'metadata.json').read_bytes())
            value['roles']['q18']['candidate_sha256'] = '0' * 64
            (p/'metadata.json').write_text(json.dumps(value))
        self.mutation(change)

    def test_changed_artifact_even_after_reseal(self):
        def change(p):
            path = p/'artifacts/q22/symbols.so.gz'
            value = bytearray(gzip.decompress(path.read_bytes()))
            value[-1] ^= 1
            path.write_bytes(gzip.compress(value, mtime=0))
        self.mutation(change)

    def test_false_build_unchanged_claim(self):
        def change(p):
            path = p/'builds/q18/result.json'
            value = json.loads(path.read_bytes())
            value['source_unchanged'] = False
            path.write_text(json.dumps(value))
        self.mutation(change)

    def tar_check(self, names, types=None):
        with tempfile.TemporaryDirectory() as td:
            path = Path(td)/'bad.tar.gz'
            with tarfile.open(path, 'w:gz') as archive:
                for i, name in enumerate(names):
                    item = tarfile.TarInfo(name)
                    item.mode = 0o644
                    if types:
                        item.type = types[i]
                    item.size = 1 if item.isfile() else 0
                    archive.addfile(item, io.BytesIO(b'x') if item.isfile() else None)
            with self.assertRaises(AssertionError):
                self.verifier.archive(path)

    def test_source_traversal(self):
        self.tar_check(['../escape.rs'])

    def test_source_duplicate(self):
        self.tar_check(['same.rs', 'same.rs'])

    def test_source_link_member(self):
        self.tar_check(['link.rs'], [tarfile.SYMTYPE])

    def test_canonical_case_dictionary(self):
        value = copy.deepcopy(self.report)
        for key in ['case']:
            value['cases'][0][key]['retained'] = 8000
        for role in ['original', 'candidate']:
            value['cases'][0][role]['case']['retained'] = 8000
        with self.assertRaises(AssertionError):
            self.check_report(value)

    def test_missing_execution(self):
        value = copy.deepcopy(self.report)
        value['cases'].pop()
        with self.assertRaises(AssertionError):
            self.check_report(value)

    def test_duplicate_execution(self):
        value = copy.deepcopy(self.report)
        value['cases'][1] = copy.deepcopy(value['cases'][0])
        with self.assertRaises(AssertionError):
            self.check_report(value)

    def test_wrong_candidate_program_binding(self):
        value = copy.deepcopy(self.report)
        value['cases'][0]['candidate']['before'][self.runtime.MAY]['data_sha256'] = self.metadata['original_sha256']
        with self.assertRaises(AssertionError):
            self.check_report(value)

    def test_claimed_signature_not_verified(self):
        value = copy.deepcopy(self.report)
        value['cases'][0]['candidate']['signature_verified'] = False
        with self.assertRaises(AssertionError):
            self.check_report(value)

    def test_corrupt_actual_signature(self):
        try:
            import solders  # noqa: F401
        except ImportError:
            self.skipTest('solders unavailable; --signatures requires it')
        record = copy.deepcopy(self.report['cases'][0]['candidate'])
        data = bytearray(base64.b64decode(record['transaction_base64']))
        data[1] ^= 1
        record['transaction_base64'] = base64.b64encode(data).decode()
        with self.assertRaises((AssertionError, ValueError)):
            self.runtime.crypto_record(record, self.report['cases'][0]['case'], 'buy', 'native')

    def test_optimized_python_rejected(self):
        run = subprocess.run([sys.executable, '-B', '-O', str(P/'verify.py'), '--root', str(ROOT)], capture_output=True)
        self.assertNotEqual(run.returncode, 0)
        self.assertIn(b'verification requires assertions', run.stderr)


if __name__ == '__main__':
    unittest.main()
