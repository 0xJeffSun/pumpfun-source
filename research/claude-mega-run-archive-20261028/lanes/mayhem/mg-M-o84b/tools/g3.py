import sys; sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/tools')
import t5, t6, mk
QC_OLD = 'self.quote_mint==anchor_spl::token::spl_token::native_mint::ID{'
QC_ID = 'self.quote_mint==anchor_spl::token::spl_token::native_mint::id(){'
def build(name, order):
    h = t6.lets(order, h=t5.H)
    assert h is not None
    return mk.mkroot(name, [('instructions/pump_interface_v2.rs', t5.H, h), ('state.rs', QC_OLD, QC_ID)], base=t5.BASEROOT)
def r2(): return build('r2', t6.O79)
if __name__ == '__main__':
    print(globals()[sys.argv[1]]())
