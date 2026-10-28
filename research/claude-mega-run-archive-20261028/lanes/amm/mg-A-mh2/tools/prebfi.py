# prebfi.py LOG [dump#] : map key call sites in the pre-inline IR dump of execute to the BFI dump frequencies
import re,sys
t=open(sys.argv[1],errors='replace').read().split('\n')
k=int(sys.argv[2]) if len(sys.argv)>2 else 1
s=next(i for i,l in enumerate(t) if 'IR Dump Before InlinerPass' in l)
e=next(i for i in range(s+1,len(t)) if t[i].startswith('block-frequency-info') or 'IR Dump' in t[i])
blocks={};cur='start';order=['start'];blocks[cur]=[]
for l in t[s:e]:
    m=re.match(r'^([\w.$-]+):',l)
    if m: cur=m.group(1);order.append(cur);blocks[cur]=[];continue
    m=re.search(r'call [^@]*@"?([^"(]+)',l)
    if m and 'llvm.' not in m.group(1):
        n=re.sub(r'17h[0-9a-f]{16}E','',m.group(1));seg=re.findall(r'\d+([A-Za-z_$][A-Za-z0-9_$.]*)',n)
        nm=(seg[-2]+'::cl') if len(seg)>1 and 'closure' in seg[-1] else (seg[-1] if seg else n[-20:])
        blocks[cur].append(nm.replace('$GT$','').replace('$LT$','<')[-22:])
dumps=[i for i,l in enumerate(t) if l.startswith('block-frequency-info')]
fr={}
d=[x for x in dumps if x>s][k-1]
vals=[]
for l in t[d+1:d+3000]:
    m=re.match(r' - ([\w.$-]*): float = ([0-9.e+-]+)',l)
    if m: vals.append(float(m.group(2)))
    else: break
if len(vals)==len(order): fr=dict(zip(order,vals))
else: print('count mismatch',len(vals),len(order))
key=re.compile(sys.argv[3] if len(sys.argv)>3 else 'exchange_malloc|BTreeSet|from_iter|clone|cl$|try_accounts|amm_hop|exit|curve_run|is_curve')
for b in order:
    hits=[c for c in blocks[b] if key.search(c)]
    if hits: print(f'{fr.get(b,-1):.4f} {b[:20]:20s} {",".join(hits)[:80]}')
