# mirfn.py IN.mir FNPREFIX OUT : extract one fn body (first line starting with 'fn FNPREFIX(')
import sys
t=open(sys.argv[1]).read().split('\n')
k=next(i for i,l in enumerate(t) if l.startswith('fn '+sys.argv[2]+'('))
e=next(i for i in range(k,len(t)) if t[i]=='}')
open(sys.argv[3],'w').write('\n'.join(t[k:e+1])+'\n')
