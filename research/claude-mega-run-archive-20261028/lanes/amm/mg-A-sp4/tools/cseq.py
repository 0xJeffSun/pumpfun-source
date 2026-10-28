# cseq.py SO ADDR CAND_SUBSTR : side-by-side call sequence orig window vs cand fn (orig names via SO's rows.json matches)
import sys,types,json,re,difflib
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
so=Path(sys.argv[1]);rows=json.load(open(so.parent/'rows.json'))
def short(n):
    n=n.split('17h')[0]
    n=re.sub(r'\$LT\$|\$GT\$|\$u20\$|\$C\$|\$RF\$|\.\.','_',n)
    return n[-46:]
on={int(r['original'],16):short(r['match']) for r in rows if r.get('match')}
o=m.Elf(ORIG);a=int(sys.argv[2],16);z=next(x for x in o.entries+[o.hi] if x>a)
A=[(at-a,on.get(t,hex(t))) for at,t in sorted(o.calls.items()) if a<=at<z]
e=m.Elf(so);f=[f for f in e.funcs if sys.argv[3] in f['name']][0];b=f['start'];zz=b+f['size']
cn={g['start']:short(g['name']) for g in e.funcs}
B=[(at-b,cn.get(t,hex(t))) for at,t in sorted(e.calls.items()) if b<=at<zz]
sm=difflib.SequenceMatcher(None,[x for _,x in A],[x for _,x in B],autojunk=False)
for t,i1,i2,j1,j2 in sm.get_opcodes():
    for k in range(max(i2-i1,j2-j1)):
        l=A[i1+k] if i1+k<i2 else None; r=B[j1+k] if j1+k<j2 else None
        mark=' ' if t=='equal' else '*'
        print(mark, f"{l[0]:5x} {l[1]:46s}" if l else ' '*52, '|', f"{r[0]:5x} {r[1]}" if r else '')
