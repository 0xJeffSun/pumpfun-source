"""Negative controls against the actual binary and signed focused receipts."""
import copy
import gzip
import json
from pathlib import Path
import struct
import tempfile
import unittest

import verify
from static import inspect

P = Path(__file__).resolve().parent


class EvidenceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.symbols = gzip.decompress((P / 'artifacts/recovered/symbols.so.gz').read_bytes())
        cls.control = gzip.decompress((P / 'artifacts/control/candidate.so.gz').read_bytes())
        cls.candidate = gzip.decompress((P / 'artifacts/recovered/candidate.so.gz').read_bytes())
        cls.original = (verify.ROOT / 'evidence/original/mayhem/deployed.so').read_bytes()
        cls.report = verify.load(P / 'runtime/focused.json.gz')
        cls.static = verify.load(P / 'static.json')

    def check_report(self, report):
        return verify.focused(report, self.control, self.candidate, self.original)

    def reject_report(self, change):
        report = copy.deepcopy(self.report)
        change(report)
        with self.assertRaises((AssertionError, ValueError)):
            self.check_report(report)

    def reject_binary(self, change):
        data = bytearray(self.symbols)
        change(data)
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'mutated.so'
            path.write_bytes(data)
            with self.assertRaises(AssertionError):
                inspect(path)

    def test_saved_focused_evidence(self):
        self.assertEqual(self.check_report(self.report)['repaired_diagnostics'], 3)

    def test_missing_currency(self):
        self.reject_report(lambda r: r['cases'].pop())

    def test_wrong_serialized_case(self):
        self.reject_report(lambda r: r['cases'][0]['case'].update(tokens=0))

    def test_false_success(self):
        self.reject_report(lambda r: r['cases'][0]['results']['candidate'].update(error=None))

    def test_false_log_equality(self):
        self.reject_report(lambda r: r['cases'][0]['results']['candidate']['metadata']['logs'].append('unexpected log'))

    def test_wrong_executed_program(self):
        self.reject_report(lambda r: r['cases'][0]['results']['candidate']['before'][verify.PROGRAM].update(data_sha256='0' * 64))

    def test_invalid_signature(self):
        import base64
        def change(report):
            # Change all three copies identically, preserving transaction equality.
            for result in report['cases'][0]['results'].values():
                tx = bytearray(base64.b64decode(result['transaction_base64']))
                tx[1] ^= 1
                result['transaction_base64'] = base64.b64encode(tx).decode()
        self.reject_report(change)

    def test_mislabelled_vault_input_even_with_matching_sides(self):
        import base64
        from solders.transaction import Transaction
        def change(report):
            for result in report['cases'][0]['results'].values():
                tx = Transaction.from_bytes(base64.b64decode(result['transaction_base64']))
                key = str(tx.message.account_keys[tx.message.instructions[1].accounts[6]])
                for phase in ('before', 'after'):
                    account = result[phase][key]
                    data = bytearray(base64.b64decode(account['data_base64']))
                    struct.pack_into('<Q', data, 64, 2)
                    account['data_base64'] = base64.b64encode(data).decode()
                    account['data_sha256'] = verify.sha(data)
        self.reject_report(change)

    def test_error_variant_mutation(self):
        pc = self.static[0]['candidate']['source_pc']
        self.reject_binary(lambda b: struct.pack_into('<i', b, pc - 60, 10))

    def test_wrong_source_column(self):
        at = self.static[0]['candidate']['source_address']
        self.reject_binary(lambda b: struct.pack_into('<I', b, at + 20, 88))

    def test_redirected_live_handler(self):
        pc = self.static[0]['handler_call_pc']
        self.reject_binary(lambda b: struct.pack_into('<i', b, pc + 4, 0))

    def test_wrong_debug_layout(self):
        at = self.static[0]['candidate']['debug_vtable_address']
        self.reject_binary(lambda b: struct.pack_into('<Q', b, at + 8, 8))

    def test_replay_sell_uses_supported_arguments(self):
        import replay
        runs = dict(replay.commands(Path('/tmp/candidate.so'), Path('/tmp/receipts')))
        self.assertEqual(len(runs), 14)
        self.assertNotIn('--cases', runs['sell'])
        self.assertIn('--cases', runs['buy'])


if __name__ == '__main__':
    unittest.main()
