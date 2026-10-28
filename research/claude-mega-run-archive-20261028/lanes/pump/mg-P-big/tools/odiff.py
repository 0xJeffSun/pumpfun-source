#!/usr/bin/env python3
"""odiff.py <obj.o> <orig_start> <symregex>: textual diff (call/branch targets stripped) of an object function vs original window."""
import sys,re,subprocess,difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
o,st,rx=sys.argv[1],int(sys.argv[2],0),sys.argv[3]
w=next(x for x in original_windows() if x['start']==st)
def clean(s):
    s=re.sub(r'\s+<.*>','',s.strip()); s=re.sub(r'^call .*','call',s); s=re.sub(r'^(lddw r\d+), .*',r'\1, X',s); return s
t=subprocess.check_output([OBJ,'-d','--no-show-raw-insn',f'--start-address={st:#x}',f'--stop-address={st+w["bytes"]:#x}','/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so'],text=True)
A=[clean(m.group(2)) for m in (re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l) for l in t.splitlines()) if m]
syms=subprocess.check_output([OBJ,'-t',o],text=True)
sec=None
for line in syms.splitlines():
    m=re.match(r'^([0-9a-f]+) .* F (\S+)\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$',line)
    if m and re.search(rx,m.group(4)): sec=m.group(2)
t=subprocess.check_output([OBJ,'-d','--no-show-raw-insn','-j',sec,o],text=True)
B=[clean(m.group(2)) for m in (re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l) for l in t.splitlines()) if m]
for l in difflib.unified_diff(A,B,'orig','cand',n=2,lineterm=''): print(l)
