from pathlib import Path
import importlib.util,shutil,subprocess,json,hashlib
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');B=Path('/home/ahi200/pumpfun-work/20261027-amm-event-replay')
P=R/'repro/pump_amm/guard-data-recovery-20261027'
s=importlib.util.spec_from_file_location('recipe',P/'workspace_recipe_v2.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
m.stage(P/'results/canonical-source',B/'latest-control-source')
shutil.copytree(B/'latest-control-source',B/'latest-proposal-source')
subprocess.run(['git','apply',str(R/'research/claude-amm-mid-20261027/source.patch')],cwd=B/'latest-proposal-source',check=True)
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a={f.relative_to(B/'latest-control-source').as_posix():H(f) for f in (B/'latest-control-source').rglob('*') if f.is_file()};b={f.relative_to(B/'latest-proposal-source').as_posix():H(f) for f in (B/'latest-proposal-source').rglob('*') if f.is_file()}
assert set(a)==set(b) and [n for n in a if a[n]!=b[n]]==['programs/pump-amm/src/instructions/swap/trade_v2.rs']
(B/'latest-source-delta.json').write_text(json.dumps({'before':a,'after':b,'changed':[n for n in a if a[n]!=b[n]]},indent=2)+'\n')
print(len(a),'workspace files; exact public patch applied')
