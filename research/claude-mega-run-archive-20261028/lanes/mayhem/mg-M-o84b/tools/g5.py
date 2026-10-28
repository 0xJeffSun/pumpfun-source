import sys; sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/tools')
import t5, t6, mk
QC_OLD = 'self.quote_mint==anchor_spl::token::spl_token::native_mint::ID{'
QC_ID = 'self.quote_mint==anchor_spl::token::spl_token::native_mint::id(){'
def base_edits(hfn):
    h = hfn()
    return [('instructions/pump_interface_v2.rs', t5.H, h),
            ('state.rs', QC_OLD, QC_ID),
            ('state.rs', 'cap:C,tokens:u128,retained:u16)->u64 {', 'cap:C,tokens:u128,retained_bps:u16)->u64 {'),
            ('state.rs', ' output=cap.early(output);let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;',
                         ' output=cap.early(output);let retained=retained_basis_points(retained_bps);let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;'),
            ('state.rs', 'let output=initial_trade_output(vt,c,cap,tokens,retained);', 'let output=initial_trade_output(vt,c,cap,tokens,retained_bps);'),
            ('state.rs', 'let output=initial_trade_output(vt as u128,c,cap,balance as u128,retained);', 'let output=initial_trade_output(vt as u128,c,cap,balance as u128,retained_bps);')]
def r4():
    hfn = lambda: t6.relit(t6.lets(t6.O79, h=t5.H), t6.O79_LIT)
    return mk.mkroot('r4', base_edits(hfn), base=t5.BASEROOT)
if __name__ == '__main__': print(globals()[sys.argv[1]]())
