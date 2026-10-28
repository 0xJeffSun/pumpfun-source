#!/usr/bin/env python3
"""nb3.py <crate dir> <variant>: native_buyback (0x58f58) with self-CPI / sync_native helper fns (line-neutral, lines 207-222)."""
import sys
p=sys.argv[1]+'/src/multi_hop_curve_swap.rs'; v=sys.argv[2]
L=open(p).read().split('\n')
assert L[206].startswith('fn native_buyback'), L[206]
call_old="native_buyback(a,h.bonding_curve.to_account_info(),paid_buyback,ctx.bumps.event_authority)?;"
i=next(k for k,l in enumerate(L) if call_old in l)
L[i]=L[i].replace(call_old,"native_buyback(a,ctx.bumps.event_authority,&h.bonding_curve,paid_buyback)?;")
K=set(v.split('+'))
attr = {'ia':'#[inline(always)] ','in':'#[inline] ','np':''}[next(k for k in ('ia','in','np') if k in K)]
data = 'anchor_lang::event::EVENT_IX_TAG_LE.to_vec()' if 'tv' in K else 'vec![228, 69, 165, 46, 81, 203, 154, 29]'
metas="AccountMeta::new_readonly(a.event_authority.key(), true), AccountMeta::new(curve_info.key(), false), AccountMeta::new(to.key(), false)"
ixe=f"Instruction {{ program_id: crate::ID, accounts: vec![{metas}], data: {data} }}"
infos="[a.event_authority.to_account_info(), curve_info, to.clone()]"
seeds='&[&[b"__event_authority", &[event_bump]]]'
pid='&anchor_spl::token::spl_token::id()'
b=[f"pub fn native_buyback<'info>(a: &MultiHopCurve<'info>, event_bump: u8, curve: &Account<'info, BondingCurve>, amount: u64) -> Result<()> {{"]
F = 'F' in K or 'FP' in K
G = 'G' in K or 'Gr' in K
if 'F' in K: b.append(f"    {attr}fn flush(ix: &Instruction, infos: &[AccountInfo], seeds: &[&[&[u8]]]) -> Result<()> {{ invoke_signed(ix, infos, seeds)?; Ok(()) }}")
if 'FP' in K: b.append(f"    {attr}fn flush(ix: &Instruction, infos: &[AccountInfo], seeds: &[&[&[u8]]]) -> ProgramResult {{ invoke_signed(ix, infos, seeds) }}")
if 'G' in K: b.append(f"    {attr}fn sync(to: AccountInfo) -> Result<()> {{ let ix = anchor_spl::token::spl_token::instruction::sync_native({pid}, to.key)?; invoke(&ix, &[to])?; Ok(()) }}")
if 'Gr' in K: b.append(f"    {attr}fn sync(to: &AccountInfo) -> Result<()> {{ let ix = anchor_spl::token::spl_token::instruction::sync_native({pid}, to.key)?; invoke(&ix, &[to.clone()])?; Ok(()) }}")
b+=["    if amount == 0 { return Ok(()); }",
 "    let to = a.buyback_fee_recipient.to_account_info();",
 "    let curve_info = curve.to_account_info();",
 "    crate::trade::quote_payments::transfer_native(curve, to.clone(), amount)?;"]
if F: b+=[f"    flush(&{ixe},", f"        &{infos}, {seeds})?;"]
else: b+=[f"    invoke_signed(&{ixe},", f"        &{infos}, {seeds})?;"]
if 'G' in K: b+=["    sync(to)?;"]
elif 'Gr' in K: b+=["    sync(&to)?;"]
elif 'S2' in K: b+=[f"    invoke(&anchor_spl::token::spl_token::instruction::sync_native({pid}, to.key)?, &[to])?;"]
else: b+=[f"    let ix = anchor_spl::token::spl_token::instruction::sync_native({pid}, to.key)?;", "    invoke(&ix, &[to])?;"]
b+=["    Ok(())","}"]
assert len(b)<=16, len(b)
b+=['']*(16-len(b))
L[206:222]=b
open(p,'w').write('\n'.join(L))
