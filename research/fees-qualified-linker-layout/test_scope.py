"""In-memory controls for actual layout and receipt rejection boundaries."""
from pathlib import Path
import copy
import importlib.util
from functools import lru_cache
import struct
import unittest

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('qualified_verify_tests', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


class Scope(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.receipts = v.load(HERE / 'runtime.json')
        cls.previous = v.load(v.PARENT / 'runtime.json')
        cls.original = cls.receipts['original_sha256']
        cls.candidate = cls.receipts['candidate_sha256']
        cls.plan = v.load(HERE / 'layout/order-plan.json')
        cls.sections = v.load(HERE / 'layout/baseline-sections.json')

    def changed_suite(self, name):
        result = dict(self.receipts)
        result['suites'] = dict(self.receipts['suites'])
        result['suites'][name] = dict(self.receipts['suites'][name])
        result['suites'][name]['cases'] = list(self.receipts['suites'][name]['cases'])
        return result, result['suites'][name]

    def reject(self, run):
        with self.assertRaises(AssertionError):
            v.check_runtime(run, self.previous, self.original, self.candidate)

    def test_unchanged_receipts(self):
        v.check_runtime(self.receipts, self.previous, self.original, self.candidate)

    def test_parent_binary_substitution(self):
        run = dict(self.receipts, candidate_sha256=self.previous['candidate_sha256'])
        self.reject(run)

    def test_missing_case(self):
        run, suite = self.changed_suite('sharing_update')
        suite['cases'].pop()
        suite['case_count'] -= 1
        self.reject(run)

    def test_duplicated_case(self):
        run, suite = self.changed_suite('sharing_update')
        suite['cases'][1] = suite['cases'][0]
        self.reject(run)

    def test_changed_query_result(self):
        run, suite = self.changed_suite('queries')
        suite['cases'][0] = copy.deepcopy(suite['cases'][0])
        suite['cases'][0]['candidate']['fees'][0] += 1
        self.reject(run)

    def test_missing_match_flag(self):
        run, suite = self.changed_suite('sharing_update')
        suite['cases'][0] = dict(suite['cases'][0])
        suite['cases'][0].pop('match')
        self.reject(run)

    def test_changed_application_log(self):
        name = next(name for name, suite in self.receipts['suites'].items()
                    if any('logs' in row.get('candidate', {}) for row in suite['cases']))
        run, suite = self.changed_suite(name)
        index = next(i for i, row in enumerate(suite['cases']) if 'logs' in row.get('candidate', {}))
        suite['cases'][index] = copy.deepcopy(suite['cases'][index])
        suite['cases'][index]['candidate']['logs'].append('Program log: injected mismatch')
        self.reject(run)

    def test_unchanged_layout(self):
        rows = v.layout_rows(self.sections, self.plan)
        self.assertEqual(rows, v.load(HERE / 'layout/ordered-sections.json'))
        self.assertEqual(v.ordered_script(v.read(HERE / 'layout/default.ld').decode(), rows),
                         v.read(HERE / 'layout/ordered.ld').decode())

    def test_duplicate_binding(self):
        plan = copy.deepcopy(self.plan)
        plan['ordered'][1]['candidate'] = plan['ordered'][0]['candidate']
        with self.assertRaises(AssertionError):
            v.layout_rows(self.sections, plan)

    def test_unknown_binding(self):
        plan = copy.deepcopy(self.plan)
        plan['ordered'][0]['candidate'] = 1
        with self.assertRaises(KeyError):
            v.layout_rows(self.sections, plan)

    def test_redirected_direct_call(self):
        w = v.module('qualified_call_mutation', v.ROOT / 'research/fees-composed-frontier188/window_map.py')
        w.m.elf_layout = lru_cache(maxsize=8)(w.m.elf_layout)
        w.m.relocations = lru_cache(maxsize=8)(w.m.relocations)
        before = v.read(HERE / 'artifacts/baseline-symbols.so')
        after = v.read(HERE / 'artifacts/candidate-symbols.so')
        rows = v.layout_rows(self.sections, self.plan)
        emitted = v.map_sections(v.read(HERE / 'builds/candidate.map').decode())
        mapping = {row['address']: actual['address'] for row, actual in zip(rows, emitted)}
        self.assertGreater(v.check_direct_targets(w, before, after, mapping), 3877)
        rel = dict(w.m.relocations(after))
        instruction = next((row['address'] + insn['offset'], insn)
                           for row in emitted
                           for insn in w.m.instructions(after, row['address'], row['size'])
                           if 'call_target' in insn and rel.get(row['address'] + insn['offset'], 0) & 0xffffffff != 10)
        pc, insn = instruction
        other = next(address for address in mapping.values() if address != insn['call_target'])
        section = next(row for row in w.m.elf_layout(after)['sections'] if row['name'] == '.text')
        damaged = bytearray(after)
        struct.pack_into('<i', damaged, section['offset'] + pc - section['address'] + 4, (other - pc - 8) // 8)
        with self.assertRaises(AssertionError):
            v.check_direct_targets(w, before, bytes(damaged), mapping)


if __name__ == '__main__':
    unittest.main()
