#!/bin/bash
# cdiff.sh ORIG_START SO SYMREGEX : odiff of a candidate .so symbol vs original, offset-only hunks dropped
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07b
OBJ=/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump
python3 -B - "$@" <<'PY'
import sys,re,subprocess,difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
st=int(sys.argv[1],0); so=sys.argv[2]; rx=sys.argv[3]
w=next(x for x in original_windows() if x['start']==st)
def clean(s):
    s=re.sub(r'\s+<.*>','',s.strip()); s=re.sub(r'^call .*','call',s); s=re.sub(r'^(lddw r\d+), .*',r'\1, X',s)
    s=re.sub(r'^(j\w+ .*?)([+-]0x[0-9a-f]+)$',r'\1OFF',s); s=re.sub(r'^ja OFF$','ja OFF',s)
    return s
t=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',f'--start-address={st:#x}',f'--stop-address={st+w["bytes"]:#x}','/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so'],text=True)
A=[clean(m.group(2)) for m in (re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l) for l in t.splitlines()) if m]
syms=subprocess.check_output([OBJ,'-t',so],text=True); best=None
for line in syms.splitlines():
    m=re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
    if m and re.search(rx,m.group(4)): best=(int(m.group(1),16),int(m.group(3),16))
s0,sz=best
t=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',f'--start-address={s0:#x}',f'--stop-address={s0+sz:#x}',so],text=True)
B=[clean(m.group(2)) for m in (re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l) for l in t.splitlines()) if m and not m.group(2).endswith(':')]
n=0
for l in difflib.unified_diff(A,B,'orig','cand',n=1,lineterm=''):
    print(l); n+=1
print('lines:',len(A),len(B))
PY
