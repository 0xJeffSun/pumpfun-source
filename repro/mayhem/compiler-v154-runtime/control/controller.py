"""UNEXECUTED runtime-only controller; frozen admitted routines, no build path."""
from pathlib import Path
import argparse,json,hashlib,subprocess,sys,os,shutil,traceback
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1];H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())

def sealed(root,seal,legacy=False):
 assert H(root/'manifest.json')==seal and(root/'manifest.sha256').read_text().split()[0]==seal
 m=J(root/'manifest.json');m=m['files']if legacy else m
 assert set(m)=={str(f.relative_to(root))for f in root.rglob('*')if f.is_file()and f not in[root/'manifest.json',root/'manifest.sha256']}
 for n,v in m.items():assert not(root/n).is_symlink()and H(root/n)==(v['sha256']if isinstance(v,dict)else v),n

def run(name,cmd,cwd,env=None):
 with(O/(name+'.stdout')).open('x')as out,(O/(name+'.stderr')).open('x')as err:r=subprocess.run(cmd,cwd=cwd,env=env,stdout=out,stderr=err)
 row={'name':name,'command':cmd,'returncode':r.returncode,'stdout_sha256':H(O/(name+'.stdout')),'stderr_sha256':H(O/(name+'.stderr'))};children.append(row);record(name+'-exit.json',row);return r.returncode

def gate(name):
 sealed(P,args.reviewed_control_sha256);g=J(P/'inputs.json');sealed(P/'baseline6129',g['baseline_seal'],True);sealed(P/'static5435',g['static_seal'])
 for n,h in J(P/'runtime-python-files.json').items():assert H(Path(n))==h,n
 origins=J(P/'seed-origins.json');assert set(origins)=={str(f.relative_to(P/'seed'))for f in(P/'seed').rglob('*')if f.is_file()}
 for n,v in origins.items():assert H(P/'seed'/n)==v['sha256']
 for n,h in g['source14'].items():assert H(P/'seed/programs/mayhem'/n)==H(R/'programs/mayhem'/n)==h
 assert H(P/'static5435/build/candidate.so')==g['candidate']and H(P/'static5435/build/unstripped.so')==g['symbols']
 assert J(P/'static5435/build/import-structure-comparison.json')['undefined_import_sets_equal'];assert J(P/'static5435/build/sdk-postlink.json')['syscall_authority_status']=='UNRESOLVED_EMPTY_OFFICIAL_ALLOWLIST'
 cmd=[g['python'],'-B',str(P/'static5435/verify.py'),'--retained-input-gates']
 if 'O'in globals():assert run('static-'+name,cmd,R)==0
 else:
  r=subprocess.run(cmd,cwd=R,capture_output=True,text=True);assert r.returncode==0,r.stdout+r.stderr
 return{'passed':True,'static_seal':g['static_seal'],'baseline_seal':g['baseline_seal'],'candidate':g['candidate'],'source14':g['source14'],'seed_files':len(origins),'runtime_files':len(J(P/'runtime-python-files.json')),'static_import_set_equal':True,'sdk_authority_unresolved':True,'new_builds':0}

def observed(path):
 try:return H(path)if path.is_file()else None
 except BaseException as exc:return 'READ_ERROR:'+type(exc).__name__+':'+str(exc)

def snapshot(root):return{str(f.relative_to(root)):H(f)for f in root.rglob('*')if f.is_file()}
def record(n,v):(O/n).write_text(json.dumps(v,indent=2)+'\n')
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--reviewed-control-sha256',required=True);a.add_argument('--run-existing-corpus',action='store_true');args=a.parse_args()
 if not args.run_existing_corpus:print(json.dumps({'preflight':gate('preflight'),'runtime':'UNRUN','compiler_invocations':0}));raise SystemExit(0)
 O=P.parent/'mayhem-v154-retarget-runtime';O.mkdir(exist_ok=False);children=[];failure=None;g=J(P/'inputs.json')
 try:
  record('gate-before.json',gate('before'));Q=O/'repo';W=Q/'work/mayhem-v154-runtime';W.mkdir(parents=True);S=W/'source';shutil.copytree(P/'seed',S);shutil.copytree(P/'burn-fixtures',W/'burn-fixtures');shutil.copytree(P/'historical-summary-inputs',Q,dirs_exist_ok=True)
  for n in ['replay.py','verify_replays.py','summarize.py']:shutil.copy2(P/'baseline6129/methods'/n,W/n)
  (W/'build01/artifacts').mkdir(parents=True);shutil.copy2(P/'static5435/build/candidate.so',W/'build01/artifacts/mayhem_recovered.so')
  record('runtime-candidate-binding.json',{'actual_compilation_packet_seal':g['static_seal'],'actual_compilation_record':'static5435/build/recipe.json','actual_compiler':'officialv1.54/directsbpf-solana-solana','actual_strip':'fixedv1.52','candidate':g['candidate'],'symbols':g['symbols'],'source14':g['source14'],'archived_source14_equal':True,'compiler_or_source_metadata_rewritten':False,'sole_loaded_ELF_replacement':'source/repro/mayhem/result-error-candidate.so','legacy_build01_path_role':'Artifact routing only; no old Cargo driver/compile fiction','archived_historical_runtime_manifest_candidate_not_rewritten':True,'runtime_settings':'per-suite-vm-controls.json exact legacy provenance; administrative history0 exception explicit','original_import_set_equal13':True,'sdk_allowlist0B_warning_authority':'unresolved'})
  frozen=snapshot(S);burn=snapshot(W/'burn-fixtures');record('runtime-source-before.json',frozen);record('burn-fixtures-before.json',burn)
  env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1','PYTHONPATH':os.pathsep.join([str(S/'scripts'),str(S)])}
  for name in ['replay','verify_replays','summarize']:assert run(name,[g['python'],'-B',str(W/(name+'.py'))],S,env)==0,'Existing child failure retained; no next child/retry'
  assert run('saved-raw-signatures',[g['python'],'-B',str(P/'saved_signature_inventory.py'),str(W)],S,env)==0
  assert run('retarget-acceptance',[g['python'],'-B',str(P/'accept_receipts.py'),str(W)],S,env)==0
  record('runtime-receipt-location.json',{'root':str(W.relative_to(O)),'acceptance':str((W/'retarget-acceptance.json').relative_to(O)),'recorded_comparisons':9595,'raw_signature_check':str(O/'saved-raw-signatures.stdout'),'missing_raw_signature_executions':5906,'no_new_unique_cases':True,'sdk_warning_authority_unresolved':True,'promotion_authorized':False})
 except BaseException as exc:failure={'type':type(exc).__name__,'message':str(exc),'traceback':traceback.format_exc()}
 finally:
  # Independent full post-attempt witness even if a strict gate stops at its first mismatch.
  all_external=J(P/'static5435/reviewed-plan/external-inputs.json');raw_external={n:observed(Path(n)) for n in all_external};raw_runtime={n:observed(Path(n)) for n in J(P/'runtime-python-files.json')};mismatched_external=[n for n,h in all_external.items()if raw_external[n]!=h];mismatched_runtime=[n for n,h in J(P/'runtime-python-files.json').items()if raw_runtime[n]!=h]
  record('independent-post-attempt-witness.json',{'actual_retained_external_hashes':raw_external,'external_mismatches':mismatched_external,'actual_runtime_hashes':raw_runtime,'runtime_mismatches':mismatched_runtime,'seed_source14_actual':{n:observed(P/'seed/programs/mayhem'/n)for n in g['source14']},'current_root_source14_actual':{n:observed(R/'programs/mayhem'/n)for n in g['source14']}})
  if mismatched_external or mismatched_runtime:failure=failure or{'type':'IndependentPostGateFailure','message':'Actual retained inputs drifted; no global failure ignored'}
  if 'S'in locals()and S.exists()and 'frozen'not in locals():record('partial-runtime-source-after.json',snapshot(S))
  if 'frozen'in locals():
   after=snapshot(S);record('runtime-source-after.json',after);expected=dict(frozen);expected['repro/mayhem/result-error-candidate.so']=g['candidate']
   if after!=expected:failure=failure or{'type':'RuntimeInputIntegrityFailure','message':'Only exact loaded candidate replacement permitted; before/after maps retained'}
   bafter=snapshot(W/'burn-fixtures');record('burn-fixtures-after.json',bafter)
   if bafter!=burn:failure=failure or{'type':'BurnFixtureIntegrityFailure','message':'Captured fixture bytes changed'}
  try:record('gate-after.json',gate('after'))
  except BaseException as exc:
   record('gate-after-failure.json',{'type':type(exc).__name__,'message':str(exc)});failure=failure or{'type':type(exc).__name__,'message':str(exc)}
  record('controller-exit.json',{'returncode':1 if failure else 0,'failure':failure,'children':children,'new_builds':0,'one_attempt':True,'new_unique_cases':0,'sdk_authority_decisive':False,'promotion_authorized':False})
 if failure:raise SystemExit(1)
