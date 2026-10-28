import sys; sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/tools')
import t5, t6
BASEROOT = t5.BASEROOT
V = []; app = ''
def add(label, h, body=t6.E['e0'], attr='', sa=None):
    global app
    if h is None: return
    k = len(V); app += t5.cap_type(k, body, attr); h = t5.use_type(h, k)
    if sa is not None: app += sa(k); h = t6.use_sa(h, k)
    V.append((label, h, None))
O = t6.O79
add('lets-O79', t6.lets(O))
for i in range(len(O) - 1):
    o = O[:]; o[i], o[i + 1] = o[i + 1], o[i]; add(f'O79-swap{i}', t6.lets(o))
add('O79-svb-lamports', t6.lets(O, over={'sol_vault_balance': 'let sol_vault_balance=if native{a.sol_vault.lamports()}else{0};'}))
add('O79-reuse-ssd', t6.lets(O, reuse=['state_sol_deployed']))
add('O79-reuse-vs-rs', t6.lets(O, reuse=['virtual_sol', 'real_sol']))
add('O79-reuse-gqd', t6.lets(O, reuse=['global_quote_deployed']))
add('O79-reuse-all', t6.lets(O, reuse=['state_sol_deployed', 'virtual_sol', 'real_sol', 'global_quote_deployed']))
L = t6.lets(O)
add('O79-sacopy-calib', L, sa=lambda k: t6.sa_copy(k))
add('O79-early-after-max', L, sa=lambda k: t6.sa_copy(k, ' let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;output=cap.early(output);\n output=cap.late(output);\n output.min(max)'))
add('O79-retained-in-ito', L, sa=lambda k: t6.sa_copy(k, ' output=cap.early(output);let max=(c.real_sol_reserves as u128*retained_basis_points(retained) as u128/10_000)as u64;\n output=cap.late(output);\n output.min(max)', sa_pre='', ito_args='vt as u128,c,cap,balance as u128,retained_bps'))
add('O79-e9gp', L, t6.E['e9-gp'])
add('O79-e6val', L, t6.E['e6-val'])
APPEND = [('state.rs', app)]
VARIANTS = V
