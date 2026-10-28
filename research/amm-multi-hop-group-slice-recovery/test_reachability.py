"""Source-level proof checks for the recovered checked-slice closure.

These tests model Rust ``usize`` arithmetic and the two loop-advance paths. They
do not execute either the deployed program or the saved reconstructed ELF.
"""
from itertools import product
from pathlib import Path
import unittest


HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
SOURCE = ROOT / "programs/pump-amm/src/instructions/swap/multi_hop_swap.rs"
CHECKED_SLICE = (
    "let group = remaining.get(i * 5..(i + 1) * 5).ok_or_else(|| "
    "error!(PumpAmmError::NotEnoughRemainingAccounts))?;"
)


def accepted_account_count(length):
    return length > 0 and length % 5 == 0


def checked_group(length, index):
    """Model ``slice::get(i * 5..(i + 1) * 5)`` without Python slicing clamps."""
    start = index * 5
    end = (index + 1) * 5
    return (start, end) if 0 <= start <= end <= length else None


def loop_entries(curve_hops):
    """Return outer-loop entries while checking every outer and inner slice."""
    count = len(curve_hops)
    length = count * 5
    index = 0
    entries = []
    while index < count:
        entries.append(index)
        assert checked_group(length, index) is not None
        if curve_hops[index]:
            index += 1
            while index < count and curve_hops[index]:
                assert checked_group(length, index) is not None
                index += 1
        else:
            index += 1
    assert index == count
    return entries


def audit_source(source):
    start = source.index("pub fn execute<'info>(")
    end = source.index("\nfn amount_bytes", start)
    compact = "".join(source[start:end].split())
    assert "!remaining.is_empty()&&remaining.len()%5==0" in compact
    assert "letcount=remaining.len()/5;" in compact
    assert "whilei<count{" in compact
    assert "remaining.get(i*5..(i+1)*5).ok_or_else(||error!(PumpAmmError::NotEnoughRemainingAccounts))?;" in compact
    assert "whilei<count&&is_curve_hop(&remaining[i*5..(i+1)*5])?{" in compact
    # One increment enters a curve run, one continues it, and one completes an AMM hop.
    assert compact.count("i+=1;") == 3
    lines = source.splitlines()
    assert lines[306].strip() == CHECKED_SLICE


class ReachabilityTests(unittest.TestCase):
    def test_source_has_proof_obligations_and_recovered_coordinate(self):
        audit_source(SOURCE.read_text())

    def test_empty_and_nonmultiples_are_rejected(self):
        rejected = [0, 1, 2, 3, 4, 6, 9, 11, 99]
        self.assertTrue(all(not accepted_account_count(value) for value in rejected))
        self.assertTrue(all(accepted_account_count(value) for value in [5, 10, 15, 100]))

    def test_one_hop_and_all_small_multi_hop_shapes_are_safe(self):
        self.assertEqual(loop_entries((False,)), [0])
        self.assertEqual(loop_entries((True,)), [0])
        for count in range(1, 9):
            for shape in product((False, True), repeat=count):
                entries = loop_entries(shape)
                self.assertEqual(entries[0], 0)
                self.assertEqual(entries, sorted(set(entries)))

    def test_checked_slice_rejects_out_of_range_indices(self):
        self.assertEqual(checked_group(5, 0), (0, 5))
        self.assertEqual(checked_group(15, 2), (10, 15))
        self.assertIsNone(checked_group(5, 1))
        self.assertIsNone(checked_group(15, 3))
        self.assertIsNone(checked_group(15, -1))

    def test_maximum_usize_bounds_do_not_overflow(self):
        for bits in (32, 64):
            maximum = (1 << bits) - 1
            self.assertTrue(accepted_account_count(maximum))
            count = maximum // 5
            index = count - 1
            self.assertLess(index + 1, maximum)
            self.assertEqual(index * 5, maximum - 5)
            self.assertEqual((index + 1) * 5, maximum)
            self.assertEqual(checked_group(maximum, index), (maximum - 5, maximum))

    def test_negative_source_controls_are_rejected(self):
        source = SOURCE.read_text()
        mutations = [
            source.replace("!remaining.is_empty() && remaining.len() % 5 == 0", "remaining.len() % 5 == 0", 1),
            source.replace("remaining.len() % 5 == 0", "remaining.len() % 4 == 0", 1),
            source.replace("while i < count {", "while i <= count {", 1),
            source.replace(CHECKED_SLICE, "let group = &remaining[i * 5..(i + 1) * 5];", 1),
            source.replace("i += 1;", "i += 0;", 1),
        ]
        for mutated in mutations:
            with self.subTest():
                with self.assertRaises(AssertionError):
                    audit_source(mutated)


if __name__ == "__main__":
    unittest.main()
