#!/usr/bin/env python3
"""deliver.py VARIANT NN BASE_SRC BASE_ROUND BASE_SHA SYNTH(0/1) "summary" README_FILE
copies v/VARIANT/{src,out/*.so,build.log,score.json} to W/deliveries/mg-P-z07-NN with patch.diff vs BASE_SRC."""
import sys,os,json,hashlib,re,shutil,subprocess
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'; L=W+'/lanes/mg-P-z07'
var,nn,base_src,base_round,base_sha,synth,summary,readme=sys.argv[1:9]
V=f'{L}/v/{var}'; D=f'{W}/deliveries/mg-P-z07-{nn}'
assert not os.path.exists(D), 'exists '+D
s=json.load(open(V+'/score.json'))['summary']
assert s['losses']==[] and s['raw_losses']==[] and s['gains'], s
b=open(V+'/build.log').read(); j=json.loads(b[b.rindex('\n{')+1:]) if '\n{' in b else json.loads(b[b.index('{'):])
assert j['ok'] and j['runtime_valid'] and not j['stack_warnings'], j
os.makedirs(D); shutil.copytree(V+'/src',D+'/src',symlinks=True)
for f in ('unstripped.so','candidate.so'): shutil.copy2(f'{V}/out/{f}',D)
shutil.copy2(V+'/build.log',D); shutil.copy2(V+'/score.json',D)
p=subprocess.run(['diff','-ruN','-x','target',base_src,V+'/src'],capture_output=True,text=True).stdout
open(D+'/patch.diff','w').write(p)
files=sorted(set(re.findall(r'^\+\+\+ \S+?/v/'+var+r'/src/(\S+)',p,re.M)))
d=dict(lane='mg-P-z07',base_round=base_round,base_unstripped_sha256=base_sha,
 unstripped_sha256=hashlib.sha256(open(D+'/unstripped.so','rb').read()).hexdigest(),
 normalized=s['normalized'],raw=s['raw'],gains=s['gains'],losses=s['losses'],raw_gains=s['raw_gains'],raw_losses=s['raw_losses'],
 runtime_valid=j['runtime_valid'],stack_warnings=j['stack_warnings'],synthetic_layout=bool(int(synth)),files_changed=files,summary=summary,
 patch_base=base_src)
json.dump(d,open(D+'/delivery.json','w'),indent=1)
shutil.copy2(readme,D+'/README.md')
print(json.dumps({k:d[k] for k in ('normalized','raw','gains','files_changed')}))
