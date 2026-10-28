#!/usr/bin/env python3
"""usage: sbs.py CAND(.o|symbols.so) olo ohi clo chi -- side-by-side original vs candidate listing"""
import sys
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/o0084-ir-r1/tools')
import irx, objsec, sbfdis
def lines(code, lo, hi):
    return [f"{pc:6d} "+sbfdis.decode(code,None,pc,pc+len(raw),None,None)[0]['text'] for pc, raw in objsec.insns(code) if lo<=pc<hi]
p=sys.argv[1]
if p.endswith('.o'):
    secs=objsec.sections(p); code=secs[[k for k in secs if irx.PAT in k and k.startswith('.text')][0]]
else: code=irx.elf_code(p)
a=[int(x) for x in sys.argv[2:6]]
o=lines(irx.O.b[irx.W[1]:irx.W[2]],a[0],a[1]); c=lines(code,a[2],a[3])
for i in range(max(len(o),len(c))):
    x=o[i] if i<len(o) else ''; y=c[i] if i<len(c) else ''
    print(f"{x:42s}{'  ' if x[7:]==y[7:] else '| '}{y}")
