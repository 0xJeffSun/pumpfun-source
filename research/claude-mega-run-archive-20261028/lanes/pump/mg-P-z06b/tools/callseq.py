#!/usr/bin/env python3
"""callseq.py <orig_start> <cand.so> <symregex>: side-by-side diff of the call sequences (callee names) orig vs candidate."""
import sys,re,subprocess,difflib,json,bisect,struct
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from win import demangle
from score import original_windows
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
st=int(sys.argv[1],16); so=sys.argv[2]; rx=sys.argv[3]
inv=json.load(open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L24/inventory.json'))['windows']
ks=sorted(int(x) for x in inv)
def oname(t):
    k=ks[bisect.bisect_right(ks,t)-1]; v=inv[str(k)]
    n=demangle(v['symbols'][0]) if v['symbols'] else hex(k)
    return re.sub(r'::h[0-9a-f]{16}$','',n) if k==t else f'{hex(k)}+{t-k:#x}'
w=next(x for x in original_windows() if x['start']==st); raw=w['raw']
oc=[];i=0
while i<len(raw):
    op=raw[i]
    if op==0x85:
        imm=struct.unpack_from('<i',raw,i+4)[0]
        oc.append('syscall' if imm==-1 else oname(st+i+8+imm*8))
    if op==0x95: oc.append('EXIT')
    i+=16 if op==0x18 else 8
# candidate
t=subprocess.check_output([OD,'-t',so],text=True); syms={}
for line in t.splitlines():
    m=re.match(r'^([0-9a-f]+) .* F \S+\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
    if m: syms[int(m.group(1),16)]=(int(m.group(2),16),m.group(3))
cand=[(a,n,s) for a,(n,s) in syms.items() if re.search(rx,demangle(s))]
a,n,s=cand[0]
d=subprocess.check_output([OD,'-d','--no-show-raw-insn',f'--start-address={a:#x}',f'--stop-address={a+n:#x}',so],text=True)
cc=[]
for line in d.splitlines():
    m=re.match(r'^\s+([0-9a-f]+):\s+(call|exit)\s*(\S*)',line)
    if not m: continue
    if m.group(2)=='exit': cc.append('EXIT'); continue
    pc=int(m.group(1),16); imm=int(m.group(3),16) if m.group(3) else 0
    if imm>=1<<31: imm-=1<<32
    if m.group(3) in ('-0x1','0xffffffff'): cc.append('syscall'); continue
    tt=pc+8+imm*8
    nm=syms.get(tt,(0,hex(tt)))[1]; cc.append(re.sub(r'::h[0-9a-f]{16}$','',demangle(nm)))
short=lambda x: re.sub(r'^(_<)?([a-z_0-9]+::)*','',x)[:58]
sm=difflib.SequenceMatcher(None,[short(x) for x in oc],[short(x) for x in cc],autojunk=False)
print('orig calls',len(oc),'cand calls',len(cc),'ratio %.3f'%sm.ratio())
for tag,i1,i2,j1,j2 in sm.get_opcodes():
    if tag=='equal': print(f'  = {i2-i1} same ({short(oc[i1])} .. {short(oc[i2-1])})'); continue
    for k in range(max(i2-i1,j2-j1)):
        l=short(oc[i1+k]) if i1+k<i2 else ''; r=short(cc[j1+k]) if j1+k<j2 else ''
        print(f'  {tag[0]} {l:58s} | {r}')
