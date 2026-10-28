#!/usr/bin/env python3
"""hdl.py <crate dir (split2 applied)> [variant]: re-lay the multi-hop handler to original lines 200-263 (sites 208, 214x2,
259 closure, 262), hop fn module-level at 264..796; helpers 192-245 moved to file end (no Source sites).
knobs: sl (slice remaining_accounts per hop, orig bounds-check panic), fa (hop_fees[index] in call args), enum (iter().enumerate())"""
import sys
p=sys.argv[1]+'/src/multi_hop_curve_swap.rs'; v=sys.argv[2] if len(sys.argv)>2 else 'base'
K=set(v.split('+'))
L=open(p).read().split('\n')
assert L[263].strip().startswith('#[inline(never)] fn swap_hop'), L[263]
assert L[795].strip().startswith('} Ok(HopOutput'), L[795]
assert L[245].startswith('pub fn execute'), L[245]
assert L[806]=='}', L[806]
moved=L[191:245]
for i in range(191,263): L[i]=''
for i in range(796,807): L[i]=''
def put(line, text):
    assert L[line-1]=='', (line, L[line-1]); L[line-1]=text
pre=["let a = &ctx.accounts;"]
if not ({'sl','sl2','sl3'} & K): pre.append("let mut remaining = ctx.remaining_accounts;")
pre+=["let mut current_mint = a.source.mint;","let mut amount = amount_in;","let mut total_buyback = 0u64;","let mut previous = None;"]
if 'enum' in K: loop="for (index,flag) in hop_fees.iter().copied().enumerate() {"
elif 'wh' in K: loop="while index < count {"
else: loop="for index in 0..count {"
if 'wh' in K: pre.append("let mut index = 0;")
body=[]
if 'sl' in K: body.append("let mut accounts = &ctx.remaining_accounts[index * 5..index * 5 + 5];")
if 'sl2' in K: body.append("let mut accounts = &ctx.remaining_accounts[index * 5..][..5];")
if 'sl3' in K: body.append("let mut accounts = &ctx.remaining_accounts[5 * index..5 * (index + 1)];")
if 'enum' not in K and 'fa' not in K: body.append("let flag = hop_fees[index];")
body.append("let mut bumps = CurveHopBumps::default();")
body.append("let mut h = CurveHop::try_accounts(&crate::ID,&mut %s,&[],&mut bumps,&mut std::collections::BTreeSet::new())?;" % ('accounts' if ('sl' in K or 'sl2' in K or 'sl3' in K) else 'remaining'))
fl = 'hop_fees[index]' if 'fa' in K else 'flag'
body.append(f"let out = swap_hop(a,ctx.bumps.event_authority,&mut h,bumps.bonding_curve,&current_mint,amount,previous.as_ref(),index == count - 1,{fl})?;")
body+=["h.exit(&crate::ID)?;","current_mint = out.mint;",
 "previous = Some(PreviousHop { base_mint: h.base_mint.key(), output_vault: out.vault, authority: h.bonding_curve.to_account_info(), bump: bumps.bonding_curve });",
 "amount = out.amount;"]
put(200,"pub fn execute<'info>(ctx: Context<'_,'_,'info,'info,MultiHopCurve<'info>>,")
put(201,"    amount_in: u64, hop_fees: Vec<u8>) -> Result<CurveRunResult> {")
put(208,"    require_gt!(amount_in, 0, PumpError::BuyZeroAmount);")
put(209,"    let count = ctx.remaining_accounts.len() / 5;")
put(214,"    require!(ctx.remaining_accounts.len() >= 5 && ctx.remaining_accounts.len() % 5 == 0, PumpError::NotEnoughRemainingAccounts); require!(hop_fees.len() == count && hop_fees.iter().all(|f| *f < 4), PumpError::MultiHopHopFeesMismatch);")
ln=215
for x in pre: put(ln,"    "+x); ln+=1
put(ln,"    "+loop); ln+=1
for x in body: put(ln,"        "+x); ln+=1
assert ln<=259, ln
put(259,"        total_buyback = total_buyback.checked_add(out.buyback_fee).ok_or_else(|| error!(PumpError::Overflow))?;" + (" index += 1;" if 'wh' in K else ""))
put(260,"    }")
put(262,"    require_keys_eq!(current_mint, a.destination.mint, PumpError::MultiHopDiscontinuousPath);")
put(263,"    Ok(CurveRunResult { amount_out: amount, buyback_fee: total_buyback }) }")
L[263]=L[263].replace("        #[inline(never)] fn swap_hop","#[inline(never)] fn swap_hop",1)
while L and L[-1]=='': L.pop()
L += [''] + [x for x in moved] + ['']
open(p,'w').write('\n'.join(L))
