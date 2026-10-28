"""Source transforms for the sell_v2 handler text (tools/handler_base.rs)."""
import re
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b'
H=open(L+'/tools/handler_base.rs').read()
def rep(s,old,new):
    assert old in s,(old[:100]); return s.replace(old,new,1)
# ---- CPI call extraction
_m=re.search(r' let cpi_result:Result<\(\)> = if (crate::pump_v2::cpi::sell_v2\(.*\),input,minimum\))\.is_ok\(\) \{ Ok\(\(\)\) \} else \{ Err\(error!\(BuyError::PumpCpiFailed\)\) \};\n cpi_result\?;\n',H,re.S)
CPI_STMT=_m.group(0); CALL=_m.group(1)
E='error!(BuyError::PumpCpiFailed)'
CPI_FORMS={
 'x02': CPI_STMT,
 'mapErr_': f' {CALL}.map_err(|_| {E})?;\n',
 'mapErr_e': f' {CALL}.map_err(|_e| {E})?;\n',
 'letr_iserr': f' let r={CALL};\n if r.is_err() {{ return Err({E}); }}\n',
 'match_': f' match {CALL} {{ Ok(()) => {{}}, Err(_) => return Err({E}) }}\n',
 'iflet_e': f' if let Err(_e) = {CALL} {{ return Err({E}); }}\n',
 'iflet_': f' if let Err(_) = {CALL} {{ return Err({E}); }}\n',
 'require': f' require!({CALL}.is_ok(),BuyError::PumpCpiFailed);\n',
 'letr_require': f' let r={CALL};\n require!(r.is_ok(),BuyError::PumpCpiFailed);\n',
 'orElse': f' {CALL}.or_else(|_| Err({E}))?;\n',
 'letres_match_e': f' let cpi_result:Result<()> = match {CALL} {{ Ok(()) => Ok(()), Err(_e) => Err({E}) }};\n cpi_result?;\n',
 'block_letr': f' {{ let r={CALL}; if r.is_err() {{ return Err({E}); }} }}\n',
}
def cpi(s,form): return rep(s,CPI_STMT,CPI_FORMS[form])
# ---- cap / sell_amounts forms
CAPOLD=''' let cap=if a.quote_mint.key()==Pubkey::default()||a.quote_mint.key()==WSOL{a.global_params.field_2}else{a.global_params.field_11};
 let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,&cap,a.mayhem_base_token_vault.amount,retained_reserve_bps);'''
QK=' let (input,minimum)=crate::state::%s(&a.global_params,c,a.mayhem_base_token_vault.amount,retained_reserve_bps,a.quote_mint.key());'
def capf(s,helper): return rep(s,CAPOLD,QK%helper)
# ---- event tail: native / else branch let orders
NAT_LETS={'vb':'let vault_balance=a.sol_vault.lamports();','gd':'let global_deployed=a.global_params.sol_deployed;','sd':'let state_deployed=a.mayhem_state.field_56;','rr':'let real_reserve=a.bonding_curve.real_sol_reserves;','vr':'let virtual_reserve=a.bonding_curve.virtual_sol_reserves;'}
ELS_LETS={'gd':'let global_deployed=a.global_params.stable_deployed;','vb':'let vault_balance=a.mayhem_quote_token_vault.amount;','sd':'let state_deployed=a.mayhem_state.field_56;','rr':'let real_reserve=a.bonding_curve.real_sol_reserves;','vr':'let virtual_reserve=a.bonding_curve.virtual_sol_reserves;','mi':'let mint=a.quote_mint.key();'}
NAT0=' '+''.join(NAT_LETS[k] for k in ['vb','gd','sd','rr','vr'])+'\n'
ELS0=' '+''.join(ELS_LETS[k] for k in ['gd','vb','sd','rr','vr','mi'])+'\n'
assert NAT0 in H and ELS0 in H
def nat(s,order): return rep(s,NAT0,' '+''.join(NAT_LETS[k] for k in order)+'\n')
def els(s,order): return rep(s,ELS0,' '+''.join(ELS_LETS[k] for k in order)+'\n')
# ---- cap as reference (ir-r1 finding)
CAPREF=''' let cap=if a.quote_mint.key()==Pubkey::default()||a.quote_mint.key()==WSOL{&a.global_params.field_2}else{&a.global_params.field_11};
 let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,cap,a.mayhem_base_token_vault.amount,retained_reserve_bps);'''
CAPNA=''' let native_accounting=a.quote_mint.key()==Pubkey::default()||a.quote_mint.key()==WSOL;let cap=if native_accounting{&a.global_params.field_2}else{&a.global_params.field_11};
 let (input,minimum)=crate::state::sell_amounts(c.virtual_token_reserves,c,cap,a.mayhem_base_token_vault.amount,retained_reserve_bps);'''
def capref(s): return rep(s,CAPOLD,CAPREF)
def capna(s): return rep(s,CAPOLD,CAPNA)
# ---- price check forms
PRICE_OLD=H[H.index(' let price_check:'):H.index('price_check?;')+len('price_check?;')]
PRICE_LETELSE=''' let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;'''
def price_letelse(s):
    s=rep(s,PRICE_OLD,PRICE_LETELSE)
    return rep(s,' let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;\n','')
# ---- event: phased literal (O0084 orig emission order)
EV_OLD=H[H.index(' let event=SellEvent{'):H.index(' emit!(event);')]
EV_PHASED_LIT=''' let sol_vault=a.sol_vault.key();let mint=a.mint.key();let token_vault_balance=a.mayhem_base_token_vault.amount;let state_token_net=a.mayhem_state.field_72;let virtual_tokens=a.bonding_curve.virtual_token_reserves;
 let timestamp=Clock::get()?.unix_timestamp;let end_timestamp=a.mayhem_state.end_timestamp;let real_tokens=a.bonding_curve.real_token_reserves;let version=a.global_params.version;
 let event=SellEvent{quote_mint,sol_vault,side:true,sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance,virtual_sol,virtual_tokens,timestamp,end_timestamp,real_sol,real_tokens,retained_reserve_bps,version,global_sol_deployed,state_token_net,state_sol_deployed,mint,global_quote_deployed,state_quote_deployed,real_quote,virtual_quote,quote_vault_balance,quote_amount:sol};
'''
EV_LIT_ONLY=''' let event=SellEvent{quote_mint,sol_vault:a.sol_vault.key(),side:true,sol_amount,token_amount:tokens,sol_vault_balance,token_vault_balance:a.mayhem_base_token_vault.amount,virtual_sol,virtual_tokens:a.bonding_curve.virtual_token_reserves,timestamp:Clock::get()?.unix_timestamp,end_timestamp:a.mayhem_state.end_timestamp,real_sol,real_tokens:a.bonding_curve.real_token_reserves,retained_reserve_bps,version:a.global_params.version,global_sol_deployed,state_token_net:a.mayhem_state.field_72,state_sol_deployed,mint:a.mint.key(),global_quote_deployed,state_quote_deployed,real_quote,virtual_quote,quote_vault_balance,quote_amount:sol};
'''
def ev_phased(s): return rep(s,EV_OLD,EV_PHASED_LIT)
def ev_lit(s): return rep(s,EV_OLD,EV_LIT_ONLY)
TUP_OLD=H[H.index(' let (sol_amount,sol_vault_balance'):H.index(' let event=SellEvent')]
CODEX_PHASED_TUP=''' let native_balance=if native{a.sol_vault.lamports()}else{0};
 let sol_amount=if native{sol}else{0};let sol_vault_balance=native_balance;
 let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};
 let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};let quote_vault_balance=if native{native_balance}else{a.mayhem_quote_token_vault.amount};
 let virtual_quote=a.bonding_curve.virtual_sol_reserves;let real_quote=a.bonding_curve.real_sol_reserves;let state_quote_deployed=a.mayhem_state.field_56;
 let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};let virtual_sol=if native{virtual_quote}else{0};let real_sol=if native{real_quote}else{0};
'''
def tup_codex(s): return rep(s,TUP_OLD,CODEX_PHASED_TUP)
