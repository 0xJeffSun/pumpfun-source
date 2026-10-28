#!/usr/bin/env python3
"""callers.py <so> <target_hex>... : list call sites (and containing original window if so=original) of each target."""
import sys,re,subprocess,bisect
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows, candidate_functions
from win import demangle
OD='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
so=sys.argv[1]; tg=[int(x,16) for x in sys.argv[2:]]
txt=subprocess.check_output([OD,'-d','--no-show-raw-insn','--section=.text',so],text=True)
if 'original' in so:
    fns=sorted((w['start'],w['bytes'],'win') for w in original_windows())
else:
    fns=sorted((s,n,demangle(nm)) for s,n,nm in candidate_functions(so))
starts=[f[0] for f in fns]
for l in txt.splitlines():
    m=re.match(r'^\s*([0-9a-f]+):\s+call (-?0x[0-9a-f]+)',l)
    if m:
        a=int(m.group(1),16);t=a+8+int(m.group(2),16)*8
        if t in tg:
            i=bisect.bisect_right(starts,a)-1; f=fns[i]
            print(f'{t:#x} <- {a:#x} in {f[0]:#x} {f[2][:90]}')
