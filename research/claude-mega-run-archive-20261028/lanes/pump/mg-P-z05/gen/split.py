#!/usr/bin/env python3
"""split.py <crate dir> [variant]: move the multi-hop loop body (lines 263-796) into a nested #[inline(never)] fn swap_hop
(original hop-body signature), line-neutral."""
import sys
p=sys.argv[1]+'/src/multi_hop_curve_swap.rs'; v=sys.argv[2] if len(sys.argv)>2 else 'base'
K=set(v.split('+'))
L=open(p).read().split('\n')
def rep(i, old, new, cnt=1):
    assert L[i-1].count(old)>=cnt, (i, old, L[i-1][:120]); L[i-1]=L[i-1].replace(old,new)
assert L[262].strip()=='prepare_curve(a,&h)?;', L[262]
assert L[263].strip().startswith('crate::trade::validate_trade('), L[263]
assert L[265]=='' and L[266]=='' , (L[265],L[266])
vt=L[263].strip()
attr = '' if 'pubfn' in K else '#[inline(never)] '
vis = 'pub ' if 'pubfn' in K else ''
L[262]="        let out = swap_hop(a,ctx.bumps.event_authority,&mut h,bumps.bonding_curve,&current_mint,amount,previous.as_ref(),index == count - 1,flag)?;"
L[263]=f"        {attr}{vis}fn swap_hop<'info>(a: &MultiHopCurve<'info>, event_bump: u8, h: &mut CurveHop<'info>, curve_bump: u8, current_mint: &Pubkey, amount: u64, previous: Option<&PreviousHop<'info>>, last: bool, flag: u8) -> Result<HopOut> {{"
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
L[795]="        } Ok(HopOut { output, buyback, post_buyback, buy }) }"
rep(798,'if buy {','if out.buy {')
rep(799,'base_mint: mint_key','base_mint: h.base_mint.key()')
rep(800,'if buy {','if out.buy {')
rep(802,'amount = output;','amount = out.output;')
rep(803,'add(buyback,post_buyback)','add(out.buyback,out.post_buyback)')
assert L[234]=='', L[234]
L[234]="struct HopOut { output: u64, buyback: u64, post_buyback: u64, buy: bool }"
open(p,'w').write('\n'.join(L))
