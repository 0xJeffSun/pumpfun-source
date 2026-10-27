"""Reject changed instructions, pointer data and unjustified terminal calls."""
from pathlib import Path
import copy, gzip, importlib.util, json, tempfile, unittest

P = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('sweep_layout_tests', P / 'analysis.py')
a = importlib.util.module_from_spec(spec); spec.loader.exec_module(a)


class Scope(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory(); path = Path(cls.temp.name) / 'symbols.so'
        path.write_bytes(gzip.decompress((P / 'builds/control/symbols.so.gz').read_bytes()))
        elf = a.module('sweep_elf_tests', a.R / 'repro/mayhem/global-params-layout-recovery/tools/layer01.py')
        cls.e = elf.Elf(path)
        cls.windows = {s['value']: cls.e.window(s['value'], s['value'] + s['size']) for s in cls.e.symbols
                       if s['info'] & 15 == 2 and s['size'] >= 8 and cls.e.lo <= s['value'] < cls.e.hi}
        symbol = next(s for s in cls.e.symbols if '14validate_sweep' in s['name'])
        cls.start = symbol['value']; cls.body = cls.windows[cls.start]
        cls.sink = next(x['target'] for x in cls.body['direct'] if x['offset'] == 704)

    @classmethod
    def tearDownClass(cls): cls.temp.cleanup()

    def setUp(self):
        self.e = copy.copy(self.e); self.e.b = bytearray(self.e.b)
        self.e.rel = {k: dict(v) for k, v in self.e.rel.items()}
        self.windows = dict(self.windows)

    def test_abort_import_is_required(self):
        chain = a.terminal_chain(self.e, self.sink, self.windows)
        last = self.windows[chain[-1]['start']]['end'] - 8
        self.e.rel[last]['symbol'] = 'may_return'
        with self.assertRaises(AssertionError): a.terminal_chain(self.e, self.sink, self.windows)

    def test_returning_sink_is_rejected(self):
        self.e.b[self.sink] = 0x95
        end = self.windows[self.sink]['end']
        self.windows[self.sink] = self.e.window(self.sink, end)
        with self.assertRaises(AssertionError): a.terminal_chain(self.e, self.sink, self.windows)

    def test_register_change_breaks_block_identity(self):
        before = a.graph(self.e, self.body, self.windows, self.sink)
        self.e.b[self.start + 1] ^= 1
        after = a.graph(self.e, self.e.window(self.start, self.body['end']), self.windows, self.sink)
        self.assertNotEqual(before[self.start]['fingerprint'], after[self.start]['fingerprint'])

    def test_branch_destination_change_is_visible(self):
        before = a.graph(self.e, self.body, self.windows, self.sink)
        pc = self.body['branches'][0]['pc']
        self.e.b[pc + 2] ^= 1
        after = a.graph(self.e, self.e.window(self.start, self.body['end']), self.windows, self.sink)
        self.assertNotEqual(before, after)

    def test_source_location_change_is_visible(self):
        proof = json.loads((P / 'analysis.json').read_bytes())
        source = next(x for x in proof['mapped_data'] if x['value']['kind'] == 'Source')
        ref = next(x for x in self.body['data_references'] if x['offset'] == source['candidate_offset'])
        original = a.data_value(self.e, ref['target'], 0xb1460, self.windows)
        self.e.b[ref['target'] + 16] ^= 1
        self.assertNotEqual(original, a.data_value(self.e, ref['target'], 0xb1460, self.windows))

    def test_terminal_cut_is_not_optional(self):
        with_cut = a.graph(self.e, self.body, self.windows, self.sink)
        without_cut = a.graph(self.e, self.body, self.windows, -1)
        self.assertNotEqual(with_cut, without_cut)

    def test_executed_program_binding_is_checked(self):
        v = a.module('sweep_runtime_test', P / 'verify.py')
        report = v.load(P / 'runtime/150-cases.json.gz')
        key = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
        report['receipts']['candidate'][0]['preaccounts'][key]['data_sha256'] = '0' * 64
        candidate = v.raw(P / 'builds/control/candidate.so.gz')
        with self.assertRaises(AssertionError): v.runtime(candidate, report)


if __name__ == '__main__': unittest.main()
