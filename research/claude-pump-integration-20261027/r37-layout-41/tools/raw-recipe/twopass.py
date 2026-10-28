#!/usr/bin/env python3
"""[mg-P-raw] two-pass build + measure: pbuild (default link) -> pgen -> prelink -> score -> prawready -> cst shard diffs.
usage: twopass.py SRC OUTDIR [--baseline INV]   (OUTDIR/p1 = default link, OUTDIR/p2 = ordered relink)"""
import json, subprocess, sys
from pathlib import Path
T = Path(__file__).resolve().parent; W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work')
src, out = Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve()
base = sys.argv[sys.argv.index('--baseline') + 1] if '--baseline' in sys.argv else str(W / 'base/L28/inventory.json')
work = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-raw/work')
py = [sys.executable, '-B']
r = subprocess.run(py + [str(T / 'pbuild.py'), '--src', str(src), '--work', str(work), '--out', str(out / 'p1'), '--baseline', base], capture_output=True, text=True)
res = json.loads((out / 'p1/result.json').read_text()) if (out / 'p1/result.json').exists() else {'ok': False, 'stdout': r.stdout[-3000:]}
if not res.get('ok'):
    print(json.dumps(res, indent=1)[:3000]); sys.exit(1)
print('p1', json.dumps({k: res[k] for k in ('runtime_valid', 'seconds', 'unstripped_sha256')}), json.dumps({k: (v if not isinstance(v, list) else len(v)) for k, v in res['score'].items()}))
subprocess.run(py + [str(T / 'pgen.py'), str(out / 'p1'), str(out / 'ordered.ld')], check=True, capture_output=True)
subprocess.run(py + [str(T / 'prelink.py'), str(out / 'p1'), str(out / 'ordered.ld'), str(out / 'p2')], check=True, capture_output=True)
s = subprocess.run(py + [str(W / 'harness/score.py'), str(out / 'p2/unstripped.so'), '--baseline', base, '--json', str(out / 'p2/score.json'), '--quiet'], capture_output=True, text=True)
sc = json.loads(s.stdout)
print('p2 normalized %d raw %d gains %s losses %s raw_gains %d raw_losses %s' % (sc['normalized'], sc['raw'], sc['gains'], sc['losses'], len(sc['raw_gains']), sc['raw_losses']))
for f in ('link', ):
    (out / 'p2/link').mkdir(exist_ok=True)
    (out / 'p2/link/link.map').write_bytes((out / 'p2/link.map').read_bytes())
rr = subprocess.run(py + [str(T / 'prawready.py'), str(out / 'p2'), '--json', str(out / 'p2/rawready.json'), '--quiet'], capture_output=True, text=True)
print(rr.stdout.strip()[:600])
for n in (4, 8, 16, 32):
    cs = subprocess.run(py + [str(T / 'cst.py'), str(out / 'p2'), str(n)], capture_output=True, text=True)
    print('cst%d shards differing: %d' % (n, cs.stdout.count('shard ')), cs.stdout.splitlines()[0] if cs.stdout else cs.stderr[-300:])
