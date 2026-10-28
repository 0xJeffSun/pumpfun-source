# irdenum.py IN.ll OUT.ll FUNCSUB : rename numbered values/labels %N -> %vN inside the function (so blocks/instrs can be moved)
import sys,re
src,out,fs=sys.argv[1:4]
L=open(src).read().split('\n')
s=next(i for i,l in enumerate(L) if l.startswith('define') and fs in l)
e=next(i for i in range(s,len(L)) if L[i]=='}')
r=re.compile(r'%(\d+)(?![\w.])')
for i in range(s,e+1):
    l=L[i]
    if i>s: l=r.sub(r'%v\1',l); l=re.sub(r'^(\d+):',r'v\1:',l)
    L[i]=l
open(out,'w').write('\n'.join(L))
