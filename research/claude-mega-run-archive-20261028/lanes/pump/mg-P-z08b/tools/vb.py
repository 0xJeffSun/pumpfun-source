#!/usr/bin/env python3
"""vb.py NAME [--src DIR] [--wins a,b,..] : build lanes/mg-P-z08/v/NAME/src (or --src) with fastbuild (own work dir cloned
from the warm lane work dir), score vs L29 baseline, print status of my windows, append a line to vlog.txt."""
import argparse, json, subprocess, sys, shutil, time
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'); H = W / 'harness'; L = W / 'lanes/mg-P-z08b'
sys.path.insert(0, str(H)); import fastbuild  # noqa
ap = argparse.ArgumentParser(); ap.add_argument('name'); ap.add_argument('--src', type=Path); ap.add_argument('--wins', default='')
ap.add_argument('--baseline', type=Path, default=W / 'base/L29/inventory.json')
a = ap.parse_args()
vd = L / 'v' / a.name; src = a.src or (vd / 'src'); work = vd / 'work'; out = vd / 'out'
vd.mkdir(parents=True, exist_ok=True)
if not work.exists():
    subprocess.run(['cp', '-c', '-R', str(L / 'work'), str(work)], check=True)
r = fastbuild.build(src, work, out, quiet=True)
line = f"{time.strftime('%H:%M')} {a.name} "
if not r['ok']:
    log = (out / 'build.log').read_text().splitlines(); errs = [l for l in log if l.startswith('error')][:6]
    line += 'BUILD-FAIL ' + ' | '.join(errs)
    print(line); print('\n'.join([l for l in log if 'error' in l or '-->' in l][:20]))
else:
    s = subprocess.run([sys.executable, '-B', str(H / 'score.py'), str(out / 'unstripped.so'), '--baseline', str(a.baseline), '--json', str(out / 'score.json'), '--quiet'], capture_output=True, text=True)
    sc = json.loads(s.stdout)
    line += f"N={sc['normalized']} R={sc['raw']} gains={sc['gains']} losses={sc['losses']} rawg={sc['raw_gains']} rawl={sc['raw_losses']} valid={r['runtime_valid']} t={r['seconds']}"
    print(line)
    st = subprocess.run([sys.executable, '-B', str(L / 'tools/st.py'), str(out / 'unstripped.so')] + ([w for w in a.wins.split(',') if w]), capture_output=True, text=True)
    print(st.stdout.strip()); line += '\n    ' + st.stdout.strip().replace('\n', '\n    ')
with open(L / 'vlog.txt', 'a') as f: f.write(line + '\n')
