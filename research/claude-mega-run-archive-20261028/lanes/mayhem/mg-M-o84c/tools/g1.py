import sys; sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
import t4, mk
NA = 'quote_mint==Pubkey::default()||quote_mint==anchor_spl::token::spl_token::native_mint::id()'
OLD = (' let cap=if ' + NA + '{&global_params.field_2}else{&global_params.field_11}; let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n'
       ' if *cap!=0 {output=output.min(*cap);}\n output.min(max)\n')
CAPFIRST_MATCH = (' let cap=match ' + NA + ' {true=>&global_params.field_2,false=>&global_params.field_11};\n'
                  ' if *cap!=0 {output=output.min(*cap);} let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;\n output.min(max)\n')
QF = t4.NAMES[6:] + t4.NAMES[:6]
def v15():
    h = t4.arms(t4.price(t4.H, 'h4-lowmatch'), QF)
    return mk.mkroot('v15', [('instructions/pump_interface_v2.rs', t4.H, h), ('state.rs', OLD, CAPFIRST_MATCH)])
if __name__ == '__main__':
    print(globals()[sys.argv[1]]())
