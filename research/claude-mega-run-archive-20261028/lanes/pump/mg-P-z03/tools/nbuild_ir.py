#!/usr/bin/env python3
"""fastbuild (harness) + nested path crates inside the crate dir (their Cargo.toml is excluded by the harness rsync),
then score.py with an explicit baseline.  nbuild.py --src <crate> --work <work dir> --out <out dir> [--baseline inv.json]"""
import argparse, json, shutil, subprocess, sys
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'); H = W / 'harness'
sys.path.insert(0, str(H)); sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z03/tools'); import irbuild as fastbuild  # noqa
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
ap.add_argument('--out', type=Path, required=True); ap.add_argument('--baseline', type=Path, default=W / 'base/L12/inventory.json')
a = ap.parse_args()
r = fastbuild.build(a.src, a.work, a.out, quiet=True)
res = {'build': {k: r.get(k) for k in ('ok', 'runtime_valid', 'stack_warnings', 'seconds', 'unstripped_sha256')}}
if r['ok']:
    s = subprocess.run([sys.executable, '-B', str(H / 'score.py'), str(a.out / 'unstripped.so'), '--baseline', str(a.baseline), '--json', str(a.out / 'score.json'), '--quiet'], capture_output=True, text=True)
    sc = json.loads(s.stdout); res['score'] = {k: sc.get(k) for k in ('normalized', 'raw', 'gains', 'losses', 'raw_gains', 'raw_losses')}
else:
    log = (a.out / 'build.log').read_text().splitlines(); res['errors'] = [l for l in log if l.startswith('error')][:12]
print(json.dumps(res, indent=1))
