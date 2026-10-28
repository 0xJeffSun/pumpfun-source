#!/usr/bin/env python3
"""objvs.py <obj.o> <unstripped.so> [substr]: compare same-named function bodies (normalized: call imm, lddw imm masked)."""
import sys,struct
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-v3b/tools')
from sc import obj_syms
def norm(raw):
    m=bytearray(raw);i=0
    while i<len(m):
        op=m[i]
        if op==0x18: m[i+4:i+8]=bytes(4); m[i+12:i+16]=bytes(4); i+=16; continue
        if op==0x85: m[i+4:i+8]=bytes(4)
        i+=8
    return bytes(m)
def so_syms(p):
    img=open(p,'rb').read()
    shoff=struct.unpack_from('<Q',img,0x28)[0]; shentsize,shnum,shstrndx=struct.unpack_from('<HHH',img,0x3a)
    secs=[struct.unpack_from('<IIQQQQIIQQ',img,shoff+i*shentsize) for i in range(shnum)]
    out={}
    for s in secs:
        if s[1] in (2,11):
            stro=secs[s[6]][4]
            for k in range(s[5]//24):
                st_name,st_info,st_other,st_shndx,st_value,st_size=struct.unpack_from('<IBBHQQ',img,s[4]+k*24)
                if st_info&0xf==2 and st_size and st_shndx<len(secs):
                    n=img[stro+st_name:img.index(b'\0',stro+st_name)].decode(); sec=secs[st_shndx]
                    off=st_value-sec[3]+sec[4]
                    out[n]=img[off:off+st_size]
    return out
a=obj_syms(sys.argv[1]); b=so_syms(sys.argv[2]); sub=sys.argv[3] if len(sys.argv)>3 else ''
eq=ne=0; bad=[]
for n,r in a.items():
    if sub not in n or n not in b: continue
    if norm(r)==norm(b[n]): eq+=1
    else: ne+=1; bad.append((n,len(r),len(b[n])))
print('equal',eq,'differ',ne)
for x in bad[:15]: print(' ',x[1],x[2],x[0][:110])
