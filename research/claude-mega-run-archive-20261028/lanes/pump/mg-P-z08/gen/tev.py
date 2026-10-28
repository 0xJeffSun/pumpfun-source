#!/usr/bin/env python3
"""tev.py <crate> : append trade_event variants (unused pub fns) to multi_hop_curve_swap.rs from VARIANTS dict in gen/tev_vars.py"""
import sys
crate = sys.argv[1]; p = crate + '/src/multi_hop_curve_swap.rs'; t = open(p).read()
SIG = "(curve:&BondingCurve,global:&Global,volume:&VolumeSnapshot,user:&Pubkey,mint:&Pubkey,is_buy:bool,token_amount:u64,quote_amount:u64,fees:&(u64,u64,u64,u64),buyback_fee:u64,unparsed_trailing_field:u64,ix_name:&str,timestamp:i64)->TradeEvent"
ns = {}; exec(open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z08/gen/tev_vars.py').read(), ns)
out = t
for k, body in ns['VARIANTS'].items():
    out += f"\n#[inline(never)]\npub fn trade_event_{k}{SIG}{{\n{body}\n}}\n"
open(p, 'w').write(out); print('appended', len(ns['VARIANTS']))
