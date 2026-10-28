#!/usr/bin/env python3
"""sites2.py orig <start> | cand <so> <symregex>: Source sites (file:line) with the nearest PumpError/anchor code store."""
import sys, struct, re, subprocess
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
import coords
from score import original_windows
def dec(raw):
    insn=[];i=0
    while i<len(raw):
        op=raw[i]
        if op==0x18:
            lo=struct.unpack_from('<I',raw,i+4)[0];hi=struct.unpack_from('<I',raw,i+12)[0];insn.append((i,op,raw[i+1],0,lo|hi<<32));i+=16
        else:
            _,regs,off,imm=struct.unpack_from('<BBhi',raw,i);insn.append((i,op,regs,off,imm));i+=8
    return insn
def run(blob,secs,start,raw):
    insn=dec(raw); out=[]
    for k,(pos,op,regs,off,L) in enumerate(insn):
        if not(op==0x7a and regs&15==10 and 1<=L<=200): continue
        X=off; ptr=None
        for j in range(max(0,k-30),min(len(insn),k+30)):
            p2,o2,r2,of2,v2=insn[j]
            if o2==0x7b and r2&15==10 and of2==X-8:
                ry=r2>>4
                for jj in range(j-1,max(-1,j-40),-1):
                    p3,o3,r3,of3,v3=insn[jj]
                    if r3&15==ry and o3==0x18: ptr=v3;break
                    if r3&15==ry and o3 not in (0x7b,0x7a,0x62,0x72,0x6a,0x63,0x73,0x6b): break
                if ptr is not None: break
        if ptr is None: continue
        s=coords.read_cstr_at(blob,secs,ptr,L)
        if not(s and s.endswith(b'.rs')): continue
        best=None
        for j in range(max(0,k-30),min(len(insn),k+30)):
            p2,o2,r2,of2,v2=insn[j]
            if o2==0x62 and r2&15==10 and of2==X+8:
                if best is None or abs(j-k)<abs(best[0]-k): best=(j,v2)
        code=None
        for j in range(max(0,k-14),min(len(insn),k+14)):
            p2,o2,r2,of2,v2=insn[j]
            if o2==0x62 and r2&15==10 and (6000<=v2<=6200 or 2000<=v2<=4200) and of2!=X+8:
                if code is None or abs(j-k)<abs(code[0]-k): code=(j,v2)
        out.append((hex(start+pos), s.decode().split('src/')[-1], best and best[1], code and code[1]))
    return out
if sys.argv[1]=='orig':
    st=int(sys.argv[2],0); w=next(x for x in original_windows() if x['start']==st)
    r=run(coords.ORIG,coords.OS,st,w['raw'])
else:
    so=sys.argv[2]; rx=sys.argv[3]
    blob=open(so,'rb').read(); secs=coords.sections(blob)
    OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
    t=subprocess.check_output([OD,'-t','-C',so],text=True)
    for line in t.splitlines():
        m=re.match(r'^([0-9a-f]+) .* F \S+\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(.*)$',line)
        if m and re.search(rx,m.group(3)):
            a=int(m.group(1),16);n=int(m.group(2),16)
            print('#',hex(a),n,m.group(3)[:100])
            r=run(blob,secs,a,coords.body(blob,secs,a,n)); print(r)
    sys.exit()
print(r)
