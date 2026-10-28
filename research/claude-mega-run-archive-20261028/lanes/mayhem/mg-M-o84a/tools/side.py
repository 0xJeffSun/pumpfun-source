import sys,re
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build')
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/o0084-port-r1/tools')
import irx, objsec, sbfdis
def L(code): return [(pc, sbfdis.decode(code,None,pc,pc+len(raw),None,None)[0]['text']) for pc,raw in objsec.insns(code)]
o=L(irx.O.b[irx.W[1]:irx.W[2]]); c=L(irx.elf_code(sys.argv[1]) if not sys.argv[1].endswith('.o') else __import__('objsec').sections(sys.argv[1])[[k for k in objsec.sections(sys.argv[1]) if 'sell_v2_handler' in k and k.startswith('.text')][0]])
olo,ohi,clo,chi=map(int,sys.argv[2:6])
a=[t for pc,t in o if olo<=pc<ohi]; b=[t for pc,t in c if clo<=pc<chi]
ap=[pc for pc,t in o if olo<=pc<ohi]; bp=[pc for pc,t in c if clo<=pc<chi]
for i in range(max(len(a),len(b))):
    x=f'{ap[i]:6d} {a[i]}' if i<len(a) else ''
    y=f'{bp[i]:6d} {b[i]}' if i<len(b) else ''
    print(f'{x:42s} | {y}')
