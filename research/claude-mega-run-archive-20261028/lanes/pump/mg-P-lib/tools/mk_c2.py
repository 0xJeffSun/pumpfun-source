import sys,re
D=sys.argv[1]+'/src/'
def rd(f): return open(D+f).read().split('\n')
def wr(f,l): open(D+f,'w').write('\n'.join(l))
# --- create_v2.rs
c=rd('create_v2.rs'); n0=len(c)
assert c[440].startswith('// layout-pad: positions check_quote_mint_extensions') and c[441]=='' and c[442]==''
del c[441:443]
i=[k for k,x in enumerate(c) if x.startswith('fn root_seed(g: &Global')][0]
j=i
while c[j]!='}': j+=1
for k in range(i,j+1): c[k]=''
k=[k for k,x in enumerate(c) if 'seed = root_seed(g, &curve.quote_mint, &control)?;' in x][0]
c[k]=c[k].replace('seed = root_seed(g, &curve.quote_mint, &control)?;','seed = crate::pump_quote::root_seed(&curve, g, &control)?;')
assert len(c)==n0-2; wr('create_v2.rs',c)
# --- pump_quote.rs : root_seed with error! on line 90
p=rd('pump_quote.rs')
body=['pub fn root_seed(curve: &BondingCurve, g: &Global, control: &[u8]) -> Result<u64> {',
'    if curve.quote_mint == Pubkey::default() {',
'        return Ok(g.initial_virtual_sol_reserves);',
'    }',
'    if global_quote(curve.quote_mint, g) {',
'        return Ok(g.initial_virtual_quote_reserves);',
'    }',
'    crate::quote_control::state::control_entry(control, &curve.quote_mint)?',
'        .ok_or_else(|| error!(PumpError::QuoteBondingCurveNotEligible))',
'}']
helper=['fn global_quote(quote: Pubkey, g: &Global) -> bool {',
'    quote == Pubkey::default() || quote == anchor_spl::token::spl_token::native_mint::ID || g.whitelisted_quote_mints.contains(&quote)',
'}']
start=82
for k in range(start-4, start+len(body)): assert p[k-1]=='', (k,p[k-1])
for t,x in enumerate(helper): p[start-4-1+t]=x
for t,x in enumerate(body): p[start-1+t]=x
assert p[89].strip().startswith('.ok_or_else(|| error!'), p[89]
wr('pump_quote.rs',p)
# --- multi_hop_curve_swap.rs
m=rd('multi_hop_curve_swap.rs'); n0=len(m)
k=[k for k,x in enumerate(m) if 'let _base_token_program = token_program_for' in x][0]
m[k]=m[k].replace('let _base_token_program','let base_token_program').replace('let _quote_token_program','let quote_token_program')
k=[k for k,x in enumerate(m) if 'checked_transfer(from,mint,a.destination.to_account_info(),h.bonding_curve.to_account_info(),if buy{output}else{raw_output},decimals,&[seeds])?;' in x][0]
ind=m[k][:len(m[k])-len(m[k].lstrip())]
m[k]=ind+'let _=(from,mint,decimals);if buy{transfer_base_out(&base_token_program,&h.associated_base_bonding_curve,&a.destination,&h.bonding_curve,h.base_mint.decimals,AsRef::<AccountInfo>::as_ref(&*h.base_mint),output,&[seeds])?;}else{transfer_quote_out(&quote_token_program,&h.associated_quote_bonding_curve,&a.destination,&h.bonding_curve,h.quote_mint.decimals,AsRef::<AccountInfo>::as_ref(&*h.quote_mint),raw_output,&[seeds])?;}'
k=[k for k,x in enumerate(m) if x.strip().startswith('checked_transfer(h.associated_quote_bonding_curve.to_account_info(),h.quote_mint.to_account_info(),')][0]
assert 'a.buyback_fee_recipient.to_account_info(),h.bonding_curve.to_account_info(),' in m[k+1] and 'paid_buyback,h.quote_mint.decimals,&[seeds])?;' in m[k+2]
ind=m[k][:len(m[k])-len(m[k].lstrip())]
m[k]=ind+'transfer_buyback_out(&quote_token_program,&h.associated_quote_bonding_curve,&a.buyback_fee_recipient,'
m[k+1]=ind+'    &h.bonding_curve,h.quote_mint.decimals,AsRef::<AccountInfo>::as_ref(&*h.quote_mint),'
m[k+2]=ind+'    paid_buyback,&[seeds])?;'
while m and m[-1]=='': m.pop()
m+=['',
'#[inline(never)]',
"pub fn transfer_quote_out<'info>(token_program:&AccountInfo<'info>,from:&UncheckedAccount<'info>,to:&InterfaceAccount<'info,TokenAccount>,authority:&Account<'info,BondingCurve>,decimals:u8,mint:&AccountInfo<'info>,amount:u64,signer_seeds:&[&[&[u8]];1])->Result<()>{",
"    anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(token_program.clone(),anchor_spl::token_2022::TransferChecked{from:from.to_account_info(),to:to.to_account_info(),authority:authority.to_account_info(),mint:mint.clone()},signer_seeds),amount,decimals)",
'}',
'#[inline(never)]',
"pub fn transfer_base_out<'info>(token_program:&AccountInfo<'info>,from:&InterfaceAccount<'info,TokenAccount>,to:&InterfaceAccount<'info,TokenAccount>,authority:&Account<'info,BondingCurve>,decimals:u8,mint:&AccountInfo<'info>,amount:u64,signer_seeds:&[&[&[u8]];1])->Result<()>{",
'    if amount==0{return Ok(());}',
"    anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(token_program.clone(),anchor_spl::token_2022::TransferChecked{from:from.to_account_info(),to:to.to_account_info(),authority:authority.to_account_info(),mint:mint.clone()},signer_seeds),amount,decimals)",
'}',
'#[inline(never)]',
"pub fn transfer_buyback_out<'info>(token_program:&AccountInfo<'info>,from:&UncheckedAccount<'info>,to:&UncheckedAccount<'info>,authority:&Account<'info,BondingCurve>,decimals:u8,mint:&AccountInfo<'info>,amount:u64,signer_seeds:&[&[&[u8]];1])->Result<()>{",
'    if amount==0{return Ok(());}',
"    anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(token_program.clone(),anchor_spl::token_2022::TransferChecked{from:from.to_account_info(),to:to.to_account_info(),authority:authority.to_account_info(),mint:mint.clone()},signer_seeds),amount,decimals)",
'}','']
wr('multi_hop_curve_swap.rs',m)
print('ok')
