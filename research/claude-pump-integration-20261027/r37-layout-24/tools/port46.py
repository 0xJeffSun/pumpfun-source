#!/usr/bin/env python3
"""Port the 3 windows only Codex Round46/47 match (0x43ea0 migrate::create_pool, 0x502f0 migrate_v2::create_pool,
0x68bd8 QuoteControl::validate_new_mint) from REPO repro/pump/main-contract-round46-20261027/primary onto an L13 tree.
Line-neutral. Usage: port46.py <tree>"""
import sys
from pathlib import Path
ME = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-int'); R = ME / 'r46/primary/src'
T = Path(sys.argv[1]).resolve() / 'src'
rd = lambda p: p.read_text().split('\n')
def wr(p, x): p.write_text('\n'.join(x))
def expect(x, n, s): assert s in x[n - 1], (n, x[n - 1][:120], s)
# 0x68bd8: membership test as position().is_some() (Round46 state.rs:78)
q = rd(T / 'quote_control/state.rs'); r = rd(R / 'quote_control/state.rs')
expect(q, 78, 'self.contains(mint),'); expect(r, 78, 'self.mints.iter().position(|entry| entry.mint == *mint).is_some(),')
q[77] = r[77]; wr(T / 'quote_control/state.rs', q)
# 0x43ea0: v1 pool creation helper = Round46 migrate.rs:113-116 (private fn, seeds passed to a closure taking &[&[&[u8]];1])
m = rd(T / 'migrate.rs'); r = rd(R / 'migrate.rs')
expect(m, 284, 'create_pump_amm_pool(&ctx,base,quote)?;'); expect(m, 329, '#[inline(never)]'); expect(m, 330, 'pub fn create_pump_amm_pool<')
expect(m, 334, '}'); expect(r, 113, 'fn create_pool<'); expect(r, 117, '}')
m[283] = m[283].replace('create_pump_amm_pool(&ctx,base,quote)?;', 'create_pool(&ctx,base,quote)?;')
m[328:334] = ['// Original: standalone pool-creation helper (window 0x43ea0) calling the generated pump_amm client (Round46 form).'] + r[112:117]
wr(T / 'migrate.rs', m)
# 0x502f0: v2 pool creation through the same kind of helper (Round46 migrate_v2.rs:187-191) instead of the hand-built ix
v = rd(T / 'migrate_v2.rs'); r = rd(R / 'migrate_v2.rs')
expect(v, 327, 'let creator=a.bonding_curve.creator;let mut data=vec![233,146,209,142,207,104,64,188];'); expect(v, 328, 'call(&am,&[(&pool,false,true)')
expect(r, 187, 'fn create_pool<'); expect(r, 191, '}')
v[326] = '  create_pool(&ctx,base,quote)?;'; v[327] = ''
# the hand-built create_pool ix was the only user of these AccountInfo clones (same line, line-neutral)
for b in ('let lp=a.lp_mint.to_account_info();', 'let ulp=a.user_pool_token_account.to_account_info();', 'let t22=a.token_2022_program.to_account_info();'):
    assert v[112].count(b) == 1, b
    v[112] = v[112].replace(b, '')
while v and not v[-1].strip(): v.pop()
v += ['', '// Original: standalone pool-creation helper (window 0x502f0) calling the generated pump_amm client (Round46 form).'] + r[186:191] + ['']
wr(T / 'migrate_v2.rs', v)
print('port46 applied')
