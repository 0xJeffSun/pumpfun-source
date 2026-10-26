"""Pure source/material checks for one implementation build; no native launcher here."""
from pathlib import Path
import ast,hashlib,importlib.util,json,tomllib
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def safe(n):
 p=Path(n);assert not p.is_absolute()and'..'not in p.parts;return p

def verify(repo=None,availability=False):
 m=J(P/'MANIFEST.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f.name!='MANIFEST.json'}
 for n,h in m.items():assert H(P/safe(n))==h,n
 for f in P.rglob('*'):assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'
 old=J(P/'predecessor-materials-manifest.json');assert H(P/'predecessor-materials-manifest.json')=='886910366f561a776c7ddb5c910481a576d4659d8bc2e7e61a608c592dbf9146'
 for n in ['availability.json','cache-allowlist.json',*J(P/'future-plan.json')['helper_sha256']]:
  location=('helpers/'+n)if n.startswith('scripts/')else n;assert H(P/location)==old[location]
 q=P/'source-proposal';assert H(q/'manifest.json')=='4e72efa4fadf5bed345b24d78ce4e9362105d89f3eccf858357905c045bcaefd'
 for n,row in J(q/'manifest.json').items():assert H(q/n)==row['sha256']and(q/n).stat().st_size==row['bytes']
 baseline=J(P/'source-baseline.json');proposed=J(P/'source-proposed.json');assert baseline==J(q/'source-baseline.json')and proposed==J(q/'source-proposed.json')
 assert len(baseline)==len(proposed)==37 and[n for n in baseline if baseline[n]!=proposed[n]]==['programs/pump/src/admin_cto.rs']
 actual={str(f.relative_to(P/'source')):H(f)for f in(P/'source').rglob('*')if f.is_file()};assert actual==proposed
 for n,h in proposed.items():assert H(q/'source'/n)==h
 assert H(P/'source/programs/pump/src/admin_cto.rs')=='d6b4937f03a62c013baca8d93bf1be72f035681e17a6a86e19df204c57cce457'
 for name,h in baseline.items():
  if repo:assert H(Path(repo)/safe(name))==h,name
 # Import only the unchanged pure source scanner, never build_partial_candidate.
 sp=importlib.util.spec_from_file_location('wallet_static_scanner',P/'helpers/scripts/build_source_manifest.py');scanner=importlib.util.module_from_spec(sp);sp.loader.exec_module(scanner)
 assert scanner.source_manifest(P/'source/programs/pump',P/'source/programs/pump',P/'source',[],cwd=P/'source')==proposed
 for n,h in J(P/'future-plan.json')['helper_sha256'].items():assert H(P/'helpers'/n)==h;ast.parse((P/'helpers'/n).read_text())
 profile=tomllib.loads((P/'source/programs/pump/Cargo.toml').read_text())['profile']['release'];assert profile=={'panic':'abort','overflow-checks':True,'lto':False,'codegen-units':1}
 assert proposed['programs/pump/Cargo.lock']==baseline['programs/pump/Cargo.lock']
 lock=tomllib.loads((P/'source/programs/pump/Cargo.lock').read_text());allowed={r['name']+'-'+r['version']:r['checksum']for r in lock['package']if r.get('source')};cache=J(P/'cache-allowlist.json');assert len(allowed)==cache['lock_packages']==252
 for n,row in cache['files'].items():
  f=safe(n);assert f.parts[0]=='registry'and f.parts[1]in['cache','src','index']
  if f.parts[1]=='cache':assert f.name.endswith('.crate')and row['sha256']==allowed[f.name[:-6]]
  if f.parts[1]=='src':assert f.parts[3]in allowed
 plan=J(P/'future-plan.json');assert plan['proposed_program_build_attempts']==1 and plan['runtime_executions_permitted']==0 and not plan['current_source_status_default_pointer_writes_permitted']and plan['candidate_disposition']=='UNSELECTED'
 assert plan['baseline_candidate']=='71ec4d8a646eefc82ba177afbc3d08552deadd65cf2f80ec280862eb768d059c'and plan['source_proposal_seal']==H(q/'manifest.json')
 if availability:
  a=J(P/'availability.json')
  for v in a['tools'].values():assert H(Path(v['path']))==v['sha256']
  sdk=Path(a['sdk_source']);assert{str(f.relative_to(sdk)):H(f)for f in sdk.rglob('*')if f.is_file()and'dependencies'not in f.relative_to(sdk).parts}==a['sdk_source_sha256']
  for row in cache['files'].values():assert H(Path(row['source']))==row['sha256']
 return {'status':'VERIFIED_UNEXECUTED_WALLET_BUILD_PLAN','source_inputs':37,'other36_unchanged':True,'source_proposal_seal':H(q/'manifest.json'),'candidate_disposition':'UNSELECTED','actual_source_baseline_checked':bool(repo),'material_availability_rehashed':availability,'new_builds':0,'runtime_executions':0,'compiler_strip_child_exits_will_remain_unobserved':True}
if __name__=='__main__':
 import argparse
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path);p.add_argument('--availability',action='store_true');a=p.parse_args();print(json.dumps(verify(a.repo,a.availability),indent=2))
