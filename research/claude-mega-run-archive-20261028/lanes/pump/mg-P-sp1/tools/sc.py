#!/usr/bin/env python3
"""sc.py helpers: score a function in an .o against an original window (normalized like score.py / cmp.py)."""
import sys, struct, difflib, functools
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows, normalize, sections
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
@functools.lru_cache(None)
def _orig():
    ORIG=open(W+'/base/original.so','rb').read(); return ORIG, sections(ORIG), {x['start']:x for x in original_windows()}
def obj_syms(o):
    img=open(o,'rb').read()
    shoff=struct.unpack_from('<Q',img,0x28)[0]; shentsize,shnum,shstrndx=struct.unpack_from('<HHH',img,0x3a)
    secs=[struct.unpack_from('<IIQQQQIIQQ',img,shoff+i*shentsize) for i in range(shnum)]
    out={}
    for s in secs:
        if s[1]==2:
            stro=secs[s[6]][4]
            for k in range(s[5]//24):
                st_name,st_info,st_other,st_shndx,st_value,st_size=struct.unpack_from('<IBBHQQ',img,s[4]+k*24)
                if st_info&0xf==2 and st_size:
                    n=img[stro+st_name:img.index(b'\0',stro+st_name)].decode(); sec=secs[st_shndx]
                    out[n]=img[sec[4]+st_value:sec[4]+st_value+st_size]
    return out
def toks(raw,norm):
    i=0; out=[]
    while i<len(raw):
        n=16 if raw[i]==0x18 else 8; t=bytearray(norm[i:i+n])
        if t[0]==0x85: t[4:8]=bytes(4)
        out.append(bytes(t)); i+=n
    return out
@functools.lru_cache(None)
def orig_toks(start):
    ORIG,OS,ws=_orig(); w=ws[start]
    return tuple(toks(w['raw'],normalize(w['raw'],w['start'],OS))), w['bytes']
def score_bytes(raw,start):
    ot,ob=orig_toks(start)
    pt=toks(raw,raw)
    pt=[(t[:4]+bytes(4)+t[8:12]+bytes(4)) if t[0]==0x18 and t[4:8]==bytes(4) and t[12:16]==bytes(4) else t for t in pt]
    sm=difflib.SequenceMatcher(None,list(ot),pt,autojunk=False)
    return sm.ratio(), len(raw), ob, (list(ot)==pt)
def score_obj(o,pat,start):
    res=[]
    for n,raw in obj_syms(o).items():
        if pat in n: res.append((n,)+score_bytes(raw,start))
    return res
if __name__=='__main__':
    for r in score_obj(sys.argv[1],sys.argv[3] if len(sys.argv)>3 else '',int(sys.argv[2],16)):
        print(f'{r[1]:.4f} {r[2]}B (orig {r[3]}B) {"EXACT " if r[4] else ""}{r[0][:90]}')
