# irfn.py IN.ll SYMSUBSTR [OUT] : extract one function definition from IR
import sys,re
t=open(sys.argv[1]).read().split('\n')
out=[];on=False
for l in t:
    if l.startswith('define ') and sys.argv[2] in l: on=True
    if on: out.append(l)
    if on and l=='}': break
s='\n'.join(out)
if len(sys.argv)>3: open(sys.argv[3],'w').write(s)
print(len(out),'lines;', len(re.findall(r'^\w[\w.]*:',s,re.M)),'blocks;', s.count(' call '),'calls')
