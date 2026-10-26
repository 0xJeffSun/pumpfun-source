"""Read-only plan/source/tool/archive gate; no compiler/VM."""
from pathlib import Path
import json,hashlib,tomllib,importlib.util,difflib,os
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def cache_snapshots():
 rows={}
 for name,r in J(P/'launcher/tool-witness/runtime-cache-paths.json').items():
  root=Path(r['path']);files={}
  for p in sorted(root.rglob('*')):
   rel=str(p.relative_to(root))
   if p.is_symlink():files[rel]={'kind':'symlink','target':os.readlink(p)}
   elif p.is_file():files[rel]={'kind':'file','sha256':H(p),'bytes':p.stat().st_size,'mode':p.stat().st_mode&0o777}
  rows[name]={'path':str(root),'resolved_path':str(root.resolve()),'files':files}
 return rows

def verify(seal,repo):
 assert H(P/'manifest.json')==seal==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc' and p.name!='__pycache__'
 for n,h in m.items():assert H(P/n)==h,n
 z=J(P/'freeze.json');assert z['compile']=='v1.44' and z['strip']=='v1.52' and z['attempt_limit']==1 and z['runtime_authorized']is False
 assert z['source_proof_seal']==H(P/'source-proof/manifest.json')=='16c6edb658188b88cdee4691617aedbb7b652169d2425a8f89467376cc75e654';load(P/'source-proof/verify.py','owned_source_proof').verify()
 assert z['prior_build_plan_seal']==H(P/'prior-build-plan/manifest.json')=='376e1c9e57a1cf4c24c0d3a7581e3806e6d696a4f65547830be625f24fbe154f';load(P/'prior-build-plan/verify_plan.py','prior_plan').verify(z['prior_build_plan_seal'],repo)
 assert z['baseline_candidate_sha256']==H(P/'baseline-static/candidate.so')=='33d5264b90d9a32556918072837cfe9cff284c369b15c3e31c32344125d06cb6'
 assert z['baseline_symbols_sha256']==H(P/'baseline-static/unstripped.so')=='1933d743aa3d8ef459e7e9acd580f4209fd2b264c8ce8e62b0d10df2af0fe656'
 assert len(z['baseline'])==len(z['proposal'])==23;assert [n for n in z['baseline'] if z['baseline'][n]!=z['proposal'][n]]==z['changed']==['src/arithmetic.rs','src/error_report.rs','src/exit_error.rs','src/handlers.rs','src/lib.rs']
 for n,h in z['baseline'].items():assert H(P/'source-proof/baseline-source'/n)==h
 for n,h in z['proposal'].items():assert H(P/'launcher/crate'/n)==H(P/'source-proof/proposal'/n)==h
 assert z['proposal']==J(P/'launcher/resolved-source-sha256.json')
 assert H(P/'launcher/relay_build_once.py')==H(P/'prior-build-plan/launcher/relay_build_once.py')=='1ee5bcb679e8e04ee8abd65f7630571a5577e2dd6d9ccab369a10cdf8f165bd7'
 # Every non-source launcher input stays byte-exact, including full SDK/dependency/tool witnesses.
 prior=P/'prior-build-plan/launcher'
 for f in prior.rglob('*'):
  if f.is_file() and 'crate' not in f.relative_to(prior).parts and f.name not in ['manifest.json','resolved-source-sha256.json']:assert H(P/'launcher'/f.relative_to(prior))==H(f)
 load(P/'launcher/relay_build_once.py','exact_launcher').preflight()
 assert cache_snapshots()==J(P/'complete-existing-cache-snapshots.json')
 return {'status':'PASS_UNEXECUTED','baseline':'Relay14/33d with selected Relay13/e575 retained','source_inputs':23,'changed':z['changed'],'compile':'v1.44','strip':'v1.52','registry_archives':232,'new_compiler_or_VM_runs':0,'owned6008_dynamic_coverage':0}
if __name__=='__main__':
 import argparse
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--repo',type=Path,required=True);x=a.parse_args();print(json.dumps(verify(x.reviewed_plan_sha256,x.repo.resolve()),indent=2))
