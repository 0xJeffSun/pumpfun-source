#!/usr/bin/env python3
"""deliver.py <variant_dir> <out_dir> <NN> <summary> [--synthetic] [--readme FILE]: write W/deliveries/mg-P-z04-NN (never overwrite)."""
import sys, json, shutil, subprocess, hashlib, os
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'; BASE = W + '/base/L20'
src, out, nn, summary = sys.argv[1:5]; synth = '--synthetic' in sys.argv
readme = sys.argv[sys.argv.index('--readme') + 1] if '--readme' in sys.argv else None
d = f'{W}/deliveries/mg-P-z04-{nn}'
assert not os.path.exists(d), 'exists: ' + d
nb = json.load(open(out + '/nbuild.json')); sc = json.load(open(out + '/score.json'))
b = nb['build']; s = nb['score']
assert b['ok'] and b['runtime_valid'] and not b['stack_warnings'] and s['gains'] and not s['losses'] and not s['raw_losses'], (b, s)
os.makedirs(d)
subprocess.run(['cp', '-c', '-R', src, d + '/src'], check=True)
for f in ('unstripped.so', 'candidate.so', 'build.log', 'score.json'): shutil.copy2(f'{out}/{f}', f'{d}/{f}')
patch = subprocess.run(['diff', '-ruN', BASE + '/pump', src], capture_output=True, text=True).stdout
open(d + '/patch.diff', 'w').write(patch)
files = sorted({l.split()[1].replace(BASE + '/pump/', '') for l in patch.splitlines() if l.startswith('--- ')})
sha = lambda p: hashlib.sha256(open(p, 'rb').read()).hexdigest()
base_sha = json.load(open(BASE + '/inventory.json'))['summary']['candidate_sha256'] if False else sha(BASE + '/unstripped.so')
dj = {'lane': 'mg-P-z04', 'base_round': 'L20', 'base_unstripped_sha256': base_sha, 'unstripped_sha256': sha(d + '/unstripped.so'),
      'candidate_sha256': sha(d + '/candidate.so'), 'normalized': s['normalized'], 'raw': s['raw'], 'gains': s['gains'], 'losses': s['losses'],
      'raw_gains': s['raw_gains'], 'raw_losses': s['raw_losses'], 'runtime_valid': b['runtime_valid'], 'stack_warnings': b['stack_warnings'],
      'synthetic_layout': synth, 'files_changed': files, 'summary': summary, 'patch_base': BASE + '/pump'}
json.dump(dj, open(d + '/delivery.json', 'w'), indent=1)
if readme: shutil.copy2(readme, d + '/README.md')
print(d, s['normalized'], s['raw'], s['gains'])
