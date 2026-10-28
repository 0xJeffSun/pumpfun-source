#!/usr/bin/env python3
"""Drop-in for harness/fastbuild.py (same CLI and `build()` API) that also stages NESTED path crates inside the crate dir
(e.g. L13's pump-token-ext/): the harness rsync excludes every Cargo.toml, so their manifests are copied here.
  python3 -B fastbuild_nested.py --src <crate> --work <work> [--out <dir>] [--recipe identity|mac]
  or: sys.path.insert(0, '<this dir>'); import fastbuild_nested as fastbuild"""
import json, shutil, sys
from pathlib import Path
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
import fastbuild as _fb  # noqa
_orig_stage = _fb.stage
def stage(src, ws):
    crate = _orig_stage(src, ws)
    src = Path(src)
    for p in src.rglob('Cargo.toml'):
        rel = p.relative_to(src)
        if rel == Path('Cargo.toml') or 'target' in rel.parts:
            continue
        d = crate / rel; d.parent.mkdir(parents=True, exist_ok=True)
        if not d.exists() or d.read_bytes() != p.read_bytes():
            shutil.copy2(p, d)
    return crate
_fb.stage = stage
build = _fb.build; acquire_slot = _fb.acquire_slot; RECIPES = _fb.RECIPES; DEFAULT_RECIPE = _fb.DEFAULT_RECIPE; sha = _fb.sha
if __name__ == '__main__':
    import argparse
    ap = argparse.ArgumentParser(); ap.add_argument('--src', type=Path, required=True); ap.add_argument('--work', type=Path, required=True)
    ap.add_argument('--out', type=Path); ap.add_argument('--recipe', choices=sorted(RECIPES), default=DEFAULT_RECIPE)
    a = ap.parse_args()
    res = build(a.src, a.work, a.out or (a.work / 'last'), recipe=a.recipe)
    print(json.dumps(res, indent=2)); sys.exit(0 if res['ok'] else 1)
