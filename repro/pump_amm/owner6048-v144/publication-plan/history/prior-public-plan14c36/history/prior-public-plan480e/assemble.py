"""UNEXECUTED bounded public assembler. No compiler/VM/active writes."""
from pathlib import Path
import argparse,hashlib,json,shutil,importlib.util,sys,subprocess,traceback
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_bytes())
LIMIT=64*1024*1024
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n')
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def safe(root,rel):
 assert not Path(rel).is_absolute()and'..'not in Path(rel).parts;p=root/rel
 for q in[p,*p.parents]:
  if q==root.parent:break
  assert not q.is_symlink(),q
 return p
def controls(seal):
 assert H(P/'manifest.json')==seal==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
 for n,h in m.items():assert H(safe(P,n))==h
 assert H(P/'managed-plan-manifest.json')==J(P/'plan.json')['managed_plan_seal']
 return {'status':'PASS_UNEXECUTED_PUBLIC_ASSEMBLER_CONTROLS','compiler_VM_runs':0,'main_build_acceptance_not_predeclared':True,'maximum_physical_payload_bytes':LIMIT}
def main():
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--repo',type=Path);a.add_argument('--main-runner-exit',type=Path);a.add_argument('--main-runner-stdout',type=Path);a.add_argument('--main-runner-stderr',type=Path);a.add_argument('--selection-proposal-root',type=Path);a.add_argument('--assemble',action='store_true');x=a.parse_args();pre=controls(x.reviewed_plan_sha256)
 if not x.assemble:print(json.dumps(pre,indent=2));return
 assert all([x.repo,x.main_runner_exit,x.main_runner_stdout,x.main_runner_stderr,x.selection_proposal_root]);R=x.repo.absolute();g=J(P/'plan.json');assert str(R)==g['managed_root'];M=safe(R,g['managed_plan_relative_path']);mc=load(M/'controller.py','main_controls');mc.tree(M,g['managed_plan_seal']);select=load(M/'selection_proposal.py','selection_controls');_,mg,D,binding=select.checked_main(R,g['managed_plan_seal'],x.main_runner_exit,x.main_runner_stdout,x.main_runner_stderr)
 selection=x.selection_proposal_root.absolute();selection.relative_to(R/'work');assert J(selection/'actual-binding.json')==binding
 status=J(selection/'status.proposed.json');before=J(M/'witness/status.before.json');assert all(status[k]==before[k]for k in before if k!='pump_amm');assert status['pump_amm']['candidate_sha256']==binding['candidate_sha256']
 O=safe(R,g['publication_relative_path']);assert not O.exists()and O!=P and P not in O.parents and O not in selection.parents and selection not in O.parents;O.mkdir(parents=True,exist_ok=False);logical={};fail=None;code=1
 def add(path,relative):
  assert not path.is_symlink()and path.is_file()and relative not in logical;safe(O,relative);st=path.stat();record={'bytes':st.st_size,'sha256':H(path),'mode':st.st_mode&0o777,'original_mtime_ns':st.st_mtime_ns,'parts':[]}
  if st.st_size<=LIMIT:
   target=safe(O,relative);target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(path,target);record['parts'].append({'path':relative,'bytes':st.st_size,'sha256':H(target)})
  else:
   with path.open('rb')as src:
    i=0
    while True:
     block=src.read(LIMIT)
     if not block:break
     part=f'.split/{record["sha256"]}/{i:06d}.part';target=safe(O,part);target.parent.mkdir(parents=True,exist_ok=True)
     if target.exists():assert target.read_bytes()==block
     else:target.write_bytes(block)
     record['parts'].append({'path':part,'bytes':len(block),'sha256':hashlib.sha256(block).hexdigest()});i+=1
  assert path.stat().st_size==st.st_size and path.stat().st_mtime_ns==st.st_mtime_ns and H(path)==record['sha256'],'Input changed during copy'
  logical[relative]=record
 def copy_tree(root,prefix):
  assert not root.is_symlink()and root.is_dir()
  for p in sorted(root.rglob('*')):
   assert not p.is_symlink(),p
   if p.is_file():add(p,prefix+'/'+str(p.relative_to(root)))
 def build_records(root,prefix,with_inventory):
  # Exact build evidence scope. Private targets/caches/generated keypairs are
  # never recursively scanned, read or represented as preserved source inputs.
  for p in sorted(root.iterdir()):
   assert not p.is_symlink(),p
   if p.is_file():assert not p.name.endswith('-keypair.json');add(p,prefix+'/'+p.name)
  copy_tree(root/'source',prefix+'/source')
  for n in ['build-attempt.json','build-comparison.json','build.log']:add(root/'build-01'/n,prefix+'/build-01/'+n)
  Q=safe(R,mg['scratch_build_plan_relative_path'])
  for n in J(Q/'tools.json')['sdk_source']:add(root/'build-01/sdk'/n,prefix+'/build-01/sdk/'+n)
  for nested in ['root-observed']+(['inventory']if with_inventory else[]):
   if(root/nested).exists():copy_tree(root/nested,prefix+'/'+nested)
 try:
  copy_tree(M,'managed-plan');copy_tree(P,'publication-plan');copy_tree(safe(R,mg['scratch_build_plan_relative_path']),'build-plan');copy_tree(safe(R,mg['emitted_relative_path']),'emitted');copy_tree(safe(R,mg['spill_relative_path']),'spill');copy_tree(safe(R,'work/amm-owner6048-runtime-only-template'),'runtime-template');copy_tree(safe(R,mg['runtime_relative_path']),'runtime');build_records(safe(R,mg['scratch_build_relative_path']),'scratch-build',True);build_records(D,'main',False);copy_tree(selection,'selection-proposal')
  for f,n in [(x.main_runner_exit,'main-runner-exit.json'),(x.main_runner_stdout,'main-runner.stdout'),(x.main_runner_stderr,'main-runner.stderr')]:add(f,'root-observed/'+n)
  # Explicit named original collector and saved verification receipts/failures.
  for name in ['amm-owner6048-emitted-collection-exit.json','amm-owner6048-emitted-collection.stdout','amm-owner6048-emitted-collection.stderr','amm-owner6048-emitted-proof-v1-final-exit.json','amm-owner6048-emitted-proof-v1-final.stdout','amm-owner6048-emitted-proof-v1-final.stderr','amm-owner6048-emitted-proof-v1-relocated-exit.json','amm-owner6048-emitted-proof-v1-relocated.stdout','amm-owner6048-emitted-proof-v1-relocated.stderr','amm-owner6048-spill-disjointness-v1-final-exit.json','amm-owner6048-spill-disjointness-v1-final.stdout','amm-owner6048-spill-disjointness-v1-final.stderr','amm-owner6048-spill-disjointness-v1-relocated-exit.json','amm-owner6048-spill-disjointness-v1-relocated.stdout','amm-owner6048-spill-disjointness-v1-relocated.stderr','amm-owner6048-managed-main-plan-v1-preflight-exit.json','amm-owner6048-managed-main-plan-v1-preflight.stdout','amm-owner6048-managed-main-plan-v1-preflight.stderr']:add(safe(R,'work/'+name),'root-observed/'+name)
  save(O/'logical-files.json',logical);save(O/'publication-binding.json',binding);shutil.copyfile(P/'verify_public.py',O/'verify_public.py')
  (O/'README.md').write_text('# AMM collect owner6048 bounded correction\n\nThe single genuine managed-source build matches both complete scratch ELFs: '+binding['candidate_sha256']+' / '+binding['symbols_sha256']+'. Exactly one unchanged25-suite run retained17462cases,35074submissions and35418signaturefields. Strict owner6048 compared/origin assertions remain zero. Emitted/REVIEW.md proves the narrow plain6048 return; spill/REVIEW.md proves known frame-byte disjointness with opaque alias/callee effects unproved. Whole original equality remains false.\n\nRun python3 -B verify_public.py for all physical/logical saved bytes. Add --saved-deep for saved-only emitted/spill/signature/nochange checks after lossless temporary materialization. No compiler or VM is invoked. Every physical file is at most64MiB; logical-files.json records the original bytes, hashes, mode/mtime and any lossless parts. Entire named immutable plans/proofs/runtime receipts and their failures are retained. Main/scratch private target/cache directories and generated deployment keypairs are outside this archive scope; exact source30, tool/cache/registry observations, SDK53, logs, whole ELFs and reproducible locked dependency plan remain retained. No status, source, Git or selection was applied by this assembler.\n')
  payload={str(p.relative_to(O)):H(p)for p in sorted(O.rglob('*'))if p.is_file()};assert all((O/n).stat().st_size<=LIMIT for n in payload);save(O/'manifest.json',payload);(O/'manifest.sha256').write_text(H(O/'manifest.json')+'  manifest.json\n')
  # Verify actual output and lossless raw receipt restoration with the SAME
  # saved-only verifiers. No archived compiler/controller/VM is invoked.
  assert(O/'manifest.json').stat().st_size<=LIMIT
  reader=load(O/'verify_public.py','actual_public_reader');reader.check(O)
  cmd=[sys.executable,'-B',str(O/'verify_public.py'),'--saved-deep']
  with(O.parent/'saved-verification.stdout').open('xb')as out,(O.parent/'saved-verification.stderr').open('xb')as err:verified=subprocess.run(cmd,cwd=O,stdout=out,stderr=err)
  save(O.parent/'saved-verification-exit.json',{'command':cmd,'returncode':verified.returncode,'stdout_sha256':H(O.parent/'saved-verification.stdout'),'stderr_sha256':H(O.parent/'saved-verification.stderr'),'compiler_VM_runs':0});assert verified.returncode==0
  controls(x.reviewed_plan_sha256);select.checked_main(R,g['managed_plan_seal'],x.main_runner_exit,x.main_runner_stdout,x.main_runner_stderr);code=0
 except BaseException:fail=traceback.format_exc()
 finally:
  result={'returncode':code,'failure':fail,'output':str(O),'public_manifest_sha256':H(O/'manifest.json')if(O/'manifest.json').exists()else None,'logical_files':len(logical),'split_original_files':sum(len(v['parts'])>1 for v in logical.values()),'compiler_VM_runs':0,'source_status_Git_writes':False}
  save(O.parent/'assembler-exit.json',result)
 if code:raise SystemExit(code)
 print(json.dumps(result,indent=2))
if __name__=='__main__':main()
