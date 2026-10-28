# irreorder.py IN.ll FUNCSUB BLOCK OUT.ll ORDER : reorder the non-terminator instructions of BLOCK by ORDER
# ORDER = comma list of 1-based instruction indices (within block body, excluding label line); omitted ones keep relative order after
import sys,re
lines=open(sys.argv[1]).read().split('\n')
s=next(i for i,l in enumerate(lines) if l.startswith('define ') and sys.argv[2] in l)
e=next(i for i in range(s,len(lines)) if lines[i]=='}')
b=next(i for i in range(s,e) if lines[i].startswith(sys.argv[3]+':'))
z=next(i for i in range(b+1,e) if lines[i]=='' or re.match(r'^\S',lines[i]))
body=[l for l in lines[b+1:z]]
ins=[l for l in body]
if len(sys.argv)<6:
    for k,l in enumerate(ins,1): print(k,l.strip()[:110])
    sys.exit()
order=[int(x) for x in sys.argv[5].split(',')]
new=[ins[k-1] for k in order]+[l for k,l in enumerate(ins,1) if k not in order]
lines[b+1:z]=new
ren=lambda l: re.sub(r'^(\d+):',r'v\1:',re.sub(r'%(\d+)\b',r'%v\1',l))
for i in range(s,e+1): lines[i]=ren(lines[i])
open(sys.argv[4],'w').write('\n'.join(lines)); print('ok')
