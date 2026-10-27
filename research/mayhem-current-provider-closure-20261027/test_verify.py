"""Counterexamples for signatures, executed-code binding, states and recursion."""
import base64
import copy
import json
import lzma
import unittest
import analysis
import runtime_verify

HASH = '78e3ccb13f531b0724bf1f60c82744092c8dcbdeb2162c0755dc88ecc0186932'


class ReceiptTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.row = json.loads(lzma.decompress((runtime_verify.HERE / 'runtime/buy.json.xz').read_bytes()))['cases'][0]

    def test_fresh_signed_pair(self):
        self.assertEqual(runtime_verify.check_pair(self.row, HASH, True), 1)

    def test_invalid_signature_cannot_hide_in_equal_transactions(self):
        row = copy.deepcopy(self.row)
        payload = bytearray(base64.b64decode(row['original']['transaction_base64']))
        payload[12] ^= 1
        for role in ['original', 'candidate']:
            row[role]['transaction_base64'] = base64.b64encode(payload).decode()
        with self.assertRaisesRegex(ValueError, 'signature verification failed'):
            runtime_verify.check_pair(row, HASH, True)

    def test_wrong_executed_program_rejected(self):
        row = copy.deepcopy(self.row)
        row['candidate']['before'][runtime_verify.PROGRAM]['data_sha256'] = runtime_verify.ORIGINAL
        with self.assertRaisesRegex(ValueError, 'executed program account binding differs'):
            runtime_verify.check_pair(row, HASH, True)

    def test_stale_equal_flag_cannot_hide_changed_state(self):
        row = copy.deepcopy(self.row)
        key = next(k for k, value in row['candidate']['after'].items() if k != runtime_verify.PROGRAM and value is not None)
        row['candidate']['after'][key]['lamports'] += 1
        with self.assertRaisesRegex(ValueError, 'account state comparison differs'):
            runtime_verify.check_pair(row, HASH, True)

    def test_unsupported_call_breaks_recursive_relation(self):
        pairs = {(1, 10), (2, 20), (3, 30)}
        edges = {(1, 10): [(2, 20)], (2, 20): [(1, 10), (4, 40)], (3, 30): []}
        active, rounds = analysis.closed_relation(pairs, edges)
        self.assertEqual(active, {(3, 30)})
        self.assertEqual(rounds, [1, 1])


if __name__ == '__main__':
    unittest.main()
