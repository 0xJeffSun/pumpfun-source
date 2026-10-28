#!/usr/bin/env python3
"""dd.py <obj> <sym-substr> <orig_start_hex> [ctx] [maxlines]: aligned text diff of probe fn vs original window (hunks only).
Masks call targets and lddw immediates. Prints ratio, sizes, and diff hunks."""
import sys, subprocess, re, difflib
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
OBJ='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
o,pat,st=sys.argv[1],sys.argv[2],int(sys.argv[3],16)
ctx=int(sys.argv[4]) if len(sys.argv)>4 else 2; maxl=int(sys.argv[5]) if len(sys.argv)>5 else 80
w=[x for x in original_windows() if x['start']==st][0]
def norm(lines):
    out=[]
    for l in lines:
        m=re.match(r'^\s*([0-9a-f]+):\s+(.*)$',l)
        if not m: continue
        t=m.group(2).strip(); t=re.sub(r'\s+',' ',t); t=re.sub(r'<[^>]*>','',t).strip()
        if t.startswith('call'): t='call X'
        t=re.sub(r'(r\d+ = )0x[0-9a-f]+ ll',r'\1IMM ll',t)
        out.append(t)
    return out
od=subprocess.run([OBJ,'-d','--no-show-raw-insn',f'--start-address={st:#x}',f'--stop-address={st+w["bytes"]:#x}',W+'/base/original.so'],capture_output=True,text=True).stdout.splitlines()
syms=subprocess.run([OBJ,'-t',o],capture_output=True,text=True).stdout.splitlines()
sym=[l.split()[-1] for l in syms if ' F ' in l and pat in l.split()[-1]]
if not sym: print('no sym'); sys.exit(1)
sym=sym[0]
pd=subprocess.run([OBJ,'-d','--no-show-raw-insn','-j','.text.'+sym,o],capture_output=True,text=True).stdout.splitlines()
a=norm(od); b=norm(pd)
sm=difflib.SequenceMatcher(None,a,b,autojunk=False)
print(f'ratio {sm.ratio():.4f} orig {len(a)} insns, probe {len(b)} insns  sym {sym[:70]}')
n=0
for g in sm.get_grouped_opcodes(ctx):
    for tag,i1,i2,j1,j2 in g:
        if tag=='equal':
            for k in range(i1,i2): print(f'  {k:3d}      {a[k]}'); n+=1
        else:
            for k in range(i1,i2): print(f'- {k:3d}      {a[k]}'); n+=1
            for k in range(j1,j2): print(f'+      {k:3d} {b[k]}'); n+=1
    print('  ---'); n+=1
    if n>maxl: print('  (truncated)'); break
