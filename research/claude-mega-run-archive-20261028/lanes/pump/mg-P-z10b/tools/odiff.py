#!/usr/bin/env python3
"""odiff.py <obj.o|so> <orig_start> <symregex> [--from i --to j] [--hunks] [--keepbr]: diff (call/lddw masked; branch offsets
stripped unless --keepbr) of a candidate function vs original window. Default prints unified diff with orig slot indices;
--hunks prints one summary line per hunk (REG = only register names differ)."""
import sys,re,subprocess,difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
av=sys.argv[1:]; o,st,rx=av[0],int(av[1],0),av[2]
lo=int(av[av.index('--from')+1]) if '--from' in av else 0; hi=int(av[av.index('--to')+1]) if '--to' in av else 10**9
keepbr='--keepbr' in av
w=next(x for x in original_windows() if x['start']==st)
def clean(s):
    s=re.sub(r'\s+<.*>','',s.strip()); s=re.sub(r'^call .*','call',s); s=re.sub(r'^(lddw r\d+), .*',r'\1, X',s)
    if not keepbr: s=re.sub(r'^(j\w+ .*?),? ?[+-]0x[0-9a-f]+$',r'\1',s)
    return s
def dis(path, a, b, sec=None):
    args=[OBJ,'-d','--no-show-raw-insn']+([f'--start-address={a:#x}',f'--stop-address={b:#x}'] if a is not None else [])+(['-j',sec] if sec else [])+[path]
    t=subprocess.check_output(args,text=True)
    return [clean(m.group(2)) for m in (re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l) for l in t.splitlines()) if m]
A=dis('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so',st,st+w['bytes'])
syms=subprocess.check_output([OBJ,'-t',o],text=True); best=None
for line in syms.splitlines():
    m=re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
    if m and re.search(rx,m.group(4)) and (best is None or int(m.group(3),16)>best[2]): best=(m.group(2),int(m.group(1),16),int(m.group(3),16))
if o.endswith('.o'): B=dis(o,None,None,best[0])
else: B=dis(o,best[1],best[1]+best[2])
# slot index (lddw = 2 slots) for orig lines
ia=[];k=0
for x in A: ia.append(k); k+=2 if x.startswith('lddw') else 1
sm=difflib.SequenceMatcher(None,A,B,autojunk=False)
def norm(x): return [re.sub(r'r\d+','r',t) for t in x]
if '--hunks' in av:
    ops=[op for op in sm.get_opcodes() if op[0]!='equal']
    print(f'len orig {len(A)} cand {len(B)} hunks {len(ops)} ratio {sm.ratio():.4f}')
    for tg,i1,i2,j1,j2 in ops:
        if not (lo<= (ia[i1] if i1<len(ia) else k) <=hi): continue
        reg='REG' if sorted(norm(A[i1:i2]))==sorted(norm(B[j1:j2])) else ''
        print(f'@{ia[i1] if i1<len(ia) else k} -{i2-i1} +{j2-j1} {reg} | {" ; ".join(A[i1:i2][:3])[:100]} || {" ; ".join(B[j1:j2][:3])[:100]}')
else:
    for tg,i1,i2,j1,j2 in sm.get_opcodes():
        if tg=='equal': continue
        if not (lo<= (ia[i1] if i1<len(ia) else k) <=hi): continue
        print(f'--- @{ia[i1] if i1<len(ia) else k} {tg}')
        for x in A[i1:i2]: print('-',x)
        for x in B[j1:j2]: print('+',x)
