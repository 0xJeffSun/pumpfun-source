# list (line, filename_len) error-location pairs for orig windows in a range, or cand functions matching substr
import sys,re,subprocess,json
from pathlib import Path
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
ORIG=Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so'
def pairs(path,a,z):
    out=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',str(path)],capture_output=True,text=True).stdout
    ins=[re.sub(r'^\s*[0-9a-f]+:\s+','',l).strip() for l in out.splitlines() if re.match(r'\s*[0-9a-f]+:',l)]
    res=[]
    for i,s in enumerate(ins):
        m=re.match(r'stdw \[r10 - (0x[0-9a-f]+)\], (0x[0-9a-f]+)$',s)
        if m and int(m.group(2),16) in (0x2f,0x33,0x24,0x26,0x30,0x31,0x32,0x34,0x35,0x36,0x37,0x38,0x2a,0x2b,0x2c,0x2d,0x2e,0x23,0x25,0x27,0x28,0x29,0x22,0x21,0x20,0x1f,0x1e,0x1d,0x1c):
            off=int(m.group(1),16)
            for t in ins[max(0,i-4):i+4]:
                mm=re.match(r'stw \[r10 - (0x[0-9a-f]+)\], (0x[0-9a-f]+)$',t)
                if mm and int(mm.group(1),16)==off-8:
                    res.append((int(mm.group(2),16),int(m.group(2),16)))
    return res
rows=json.load(open(Path.home()/'amm100-run/shared/frontier/rows.json'))
if sys.argv[1]=='orig':
    lo,hi=int(sys.argv[2],16),int(sys.argv[3],16)
    for r in rows:
        a=int(r['original'],16)
        if lo<=a<hi: print(r['original'],r['bytes'],'M' if r['match'] else '-',pairs(ORIG,a,a+r['bytes']))
if sys.argv[1]=='cand':
    import types
    T=Path.home()/'amm100-run/shared/tools'
    m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
    e=m.Elf(Path(sys.argv[2]))
    for f in sorted(e.funcs,key=lambda f:f['start']):
        if any(s in f['name'] for s in sys.argv[3:]):
            print(hex(f['start']),f['size'],re.sub(r'17h[0-9a-f]{16}E$','',f['name'])[-70:],pairs(sys.argv[2],f['start'],f['start']+f['size']))
