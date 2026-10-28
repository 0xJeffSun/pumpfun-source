import sys; sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/tools')
import t5, t6, mk
# r3 edits + QuoteCap::early VALUE form (load cap value early, then guard) — tests cap-load vs arith scheduling for o83a
QC_FULL_OLD = 'impl TradeCap for QuoteCap<\'_> { fn early(&self,output:u64)->u64 { let cap=if self.quote_mint==Pubkey::default()||self.quote_mint==anchor_spl::token::spl_token::native_mint::ID{&self.global_params.field_2}else{&self.global_params.field_11}; if *cap!=0 {output.min(*cap)} else {output} } }'
def common():
    return [('instructions/pump_interface_v2.rs', t5.H, t6.lets(t6.O79, h=t5.H)),
            ('state.rs', 'cap:C,tokens:u128,retained:u16)->u64 {', 'cap:C,tokens:u128,retained_bps:u16)->u64 {'),
            ('state.rs', ' output=cap.early(output);let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;',
                         ' output=cap.early(output);let retained=retained_basis_points(retained_bps);let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;'),
            ('state.rs', 'let output=initial_trade_output(vt,c,cap,tokens,retained);', 'let output=initial_trade_output(vt,c,cap,tokens,retained_bps);'),
            ('state.rs', 'let output=initial_trade_output(vt as u128,c,cap,balance as u128,retained);', 'let output=initial_trade_output(vt as u128,c,cap,balance as u128,retained_bps);')]
VAL = 'impl TradeCap for QuoteCap<\'_> { fn early(&self,output:u64)->u64 { let cap=if self.quote_mint==Pubkey::default()||self.quote_mint==anchor_spl::token::spl_token::native_mint::id(){self.global_params.field_2}else{self.global_params.field_11}; if cap!=0 {output.min(cap)} else {output} } }'
def r5(): return mk.mkroot('r5', common() + [('state.rs', QC_FULL_OLD, VAL)], base=t5.BASEROOT)
if __name__ == '__main__': print(globals()[sys.argv[1]]())
