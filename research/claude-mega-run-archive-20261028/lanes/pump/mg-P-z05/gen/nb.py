#!/usr/bin/env python3
"""nb.py <crate dir> <variant>: rewrite multi_hop native_buyback (lines 207-222, line-neutral) as a 0x58f58 candidate."""
import sys
p=sys.argv[1]+'/src/multi_hop_curve_swap.rs'; v=sys.argv[2]
L=open(p).read().split('\n')
assert L[206].startswith('fn native_buyback'), L[206]
assert L[221]=='}', L[221]
call_old="native_buyback(a,h.bonding_curve.to_account_info(),paid_buyback,ctx.bumps.event_authority)?;"
i=next(k for k,l in enumerate(L) if call_old in l)
L[i]=L[i].replace(call_old,"native_buyback(a,ctx.bumps.event_authority,&h.bonding_curve,paid_buyback)?;")
K=set(v.split('+')) if v!='base' else set()
bump_inline = 'bi' in K
pid = '&anchor_spl::token::ID'
if 'pid_fn' in K: pid='&anchor_spl::token::spl_token::id()'
if 'pid_id' in K: pid='&anchor_spl::token::spl_token::ID'
metas="AccountMeta::new_readonly(a.event_authority.key(), true), AccountMeta::new(curve_info.key(), false), AccountMeta::new(to.key(), false)"
if 'mk' in K: metas="AccountMeta::new_readonly(*a.event_authority.key, true), AccountMeta::new(*curve_info.key, false), AccountMeta::new(*to.key, false)"
seeds='&[&[b"__event_authority", &[event_bump]]]' if bump_inline else '&[&[b"__event_authority", &bump]]'
vis = 'fn' if 'priv' in K else 'pub fn'
attr = '#[inline(never)] ' if 'priv' in K else ''
body=[
 f"{attr}{vis} native_buyback<'info>(a: &MultiHopCurve<'info>, event_bump: u8, curve: &Account<'info, BondingCurve>, amount: u64) -> Result<()> {{",
 "    if amount == 0 { return Ok(()); }",
 "    let to = a.buyback_fee_recipient.to_account_info();",
 "    let curve_info = curve.to_account_info();",
 "    crate::trade::quote_payments::transfer_native(curve, to.clone(), amount)?;",
 "" if bump_inline else "    let bump = [event_bump];",
 f"    invoke_signed(&Instruction {{ program_id: crate::ID, accounts: vec![{metas}], data: vec![228, 69, 165, 46, 81, 203, 154, 29] }},",
 f"        &[a.event_authority.to_account_info(), curve_info, to.clone()], {seeds})?;",
 f"    let ix = anchor_spl::token::spl_token::instruction::sync_native({pid}, to.key)?;",
 "    invoke(&ix, &[to])?;",
 "    Ok(())",
 "}",
]
if 'tclone_arg' in K:   # pass to clone by value
    pass
body += ['']*(16-len(body))
assert len(body)==16
L[206:222]=body
open(p,'w').write('\n'.join(L))
