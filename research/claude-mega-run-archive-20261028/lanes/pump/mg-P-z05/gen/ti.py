#!/usr/bin/env python3
"""ti.py <crate dir> <variant>: route_input -> pub fn transfer_input (0x5a260 candidates), line-neutral (lines 134-146)."""
import sys
p=sys.argv[1]+'/src/multi_hop_curve_swap.rs'; v=sys.argv[2]
L=open(p).read().split('\n')
assert L[133].startswith('fn route_input'), L[133]
assert L[145]=='}', L[145]
K=set(v.split('+'))
ob="route_input(a,previous.as_ref(),h.quote_mint.to_account_info(),h.associated_quote_bonding_curve.to_account_info(),amount,h.quote_mint.decimals)?;"
os_="route_input(a,previous.as_ref(),h.base_mint.to_account_info(),h.associated_base_bonding_curve.to_account_info(),amount,h.base_mint.decimals)?;"
s='\n'.join(L); assert ob in s and os_ in s
s=s.replace(ob,"transfer_input(a,previous.as_ref(),&quote_token_program,&h.associated_quote_bonding_curve,h.quote_mint.decimals,AsRef::<AccountInfo>::as_ref(&*h.quote_mint),amount)?;")
s=s.replace(os_,"transfer_input(a,previous.as_ref(),&base_token_program,&h.associated_base_bonding_curve.to_account_info(),h.base_mint.decimals,AsRef::<AccountInfo>::as_ref(&*h.base_mint),amount)?;")
L=s.split('\n')
TC='anchor_spl::token_2022::TransferChecked'
key = 'p.output_vault.key == to.key' if 'kr' in K else 'p.output_vault.key() == to.key()'
lit_none=f"{TC} {{ from: a.source.to_account_info(), to: to.clone(), authority: a.source_authority.to_account_info(), mint: mint.clone() }}"
lit_some=f"{TC} {{ from: p.output_vault.clone(), to: to.clone(), authority: p.authority.clone(), mint: mint.clone() }}"
if 'tai' in K:
    lit_none=lit_none.replace('to: to.clone()','to: to.to_account_info()').replace('mint: mint.clone()','mint: mint.to_account_info()')
    lit_some=lit_some.replace('to: to.clone()','to: to.to_account_info()').replace('mint: mint.clone()','mint: mint.to_account_info()').replace('p.output_vault.clone()','p.output_vault.to_account_info()').replace('p.authority.clone()','p.authority.to_account_info()')
prog = 'token_program.to_account_info()' if 'tai' in K else 'token_program.clone()'
none=["if amount == 0 { return Ok(()); }",
      f"anchor_spl::token_2022::transfer_checked(CpiContext::new({prog}, {lit_none}), amount, decimals)"]
some=[f"if {key} {{ return Ok(()); }}",
      "let bump = [p.bump]; let seeds: &[&[u8]] = &[b\"bonding-curve\", p.base_mint.as_ref(), &bump];" if 'si' not in K else "",
      "if amount == 0 { return Ok(()); }",
      f"anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer({prog}, {lit_some}, &[seeds]), amount, decimals)" if 'si' not in K else
      f"anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer({prog}, {lit_some}, &[&[b\"bonding-curve\", p.base_mint.as_ref(), &[p.bump]]]), amount, decimals)"]
some=[x for x in some if x]
head="pub fn transfer_input<'info>(a: &MultiHopCurve<'info>, previous: Option<&PreviousHop<'info>>, token_program: &AccountInfo<'info>, to: &AccountInfo<'info>, decimals: u8, mint: &AccountInfo<'info>, amount: u64) -> Result<()> {"
ind='    '
if 'mN' in K:   # match None first
    body=[ind+"match previous {", ind*2+"None => {"]+[ind*3+x for x in none]+[ind*2+"}", ind*2+"Some(p) => {"]+[ind*3+x for x in some]+[ind*2+"}", ind+"}"]
elif 'mS' in K:
    body=[ind+"match previous {", ind*2+"Some(p) => {"]+[ind*3+x for x in some]+[ind*2+"}", ind*2+"None => {"]+[ind*3+x for x in none]+[ind*2+"}", ind+"}"]
elif 'iS' in K:  # if let Some first
    body=[ind+"if let Some(p) = previous {"]+[ind*2+x for x in some]+[ind+"} else {"]+[ind*2+x for x in none]+[ind+"}"]
elif 'le' in K:  # let-else: None first
    body=[ind+"let Some(p) = previous else {"]+[ind*2+x for x in none[:-1]]+[ind*2+"return "+none[-1]+";", ind+"};"]+[ind+x for x in some]
fn=[head]+body+["}"]
# compress to 13 lines
while len(fn)>13:
    # merge shortest adjacent pair
    j=min(range(len(fn)-1),key=lambda k: len(fn[k])+len(fn[k+1])); fn[j]=fn[j].rstrip()+' '+fn[j+1].strip(); del fn[j+1]
fn+=['']*(13-len(fn))
L[133:146]=fn
s='\n'.join(L)
s=s.replace("\nstruct PreviousHop<'info> {","\npub struct PreviousHop<'info> {",1)
open(p,'w').write(s)
