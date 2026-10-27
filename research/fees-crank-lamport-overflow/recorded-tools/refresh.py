from pathlib import Path
import json,hashlib,shutil,subprocess
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');old=Path('/home/ahi200/pumpfun-work/20261027-crank');B=Path('/home/ahi200/pumpfun-work/20261027-crank-current');B.mkdir()
rev=subprocess.check_output(['git','log','-1','--format=%H','--','research/fees-instruction-visibility'],cwd=R,text=True).strip()
name='programs/pump-fees/src/lib.rs';path='research/fees-instruction-visibility/overrides/origins/'+name
data=subprocess.check_output(['git','show',rev+':'+path],cwd=R)
assert data==(old/'baseline-source'/name).read_bytes().replace(b'mod instructions;',b'pub mod instructions;')
for label in ['baseline','control','proposal']:
    shutil.copytree(old/(label+'-source'),B/(label+'-source'));(B/(label+'-source')/name).write_bytes(data)
mapping=json.loads((old/'baseline-sources.json').read_bytes());mapping[name]=dict(revision=rev,path=path,sha256=hashlib.sha256(data).hexdigest())
(B/'baseline-sources.json').write_text(json.dumps(mapping,indent=2,sort_keys=True)+'\n')
shutil.copyfile(old/'control-parent.json',B/'control-parent.json')
print('Current baseline input',mapping[name])
