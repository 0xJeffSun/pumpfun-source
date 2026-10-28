#!/usr/bin/env python3
"""segcmp.py <orig_start> <obj.o> <symregex>: per-call segment instruction counts in LAYOUT order, aligned by callee name."""
import sys,re,subprocess,difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b/tools')
import importlib.util
spec=importlib.util.spec_from_file_location('cfg','/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b/tools/cfg.py')
src=open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z06b/tools/cfg.py').read()
src=src[:src.index("if sys.argv[1]=='orig'")]
g={}; exec(src,g)
o=g['decode_orig'](int(sys.argv[1],16)); c=g['decode_obj'](sys.argv[2],sys.argv[3])
def segs(ins):
    out=[];n=0
    for pc,k,cl,t in ins:
        n+=1
        if k=='call': out.append((cl,n)); n=0
        if k=='exit': out.append(('EXIT',n)); n=0
    out.append(('END',n)); return out
a=segs(o); b=segs(c)
sm=difflib.SequenceMatcher(None,[x[0] for x in a],[x[0] for x in b],autojunk=False)
for tag,i1,i2,j1,j2 in sm.get_opcodes():
    for k in range(max(i2-i1,j2-j1)):
        l=a[i1+k] if i1+k<i2 else ('',''); r=b[j1+k] if j1+k<j2 else ('','')
        mark=' ' if tag=='equal' and l[1]==r[1] else '*'
        print(f'{mark} {str(l[0])[:24]:24s} {str(l[1]):>4} | {str(r[0])[:24]:24s} {str(r[1]):>4}')
