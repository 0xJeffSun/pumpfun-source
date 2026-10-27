"""Mutation checks run on in-memory copies, never the reference artifacts."""
from pathlib import Path
import copy, gzip, importlib.util, json, struct, tempfile, unittest

P = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('extent_analysis_tests', P / 'analysis.py')
a = importlib.util.module_from_spec(spec)
spec.loader.exec_module(a)


class Scope(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory()
        path = Path(cls.temp.name) / 'symbols.so'
        path.write_bytes(gzip.decompress((a.PARENT / 'artifacts/recovered/symbols.so.gz').read_bytes()))
        elf = a.module('extent_elf_tests', a.R / 'repro/mayhem/global-params-layout-recovery/tools/layer01.py')
        cls.original = elf.Elf(a.R / 'evidence/original/mayhem/deployed.so')
        cls.candidate = elf.Elf(path)
        cls.cohort = json.loads((P / 'prior-cohort.json').read_bytes())

    @classmethod
    def tearDownClass(cls):
        cls.temp.cleanup()

    def setUp(self):
        self.original = copy.copy(self.original)
        self.candidate = copy.copy(self.candidate)
        self.original.b = bytearray(self.original.b)
        self.candidate.b = bytearray(self.candidate.b)
        self.audit = a.Audit(self.original, self.candidate)

    def reference(self, target, offset=None):
        for proof in self.cohort['proofs']:
            for ref in proof['data']:
                if ref['equal'] is None and ref['original'] == target and (offset is None or ref['offset'] == offset):
                    return proof, ref
        self.fail('reference missing')

    def test_counted_literal_byte_change_detected(self):
        proof, ref = self.reference(0xadaf4)
        self.candidate.b[ref['candidate']] ^= 1
        self.assertFalse(self.audit.close(proof, ref)['equal'])

    def test_counted_literal_length_change_rejected(self):
        proof, ref = self.reference(0xadaf4)
        struct.pack_into('<i', self.candidate.b, proof['candidate'] + ref['offset'] + 20, 15)
        with self.assertRaises(AssertionError):
            self.audit.close(proof, ref)

    def test_stack_slice_length_change_rejected(self):
        proof, ref = self.reference(0xadc0e, 1552)
        struct.pack_into('<i', self.candidate.b, proof['candidate'] + 1848 + 4, 13)
        with self.assertRaises(AssertionError):
            self.audit.close(proof, ref)

    def test_pubkey_byte_change_detected(self):
        proof, ref = self.reference(0xadeed)
        self.candidate.b[ref['candidate'] + 31] ^= 1
        self.assertFalse(self.audit.close(proof, ref)['equal'])

    def test_consumer_read_width_change_rejected(self):
        proof, ref = self.reference(0xad084, 216)
        call = next(x for x in self.audit.cw[proof['candidate']]['direct'] if x['offset'] == 232)
        self.candidate.b[call['target']] = 0x71  # byte load instead of the witnessed word load
        with self.assertRaises(AssertionError):
            self.audit.close(proof, ref)

    def test_vtable_target_change_detected(self):
        proof, ref = self.reference(0xb1238)
        old = self.audit.pointer(self.candidate, ref['candidate'] + 24)
        other = next(x for x in self.audit.cw if self.audit.key(self.audit.cw[x]) != self.audit.key(self.audit.cw[old]))
        struct.pack_into('<I', self.candidate.b, ref['candidate'] + 28, other)
        self.assertFalse(self.audit.close(proof, ref)['equal'])

    def test_nested_seed_count_change_rejected(self):
        proof, ref = self.reference(0xb13b0)
        struct.pack_into('<Q', self.candidate.b, ref['candidate'] + 8, 3)
        with self.assertRaises(AssertionError):
            self.audit.close(proof, ref)

    def test_format_piece_length_change_detected(self):
        proof, ref = self.reference(0xb1320)
        struct.pack_into('<Q', self.candidate.b, ref['candidate'] + 8, 30)
        self.assertFalse(self.audit.close(proof, ref)['equal'])

    def test_unresolved_records_stay_unresolved(self):
        for address in (0xb1220, 0xb1340):
            proof, ref = self.reference(address)
            result = self.audit.close(proof, ref)
            self.assertIsNone(result['equal'])
            self.assertEqual(result['kind'], 'unresolved')


if __name__ == '__main__':
    unittest.main()
