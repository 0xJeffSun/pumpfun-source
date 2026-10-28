#!/usr/bin/env python3
"""Port a lane's source delta onto a new parent tree (3-way per file).

usage: port.py LANE_MAYHEM LANE_BASE_MAYHEM NEW_PARENT_MAYHEM OUT_ROOT
  *_MAYHEM are programs/mayhem dirs. OUT_ROOT gets programs/mayhem = NEW_PARENT + (LANE - LANE_BASE).
Prints one line per changed file: copied | merged | CONFLICT | added | removed. Exit 1 on conflict.
"""
from pathlib import Path
import filecmp, shutil, subprocess, sys, tempfile

lane, base, new, out = (Path(x).resolve() for x in sys.argv[1:5])
dst = out / 'programs/mayhem'
assert not dst.exists(), dst
shutil.copytree(new, dst, copy_function=shutil.copyfile)
for q in [dst, *dst.rglob('*')]:
    q.chmod(0o755 if q.is_dir() else 0o644)
files = lambda r: {p.relative_to(r).as_posix() for p in r.rglob('*') if p.is_file()}
L, B, N = files(lane), files(base), files(new)
bad = 0
for rel in sorted(L | B):
    lp, bp, np_, dp = lane / rel, base / rel, new / rel, dst / rel
    if rel in L and rel in B and filecmp.cmp(lp, bp, shallow=False):
        continue
    if rel not in B:
        dp.parent.mkdir(parents=True, exist_ok=True); shutil.copyfile(lp, dp); print('added', rel); continue
    if rel not in L:
        if dp.exists(): dp.unlink()
        print('removed', rel); continue
    if rel in N and filecmp.cmp(np_, bp, shallow=False):
        shutil.copyfile(lp, dp); print('copied', rel); continue
    if rel in N and filecmp.cmp(np_, lp, shallow=False):
        print('already', rel); continue
    with tempfile.TemporaryDirectory() as td:
        cur = Path(td) / 'cur'; shutil.copyfile(np_, cur)
        r = subprocess.run(['git', 'merge-file', '-p', str(cur), str(bp), str(lp)], capture_output=True)
        if r.returncode != 0:
            bad += 1; print('CONFLICT', rel, r.returncode); continue
        dp.write_bytes(r.stdout); print('merged', rel)
sys.exit(1 if bad else 0)
