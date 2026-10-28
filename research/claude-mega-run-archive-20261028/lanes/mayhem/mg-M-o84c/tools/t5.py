"""Transforms on the w438 handler (w22 = trait TradeCap early/late; QuoteCap early non-AI)."""
import sys
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
import t4
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c'
def handler_of(root):
    s = open(root + '/programs/mayhem/src/instructions/pump_interface_v2.rs').read()
    st = s.index('pub fn sell_v2_handler('); en = s.index('\n}\n', st) + 3
    return s[st:en]
BASEROOT = L + '/roots/w439'
H = handler_of(BASEROOT)
def rep(s, old, new):
    assert old in s, ('MISSING', old[:120]); return s.replace(old, new, 1)
NAMES = t4.NAMES; QF = NAMES[6:] + NAMES[:6]
def arms(s, order=NAMES, nat=('vb', 'gd', 'sd', 'rr', 'vr'), els=('gd', 'vb', 'sd', 'rr', 'vr')):
    return rep(s, t4.TUP_OLD, t4.tup(order, nat, els))
PRICE_W = H[H.index(' let price_check:'):H.index('price_check?;') + len('price_check?;')]
CALL = 'crate::state::QuoteCap{global_params:&a.global_params,quote_mint}'
assert CALL in H
NA = 'self.quote_mint==Pubkey::default()||self.quote_mint==anchor_spl::token::spl_token::native_mint::ID'
F2, F11 = '&self.global_params.field_2', '&self.global_params.field_11'
APPLY = 'if *cap!=0 {output.min(*cap)} else {output}'
EARLY = {
 'e0': f'let cap=if {NA}{{{F2}}}else{{{F11}}}; {APPLY}',
 'e1-not': f'let cap=if !({NA}){{{F11}}}else{{{F2}}}; {APPLY}',
 'e2-neand': f'let cap=if self.quote_mint!=Pubkey::default()&&self.quote_mint!=anchor_spl::token::spl_token::native_mint::ID{{{F11}}}else{{{F2}}}; {APPLY}',
 'e3-match': f'let cap=match {NA} {{true=>{F2},false=>{F11}}}; {APPLY}',
 'e4-matchf': f'let cap=match {NA} {{false=>{F11},true=>{F2}}}; {APPLY}',
 'e5-bool': f'let na={NA}; let cap=if na{{{F2}}}else{{{F11}}}; {APPLY}',
 'e6-val': f'let cap=if {NA}{{self.global_params.field_2}}else{{self.global_params.field_11}}; if cap!=0 {{output.min(cap)}} else {{output}}',
 'e7-assign': f'let cap=if {NA}{{{F2}}}else{{{F11}}}; let mut output=output; if *cap!=0 {{output=output.min(*cap);}} output',
 'e8-eq0': f'let cap=if {NA}{{{F2}}}else{{{F11}}}; if *cap==0 {{output}} else {{output.min(*cap)}}',
 'e9-gp': f'let gp=self.global_params; let cap=if {NA}{{&gp.field_2}}else{{&gp.field_11}}; {APPLY}',
 'e11-qm': 'let quote_mint=self.quote_mint; let cap=if quote_mint==Pubkey::default()||quote_mint==anchor_spl::token::spl_token::native_mint::ID{&self.global_params.field_2}else{&self.global_params.field_11}; ' + APPLY,
 'e12-id': f'let cap=if {NA.replace("native_mint::ID", "native_mint::id()")}{{{F2}}}else{{{F11}}}; {APPLY}',
 'e13-gt0': f'let cap=if {NA}{{{F2}}}else{{{F11}}}; if *cap>0 {{output.min(*cap)}} else {{output}}',
 'e14-matchcap': f'let cap=if {NA}{{{F2}}}else{{{F11}}}; match *cap {{0=>output,cap=>output.min(cap)}}',
}
def cap_type(k, body, attr=''):
    return (f'\npub struct QuoteCapV{k}<\'a>{{pub global_params:&\'a GlobalParams,pub quote_mint:Pubkey}}\n'
            f'impl TradeCap for QuoteCapV{k}<\'_> {{ {attr}fn early(&self,output:u64)->u64 {{ {body} }} }}\n')
def use_type(s, k):
    return rep(s, 'crate::state::QuoteCap{', f'crate::state::QuoteCapV{k}{{')
