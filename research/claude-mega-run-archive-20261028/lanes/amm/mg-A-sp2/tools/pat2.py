#!/usr/bin/env python3
"""pat2.py SO|orig : count 'cond/uncond branch -> [ldxdw rA,[r10-X]; ja]' blocks per window/function"""
import sys,re,subprocess,json,types
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
OBJ=str(Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')
orig=sys.argv[1]=='orig'
so=str(Path.home()/'Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_amm/deployed.so') if orig else sys.argv[1]
out=subprocess.run([OBJ,'-d','--no-show-raw-insn',so],capture_output=True,text=True).stdout
ins={}
for l in out.splitlines():
    mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
    if mm: ins[int(mm.group(1),16)]=re.sub(r'\s+',' ',re.sub(r' *<[^>]*>','',mm.group(2)).strip())
if orig:
    rows=json.load(open('/Users/shawwalters/amm100-run/lanes/mg-A-sp2/base/base-rows.json'))
    spans=sorted((int(r['original'],16),r['bytes'],(r['match'] or 'UNMATCHED')) for r in rows)
else:
    e=m.Elf(Path(so)); spans=sorted((f['start'],f['size'],f['name']) for f in e.funcs)
import bisect
starts=[s[0] for s in spans]
def win(at):
    k=bisect.bisect_right(starts,at)-1
    return spans[k] if k>=0 and at<spans[k][0]+spans[k][1] else (None,0,None)
cnt={}
for at,i in ins.items():
    mm=re.match(r'(ja|j\w+ r\d+, (?:r\d+|0x[0-9a-f]+|\d+),) ([+-]0x[0-9a-f]+|[+-]\d+)$',i)
    if not mm: continue
    t=at+8+int(mm.group(2),0)*8
    if re.match(r'ldxdw r\d, \[r10 - 0x[0-9a-f]+\]$',ins.get(t,'')) and ins.get(t+8,'').startswith('ja '):
        a,b,n=win(at); cnt[(a,n)]=cnt.get((a,n),0)+1
for (a,n),c in sorted(cnt.items(),key=lambda x:-x[1])[:int(sys.argv[2]) if len(sys.argv)>2 else 40]: print(c,hex(a) if a else a,(n or '?')[:110])
