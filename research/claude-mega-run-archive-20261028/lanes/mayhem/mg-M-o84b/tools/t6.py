"""c3+ helpers: per-field event lets (O0079 style) and appended generic sell_amounts/ito copies."""
import sys
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/tools')
import t5, t4
H = t5.H; TUP = t4.TUP_OLD
ID = lambda b: b.replace('native_mint::ID', 'native_mint::id()')
E = {k: ID(v) for k, v in t5.EARLY.items()}
FIELD = {'quote_vault_balance': 'let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};',
         'state_quote_deployed': 'let state_quote_deployed=a.mayhem_state.field_56;',
         'global_sol_deployed': 'let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};',
         'virtual_quote': 'let virtual_quote=a.bonding_curve.virtual_sol_reserves;',
         'real_quote': 'let real_quote=a.bonding_curve.real_sol_reserves;',
         'global_quote_deployed': 'let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};',
         'sol_amount': 'let sol_amount=if native{sol}else{0};',
         'sol_vault_balance': 'let sol_vault_balance=if native{quote_vault_balance}else{0};',
         'state_sol_deployed': 'let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};',
         'virtual_sol': 'let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};',
         'real_sol': 'let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};'}
REUSE = {'sol_vault_balance': 'let sol_vault_balance=if native{quote_vault_balance}else{0};',
         'state_sol_deployed': 'let state_sol_deployed=if native{state_quote_deployed}else{0};',
         'virtual_sol': 'let virtual_sol=if native{virtual_quote}else{0};',
         'real_sol': 'let real_sol=if native{real_quote}else{0};',
         'global_quote_deployed': 'let global_quote_deployed=if native{global_sol_deployed}else{a.global_params.stable_deployed};'}
DEPS = {'sol_vault_balance': 'quote_vault_balance', 'state_sol_deployed': 'state_quote_deployed', 'virtual_sol': 'virtual_quote',
        'real_sol': 'real_quote', 'global_quote_deployed': 'global_sol_deployed'}
O79 = ['quote_vault_balance', 'state_quote_deployed', 'global_sol_deployed', 'virtual_quote', 'real_quote', 'global_quote_deployed',
       'sol_amount', 'sol_vault_balance', 'state_sol_deployed', 'virtual_sol', 'real_sol']
def lets(order, h=H, over=None, reuse=()):
    f = dict(FIELD); f.update(over or {})
    for k in reuse: f[k] = REUSE[k]
    for k, d in DEPS.items():
        if d in f[k].split('{')[1] and order.index(k) < order.index(d):
            return None
    return t5.rep(h, TUP, ' ' + ''.join(f[k] for k in order) + '\n')
ITO_HEAD = ''' let vs=c.virtual_sol_reserves as u128;let raw_quote=vs*tokens/(vt+tokens);
  let mut output=u64::try_from(raw_quote).unwrap();
'''
ITO_CUR = ' output=cap.early(output);let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output=cap.late(output);\n output.min(max)'
SA_BODY = '''    let ratio=vs.checked_sub(output).and_then(|denominator| if denominator == 0 {{ None }} else {{ Some(output as u128*vt as u128/denominator as u128) }})
        .ok_or(crate::MayhemError::PumpCpiMathOverflow)
                                                                                        .unwrap();
  let input=u64::try_from(ratio).unwrap();
    (input,output.saturating_sub(1))'''
def sa_copy(k, ito_body=ITO_CUR, sa_pre='    let retained=retained_basis_points(retained_bps);\n', ito_args='vt as u128,c,cap,balance as u128,retained',
            ito_params='vt:u128,c:&curve_accounts::BondingCurve,cap:C,tokens:u128,retained:u16'):
    return (f'\n#[inline(always)]\nfn ito_{k}<C:TradeCap>({ito_params})->u64 {{\n' + ITO_HEAD + ito_body + '\n}\n'
            f'#[inline(always)]\npub fn sa_{k}<C:TradeCap>(vt:u64,c:&curve_accounts::BondingCurve,cap:C,balance:u64,retained_bps:u16)->(u64,u64) {{\n'
            + sa_pre + f'    let output=ito_{k}({ito_args});let vs=c.virtual_sol_reserves;\n' + SA_BODY.replace('{{', '{').replace('}}', '}') + '\n}\n')
def use_sa(h, k):
    return t5.rep(h, 'crate::state::sell_amounts(', f'crate::state::sa_{k}(')

import re as _re
def relit(h, order):
    """Reorder the SellEvent{..} literal in handler text h to the given field order (values kept)."""
    i = h.index('SellEvent{'); j = h.index('}', i)
    body = h[i + len('SellEvent{'):j]
    parts = [p.strip() for p in _re.split(r',(?![^(]*\))', body) if p.strip()]
    d = {}
    for p in parts:
        f = p.split(':')[0].strip(); d[f] = p
    assert set(d) == set(order), (set(d) ^ set(order))
    return h[:i + len('SellEvent{')] + ','.join(d[f] for f in order) + h[j:]
O79_LIT = ['side', 'quote_vault_balance', 'state_quote_deployed', 'global_sol_deployed', 'virtual_quote', 'real_quote',
           'global_quote_deployed', 'sol_amount', 'sol_vault_balance', 'state_sol_deployed', 'virtual_sol', 'real_sol',
           'sol_vault', 'mint', 'token_amount', 'token_vault_balance', 'state_token_net', 'virtual_tokens', 'end_timestamp',
           'timestamp', 'real_tokens', 'version', 'retained_reserve_bps', 'quote_amount', 'quote_mint']
