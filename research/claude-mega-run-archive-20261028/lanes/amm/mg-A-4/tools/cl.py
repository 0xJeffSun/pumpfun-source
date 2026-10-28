import sys,subprocess,re,types,json
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
def sig(path,a,z):
    out=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',str(path)],capture_output=True,text=True).stdout
    code=line=ln=None
    for l in out.splitlines():
        mm=re.search(r'stw \[r10 - 0x78\], (0x[0-9a-f]+)',l)
        if mm: code=int(mm.group(1),16)
        mm=re.search(r'stw \[r10 - 0xf8\], (0x[0-9a-f]+)',l)
        if mm: line=int(mm.group(1),16)
        mm=re.search(r'stdw \[r10 - 0x100\], (0x[0-9a-f]+)',l)
        if mm: ln=int(mm.group(1),16)
    return (code,line,ln)
o=m.Elf(ORIG)
rows={int(r['original'],16):r for r in json.load(open(Path.home()/'amm100-run/shared/frontier/rows.json'))}
ent=sorted(o.entries+[o.hi])
osig={}
for i,a in enumerate(ent[:-1]):
    if ent[i+1]-a==520: osig[sig(ORIG,a,ent[i+1])]=a
c=m.Elf(Path(sys.argv[1]));csig={}
for f in c.funcs:
    if f['size']==520: csig.setdefault(sig(sys.argv[1],f['start'],f['start']+520),[]).append(f['name'].split('17h')[0][-50:])
for s,a in sorted(osig.items(),key=lambda x:(x[0][2] or 0,x[0][1] or 0)):
    print(hex(a), s, 'MATCH' if s in csig else '----', rows[a]['match'] is not None)
print('cand-only:')
for s,n in sorted(csig.items(),key=lambda x:(x[0][2] or 0,x[0][1] or 0)):
    if s not in osig: print(s,n)
