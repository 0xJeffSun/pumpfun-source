# plocs.py orig ADDR | cand SO SYMSUB : panic Location (file,line,col) referenced by lddw in a window
import types,pathlib,struct,sys,subprocess,re
T=pathlib.Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
OBJ=str(pathlib.Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
ORIG=pathlib.Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
if sys.argv[1]=='orig':
    path=ORIG;e=m.Elf(path);a=int(sys.argv[2],16);z=next(x for x in e.entries+[e.hi] if x>a)
else:
    path=pathlib.Path(sys.argv[2]);e=m.Elf(path);f=[f for f in e.funcs if sys.argv[3] in f['name']][0];a=f['start'];z=a+f['size']
b=e.b
out=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',str(path)],capture_output=True,text=True).stdout
res=[]
import json
rows=json.load(open(pathlib.Path.home()/'amm100-run/lanes/mg-A-7/out/rows.json'))
names={int(r['original'],16):(r['match'] or '?').split('17h')[0][-28:] for r in rows}
if sys.argv[1]!='orig': names={f['start']:f['name'].split('17h')[0][-28:] for f in e.funcs}
LS=out.splitlines()
def nextcall(k):
    for l2 in LS[k:k+12]:
        m2=re.match(r'\s*([0-9a-f]+):\s+call',l2)
        if m2:
            at=int(m2.group(1),16);t=e.calls.get(at)
            return names.get(t,'?') if t else '?'
    return '-'
for k,l in enumerate(LS):
    mm=re.search(r'lddw r\d+, (0x[0-9a-f]+)',l)
    if not mm: continue
    t=int(mm.group(1),16)
    if t+24>len(b): continue
    q,ln,line,col=struct.unpack_from('<QQII',b,t)
    for ptr in (q&0xffffffff,q>>32):
        if 0<ptr<len(b) and 0<ln<200:
            s=b[ptr:ptr+ln]
            if s.endswith(b'.rs') and 0<line<5000:
                res.append(f'{s.decode().split("/")[-1]}:{line}:{col}<{nextcall(k)}>');break
print('\n'.join(res))
