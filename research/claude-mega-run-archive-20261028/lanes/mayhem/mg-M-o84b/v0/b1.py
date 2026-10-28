L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/o0084-brute-r1'
H=open(L+'/tools/handler_base.rs').read()
CAPOLD=''' let cap=if a.quote_mint.key()==Pubkey::default()||a.quote_mint.key()==WSOL{a.global_params.field_2}else{a.global_params.field_11};
 let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,&cap,a.mayhem_base_token_vault.amount,retained_reserve_bps);'''
assert CAPOLD in H
def cap(new): return H.replace(CAPOLD,new)
HELP='''
#[inline(always)]
pub fn o84_sell_a(global_params:&GlobalParams,c:&curve_accounts::BondingCurve,balance:u64,retained_bps:u16,quote_mint:Pubkey)->(u64,u64) {
    let retained=retained_basis_points(retained_bps);
    let vt=c.virtual_token_reserves;let vs=c.virtual_sol_reserves;
    let raw_quote=vs as u128*balance as u128/(vt as u128+balance as u128);
    let mut output=u64::try_from(raw_quote).unwrap();
    let cap = if quote_mint == Pubkey::default() || quote_mint == anchor_spl::token::spl_token::native_mint::id() { &global_params.field_2 } else { &global_params.field_11 };
    if *cap!=0 {output=output.min(*cap);}
    let output=output.min((c.real_sol_reserves as u128*retained as u128/10_000)as u64);
    let ratio=vs.checked_sub(output).and_then(|denominator| if denominator == 0 { None } else { Some(output as u128*vt as u128/denominator as u128) })
        .ok_or(crate::MayhemError::PumpCpiMathOverflow).unwrap();
    let input=u64::try_from(ratio).unwrap();
    (input,output.saturating_sub(1))
}
#[inline(always)]
pub fn o84_sell_b(global_params:&GlobalParams,c:&curve_accounts::BondingCurve,balance:u64,retained_bps:u16,quote_mint:Pubkey)->(u64,u64) {
    let _ = retained_basis_points(retained_bps);
    let vt=c.virtual_token_reserves;let vs=c.virtual_sol_reserves;
    let output=u64::try_from(vs as u128*balance as u128/(vt as u128+balance as u128)).unwrap();
    let cap = if quote_mint == Pubkey::default() || quote_mint == anchor_spl::token::spl_token::native_mint::id() { global_params.field_2 } else { global_params.field_11 };
    let output = if cap != 0 { output.min(cap) } else { output };
    let retained=retained_basis_points(retained_bps); let output=output.min((c.real_sol_reserves as u128*retained as u128/10000)as u64);
    let ratio=vs.checked_sub(output).and_then(|denominator| if denominator == 0 { None } else { Some(output as u128*vt as u128/denominator as u128) })
        .ok_or(crate::MayhemError::PumpCpiMathOverflow).unwrap();
    let input=u64::try_from(ratio).unwrap();
    (input,output.saturating_sub(1))
}
#[inline(always)]
pub fn o84_sell_c(global_params:&GlobalParams,c:&curve_accounts::BondingCurve,balance:u64,retained_bps:u16,quote_mint:Pubkey)->(u64,u64) {
    let retained=retained_basis_points(retained_bps);
    let vt=c.virtual_token_reserves;let vs=c.virtual_sol_reserves;
    let output=u64::try_from(vs as u128*balance as u128/(vt as u128+balance as u128)).unwrap();
    let cap = if quote_mint == Pubkey::default() || quote_mint == anchor_spl::token::spl_token::native_mint::id() { global_params.field_2 } else { global_params.field_11 };
    let output = if cap != 0 { output.min(cap) } else { output };
    let output=output.min((c.real_sol_reserves as u128*retained as u128/10000)as u64);
    let input=(||->std::result::Result<u128,crate::MayhemError>{ let remaining=vs.checked_sub(output).ok_or(crate::MayhemError::PumpCpiMathOverflow)?;
        (output as u128*vt as u128).checked_div(remaining as u128).ok_or(crate::MayhemError::PumpCpiMathOverflow) })().unwrap();
    let input=u64::try_from(input).unwrap();
    (input,output.saturating_sub(1))
}
'''
EXTRA=[('state.rs','#[inline(always)]\npub fn sell_amounts(',HELP+'#[inline(always)]\npub fn sell_amounts(')]
QK=' let (input,minimum)=crate::state::%s(&a.global_params,c,a.mayhem_base_token_vault.amount,retained_reserve_bps,a.quote_mint.key());'
VARIANTS=[
 ('base-copy',H,None),
 ('helperA-capref',cap(QK%'o84_sell_a'),None),
 ('helperB-sellquote-style',cap(QK%'o84_sell_b'),None),
 ('helperC-closure-ratio',cap(QK%'o84_sell_c'),None),
 ('helperA-qm-bound-before',cap(' let quote_mint=a.quote_mint.key();\n'+(QK%'o84_sell_a').replace('a.quote_mint.key())','quote_mint)')),None),
 ('helperB-native-first',cap((QK%'o84_sell_b')).replace(' let native=a.quote_mint.key()==WSOL;\n','').replace(' let c=&a.bonding_curve;',' let native=a.quote_mint.key()==WSOL;\n let c=&a.bonding_curve;'),None),
 ('base-capref',cap(''' let cap=if a.quote_mint.key()==Pubkey::default()||a.quote_mint.key()==WSOL{&a.global_params.field_2}else{&a.global_params.field_11};
 let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,cap,a.mayhem_base_token_vault.amount,retained_reserve_bps);'''),None),
]
