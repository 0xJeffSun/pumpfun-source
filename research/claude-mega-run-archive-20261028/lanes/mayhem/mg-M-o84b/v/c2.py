import sys; sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/tools')
import t5, t4
BASEROOT = t5.BASEROOT; H = t5.H
ID = lambda b: b.replace('native_mint::ID', 'native_mint::id()')
E = {k: ID(v) for k, v in t5.EARLY.items()}
V = []; app = ''
def add(label, h, body, attr=''):
    global app
    k = len(V); app += t5.cap_type(k, body, attr); V.append((label, t5.use_type(h, k), None))
HQ = t5.arms(H, t5.QF)
add('QF-id (c1 best)', HQ, E['e0'])
for e in ['e1-not', 'e2-neand', 'e3-match', 'e4-matchf', 'e5-bool', 'e6-val', 'e8-eq0', 'e11-qm', 'e14-matchcap']:
    add('QF-id-' + e, HQ, E[e])
NA2 = 'self.quote_mint==anchor_spl::token::spl_token::native_mint::id()||self.quote_mint==Pubkey::default()'
add('QF-id-swapcmp', HQ, f'let cap=if {NA2}{{{t5.F2}}}else{{{t5.F11}}}; {t5.APPLY}')
add('QF-id-early-inline', HQ, E['e0'], '#[inline] ')
# arm forms
N = t5.NAMES
EV = ['sol_amount', 'sol_vault_balance', 'state_sol_deployed', 'virtual_sol', 'global_sol_deployed', 'real_sol',
      'quote_vault_balance', 'state_quote_deployed', 'virtual_quote', 'global_quote_deployed', 'real_quote']
add('id-tupH4', H, E['e0'])
add('id-tupEV', t5.arms(H, EV), E['e0'])
add('id-tupEVQF', t5.arms(H, EV[6:] + EV[:6]), E['e0'])
for nat, els in [(('gd', 'vb', 'sd', 'rr', 'vr'), ('gd', 'vb', 'sd', 'rr', 'vr')), (('vb', 'gd', 'sd', 'rr', 'vr'), ('vb', 'gd', 'sd', 'rr', 'vr')),
                 (('vb', 'sd', 'gd', 'rr', 'vr'), ('gd', 'vb', 'sd', 'rr', 'vr')), (('vb', 'gd', 'sd', 'vr', 'rr'), ('gd', 'vb', 'sd', 'vr', 'rr')),
                 (('sd', 'vb', 'gd', 'rr', 'vr'), ('sd', 'gd', 'vb', 'rr', 'vr'))]:
    add(f'QF-id-nat{"".join(nat)}-els{"".join(els)}', t5.arms(H, t5.QF, nat, els), E['e0'])
# per-field lets (O0079 style), literal unchanged
TUP = t4.TUP_OLD
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
O79 = ['quote_vault_balance', 'state_quote_deployed', 'global_sol_deployed', 'virtual_quote', 'real_quote', 'global_quote_deployed',
       'sol_amount', 'sol_vault_balance', 'state_sol_deployed', 'virtual_sol', 'real_sol']
def lets(order):
    f = dict(FIELD)
    if order.index('sol_vault_balance') < order.index('quote_vault_balance'): f['sol_vault_balance'] = 'let sol_vault_balance=if native{a.sol_vault.lamports()}else{0};'
    return t5.rep(H, TUP, ' ' + ''.join(f[k] for k in order) + '\n')
add('id-lets-O79', lets(O79), E['e0'])
add('id-lets-QF', lets(N[6:] + N[:6]), E['e0'])
add('id-lets-EV', lets(EV), E['e0'])
add('id-lets-EVQF', lets(EV[6:] + EV[:6]), E['e0'])
APPEND = [('state.rs', app)]
VARIANTS = V
