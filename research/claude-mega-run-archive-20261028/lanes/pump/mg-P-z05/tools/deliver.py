#!/usr/bin/env python3
"""deliver.py VARDIR OUTNAME NN SYNTH(0/1) "summary" README_FILE
copies VARDIR (crate) + out/OUTNAME/{unstripped.so,candidate.so,build.log,score.json} to W/deliveries/mg-P-z05-NN, patch.diff vs base L21."""
import sys,os,json,hashlib,re,shutil,subprocess
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'; L=W+'/lanes/mg-P-z05'
BASE_SRC=W+'/base/L27/pump'; BASE_ROUND='L27'; BASE_SHA='2e1e1d2077d189bb8c0c6c7a2146d6141429eadd5d48e275704146f697e74170'
var,outn,nn,synth,summary,readme=sys.argv[1:7]
O=f'{L}/out/{outn}'; D=f'{W}/deliveries/mg-P-z05-{nn}'
assert not os.path.exists(D), 'exists '+D
s=json.load(open(O+'/score.json'))['summary']
assert s['losses']==[] and s['raw_losses']==[] and s['gains'], s
j=json.load(open(f'{L}/out/{outn}.json'))['build']
assert j['ok'] and j['runtime_valid'] and not j['stack_warnings'], j
assert 'Stack offset' not in open(O+'/build.log').read()
os.makedirs(D); shutil.copytree(var,D+'/src',symlinks=True,ignore=shutil.ignore_patterns('target'))
for f in ('unstripped.so','candidate.so','build.log','score.json'): shutil.copy2(f'{O}/{f}',D)
p=subprocess.run(['diff','-ruN','-x','target',BASE_SRC,var],capture_output=True,text=True).stdout
open(D+'/patch.diff','w').write(p)
files=sorted(set(re.findall(r'^\+\+\+ '+re.escape(var.rstrip('/'))+r'/(\S+)',p,re.M)))
d=dict(lane='mg-P-z05',base_round=BASE_ROUND,base_unstripped_sha256=BASE_SHA,
 unstripped_sha256=hashlib.sha256(open(D+'/unstripped.so','rb').read()).hexdigest(),
 normalized=s['normalized'],raw=s['raw'],gains=s['gains'],losses=s['losses'],raw_gains=s['raw_gains'],raw_losses=s['raw_losses'],
 runtime_valid=j['runtime_valid'],stack_warnings=j['stack_warnings'],synthetic_layout=bool(int(synth)),files_changed=files,summary=summary,
 patch_base=BASE_SRC)
json.dump(d,open(D+'/delivery.json','w'),indent=1)
shutil.copy2(readme,D+'/README.md')
print(D, json.dumps({k:d[k] for k in ('normalized','raw','gains','files_changed','unstripped_sha256')}))
