import sys; sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/tools')
import t5, t4
BASEROOT = t5.BASEROOT; H = t5.H
V = []; app = ''
def add(label, h, body, attr=''):
    global app
    k = len(V); app += t5.cap_type(k, body, attr); V.append((label, t5.use_type(h, k), None))
add('calib-e0', H, t5.EARLY['e0'])
HQ = t5.arms(H, t5.QF)
add('QF-e0', HQ, t5.EARLY['e0'])
for e in ['e1-not', 'e2-neand', 'e3-match', 'e4-matchf', 'e5-bool', 'e6-val', 'e7-assign', 'e8-eq0', 'e9-gp', 'e11-qm', 'e12-id', 'e13-gt0', 'e14-matchcap']:
    add('QF-' + e, HQ, t5.EARLY[e])
add('QF-e0-inline', HQ, t5.EARLY['e0'], '#[inline] ')
add('QF-e3-inline', HQ, t5.EARLY['e3-match'], '#[inline] ')
HQK = t5.rep(t5.rep(HQ, 'let quote_mint=a.quote_mint.key();let (input', 'let (input'), 'quote_mint},a.mayhem', 'quote_mint:a.quote_mint.key()},a.mayhem')
HQK = t5.rep(HQK, 'let native=quote_mint==WSOL;', 'let native=a.quote_mint.key()==WSOL;')
add('QF-inlinekey-e0', HQK, t5.EARLY['e0'])
HQP = t5.rep(HQ, t5.PRICE_W, t4.PRICE['h4-lowmatch'])
add('QF-h4lowmatch-e0', HQP, t5.EARLY['e0'])
add('QF-allmatch-e0', t5.rep(HQ, t5.PRICE_W, t4.PRICE['allmatch']), t5.EARLY['e0'])
add('QF-h4price-e0', t5.rep(HQ, t5.PRICE_W, t4.PRICE['h4']), t5.EARLY['e0'])
add('QF-fieldorder-e0', t5.rep(HQ, 'global_params:&a.global_params,quote_mint}', 'quote_mint,global_params:&a.global_params}'), t5.EARLY['e0'])
APPEND = [('state.rs', app)]
VARIANTS = V
