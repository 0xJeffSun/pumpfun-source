#!/usr/bin/env python3
"""cmp.py <probe.rs> <orig_start> [fn-substring ...]: compile probe to obj (same flags as run.sh), compare each matching fn
to the original window (normalized: call imms masked, reloc lddw zero). Prints ratio and size; -v prints the diff."""
import sys, subprocess, re, struct, difflib, os
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows, normalize, sections
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
RC=W+'/toolchains/hybrid144/rust/bin/rustc'; OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
a=[x for x in sys.argv[1:] if x!='-v']; verbose='-v' in sys.argv
src=a[0]; start=int(a[1],16); pats=a[2:]
d=os.path.dirname(os.path.abspath(src)); o=os.path.splitext(os.path.abspath(src))[0]+'.o'
if src.endswith('.o'): o=src
else:
  r=subprocess.run([RC,'--target','sbpf-solana-solana','--crate-type','lib','--edition','2021','-C','opt-level=3','-C','panic=abort','-C','overflow-checks=on','-C','codegen-units=1','--emit=obj','-o',o,src],capture_output=True,text=True)
  if r.returncode: print(r.stderr[-2000:]); sys.exit(1)
img=open(o,'rb').read()
# parse ELF64 section headers
shoff=struct.unpack_from('<Q',img,0x28)[0]; shentsize,shnum,shstrndx=struct.unpack_from('<HHH',img,0x3a)
secs=[struct.unpack_from('<IIQQQQIIQQ',img,shoff+i*shentsize) for i in range(shnum)]
strtab=secs[shstrndx]; nm=lambda off: img[strtab[4]+off:img.index(b'\0',strtab[4]+off)].decode()
syms=[]
for s in secs:
    if s[1]==2:  # SYMTAB
        stro=secs[s[6]][4]
        for k in range(s[5]//24):
            st_name,st_info,st_other,st_shndx,st_value,st_size=struct.unpack_from('<IBBHQQ',img,s[4]+k*24)
            if st_info&0xf==2 and st_size:
                n=img[stro+st_name:img.index(b'\0',stro+st_name)].decode(); sec=secs[st_shndx]
                syms.append((n,img[sec[4]+st_value:sec[4]+st_value+st_size]))
ORIG=open(W+'/base/original.so','rb').read(); OS=sections(ORIG)
w=[x for x in original_windows() if x['start']==start][0]
def toks(raw,norm):
    i=0; out=[]
    while i<len(raw):
        n=16 if raw[i]==0x18 else 8; t=bytearray(norm[i:i+n])
        if t[0]==0x85: t[4:8]=bytes(4)
        out.append(bytes(t)); i+=n
    return out
ot=toks(w['raw'],normalize(w['raw'],w['start'],OS))
for n,raw in syms:
    if pats and not any(p in n for p in pats): continue
    pt=toks(raw,raw)
    # zero lddw imm in probe where original also zero? keep as-is; mask probe lddw only if orig masked at aligned pos
    pt=[ (t[:4]+bytes(4)+t[8:12]+bytes(4)) if t[0]==0x18 and t[4:8]==bytes(4) and t[12:16]==bytes(4) else t for t in pt]
    sm=difflib.SequenceMatcher(None,ot,pt,autojunk=False)
    print(f'{sm.ratio():.4f} {len(raw)}B (orig {w["bytes"]}B) {n[:90]}')
    if verbose:
        dis=lambda b: subprocess.run([OBJ,'-d','--no-show-raw-insn','-'],input=b,capture_output=True).stdout
        for tag,i1,i2,j1,j2 in sm.get_opcodes():
            if tag!='equal': print(' ',tag,f'orig[{i1}:{i2}] probe[{j1}:{j2}]')
