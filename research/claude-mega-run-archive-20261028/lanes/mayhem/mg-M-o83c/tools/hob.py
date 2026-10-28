#!/usr/bin/env python3
"""hob.py BIN [regs=1]: numeric masked hunk summary vs orig O0083 (offset:origlen/candlen). No instruction text."""
import sys, difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools')
import sc, sbfdis, objsec
code=open(sys.argv[1],'rb').read(); regs=(len(sys.argv)<=2 or sys.argv[2]=='1')
S,E=sc.WS['O0083']; A=sbfdis.window_insns(sc.O,S,E)
Y=[(pc,sbfdis.decode(code,None,pc,pc+len(r),None,None)[0]['text']) for pc,r in objsec.insns(code)]
x=[sc.mask(t['text'],regs) for t in A]; y=[sc.mask(t,regs) for _,t in Y]
sm=difflib.SequenceMatcher(a=x,b=y,autojunk=False); out=[]; tot=0
for t,i1,i2,j1,j2 in sm.get_opcodes():
    if t=='equal': continue
    tot+=max(i2-i1,j2-j1); out.append(f'{A[min(i1,len(A)-1)]["pc"]-S}:{i2-i1}/{j2-j1}')
print(f'masked {tot} hunks {len(out)}:', ' '.join(out))
