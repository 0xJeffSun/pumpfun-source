"""UNEXECUTED unchanged25 runtime template. Future reviewed build+static binding REQUIRED."""
from pathlib import Path
import argparse,hashlib,json,shutil,subprocess,sys,os,traceback,importlib.util,importlib.metadata,platform
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n')
def files(root):
 assert not root.is_symlink();out={}
 for f in sorted(root.rglob('*')):
  assert not f.is_symlink(),f
  if f.is_file():out[str(f.relative_to(root))]=H(f)
 return out
def safe(root,relative):
 p=root/relative;assert not Path(relative).is_absolute()and'..'not in Path(relative).parts
 for f in[p,*p.parents]:
  if f==root.parent:break
  assert not f.is_symlink(),f
 return p
def tree(root,seal):
 assert not root.is_symlink();assert H(root/'manifest.json')==seal==(root/'manifest.sha256').read_text().split()[0];m=J(root/'manifest.json');m=m.get('files',m)
 assert set(m)=={str(f.relative_to(root))for f in root.rglob('*')if f.is_file()and f not in[root/'manifest.json',root/'manifest.sha256']}
 for n,h in m.items():assert H(safe(root,n))==(h if isinstance(h,str)else h['sha256']),n
 for f in root.rglob('*'):assert not f.is_symlink()and f.suffix!='.pyc'
def engine():
 z=J(P/'planned-current-engine.json');root=Path(importlib.util.find_spec('solders').origin).parent;actual={'python_executable':sys.executable,'python_sha256':H(Path(sys.executable)),'python_version':platform.python_version(),'solders_version':importlib.metadata.version('solders'),'package_root':str(root),'package_files':{str(f.relative_to(root)):H(f)for f in sorted(root.rglob('*'))if f.is_file()and'__pycache__'not in f.parts and f.suffix in['.py','.so','.pyd','.dylib']}}
 assert all(actual[k]==z[k]for k in actual)and actual['solders_version']=='0.27.1';return actual

def template(seal):
 tree(P,seal);assert files(P/'runtime-source')==J(P/'template-source-hashes.json');assert H(P/'source-proof-manifest.json')=='32825564c9164b980185c4b85d62fc4f4d66ec5ca296a5076621c1301dcde141';assert H(P/'reviewed-build-plan-manifest.json')=='e3c3a9d36f0626091c428a943265d3e56f988722d77605e999c7b143e1cd7890';assert len(J(P/'expected-proposed-source30.json'))==30
 coverage_spec=importlib.util.spec_from_file_location('baseline_coverage',P/'baseline-coverage/derive.py');coverage=importlib.util.module_from_spec(coverage_spec);coverage_spec.loader.exec_module(coverage);assert coverage.derive()==J(P/'baseline-coverage/coverage.json')
 for mapping in[J(P/'runtime-source/repro/pump_amm/pool-serialization-thirty-seven/test-source-sha256.json'),J(P/'runtime-source/repro/pump_amm/pool-serialization-thirty-seven/runtime-input-sha256.json'),J(P/'baseline-source-sha256.json')]:
  for n,h in mapping.items():assert H(P/'runtime-source'/n)==h,n
 base=P/'runtime-source/repro/pump_amm/pool-serialization-thirty-seven';spec=J(base/'replay-commands.json')['commands'];counts=J(base/'summary.json')['suites'];assert len(spec)==25 and sum(counts.values())==17462;assert spec==J(P/'existing-history-controls.json')['commands'];assert os.environ.get('PUMP_AMM_FRESH_VM')is None,'Do not change the retained reuse/reset policy';actual_engine=engine()
 return {'status':'PASS_TEMPLATE_ONLY_UNBOUND','candidate_build_or_emitted_acceptance_claimed':False,'suites':25,'cases':17462,'new_VM_build_runs':0,'planned_engine':actual_engine,'history_policy':'exact retained source including history0/historical freshnessFalse; no setting changes'}
def accepted(binding,seal,B,E):
 assert H(binding)==seal;z=J(binding);assert z['schema']==1 and z['status']=='ROOT_REVIEWED_ACTUAL_BUILD_AND_EMITTED_ACCEPTANCE'and z['root_reviewed_emitted_acceptance']is True and z['existing_history_policy_reviewed']is True
 assert z['source_proof_seal']=='32825564c9164b980185c4b85d62fc4f4d66ec5ca296a5076621c1301dcde141'and z['build_plan_seal']=='e3c3a9d36f0626091c428a943265d3e56f988722d77605e999c7b143e1cd7890';source=J(P/'expected-proposed-source30.json')
 for key in ['candidate_sha256','symbols_sha256','build_report_sha256','build_controller_exit_sha256','emitted_packet_seal','emitted_verifier_sha256']:assert isinstance(z[key],str)and len(z[key])==64
 assert H(B/'candidate.so')==z['candidate_sha256']and H(B/'unstripped.so')==z['symbols_sha256'];assert H(B/'build-01/build-comparison.json')==z['build_report_sha256'];report=J(B/'build-01/build-comparison.json');assert report['source_sha256']==source and report['selected_toolchain']=='v1.44'and report['comparison']['candidate_sha256']==z['candidate_sha256'];assert H(B/'controller-exit.json')==z['build_controller_exit_sha256'];exit=J(B/'controller-exit.json');assert exit['returncode']==exit['build_helper_returncode']==0 and exit['runtime_executions']==0;assert J(B/'controller-launch.json')['plan_sha256']==z['build_plan_seal']
 assert J(B/'backend-diagnostics.json')['diagnostic_gate_passed']and J(B/'backend-diagnostics.json')['backend_error_count']==0;g=J(B/'independent-after-gates.json');assert len(g)==8 and all(v['returncode']==0 for v in g.values());assert all(H(B/'source'/n)==h for n,h in source.items());assert H(B/'build-01/build.log')==report['build_log_sha256']
 receipt=safe(B,z['root_build_runner_exit_relative_path']);assert H(receipt)==z['root_build_runner_exit_sha256'];runner=J(receipt);assert runner['returncode']==0 and runner['actual_terminal_completion_observed']is True
 tree(E,z['emitted_packet_seal']);assert H(E/'verify.py')==z['emitted_verifier_sha256'];assert H(safe(E,z['emitted_candidate_relative_path']))==z['candidate_sha256']and H(safe(E,z['emitted_symbols_relative_path']))==z['symbols_sha256'];assert J(safe(E,z['emitted_source30_relative_path']))==source
 return z

def run(D,label,cmd,cwd,env=None):
 result={'command':cmd,'returncode':None}
 try:
  r=subprocess.run(cmd,cwd=cwd,env=env,capture_output=True);(D/(label+'.stdout')).write_bytes(r.stdout);(D/(label+'.stderr')).write_bytes(r.stderr);result['returncode']=r.returncode
 except BaseException:result['spawn_failure']=traceback.format_exc();raise
 finally:save(D/(label+'-exit.json'),result)
 return r.returncode

def main():
 a=argparse.ArgumentParser();a.add_argument('--template-sha256',required=True);a.add_argument('--repo',type=Path,required=True);a.add_argument('--accepted-build-binding',type=Path);a.add_argument('--accepted-build-binding-sha256');a.add_argument('--build-root',type=Path);a.add_argument('--emitted-root',type=Path);a.add_argument('--output',type=Path);a.add_argument('--execute',action='store_true');x=a.parse_args();pre=template(x.template_sha256)
 if not x.execute:print(json.dumps(pre,indent=2));return
 assert x.accepted_build_binding and x.accepted_build_binding_sha256 and x.build_root and x.emitted_root and x.output,'UNBOUND template cannot execute';B=x.build_root.absolute();E=x.emitted_root.absolute();z=accepted(x.accepted_build_binding,x.accepted_build_binding_sha256,B,E);R=x.repo.absolute();D=x.output.absolute();D.relative_to(R/'work')
 for p in[D,*D.parents]:assert not p.is_symlink()
 assert not D.exists()and D!=P and P not in D.parents;D.mkdir();save(D/'preflight.json',pre);shutil.copyfile(x.accepted_build_binding,D/'reviewed-future-build-binding.json');save(D/'controller-launch.json',{'template_sha256':x.template_sha256,'controller_sha256':H(Path(__file__)),'reviewed_future_binding_sha256':x.accepted_build_binding_sha256,'one_runtime_attempt':True,'build_calls':0,'new_cases':0});code=1;child=saved=nochange=None
 try:
  # This is the already-reviewed saved/static verifier, not a compiler or VM.
  assert run(D,'emitted-saved-before',[sys.executable,'-B',str(E/'verify.py')],E)==0
  shutil.copytree(P/'runtime-source',D/'runtime-source');shutil.copytree(P/'inputs',D/'inputs')
  for n in ['run_regressions.py','observe_suite.py','verify_runtime.py','verify_nochange_logs.py','baseline-log-evidence.json','baseline-source-sha256.json']:shutil.copyfile(P/n,D/n)
  source=J(P/'expected-proposed-source30.json')
  for n in source:
   f=D/'source'/n;f.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(B/'source'/n,f)
  save(D/'proposed-source-sha256.json',source);(D/'build-01/artifacts').mkdir(parents=True);shutil.copyfile(B/'candidate.so',D/'build-01/artifacts/pump_amm_recovered.so');shutil.copyfile(B/'unstripped.so',D/'unstripped.so');shutil.copyfile(B/'build-01/build-comparison.json',D/'build-01/build-comparison.json')
  # Generated ONLY after actual build+terminal+emitted saved gates succeed above.
  save(D/'runtime-gate.json',{'pass':True,'candidate_sha256':z['candidate_sha256'],'source_input_files':30,'reviewed_actual_binding_sha256':x.accepted_build_binding_sha256,'emitted_packet_seal':z['emitted_packet_seal'],'compiler_runs_by_runtime_controller':0})
  child=run(D,'unchanged-25',[sys.executable,'-B',str(D/'run_regressions.py')],D,dict(os.environ,PYTHONDONTWRITEBYTECODE='1'));assert child==0
  saved=run(D,'saved-signatures',[sys.executable,'-B',str(D/'verify_runtime.py')],D);assert saved==0;summary=J(D/'runtime-summary.json');assert summary['suite_count']==25 and summary['case_count']==17462 and summary['transaction_count']==35074 and summary['signature_count']==35418 and not summary['mismatches']
  nochange=run(D,'nochange113',[sys.executable,'-B',str(D/'verify_nochange_logs.py')],D);assert nochange==0 and J(D/'nochange-log-verification.json')['existing_message_cases']==113;code=0
 except BaseException:(D/'failure.txt').write_text(traceback.format_exc())
 finally:
  checks={}
  def check(n,fn):
   try:checks[n]={'returncode':0,'observed':fn()}
   except BaseException:checks[n]={'returncode':1,'failure':traceback.format_exc()}
  def runtime_source():
   actual=files(D/'runtime-source');assert actual==J(P/'template-source-hashes.json');return actual
  def source30():
   actual={n:H(D/'source'/n)for n in J(P/'expected-proposed-source30.json')};assert actual==J(P/'expected-proposed-source30.json');return actual
  def artifacts():
   actual={'candidate':H(D/'build-01/artifacts/pump_amm_recovered.so'),'symbols':H(D/'unstripped.so')};assert actual=={'candidate':z['candidate_sha256'],'symbols':z['symbols_sha256']};return actual
  def helpers():
   names=['run_regressions.py','observe_suite.py','verify_runtime.py','verify_nochange_logs.py'];actual={n:H(D/n)for n in names};assert actual=={n:H(P/n)for n in names};return actual
  check('template_integrity',lambda:template(x.template_sha256));check('future_build_static_binding',lambda:accepted(x.accepted_build_binding,x.accepted_build_binding_sha256,B,E));check('runtime_source_allbytes',runtime_source);check('compiled_source30',source30);check('candidate_symbols',artifacts);check('unchanged_runner_observer_saved_helpers',helpers);check('runtime_engine',engine);save(D/'independent-after-gates.json',checks)
  if any(v['returncode']for v in checks.values()):code=1
  save(D/'controller-exit.json',{'returncode':int(code),'unchanged25_returncode':child,'saved_signatures_returncode':saved,'nochange113_returncode':nochange,'one_runtime_attempt':True,'new_cases':0,'compiler_calls':0,'strict6048_compared_key_diagnostic_coverage':0})
 if code:raise SystemExit(code)
if __name__=='__main__':main()
