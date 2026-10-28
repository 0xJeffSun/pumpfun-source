#!/usr/bin/env python3
"""fr.py <orig_start> <so> <symregex>: compare r10-relative stack offsets used by orig window vs candidate fn.
Prints offsets (sorted) with access width and first slot; marks offsets present in only one."""
import sys, re, subprocess, struct
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
sys.path.insert(0, W+'/harness')
from score import original_windows
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
st=int(sys.argv[1],0); so=sys.argv[2]; rx=sys.argv[3]
w=next(x for x in original_windows() if x['start']==st)
def scan(raw):
    i=0; slot=0; acc={}
    while i<len(raw):
        op=raw[i]; regs=raw[i+1]; dst=regs&15; src=regs>>4; off=struct.unpack('<h',raw[i+2:i+4])[0]
        cls=op&7; sz={0:4,1:2,2:1,3:8}.get((op>>3)&3)
        if cls in (1,2,3) and (op&0xe0) in (0x60,):  # LDX/ST/STX mem mode
            base = src if cls==1 else dst
            if base==10: acc.setdefault(off,[]).append((slot,sz,'r' if cls==1 else 'w'))
        if op==0x07 and dst!=10 and False: pass
        i+=16 if op==0x18 else 8; slot+=1
    # also r10 copies: mov rX, r10 ; add rX, imm
    return acc
def addrs(raw):
    i=0; slot=0; out={}; prev=None
    while i<len(raw):
        op=raw[i]; regs=raw[i+1]; dst=regs&15; src=regs>>4; imm=struct.unpack('<i',raw[i+4:i+8])[0]
        if op==0xbf and src==10: prev=(dst,slot)
        elif op==0x07 and prev and prev[0]==dst: out.setdefault(imm,[]).append(slot); prev=None
        else: prev=None
        i+=16 if op==0x18 else 8; slot+=1
    return out
txt=subprocess.check_output([OBJ,'-t',so],text=True)
best=None
for line in txt.splitlines():
    m=re.match(r'^([0-9a-f]+) .* F \S+\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
    if m and re.search(rx,subprocess.run(['c++filt'],input=m.group(3),capture_output=True,text=True).stdout):
        if not best or int(m.group(2),16)>best[1]: best=(int(m.group(1),16),int(m.group(2),16))
a,sz=best; craw=open(so,'rb').read()[a:a+sz]
O=scan(w['raw']); C=scan(craw); OA=addrs(w['raw']); CA=addrs(craw)
print('orig mem offsets:', ' '.join(f"{-k:#x}" for k in sorted(O)))
print('cand mem offsets:', ' '.join(f"{-k:#x}" for k in sorted(C)))
print('orig &r10 addrs :', ' '.join(f"{-k:#x}@{v[0]}" for k,v in sorted(OA.items())))
print('cand &r10 addrs :', ' '.join(f"{-k:#x}@{v[0]}" for k,v in sorted(CA.items())))
