#!/usr/bin/env python3
"""irnb.py --src <crate> --work <work> --out <out>: z10 irbuild (IR / remarks via IRWRAP_EXTRA) + nested path crates (L13)."""
import sys, shutil, argparse, json
from pathlib import Path
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/r5-z10/tools')
import irbuild
_orig = irbuild.stage
def stage(src, ws):
    crate = _orig(src, ws)
    for p in src.rglob('Cargo.toml'):
        rel = p.relative_to(src)
        if rel == Path('Cargo.toml') or 'target' in rel.parts: continue
        d = crate / rel; d.parent.mkdir(parents=True, exist_ok=True)
        if not d.exists() or d.read_bytes() != p.read_bytes(): shutil.copy2(p, d)
    return crate
irbuild.stage = stage
ap = argparse.ArgumentParser(); ap.add_argument('--src', type=Path, required=True); ap.add_argument('--work', type=Path, required=True); ap.add_argument('--out', type=Path, required=True)
a = ap.parse_args()
r = irbuild.build(a.src, a.work, a.out, quiet=True)
print(json.dumps({k: r.get(k) for k in ('ok', 'runtime_valid', 'seconds')}))
