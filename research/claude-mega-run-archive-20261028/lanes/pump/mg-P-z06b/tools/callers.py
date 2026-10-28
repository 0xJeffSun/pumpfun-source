#!/usr/bin/env python3
"""callers.py <so> <target_hex> [...]: list call sites (pc) whose relative call (op 0x85 src=1) targets each address, with
the containing window (orig inventory windows)."""
import sys, struct, bisect, json
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
so=sys.argv[1]; tg=[int(x,16) for x in sys.argv[2:]]
data=open(so,'rb').read()
# parse ELF section headers for .text
shoff=struct.unpack_from('<Q',data,0x28)[0]; shentsize,shnum,shstrndx=struct.unpack_from('<HHH',data,0x3a)
secs=[]
for i in range(shnum):
    o=shoff+i*shentsize; name,typ,flags,addr,off,size=struct.unpack_from('<IIQQQQ',data,o); secs.append((name,addr,off,size))
stro=secs[shstrndx][2]
def nm(n): e=data.index(b'\0',stro+n); return data[stro+n:e].decode()
text=[s for s in secs if nm(s[0])=='.text'][0]; _,addr,off,size=text
inv=json.load(open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L24/inventory.json'))['windows']
ks=sorted(int(x) for x in inv)
res={t:[] for t in tg}
i=0
while i<size:
    op=data[off+i]; regs=data[off+i+1]
    if op==0x85 and (regs>>4)==1:
        imm=struct.unpack_from('<i',data,off+i+4)[0]; pc=addr+i; t=pc+8+imm*8
        if t in res:
            k=ks[bisect.bisect_right(ks,pc)-1]; res[t].append((hex(pc),hex(k)))
    i+=16 if op==0x18 else 8
for t,v in res.items(): print(hex(t), len(v), v[:20])
