#!/usr/bin/env python3
# deliver.py <resname> <srcdir> <summary> <readme-file>   (env SYNTH=0 to mark synthetic_layout false)
import sys, json, os, shutil, subprocess, hashlib
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'; L=W+'/lanes/mg-P-lib'
BASEN=os.environ.get('BASE','L13')
START=W+'/deliveries/r5-libinst-06'
res, src, summary, readme = sys.argv[1:5]
R=f'{L}/res/{res}'
sc=json.load(open(f'{L}/res/{res}.score.json'))['summary']
log=open(f'{L}/res/{res}.log').read()
jp=f'{L}/res/{res}.json'
if os.path.exists(jp):
    b=json.load(open(jp))['build']; assert b['ok'] and b['runtime_valid'] and not b['stack_warnings']
else: assert '"runtime_valid": true' in log
assert 'exceeded max offset' not in log
assert sc['gains'] and not sc['losses'] and not sc['raw_losses']
n=1
while os.path.exists(f'{W}/deliveries/mg-P-lib-{n:02d}'): n+=1
D=f'{W}/deliveries/mg-P-lib-{n:02d}'; os.makedirs(D)
shutil.copytree(src, D+'/src', ignore=shutil.ignore_patterns('target'))
diff=subprocess.run(['diff','-ruN',W+'/base/'+BASEN+'/pump',src],capture_output=True,text=True).stdout
open(D+'/patch.diff','w').write(diff)
files=sorted({l.split()[1].replace(src+'/','') for l in diff.splitlines() if l.startswith('+++ ')})
for f in ['unstripped.so','candidate.so']: shutil.copy(f'{R}/{f}', D+'/'+f)
shutil.copy(f'{L}/res/{res}.log', D+'/build.log'); shutil.copy(f'{L}/res/{res}.score.json', D+'/score.json')
sha=lambda p: hashlib.sha256(open(p,'rb').read()).hexdigest()
st=json.load(open(START+'/delivery.json'))
allg=sc['gains'] if BASEN!='L12' else sorted(set(st['gains'])|set(sc['gains']),key=lambda x:int(x,16))
d=dict(lane='mg-P-lib',base_round=BASEN if BASEN!='L12' else 'r5-libinst-06',prev_delivery=os.environ.get('PREV',''),base_unstripped_sha256=sha(W+'/base/'+BASEN+'/unstripped.so' if BASEN!='L12' else START+'/unstripped.so'),unstripped_sha256=sha(D+'/unstripped.so'),
 normalized=sc['normalized'],raw=sc['raw'],gains=sc['gains'],gains_vs_base=allg,losses=sc['losses'],raw_gains=sc['raw_gains'],raw_losses=sc['raw_losses'],
 own_gains=os.environ.get('OWN','').split(),ported=os.environ.get('PORTED',''),runtime_valid=True,synthetic_layout=os.environ.get('SYNTH','1')!='0',files_changed=files,summary=summary)
json.dump(d,open(D+'/delivery.json','w'),indent=1)
shutil.copy(readme, D+'/README.md')
print(D, sc['normalized'], sc['raw'], sc['gains'])
