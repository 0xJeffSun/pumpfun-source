#!/usr/bin/env python3
"""deliver.py NN <variant out dir> <src dir> "<summary>" <readme.md path> : write deliveries/mg-P-z08-NN (refuses to overwrite)."""
import sys, json, hashlib, shutil, subprocess
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'); BASE = W / 'base/L15'
nn, out, src, summary, readme = sys.argv[1], Path(sys.argv[2]), Path(sys.argv[3]), sys.argv[4], Path(sys.argv[5])
d = W / 'deliveries' / f'mg-P-z08-{nn}'
assert not d.exists(), f'{d} exists'
sc = json.load(open(out / 'score.json'))
summ = sc.get('summary', sc)
assert summ['gains'] and not summ['losses'] and not summ['raw_losses'], summ
log = (out / 'build.log').read_text(); stack = [l.strip() for l in log.splitlines() if 'exceeded max offset' in l]
assert not stack, stack
d.mkdir(parents=True)
subprocess.run(['cp', '-c', '-R', str(src), str(d / 'src')], check=True)
for t in ('target',):
    shutil.rmtree(d / 'src' / t, ignore_errors=True)
for f in ('unstripped.so', 'candidate.so', 'build.log', 'score.json'):
    shutil.copy2(out / f, d / f)
p = subprocess.run(['diff', '-ruN', str(BASE / 'pump'), str(src), '-x', 'target'], capture_output=True, text=True).stdout
(d / 'patch.diff').write_text(p)
files = sorted({l.split('\t')[0].split()[-1].replace(str(src) + '/', '') for l in p.splitlines() if l.startswith('+++ ')} )
sha = lambda f: hashlib.sha256(Path(f).read_bytes()).hexdigest()
dj = {'lane': 'mg-P-z08', 'base_round': 'L15', 'base_unstripped_sha256': sha(BASE / 'unstripped.so'), 'unstripped_sha256': sha(out / 'unstripped.so'),
      'normalized': summ['normalized'], 'raw': summ['raw'], 'gains': summ['gains'], 'losses': summ['losses'], 'raw_gains': summ['raw_gains'],
      'raw_losses': summ['raw_losses'], 'runtime_valid': True, 'stack_warnings': [], 'synthetic_layout': True, 'files_changed': files,
      'summary': summary, 'patch_base': str(BASE / 'pump')}
(d / 'delivery.json').write_text(json.dumps(dj, indent=1) + '\n')
shutil.copy2(readme, d / 'README.md')
print(d, dj['normalized'], dj['raw'], dj['gains'], files)
