#!/usr/bin/env python3
"""ti2.py <crate dir> <variant>: transfer_input (0x5a260) via an (inlined) transfer helper. Lines 120-127 = helper, 134-146 = fn."""
import sys
p=sys.argv[1]+'/src/multi_hop_curve_swap.rs'; v=sys.argv[2]
L=open(p).read().split('\n')
assert L[119].startswith('fn checked_transfer'), L[119]
assert L[133].startswith('fn route_input'), L[133]
K=set(v.split('+'))
ob="route_input(a,previous.as_ref(),h.quote_mint.to_account_info(),h.associated_quote_bonding_curve.to_account_info(),amount,h.quote_mint.decimals)?;"
os_="route_input(a,previous.as_ref(),h.base_mint.to_account_info(),h.associated_base_bonding_curve.to_account_info(),amount,h.base_mint.decimals)?;"
TC='anchor_spl::token_2022::TransferChecked'
attr={'ia':'#[inline(always)] ','in':'#[inline] ','np':''}[next(k for k in ('ia','in','np') if k in K)]
key = 'p.output_vault.key == to.key' if 'kr' in K else 'p.output_vault.key() == to.key()'
# helper
ctx = "CpiContext::new_with_signer(program.clone(), {lit}, seeds)"
lit = f"{TC} {{ from: from.clone(), to: to.clone(), authority: authority.clone(), mint: mint.clone() }}"
if 'tai' in K: lit = f"{TC} {{ from: from.to_account_info(), to: to.to_account_info(), authority: authority.to_account_info(), mint: mint.to_account_info() }}"
if 'gen' in K or 'genf' in K:
    lit = f"{TC} {{ from: from.to_account_info(), to: to.clone(), authority: authority.to_account_info(), mint: mint.clone() }}"
    if 'genf' in K: lit = f"{TC} {{ from: from.to_account_info(), to: to.clone(), authority: authority.clone(), mint: mint.clone() }}"
    ta = "&impl ToAccountInfo<'info>" if 'gen' in K else "&AccountInfo<'info>"
    helper=[f"{attr}fn transfer_tokens<'info>(program: &AccountInfo<'info>, from: &impl ToAccountInfo<'info>, to: &AccountInfo<'info>, authority: {ta},",
        "    mint: &AccountInfo<'info>, amount: u64, decimals: u8, seeds: &[&[&[u8]]]) -> Result<()> {",
        "    if amount == 0 { return Ok(()); }",
        f"    anchor_spl::token_2022::transfer_checked({ctx.format(lit=lit)}, amount, decimals)",
        "}"]
else: helper=[f"{attr}fn transfer_tokens<'info>(program: &AccountInfo<'info>, from: &AccountInfo<'info>, to: &AccountInfo<'info>, authority: &AccountInfo<'info>,",
        "    mint: &AccountInfo<'info>, amount: u64, decimals: u8, seeds: &[&[&[u8]]]) -> Result<()> {",
        "    if amount == 0 { return Ok(()); }",
        f"    anchor_spl::token_2022::transfer_checked({ctx.format(lit=lit)}, amount, decimals)",
        "}"]
helper+=['']*(8-len(helper)); assert len(helper)==8
L[119:127]=helper
none_call="transfer_tokens(token_program, AsRef::<AccountInfo>::as_ref(&*a.source), to, AsRef::<AccountInfo>::as_ref(&a.source_authority), mint, amount, decimals, &[])"
if 'gen' in K: none_call="transfer_tokens(token_program, &*a.source, to, &a.source_authority, mint, amount, decimals, &[])"
if 'genf' in K: none_call="transfer_tokens(token_program, &*a.source, to, AsRef::<AccountInfo>::as_ref(&a.source_authority), mint, amount, decimals, &[])"
if 'srcai' in K: none_call="transfer_tokens(token_program, &a.source.to_account_info(), to, &a.source_authority.to_account_info(), mint, amount, decimals, &[])"
some=[f"if {key} {{ return Ok(()); }}",
      "let bump = [p.bump]; let seeds: &[&[u8]] = &[b\"bonding-curve\", p.base_mint.as_ref(), &bump];",
      "transfer_tokens(token_program, &p.output_vault, to, &p.authority, mint, amount, decimals, &[seeds])"]
if 'si' in K:
    some=[f"if {key} {{ return Ok(()); }}",
          "transfer_tokens(token_program, &p.output_vault, to, &p.authority, mint, amount, decimals, &[&[b\"bonding-curve\", p.base_mint.as_ref(), &[p.bump]]])"]
if 'noneinl' in K:  # None path written inline (no helper)
    none_lines=["if amount == 0 { return Ok(()); }", f"anchor_spl::token_2022::transfer_checked(CpiContext::new(token_program.clone(), {TC} {{ from: a.source.to_account_info(), to: to.clone(), authority: a.source_authority.to_account_info(), mint: mint.clone() }}), amount, decimals)"]
else:
    none_lines=[none_call]
head="pub fn transfer_input<'info>(a: &MultiHopCurve<'info>, previous: Option<&PreviousHop<'info>>, token_program: &AccountInfo<'info>, to: &AccountInfo<'info>, decimals: u8, mint: &AccountInfo<'info>, amount: u64) -> Result<()> {"
ind='    '
if 'mS' in K:
    body=[ind+"match previous {", ind*2+"Some(p) => {"]+[ind*3+x for x in some]+[ind*2+"}", ind*2+"None => {"]+[ind*3+x for x in none_lines]+[ind*2+"}", ind+"}"]
elif 'iS' in K:
    body=[ind+"if let Some(p) = previous {"]+[ind*2+x for x in some]+[ind+"} else {"]+[ind*2+x for x in none_lines]+[ind+"}"]
else:
    body=[ind+"match previous {", ind*2+"None => {"]+[ind*3+x for x in none_lines]+[ind*2+"}", ind*2+"Some(p) => {"]+[ind*3+x for x in some]+[ind*2+"}", ind+"}"]
fn=[head]+body+["}"]
while len(fn)>13:
    j=min(range(len(fn)-1),key=lambda k: len(fn[k])+len(fn[k+1])); fn[j]=fn[j].rstrip()+' '+fn[j+1].strip(); del fn[j+1]
fn+=['']*(13-len(fn))
L[133:146]=fn
s='\n'.join(L); assert ob in s and os_ in s
s=s.replace(ob,"transfer_input(a,previous.as_ref(),&quote_token_program,&h.associated_quote_bonding_curve,h.quote_mint.decimals,AsRef::<AccountInfo>::as_ref(&*h.quote_mint),amount)?;")
s=s.replace(os_,"transfer_input(a,previous.as_ref(),&base_token_program,&h.associated_base_bonding_curve.to_account_info(),h.base_mint.decimals,AsRef::<AccountInfo>::as_ref(&*h.base_mint),amount)?;")
s=s.replace("\nstruct PreviousHop<'info> {","\npub struct PreviousHop<'info> {",1)
open(p,'w').write(s)
