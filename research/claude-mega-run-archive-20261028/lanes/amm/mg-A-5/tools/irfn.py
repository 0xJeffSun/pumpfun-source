# irfn.py IN.ll SYMSUB OUT : extract one function definition from crate IR
import sys
s=open(sys.argv[1]).read().split('\n'); out=[];on=False
for l in s:
    if l.startswith('define ') and sys.argv[2] in l: on=True
    if on: out.append(l)
    if on and l=='}': break
open(sys.argv[3],'w').write('\n'.join(out)+'\n'); print(len(out),'lines')
