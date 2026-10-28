#!/usr/bin/env python3
"""mkvar.py BASE_ROOT NEW_NAME SPEC.json : copy root (APFS clone), apply line replacements {file: {line: text}} (1-based, line count preserved)."""
import sys, json, subprocess, os
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83a'
base, name, spec = sys.argv[1], sys.argv[2], json.load(open(sys.argv[3]))
dst=f'{L}/roots/{name}'
if os.path.exists(dst): subprocess.run(['rm','-rf',dst],check=True)
subprocess.run(['cp','-c','-R',base,dst],check=True)
for f,reps in spec.items():
    p=f'{dst}/programs/mayhem/src/{f}'; lines=open(p).read().split('\n')
    for ln,txt in reps.items():
        assert '\n' not in txt; lines[int(ln)-1]=txt
    open(p,'w').write('\n'.join(lines))
print(dst)
