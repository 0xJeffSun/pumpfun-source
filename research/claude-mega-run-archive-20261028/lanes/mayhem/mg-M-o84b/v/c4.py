# Cap-region sweep: per-variant appended ito_<k>/sa_<k> copies (legacy &u64 path untouched), on the r2 base (per-field O0079 lets).
import sys; sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/tools')
import t5, t6
BASEROOT = t5.BASEROOT
HB = t6.lets(t6.O79, h=t5.H)       # r2 handler: per-field O0079 event lets
E = t6.E['e0']                     # QuoteCap::early with native_mint::id()
V = []; app = ''
MAX = '(c.real_sol_reserves as u128*retained as u128/10_000)as u64'
def add(label, ito_body, pre='    let retained=retained_basis_points(retained_bps);\n', args='vt as u128,c,cap,balance as u128,retained', params='vt:u128,c:&curve_accounts::BondingCurve,cap:C,tokens:u128,retained:u16'):
    global app
    k = len(V); app += t5.cap_type(k, E)
    h = t5.use_type(HB, k)
    app += t6.sa_copy(k, ito_body, sa_pre=pre, ito_args=args, ito_params=params)
    h = t6.use_sa(h, k)
    V.append((label, h, None))
# calib = r2 form
add('calib', f' output=cap.early(output);let max={MAX};\n output=cap.late(output);\n output.min(max)')
# retained computed lazily inside ito, after cap.early (delays 10000-sub past the cap loads)
LAZY = 'vt:u128,c:&curve_accounts::BondingCurve,cap:C,tokens:u128,retained_bps:u16'
add('lazy-retained', ' output=cap.early(output);let retained=retained_basis_points(retained_bps);let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output=cap.late(output);\n output.min(max)', args='vt as u128,c,cap,balance as u128,retained_bps', params=LAZY)
add('lazy-ret-maxlate', ' output=cap.early(output);let max={let retained=retained_basis_points(retained_bps);(c.real_sol_reserves as u128*retained as u128/10_000)as u64};\n output=cap.late(output);\n output.min(max)', args='vt as u128,c,cap,balance as u128,retained_bps', params=LAZY)
# max expression groupings
add('max-mul-first', f' output=cap.early(output);let max=((c.real_sol_reserves as u128*retained as u128)/10_000)as u64;\n output=cap.late(output);\n output.min(max)')
add('max-realsol-local', ' output=cap.early(output);let rsr=c.real_sol_reserves as u128;let max=(rsr*retained as u128/10_000)as u64;\n output=cap.late(output);\n output.min(max)')
add('max-after-late', f' output=cap.early(output);output=cap.late(output);let max={MAX};\n output.min(max)')
add('max-min-inline', ' output=cap.early(output);\n output=cap.late(output);\n output.min((c.real_sol_reserves as u128*retained as u128/10_000)as u64)')
# cap.early manual-inlined in ito (no trait call) to see if scheduling changes
NA = 'quote_mint==Pubkey::default()||quote_mint==anchor_spl::token::spl_token::native_mint::id()'
APPEND = [('state.rs', app)]
VARIANTS = V
