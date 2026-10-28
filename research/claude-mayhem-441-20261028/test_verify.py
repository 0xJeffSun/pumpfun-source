"""Counterexamples for the claude-mayhem-441-20261028 verifier: ELF recheck, strict inventory and saved runtime outputs."""
from pathlib import Path
import gzip, hashlib, importlib.util, json, lzma, os, shutil, struct, subprocess, sys, tempfile, unittest
P = Path(__file__).resolve().parent
R = next(p for p in P.parents if (p / 'evidence/original/mayhem/deployed.so').is_file())
s = importlib.util.spec_from_file_location('mg_tests', P / 'elf_check.py'); q = importlib.util.module_from_spec(s); s.loader.exec_module(q)
G = sorted(q.GAINS)[0]


def seal(p):
    h = lambda b: hashlib.sha256(b).hexdigest()
    (p / 'SHA256SUMS.txt').write_text(''.join(h(x.read_bytes()) + '  ' + x.relative_to(p).as_posix() + '\n'
                                              for x in sorted(p.rglob('*')) if x.is_file() and x != p / 'SHA256SUMS.txt'))


def edit_json(path, change):
    data = path.read_bytes()
    unpack, pack = ((gzip.decompress, lambda b: gzip.compress(b, mtime=0)) if path.suffix == '.gz' else
                    (lzma.decompress, lzma.compress) if path.suffix == '.xz' else (lambda b: b, lambda b: b))
    v = json.loads(unpack(data)); change(v); path.write_bytes(pack(json.dumps(v).encode()))


class Evidence(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.result = q.inspect(R, P)
        cls.candidate = gzip.decompress((P / 'builds/candidate.so.gz').read_bytes()); cls.symbols = gzip.decompress((P / 'builds/symbols.so.gz').read_bytes())
        m = R / 'research/mayhem-current-macro-call-closure-20261027'
        cls.reader = q.module('mg_test_reader', m / 'reader.py'); cls.matcher = q.module('mg_test_matcher', m / 'verify.py')

    def image(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / 'image.so'; p.write_bytes(self.symbols); return self.reader.Elf(p)

    def offset(self, e, address):
        z = next(z for z in e.sections if z['type'] != 8 and z['address'] <= address < z['address'] + z['size']); return z['offset'] + address - z['address']

    def reject_image(self, change):
        b = bytearray(self.symbols); change(b); c = bytearray(self.candidate)
        for i, (old, new) in enumerate(zip(self.symbols, b)):
            if old != new: c[i] = new
        with self.assertRaises((AssertionError, ValueError)): q.inspect(R, P, bytes(c), bytes(b))

    def run_copy(self, change, message, reseal=True):
        with tempfile.TemporaryDirectory(dir=P.parent) as d:
            p = Path(d) / 'packet'; shutil.copytree(P, p, ignore=shutil.ignore_patterns('__pycache__')); change(p)
            if reseal: seal(p)
            r = subprocess.run([sys.executable, '-I', '-B', str(p / 'verify.py')], capture_output=True, text=True)
            self.assertNotEqual(r.returncode, 0); self.assertIn(message, r.stderr)

    def test_verify_passes(self):
        r = subprocess.run([sys.executable, '-I', '-B', str(P / 'verify.py')], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr[-2000:]); self.assertIn('PASS - ', r.stdout)

    def test_full_body_and_census(self):
        self.assertEqual(self.result['candidate']['counts'], q.CANDIDATE_COUNTS)
        self.assertEqual(self.result['parent']['counts'], q.PARENT_COUNTS)
        for g, (start, size) in q.GAINS.items(): self.assertEqual(self.result[g]['bytes'], size)

    def test_real_instruction_corruption(self):
        e = self.image(); at = self.offset(e, self.result[G]['candidate_starts'][0]); self.reject_image(lambda b: b.__setitem__(at + 1, b[at + 1] ^ 1))

    def test_masked_call_target_corruption(self):
        e = self.image(); table, _ = self.matcher.tables(e); start = self.result[G]['candidate_starts'][0]; call = table[start]['direct'][0]
        target = next(a for a, w in table.items() if self.matcher.key(w) != self.matcher.key(table[call['target']]))
        at = self.offset(e, call['pc']); self.reject_image(lambda b: struct.pack_into('<i', b, at + 4, (target - call['pc'] - 8) // 8))

    def test_Source_corruption(self):
        e = self.image(); table, _ = self.matcher.tables(e); start = self.result[G]['candidate_starts'][0]
        ref = next(x for x in table[start]['data_references'] if self.matcher.source(e, x['target']))
        at = self.offset(e, ref['target']) + 16; self.reject_image(lambda b: b.__setitem__(at, b[at] ^ 1))

    def test_inventory_rejects_unlisted_fifo(self): self.run_copy(lambda p: os.mkfifo(p / 'unexpected.fifo'), 'manifest rejects special files', False)

    def test_inventory_rejects_symlink(self): self.run_copy(lambda p: (p / 'unexpected').symlink_to('source.patch'), 'manifest rejects symlinks', False)

    def test_unsealed_edit_rejected(self):
        self.run_copy(lambda p: (p / 'source.patch').write_text((p / 'source.patch').read_text() + '\n'), 'FAIL: sha256 source.patch', False)

    def test_shipped_source_edit_rejected(self):
        f0 = sorted(q.SHIPPED_FILES)[0]
        def change(p):
            f = p / 'sources/shipped' / f0; f.write_bytes(f.read_bytes() + b'\n')
        self.run_copy(change, f'sources/shipped/{f0} == shipped tree copy')

    def test_saved_census_cannot_substitute_for_ELF(self):
        self.run_copy(lambda p: edit_json(p / 'measurement/recomputed-elf.json', lambda v: v['candidate']['counts'].__setitem__('unmatched', 0)),
                      'actual ELF: full 441-window census')

    def test_trade_output_difference_rejected(self):
        self.run_copy(lambda p: edit_json(p / 'runtime/trades/sell-amm-token.json.xz', lambda v: v['cases'][5]['candidate'].__setitem__('error', 'tampered')),
                      'trade sell-amm-token:')

    def test_sweep_output_difference_rejected(self):
        self.run_copy(lambda p: edit_json(p / 'runtime/sweeps/sweeps.json.gz', lambda v: v['cases'][7]['results']['candidate'].__setitem__('events', ['tampered'])),
                      'sweeps: 692 cases')

    def test_runtime_summary_cannot_substitute_for_outputs(self):
        self.run_copy(lambda p: edit_json(p / 'runtime/summary.json', lambda v: v['totals'].__setitem__('trade_cases', 6637)),
                      'runtime summary.json == counts recomputed')

    def test_optimized_assertions_rejected(self):
        r = subprocess.run([sys.executable, '-O', '-I', '-B', str(P / 'verify.py')], capture_output=True, text=True)
        self.assertNotEqual(r.returncode, 0); self.assertIn('assertions enabled', r.stderr)


if __name__ == '__main__':
    unittest.main(verbosity=2)
