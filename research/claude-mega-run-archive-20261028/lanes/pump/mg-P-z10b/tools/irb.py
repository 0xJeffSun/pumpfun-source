#!/usr/bin/env python3
"""irb.py --src <crate> --work <work_ir> --out <dir>: fastbuild (+nested manifests) with the IR wrapper; copies the .ll to <out>/pump.ll"""
import argparse, shutil, subprocess, sys, glob, os
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'); H = W / 'harness'
sys.path.insert(0, str(H)); import fastbuild  # noqa
_orig = fastbuild.stage
def stage(src, ws):
    crate = _orig(src, ws)
    for p in src.rglob('Cargo.toml'):
        rel = p.relative_to(src)
        if rel == Path('Cargo.toml') or 'target' in rel.parts: continue
        d = crate / rel; d.parent.mkdir(parents=True, exist_ok=True)
        if not d.exists() or d.read_bytes() != p.read_bytes(): shutil.copy2(p, d)
    return crate
fastbuild.stage = stage
fastbuild.H = Path(__file__).resolve().parent / 'irwrapdir'
ap = argparse.ArgumentParser(); ap.add_argument('--src', type=Path, required=True); ap.add_argument('--work', type=Path, required=True); ap.add_argument('--out', type=Path, required=True)
a = ap.parse_args()
for f in glob.glob(str(a.work / 'target-identity/sbpf-solana-solana/release/deps/pump_recovered*.ll')): os.unlink(f)
r = fastbuild.build(a.src, a.work, a.out, quiet=True)
print({k: r.get(k) for k in ('ok', 'runtime_valid', 'seconds')})
lls = glob.glob(str(a.work / 'target-identity/sbpf-solana-solana/release/deps/pump_recovered*.ll'))
if lls: shutil.copy2(lls[0], a.out / 'pump.ll'); print('ll', a.out / 'pump.ll', os.path.getsize(a.out / 'pump.ll'))
else: print('NO .ll found')
