#!/usr/bin/env python3
"""ocallseq.py <orig_start> <obj.o> <symregex> [-v]: call-sequence diff orig vs a function in a relocatable object (names from relocs)."""
import sys,re,subprocess,difflib,json,bisect,struct
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from win import demangle
from score import original_windows
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
st=int(sys.argv[1],16); so=sys.argv[2]; rx=sys.argv[3]; verbose='-v' in sys.argv
inv=json.load(open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L24/inventory.json'))['windows']
ks=sorted(int(x) for x in inv)
def oname(t):
    k=ks[bisect.bisect_right(ks,t)-1]; v=inv[str(k)]
    n=demangle(v['symbols'][0]) if v['symbols'] else hex(k)
    return re.sub(r'::h[0-9a-f]{16}$','',n) if k==t else f'{hex(k)}+{t-k:#x}'
ALIAS={'0x3cd50':'prepare_bonding_curve','0x14910':'admit_associated_token_account'}
w=next(x for x in original_windows() if x['start']==st); raw=w['raw']
oc=[];i=0
while i<len(raw):
    op=raw[i]
    if op==0x85:
        imm=struct.unpack_from('<i',raw,i+4)[0]
        n='syscall' if imm==-1 else oname(st+i+8+imm*8); oc.append(ALIAS.get(n,n))
    if op==0x95: oc.append('EXIT')
    i+=16 if op==0x18 else 8
t=subprocess.check_output([OD,'-t',so],text=True); sec=None
for line in t.splitlines():
    m=re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
    if m and re.search(rx,m.group(4)): sec=m.group(2); off=int(m.group(1),16); size=int(m.group(3),16)
d=subprocess.check_output([OD,'-dr','--no-show-raw-insn','-j',sec,so],text=True)
cc=[];last=None
for line in d.splitlines():
    m=re.match(r'^\s+([0-9a-f]+):\s+(call|exit)\b',line)
    if m:
        if m.group(2)=='exit': cc.append('EXIT'); last=None
        else: cc.append('?'); last=len(cc)-1
        continue
    m=re.match(r'^\s+[0-9a-f]+:\s+R_\w+\s+(\S+)',line)
    if m and last is not None:
        n=re.sub(r'::h[0-9a-f]{16}$','',demangle(m.group(1))); cc[last]=n if not n.startswith('sol_') else 'syscall'; last=None
short=lambda x: re.sub(r'^(_<)?([a-z_0-9]+::)*','',x)[:58]
a=[short(x) for x in oc]; b=[short(x) for x in cc]
sm=difflib.SequenceMatcher(None,a,b,autojunk=False)
print('orig calls',len(oc),'cand calls',len(cc),'ratio %.3f'%sm.ratio())
if verbose:
    for tag,i1,i2,j1,j2 in sm.get_opcodes():
        if tag=='equal': print(f'  = {i2-i1} same ({a[i1]} .. {a[i2-1]})'); continue
        for k in range(max(i2-i1,j2-j1)):
            l=a[i1+k] if i1+k<i2 else ''; r=b[j1+k] if j1+k<j2 else ''
            print(f'  {tag[0]} {l:58s} | {r}')
