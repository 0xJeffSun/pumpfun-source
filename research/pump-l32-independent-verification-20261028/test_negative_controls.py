#!/usr/bin/env python3
"""Twenty fail-closed negative controls for the L32 follow-up evidence."""
from pathlib import Path
import base64
import copy
import gzip
import importlib.util
import json
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('parity_checks', HERE / 'parity_checks.py')
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)


def outcome(logs, *, error=None):
    return {
        'error': error,
        'before': [{'lamports': 7}],
        'after': [{'lamports': 7}],
        'events': [],
        'inner': [],
        'return': None,
        'rollback': error is not None,
        'logs': logs,
    }


def fixture():
    cases = [
        {'kind': 'sweep-zero', 'bucket': 0},
        {'kind': 'sweep-zero', 'bucket': 1},
        {'kind': 'sweep-positive', 'bucket': 0},
        {'kind': 'sweep-unauthorized', 'bucket': 0},
        {'kind': 'cashback-v2-zero'},
        {'kind': 'cashback-positive'},
        {'kind': 'cashback-v1-zero'},
    ]
    logs = [
        ['Program log: validated', checks.SWEEP.format(0)],
        ['Program log: validated', checks.SWEEP.format(1)],
        ['Program log: validated', 'Program log: transferred'],
        ['Program log: AnchorError caused by account: recipient'],
        ['Program log: validated', checks.CASHBACK],
        ['Program log: validated', 'Program log: transferred'],
        ['Program log: validated', checks.CASHBACK],
    ]
    rows = []
    for index, case in enumerate(cases):
        original = outcome(logs[index], error='ConstraintAddress' if index == 3 else None)
        baseline = copy.deepcopy(original)
        if index in (0, 1):
            baseline['logs'].remove(checks.SWEEP.format(case['bucket']))
        if index == 4:
            baseline['logs'].remove(checks.CASHBACK)
        rows.append({
            'suite': 'synthetic',
            'index': index,
            'path': f'synthetic/cases/{index}',
            'case': case,
            'case_sha256': checks.case_digest(case),
            'original': original,
            'baseline': baseline,
            'candidate': copy.deepcopy(original),
        })
    return rows


class NegativeControls(unittest.TestCase):
    def setUp(self):
        self.rows = fixture()

    def rejected(self):
        with self.assertRaises(RuntimeError):
            checks.validate_synthetic_matrix(self.rows)

    def test_01_missing_sweep_bucket_0(self):
        self.rows[0]['candidate']['logs'].pop()
        self.rejected()

    def test_02_missing_sweep_bucket_1(self):
        self.rows[1]['candidate']['logs'].pop()
        self.rejected()

    def test_03_wrong_sweep_bucket_number(self):
        self.rows[1]['candidate']['logs'][-1] = checks.SWEEP.format(0)
        self.rejected()

    def test_04_sweep_notice_on_positive_fee(self):
        self.rows[2]['original']['logs'].append(checks.SWEEP.format(0))
        self.rows[2]['candidate']['logs'].append(checks.SWEEP.format(0))
        self.rejected()

    def test_05_sweep_notice_before_authorization(self):
        self.rows[3]['original']['logs'].insert(0, checks.SWEEP.format(0))
        self.rows[3]['candidate']['logs'].insert(0, checks.SWEEP.format(0))
        self.rejected()

    def test_06_missing_v2_cashback_notice(self):
        self.rows[4]['candidate']['logs'].pop()
        self.rejected()

    def test_07_cashback_notice_on_positive_claim(self):
        self.rows[5]['original']['logs'].append(checks.CASHBACK)
        self.rows[5]['candidate']['logs'].append(checks.CASHBACK)
        self.rejected()

    def test_08_v1_cashback_regression(self):
        self.rows[6]['candidate']['logs'].pop()
        self.rejected()

    def test_09_changed_event_emission(self):
        self.rows[0]['candidate']['events'] = ['unexpected']
        self.rejected()

    def test_10_changed_cpi_behavior(self):
        self.rows[0]['candidate']['inner'] = ['unexpected']
        self.rejected()

    def test_11_changed_rollback(self):
        self.rows[3]['candidate']['rollback'] = False
        self.rejected()

    def test_12_changed_return_data(self):
        self.rows[0]['candidate']['return'] = [1]
        self.rejected()

    def test_13_corrupted_executable_hash(self):
        with self.assertRaises(RuntimeError):
            checks.require_digest(b'candidate-tampered', '0' * 64)

    def test_14_corrupted_transaction_signature(self):
        focused = HERE / 'runtime/focused/D-combined-fee-sweeps.json.gz'
        data = json.loads(gzip.decompress(focused.read_bytes()))
        encoded = data['cases'][0]['candidate']['transaction_base64']
        raw = bytearray(base64.b64decode(encoded))
        raw[1] ^= 1
        with self.assertRaises(Exception):
            checks.verify_signed_transaction(base64.b64encode(raw).decode())

    def test_15_swapped_case_identity(self):
        self.rows[0]['path'], self.rows[1]['path'] = self.rows[1]['path'], self.rows[0]['path']
        with self.assertRaises(RuntimeError):
            checks.validate_case_identities(self.rows)

    def test_16_duplicate_case_identity(self):
        self.rows[1]['path'] = self.rows[0]['path']
        with self.assertRaises(RuntimeError):
            checks.validate_case_identities(self.rows)

    def test_17_altered_original_log(self):
        self.rows[0]['original']['logs'][-1] = 'Program log: tampered'
        self.rejected()

    def test_18_unlisted_evidence_file(self):
        with tempfile.TemporaryDirectory() as directory:
            folder = Path(directory)
            (folder / 'listed').write_text('ok')
            manifest = {'listed': checks.sha256(folder / 'listed')}
            (folder / 'extra').write_text('reject')
            with self.assertRaises(RuntimeError):
                checks.verify_manifest(folder, manifest)

    def test_19_changed_evidence_input(self):
        expected = checks.sha256(HERE / 'staged-artifacts.json')
        with self.assertRaises(RuntimeError):
            checks.require_digest(b'changed evidence', expected)

    def test_20_inconsistent_build_hashes(self):
        first = b'repeated-qualified-artifact'
        expected = __import__('hashlib').sha256(first).hexdigest()
        with self.assertRaises(RuntimeError):
            checks.validate_repeated_build(first, first + b'-changed', expected)


if __name__ == '__main__':
    unittest.main(verbosity=2)
