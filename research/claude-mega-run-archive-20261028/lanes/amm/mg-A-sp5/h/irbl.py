# irbl.py IN.ll FUNCSUB [-v]: list IR blocks (name, #insts, terminator) of the function
import re,sys
t=open(sys.argv[1]).read();sub=sys.argv[2]
m=[mm for mm in re.finditer(r'^define [^\n]*',t,re.M) if sub in mm.group(0)][0]
i=m.start();j=t.index('\n}\n',i);f=t[i:j]
for b in re.split(r'\n(?=[\w.$-]+:)',f):
    ls=[l for l in b.split('\n') if l.strip()]
    name='ENTRY' if ls[0].startswith('define') else ls[0].split(':')[0]
    term=re.sub(r', !prof.*|, !llvm.loop.*','',ls[-1].strip())
    if '-v' in sys.argv:
        print(f'--{name}');[print('   ',l.strip()[:120]) for l in ls[1:]]
    else: print(f'{name:<14} n={len(ls)-1:<3} {term[:120]}')
