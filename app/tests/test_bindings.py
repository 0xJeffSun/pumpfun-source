import copy
import importlib.util
import json
import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('verify_bindings', ROOT / 'scripts/verify-bindings.py')
verify_bindings = importlib.util.module_from_spec(spec)
spec.loader.exec_module(verify_bindings)


def load(name):
    return json.loads((ROOT / 'contracts' / name).read_text(encoding='utf-8'))


class BindingTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.bindings = load('developer-bindings.json')
        cls.coverage = load('coverage.json')

    def mutated(self):
        return copy.deepcopy(self.bindings), copy.deepcopy(self.coverage)

    def entry(self, bindings, operation):
        return next(e for e in bindings['bindings'] if e['operation'] == operation)

    def assertRejects(self, bindings, coverage, message):
        with self.assertRaisesRegex(ValueError, message):
            verify_bindings.verify(bindings=bindings, coverage=coverage)

    def test_checked_in_ledger_verifies(self):
        self.assertEqual(verify_bindings.verify(), (11, 67, 1))

    def test_every_binding_stays_unimplemented_and_unqualified(self):
        for entry in self.bindings['bindings'] + self.bindings['observedNotDeclared']:
            self.assertIs(entry['implemented'], False)
            self.assertIs(entry['qualified'], False)
        for entry in self.bindings['bindings']:
            self.assertEqual(entry['origin']['websiteCallOrigin'], 'unresolved')

    def test_rejects_wrong_scope(self):
        bindings, coverage = self.mutated()
        self.entry(bindings, 'GET /pnl-leaderboard')['scope'] = 'positions.read'
        self.assertRejects(bindings, coverage, 'differs from spec')

    def test_rejects_missing_operation(self):
        bindings, coverage = self.mutated()
        bindings['bindings'] = [e for e in bindings['bindings'] if e['operation'] != 'GET /payouts/leaderboard']
        coverage['developerApi']['contractBound'] = len(bindings['bindings'])
        self.assertRejects(bindings, coverage, 'missing bindings')

    def test_rejects_contract_offset_drift(self):
        bindings, coverage = self.mutated()
        contract = self.entry(bindings, 'GET /competitions')['evidence']['contract']
        contract['start'] += 1
        contract['end'] += 1
        self.assertRejects(bindings, coverage, 'publicRead')

    def test_rejects_call_site_offset_drift(self):
        bindings, coverage = self.mutated()
        site = self.entry(bindings, 'GET /pnl-leaderboard')['evidence']['clientCallSites'][0]
        site['start'] += 1
        self.assertRejects(bindings, coverage, 'internal-operations occurrence')

    def test_rejects_tampered_hash(self):
        bindings, coverage = self.mutated()
        contract = self.entry(bindings, 'GET /competitions')['evidence']['contract']
        contract['sha256'] = '0' * 64
        self.assertRejects(bindings, coverage, 'sha256')

    def test_rejects_qualified_claim(self):
        bindings, coverage = self.mutated()
        self.entry(bindings, 'GET /competitions')['qualified'] = True
        self.assertRejects(bindings, coverage, 'qualification')

    def test_rejects_implemented_claim(self):
        bindings, coverage = self.mutated()
        self.entry(bindings, 'GET /competitions')['implemented'] = True
        self.assertRejects(bindings, coverage, 'implementation')

    def test_rejects_duplicate_binding(self):
        bindings, coverage = self.mutated()
        bindings['bindings'].append(copy.deepcopy(bindings['bindings'][0]))
        self.assertRejects(bindings, coverage, 'duplicate binding')

    def test_rejects_unrecorded_undeclared_route(self):
        bindings, coverage = self.mutated()
        bindings['observedNotDeclared'] = []
        self.assertRejects(bindings, coverage, 'neither bound nor recorded')

    def test_rejects_undeclared_route_in_denominator(self):
        bindings, coverage = self.mutated()
        bindings['observedNotDeclared'][0]['countedInDeveloperDenominator'] = True
        self.assertRejects(bindings, coverage, 'outside the documented denominator')

    def test_rejects_resolved_website_origin_claim(self):
        bindings, coverage = self.mutated()
        self.entry(bindings, 'GET /competitions')['origin']['websiteCallOrigin'] = 'https://api.pump.fun/v1'
        self.assertRejects(bindings, coverage, 'website call origin')

    def test_rejects_stale_coverage_count(self):
        bindings, coverage = self.mutated()
        coverage['developerApi']['contractBound'] = 12
        self.assertRejects(bindings, coverage, 'contractBound')


if __name__ == '__main__':
    unittest.main()
