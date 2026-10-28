# tx_swap.py in.ll out.ll <fn-regex> <substrA> <substrB>: swap two whole lines (first matches) within fn
import sys,re
src,dst,fn,a,b=sys.argv[1:6]
t=open(src).read()
m=re.search(r'^define [^\n]*'+fn+r'[^\n]*$',t,re.M); s=m.start(); e=t.index('\n}\n',s); L=t[s:e].split('\n')
ia=[i for i,l in enumerate(L) if a in l][0]; ib=[i for i,l in enumerate(L) if b in l][0]
L[ia],L[ib]=L[ib],L[ia]
open(dst,'w').write(t[:s]+'\n'.join(L)+t[e:]); print('swapped',ia,ib)
