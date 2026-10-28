#!/usr/bin/env python3
"""split2.py <crate dir> [variant]: multi-hop loop body -> nested #[inline(never)] fn swap_hop with the ORIGINAL hop-body
interface (decoded from 0x567d8 -> 0x5b3b0): (a, event_bump, h, curve_bump, &current_mint, amount, previous, last, flag)
-> Result<HopOutput{mint: Pubkey, amount: u64, buyback_fee: u64, vault: AccountInfo}> (sret 0x60, Err niche = vault bool @0x5a)."""
import sys
p=sys.argv[1]+'/src/multi_hop_curve_swap.rs'; v=sys.argv[2] if len(sys.argv)>2 else 'base'
K=set(v.split('+'))
L=open(p).read().split('\n')
def rep(i, old, new):
    assert old in L[i-1], (i, old, L[i-1][:140]); L[i-1]=L[i-1].replace(old,new,1)
assert L[262].strip()=='prepare_curve(a,&h)?;', L[262]
vt=L[263].strip(); assert vt.startswith('crate::trade::validate_trade('), vt
assert L[265]=='' and L[266]=='', (L[265],L[266])
L[262]="        let out = swap_hop(a,ctx.bumps.event_authority,&mut h,bumps.bonding_curve,&current_mint,amount,previous.as_ref(),index == count - 1,flag)?;"
L[263]="        #[inline(never)] fn swap_hop<'info>(a: &MultiHopCurve<'info>, event_bump: u8, h: &mut CurveHop<'info>, curve_bump: u8, current_mint: &Pubkey, amount: u64, previous: Option<&PreviousHop<'info>>, last: bool, flag: u8) -> Result<HopOutput<'info>> {"
L[265]="        prepare_curve(a,h)?;"
L[266]="        "+vt
rep(485,'admit_vaults(&h,require_ata)','admit_vaults(h,require_ata)')
rep(490,'let buy = current_mint ==','let buy = *current_mint ==')
rep(546,'buy || current_mint ==','buy || *current_mint ==')
assert L[546].strip()=='let last = index == count - 1;', L[546]
L[546]=''
rep(696,'previous.as_ref()','previous'); rep(698,'previous.as_ref()','previous')
rep(714,'bumps.bonding_curve','curve_bump')
for i in (754,782,786,795): rep(i,'ctx.bumps.event_authority','event_bump')
assert L[795].strip()=='}', L[795]
L[795]=("        } Ok(HopOutput { mint: if buy { h.base_mint.key() } else { h.quote_mint.key() }, amount: output, buyback_fee: add(buyback,post_buyback)?,"
        " vault: if buy { h.associated_base_bonding_curve.to_account_info() } else { h.associated_quote_bonding_curve.to_account_info() } }) }")
# handler side (lines 797-803)
assert L[796].strip()=='h.exit(&crate::ID)?;', L[796]
L[797]="        current_mint = out.mint;"
L[798]="        previous = Some(PreviousHop { base_mint: h.base_mint.key(),"
L[799]="            output_vault: out.vault,"
rep(802,'amount = output;','amount = out.amount;')
L[802]="        total_buyback = total_buyback.checked_add(out.buyback_fee).ok_or_else(overflow)?;"
assert L[234]=='', L[234]
L[234]="pub struct HopOutput<'info> { mint: Pubkey, amount: u64, buyback_fee: u64, vault: AccountInfo<'info> }"
open(p,'w').write('\n'.join(L))
