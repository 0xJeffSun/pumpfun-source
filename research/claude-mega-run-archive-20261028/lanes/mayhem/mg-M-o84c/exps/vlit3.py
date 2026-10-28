import re
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c'
BASEROOT=L+'/roots/c4'
HDR=open(L+'/tools/handler_c4.txt').read()
m=re.search(r'(let event=SellEvent\{)(.*?)(\};)',HDR)
PRE,FIELDS,POST=m.group(1),m.group(2),m.group(3)
# split top-level fields (no nested braces here)
parts=[p for p in FIELDS.split(',')]
# fields are 'name' or 'name:expr'; some exprs contain '(' but no ',' except none. Safe split on comma.
def name(p): return p.split(':')[0]
names=[name(p) for p in parts]
idx={n:i for i,n in enumerate(names)}
def build(order):
    f=','.join(parts[k] for k in order)
    return HDR.replace(PRE+FIELDS+POST, PRE+f+POST)
base=list(range(len(parts)))
VARIANTS=[('base', build(base), None)]
# native-only (else 0) fields:
nat=['sol_amount','sol_vault_balance','state_sol_deployed','virtual_sol','global_sol_deployed','real_sol']
# adjacent swaps across the whole literal (shift store order locally)
for i in range(len(parts)-1):
    o=base[:]; o[i],o[i+1]=o[i+1],o[i]
    VARIANTS.append((f'sw{i}:{names[i]}~{names[i+1]}', build(o), None))
