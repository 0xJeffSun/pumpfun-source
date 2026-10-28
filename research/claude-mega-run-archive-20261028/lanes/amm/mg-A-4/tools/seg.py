# seg.py orig ADDR START END [ROWS]  |  seg.py cand SO NAME START END : compact disassembly segment, offsets relative to fn start
import sys,re,types,json,subprocess
from pathlib import Path
sys.path.insert(0,str(Path(__file__).parent))
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
from ev import short
if sys.argv[1]=='orig':
    path=ORIG;e=m.Elf(ORIG);base=int(sys.argv[2],16);a=int(sys.argv[3],16);b=int(sys.argv[4],16)
    R=json.load(open(sys.argv[5] if len(sys.argv)>5 else str(Path(__file__).parent.parent/'out/win02-rows.json')))
    names={int(r['original'],16):(short(r['match']) if r['match'] else f"UNM@{r['original']}") for r in R}
else:
    path=Path(sys.argv[2]);e=m.Elf(path);f=[f for f in e.funcs if sys.argv[3] in f['name'] and 'closure' not in f['name']][0]
    base=f['start'];a=int(sys.argv[4],16);b=int(sys.argv[5],16);names={g['start']:short(g['name']) for g in e.funcs}
out=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={base+a}',f'--stop-address={base+b}',str(path)],capture_output=True,text=True).stdout
res=[]
for l in out.splitlines():
    mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
    if not mm: continue
    at=int(mm.group(1),16);s=re.sub(r'\s+',' ',mm.group(2).strip())
    s=re.sub(r' <\.text\+0x([0-9a-f]+)>',lambda q:f'<{0x120+int(q.group(1),16)-base:x}>',s)
    if s.startswith('call') and at in e.calls:
        t=e.calls[at];s='call '+names.get(t,f'@{t:x}')[:48]
    s=re.sub(r'^(j\w+ .*), [+-]0x[0-9a-f]+(<[0-9a-f-]+>)$',r'\1 \2',s); s=re.sub(r'^ja [+-]0x[0-9a-f]+(<[0-9a-f-]+>)$',r'ja \1',s)
    res.append(f'{at-base:x}:{s}')
print(' | '.join(res))
