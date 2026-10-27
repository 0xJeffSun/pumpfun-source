"""Test recursive call obligations and evidence bindings."""
import json
from pathlib import Path
import tempfile
import unittest
import verify


class ClosureTests(unittest.TestCase):
    def test_leaf_and_supported_recursion_survive(self):
        pairs = {(1, 10), (2, 20), (3, 30)}
        edges = {(1, 10): [], (2, 20): [(3, 30)], (3, 30): [(2, 20)]}
        self.assertEqual(verify.prune(pairs, edges), (pairs, {}, []))

    def test_missing_target_propagates_simultaneously(self):
        pairs = {(1, 10), (2, 20), (3, 30)}
        edges = {(1, 10): [(2, 20)], (2, 20): [(3, 30)], (3, 30): [(4, 40)]}
        active, removed, rounds = verify.prune(pairs, edges)
        self.assertEqual(active, set())
        self.assertEqual(removed, {(3, 30): 1, (2, 20): 2, (1, 10): 3})
        self.assertEqual(rounds, [1, 1, 1])

    def test_one_wrong_call_breaks_an_otherwise_supported_cycle(self):
        pairs = {(1, 10), (2, 20)}
        edges = {(1, 10): [(2, 20)], (2, 20): [(1, 10), (9, 90)]}
        self.assertEqual(verify.prune(pairs, edges)[2], [1, 1])

    def test_counterpart_alternatives_remain_separate(self):
        pairs = {(1, 10), (1, 11), (2, 20)}
        edges = {(1, 10): [(2, 20)], (1, 11): [(2, 21)], (2, 20): []}
        self.assertEqual(verify.prune(pairs, edges)[0], {(1, 10), (2, 20)})

    def test_retained_report(self):
        self.assertEqual(verify.derive(), json.loads((verify.HERE / 'report.json').read_text()))

    def test_each_input_is_hash_bound(self):
        for name in verify.INPUTS:
            with self.subTest(name=name), tempfile.TemporaryDirectory() as temp:
                root = Path(temp)
                for input_name in verify.INPUTS:
                    dest = root / input_name
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    dest.write_bytes((verify.ROOT / input_name).read_bytes())
                dest = root / name
                data = bytearray(dest.read_bytes())
                data[len(data) // 2] ^= 1
                dest.write_bytes(data)
                with self.assertRaisesRegex(ValueError, 'input hash mismatch'):
                    verify.derive(root)


if __name__ == '__main__':
    unittest.main()
