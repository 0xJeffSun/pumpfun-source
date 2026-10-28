#!/usr/bin/env python3
"""Build + score one trial source tree against the g04 baseline.

  trial.py <name> [--slot N] [--src DIR]   (default src = trials/<name>)

fastbuild.py takes one of the 6 shared `sbf` slots in claude-pump-work/locks itself (the same
lock files sbf_lock.py uses), so it is not wrapped again. Writes out/<name>/{unstripped,candidate}.so,
out/<name>.fb.json and out/<name>.score.json; prints gains/losses vs g04 (806).
"""
import argparse, json, subprocess, sys, time
from pathlib import Path
DW = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/pump-big-lo')
CPW = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work')
SP = Path('/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bf960843-6806-451b-a211-62c8b228d301/scratchpad')
ap = argparse.ArgumentParser()
ap.add_argument('name'); ap.add_argument('--slot', type=int, default=0); ap.add_argument('--src', type=Path)
a = ap.parse_args()
src = a.src or DW / 'trials' / a.name
out = DW / 'out' / a.name
work = SP / 'lanes/pump-big-lo/target' / f'fb{a.slot}'
t0 = time.time()
r = subprocess.run([sys.executable, '-B', str(CPW / 'harness/fastbuild.py'), '--src', str(src), '--work', str(work), '--out', str(out)],
                   stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
(DW / 'out' / f'{a.name}.fb.json').write_text(r.stdout)
if r.returncode != 0:
    print(json.dumps({'name': a.name, 'ok': False, 'stderr': r.stderr[-3000:], 'log_tail': (out / 'build.log').read_text()[-4000:] if (out / 'build.log').exists() else ''}))
    sys.exit(1)
fb = json.loads(r.stdout)
s = subprocess.run([sys.executable, '-B', str(CPW / 'harness/score.py'), str(out / 'unstripped.so'), '--baseline', str(CPW / 'base/g04/inventory.json'),
                    '--json', str(DW / 'out' / f'{a.name}.score.json'), '--quiet'], stdout=subprocess.PIPE, text=True, check=True)
summ = json.loads(s.stdout)
print(json.dumps({'name': a.name, 'runtime_valid': fb['runtime_valid'], 'stack': fb['stack_warnings'], 'secs': round(time.time() - t0),
                  'normalized': summ['normalized'], 'raw': summ['raw'], 'gains': summ['gains'], 'losses': summ['losses'],
                  'raw_gains': summ['raw_gains'], 'raw_losses': summ['raw_losses'], 'unstripped_sha256': fb['unstripped_sha256']}))
