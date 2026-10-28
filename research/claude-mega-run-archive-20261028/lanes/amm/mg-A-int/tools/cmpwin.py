"""cmpwin.py PATTERN [rowsA rowsB ...] : windows whose matched symbol (any tree) contains PATTERN; per-tree status."""
import json,subprocess,sys
from pathlib import Path
L=Path.home()/'amm100-run/lanes'
pat=sys.argv[1]
trees=[a for a in sys.argv[2:] if a!='-a'] or [str(L/'mg-base733/out/rows.json'),str(L/'collect-C/out/rows.json')]
R=[{r['original']:r for r in json.load(open(t))} for t in trees]
def dm(s):
    if not s: return '-'
    d=subprocess.run(['c++filt','-n'],input=s,capture_output=True,text=True).stdout.strip()
    for a,b in [('pump_amm_recovered::',''),('instructions::',''),('$u7b$$u7b$closure$u7d$$u7d$','{cl}')]: d=d.replace(a,b)
    return d[:70]
ws=sorted({w for r in R for w in r if pat in (r[w]['match'] or '')},key=lambda x:int(x,16))
for w in ws:
    st=['Y' if r[w]['match'] else '.' for r in R]
    name=next(dm(r[w]['match']) for r in R if r[w]['match'])
    if len(set(st))>1 or '-a' in sys.argv: print(w,R[0][w]['bytes'],''.join(st),name)
print('total',len(ws),'differing',sum(1 for w in ws if len({bool(r[w]['match']) for r in R})>1))
