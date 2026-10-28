#!/usr/bin/env python3
"""Twenty mutation controls for the creator-diagnostic evidence."""
from pathlib import Path
import base64
import copy
import json
import tempfile
import unittest
import sys

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import parity_checks as checks


def outcome(logs, *, error=None):
    return {
        'error': error,
        'before': {'creator': {'lamports': 7}},
        'after': {'creator': {'lamports': 7}},
        'events': [],
        'inner': [],
        'return': None,
        'rollback': error is not None,
        'logs': list(logs),
    }


def fixture():
    contexts = [
        {'kind': 'non_system', 'notice': checks.NON_SYSTEM},
        {'kind': 'system', 'notice': None},
        {'kind': 'frozen', 'notice': checks.FROZEN},
        {'kind': 'unfrozen', 'notice': None},
        {'kind': 'no_canonical', 'notice': checks.CANONICAL},
        {'kind': 'canonical_present', 'notice': None},
        {'kind': 'earlier_failure', 'notice': None},
    ]
    rows = []
    for index, context in enumerate(contexts):
        logs = ['Program log: Instruction: AdminCto']
        if context['notice']:
            logs.append(context['notice'])
        error = 'ConstraintOwner' if context['kind'] == 'earlier_failure' else None
        original = outcome(logs, error=error)
        rows.append({
            'id': f'creator/{index}',
            'context': context,
            'original': original,
            'candidate': copy.deepcopy(original),
        })
    return rows


def validate(rows):
    checks.require(len({row['id'] for row in rows}) == len(rows), 'duplicate case identity')
    checks.require([row['id'] for row in rows] == [f'creator/{index}' for index in range(7)],
                   'case identity or order changed')
    for row in rows:
        original, candidate, context = row['original'], row['candidate'], row['context']
        checks.require({k: v for k, v in original.items() if k != 'logs'} ==
                       {k: v for k, v in candidate.items() if k != 'logs'},
                       f"{row['id']}: structured behavior changed")
        checks.require(original['logs'] == candidate['logs'], f"{row['id']}: logs changed")
        expected = context['notice']
        notices = [line for line in candidate['logs'] if line in checks.MESSAGES.values()]
        checks.require(notices == ([expected] if expected else []),
                       f"{row['id']}: notice predicate changed")


class NegativeControls(unittest.TestCase):
    def setUp(self):
        self.rows = fixture()

    def rejected(self):
        with self.assertRaises(RuntimeError):
            validate(self.rows)

    def test_01_missing_non_system_notice(self):
        self.rows[0]['candidate']['logs'].pop()
        self.rejected()

    def test_02_notice_on_system_creator(self):
        self.rows[1]['original']['logs'].append(checks.NON_SYSTEM)
        self.rows[1]['candidate']['logs'].append(checks.NON_SYSTEM)
        self.rejected()

    def test_03_missing_frozen_notice(self):
        self.rows[2]['candidate']['logs'].pop()
        self.rejected()

    def test_04_notice_on_unfrozen_account(self):
        self.rows[3]['original']['logs'].append(checks.FROZEN)
        self.rows[3]['candidate']['logs'].append(checks.FROZEN)
        self.rejected()

    def test_05_missing_canonical_notice(self):
        self.rows[4]['candidate']['logs'].pop()
        self.rejected()

    def test_06_notice_when_pool_exists(self):
        self.rows[5]['original']['logs'].append(checks.CANONICAL)
        self.rows[5]['candidate']['logs'].append(checks.CANONICAL)
        self.rejected()

    def test_07_notice_before_earlier_failure(self):
        self.rows[6]['original']['logs'].insert(0, checks.NON_SYSTEM)
        self.rows[6]['candidate']['logs'].insert(0, checks.NON_SYSTEM)
        self.rejected()

    def test_08_unexpected_state_mutation(self):
        self.rows[0]['candidate']['after']['creator']['lamports'] += 1
        self.rejected()

    def test_09_changed_cpi_result(self):
        self.rows[0]['candidate']['inner'].append('unexpected')
        self.rejected()

    def test_10_changed_event_emission(self):
        self.rows[0]['candidate']['events'].append('unexpected')
        self.rejected()

    def test_11_changed_rollback(self):
        self.rows[6]['candidate']['rollback'] = False
        self.rejected()

    def test_12_changed_return_data(self):
        self.rows[0]['candidate']['return'] = [1]
        self.rejected()

    def test_13_corrupted_executable_hash(self):
        with self.assertRaises(RuntimeError):
            checks.validate_repeated_build(b'bad', b'bad', '0' * 64)

    def test_14_corrupted_transaction_signature(self):
        report = checks.load_json(HERE / 'runtime/focused/E-combined.json.gz')
        raw = bytearray(base64.b64decode(report['cases'][0]['original']['transaction_base64']))
        raw[1] ^= 1
        with self.assertRaises(Exception):
            checks.verify_signed_transaction(base64.b64encode(raw).decode())

    def test_15_swapped_outcome_identity(self):
        self.rows[0]['id'], self.rows[1]['id'] = self.rows[1]['id'], self.rows[0]['id']
        self.rejected()

    def test_16_duplicate_case_identity(self):
        self.rows[1]['id'] = self.rows[0]['id']
        self.rejected()

    def test_17_altered_expected_log(self):
        self.rows[0]['original']['logs'][-1] = 'Program log: tampered'
        self.rejected()

    def test_18_changed_source_input(self):
        source = HERE / 'source.patch'
        with self.assertRaises(RuntimeError):
            checks.validate_repeated_build(source.read_bytes(), source.read_bytes() + b'changed', checks.sha256(source))

    def test_19_extra_manifest_file(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'listed').write_text('ok')
            manifest = {'listed': checks.sha256(root / 'listed')}
            (root / 'extra').write_text('reject')
            with self.assertRaises(RuntimeError):
                checks.verify_manifest(root, manifest)

    def test_20_symlink_substitution(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'target').write_text('ok')
            (root / 'link').symlink_to('target')
            with self.assertRaises(RuntimeError):
                checks.verify_manifest(root, {'target': checks.sha256(root / 'target')})


if __name__ == '__main__':
    unittest.main(verbosity=2)
