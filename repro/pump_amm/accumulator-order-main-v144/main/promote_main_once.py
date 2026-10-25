#!/usr/bin/env python3
"""Prepared only: root executes one explicit main promotion/build after reviewing sealed proof."""
from pathlib import Path
import argparse,hashlib,json,os,shutil,subprocess,sys
ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path,required=True);ap.add_argument('--output',type=Path,required=True);ap.add_argument('--cargo-home',type=Path,required=True);a=ap.parse_args()
R=a.repo.resolve();W=a.output.resolve();P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
pre=J(P/'promotion-preconditions.json');assert not W.exists(),'One clean attempt only; preserve any existing failed output.'
for n,h in J(P/'manifest.json')['files'].items():assert H(P/n)==h,n
for n,h in pre['source'].items():assert H(R/n)==h,n
assert H(R/'programs/pump-amm/README.md')==pre['readme_sha256']
checks=J(P/'tools-before.json')
for n,row in checks['tools'].items():assert H(Path(n))==row['sha256'],n
for f in (P/'source/scripts').iterdir():assert H(R/'scripts'/f.name)==H(f),f.name
sdk=Path(next(iter(checks['tools']))).parent/'sdk/sbf'
for n,h in checks['sdk_source'].items():assert H(sdk/n)==h,n
W.mkdir(parents=True);shutil.copytree(a.cargo_home/'registry',W/'cargo-home/registry',ignore=shutil.ignore_patterns('*-keypair.json'))
# Use the exact archive/member integrity checker, now rooted at the explicit promotion output.
cp=P/'check_dependencies.py'
if not cp.exists():raise RuntimeError('Missing sealed cache checker')
shutil.copy2(cp,W/'check_dependencies.py');(W/'source/programs/pump-amm').mkdir(parents=True);shutil.copy2(R/'programs/pump-amm/Cargo.lock',W/'source/programs/pump-amm/Cargo.lock')
def run(cmd,name,env=None):
 p=subprocess.run(cmd,cwd=R,env=env,capture_output=True,text=True);(W/(name+'.stdout')).write_text(p.stdout);(W/(name+'.stderr')).write_text(p.stderr);(W/(name+'-exit.json')).write_text(json.dumps({'returncode':p.returncode})+'\n');p.check_returncode()
run([sys.executable,'-B',str(W/'check_dependencies.py')],'dependencies-before')
shutil.copy2(W/'dependency-integrity.json',W/'dependency-integrity-before.json')
for n in ['programs/pump-amm/src/lib.rs','programs/pump-amm/README.md']:
 shutil.copy2(P/'proposal'/n,R/n)
for n,h in pre['proposed_source'].items():assert H(R/n)==h,n
(W/'source-before.json').write_text(json.dumps(pre['proposed_source'],indent=2)+'\n')
cmd=[sys.executable,'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump-amm/Cargo.toml'),'--program','pump_amm','--artifact-name','pump_amm_recovered.so','--tools-version','v1.44','--output',str(W/'build-01')]
env={**os.environ,'CARGO_HOME':str(W/'cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'}
(W/'build-launch.json').write_text(json.dumps({'command':cmd,'environment_overrides':{k:env[k]for k in ['CARGO_HOME','CARGO_NET_OFFLINE','PYTHONDONTWRITEBYTECODE']},'attempt_limit':1},indent=2)+'\n')
run(cmd,'build',env)
for n,h in pre['proposed_source'].items():assert H(R/n)==h,n
assert H(R/'programs/pump-amm/README.md')==pre['proposed_readme_sha256']
for n,row in checks['tools'].items():assert H(Path(n))==row['sha256'],n
for n,h in checks['sdk_source'].items():assert H(W/'build-01/sdk'/n)==h,n
run([sys.executable,'-B',str(W/'check_dependencies.py')],'dependencies-after')
shutil.copy2(W/'dependency-integrity.json',W/'dependency-integrity-after.json');assert J(W/'dependency-integrity-before.json')==J(W/'dependency-integrity-after.json')
c=W/'build-01/artifacts/pump_amm_recovered.so';s=W/'build-01/target/sbf-solana-solana/release/pump_amm_recovered.so'
identity={'candidate_sha256':H(c),'symbols_sha256':H(s),'whole_candidate_equal':c.read_bytes()==(P/'candidate.so').read_bytes(),'whole_symbols_equal':s.read_bytes()==(P/'unstripped.so').read_bytes(),'source':pre['proposed_source'],'README_sha256':H(R/'programs/pump-amm/README.md')}
(W/'identity.json').write_text(json.dumps(identity,indent=2)+'\n');assert identity['whole_candidate_equal'] and identity['whole_symbols_equal'],'Do not transfer receipts; identity failed'
print(json.dumps(identity,indent=2))
