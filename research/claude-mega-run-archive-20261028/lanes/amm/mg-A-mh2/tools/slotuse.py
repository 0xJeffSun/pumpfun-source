# slotuse.py orig ADDR | cand SO NAME ; [LO HI] : per stack slot in [LO,HI) list accessing insns (fn offset: insn)
import sys,re,collections,subprocess,types
from pathlib import Path
import importlib.util
spec=importlib.util.spec_from_file_location('oc','/Users/shawwalters/amm100-run/lanes/mg-A-mh2/tools/ocmp.py');oc=importlib.util.module_from_spec(spec);spec.loader.exec_module(oc)
BIN=oc.BIN
if sys.argv[1]=='orig':
    o=oc.m.Elf(oc.ORIG);a=int(sys.argv[2],16);z=next(x for x in sorted(o.entries+[o.hi]) if x>a);path=str(oc.ORIG);rest=sys.argv[3:]
else:
    c=oc.m.Elf(Path(sys.argv[2]));f=[f for f in c.funcs if sys.argv[3] in f['name'] and 'closure' not in f['name']][0];a=f['start'];z=a+f['size'];path=sys.argv[2];rest=sys.argv[4:]
lo,hi=int(rest[0],16),int(rest[1],16)
out=subprocess.run([str(BIN/'llvm-objdump'),'-d','--no-show-raw-insn',f'--start-address={a}',f'--stop-address={z}',path],capture_output=True,text=True).stdout
U=collections.defaultdict(list);prev=''
for l in out.splitlines():
    mm=re.match(r'\s*([0-9a-f]+):\s+(.*)',l)
    if not mm: continue
    at=int(mm.group(1),16)-a;s=re.sub(r'\s+',' ',mm.group(2).strip());s=re.sub(r' <[^>]*>','',s)
    for x in re.findall(r'\[r10 - (0x[0-9a-f]+)\]',s): U[int(x,16)].append(f'{at:x}:{s}')
    m2=re.match(r'add64 (r\d+), -(0x[0-9a-f]+)$',s)
    if m2 and prev.startswith(f'mov64 {m2.group(1)}, r10'): U[int(m2.group(2),16)].append(f'{at:x}:&')
    prev=s
for k in sorted(U):
    if lo<=k<hi: print(f'-{k:x} n{len(U[k])}: '+' ; '.join(U[k][:6]))
