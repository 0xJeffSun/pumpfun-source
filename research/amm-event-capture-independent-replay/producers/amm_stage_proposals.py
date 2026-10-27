from pathlib import Path
import importlib.util,json,subprocess,hashlib,shutil
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');B=Path('/home/ahi200/pumpfun-work/20261027-amm-event-replay')
spec=importlib.util.spec_from_file_location('recipe',R/'repro/pump_amm/account-context-recovery-20261027/workspace_recipe_v2.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
old=R/'repro/pump_amm/native-fee-cpi-recovery-20261027/results/canonical-source'
if not old.exists():
 old=R/'repro/pump_amm/native-fee-cpi-recovery-20261027/results/source'
 assert m.tomllib.loads((old/'programs/pump-amm/Cargo.toml').read_text()).get('workspace')=={},'Need canonical standalone historical source'
m.stage(old,B/'historical-source')
relative='programs/pump-amm/src/instructions/swap/trade_v2.rs'
patch=R/'research/claude-amm-mid-20261027/source.patch'
for label,parent in [('historical-proposal','historical-source'),('current-proposal','control-source')]:
 out=B/label;shutil.copytree(B/parent,out)
 cmd=['git','apply','--check',str(patch)]
 p=subprocess.run(cmd,cwd=out,capture_output=True,text=True);assert p.returncode==0,p.stderr
 p=subprocess.run(['git','apply',str(patch)],cwd=out,capture_output=True,text=True);assert p.returncode==0,p.stderr
 before={str(f.relative_to(B/parent)):hashlib.sha256(f.read_bytes()).hexdigest() for f in (B/parent).rglob('*') if f.is_file()}
 after={str(f.relative_to(out)):hashlib.sha256(f.read_bytes()).hexdigest() for f in out.rglob('*') if f.is_file()}
 assert set(before)==set(after) and [n for n in before if before[n]!=after[n]]==[relative]
 (B/(label+'-source-delta.json')).write_text(json.dumps({'source_patch_sha256':hashlib.sha256(patch.read_bytes()).hexdigest(),'changed':[relative],'before':before[relative],'after':after[relative]},indent=2)+'\n')
 print(label,after[relative],flush=True)
