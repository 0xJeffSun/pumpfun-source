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
    def test_exact_sourcefronts_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'sourcefronts780')
        self.assertEqual(got, json.loads((m.HERE / 'sourcefronts-pins.json').read_text())['source_sha256'])
        self.assertEqual(len(got), 60)
    def sourcefronts_parent(self):
        out = self.root / 'arithmetic-parent'
        m.materialize(PARENT, out, 'arithmetic749')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_sourcefronts_already_changed_rejected(self):
        data = m.sourcefronts_apply(self.sourcefronts_parent())
        with self.assertRaises(ValueError): m.sourcefronts_apply(data)
    def test_sourcefronts_missing_source_rejected(self):
        data = self.sourcefronts_parent(); data.pop('programs/pump/src/lib.rs')
        with self.assertRaises(ValueError): m.sourcefronts_apply(data)
    def test_sourcefronts_extra_source_rejected(self):
        data = self.sourcefronts_parent(); data['extra.rs'] = b''
        with self.assertRaises(ValueError): m.sourcefronts_apply(data)
    def test_sourcefronts_changed_source_rejected(self):
        data = self.sourcefronts_parent(); data['programs/pump/src/lib.rs'] += b'\n'
        with self.assertRaises(ValueError): m.sourcefronts_apply(data)
    def test_sourcefronts_preserves_prior_corrections(self):
        data = self.sourcefronts_parent(); changed = m.sourcefronts_apply(data)
        for name in ['multi_hop_curve_swap.rs', 'mayhem_virtual_params.rs', 'util/constant_product.rs']:
            self.assertEqual(data['programs/pump/src/' + name], changed['programs/pump/src/' + name])
    def clamp_parent(self):
        out = self.root / 'clamp-parent'
        m.materialize(PARENT, out, 'sourcefronts780')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_exact_clamp_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'clamp786')
        pins = json.loads((m.HERE / 'clamp-pins.json').read_text())
        expected = json.loads((m.HERE / 'sourcefronts-pins.json').read_text())['source_sha256']
        expected[pins['changed_path']] = pins['changed_sha256']
        self.assertEqual(got, expected)
        self.assertEqual(len(got), 60)
    def test_clamp_only_line2911(self):
        data = self.clamp_parent(); changed = m.clamp_apply(data)
        names = [n for n in data if data[n] != changed[n]]
        self.assertEqual(names, ['programs/pump/src/buy.rs'])
        old, new = data[names[0]].splitlines(), changed[names[0]].splitlines()
        self.assertEqual(len(old), len(new))
        self.assertEqual([i+1 for i, (a, b) in enumerate(zip(old, new)) if a != b], [2911])
    def test_clamp_already_applied_rejected(self):
        with self.assertRaises(ValueError): m.clamp_apply(m.clamp_apply(self.clamp_parent()))
    def test_clamp_changed_parent_rejected(self):
        data = self.clamp_parent(); data['programs/pump/src/buy.rs'] += b'\n'
        with self.assertRaises(ValueError): m.clamp_apply(data)
    def test_clamp_extra_parent_rejected(self):
        data = self.clamp_parent(); data['extra.rs'] = b''
        with self.assertRaises(ValueError): m.clamp_apply(data)
    def test_clamp_missing_parent_rejected(self):
        data = self.clamp_parent(); data.pop('programs/pump/src/buy.rs')
        with self.assertRaises(ValueError): m.clamp_apply(data)
    def test_clamp_pure_unsigned_min_failure_zero(self):
        for value in [0, 1, 2, (1 << 64)-1]:
            for reserve in [0, 1, 2, (1 << 64)-1]:
                amount = min(value, reserve)
                self.assertEqual(amount <= 0, amount == 0)
                self.assertEqual(amount, min(value, reserve))
    def visibility_parent(self):
        out = self.root / 'visibility-parent'
        m.materialize(PARENT, out, 'clamp786')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_exact_visibility_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'visibility788')
        pins = json.loads((m.HERE / 'visibility-pins.json').read_text())
        self.assertEqual(got, pins['source_sha256'])
        self.assertEqual(len(got), 60)
    def test_visibility_only_three_lines(self):
        data = self.visibility_parent(); changed = m.visibility_apply(data)
        expected = {'programs/pump/src/buy.rs': [2945], 'programs/pump/src/legacy_native_payments.rs': [4, 18]}
        self.assertEqual({n for n in data if data[n] != changed[n]}, set(expected))
        for n, lines in expected.items():
            a, b = data[n].splitlines(), changed[n].splitlines()
            self.assertEqual(len(a), len(b))
            self.assertEqual([i+1 for i, (x, y) in enumerate(zip(a, b)) if x != y], lines)
    def test_visibility_already_applied_rejected(self):
        with self.assertRaises(ValueError): m.visibility_apply(m.visibility_apply(self.visibility_parent()))
    def test_visibility_wrong_parent_rejected(self):
        data = self.visibility_parent(); data['programs/pump/src/buy.rs'] += b'\n'
        with self.assertRaises(ValueError): m.visibility_apply(data)
    def test_visibility_extra_parent_rejected(self):
        data = self.visibility_parent(); data['extra.rs'] = b''
        with self.assertRaises(ValueError): m.visibility_apply(data)
    def test_visibility_missing_parent_rejected(self):
        data = self.visibility_parent(); data.pop('programs/pump/src/lib.rs')
        with self.assertRaises(ValueError): m.visibility_apply(data)
    def test_visibility_keeps_dispatcher_v2_clamp(self):
        data = self.visibility_parent(); changed = m.visibility_apply(data)
        for n in ['lib.rs', 'v2_native_payments.rs', 'buy_v2.rs', 'sell_v2.rs']:
            self.assertEqual(data['programs/pump/src/' + n], changed['programs/pump/src/' + n])
        self.assertEqual(data['programs/pump/src/buy.rs'].splitlines()[2910], changed['programs/pump/src/buy.rs'].splitlines()[2910])
    def v2rent_parent(self):
        out = self.root / 'v2rent-parent'
        m.materialize(PARENT, out, 'visibility788')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_exact_v2rent_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'v2rent789')
        pins = json.loads((m.HERE / 'v2rent-pins.json').read_text())
        expected = json.loads((m.HERE / 'visibility-pins.json').read_text())['source_sha256']
        expected[pins['changed_path']] = pins['changed_sha256']
        self.assertEqual(got, expected)
        self.assertEqual(len(got), 60)
    def test_v2rent_only_one_source(self):
        data = self.v2rent_parent(); changed = m.v2rent_apply(data)
        self.assertEqual([n for n in data if data[n] != changed[n]], ['programs/pump/src/v2_native_payments.rs'])
        text = changed['programs/pump/src/v2_native_payments.rs'].decode()
        self.assertIn('_size: usize', text)
        self.assertIn('minimum_balance(0)', text)
        self.assertIn('crate::legacy_buy::native_payments::transfer(', text)
        self.assertNotIn('fn transfer', text)
    def test_v2rent_already_applied_rejected(self):
        with self.assertRaises(ValueError): m.v2rent_apply(m.v2rent_apply(self.v2rent_parent()))
    def test_v2rent_wrong_parent_rejected(self):
        data = self.v2rent_parent(); data['programs/pump/src/v2_native_payments.rs'] += b'\n'
        with self.assertRaises(ValueError): m.v2rent_apply(data)
    def test_v2rent_extra_parent_rejected(self):
        data = self.v2rent_parent(); data['extra.rs'] = b''
        with self.assertRaises(ValueError): m.v2rent_apply(data)
    def test_v2rent_missing_parent_rejected(self):
        data = self.v2rent_parent(); data.pop('programs/pump/src/lib.rs')
        with self.assertRaises(ValueError): m.v2rent_apply(data)
    def test_v2rent_preserves_typed_zero_source_calls(self):
        data = m.v2rent_apply(self.v2rent_parent())
        self.assertIn('native_payments::ensure_rent_exempt(0,', data['programs/pump/src/buy_v2.rs'].decode().splitlines()[228])
        self.assertIn('native_payments::ensure_rent_exempt(0,', data['programs/pump/src/sell_v2.rs'].decode().splitlines()[104])
    def fourfronts_parent(self):
        out = self.root / 'fourfronts-parent'
        m.materialize(PARENT, out, 'v2rent789')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_exact_fourfronts_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'fourfronts795')
        self.assertEqual(got, json.loads((m.HERE / 'fourfronts-pins.json').read_text())['source_sha256'])
        self.assertEqual(len(got), 60)
    def test_fourfronts_three_files_and_prior_fixes(self):
        data = self.fourfronts_parent(); changed = m.fourfronts_apply(data)
        self.assertEqual({n for n in data if data[n] != changed[n]}, {'programs/pump/src/lib.rs', 'programs/pump/src/buy.rs', 'programs/pump/src/trade_v3.rs'})
        for n in data: self.assertEqual(len(data[n].splitlines()), len(changed[n].splitlines()))
        self.assertEqual(data['programs/pump/src/buy.rs'].splitlines()[2910], changed['programs/pump/src/buy.rs'].splitlines()[2910])
        self.assertEqual(data['programs/pump/src/buy.rs'].splitlines()[2944], changed['programs/pump/src/buy.rs'].splitlines()[2944])
        self.assertEqual(data['programs/pump/src/v2_native_payments.rs'], changed['programs/pump/src/v2_native_payments.rs'])
    def test_fourfronts_already_applied_rejected(self):
        with self.assertRaises(ValueError): m.fourfronts_apply(m.fourfronts_apply(self.fourfronts_parent()))
    def test_fourfronts_wrong_parent_rejected(self):
        data = self.fourfronts_parent(); data['programs/pump/src/trade_v3.rs'] += b'\n'
        with self.assertRaises(ValueError): m.fourfronts_apply(data)
    def test_fourfronts_extra_parent_rejected(self):
        data = self.fourfronts_parent(); data['extra.rs'] = b''
        with self.assertRaises(ValueError): m.fourfronts_apply(data)
    def test_fourfronts_missing_parent_rejected(self):
        data = self.fourfronts_parent(); data.pop('programs/pump/src/lib.rs')
        with self.assertRaises(ValueError): m.fourfronts_apply(data)
    def test_fourfronts_source_origins_and_singleton(self):
        data = m.fourfronts_apply(self.fourfronts_parent())
        trade = data['programs/pump/src/trade_v3.rs'].decode().splitlines()
        self.assertIn('error!(PumpError::Overflow)', trade[284])
        self.assertIn('error!(PumpError::Overflow)', trade[293])
        lib = data['programs/pump/src/lib.rs'].decode()
        self.assertIn('whitelisted_quote_mints: [Pubkey; 1]', lib)
        self.assertIn('legacy_buy::execute::<false>', lib)
        self.assertIn('legacy_buy::execute::<true>', lib)
        for line, error in [(1950, 'QuoteMintNotEligibleForWhitelist'), (1955, 'QuoteMintNotEligibleForWhitelist'), (1960, 'QuoteMintAlreadyWhitelisted'), (1971, 'QuoteMintWhitelistFull'), (1975, 'QuoteMintNotEligibleForWhitelist'), (1986, 'QuoteMintNotWhitelisted')]:
            self.assertIn(error, lib.splitlines()[line-1])
    def harvest_parent(self):
        out = self.root / 'harvest-parent'
        m.materialize(PARENT, out, 'fourfronts795')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_exact_harvest_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'harvest799')
        self.assertEqual(got, json.loads((m.HERE / 'harvest-pins.json').read_text())['source_sha256'])
        self.assertEqual(len(got), 60)
    def test_harvest_only_one_file_and_existing_coordinates(self):
        old = self.harvest_parent(); new = m.harvest_apply(old)
        name = 'programs/pump/src/migrate_v2.rs'
        self.assertEqual({n for n in old if old[n] != new[n]}, {name})
        a, b = old[name].splitlines(), new[name].splitlines()
        self.assertEqual(len(b), len(a) + 6)
        self.assertEqual([i + 1 for i in range(len(a)) if a[i] != b[i]], [328])
    def test_harvest_already_applied_rejected(self):
        with self.assertRaises(ValueError): m.harvest_apply(m.harvest_apply(self.harvest_parent()))
    def test_harvest_wrong_parent_rejected(self):
        data = self.harvest_parent(); data['programs/pump/src/migrate_v2.rs'] += b'\n'
        with self.assertRaises(ValueError): m.harvest_apply(data)
    def test_harvest_extra_parent_rejected(self):
        data = self.harvest_parent(); data['extra.rs'] = b''
        with self.assertRaises(ValueError): m.harvest_apply(data)
    def test_harvest_missing_parent_rejected(self):
        data = self.harvest_parent(); data.pop('programs/pump/src/migrate_v2.rs')
        with self.assertRaises(ValueError): m.harvest_apply(data)
    def test_harvest_guard_and_typed_account_order(self):
        text = m.harvest_apply(self.harvest_parent())['programs/pump/src/migrate_v2.rs'].decode()
        line = text.splitlines()[327]
        self.assertLess(line.index('quote_extensions'), line.index('is_writable'))
        self.assertLess(line.index('is_writable'), line.index('harvest_withheld_tokens_to_mint'))
        self.assertIn('&a.quote_token_program.to_account_info(),&a.quote_mint.to_account_info(),&a.pool_authority_quote_account', line)
        self.assertIn('token_program_id:token_program.clone(),mint:mint.clone()', text)
        self.assertIn('vec![source.clone()]', text)
    def nextfronts_parent(self):
        out = self.root / 'nextfronts-parent'
        m.materialize(PARENT, out, 'harvest799')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_exact_nextfronts_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'nextfronts804')
        self.assertEqual(got, json.loads((m.HERE / 'nextfronts-pins.json').read_text())['source_sha256'])
        self.assertEqual(len(got), 60)
    def test_nextfronts_only_two_files_and_line_counts(self):
        old = self.nextfronts_parent(); new = m.nextfronts_apply(old)
        self.assertEqual({n for n in old if old[n] != new[n]}, {'programs/pump/src/lib.rs', 'programs/pump/src/trade_v3.rs'})
        for n in old: self.assertEqual(len(old[n].splitlines()), len(new[n].splitlines()))
    def test_nextfronts_repaired_source_coordinates(self):
        data = m.nextfronts_apply(self.nextfronts_parent()); lines = data['programs/pump/src/lib.rs'].decode().splitlines()
        self.assertEqual(lines[1935].index('expect') + 1, 45)
        self.assertEqual(lines[1938].index('expect') + 1, 14)
        for line in [2496, 2501, 2506, 2511, 2520, 2525, 2530, 2535, 2550, 2554]: self.assertIn('PumpError::Overflow', lines[line - 1])
        self.assertIn('PumpError::DivisionByZero', lines[2480])
        self.assertIn('require_neq!', lines[1904])
    def test_nextfronts_prechecks_and_private_helper_shape(self):
        data = m.nextfronts_apply(self.nextfronts_parent()); lib = data['programs/pump/src/lib.rs'].decode(); trade = data['programs/pump/src/trade_v3.rs'].decode()
        self.assertEqual(trade.count('let next_protocol='), 3)
        self.assertEqual(trade.count('let next_creator='), 3)
        self.assertEqual(trade.count('curve.accrue_fees('), 5)
        self.assertEqual(lib.count('fn split_protocol_fee_values('), 1)
        self.assertNotIn('pub fn split_protocol_fee_values', lib)
        self.assertEqual(lib.count('split_protocol_fee_values(global.buyback_basis_points, protocol_fee)'), 2)
        self.assertIn('fn v3_buyback_split(', trade)
    def test_nextfronts_already_applied_rejected(self):
        with self.assertRaises(ValueError): m.nextfronts_apply(m.nextfronts_apply(self.nextfronts_parent()))
    def test_nextfronts_wrong_parent_rejected(self):
        data = self.nextfronts_parent(); data['programs/pump/src/lib.rs'] += b'\n'
        with self.assertRaises(ValueError): m.nextfronts_apply(data)
    def test_nextfronts_extra_parent_rejected(self):
        data = self.nextfronts_parent(); data['extra.rs'] = b''
        with self.assertRaises(ValueError): m.nextfronts_apply(data)
    def test_nextfronts_missing_parent_rejected(self):
        data = self.nextfronts_parent(); data.pop('programs/pump/src/lib.rs')
        with self.assertRaises(ValueError): m.nextfronts_apply(data)
    def chain_parent(self):
        out = self.root / 'chain-parent'
        m.materialize(PARENT, out, 'nextfronts804')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_exact_chain_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'chain805')
        self.assertEqual(got, json.loads((m.HERE / 'chain-pins.json').read_text())['source_sha256'])
        self.assertEqual(len(got), 60)
    def test_chain_exact_two_files_and_coordinates(self):
        old = self.chain_parent(); new = m.chain_apply(old)
        self.assertEqual({n for n in old if old[n] != new[n]}, {'programs/pump/src/create_v2.rs', 'programs/pump/src/nested_create.rs'})
        self.assertTrue(new['programs/pump/src/create_v2.rs'].startswith(old['programs/pump/src/create_v2.rs']))
        self.assertEqual(new['programs/pump/src/create_v2.rs'].decode().splitlines()[411].strip(), 'error!(PumpError::QuoteChainAccountsRequired)')
        self.assertEqual(len(new['programs/pump/src/nested_create.rs'].splitlines()), len(old['programs/pump/src/nested_create.rs'].splitlines()))
    def test_chain_lazy_owned_error_and_prior_decoder(self):
        old = self.chain_parent(); new = m.chain_apply(old)
        self.assertIn(b'tail.first().ok_or_else(super::quote_chain_accounts_required)?', new['programs/pump/src/nested_create.rs'])
        self.assertIn(b'fn quote_chain_accounts_required() -> anchor_lang::error::Error', new['programs/pump/src/create_v2.rs'])
        self.assertEqual(old['programs/pump/src/trade_types.rs'], new['programs/pump/src/trade_types.rs'])
    def test_chain_already_applied_rejected(self):
        with self.assertRaises(ValueError): m.chain_apply(m.chain_apply(self.chain_parent()))
    def test_chain_wrong_parent_rejected(self):
        data = self.chain_parent(); data['programs/pump/src/create_v2.rs'] += b'\n'
        with self.assertRaises(ValueError): m.chain_apply(data)
    def test_chain_extra_parent_rejected(self):
        data = self.chain_parent(); data['extra.rs'] = b''
        with self.assertRaises(ValueError): m.chain_apply(data)
    def test_chain_missing_parent_rejected(self):
        data = self.chain_parent(); data.pop('programs/pump/src/create_v2.rs')
        with self.assertRaises(ValueError): m.chain_apply(data)
    def feeconfig_parent(self):
        out = self.root / 'feeconfig-parent'
        m.materialize(PARENT, out, 'chain805')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_exact_feeconfig_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'feeconfig806')
        self.assertEqual(got, json.loads((m.HERE / 'feeconfig-pins.json').read_text())['source_sha256'])
        self.assertEqual(len(got), 60)
    def test_feeconfig_only_local_route_type(self):
        old = self.feeconfig_parent(); new = m.feeconfig_apply(old)
        self.assertEqual({n for n in old if old[n] != new[n]}, {'programs/pump/src/trade_types.rs'})
        self.assertEqual(len(new['programs/pump/src/trade_types.rs'].splitlines()), len(old['programs/pump/src/trade_types.rs'].splitlines()) + 11)
        self.assertIn(b'accounts::FeeConfig as LegacyFeeConfig', new['programs/pump/src/sell.rs'])
    def test_feeconfig_fields_and_derive(self):
        data = m.feeconfig_apply(self.feeconfig_parent()); src = data['programs/pump/src/trade_types.rs']
        self.assertIn(b'#[derive(AnchorSerialize, AnchorDeserialize, Clone)]\npub struct FeeConfig {', src)
        fields = [b'pub bump: u8', b'pub admin: Pubkey', b'pub flat_fees: Fees', b'pub fee_tiers: Vec<FeeTier>', b'pub stable_fee_tiers: Vec<FeeTier>', b'pub exotic_flat_fees: Fees']
        offsets = [src.index(field) for field in fields]
        self.assertEqual(offsets, sorted(offsets))
        self.assertNotIn(b'    accounts::FeeConfig,', src)
    def test_feeconfig_already_applied_rejected(self):
        with self.assertRaises(ValueError): m.feeconfig_apply(m.feeconfig_apply(self.feeconfig_parent()))
    def test_feeconfig_wrong_parent_rejected(self):
        data = self.feeconfig_parent(); data['programs/pump/src/trade_types.rs'] += b'\n'
        with self.assertRaises(ValueError): m.feeconfig_apply(data)
    def test_feeconfig_extra_parent_rejected(self):
        data = self.feeconfig_parent(); data['extra.rs'] = b''
        with self.assertRaises(ValueError): m.feeconfig_apply(data)
    def test_feeconfig_missing_parent_rejected(self):
        data = self.feeconfig_parent(); data.pop('programs/pump/src/trade_types.rs')
        with self.assertRaises(ValueError): m.feeconfig_apply(data)
    def next369_parent(self):
        out = self.root / 'next369-parent'
        m.materialize(PARENT, out, 'feeconfig806')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_exact_next369_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'next369810')
        self.assertEqual(got, json.loads((m.HERE / 'next369-pins.json').read_text())['source_sha256'])
        self.assertEqual(len(got), 61)
    def test_next369_exact_scope(self):
        old = self.next369_parent(); new = m.next369_apply(old)
        self.assertEqual({n for n in old if old[n] != new[n]}, {'programs/pump/src/lib.rs', 'programs/pump/src/trade_v3.rs', 'programs/pump/src/migrate.rs'})
        self.assertEqual(set(new) - set(old), {'programs/pump/src/util/transfer_fee.rs'})
        for n in old: self.assertEqual(len(new[n].splitlines()), len(old[n].splitlines()))
    def test_next369_no_hint_and_prior_harvest(self):
        data = m.next369_apply(self.next369_parent())
        self.assertNotIn(b'#[inline(always)]', data['programs/pump/src/trade_v3.rs'])
        self.assertIn(b'pub struct FeeConfig {', data['programs/pump/src/trade_types.rs'])
        self.assertIn(b'harvest', data['programs/pump/src/migrate_v2.rs'])
    def test_next369_already_applied_rejected(self):
        with self.assertRaises(ValueError): m.next369_apply(m.next369_apply(self.next369_parent()))
    def test_next369_wrong_parent_rejected(self):
        data = self.next369_parent(); data['programs/pump/src/lib.rs'] += b'\n'
        with self.assertRaises(ValueError): m.next369_apply(data)
    def test_next369_extra_parent_rejected(self):
        data = self.next369_parent(); data['extra.rs'] = b''
        with self.assertRaises(ValueError): m.next369_apply(data)
    def test_next369_missing_parent_rejected(self):
        data = self.next369_parent(); data.pop('programs/pump/src/lib.rs')
        with self.assertRaises(ValueError): m.next369_apply(data)
    def v2errors_parent(self):
        out = self.root / 'v2errors-parent'
        m.materialize(PARENT, out, 'next369810')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_exact_v2errors_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'v2errors814')
        self.assertEqual(got, json.loads((m.HERE / 'v2errors-pins.json').read_text())['source_sha256'])
        self.assertEqual(len(got), 61)
    def test_v2errors_exact_scope(self):
        old = self.v2errors_parent(); new = m.v2errors_apply(old)
        self.assertEqual({n for n in old if old[n] != new[n]}, {'programs/pump/src/migrate_v2.rs', 'programs/pump/src/sell_v2.rs'})
        self.assertEqual(len(new['programs/pump/src/migrate_v2.rs'].splitlines()), len(old['programs/pump/src/migrate_v2.rs'].splitlines()))
        self.assertEqual(new['programs/pump/src/lib.rs'], old['programs/pump/src/lib.rs'])
    def test_v2errors_source_and_harvest(self):
        old = self.v2errors_parent(); new = m.v2errors_apply(old)
        path = 'programs/pump/src/migrate_v2.rs'
        self.assertEqual(new[path].splitlines()[327], old[path].splitlines()[327])
        self.assertIn(b'quote_balance_overflow', new[path].splitlines()[325])
        sell = new['programs/pump/src/sell_v2.rs'].splitlines()
        for line, name in [(366, b'protocol_fee_overflow'), (368, b'creator_fee_overflow'), (386, b'transfer_fee_overflow')]: self.assertIn(name, sell[line - 1])
        self.assertIn(b'calculate_fee(&self,', new['programs/pump/src/v3_native_transfer_fee.rs'])
    def test_v2errors_already_applied_rejected(self):
        with self.assertRaises(ValueError): m.v2errors_apply(m.v2errors_apply(self.v2errors_parent()))
    def test_v2errors_wrong_parent_rejected(self):
        data = self.v2errors_parent(); data['programs/pump/src/migrate_v2.rs'] += b'\n'
        with self.assertRaises(ValueError): m.v2errors_apply(data)
    def test_v2errors_extra_parent_rejected(self):
        data = self.v2errors_parent(); data['extra.rs'] = b''
        with self.assertRaises(ValueError): m.v2errors_apply(data)
    def test_v2errors_missing_parent_rejected(self):
        data = self.v2errors_parent(); data.pop('programs/pump/src/sell_v2.rs')
        with self.assertRaises(ValueError): m.v2errors_apply(data)
    def truncation_parent(self):
        out = self.root / 'truncation-parent'
        m.materialize(PARENT, out, 'v2errors814')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_exact_truncation_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'truncation815')
        self.assertEqual(got, json.loads((m.HERE / 'truncation-pins.json').read_text())['source_sha256'])
        self.assertEqual(len(got), 61)
    def test_truncation_exact_scope(self):
        old = self.truncation_parent(); new = m.truncation_apply(old)
        self.assertEqual({n for n in old if old[n] != new[n]}, {'programs/pump/src/trade_v3.rs'})
        a = old['programs/pump/src/trade_v3.rs'].splitlines(); b = new['programs/pump/src/trade_v3.rs'].splitlines()
        self.assertEqual([i + 1 for i in range(len(a)) if a[i] != b[i]], [124])
        self.assertEqual(a[77], b[77])
    def test_truncation_callback_and_parent_preserved(self):
        old = self.truncation_parent(); new = m.truncation_apply(old)
        lines = new['programs/pump/src/trade_v3.rs'].splitlines()
        self.assertIn(b'map_err(sell_quote_truncation)?', lines[123])
        self.assertIn(b'fn sell_quote_truncation(_:core::num::TryFromIntError)', lines[1139])
        self.assertIn(b'error!(PumpError::Truncation)', lines[1139])
        self.assertNotIn(b'#[', b'\n'.join(lines[len(old['programs/pump/src/trade_v3.rs'].splitlines()):]))
        self.assertEqual(new['programs/pump/src/lib.rs'], old['programs/pump/src/lib.rs'])
        self.assertEqual(new['programs/pump/src/v3_native_transfer_fee.rs'], old['programs/pump/src/v3_native_transfer_fee.rs'])
    def test_truncation_already_applied_rejected(self):
        with self.assertRaises(ValueError): m.truncation_apply(m.truncation_apply(self.truncation_parent()))
    def test_truncation_wrong_parent_rejected(self):
        data = self.truncation_parent(); data['programs/pump/src/trade_v3.rs'] += b'\n'
        with self.assertRaises(ValueError): m.truncation_apply(data)
    def test_truncation_extra_parent_rejected(self):
        data = self.truncation_parent(); data['extra.rs'] = b''
        with self.assertRaises(ValueError): m.truncation_apply(data)
    def test_truncation_missing_parent_rejected(self):
        data = self.truncation_parent(); data.pop('programs/pump/src/trade_v3.rs')
        with self.assertRaises(ValueError): m.truncation_apply(data)
    def buytruncation_parent(self):
        out = self.root / 'buytruncation-parent'
        m.materialize(PARENT, out, 'truncation815')
        return {str(p.relative_to(out)): p.read_bytes() for p in out.rglob('*') if p.is_file()}
    def test_exact_buytruncation_stage(self):
        got = m.materialize(PARENT, self.root / 'source', 'buytruncation816')
        self.assertEqual(got, json.loads((m.HERE / 'buytruncation-pins.json').read_text())['source_sha256'])
        self.assertEqual(len(got), 61)
    def test_buytruncation_exact_scope(self):
        old = self.buytruncation_parent(); new = m.buytruncation_apply(old)
        self.assertEqual({n for n in old if old[n] != new[n]}, {'programs/pump/src/trade_v3.rs'})
        a = old['programs/pump/src/trade_v3.rs'].splitlines(); b = new['programs/pump/src/trade_v3.rs'].splitlines()
        self.assertEqual([i + 1 for i in range(len(a)) if a[i] != b[i]], [200, 811])
        self.assertEqual(a[77], b[77])
    def test_buytruncation_callback_and_parent_preserved(self):
        old = self.buytruncation_parent(); new = m.buytruncation_apply(old)
        lines = new['programs/pump/src/trade_v3.rs'].splitlines()
        self.assertIn(b'map_err(buy_quote_truncation)?', lines[199])
        self.assertIn(b'fn buy_quote_truncation(_:core::num::TryFromIntError)', lines[810])
        self.assertIn(b'error!(PumpError::Truncation)', lines[810])
        self.assertEqual(lines[809], b'')
        self.assertEqual(lines[1139], old['programs/pump/src/trade_v3.rs'].splitlines()[1139])
        self.assertEqual(len(lines), 1140)
        self.assertEqual(new['programs/pump/src/lib.rs'], old['programs/pump/src/lib.rs'])
        self.assertEqual(new['programs/pump/src/v3_native_transfer_fee.rs'], old['programs/pump/src/v3_native_transfer_fee.rs'])
    def test_buytruncation_already_applied_rejected(self):
        with self.assertRaises(ValueError): m.buytruncation_apply(m.buytruncation_apply(self.buytruncation_parent()))
    def test_buytruncation_wrong_parent_rejected(self):
        data = self.buytruncation_parent(); data['programs/pump/src/trade_v3.rs'] += b'\n'
        with self.assertRaises(ValueError): m.buytruncation_apply(data)
    def test_buytruncation_extra_parent_rejected(self):
        data = self.buytruncation_parent(); data['extra.rs'] = b''
        with self.assertRaises(ValueError): m.buytruncation_apply(data)
    def test_buytruncation_missing_parent_rejected(self):
        data = self.buytruncation_parent(); data.pop('programs/pump/src/trade_v3.rs')
        with self.assertRaises(ValueError): m.buytruncation_apply(data)
if __name__ == '__main__': unittest.main(argv=['test_materialize.py', *remaining])
