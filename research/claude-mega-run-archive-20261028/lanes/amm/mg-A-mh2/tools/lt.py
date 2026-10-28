# lt.py LL FUNCSUB names... : lifetime marker count per alloca name in the function
import sys,re
L=open(sys.argv[1]).read().split('\n');sub=sys.argv[2]
s=next(i for i,l in enumerate(L) if l.startswith('define') and sub in l);e=next(i for i in range(s,len(L)) if L[i]=='}')
body='\n'.join(L[s:e]);out=[]
for n in sys.argv[3:]:
    a=len(re.findall(r'%'+re.escape(n)+r' = alloca',body));c=len(re.findall(r'lifetime\.\w+\.p0\(i64 \d+, ptr (?:nonnull )?%'+re.escape(n)+r'\)',body))
    out.append(f'{n}:{"A" if a else "-"}{c}')
print(' '.join(out))
