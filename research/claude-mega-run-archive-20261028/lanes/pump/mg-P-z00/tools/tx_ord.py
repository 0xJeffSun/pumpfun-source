# tx_ord.py in.ll out.ll <fn-regex> <alloca,alloca,...>  : reorder entry-block allocas to the given order (others keep relative order after)
import sys,re
src,dst,fn,order=sys.argv[1:5]; order=order.split(',')
t=open(src).read()
m=re.search(r'^define [^\n]*'+fn+r'[^\n]*$',t,re.M); s=m.start(); e=t.index('\n}\n',s); f=t[s:e]
L=f.split('\n')
idx=[i for i,l in enumerate(L) if re.match(r'\s+%\S+ = alloca ',l)]
al={re.match(r'\s+(%\S+) = alloca',L[i]).group(1):L[i] for i in idx}
names=[re.match(r'\s+(%\S+) = alloca',L[i]).group(1) for i in idx]
new=[n for n in order if n in al]+[n for n in names if n not in order]
for i,n in zip(idx,new): L[i]=al[n]
open(dst,'w').write(t[:s]+'\n'.join(L)+t[e:]); print('order',' '.join(new))
