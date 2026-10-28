# irmove.py IN.ll OUT.ll FUNCSUB 'regex-of-lines-to-move' 'regex-anchor' [after|before]
# moves all matching lines (in order) of function FUNCSUB to just before/after the first line matching anchor
import sys,re
src,out,fs,pat,anc=sys.argv[1:6];mode=sys.argv[6] if len(sys.argv)>6 else 'before'
L=open(src).read().split('\n')
s=next(i for i,l in enumerate(L) if l.startswith('define') and fs in l)
e=next(i for i in range(s,len(L)) if L[i]=='}')
body=L[s:e+1]
mv=[l for l in body if re.search(pat,l)]
rest=[l for l in body if not re.search(pat,l)]
k=next(i for i,l in enumerate(rest) if re.search(anc,l))
if mode=='after':k+=1
nb=rest[:k]+mv+rest[k:]
L[s:e+1]=nb
open(out,'w').write('\n'.join(L))
print('moved',len(mv),'lines')
