#!/usr/bin/env python3
"""ccalls.py <so> <symregex>: list calls (slot, target symbol) of a candidate function."""
import sys, re, subprocess, struct
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
so, rx = sys.argv[1], sys.argv[2]
syms=[]
for line in subprocess.check_output([OBJ,'-t',so],text=True).splitlines():
    m=re.match(r'^([0-9a-f]+) .* F \S+\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
    if m: syms.append((int(m.group(1),16),int(m.group(2),16),m.group(3)))
dem=lambda s: re.sub(r'::h[0-9a-f]{16}$','',subprocess.run(['c++filt'],input=s,capture_output=True,text=True).stdout.strip())
byaddr={a:n for a,sz,n in syms}
tgt=[s for s in syms if re.search(rx,dem(s[2]))]
a,sz,n=max(tgt,key=lambda s:s[1])
data=open(so,'rb').read()
# find .text file offset: assume vaddr==offset for sbf .so
raw=data[a:a+sz]; i=0; slot=0
print('==',dem(n),hex(a),sz)
while i<len(raw):
    op=raw[i]; regs=raw[i+1]; imm=struct.unpack('<i',raw[i+4:i+8])[0]
    if op==0x85:
        if (regs>>4)==1:
            t=a+i+8+imm*8; print(f'  slot {slot}: call {dem(byaddr.get(t,hex(t)))[:110]}')
        else: print(f'  slot {slot}: syscall/ext imm={imm}')
    i+=16 if op==0x18 else 8; slot+=1
