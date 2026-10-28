# irren.py IN.ll OUT.ll FUNCSUB OLD NEW : rename value %OLD -> %NEW inside function (e.g. numbered temps before moving)
import sys,re
src,out,fs,old,new=sys.argv[1:6]
L=open(src).read().split('\n')
s=next(i for i,l in enumerate(L) if l.startswith('define') and fs in l)
e=next(i for i in range(s,len(L)) if L[i]=='}')
r=re.compile(r'%'+re.escape(old)+r'(?![\w.])')
for i in range(s,e+1): L[i]=r.sub('%'+new,L[i])
open(out,'w').write('\n'.join(L))
