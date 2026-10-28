import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/exps')
from vlit import HDR, LETS, OLD, BASEROOT
def build(order):
    assert order.index(0)<order.index(7)
    new=" "+"".join(LETS[k] for k in order)
    return HDR.replace(OLD,new)
VARIANTS=[('base', build(list(range(11))), None)]
# move the (quote_vault_balance=0, sol_vault_balance=7) pair as a unit to different insertion points
rest=[1,2,3,4,5,6,8,9,10]
for pos in range(len(rest)+1):
    o=rest[:pos]+[0,7]+rest[pos:]
    VARIANTS.append((f'qvb@{pos}', build(o), None))
# with swap4-5 baked in (global_quote_deployed before real_quote) + qvb pair late
rest2=[1,2,3,5,4,6,8,9,10]
for pos in [6,7,8,9]:
    o=rest2[:pos]+[0,7]+rest2[pos:]
    VARIANTS.append((f's45_qvb@{pos}', build(o), None))
