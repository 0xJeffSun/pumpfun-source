"""Transforms on the h4 handler (o0084-port-r1 h4: 122 masked lines)."""
import re, itertools
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b'
H = open(L + '/tools/handler_h4.rs').read()
BASEROOT = L + '/roots/h4'

def rep(s, old, new, cnt=1):
    assert old in s, ('MISSING', old[:120]); return s.replace(old, new, cnt)

# ---------------- event arm tuple / phi order
TUP_START = H.index(' let (sol_amount,sol_vault_balance')
TUP_END = H.index(' let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};')
TUP_OLD = H[TUP_START:TUP_END]
NAMES = ['sol_amount', 'sol_vault_balance', 'global_sol_deployed', 'state_sol_deployed', 'virtual_sol', 'real_sol',
         'quote_vault_balance', 'global_quote_deployed', 'state_quote_deployed', 'virtual_quote', 'real_quote']
NATV = dict(sol_amount='sol', sol_vault_balance='vault_balance', global_sol_deployed='global_deployed', state_sol_deployed='state_deployed',
            virtual_sol='virtual_reserve', real_sol='real_reserve', quote_vault_balance='vault_balance', global_quote_deployed='global_deployed',
            state_quote_deployed='state_deployed', virtual_quote='virtual_reserve', real_quote='real_reserve')
ELSV = dict(NATV, sol_amount='0', sol_vault_balance='0', global_sol_deployed='0', state_sol_deployed='0', virtual_sol='0', real_sol='0')
NLETS = {'vb': 'let vault_balance=a.sol_vault.lamports();', 'gd': 'let global_deployed=a.global_params.sol_deployed;',
         'sd': 'let state_deployed=a.mayhem_state.field_56;', 'rr': 'let real_reserve=a.bonding_curve.real_sol_reserves;',
         'vr': 'let virtual_reserve=a.bonding_curve.virtual_sol_reserves;'}
ELETS = {'gd': 'let global_deployed=a.global_params.stable_deployed;', 'vb': 'let vault_balance=a.mayhem_quote_token_vault.amount;',
         'sd': 'let state_deployed=a.mayhem_state.field_56;', 'rr': 'let real_reserve=a.bonding_curve.real_sol_reserves;',
         'vr': 'let virtual_reserve=a.bonding_curve.virtual_sol_reserves;'}

def tup(order=NAMES, nat=('vb', 'gd', 'sd', 'rr', 'vr'), els=('gd', 'vb', 'sd', 'rr', 'vr')):
    return (f' let ({",".join(order)})=if native {{\n ' + ''.join(NLETS[k] for k in nat) + '\n (' + ','.join(NATV[n] for n in order) +
            ')\n } else {\n ' + ''.join(ELETS[k] for k in els) + '\n (' + ','.join(ELSV[n] for n in order) + ')\n };')

assert tup().replace(' ', '').replace('\n', '') == TUP_OLD.rstrip().replace(' ', '').replace('\n', ''), (tup(), TUP_OLD)

def arms(s, order=NAMES, nat=('vb', 'gd', 'sd', 'rr', 'vr'), els=('gd', 'vb', 'sd', 'rr', 'vr')):
    return rep(s, TUP_OLD, tup(order, nat, els))

# ---------------- price check
PRICE_OLD = H[H.index(' let vt=c.virtual_token_reserves as u128;let vs'):H.index('price_check?;') + len('price_check?;')]
PRICE = {
 'h4': PRICE_OLD,
 'letelse': ''' let price_check:std::result::Result<(),MayhemError> = (|| {
 let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let Some(price)=(vs*1_000_000_000_000_000u128).checked_div(vt) else {return Err(MayhemError::MathOverflow)};
 let Some(scaled)=reference.checked_mul(tolerance_bps as u128) else {return Err(MayhemError::MathOverflow)};
 let delta=scaled/10_000;
 let Some(low)=reference.checked_sub(delta) else {return Err(MayhemError::MathOverflow)};
 let Some(high)=reference.checked_add(delta) else {return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;''',
 'okor': ''' let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;
 let price_check:std::result::Result<(),MayhemError> = (|| {
 let price=(vs*1_000_000_000_000_000u128).checked_div(vt).ok_or(MayhemError::MathOverflow)?;
 let delta=reference.checked_mul(tolerance_bps as u128).ok_or(MayhemError::MathOverflow)?/10_000;
 let low=reference.checked_sub(delta).ok_or(MayhemError::MathOverflow)?;
 let high=reference.checked_add(delta).ok_or(MayhemError::MathOverflow)?;
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;''',
 'allmatch': ''' let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;
 let price_check:std::result::Result<(),MayhemError> = (|| {
 let price=match (vs*1_000_000_000_000_000u128).checked_div(vt){Some(p)=>p,None=>return Err(MayhemError::MathOverflow)};
 let delta=match reference.checked_mul(tolerance_bps as u128){Some(scaled)=>scaled/10_000,None=>return Err(MayhemError::MathOverflow)};
 let low=match reference.checked_sub(delta){Some(low)=>low,None=>return Err(MayhemError::MathOverflow)};
 let high=match reference.checked_add(delta){Some(high)=>high,None=>return Err(MayhemError::MathOverflow)};
 if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}
 Ok(())
 })();price_check?;''',
 'h4-lowmatch': PRICE_OLD.replace('let low=reference.checked_sub(delta).ok_or(MayhemError::MathOverflow)?;',
                                  'let low=match reference.checked_sub(delta){Some(low)=>low,None=>return Err(MayhemError::MathOverflow)};'),
 'h4-pricematch': PRICE_OLD.replace('let price=(vs*1_000_000_000_000_000u128).checked_div(vt).ok_or(MayhemError::MathOverflow)?;',
                                    'let price=match (vs*1_000_000_000_000_000u128).checked_div(vt){Some(p)=>p,None=>return Err(MayhemError::MathOverflow)};'),
 'h4-vtvs-inside': PRICE_OLD.replace(' let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;\n', '').replace(
     '(|| {\n', '(|| {\n let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;\n'),
 'h4-checks-split': PRICE_OLD.replace('if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}',
                                      'if price<low{return Err(MayhemError::PumpCpiSlippage);}if price>high{return Err(MayhemError::PumpCpiSlippage);}'),
 'h4-require': PRICE_OLD.replace('if price<low||price>high{return Err(MayhemError::PumpCpiSlippage);}',
                                 'if !(low..=high).contains(&price){return Err(MayhemError::PumpCpiSlippage);}'),
}
def price(s, k): return rep(s, PRICE_OLD, PRICE[k])

# ---------------- cap helpers: appended copies of sell_amounts/initial_trade_output in state.rs
SELL_CALL = 'crate::state::sell_amounts(c.virtual_token_reserves,c,&a.global_params,a.quote_mint.key(),a.mayhem_base_token_vault.amount,retained_reserve_bps)'
assert SELL_CALL in H
SELL_TMPL = '''
#[inline(always)]
fn ito_{n}(vt:u128,c:&curve_accounts::BondingCurve,global_params:&GlobalParams,quote_mint:{QT},tokens:u128,retained:u16)->u64 {{
{BODY}
}}
#[inline(always)]
pub fn sa_{n}(vt:u64,c:&curve_accounts::BondingCurve,global_params:&GlobalParams,quote_mint:{QT},balance:u64,retained_bps:u16)->(u64,u64) {{
    let retained=retained_basis_points(retained_bps);
    let output=ito_{n}(vt as u128,c,global_params,quote_mint,balance as u128,retained);let vs=c.virtual_sol_reserves;
    let ratio=vs.checked_sub(output).and_then(|denominator| if denominator == 0 {{ None }} else {{ Some(output as u128*vt as u128/denominator as u128) }})
        .ok_or(crate::MayhemError::PumpCpiMathOverflow)
                                                                                        .unwrap();
  let input=u64::try_from(ratio).unwrap();
    (input,output.saturating_sub(1))
}}
'''
RAW = ' let vs=c.virtual_sol_reserves as u128;let raw_quote=vs*tokens/(vt+tokens);\n  let mut output=u64::try_from(raw_quote).unwrap();\n'
NA = 'quote_mint==Pubkey::default()||quote_mint==anchor_spl::token::spl_token::native_mint::id()'
NAR = '*quote_mint==Pubkey::default()||*quote_mint==anchor_spl::token::spl_token::native_mint::id()'
ITO = {
 'h4': RAW + f' let cap=if {NA}{{&global_params.field_2}}else{{&global_params.field_11}}; let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n if *cap!=0 {{output=output.min(*cap);}}\n output.min(max)',
 'capfirst': RAW + f' let cap=if {NA}{{&global_params.field_2}}else{{&global_params.field_11}};\n if *cap!=0 {{output=output.min(*cap);}}\n let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output.min(max)',
 'capfirst-sel': RAW + f' let cap=if {NA}{{&global_params.field_2}}else{{&global_params.field_11}};\n let output=if *cap!=0 {{output.min(*cap)}} else {{output}};\n output.min((c.real_sol_reserves as u128*retained as u128/10_000)as u64)',
 'capval-first': RAW + f' let cap=if {NA}{{global_params.field_2}}else{{global_params.field_11}};\n if cap!=0 {{output=output.min(cap);}}\n let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output.min(max)',
 'capfirst-inlinemax': RAW + f' let cap=if {NA}{{&global_params.field_2}}else{{&global_params.field_11}};\n if *cap!=0 {{output=output.min(*cap);}}\n output.min((c.real_sol_reserves as u128*retained as u128/10_000)as u64)',
 'capfirst-gpref': RAW + f' let gp=global_params; let cap=if {NA}{{&gp.field_2}}else{{&gp.field_11}};\n if *cap!=0 {{output=output.min(*cap);}}\n let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output.min(max)',
 'capfirst-match': RAW + f' let cap=match {NA} {{true=>&global_params.field_2,false=>&global_params.field_11}};\n if *cap!=0 {{output=output.min(*cap);}}\n let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output.min(max)',
 'capfirst-ifelse-assign': RAW + f' let cap:&u64; if {NA}{{cap=&global_params.field_2;}}else{{cap=&global_params.field_11;}}\n if *cap!=0 {{output=output.min(*cap);}}\n let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output.min(max)',
}
def helpers(names, qt='Pubkey'):
    out = ''
    for n in names:
        body = ITO[n] if qt == 'Pubkey' else ITO[n].replace(NA, NAR)
        out += SELL_TMPL.format(n=n.replace('-', '_') + ('_r' if qt != 'Pubkey' else ''), QT=qt, BODY=body)
    return out
def cap(s, n, qt='Pubkey'):
    nm = n.replace('-', '_') + ('_r' if qt != 'Pubkey' else '')
    call = SELL_CALL.replace('sell_amounts(', f'sa_{nm}(')
    if qt != 'Pubkey': call = call.replace('a.quote_mint.key(),a.mayhem', '&a.quote_mint.key(),a.mayhem')
    return rep(s, SELL_CALL, call)

ITO.update({
 'm-val': RAW + f' let cap=match {NA} {{true=>global_params.field_2,false=>global_params.field_11}};\n if cap!=0 {{output=output.min(cap);}}\n let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output.min(max)',
 'm-boolbound': RAW + f' let na={NA}; let cap=if na{{&global_params.field_2}}else{{&global_params.field_11}};\n if *cap!=0 {{output=output.min(*cap);}}\n let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output.min(max)',
 'm-falsefirst': RAW + f' let cap=match {NA} {{false=>&global_params.field_11,true=>&global_params.field_2}};\n if *cap!=0 {{output=output.min(*cap);}}\n let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output.min(max)',
 'm-sel': RAW + f' let cap=match {NA} {{true=>&global_params.field_2,false=>&global_params.field_11}};\n let output=if *cap!=0 {{output.min(*cap)}} else {{output}};\n let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output.min(max)',
 'm-inlinemax': RAW + f' let cap=match {NA} {{true=>&global_params.field_2,false=>&global_params.field_11}};\n if *cap!=0 {{output=output.min(*cap);}}\n output.min((c.real_sol_reserves as u128*retained as u128/10_000)as u64)',
 'm-maxfirst': RAW + f' let cap=match {NA} {{true=>&global_params.field_2,false=>&global_params.field_11}}; let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n if *cap!=0 {{output=output.min(*cap);}}\n output.min(max)',
 'm-guard': RAW + f' let cap=match quote_mint {{k if k==Pubkey::default()||k==anchor_spl::token::spl_token::native_mint::id()=>&global_params.field_2,_=>&global_params.field_11}};\n if *cap!=0 {{output=output.min(*cap);}}\n let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output.min(max)',
 'm-val-sel': RAW + f' let cap=match {NA} {{true=>global_params.field_2,false=>global_params.field_11}};\n let output=if cap!=0 {{output.min(cap)}} else {{output}};\n let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output.min(max)',
 'm-gt0': RAW + f' let cap=match {NA} {{true=>&global_params.field_2,false=>&global_params.field_11}};\n if *cap>0 {{output=output.min(*cap);}}\n let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output.min(max)',
})
