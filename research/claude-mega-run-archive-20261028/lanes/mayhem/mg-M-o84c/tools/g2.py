import sys; sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
import t5, mk
QC_OLD = 'self.quote_mint==anchor_spl::token::spl_token::native_mint::ID{'
QC_ID = 'self.quote_mint==anchor_spl::token::spl_token::native_mint::id(){'
def r1():
    return mk.mkroot('r1', [('instructions/pump_interface_v2.rs', t5.H, t5.arms(t5.H, t5.QF)), ('state.rs', QC_OLD, QC_ID)], base=t5.BASEROOT)
if __name__ == '__main__':
    print(globals()[sys.argv[1]]())
