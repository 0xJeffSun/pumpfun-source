#!/usr/bin/env python3
"""errs.py <so> <start_hex> <len|orig> : list PumpError::name / From<PumpError> sites with the PumpError variant (byte at the lddw'd
rodata address) and the following Source line (stw imm after the path lddw)."""
import sys,re,subprocess,struct
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
so=sys.argv[1]; s=int(sys.argv[2],16)
if sys.argv[3]=='orig':
    from score import original_windows
    n=next(x for x in original_windows() if x['start']==s)['bytes']
else: n=int(sys.argv[3],0)
img=open(so,'rb').read()
shoff=struct.unpack_from('<Q',img,0x28)[0]; shentsize,shnum,shstrndx=struct.unpack_from('<HHH',img,0x3a)
secs=[struct.unpack_from('<IIQQQQIIQQ',img,shoff+i*shentsize) for i in range(shnum)]
def rd(va,k):
    for sc in secs:
        if sc[3]<=va<sc[3]+sc[5] and sc[1]!=8: return img[va-sc[3]+sc[4]:va-sc[3]+sc[4]+k]
    return None
txt=subprocess.check_output([OD,'-d','--no-show-raw-insn',f'--start-address={s:#x}',f'--stop-address={s+n:#x}',so],text=True)
ins=[]
for l in txt.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
    if m: ins.append((int(m.group(1),16),m.group(2).strip()))
# find variants: lddw r2, X followed within 3 insns by a call; record
last={}
for i,(a,t) in enumerate(ins):
    m=re.match(r'lddw (r\d), (0x[0-9a-f]+)',t)
    if m: last[m.group(1)]=(a,int(m.group(2),16))
    m2=re.match(r'mov64 r2, (0x[0-9a-f]+)$',t)
    if m2: last['r2imm']=(a,int(m2.group(1),16))
    m3=re.match(r'stw \[r10 - (0x[0-9a-f]+)\], (0x[0-9a-f]+)',t)
    if m3 and int(m3.group(2),16)>50 and int(m3.group(2),16)<5000:
        print(f'  {a-s:#6x} line? {int(m3.group(2),16)} (stw fp-{m3.group(1)})')
    if t.startswith('call') and 'r2' in last and last['r2'][0]>=a-24:
        v=rd(last['r2'][1],4)
        if v: print(f'  {a-s:#6x} call with r2=&rodata {last["r2"][1]:#x} -> bytes {v.hex()}')
