#!/usr/bin/env python3
"""Resolve the round-5 composition conflicts on a compose3 tree (L13). Usage: l13_fixes.py <tree> (tree.conflicts beside it)."""
import shutil, subprocess, sys
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'); D = W / 'deliveries'; ME = W / 'lanes/mg-P-int'
sys.path.insert(0, str(ME / 'tools')); from resolve import resolve  # noqa
T = Path(sys.argv[1]).resolve(); C = Path(str(T) + '.conflicts'); S = T / 'src'
rd = lambda p: p.read_text().split('\n')
def wr(p, lines): p.write_text('\n'.join(lines))
def expect(lines, n, s):
    assert s in lines[n - 1], (n, lines[n - 1][:100], s)
# (a) create_v2.rs: z07(z00)+libinst+z01 layout + z05 nested_create changes (pump_quote helpers), sites line-neutral
subprocess.run([sys.executable, '-B', str(ME / 'fix/create_v2_merge.py'), str(S / 'create_v2.rs'), str(S / 'create_v2.rs')], check=True)
# (b) multi_hop: coord+libinst tree + z05 token_program_for nested fn on pad lines 353-360 + combined line 485
m = rd(S / 'multi_hop_curve_swap.rs'); z5 = rd(D / 'r5-z05-04/src/src/multi_hop_curve_swap.rs')
assert all(not m[i].strip() for i in range(352, 360)), 'pad 353-360 not blank'
expect(z5, 353, '#[inline(never)]'); expect(z5, 354, 'fn token_program_for'); expect(z5, 360, '}')
m[352:360] = z5[352:360]
expect(m, 485, 'admit_vaults(&h,require_ata)?;'); expect(z5, 485, 'admit_vaults(&h)?;')
m[484] = z5[484].replace('admit_vaults(&h)?;', 'admit_vaults(&h,require_ata)?;')
wr(S / 'multi_hop_curve_swap.rs', m)
# (c) distribute_creator_fee_v2.rs: libinst lines 15-16 (msg! + minimum_balance) + z02 line 17 (super::distribute_native)
v = rd(S / 'creator/distribute_creator_fee_v2.rs'); z2 = rd(D / 'r5-z02-02/src/src/creator/distribute_creator_fee_v2.rs')
expect(v, 16, 'Insufficient fees for distribution'); expect(z2, 17, 'super::distribute_native(')
v[16] = z2[16]; wr(S / 'creator/distribute_creator_fee_v2.rs', v)
# (d) distribution.rs moved by z02 (its creator/distribute_creator_fees.rs already carries libinst's v1 msg!)
assert (S / 'creator/distribute_creator_fees.rs').exists() and 'Insufficient fees for distribution' in (S / 'creator/distribute_creator_fees.rs').read_text()
if (S / 'distribution.rs').exists(): (S / 'distribution.rs').unlink()
# (e) lib.rs: z05 `pub mod pump_quote` + z06 `pub mod set_reserved_fee_recipients`
lib = resolve((C / 'z06/src/lib.rs').read_text(), ['=pub mod quote_control;#[path="pump_quote.rs"]pub mod pump_quote;pub mod set_reserved_fee_recipients;'])
(S / 'lib.rs').write_text(lib)
# (f) trade_v3.rs: z07(z09)+z08 tree; port libinst's v3 fee helper (0x7fde8 = direct tail call of get_fees 0x89ec8) into
#     z07's v3_trade_fees. get_fees (single caller) returns the TradeFees struct (moved to util/fee.rs) so that the helper
#     stays a tail call AND v3_post_complete (0x82af8) keeps its struct copy (a tuple return lost 0x82af8; .map lost 0x7fde8).
t = rd(S / 'trade_v3.rs')
expect(t, 393, '#[derive(Clone,Copy,Default)]'); expect(t, 394, 'pub struct TradeFees{pub protocol_fee:u64,pub creator_fee:u64,pub protocol_fee_bps:u64,pub creator_fee_bps:u64}')
expect(t, 405, '#[inline(never)]'); expect(t, 406, 'fn v3_trade_fees(a:&SellV3,quote:u64)->Result<TradeFees>{'); expect(t, 419, '}')
t[392] = 'pub use crate::legacy_sell::fee_math::TradeFees;'; t[393] = ''
body = ['#[inline(never)]',
        'fn v3_trade_fees(a:&SellV3,amount:u64)->Result<TradeFees>{',
        '    if a.global.whitelist_pda==a.user.key(){return Ok(TradeFees::default());}',
        '    let curve:&BondingCurve=&a.bonding_curve;',
        '    crate::legacy_sell::fee_math::get_fees(&a.global,curve,&a.fee_config.0,a.fee_config.to_account_info().data_len(),buy_fee_market_cap(curve,&a.base_mint)?,amount)',
        '}']
t[404:419] = body + [''] * (15 - len(body))
wr(S / 'trade_v3.rs', t)
f = rd(S / 'util/fee.rs')
assert not f[193].strip(); expect(f, 195, 'pub fn get_fees('); expect(f, 195, '-> Result<(u64, u64, u64, u64)> {'); expect(f, 200, 'Ok((protocol_fee, creator_fee, protocol_fee_bps, creator_fee_bps))')
f[193] = '#[derive(Clone, Copy, Default)] pub struct TradeFees { pub protocol_fee: u64, pub creator_fee: u64, pub protocol_fee_bps: u64, pub creator_fee_bps: u64 }'
f[194] = f[194].replace('-> Result<(u64, u64, u64, u64)> {', '-> Result<TradeFees> {')
f[199] = f[199].replace('Ok((protocol_fee, creator_fee, protocol_fee_bps, creator_fee_bps))', 'Ok(TradeFees { protocol_fee, creator_fee, protocol_fee_bps, creator_fee_bps })')
wr(S / 'util/fee.rs', f)
# (g) Cargo: libinst's pump-token-ext as a NESTED path crate (relative path, self-contained source)
ct = (D / 'r5-libinst-06/src/Cargo.toml').read_text()
ct = ct.replace('pump-token-ext = { path = "/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/r5-libinst/crates/pump-token-ext-v1" }', 'pump-token-ext = { path = "pump-token-ext" }')
assert 'path = "pump-token-ext"' in ct; (T / 'Cargo.toml').write_text(ct)
shutil.copy2(D / 'r5-libinst-06/src/Cargo.lock', T / 'Cargo.lock')
# (h) crate = libinst's pump-token-ext-v1 (Fee + quote_extensions_supported) with its TLV parser replaced by z08's
#     TransferFeeConfig/get_transfer_fee_config (the Result<Option<..>,()> shape z08's get_transfer_fee 0x94908 needs)
li = rd(W / 'lanes/r5-libinst/crates/pump-token-ext-v1/src/lib.rs'); z8 = rd(D / 'r5-z08-03/src/native_fee/src/lib.rs')
a0 = li.index('pub fn transfer_fee_config(data:&[u8])->Option<Option<(Fee,Fee)>>{') - 1; a1 = li.index('pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {') - 1
assert li[a0] == '#[inline(never)]' and li[a1] == '#[inline(never)]'
b0 = z8.index('pub struct TransferFeeConfig {') - 2; assert z8[b0] == '#[repr(C)]'
zpart = z8[b0:]
while zpart and not zpart[-1].strip(): zpart.pop()
crate = li[:a0] + zpart + [''] + li[a1:]
cd = T / 'pump-token-ext'; (cd / 'src').mkdir(parents=True, exist_ok=True)
shutil.copy2(W / 'lanes/r5-libinst/crates/pump-token-ext-v1/Cargo.toml', cd / 'Cargo.toml'); wr(cd / 'src/lib.rs', crate)
# (i) re-export shim used by util/transfer_fee.rs / trade_v3.rs
(S / 'v3_native_transfer_fee.rs').write_text('pub use pump_token_ext::{Fee, TransferFeeConfig, get_transfer_fee_config};\n')
# (j) z00's check_token_account refactor left buy_v2/sell_v2 `check_token` unused: blank them (line-neutral, no codegen change)
for fn, ln in (('buy_v2.rs', 1041), ('sell_v2.rs', 424)):
    x = rd(S / fn); assert x[ln - 1].startswith('fn check_token(info:&AccountInfo,mint:Pubkey,owner:Pubkey)->Result<()>{'), fn
    assert sum('check_token(' in l for l in x) == 1, fn
    x[ln - 1] = ''; wr(S / fn, x)
print('fixes applied')
