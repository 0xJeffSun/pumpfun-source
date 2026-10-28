#!/usr/bin/env python3
"""IR build (r5-z10 irbuild = fastbuild + IR-emitting RUSTC_WRAPPER) + nested path crate Cargo.toml copy (as mg-P-int nbuild).
nirbuild.py --src <crate> --work <work> --out <out>"""
import argparse, json, shutil, sys
from pathlib import Path
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/r5-z10/tools'); import irbuild as fastbuild  # noqa
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
ap = argparse.ArgumentParser(); ap.add_argument('--src', type=Path, required=True); ap.add_argument('--work', type=Path, required=True)
ap.add_argument('--out', type=Path, required=True)
a = ap.parse_args()
r = fastbuild.build(a.src, a.work, a.out, quiet=True)
print(json.dumps({k: r.get(k) for k in ('ok', 'runtime_valid', 'stack_warnings', 'seconds', 'unstripped_sha256')}, indent=1))
