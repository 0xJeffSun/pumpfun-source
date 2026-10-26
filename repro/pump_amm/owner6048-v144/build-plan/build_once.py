"""UNEXECUTED one pinned AMM build; no runtime/active source/selection mutation."""
from pathlib import Path
import argparse,hashlib,json,subprocess,shutil,os,sys,importlib.util,traceback,tomllib,gzip
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n')
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def files(root):
 assert not root.is_symlink();out={}
 for p in sorted(root.rglob('*')):
  assert not p.is_symlink(),p
  if p.is_file():out[str(p.relative_to(root))]=H(p)
 return out
def cache_snapshot():
 out={}
 for name,r in J(P/'cache-paths.json').items():
  root=Path(r['path']);f={}
  for p in sorted(root.rglob('*')):
   rel=str(p.relative_to(root))
   if p.is_symlink():f[rel]={'kind':'symlink','target':os.readlink(p)}
   elif p.is_file():f[rel]={'kind':'file','sha256':H(p),'bytes':p.stat().st_size,'mode':p.stat().st_mode&0o777}
  out[name]={'path':str(root),'resolved_path':str(root.resolve()),'files':f}
 return out
def tools():
 actual={}
 for n,r in J(P/'tools.json')['tools'].items():
  p=Path(n);actual[n]={'sha256':H(p),'bytes':p.stat().st_size};assert actual[n]==r,n
 for n,r in J(P/'path-tools.json').items():assert shutil.which(n)==r['path']and H(Path(r['path']))==r['sha256']and str(Path(r['path']).resolve())==r['resolved_path']
 return actual
def sdk_snapshot(root):return {str(p.relative_to(root)):H(p)for p in sorted(root.rglob('*'))if p.is_file()and'dependencies'not in p.relative_to(root).parts}
def verify(seal,repo):
 assert H(P/'manifest.json')==seal==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink()and p.suffix!='.pyc'and not p.name.endswith('-keypair.json')
 for n,h in m.items():assert H(P/n)==h,n
 assert H(P/'source-proof/manifest.json')=='32825564c9164b980185c4b85d62fc4f4d66ec5ca296a5076621c1301dcde141';load(P/'source-proof/verify.py','source_proof').verify(repo)
 baseline=J(P/'baseline-source30.json');proposal=J(P/'proposed-source30.json');assert len(baseline)==len(proposal)==30;assert[n for n in baseline if baseline[n]!=proposal[n]]==['programs/pump-amm/src/collect.rs'];assert(P/'source/programs/pump-amm/src/collect.rs').read_bytes()==(P/'source-proof/proposal/collect.rs').read_bytes()
 for n,h in proposal.items():assert H(P/'source'/n)==h
 assert H(P/'inventory-inputs/candidate.so')=='6dc621c8c6a165650a159b67f9f2d042c3ffc71481236208d2565485c3e169b2';assert H(P/'source/evidence/original/pump_amm/deployed.so')=='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
 tools();assert cache_snapshot()==J(P/'full-tool-cache-snapshots.json');sdk=Path(J(P/'path-tools.json')['cargo-build-sbf']['resolved_path']).parent/'sdk/sbf';assert sdk_snapshot(sdk)==J(P/'tools.json')['sdk_source'];assert len(J(P/'tools.json')['sdk_source'])==53
 return {'status':'PASS_UNEXECUTED','source_inputs':30,'changed':['programs/pump-amm/src/collect.rs'],'compile':'v1.44','strip':'v1.52','attempt_limit':1,'runtime_authorized':False,'new_compiler_VM_runs':0}
def run(D,command,label,cwd,env=None):
 result={'command':command,'returncode':None}
 try:
  r=subprocess.run(command,cwd=cwd,env=env,capture_output=True);(D/(label+'.stdout')).write_bytes(r.stdout);(D/(label+'.stderr')).write_bytes(r.stderr);result['returncode']=r.returncode
 except BaseException:result['spawn_failure']=traceback.format_exc();raise
 finally:save(D/(label+'-exit.json'),result)
 return r.returncode

def main():
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--repo',type=Path,required=True);a.add_argument('--output',type=Path);a.add_argument('--execute',action='store_true');x=a.parse_args();R=x.repo.absolute();pre=verify(x.reviewed_plan_sha256,R)
 if not x.execute:print(json.dumps(pre,indent=2));return
 assert x.output is not None;D=x.output.absolute();D.relative_to(R/'work')
 for p in[D,*D.parents]:assert not p.is_symlink()
 assert not D.exists()and D!=P and P not in D.parents;D.mkdir();save(D/'preflight.json',pre);save(D/'controller-launch.json',{'plan_sha256':x.reviewed_plan_sha256,'controller_sha256':H(Path(__file__)),'attempt_limit':1,'runtime_authorized':False});code=1;child=None
 try:
  shutil.copytree(P/'source',D/'source');(D/'cargo-home').mkdir();shutil.copytree(P/'registry',D/'cargo-home/registry');shutil.copyfile(P/'check_dependencies.py',D/'check_dependencies.py');env=dict(os.environ,CARGO_HOME=str(D/'cargo-home'),CARGO_NET_OFFLINE='true',PYTHONDONTWRITEBYTECODE='1');crate=D/'source/programs/pump-amm';vendor=crate/'vendor/solana-pubkey'
  assert run(D,[sys.executable,'-B',str(D/'check_dependencies.py')],'dependency-before',D)==0;shutil.copyfile(D/'dependency-integrity.json',D/'dependency-integrity-before.json')
  command=[sys.executable,'-B',str(D/'source/scripts/build_partial_candidate.py'),'--manifest',str(crate/'Cargo.toml'),'--program','pump_amm','--artifact-name','pump_amm_recovered.so','--tools-version','v1.44','--extra-input',str(vendor),'--output',str(D/'build-01')];save(D/'build-launch.json',{'command':command,'environment_overrides':{k:env[k]for k in ['CARGO_HOME','CARGO_NET_OFFLINE','PYTHONDONTWRITEBYTECODE']},'source30':J(P/'proposed-source30.json'),'full_vendor_extra_input':str(vendor),'build_attempts':1});child=run(D,command,'build',D/'source',env)
  logs=[D/'build.stdout',D/'build.stderr',D/'build-01/build.log'];assert all(p.is_file()for p in logs);backend=load(P/'backend_gate.py','backend').check(logs);save(D/'backend-diagnostics.json',backend);assert child==0 and backend['diagnostic_gate_passed'],'Child or backend rejection; no static/runtime acceptance'
  fp=list((D/'build-01/target').rglob('lib-pump_amm_recovered.json'));assert len(fp)==1;actual=J(fp[0]);save(D/'actual-root-fingerprint.json',actual)
  for n in ['rustflags','features','profile','compile_kind','rustc']:assert actual[n]==J(P/'accepted-root-fingerprint.json')[n],n
  # Immediate postbuild gates precede any candidate static interpretation.
  tools();assert cache_snapshot()==J(P/'full-tool-cache-snapshots.json');assert sdk_snapshot(D/'build-01/sdk')==J(P/'tools.json')['sdk_source'];scanner=load(D/'source/scripts/build_source_manifest.py','source_scanner');assert scanner.source_manifest(crate,crate,D/'source',[vendor],cwd=D/'source')==J(P/'proposed-source30.json')
  assert run(D,[sys.executable,'-B',str(D/'check_dependencies.py')],'dependency-postbuild',D)==0;assert(D/'dependency-integrity.json').read_bytes()==(D/'dependency-integrity-before.json').read_bytes()
  for n,s in [('candidate.so',D/'build-01/artifacts/pump_amm_recovered.so'),('unstripped.so',D/'build-01/target/sbf-solana-solana/release/pump_amm_recovered.so')]:shutil.copyfile(s,D/n)
  # Exactly the previously admitted full-inventory method, no original callee recursion.
  sys.path.insert(0,str(P/'static-tool'));import analyze,enrich
  for side in ['before','after']:
   T=D/'inventory'/side;T.mkdir(parents=True);B=T/'inputs/repro/pump_amm/update-event-borrow-v144';B.mkdir(parents=True);E=T/'inputs/evidence/original/pump_amm';E.mkdir(parents=True);shutil.copyfile(D/'source/evidence/original/pump_amm/deployed.so',E/'deployed.so')
   hist='repro/function-inventory/2026-10-24-374fcf0/work/pump-amm-current-body-inventory/pump_amm-bodies.json';h=T/'inputs'/hist;h.parent.mkdir(parents=True);shutil.copyfile(P/'inventory-inputs'/hist,h)
   for n in ['candidate.so','unstripped.so']:shutil.copyfile((P/'inventory-inputs'/n)if side=='before'else(D/n),B/n)
   shutil.copyfile(P/'inventory-inputs/static-comparison.json',B/'static-comparison.json')
   # Source index provenance is complete for each checkpoint.
   for n in J(P/('baseline-source30.json'if side=='before'else'proposed-source30.json')):
    f=T/'inputs'/n;f.parent.mkdir(parents=True,exist_ok=True)
    if side=='before'and n=='programs/pump-amm/src/collect.rs':shutil.copyfile(P/'source-proof/baseline/collect.rs',f)
    else:shutil.copyfile(D/'source'/n,f)
   A=T/'analysis';analyze.P=T;sys.argv=['analyze','--original',str(E/'deployed.so'),'--candidate',str(B/'candidate.so'),'--symbols',str(B/'unstripped.so'),'--out',str(A)];analyze.main();enrich.P=T;enrich.B=B;enrich.A=A;enrich.main()
   for f in A.glob('*.json'):f.with_suffix('.json.gz').write_bytes(gzip.compress(f.read_bytes(),mtime=0));f.unlink()
  code=0
 except BaseException:(D/'failure.txt').write_text(traceback.format_exc())
 finally:
  checks={}
  def check(n,fn):
   try:checks[n]={'returncode':0,'observed':fn()}
   except BaseException:checks[n]={'returncode':1,'failure':traceback.format_exc()}
  def source_after():
   proposal=J(P/'proposed-source30.json');actual={n:H(D/'source'/n)for n in proposal};assert actual==proposal;return actual
  def helpers_after():
   expected=files(P/'source/scripts');actual=files(D/'source/scripts');assert actual==expected;return actual
  def cache_after():
   actual=cache_snapshot();save(D/'full-tool-caches-after.json',actual);assert actual==J(P/'full-tool-cache-snapshots.json');return {'complete_maps_equal':True}
  def sdk_after():
   actual=sdk_snapshot(D/'build-01/sdk');assert actual==J(P/'tools.json')['sdk_source'];return actual
  def deps_after():
   actual=run(D,[sys.executable,'-B',str(D/'check_dependencies.py')],'dependency-after',D);assert actual==0;shutil.copyfile(D/'dependency-integrity.json',D/'dependency-integrity-after.json');assert(D/'dependency-integrity-after.json').read_bytes()==(D/'dependency-integrity-before.json').read_bytes();return J(D/'dependency-integrity-after.json')
  check('private_registry',lambda: files(D/'cargo-home/registry') if files(D/'cargo-home/registry')==files(P/'registry') else (_ for _ in ()).throw(AssertionError('private registry drift')));check('source30',source_after);check('helpers',helpers_after);check('tools',tools);check('full_tool_caches',cache_after);check('SDK53',sdk_after);check('dependencies',deps_after);check('frozen_plan_and_live_baseline',lambda:verify(x.reviewed_plan_sha256,R));save(D/'independent-after-gates.json',checks)
  if any(r['returncode']for r in checks.values()):code=1
  save(D/'controller-exit.json',{'returncode':int(code),'build_helper_returncode':child,'one_compile_attempt_limit':True,'runtime_executions':0,'emitted_semantic_acceptance_pending':True})
 if code:raise SystemExit(code)
if __name__=='__main__':main()
