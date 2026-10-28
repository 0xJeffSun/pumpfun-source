#!/usr/bin/env python3
"""blkperm.py <in.ll> <fn-substr> <orig_start> [rounds]: greedy hill-climb over IR basic-block order of one function
(single-block moves), llc each variant, score vs original window. Writes best to <in>.best.ll."""
import sys,re,subprocess,os,tempfile
sys.path.insert(0,os.path.dirname(__file__)); from sc import score_obj
LLC=os.path.expanduser('~/.cache/solana/v1.44/platform-tools/llvm/bin/llc')
src,fn,start=sys.argv[1],sys.argv[2],int(sys.argv[3],16); rounds=int(sys.argv[4]) if len(sys.argv)>4 else 3
s=open(src).read()
m=re.search(r'\ndefine [^\n]*'+re.escape(fn)+r'[^\n]*\{\n',s); st=m.end(); en=s.index('\n}\n',st)
body=s[st:en]
parts=re.split(r'\n(?=[A-Za-z0-9_.$"\-]+:)',body)
entry=parts[0]; blocks=parts[1:]
names=[p.split(':')[0].strip() for p in blocks]
td=tempfile.mkdtemp(dir=os.path.dirname(os.path.abspath(src)))
def build(order):
    txt=s[:st]+'\n'.join([entry]+[blocks[i] for i in order])+s[en:]
    p=os.path.join(td,'v.ll'); open(p,'w').write(txt)
    r=subprocess.run([LLC,'-O3','-march=sbf','-mattr=+store-imm,+jmp-ext','-function-sections','-filetype=obj',p,'-o',p[:-3]+'.o'],capture_output=True,text=True)
    if r.returncode: return (-1,0,False),txt
    res=[x for x in score_obj(p[:-3]+'.o',fn,start)]
    r0=res[0]; return (r0[1],r0[2],r0[4]),txt
cur=list(range(len(blocks))); (best,sz,ex),btxt=build(cur)
print(f'start {best:.4f} {sz}B blocks={len(blocks)}')
for rd in range(rounds):
    improved=False
    for i in range(len(cur)):
        for j in range(len(cur)):
            if i==j: continue
            o=cur[:]; b=o.pop(i); o.insert(j,b)
            (r,z,e),txt=build(o)
            if r>best+1e-9:
                best,sz,ex,cur,btxt=r,z,e,o,txt; improved=True
                print(f'  r{rd} move {names[b]} -> pos {j}: {r:.4f} {z}B {"EXACT" if e else ""}',flush=True)
                if e: break
        if ex: break
    if not improved or ex: break
open(src[:-3]+'.best.ll','w').write(btxt)
print('final',f'{best:.4f}',sz,'EXACT' if ex else '','order:',' '.join(names[i] for i in cur))
