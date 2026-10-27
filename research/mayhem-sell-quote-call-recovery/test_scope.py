"""Mutation controls for source scope and signed receipt admission."""
from pathlib import Path
import base64, copy, difflib, importlib.util, json, shutil, tempfile, unittest

P = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('quote_verify_tests', P / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


class ScopeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.candidate = v.raw(P / 'artifacts/recovered/candidate.so.gz')
        cls.report = v.load(P / 'runtime/sell-amm-native.json.gz')

    def test_duplicate_case_rejected(self):
        report = copy.deepcopy(self.report)
        report['cases'][-1] = copy.deepcopy(report['cases'][0])
        with self.assertRaises(AssertionError):
            v.check_receipts('sell-amm-native', report, self.candidate)

    def test_missing_case_rejected(self):
        report = copy.deepcopy(self.report)
        report['cases'].pop()
        report['case_count'] -= 1
        with self.assertRaises(AssertionError):
            v.check_receipts('sell-amm-native', report, self.candidate)

    def test_parent_binary_rejected(self):
        parent = v.raw(v.R / 'research/mayhem-source-data-recovery/artifacts/recovered/candidate.so.gz')
        with self.assertRaises(AssertionError):
            v.check_receipts('sell-amm-native', self.report, parent)

    def test_invalid_signature_rejected(self):
        report = copy.deepcopy(self.report)
        tx = bytearray(base64.b64decode(report['cases'][0]['original']['transaction_base64']))
        self.assertGreater(tx[0], 0)
        tx[1] ^= 1
        damaged = base64.b64encode(tx).decode()
        for phase in ('original', 'candidate'):
            report['cases'][0][phase]['transaction_base64'] = damaged
        with self.assertRaises(AssertionError):
            v.check_receipts('sell-amm-native', report, self.candidate)

    def test_diagnostic_difference_not_hidden(self):
        report = copy.deepcopy(self.report)
        report['cases'][0]['candidate']['metadata']['logs'].append('deliberate diagnostic mutation')
        checked = v.check_receipts('sell-amm-native', report, self.candidate)
        self.assertEqual(checked['exact_noncompute_logs'], 412)

    def test_resealed_edit_outside_helper_rejected(self):
        before = v.module('scope_parent', v.R / 'research/mayhem-source-data-recovery/verify.py').source_inputs()
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for name in ('source-inputs.json', 'source-delta.json', '.gitattributes'):
                shutil.copyfile(P / name, root / name)
            shutil.copytree(P / 'overrides', root / 'overrides')
            state = root / 'overrides/src/state.rs'
            state.write_bytes(b'// unrelated edit\n' + state.read_bytes())
            after = dict(before)
            after.update({f.relative_to(root / 'overrides').as_posix(): f.read_bytes() for f in (root / 'overrides').rglob('*') if f.is_file()})
            (root / 'source-inputs.json').write_text(json.dumps({n: v.sha(b) for n, b in after.items()}))
            names = v.load(root / 'source-delta.json')['overrides']
            patch = ''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True), after[n].decode().splitlines(True), fromfile='a/' + n, tofile='b/' + n)) for n in names)
            (root / 'source.patch').write_text(patch)
            prior = v.P
            try:
                v.P = root
                with self.assertRaises(AssertionError):
                    v.source_inputs()
            finally:
                v.P = prior


if __name__ == '__main__':
    unittest.main()
