#!/usr/bin/env python3
"""nirbuild.py --src <crate> --work <work> --out <out>: irbuild (IR emission via IRWRAP_EXTRA) + nested Cargo.toml copy.
IR lands in <work>/target-identity/sbpf-solana-solana/release/deps/pump_recovered*.ll"""
import argparse, json, shutil, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent)); import irbuild  # noqa
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
ap = argparse.ArgumentParser(); ap.add_argument('--src', type=Path, required=True); ap.add_argument('--work', type=Path, required=True)
ap.add_argument('--out', type=Path, required=True)
a = ap.parse_args()
r = irbuild.build(a.src, a.work, a.out, quiet=True)
print(json.dumps({k: r.get(k) for k in ('ok', 'runtime_valid', 'stack_warnings', 'seconds', 'unstripped_sha256')}))
