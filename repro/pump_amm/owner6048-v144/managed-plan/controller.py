"""UNEXECUTED genuine managed-main compile only. No source/status/Git writes."""
from pathlib import Path
import argparse,hashlib,json,subprocess,shutil,os,sys,importlib.util,traceback
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_bytes())
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n')
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def files(root):
 assert not root.is_symlink();out={}
 for p in sorted(root.rglob('*')):
  assert not p.is_symlink(),p
  if p.is_file():out[str(p.relative_to(root))]=H(p)
 return out
def safe(root,rel):
 assert not Path(rel).is_absolute()and'..'not in Path(rel).parts;p=root/rel
 for f in[p,*p.parents]:
  if f==root.parent:break
  assert not f.is_symlink(),f
 return p
def tree(root,seal):
 assert H(root/'manifest.json')==seal==(root/'manifest.sha256').read_text().split()[0];m=J(root/'manifest.json');m=m.get('files',m)
 assert set(m)=={str(f.relative_to(root))for f in root.rglob('*')if f.is_file()and f not in[root/'manifest.json',root/'manifest.sha256']}
 for n,h in m.items():assert H(safe(root,n))==(h if isinstance(h,str)else h['sha256']),n
def git(R,*args):return subprocess.check_output(['git',*args],cwd=R)
def runtime(R,g):
 T=safe(R,g['runtime_relative_path']);w=P/'witness/runtime'
 for n,h in g['runtime_top_receipts_sha256'].items():assert H(T/n)==h==H(w/n),n
 runner=safe(R,g['runtime_runner_exit_relative_path']);assert runner.read_bytes()==(w/'root-runner-exit.json').read_bytes();r=J(runner);assert r['returncode']==0 and r['actual_terminal_completion_observed']is True
 for s in ['stdout','stderr']:assert H(safe(R,g['runtime_runner_'+s+'_relative_path']))==r[s+'_sha256']==H(w/('root-runner.'+s))
 x=J(T/'controller-exit.json');assert all(x[n]==0 for n in ['returncode','unchanged25_returncode','saved_signatures_returncode','nochange113_returncode','new_cases','compiler_calls','strict6048_compared_key_diagnostic_coverage'])and x['one_runtime_attempt']is True
 launch=J(T/'controller-launch.json');assert launch['template_sha256']==g['runtime_template_seal']and launch['reviewed_future_binding_sha256']==g['root_accepted_build_binding_sha256']and launch['one_runtime_attempt']is True
 assert H(T/'reviewed-future-build-binding.json')==g['root_accepted_build_binding_sha256'];gates=J(T/'independent-after-gates.json');assert len(gates)==7 and all(v['returncode']==0 for v in gates.values())
 summary=J(T/'runtime-summary.json');assert summary['status']=='PASS'and summary['suite_count']==25 and summary['case_count']==17462 and summary['transaction_count']==35074 and summary['signature_count']==35418 and summary['new_cases']==0 and not summary['mismatches']
 assert J(T/'nochange-log-verification.json')['existing_message_cases']==113
 for label in ['emitted-saved-before','unchanged-25','saved-signatures','nochange113']:
  assert J(T/(label+'-exit.json'))['returncode']==0
 assert H(T/'build-01/artifacts/pump_amm_recovered.so')==g['expected_candidate_from_actual_scratch']and H(T/'unstripped.so')==g['expected_symbols_from_actual_scratch']
 assert J(T/'proposed-source-sha256.json')==J(P/'witness/proposed-source30.json')
 return {'actual_root_terminal':0,'controller':0,'unchanged25':0,'saved_signatures':0,'nochange113':0,'after_gates':7,'cases':17462,'signatures':35418,'new_executions':0,'strict_owner6048_compared_assertions':0}
def managed_guard(R,g,proposed):
 assert str(R)==g['managed_root'];assert git(R,'rev-parse','HEAD').decode().strip()==g['frozen_HEAD'];index=git(R,'ls-files','--stage','-z');assert hashlib.sha256(index).hexdigest()==g['frozen_index_sha256']and index==(P/'witness/index.before.bin').read_bytes()
 for n,h in J(P/'witness/protected-before.json').items():assert H(safe(R,n))==h,n
 source=J(P/'witness/all-program-source-before.json');am=J(P/'witness/proposed-source30.json'if proposed else P/'witness/baseline-source30.json');source['pump-amm']=am
 scanner=load(R/'scripts/build_source_manifest.py','managed_scanner')
 for name,expected in source.items():
  for n,h in expected.items():assert H(safe(R,n))==h,n
  crate=R/'programs'/name;extra=[crate/'vendor/solana-pubkey']if name=='pump-amm'else[];actual=scanner.source_manifest(crate,crate,R,extra,cwd=R);assert set(actual)<=set(expected)and all(expected[n]==h for n,h in actual.items()),name
 assert scanner.source_manifest(R/'programs/pump-amm',R/'programs/pump-amm',R,[R/'programs/pump-amm/vendor/solana-pubkey'],cwd=R)==am
 assert J(R/'repro/status.json')['pump_amm']['candidate_sha256']==g['old_selected_candidate']
 assert{n:os.environ.get(n)for n in J(P/'witness/build-environment.json')}==J(P/'witness/build-environment.json')
 return {'HEAD':g['frozen_HEAD'],'index_sha256':hashlib.sha256(index).hexdigest(),'source_mode':'proposed_after_root_only_patch'if proposed else'old_selected','all_program_input_counts':{n:len(s)for n,s in source.items()},'status_readme_helpers_unchanged':True}
def accepted_records(R,g,E,B):
 A=P/'witness/authentic-accepted';ep=E/'plan';assert H(ep/'manifest.json')==g['ed27_seal']==H(A/'ed27-manifest.json');em=J(A/'ed27-manifest.json')
 for name,key in [('accepted-dependency-integrity.json','accepted_dependencies_sha256'),('accepted-root-fingerprint.json','accepted_fingerprint_sha256')]:
  assert(A/name).is_file()and(ep/name).is_file();assert H(A/name)==H(ep/name)==em[name]==g[key],name
 before=B/'dependency-integrity-before.json';after=B/'dependency-integrity-after.json';actualfp=B/'actual-root-fingerprint.json'
 for src,copy in [(before,'actual-scratch-dependency-integrity-before.json'),(after,'actual-scratch-dependency-integrity-after.json'),(actualfp,'actual-scratch-actual-root-fingerprint.json')]:assert src.is_file()and H(src)==H(A/copy),src
 dep=J(A/'accepted-dependency-integrity.json');assert dep==J(before)==J(after)
 fp=J(A/'accepted-root-fingerprint.json');actual=J(actualfp)
 for name in ['rustflags','features','profile','compile_kind','rustc']:assert fp[name]==actual[name],name
 tree(P/'history/v1-controls',g['previous_plan_seal']);old=safe(R,g['previous_attempt_relative_path']);saved=P/'history/attempt01-before-compiler';assert files(old)==files(saved)
 failure=J(saved/'controller-exit.json');assert failure['returncode']==1 and failure['build_helper_returncode']is None and not(old/'build-launch.json').exists()and not(old/'build-01').exists();assert J(saved/'dependencies-before-exit.json')['returncode']==0
 return {'accepted_dependency_sha256':H(A/'accepted-dependency-integrity.json'),'accepted_fingerprint_sha256':H(A/'accepted-root-fingerprint.json'),'authenticated_ed27_seal':g['ed27_seal'],'actual09be_records_equal':True,'previous_attempt_compiler_calls':0,'previous_actual_failure_retained':True}
def dependencies(R,g):
 Q=safe(R,g['scratch_build_plan_relative_path']);B=safe(R,g['scratch_build_relative_path']);E=safe(R,g['emitted_relative_path']);S=safe(R,g['spill_relative_path'])
 tree(Q,g['scratch_build_plan_seal']);tree(E,g['emitted_seal']);tree(S,g['spill_seal']);assert H(Q/'manifest.json')==H(P/'witness/scratch-build-plan-manifest.json')
 assert H(P/'witness/root-accepted-build-binding.json')==g['root_accepted_build_binding_sha256'];z=J(P/'witness/root-accepted-build-binding.json');assert z['status']=='ROOT_REVIEWED_ACTUAL_BUILD_AND_EMITTED_ACCEPTANCE'and z['root_reviewed_emitted_acceptance']is True
 assert z['source_proof_seal']==g['source_proof_seal']and z['emitted_packet_seal']==g['emitted_seal']and z['spill_supplement_seal']==g['spill_seal'];assert H(E/'verify.py')==z['emitted_verifier_sha256']
 assert H(B/'candidate.so')==z['candidate_sha256']==g['expected_candidate_from_actual_scratch']and H(B/'unstripped.so')==z['symbols_sha256']==g['expected_symbols_from_actual_scratch']
 assert H(B/'build-01/build-comparison.json')==z['build_report_sha256']and H(B/'controller-exit.json')==z['build_controller_exit_sha256'];assert J(B/'controller-exit.json')['returncode']==0;assert J(B/'build-01/build-comparison.json')['source_sha256']==J(P/'witness/proposed-source30.json')
 assert J(Q/'baseline-source30.json')==J(P/'witness/baseline-source30.json')and J(Q/'proposed-source30.json')==J(P/'witness/proposed-source30.json')
 assert(P/'witness/collect.before.rs').read_bytes()==(Q/'source-proof/baseline/collect.rs').read_bytes()and(P/'witness/collect.proposed.rs').read_bytes()==(Q/'source-proof/proposal/collect.rs').read_bytes()
 # Authenticate every expected-record dependency BEFORE creating an output or
 # invoking a compiler. e3c intentionally does not contain accepted dependency JSON.
 accepted_records(R,g,E,B)
 for rel in ['check_dependencies.py','build_once.py','backend_gate.py','tools.json','path-tools.json','cache-paths.json','full-tool-cache-snapshots.json','accepted-root-fingerprint.json']:
  assert(Q/rel).is_file(),rel
 assert(Q/'registry').is_dir()
 return Q,B,E,S
def preflight(R,seal,proposed):
 tree(P,seal);g=J(P/'plan.json');Q,B,E,S=dependencies(R,g);m=load(Q/'build_once.py','scratch_tools');m.tools();assert m.cache_snapshot()==J(Q/'full-tool-cache-snapshots.json');sdk=Path(J(Q/'path-tools.json')['cargo-build-sbf']['resolved_path']).parent/'sdk/sbf';assert m.sdk_snapshot(sdk)==J(Q/'tools.json')['sdk_source']
 return {'status':'PASS_UNEXECUTED_MAIN_CONTROLS_V2','managed':managed_guard(R,g,proposed),'actual_existing_runtime':runtime(R,g),'authenticated_expected_records':accepted_records(R,g,E,B),'new_compile_VM_runs':0,'source_status_Git_writes':False}
def run(D,label,cmd,cwd,env=None):
 row={'command':cmd,'cwd':str(cwd),'returncode':None}
 try:
  with(D/(label+'.stdout')).open('xb')as out,(D/(label+'.stderr')).open('xb')as err:r=subprocess.run(cmd,cwd=cwd,env=env,stdout=out,stderr=err)
  row['returncode']=r.returncode;return r.returncode
 except BaseException:row['spawn_failure']=traceback.format_exc();raise
 finally:
  for s in ['stdout','stderr']:
   if(D/(label+'.'+s)).is_file():row[s+'_sha256']=H(D/(label+'.'+s))
  save(D/(label+'-exit.json'),row)
def main():
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--expect-proposed-source',action='store_true');a.add_argument('--build-once',action='store_true');x=a.parse_args();R=x.repo.absolute();g=J(P/'plan.json');assert str(R)==g['managed_root'];proposed=g['default_expect_proposed_source']or x.expect_proposed_source or x.build_once
 if not x.build_once:print(json.dumps(preflight(R,x.reviewed_plan_sha256,proposed),indent=2));return
 # Root alone has applied the one-line working-source patch before this call.
 # No controller source mutation or helper substitution exists.
 pre=preflight(R,x.reviewed_plan_sha256,True)
 D=safe(R,g['output_relative_path']);assert not D.exists()and D!=P and P not in D.parents;D.mkdir();code=1;child=None;setup=None
 try:
  save(D/'controller-launch.json',{'plan_sha256':x.reviewed_plan_sha256,'controller_sha256':H(Path(__file__)),'one_compile_attempt':True,'actual_managed_manifest':str(R/'programs/pump-amm/Cargo.toml'),'active_source_patch_by_controller':False,'runtime_executions':0})
  save(D/'gate-before.json',pre);Q,B,E,S=dependencies(R,g);setup=(Q,B,E,S);m=load(Q/'build_once.py','main_tools')
  source=J(P/'witness/proposed-source30.json');save(D/'actual-managed-source-before.json',{n:H(R/n)for n in source})
  # Retained source copy is evidence/checker input ONLY; compiler uses managedR.
  for n in source:
   out=D/'source'/n;out.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(R/n,out)
  shutil.copytree(Q/'registry',D/'cargo-home/registry');shutil.copyfile(Q/'check_dependencies.py',D/'check_dependencies.py');save(D/'private-registry-before.json',files(D/'cargo-home/registry'))
  assert run(D,'dependencies-before',[sys.executable,'-B',str(D/'check_dependencies.py')],D)==0;shutil.copyfile(D/'dependency-integrity.json',D/'dependency-integrity-before.json');assert J(D/'dependency-integrity-before.json')==J(P/'witness/authentic-accepted/accepted-dependency-integrity.json')
  env=dict(os.environ,CARGO_HOME=str(D/'cargo-home'),CARGO_NET_OFFLINE='true',PYTHONDONTWRITEBYTECODE='1');cmd=[sys.executable,'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump-amm/Cargo.toml'),'--program','pump_amm','--artifact-name','pump_amm_recovered.so','--tools-version','v1.44','--extra-input',str(R/'programs/pump-amm/vendor/solana-pubkey'),'--output',str(D/'build-01')]
  save(D/'build-launch.json',{'command':cmd,'cwd':str(R),'environment_overrides':{k:env[k]for k in['CARGO_HOME','CARGO_NET_OFFLINE','PYTHONDONTWRITEBYTECODE']},'source30':source,'attempt_limit':1,'genuine_managed_source':True,'source_overlay_compiler_input':False});child=run(D,'build',cmd,R,env)
  logs=[D/'build.stdout',D/'build.stderr',D/'build-01/build.log'];assert all(f.is_file()for f in logs);backend=load(Q/'backend_gate.py','backend').check(logs);save(D/'backend-diagnostics.json',backend);assert child==0 and backend['diagnostic_gate_passed']and backend['backend_error_count']==0
  fp=list((D/'build-01/target').rglob('lib-pump_amm_recovered.json'));assert len(fp)==1;actual=J(fp[0]);save(D/'actual-root-fingerprint.json',actual)
  for n in ['rustflags','features','profile','compile_kind','rustc']:assert actual[n]==J(P/'witness/authentic-accepted/accepted-root-fingerprint.json')[n],n
  # Gates execute before interpreting/reusing any main artifact.
  managed_guard(R,g,True);m.tools();assert m.cache_snapshot()==J(Q/'full-tool-cache-snapshots.json');assert m.sdk_snapshot(D/'build-01/sdk')==J(Q/'tools.json')['sdk_source'];assert files(D/'cargo-home/registry')==files(Q/'registry')
  assert run(D,'dependencies-postbuild',[sys.executable,'-B',str(D/'check_dependencies.py')],D)==0;assert J(D/'dependency-integrity.json')==J(P/'witness/authentic-accepted/accepted-dependency-integrity.json')
  report=J(D/'build-01/build-comparison.json');attempt=J(D/'build-01/build-attempt.json');assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source and attempt['returncode']==0 and attempt['source_unchanged'];assert report['selected_toolchain']=='v1.44'
  for n,f in [('candidate.so',D/'build-01/artifacts/pump_amm_recovered.so'),('unstripped.so',D/'build-01/target/sbf-solana-solana/release/pump_amm_recovered.so')]:shutil.copyfile(f,D/n)
  identity={'whole_candidate_equal':(D/'candidate.so').read_bytes()==(B/'candidate.so').read_bytes(),'whole_symbols_equal':(D/'unstripped.so').read_bytes()==(B/'unstripped.so').read_bytes(),'actual_candidate_sha256':H(D/'candidate.so'),'actual_symbols_sha256':H(D/'unstripped.so'),'expected_from_actual_scratch_candidate':H(B/'candidate.so'),'expected_from_actual_scratch_symbols':H(B/'unstripped.so'),'actual_managed_source30':source,'source_overlay_used':False,'current_selection_modified':False,'whole_original_equal':False};save(D/'identity.json',identity);assert identity['whole_candidate_equal']and identity['whole_symbols_equal'],'Actual measurement differs: preserve outputs, no retry'
  code=0
 except BaseException:(D/'failure.txt').write_text(traceback.format_exc())
 finally:
  checks={}
  def check(n,fn):
   try:checks[n]={'returncode':0,'observed':fn()}
   except BaseException:checks[n]={'returncode':1,'failure':traceback.format_exc()}
  def require_equal(actual,expected):assert actual==expected;return actual
  def caches():
   a=load(Q/'build_once.py','cache_after_tools').cache_snapshot();save(D/'full-tool-caches-after.json',a);return require_equal(a,J(Q/'full-tool-cache-snapshots.json'))
  def deps():
   assert run(D,'dependencies-after',[sys.executable,'-B',str(D/'check_dependencies.py')],D)==0;shutil.copyfile(D/'dependency-integrity.json',D/'dependency-integrity-after.json');return require_equal(J(D/'dependency-integrity-after.json'),J(P/'witness/authentic-accepted/accepted-dependency-integrity.json'))
  # Each after-gate runs independently even after setup, compiler or identity failure.
  Q=safe(R,g['scratch_build_plan_relative_path'])
  check('frozen_controls',lambda:tree(P,x.reviewed_plan_sha256));check('managed_HEAD_index_other_programs_status_source30',lambda:managed_guard(R,g,True));check('tools',lambda:load(Q/'build_once.py','after_tools').tools());check('full_tool_caches',caches);check('SDK53',lambda:require_equal(load(Q/'build_once.py','sdk_after_tools').sdk_snapshot(D/'build-01/sdk'),J(Q/'tools.json')['sdk_source']));check('private_registry',lambda:require_equal(files(D/'cargo-home/registry'),files(Q/'registry')));check('dependencies',deps);check('runtime_actual_receipts',lambda:runtime(R,g));check('accepted_scratch_static_packets',lambda:{'bound_paths':[str(p)for p in dependencies(R,g)]});check('source_evidence_copy30',lambda:require_equal({n:H(D/'source'/n)for n in J(P/'witness/proposed-source30.json')},J(P/'witness/proposed-source30.json')))
  def fingerprint():
   a=J(D/'actual-root-fingerprint.json');b=J(P/'witness/authentic-accepted/accepted-root-fingerprint.json');return require_equal({n:a[n]for n in['rustflags','features','profile','compile_kind','rustc']},{n:b[n]for n in['rustflags','features','profile','compile_kind','rustc']})
  check('actual_root_fingerprint',fingerprint);save(D/'independent-after-gates.json',checks)
  if any(v['returncode']for v in checks.values()):code=1
  save(D/'controller-exit.json',{'returncode':int(code),'build_helper_returncode':child,'one_compile_attempt':True,'after_gate_count':len(checks),'runtime_executions':0,'active_source_status_readme_git_writes':False,'selection_authorized':False})
 if code:raise SystemExit(code)
if __name__=='__main__':main()
