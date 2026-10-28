# irfn.py IN.ll NAMESUB [OUT] : print (or save) the define ... } body of the first function whose name contains NAMESUB
import sys,re
s=open(sys.argv[1]).read().split('\n')
out=[];on=False
for l in s:
    if not on and l.startswith('define ') and sys.argv[2] in l: on=True
    if on:
        out.append(l)
        if l=='}': break
t='\n'.join(out)
if len(sys.argv)>3: open(sys.argv[3],'w').write(t+'\n')
else: print(t)
