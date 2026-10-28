#!/usr/bin/env python3
"""nb2.py <crate dir> <variant>: native_buyback (0x58f58) candidates with pre-bound infos/seeds (line-neutral, lines 207-222)."""
import sys
p=sys.argv[1]+'/src/multi_hop_curve_swap.rs'; v=sys.argv[2]
L=open(p).read().split('\n')
assert L[206].startswith('fn native_buyback'), L[206]
call_old="native_buyback(a,h.bonding_curve.to_account_info(),paid_buyback,ctx.bumps.event_authority)?;"
i=next(k for k,l in enumerate(L) if call_old in l)
L[i]=L[i].replace(call_old,"native_buyback(a,ctx.bumps.event_authority,&h.bonding_curve,paid_buyback)?;")
K=set(v.split('+'))
data = 'anchor_lang::event::EVENT_IX_TAG_LE.to_vec()' if 'tv' in K else 'vec![228, 69, 165, 46, 81, 203, 154, 29]'
ck = 'curve.key()' if 'ck' in K else 'curve_info.key()'
metas=f"AccountMeta::new_readonly(a.event_authority.key(), true), AccountMeta::new({ck}, false), AccountMeta::new(to.key(), false)"
ixe=f"Instruction {{ program_id: crate::ID, accounts: vec![{metas}], data: {data} }}"
infos="[a.event_authority.to_account_info(), curve_info, to.clone()]"
seeds='&[&[b"__event_authority", &[event_bump]]]'
b=[f"pub fn native_buyback<'info>(a: &MultiHopCurve<'info>, event_bump: u8, curve: &Account<'info, BondingCurve>, amount: u64) -> Result<()> {{",
 "    if amount == 0 { return Ok(()); }",
 "    let to = a.buyback_fee_recipient.to_account_info();",
 "    let curve_info = curve.to_account_info();",
 "    crate::trade::quote_payments::transfer_native(curve, to.clone(), amount)?;"]
if 'A' in K:   # ix, infos, seeds pre-bound
    b+=[f"    let ix = {ixe};", f"    let infos = {infos};", f"    let seeds: &[&[&[u8]]] = {seeds};", "    invoke_signed(&ix, &infos, seeds)?;"]
elif 'B' in K: # infos, seeds pre-bound, ix inline
    b+=[f"    let infos = {infos};", f"    let seeds: &[&[&[u8]]] = {seeds};", f"    invoke_signed(&{ixe}, &infos, seeds)?;"]
elif 'C' in K: # seeds pre-bound only
    b+=[f"    let seeds: &[&[&[u8]]] = {seeds};", f"    invoke_signed(&{ixe}, &{infos}, seeds)?;"]
elif 'D' in K: # ix + infos pre-bound, seeds inline
    b+=[f"    let ix = {ixe};", f"    let infos = {infos};", f"    invoke_signed(&ix, &infos, {seeds})?;"]
pid='&anchor_spl::token::spl_token::id()'
if 'S2' in K:  # sync ix inline in invoke
    b+=[f"    invoke(&anchor_spl::token::spl_token::instruction::sync_native({pid}, to.key)?, &[to])?;"]
else:
    b+=[f"    let ix = anchor_spl::token::spl_token::instruction::sync_native({pid}, to.key)?;", "    invoke(&ix, &[to])?;"]
b+=["    Ok(())","}"]
assert len(b)<=16, len(b)
b+=['']*(16-len(b))
L[206:222]=b
open(p,'w').write('\n'.join(L))
