#!/usr/bin/env python3
"""skel.py <listing.txt> [from_pc] [to_pc]: condensed skeleton: calls (named), conditional branches (with target pc), rodata refs,
error-code/line stores, exits. Collapses everything else."""
import sys,re,json,bisect
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from win import demangle
import coords
d=json.load(open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L24/inventory.json'))['windows']
ks=sorted(int(x) for x in d)
def name(t):
    i=bisect.bisect_right(ks,t)-1; k=ks[i]; v=d[str(k)]
    off='' if k==t else f'+{t-k:#x}'
    n=(demangle(v['symbols'][0]) if v['symbols'] else '?')
    n=re.sub(r'^.*::','',n) if len(n)>60 else n
    return f"{hex(k)}{off} {n[:60]}"
secs=coords.OS; blob=coords.ORIG
def ro(v):
    for n,s in secs.items():
        if s['addr'] and s['addr']<=v<s['addr']+s['size'] and n=='.rodata':
            o=v-s['addr']+s['offset']; b=blob[o:o+24]; return '"'+''.join(chr(c) if 32<=c<127 else '.' for c in b)+'"'
    return None
lo=int(sys.argv[2],16) if len(sys.argv)>2 else 0; hi=int(sys.argv[3],16) if len(sys.argv)>3 else 1<<62
skip=0
for line in open(sys.argv[1]):
    m=re.match(r'(0x[0-9a-f]+)\s+(.*)$',line.strip())
    if not m: continue
    pc=int(m.group(1),16); ins=m.group(2)
    if not(lo<=pc<hi): continue
    out=None
    mm=re.match(r'call (-?0x[0-9a-f]+)',ins)
    if mm:
        imm=int(mm.group(1),16); t=pc+8+imm*8
        out=f'call {name(t)}' if imm!=-1 else 'call -1 (abort)'
    elif re.match(r'j(eq|ne|gt|ge|lt|le|sgt|sge|slt|sle|set) ',ins):
        mm=re.search(r'([+-]0x[0-9a-f]+)$',ins); t=pc+8+int(mm.group(1),16)*8; out=re.sub(r'[+-]0x[0-9a-f]+$',hex(t),ins)
    elif ins.startswith('ja '):
        mm=re.search(r'([+-]0x[0-9a-f]+)$',ins); t=pc+8+int(mm.group(1),16)*8; out=f'ja {hex(t)}'
    elif ins.startswith('exit'): out='exit'
    elif ins.startswith('lddw'):
        v=int(ins.split(',')[-1],16); r=ro(v)
        if r: out=ins.split(',')[0]+' '+r
    elif re.match(r'stw \[r10 - 0x[0-9a-f]+\], 0x(1[0-9a-f]{3})$',ins) or re.match(r'stw \[r10 - 0x[0-9a-f]+\], 0x([0-9a-f]{1,3})$',ins):
        v=int(ins.split(',')[-1],16)
        if 6000<=v<6200 or 2000<=v<4200: out=f'code {v}'
        elif 10<=v<3000: out=f'line? {v}'
    if out: 
        if skip: print(f'      ..{skip}'); skip=0
        print(hex(pc),out)
    else: skip+=1
