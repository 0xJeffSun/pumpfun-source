# lc.py DUMP.txt : per loop dump, count blocks and instructions (non-phi), and list invariant-cond branches
import sys,re
t=open(sys.argv[1]).read().split('; *** IR Dump')
for k,d in enumerate(t[1:]):
    hdr=d.split('\n')[0]
    blocks=re.findall(r'^([\w.$-]+):',d,re.M)
    ins=[l.strip() for l in d.split('\n')[1:] if l.startswith('  ') and l.strip() and not l.strip().startswith(';')]
    nphi=sum(1 for l in ins if ' = phi ' in l)
    free=sum(1 for l in ins if re.search(r'= (zext|sext|trunc|bitcast|getelementptr)|llvm\.(lifetime|assume|dbg)',l))
    print(k,hdr[:50],'blocks',len(blocks),'ins',len(ins),'phi',nphi,'freeish',free,'cost~',len(ins)-nphi-free)
