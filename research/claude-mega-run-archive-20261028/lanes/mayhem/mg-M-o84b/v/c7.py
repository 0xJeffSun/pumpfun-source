import sys; sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/tools')
import t5, t6
BASEROOT = t5.BASEROOT
HB = t6.lets(t6.O79, h=t5.H)
E = t6.E['e0']
V = []; app = ''
LAZY = 'vt:u128,c:&curve_accounts::BondingCurve,cap:C,tokens:u128,retained_bps:u16'
def add(label, ito_body):
    global app
    k = len(V); app += t5.cap_type(k, E)
    h = t5.use_type(HB, k)
    app += t6.sa_copy(k, ito_body, sa_pre='', ito_args='vt as u128,c,cap,balance as u128,retained_bps', ito_params=LAZY)
    h = t6.use_sa(h, k)
    V.append((label, h, None))
# calib = r3 lazy form
add('calib', ' output=cap.early(output);let retained=retained_basis_points(retained_bps);let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output=cap.late(output);\n output.min(max)')
# front-load real_sol_reserves before cap.early (so its load schedules with cap)
add('rsr-before-early', ' let rsr=c.real_sol_reserves as u128;output=cap.early(output);let retained=retained_basis_points(retained_bps);let max=(rsr*retained as u128/10_000)as u64;\n output=cap.late(output);\n output.min(max)')
# retained before cap.early too
add('ret-before-early', ' let retained=retained_basis_points(retained_bps);output=cap.early(output);let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output=cap.late(output);\n output.min(max)')
# both rsr and retained before early, max as local computed before late
add('both-before', ' let retained=retained_basis_points(retained_bps);let rsr=c.real_sol_reserves as u128;output=cap.early(output);let max=(rsr*retained as u128/10_000)as u64;\n output=cap.late(output);\n output.min(max)')
# compute max fully before cap.early
add('max-before-early', ' let retained=retained_basis_points(retained_bps);let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;output=cap.early(output);\n output=cap.late(output);\n output.min(max)')
# cap.early returns, then min(max) directly (no cap.late since v2 has no late)
add('earlyonly-minmax', ' let retained=retained_basis_points(retained_bps);output=cap.early(output);\n output.min((c.real_sol_reserves as u128*retained as u128/10_000)as u64)')
APPEND = [('state.rs', app)]
VARIANTS = V
