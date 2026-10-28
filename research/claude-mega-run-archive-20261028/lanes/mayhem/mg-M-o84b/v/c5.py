# Arm/tail region sweep on the r2 base (per-field O0079 event lets). QuoteCap::early fixed (id()); vary sol-side field RHS forms + field_72/net placement.
import sys; sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/tools')
import t5, t6
BASEROOT = t5.BASEROOT
E = t6.E['e0']
O = t6.O79
V = []; app = ''
def add(label, h):
    global app
    k = len(V); app += t5.cap_type(k, E); V.append((label, t5.use_type(h, k), None))
add('calib', t6.lets(O))
# virtual_sol/real_sol reuse the quote-side locals in native arm
add('vs-rs-reuse', t6.lets(O, reuse=['virtual_sol', 'real_sol']))
add('svb-reuse-vqb', t6.lets(O, reuse=['sol_vault_balance']))
add('ssd-reuse', t6.lets(O, reuse=['state_sol_deployed']))
add('all-reuse', t6.lets(O, reuse=['sol_vault_balance', 'state_sol_deployed', 'virtual_sol', 'real_sol', 'global_quote_deployed']))
# sol_amount forms
add('sa-select', t6.lets(O, over={'sol_amount': 'let sol_amount=if native{sol}else{0u64};'}))
add('sa-mul', t6.lets(O, over={'sol_amount': 'let sol_amount=sol*native as u64;'}))
# state fields: field_56 vs reusing state_quote_deployed
add('ssd-field56', t6.lets(O, over={'state_sol_deployed': 'let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};'}))
# real/virtual sol from real_sol_reserves/virtual_sol_reserves explicitly
add('vsrs-explicit', t6.lets(O, over={'virtual_sol': 'let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};', 'real_sol': 'let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};'}))
# global_quote_deployed: reuse global_sol_deployed in native
add('gqd-reuse-gsd', t6.lets(O, reuse=['global_quote_deployed']))
# quote-side real/virtual as separate loads vs one
add('qvq-separate', t6.lets(O, over={'virtual_quote': 'let virtual_quote=a.bonding_curve.virtual_sol_reserves;', 'real_quote': 'let real_quote=a.bonding_curve.real_sol_reserves;'}))
# move global_sol_deployed to right before global_quote_deployed
O2 = ['quote_vault_balance', 'state_quote_deployed', 'virtual_quote', 'real_quote', 'global_sol_deployed', 'global_quote_deployed',
      'sol_amount', 'sol_vault_balance', 'state_sol_deployed', 'virtual_sol', 'real_sol']
add('gsd-before-gqd', t6.lets(O2))
# sol-side group reordered: sol_amount last
O3 = ['quote_vault_balance', 'state_quote_deployed', 'global_sol_deployed', 'virtual_quote', 'real_quote', 'global_quote_deployed',
      'sol_vault_balance', 'state_sol_deployed', 'virtual_sol', 'real_sol', 'sol_amount']
add('sa-last', t6.lets(O3))
APPEND = [('state.rs', app)]
VARIANTS = [v for v in V if v[1] is not None]
