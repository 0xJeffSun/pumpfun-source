"""UNEXECUTED one ordinary12 replay. No compiler or active selection writes."""
from pathlib import Path
import argparse,json,hashlib,importlib.util,sys,shutil,traceback,datetime
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text());C='33d5264b90d9a32556918072837cfe9cff284c369b15c3e31c32344125d06cb6';SY='1933d743aa3d8ef459e7e9acd580f4209fd2b264c8ce8e62b0d10df2af0fe656'
def load(p,name):
 s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n')
def tree(D,seal=None):
 assert H(D/'manifest.json')==(D/'manifest.sha256').read_text().split()[0]
 if seal:assert H(D/'manifest.json')==seal
 m=J(D/'manifest.json');assert set(m)=={str(p.relative_to(D)) for p in D.rglob('*') if p.is_file() and p not in[D/'manifest.json',D/'manifest.sha256']}
 for p in D.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc'
 for n,h in m.items():assert H(D/n)==h,n

def verify(seal,repo):
 tree(P,seal);tree(P/'prior-runtime-plan','38062cc1152bd78464e1d27693f4435721b4e66263e6939fe858482e603ef71e');S=P/'static-proof';tree(S,'1cc88b000128fc0d7f8df881f660fb2cb6a93f1a038d9dbc915ce63a49e2f552');static=load(S/'verify.py','static_only').verify();assert static['candidate_sha256']==C and H(S/'static/unstripped.so')==SY
 assert(repo/'repro/donation-relay/current.json').read_bytes()==(P/'current.before.json').read_bytes();sourcegate=load(S/'reviewed-plan/verify_plan.py','source_tool_gate').verify('376e1c9e57a1cf4c24c0d3a7581e3806e6d696a4f65547830be625f24fbe154f',repo)
 proposal=repo/'repro/donation-relay/local-validation-proposal';assert H(proposal/'manifest.json')==H(P/'frozen-proposal/manifest.json')=='2ecc00fa48a19065fae6a2e8a43a9ab5ad4fe5de7c514b6fd3cd93faa118012c'
 for n,h in J(proposal/'manifest.json')['files'].items():assert H(proposal/n)==H(P/'frozen-proposal'/n)==h
 assert H(proposal/'harness_proposal.py')=='fd6df62699bc5732fffca65d7e6b5c1c872746180563ca3e320f7dbe11f7cb1b';assert(P/'saved-verify.original.py').read_bytes()==(P/'prior-runtime-plan/saved-verify.original.py').read_bytes();assert(P/'saved-verify.py').read_text()==(P/'saved-verify.original.py').read_text().replace('6fa16842ae4219eafa11da4deca9c3ff1e3833a2bc6959b7a77146423080350e',C)
 fixtures=[x for x in J(proposal/'fixture-blueprints.json') if x['case']['group']=='ordinary'];assert len(fixtures)==12;coverage=J(P/'changed-domain-coverage.json');assert coverage['ordinary_cases']==[{'name':x['case']['name'],'kind':x['case']['kind'],'selector_hex':x['fixture']['instruction_hex'][:16]} for x in fixtures];assert coverage['weight_materialization_dynamic_cases']==coverage['leftover_sort_guard_dynamic_cases']==coverage['new_borrow_failure_dynamic_cases']==0
 return {'status':'PASS_UNEXECUTED','candidate_sha256':C,'symbols_sha256':SY,'source23_tool_dependency_gate':sourcegate,'ordinary_cases':12,'dynamic_changed_domain_cases':0,'new_compiler_or_VM_runs':0}

def after_collect(D,R,seal):
 checks={}
 def check(name,fn):
  try:checks[name]={'returncode':0,'observed':fn()}
  except BaseException:checks[name]={'returncode':1,'failure':traceback.format_exc()}
 def compiled_source():
  root=P/'static-proof/source';actual={str(p.relative_to(root)):H(p) for p in root.rglob('*') if p.is_file()};save(D/'actual-source-after.json',actual);assert actual==J(P/'static-proof/reviewed-plan/freeze.json')['source'];return actual
 def caches():
  B=P/'static-proof/reviewed-plan';tree(B,'376e1c9e57a1cf4c24c0d3a7581e3806e6d696a4f65547830be625f24fbe154f');m=load(B/'verify_plan.py','independent_cache_reader');actual=m.cache_snapshots();save(D/'actual-cache-after.json',actual);assert actual==J(B/'complete-existing-cache-snapshots.json');return {'matched_complete_existing_caches':True}
 def tools():
  rows=J(P/'static-proof/reviewed-plan/launcher/tool-witness/tool-files.json');actual={}
  for n,r in rows.items():
   try:actual[n]={'sha256':H(Path(r['path'])),'path':r['path'],'resolved_path':str(Path(r['path']).resolve())}
   except BaseException:actual[n]={'error':traceback.format_exc()}
  save(D/'actual-tool-after.json',actual);assert all(actual[n].get('sha256')==r['sha256'] for n,r in rows.items());return actual
 def candidate():
  actual=H(D/'candidate.so');assert actual==C;return actual
 # Outer failure never prevents independently collecting source/caches/tools/candidate.
 check('outer_plan_static_baseline',lambda:verify(seal,R));check('compiled_source23',compiled_source);check('complete_existing_caches',caches);check('tool_files',tools);check('candidate_output',candidate);save(D/'independent-after-gates.json',checks);return 1 if any(x['returncode'] for x in checks.values()) else 0

def main():
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--repo',type=Path,required=True);a.add_argument('--output',type=Path);a.add_argument('--execute',action='store_true');args=a.parse_args();R=args.repo.resolve();before=verify(args.reviewed_plan_sha256,R)
 if not args.execute:print(json.dumps(before,indent=2));return
 assert args.output is not None;D=args.output.absolute()
 for p in[D,*D.parents]:assert not p.is_symlink()
 D=D.resolve();D.relative_to(R/'work');assert not D.exists() and D!=P and P not in D.parents;D.mkdir();O=D/'ordinary';O.mkdir();save(D/'gate-before.json',before);save(D/'controller-launch.json',{'plan_sha256':args.reviewed_plan_sha256,'controller_sha256':H(Path(__file__)),'static_proof_sha256':H(P/'static-proof/manifest.json'),'attempt_limit':1,'group':'ordinary','dynamic_weight_and_guard_coverage':0});code=1;harness_code=None;saved_code=None
 try:
  shutil.copyfile(P/'static-proof/static/candidate.so',D/'candidate.so');(D/'launcher').mkdir();source=J(P/'static-proof/reviewed-plan/freeze.json')['source'];save(D/'launcher/resolved-source-sha256.json',source);shutil.copyfile(Path(__file__),O/'adapter.py');shutil.copyfile(P/'saved-verify.py',O/'verify.py');proposal=R/'repro/donation-relay/local-validation-proposal'
  m=load(proposal/'harness_proposal.py','unchanged_ordinary_harness');old=dict(m.EXPECTED);m.EXPECTED=dict(old,candidate=C)
  save(O/'launch.json',{'time_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'adapter_sha256':H(O/'adapter.py'),'harness_path':str((proposal/'harness_proposal.py').relative_to(R)),'harness_sha256':H(proposal/'harness_proposal.py'),'proposal_seal':H(proposal/'manifest.json'),'original_expected':old,'runtime_expected':m.EXPECTED,'only_harness_adaptation':'Candidate hash only; same ordinary12 fixture/comparator/signature/PDA/history/effect assertions. Source map is actual new compiled23 metadata.','group':'ordinary','source_map':source})
  try:m.execute(R,D/'candidate.so','ordinary',O/'ordinary.json');harness_code=0
  except BaseException as e:
   harness_code=e.code if isinstance(e,SystemExit) and isinstance(e.code,int) and e.code!=0 else 1;(O/'failure.txt').write_text(traceback.format_exc())
  save(O/'process-result.json',{'returncode':harness_code,'harness_unchanged':H(proposal/'harness_proposal.py')=='fd6df62699bc5732fffca65d7e6b5c1c872746180563ca3e320f7dbe11f7cb1b','candidate_unchanged':H(D/'candidate.so')==C,'report_exists':(O/'ordinary.json').exists()})
  if harness_code:raise SystemExit(harness_code)
  files={str(p.relative_to(O)):H(p) for p in O.rglob('*') if p.is_file()};save(O/'manifest.json',files);(O/'manifest.sha256').write_text(H(O/'manifest.json')+'  manifest.json\n')
  try:saved=load(O/'verify.py','unchanged_saved_assertions').verify(R,runtime=True);saved_code=0;save(D/'saved-verification.json',saved)
  except BaseException:
   saved_code=1;(D/'saved-verification-failure.txt').write_text(traceback.format_exc());raise
  assert saved['cases']==12 and saved['transaction_submissions']==24 and saved['encoded_signature_fields_checked']==50 and saved['unique_transactions']==12 and saved['unique_transaction_signatures']==25 and saved['effects_checked']==24;code=0
 except BaseException as e:
  code=e.code if isinstance(e,SystemExit) and isinstance(e.code,int) and e.code!=0 else 1;(D/'controller-failure.txt').write_text(traceback.format_exc())
 finally:
  # Always preserve outer integrity failure independently of child/saved results.
  after_code=after_collect(D,R,args.reviewed_plan_sha256)
  if after_code:code=1
  save(D/'controller-exit.json',{'returncode':code,'harness_returncode':harness_code,'saved_verifier_returncode':saved_code,'independent_after_returncode':after_code,'one_runtime_attempt':True,'new_compiler_runs':0})
 if code:raise SystemExit(code)
if __name__=='__main__':main()
