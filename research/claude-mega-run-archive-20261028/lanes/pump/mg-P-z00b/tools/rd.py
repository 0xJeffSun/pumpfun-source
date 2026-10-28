#!/usr/bin/env python3
"""rd.py <win> <so> <symregex> [maxhunks] [skip]: aligned diff hunks (win.py --full) with RELATIVE offsets,
branch offsets masked (so pure-size shifts vanish). Prints '-o+REL text' / '+c+REL text'. Summary line first."""
import sys,subprocess,re
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
st,so,sym=sys.argv[1:4]; mx=int(sys.argv[4]) if len(sys.argv)>4 else 20; skip=int(sys.argv[5]) if len(sys.argv)>5 else 0
out=subprocess.run([sys.executable,'-B',W+'/harness/win.py','show',st,'--cand',so,'--sym',sym,'--full'],capture_output=True,text=True).stdout.splitlines()
o0=int(st,16); c0=None
for l in out:
    m=re.match(r'^  0x([0-9a-f]+) 0x([0-9a-f]+)\s',l)
    if m: c0=int(m.group(2),16)-(int(m.group(1),16)-o0); break
mb=lambda s: re.sub(r'^(j\w+ .*?)[+-]0x[0-9a-f]+(\s*<.*>)?$',r'\1L',re.sub(r'\s+<.*>$','',s.strip()))
hunks=[];cur=[]
for l in out:
    m=re.match(r'^([-+])\s+0x([0-9a-f]+)\s+(.*)$',l)
    if m:
        a=int(m.group(2),16); rel=a-(o0 if m.group(1)=='-' else c0)
        cur.append((m.group(1),rel,mb(m.group(3))))
    else:
        if cur: hunks.append(cur)
        cur=[]
if cur: hunks.append(cur)
real=[h for h in hunks if sorted(t for s,_,t in h if s=='-')!=sorted(t for s,_,t in h if s=='+')]
print('hunks',len(hunks),'real(after br-mask)',len(real),'lines',sum(len(h) for h in real))
for h in real[skip:skip+mx]:
    for s,r,t in h[:16]: print('%s%+#06x %s'%(s,r,t))
    if len(h)>16: print('  ...+%d'%(len(h)-16))
    print('~')
