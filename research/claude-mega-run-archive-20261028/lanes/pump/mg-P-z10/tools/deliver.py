#!/usr/bin/env python3
"""deliver.py <NN> <exp> <summary> [readme_extra_file]: write W/deliveries/mg-P-z10-NN from exp/<exp> (base L17). Refuses to overwrite."""
import sys, json, os, shutil, subprocess, hashlib
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'; L=W+'/lanes/mg-P-z10'
nn, exp, summary = sys.argv[1], sys.argv[2], sys.argv[3]
extra = open(sys.argv[4]).read() if len(sys.argv) > 4 else ''
BASE = W+'/base/L17'
E = f'{L}/exp/{exp}'; D = f'{W}/deliveries/mg-P-z10-{nn}'
assert not os.path.exists(D), 'delivery exists'
sc = json.load(open(E+'/score.json'))['summary']
lg = open(E+'/build.log').read()
rv = '"runtime_valid": true' in lg; sw = '"stack_warnings": []' in lg
assert sc['gains'] and not sc['losses'] and not sc['raw_losses'] and rv and sw, 'not a clean win'
os.makedirs(D)
subprocess.run(['cp', '-c', '-R', E+'/src', D+'/src'], check=True)
diff = subprocess.run(['diff', '-ruN', BASE+'/pump', E+'/src'], capture_output=True, text=True).stdout
open(D+'/patch.diff', 'w').write(diff)
files = sorted({l[4:].split('\t')[0].replace(E+'/src/', '') for l in diff.splitlines() if l.startswith('+++ ')})
for f in ('unstripped.so', 'candidate.so'): shutil.copy(E+'/out/'+f, D+'/'+f)
shutil.copy(E+'/build.log', D+'/build.log'); shutil.copy(E+'/score.json', D+'/score.json')
h = lambda p: hashlib.sha256(open(p, 'rb').read()).hexdigest()
base_sha = json.load(open(BASE+'/inventory.json'))['summary']['candidate_sha256']
d = dict(lane='mg-P-z10', base_round='L17', base_unstripped_sha256=base_sha, unstripped_sha256=h(D+'/unstripped.so'),
         normalized=sc['normalized'], raw=sc['raw'], gains=sc['gains'], losses=sc['losses'], raw_gains=sc['raw_gains'],
         raw_losses=sc['raw_losses'], runtime_valid=rv, stack_warnings=[], synthetic_layout=True, files_changed=files,
         summary=summary, patch_base=BASE+'/pump')
json.dump(d, open(D+'/delivery.json', 'w'), indent=1)
open(D+'/README.md', 'w').write(f'# mg-P-z10-{nn}\n\nBase: L17 ({base_sha[:12]}). Result: {sc["normalized"]}/1035 normalized, {sc["raw"]} raw; gains {sc["gains"]}, no losses, runtime_valid, no stack warnings.\nsynthetic_layout: true (inherited from the L17 layout composite; this delivery adds no layout pads).\n\n{summary}\n\n{extra}\n')
print(D, d['normalized'], d['raw'], d['gains'], files)
