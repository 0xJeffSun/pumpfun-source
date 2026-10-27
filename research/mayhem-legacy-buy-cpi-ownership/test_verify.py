"""Mutation checks for source, caller targets, Source, and saved executions."""
from pathlib import Path
import os, subprocess, sys
import base64, copy, gzip, importlib.util, io, json, shutil, struct, tarfile, tempfile, unittest
P = Path(__file__).resolve().parent
s = importlib.util.spec_from_file_location('ownership_verifier', P / 'verify.py')
V = importlib.util.module_from_spec(s); s.loader.exec_module(V)

class EvidenceChecks(unittest.TestCase):
    @classmethod
    def setUpClass(cls): cls.positive = V.verify()

    def test_optimized_rejected(self):
        r = subprocess.run([sys.executable, '-O', '-B', str(P/'verify.py')], capture_output=True, text=True)
        self.assertNotEqual(r.returncode, 0)
        self.assertIn('verification requires assertions', r.stderr)

    def test_unlisted_special_file(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)/'packet'; shutil.copytree(P, root); os.mkfifo(root/'unlisted.pipe')
            old = V.P; V.P = root
            try:
                with self.assertRaises(AssertionError): V.verify()
            finally: V.P = old

    def test_unlisted_nested_manifest(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / 'packet'; shutil.copytree(P, root)
            folder = root / 'unexpected'; folder.mkdir(); (folder / 'manifest.json').write_text('{}\n')
            old = V.P; V.P = root
            try:
                with self.assertRaises(AssertionError): V.verify()
            finally: V.P = old

    def test_extra_source_edit(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / 'packet'; shutil.copytree(P, root)
            old = V.P; V.P = root
            try:
                files = V.sources('after'); files['src/lib.rs'] += b'\n// unapproved edit\n'
                stream = io.BytesIO()
                with tarfile.open(fileobj=stream, mode='w') as archive:
                    for name, data in sorted(files.items()):
                        entry = tarfile.TarInfo(name); entry.size = len(data); archive.addfile(entry, io.BytesIO(data))
                (root / 'sources/after.tar.gz').write_bytes(gzip.compress(stream.getvalue(), mtime=0))
                with self.assertRaisesRegex(AssertionError, 'source transformation'): V.check_sources()
            finally: V.P = old

    def modified_caller(self, change):
        reader = V.module('mutation_reader', P / 'reader.py')
        original, before, after = [V.image(n) for n in ['original', 'before-symbols', 'after-symbols']]
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'image'; path.write_bytes(after); elf = reader.Elf(path)
            symbol = next(s for s in elf.symbols if s['info'] & 15 == 2 and 'legacy_buy_handler' in s['name'])
            window = elf.window(symbol['value'], symbol['value'] + symbol['size']); data = bytearray(after)
            change(elf, window, data)
            return original, before, bytes(data)

    def test_redirected_actual_callee(self):
        def change(elf, window, data):
            call = window['direct'][-1]
            target = window['direct'][0]['target']
            struct.pack_into('<i', data, call['pc'] + 4, (target - call['pc'] - 8) // 8)
        with self.assertRaisesRegex(AssertionError, 'immediate callee shapes'):
            V.check_handler_images(*self.modified_caller(change))

    def test_changed_cpi_source_line(self):
        def change(elf, window, data):
            path = b'programs/mayhem-program/src/instructions/pump_interface.rs'
            ref = next(d for d in window['data_references'] if elf.b[d['target']:d['target'] + len(path)] == path)
            assert struct.unpack_from('<i', data, ref['pc'] + 44)[0] == 313
            struct.pack_into('<i', data, ref['pc'] + 44, 314)
        with self.assertRaisesRegex(AssertionError, 'CPI Source origin'):
            V.check_handler_images(*self.modified_caller(change))

    def test_changed_result_capture(self):
        def change(elf, window, data):
            # The old Result is captured immediately after the real Pump buy.
            target = next(s['value'] for s in elf.symbols if 'pump3cpi3buy' in s['name'] and s['info'] & 15 == 2)
            call = next(c for c in window['direct'] if c['target'] == target)
            assert data[call['pc'] + 8:call['pc'] + 24] == bytes.fromhex('bf07000000000000bf16000000000000')
            data[call['pc'] + 9] = 8
        with self.assertRaisesRegex(AssertionError, 'CPI error ownership'):
            V.check_handler_images(*self.modified_caller(change))

    def test_runtime_case_vector(self):
        run = V.load(P / 'runtime/report.json'); run['cases'][0]['case'] = {'name': 'changed'}
        with self.assertRaises(AssertionError): V.check_runtime(run, V.load(P / 'cases.json')['cases'])

    def test_runtime_signature(self):
        run = V.load(P / 'runtime/report.json')
        row = run['cases'][0]['original']; raw = bytearray(base64.b64decode(row['transaction_base64']))
        assert raw[0] > 0; raw[1] ^= 1; row['transaction_base64'] = base64.b64encode(raw).decode()
        with self.assertRaisesRegex(AssertionError, 'invalid transaction signature'):
            V.check_runtime(run, V.load(P / 'cases.json')['cases'])

if __name__ == '__main__': unittest.main()
