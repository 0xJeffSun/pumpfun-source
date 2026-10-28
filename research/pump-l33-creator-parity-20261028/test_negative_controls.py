#!/usr/bin/env python3
"""Mutation controls proving summaries cannot substitute for retained evidence."""
from pathlib import Path
import base64
import copy
import hashlib
import json
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
ROOT = next(path for path in HERE.parents if (path / 'evidence/original/pump/deployed.so').is_file())
sys.path.insert(0, str(HERE))
import audit_focused  # noqa: E402
import verify  # noqa: E402
from parity_checks import NON_SYSTEM, load_json, require, verify_manifest  # noqa: E402


class NegativeControls(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.docs = {stage: load_json(HERE / f'runtime/focused/{stage}-admin.json.gz')
                    for stage in ('stage-a', 'stage-b', 'stage-c')}

    def fail_closed(self, function):
        with self.assertRaises((RuntimeError, ValueError, OSError)):
            function()

    def mutated(self, stage, index, mutate):
        docs = dict(self.docs)
        document = dict(docs[stage])
        cases = list(document['cases'])
        row = copy.deepcopy(cases[index])
        mutate(row)
        cases[index] = row
        document['cases'] = cases
        docs[stage] = document
        return docs

    def test_wrong_baseline_hash(self):
        docs = dict(self.docs)
        doc = dict(docs['stage-a'])
        doc['candidate_sha256'] = '0' * 64
        docs['stage-a'] = doc
        self.fail_closed(lambda: audit_focused.analyze(docs))

    def test_changed_source_patch(self):
        with tempfile.TemporaryDirectory() as directory:
            patch = Path(directory) / 'source.patch'
            patch.write_text((HERE / 'source.patch').read_text().replace(
                'No canonical pump pool', 'No canonical pool', 1))
            self.fail_closed(lambda: verify.verify_source(patch))

    def test_incorrect_source_composition(self):
        diagnostics = ROOT / 'research/pump-l32-creator-log-parity-20261028/source.patch'
        source = verify.apply_patches([diagnostics])
        self.fail_closed(lambda: require(hashlib.sha256(source).hexdigest() == verify.FINAL_SOURCE,
                                         'incomplete source composition accepted'))

    def test_modified_final_elf(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'candidate.so'
            data = bytearray((HERE / 'builds/final-1/candidate.so').read_bytes())
            data[len(data) // 2] ^= 1
            path.write_bytes(data)
            self.fail_closed(lambda: verify.verify_artifact(path, verify.FINAL, 'mutated final'))

    def test_reordered_logs(self):
        def mutate(row):
            logs = row['candidate']['logs']
            positions = [i for i, line in enumerate(logs) if line.startswith('Program log:')]
            logs[positions[0]], logs[positions[1]] = logs[positions[1]], logs[positions[0]]
        self.fail_closed(lambda: audit_focused.analyze(self.mutated('stage-c', 0, mutate)))

    def test_missing_message(self):
        def mutate(row):
            row['candidate']['logs'].remove(NON_SYSTEM)
        self.fail_closed(lambda: audit_focused.analyze(self.mutated('stage-b', 41, mutate)))

    def test_duplicated_message(self):
        def mutate(row):
            index = row['candidate']['logs'].index(NON_SYSTEM)
            row['candidate']['logs'].insert(index, NON_SYSTEM)
        self.fail_closed(lambda: audit_focused.analyze(self.mutated('stage-b', 41, mutate)))

    def test_changed_case_identity(self):
        def mutate(row):
            row['case'] = {'name': 'forged-case'}
        self.fail_closed(lambda: audit_focused.analyze(self.mutated('stage-c', 0, mutate)))

    def test_corrupted_signed_transaction(self):
        def mutate(row):
            raw = bytearray(base64.b64decode(row['original']['transaction_base64']))
            raw[-1] ^= 1
            encoded = base64.b64encode(raw).decode()
            row['original']['transaction_base64'] = encoded
            row['candidate']['transaction_base64'] = encoded
        self.fail_closed(lambda: audit_focused.analyze(self.mutated('stage-c', 0, mutate)))

    def test_changed_cpi_results(self):
        def mutate(row):
            row['candidate']['inner'] = copy.deepcopy(row['candidate']['inner'])
            if isinstance(row['candidate']['inner'], list):
                row['candidate']['inner'].append({'forged': True})
            else:
                row['candidate']['inner'] = {'forged': True}
        self.fail_closed(lambda: audit_focused.analyze(self.mutated('stage-c', 0, mutate)))

    def test_modified_account_balance(self):
        def mutate(row):
            after = row['candidate']['after']
            name = next(key for key, value in after.items()
                        if isinstance(value, dict) and isinstance(value.get('lamports'), int))
            after[name]['lamports'] += 1
        self.fail_closed(lambda: audit_focused.analyze(self.mutated('stage-c', 0, mutate)))

    def test_incorrect_rollback_state(self):
        index = next(i for i, row in enumerate(self.docs['stage-c']['cases'])
                     if row['candidate']['error'] is not None)
        def mutate(row):
            row['candidate']['after'] = copy.deepcopy(row['candidate']['after'])
            row['candidate']['after']['forged_rollback_state'] = {'lamports': 1}
        self.fail_closed(lambda: audit_focused.analyze(self.mutated('stage-c', index, mutate)))

    def test_changed_event_or_return_data(self):
        index = next(i for i, row in enumerate(self.docs['stage-c']['cases'])
                     if row['candidate'].get('events'))
        def mutate(row):
            row['candidate']['events'] = copy.deepcopy(row['candidate']['events'])
            row['candidate']['events'].append({'forged': True})
        self.fail_closed(lambda: audit_focused.analyze(self.mutated('stage-c', index, mutate)))

    def test_unexpected_manifest_file(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'evidence').write_text('bound')
            digest = hashlib.sha256((root / 'evidence').read_bytes()).hexdigest()
            manifest = root / 'MANIFEST.json'
            manifest.write_text(json.dumps({'evidence': digest}) + '\n')
            (root / 'extra').write_text('unlisted')
            self.fail_closed(lambda: verify_manifest(root, manifest))

    def test_symlink_and_manifest_mismatch(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'evidence').write_text('bound')
            manifest = root / 'MANIFEST.json'
            manifest.write_text(json.dumps({'evidence': '0' * 64}) + '\n')
            self.fail_closed(lambda: verify_manifest(root, manifest))
            manifest.write_text(json.dumps({
                'evidence': hashlib.sha256((root / 'evidence').read_bytes()).hexdigest(),
                'linked': hashlib.sha256((root / 'evidence').read_bytes()).hexdigest(),
            }) + '\n')
            (root / 'linked').symlink_to(root / 'evidence')
            self.fail_closed(lambda: verify_manifest(root, manifest))


if __name__ == '__main__':
    unittest.main()
