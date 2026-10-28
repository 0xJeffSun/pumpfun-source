import sys
B='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build'
sys.path.insert(0,B)
import sbfdis, objsec
# usage: dumpc.py SO|BIN pattern out.txt
p=sys.argv[1]; pat=sys.argv[2]; out=sys.argv[3]
if p.endswith('.so'):
    C=sbfdis.elf(p); f=sbfdis.funcs(C)
    c=[(a,b,n) for a,(b,n) in f.items() if pat in n]; assert len(c)==1,[x[2] for x in c]
    a,b,n=c[0]; L=[(x['pc']-a,x['text']) for x in sbfdis.window_insns(C,a,b)]
else:
    code=open(p,'rb').read(); L=[(pc,sbfdis.decode(code,None,pc,pc+len(r),None,None)[0]['text']) for pc,r in objsec.insns(code)]
with open(out,'w') as f:
    for pc,t in L: f.write(f'{pc:6d}  {t}\n')
print(len(L))
