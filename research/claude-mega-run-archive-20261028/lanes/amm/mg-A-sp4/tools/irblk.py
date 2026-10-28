# irblk.py IN.ll OUT.ll FUNCSUB FROM_LABEL TO_LABEL BEFORE_LABEL : move blocks [FROM_LABEL .. block before TO_LABEL) to just before BEFORE_LABEL
import sys,re
src,out,fs,a,b,c=sys.argv[1:7]
L=open(src).read().split('\n')
s=next(i for i,l in enumerate(L) if l.startswith('define') and fs in l)
e=next(i for i in range(s,len(L)) if L[i]=='}')
def lab(x): return next(i for i in range(s,e) if re.match(re.escape(x)+r':(\s|$)',L[i]))
ia,ib,ic=lab(a),lab(b),lab(c)
blk=L[ia:ib]; rest=L[:ia]+L[ib:]
ic=next(i for i in range(s,len(rest)) if re.match(re.escape(c)+r':(\s|$)',rest[i]))
L=rest[:ic]+blk+rest[ic:]
open(out,'w').write('\n'.join(L)); print('moved',len(blk),'lines')
