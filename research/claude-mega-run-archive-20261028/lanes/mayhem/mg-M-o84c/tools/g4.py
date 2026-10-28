import sys; sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
import t5, t6, mk
QC_OLD = 'self.quote_mint==anchor_spl::token::spl_token::native_mint::ID{'
QC_ID = 'self.quote_mint==anchor_spl::token::spl_token::native_mint::id(){'
H_R2 = t6.lets(t6.O79, h=t5.H)   # per-field O0079 event lets
# shared ito: param retained -> retained_bps; compute retained_basis_points lazily AFTER cap.early (line-neutral on 341/351)
EDITS = [
 ('instructions/pump_interface_v2.rs', t5.H, H_R2),
 ('state.rs', QC_OLD, QC_ID),
 ('state.rs', 'fn initial_trade_output<C:TradeCap>(vt:u128,c:&curve_accounts::BondingCurve,cap:C,tokens:u128,retained:u16)->u64 {',
              'fn initial_trade_output<C:TradeCap>(vt:u128,c:&curve_accounts::BondingCurve,cap:C,tokens:u128,retained_bps:u16)->u64 {'),
 ('state.rs', ' output=cap.early(output);let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;',
              ' output=cap.early(output);let retained=retained_basis_points(retained_bps);let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;'),
 # callers pass retained_bps straight through (the precomputed `retained` local becomes unused)
 ('state.rs', 'let output=initial_trade_output(vt,c,cap,tokens,retained);', 'let output=initial_trade_output(vt,c,cap,tokens,retained_bps);'),
 ('state.rs', 'let output=initial_trade_output(vt as u128,c,cap,balance as u128,retained);', 'let output=initial_trade_output(vt as u128,c,cap,balance as u128,retained_bps);'),
]
def r3(): return mk.mkroot('r3', EDITS, base=t5.BASEROOT)
if __name__ == '__main__': print(globals()[sys.argv[1]]())
