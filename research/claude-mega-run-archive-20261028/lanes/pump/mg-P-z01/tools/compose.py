#!/usr/bin/env python3
"""compose.py <mine_dir> <delivery_src_dir> [base_dir]: 3-way merge a delivery's changes (vs L12 base) into mine_dir in place."""
import sys,os,subprocess,filecmp,shutil
mine,theirs=sys.argv[1],sys.argv[2]
base=sys.argv[3] if len(sys.argv)>3 else '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L12/pump'
for root,_,files in os.walk(theirs):
    if '/target' in root: continue
    for f in files:
        t=os.path.join(root,f); rel=os.path.relpath(t,theirs); b=os.path.join(base,rel); m=os.path.join(mine,rel)
        if os.path.exists(b) and filecmp.cmp(b,t,shallow=False): continue
        if not os.path.exists(m) or (os.path.exists(b) and filecmp.cmp(b,m,shallow=False)):
            os.makedirs(os.path.dirname(m),exist_ok=True); shutil.copy2(t,m); print('take',rel); continue
        if filecmp.cmp(m,t,shallow=False): continue
        if not os.path.exists(b): print('BOTH-NEW (kept mine)',rel); continue
        r=subprocess.run(['git','merge-file','-p',m,b,t],capture_output=True)
        open(m,'wb').write(r.stdout); print('merge',rel,'conflicts=%d'%r.returncode)
for root,_,files in os.walk(base):
    if '/target' in root: continue
    for f in files:
        b=os.path.join(root,f); rel=os.path.relpath(b,base); t=os.path.join(theirs,rel); m=os.path.join(mine,rel)
        if not os.path.exists(t) and os.path.exists(m):
            if filecmp.cmp(b,m,shallow=False): os.remove(m); print('delete',rel)
            else: print('DELETED-THEIRS-BUT-MINE-CHANGED',rel)
