#!/usr/bin/env python3
# deliver.py <exp> <NN> <summary> <readme-file> files...   (cumulative delivery of exp/<exp>)
import sys, json, shutil, subprocess, hashlib, os
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'; L = W + '/lanes/mg-P-z02'
import os as _os
BASEDIR = _os.environ.get('BASEDIR', W + '/deliveries/r5-z02-02')  # L13: W/base/L13
START = BASEDIR
e, nn, summary, readme = sys.argv[1:5]; files = sys.argv[5:]
d = f'{W}/deliveries/mg-P-z02-{nn}'; assert not os.path.exists(d), d
ex = f'{L}/exp/{e}'
sc = json.load(open(ex + '/score.json')); s = sc['summary']; lg = open(ex + '/build.log').read()
assert s['losses'] == [] and s['raw_losses'] == [] and s['gains'] and '"runtime_valid": true' in lg and '"stack_warnings": []' in lg
# L12-relative score too
l12 = subprocess.run(['python3', '-B', W + '/harness/score.py', ex + '/out/unstripped.so', '--quiet', '--json', ex + '/score_L12.json', '--baseline', W + '/base/L12/inventory.json'], capture_output=True, text=True)
s12 = json.load(open(ex + '/score_L12.json'))['summary']
os.makedirs(d); shutil.copytree(ex + '/src', d + '/src')
p = subprocess.run(['diff', '-ruN', (W + '/base/L13/pump') if START.endswith('L13') else (W + '/base/current/pump'), ex + '/src'], capture_output=True, text=True).stdout
open(d + '/patch.diff', 'w').write(p)
p2 = subprocess.run(['diff', '-ruN', (START + '/pump') if START.endswith('L13') else (START + '/src'), ex + '/src'], capture_output=True, text=True).stdout
open(d + '/patch_vs_start.diff', 'w').write(p2)
for f in ['unstripped.so', 'candidate.so']: shutil.copy(f'{ex}/out/{f}', d + '/' + f)
shutil.copy(ex + '/build.log', d + '/build.log'); shutil.copy(ex + '/score.json', d + '/score.json')
shutil.copy(ex + '/score_L12.json', d + '/score_L12.json')
h = lambda f: hashlib.sha256(open(f, 'rb').read()).hexdigest()
dj = dict(lane='mg-P-z02', base_round=('L13' if START.endswith('L13') else 'r5-z02-02'), base_unstripped_sha256=h(START + '/unstripped.so'), unstripped_sha256=h(d + '/unstripped.so'),
          candidate_sha256=h(d + '/candidate.so'),
          normalized=s['normalized'], raw=s['raw'], gains=s['gains'], losses=s['losses'], raw_gains=s['raw_gains'], raw_losses=s['raw_losses'],
          gains_vs_L12=s12['gains'], losses_vs_L12=s12['losses'], raw_losses_vs_L12=s12['raw_losses'],
          runtime_valid=True, synthetic_layout=True, files_changed=files, summary=summary)
json.dump(dj, open(d + '/delivery.json', 'w'), indent=1)
shutil.copy(readme, d + '/README.md')
print(d, s['normalized'], s['raw'], s['gains'], 'vsL12', s12['normalized'], len(s12['gains']), s12['losses'], s12['raw_losses'])
