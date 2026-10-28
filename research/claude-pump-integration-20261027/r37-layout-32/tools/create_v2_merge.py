# Merge create_v2.rs: c1 (z07[z00]+libinst+z01) layout + z05's nested_create semantic changes; line-neutral sites.
import sys
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work')
A = Path(sys.argv[1]).read_text().split('\n')
Z5 = (W/'deliveries/r5-z05-04/src/src/create_v2.rs').read_text().split('\n')
L = lambda arr, a, b: arr[a-1:b]          # 1-based inclusive
def expect(arr, n, s):
    assert s in arr[n-1], (n, arr[n-1][:80], s)
expect(A, 357, 'fn walk'); expect(A, 364, 'curve.depth.checked_add(1)'); expect(A, 365, 'CurveDepthExceeded')
expect(A, 422, 'records[position] = pool_record('); expect(A, 431, 'Ok((price(g, seed,'); expect(A, 435, 'fn ancestor')
expect(A, 452, 'fn root_seed'); expect(A, 461, 'fn vault_amount'); assert A[500] == '}'
expect(Z5, 373, 'let depth = depth(&curve, g)?;'); expect(Z5, 326, 'fn pool_address'); expect(Z5, 333, '}')
out = L(A, 1, 271) + L(Z5, 272, 296) + L(A, 297, 356)
walk = L(A, 357, 432)
walk[364-357] = Z5[373-1]; walk[365-357] = ''
walk[422-357] = '            let expected = pool_address(&mint, &curve.quote_mint); let (base, quote) = pool_record(&tail[1], &expected, &tail[2], &tail[3])?; records[position] = Record::Pool { base, quote };'
walk[431-357] = Z5[438-1]; assert 'price(seed,' in walk[431-357]
out += walk + L(A, 433, 459) + [''] + L(Z5, 326, 333) + ['}']
# libinst check_quote_mint_extensions: its require must sit on line 528
i = A.index('fn check_quote_mint_extensions(mint:&AccountInfo)->Result<()>{')
fn = A[i-1:i+5]; assert fn[0] == '#[inline(never)]' and fn[-1] == '}', fn
req = 3  # offset of require line within fn
pads = 528 - (len(out) + 1) - req
assert pads >= 1, pads
out += ['// layout-pad: aligns check_quote_mint_extensions require with create_v2.rs:528'] + [''] * (pads - 1) + fn
assert 'require!(quote_extensions_supported' in out[527], out[527]
j = A.index('fn create_event<\'info>(name:String,symbol:String,uri:String,creator:Pubkey,mint:&InterfaceAccount<\'info,Mint>,user:&Signer<\'info>,bonding_curve:&Account<\'info,BondingCurve>,token_program:&Program<\'info,Token2022>,is_mayhem_mode:bool,quote_amount:u64)->Result<CreateEvent>{') if False else next(k for k, l in enumerate(A) if l.startswith("fn create_event<'info>"))
ce = A[j-1:j+3]; assert ce[0] == '#[inline(never)]' and ce[-1] == '}', ce
out += [''] + ce + ['']
Path(sys.argv[2]).write_text('\n'.join(out).rstrip('\n') + '\n')
print('lines', len(out))
