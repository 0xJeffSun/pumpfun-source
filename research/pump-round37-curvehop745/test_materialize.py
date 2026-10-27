"""Pure source tests; supply the pinned parent archive directory. No compiler/VM."""
import argparse, json, shutil, tempfile, unittest
from pathlib import Path
import materialize as m
parser = argparse.ArgumentParser()
parser.add_argument('--parent', required=True, type=Path)
args, remaining = parser.parse_known_args()
PARENT = args.parent.absolute()
class SourceTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.original = (PARENT / 'primary/src/multi_hop_curve_swap.rs').read_bytes()
    def test_exact_materialization(self):
        out = self.root / 'source'
        got = m.materialize(PARENT, out)
        expected = dict(m.PINS['parent_source_sha256'])
        expected[m.PINS['changed_path']] = m.PINS['changed_source_sha256']
        self.assertEqual(got, expected)
        self.assertEqual(len(got), 57)
    def test_same_line_count_and_extent(self):
        new = m.swap(self.original)
        self.assertEqual(len(new), len(self.original))
        self.assertEqual(len(new.splitlines()), len(self.original.splitlines()))
        self.assertEqual([i+1 for i,(a,b) in enumerate(zip(self.original.splitlines(), new.splitlines())) if a != b], [35])
    def test_existing_output_rejected(self):
        out = self.root / 'source'; out.mkdir()
        with self.assertRaises(ValueError): m.materialize(PARENT, out)
    def test_changed_parent_checkpoint_rejected(self):
        parent = self.root / 'parent'; parent.mkdir()
        (parent / 'CHECKPOINT.json').write_text('{}')
        with self.assertRaises(ValueError): m.materialize(parent, self.root / 'source')
        self.assertFalse((self.root / 'source').exists())
    def test_source_mismatch_before_write(self):
        parent = self.root / 'parent'; parent.mkdir()
        shutil.copyfile(PARENT / 'CHECKPOINT.json', parent / 'CHECKPOINT.json')
        shutil.copytree(PARENT / 'primary', parent / 'primary')
        p = parent / 'primary/src/multi_hop_curve_swap.rs'; p.write_bytes(p.read_bytes()+b'\n')
        with self.assertRaises(ValueError): m.materialize(parent, self.root / 'source')
        self.assertFalse((self.root / 'source').exists())
    def test_symlink_parent_rejected(self):
        link = self.root / 'link'; link.symlink_to(PARENT, target_is_directory=True)
        with self.assertRaises(ValueError): m.materialize(link, self.root / 'source')
    def test_already_changed_rejected(self):
        with self.assertRaises(ValueError): m.swap(m.swap(self.original))
    def test_wrong_fallback_rejected(self):
        with self.assertRaises(ValueError): m.swap(self.original.replace(b'quote_mint.key()==WSOL', b'quote_mint.key()!=WSOL'))
    def test_effectful_getter_rejected(self):
        with self.assertRaises(ValueError): m.swap(self.original.replace(b'quote_mint.key()', b'quote_mint.to_account_info().key()'))
    def test_duplicate_comparison_rejected(self):
        with self.assertRaises(ValueError): m.swap(self.original+m.OLD)
    def test_traversal_rejected(self):
        for name in ['../outside', '/absolute']:
            with self.assertRaises(ValueError): m.safe_relative(name)
    def test_exact_reserve_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'reserve746')
        expected = dict(m.PINS['parent_source_sha256'])
        expected[m.PINS['changed_path']] = m.PINS['changed_source_sha256']
        pins = json.loads((m.HERE / 'reserve-pins.json').read_text())
        expected[pins['changed_path']] = pins['changed_sha256']
        self.assertEqual(got, expected)
        self.assertEqual(len(got), 57)
    def test_reserve_only_line85(self):
        data = (PARENT / 'primary/src/mayhem_virtual_params.rs').read_bytes()
        new = m.reserve_swap(data)
        self.assertEqual(len(data.splitlines()), len(new.splitlines()))
        self.assertEqual([i+1 for i,(a,b) in enumerate(zip(data.splitlines(),new.splitlines())) if a != b], [85])
    def test_reserve_already_changed_rejected(self):
        data = (PARENT / 'primary/src/mayhem_virtual_params.rs').read_bytes()
        with self.assertRaises(ValueError): m.reserve_swap(m.reserve_swap(data))
    def test_reserve_wrong_error_rejected(self):
        data = (PARENT / 'primary/src/mayhem_virtual_params.rs').read_bytes()
        with self.assertRaises(ValueError): m.reserve_swap(data.replace(b'PumpError::Overflow',b'PumpError::MintDoesNotMatchBondingCurve'))
    def test_reserve_coordinate_shift_rejected(self):
        data = (PARENT / 'primary/src/mayhem_virtual_params.rs').read_bytes()
        with self.assertRaises(ValueError): m.reserve_swap(b'\n'+data)
    def test_unknown_stage_before_write(self):
        with self.assertRaises(ValueError): m.materialize(PARENT, self.root / 'source', 'unapproved')
        self.assertFalse((self.root / 'source').exists())
    def test_widened_add_unreachable_error_bound(self):
        maximum = (1 << 64) - 1
        self.assertLess(maximum + maximum, 1 << 128)
        for a in [0, 1, maximum]:
            for b in [0, 1, maximum]: self.assertLess(a+b, 1 << 128)
    def arithmetic_parent(self):
        out = self.root / 'reserve-parent'
        m.materialize(PARENT, out, 'reserve746')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_exact_arithmetic_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'arithmetic749')
        expected = dict(m.PINS['parent_source_sha256'])
        expected[m.PINS['changed_path']] = m.PINS['changed_source_sha256']
        reserve = json.loads((m.HERE / 'reserve-pins.json').read_text())
        expected[reserve['changed_path']] = reserve['changed_sha256']
        pins = json.loads((m.HERE / 'arithmetic-pins.json').read_text())
        expected.update({n:e['changed_sha256'] for n,e in pins['changes'].items()})
        self.assertEqual(got, expected)
        self.assertEqual(len(got), 58)
    def test_arithmetic_preserves_other54_inputs(self):
        before = self.arithmetic_parent(); after = m.arithmetic_apply(before)
        edits = json.loads((m.HERE / 'arithmetic-pins.json').read_text())['changes']
        self.assertEqual(sum(n not in edits for n in before), 54)
        for n in before:
            if n not in edits: self.assertEqual(before[n], after[n])
        self.assertEqual(len(before), 57) # caller dictionary is not mutated
    def test_arithmetic_already_applied_rejected(self):
        with self.assertRaises(ValueError): m.arithmetic_apply(m.arithmetic_apply(self.arithmetic_parent()))
    def test_arithmetic_source_mutation_rejected(self):
        before = self.arithmetic_parent(); before['programs/pump/src/buy.rs'] += b'\n'
        with self.assertRaises(ValueError): m.arithmetic_apply(before)
    def test_arithmetic_added_file_collision_rejected(self):
        before = self.arithmetic_parent(); before['programs/pump/src/util/constant_product.rs'] = b''
        with self.assertRaises(ValueError): m.arithmetic_apply(before)
    def test_arithmetic_missing_parent_rejected(self):
        before = self.arithmetic_parent(); del before['programs/pump/src/trade_v3.rs']
        with self.assertRaises(ValueError): m.arithmetic_apply(before)
    def test_arithmetic_observed_source_coordinates(self):
        after = m.arithmetic_apply(self.arithmetic_parent())
        helper = after['programs/pump/src/util/constant_product.rs'].decode().splitlines()
        self.assertIn('PumpError::Overflow', helper[12])
        self.assertIn('PumpError::Overflow', helper[16])
        self.assertIn('PumpError::DivisionByZero', helper[18])
        self.assertIn('PumpError::Truncation', after['programs/pump/src/trade_v3.rs'].decode().splitlines()[590])
if __name__ == '__main__': unittest.main(argv=['test_materialize.py', *remaining])
