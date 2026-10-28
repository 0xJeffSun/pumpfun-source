# Literal-order adjacent-swap sweep from h4's order (r3's better order). r3 mechanism; QuoteCap early only (legacy safe).
import sys; sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b/tools')
import t5, t6, re
BASEROOT = t5.BASEROOT
HB = t6.lets(t6.O79, h=t5.H)
i = HB.index('SellEvent{'); j = HB.index('}', i)
H4LIT = [p.split(':')[0].strip() for p in re.split(r',(?![^(]*\))', HB[i+len('SellEvent{'):j]) if p.strip()]
E = t6.E['e0']
V = []; app = ''
def add(label, order):
    global app
    try: h = t6.relit(HB, order)
    except AssertionError: return
    k = len(V); app += t5.cap_type(k, E); V.append((label, t5.use_type(h, k), None))
add('h4lit', H4LIT)
for i in range(1, len(H4LIT) - 1):
    o = H4LIT[:]; o[i], o[i + 1] = o[i + 1], o[i]; add(f'sw{i}:{H4LIT[i]}/{H4LIT[i+1]}', o)
APPEND = [('state.rs', app)]
VARIANTS = V
