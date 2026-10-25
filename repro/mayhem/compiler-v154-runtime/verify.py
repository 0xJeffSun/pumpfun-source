"""Portable saved-only verification; no VM/compiler/network invocation."""
from pathlib import Path
import argparse,collections,gzip,hashlib,json,re,shutil,subprocess,sys,tarfile,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def sealed(root,seal=None):
 assert(root/'manifest.sha256').read_text().split()[0]==H(root/'manifest.json');assert seal is None or H(root/'manifest.json')==seal
 m=J(root/'manifest.json');assert set(m)=={str(f.relative_to(root))for f in root.rglob('*')if f.is_file()and f not in[root/'manifest.json',root/'manifest.sha256']}
 for n,h in m.items():assert not(root/n).is_symlink()and H(root/n)==h,n
 return m

def main():
 p=argparse.ArgumentParser();p.add_argument('--accepted-root',type=Path);p.add_argument('--runtime-signatures',action='store_true');p.add_argument('--output',type=Path);args=p.parse_args();sealed(P);C=P/'control';sealed(C,'7fcfaab9895b4984a5bbd7079822495a17b1994a43195f976daeef69551d4ed4');g=J(C/'inputs.json');outer=J(P/'root-runner-exit.json');assert outer['returncode']==0 and outer['actual_terminal_completion_observed']and H(P/'root-runner.stdout')==outer['stdout_sha256']and H(P/'root-runner.stderr')==outer['stderr_sha256']
 if args.output:assert not args.output.resolve().is_relative_to(P);args.output.mkdir(parents=True,exist_ok=False)
 with tempfile.TemporaryDirectory(prefix='mayhem-saved-only-')as td:
  T=Path(td);index=J(P/'runtime-payload-index.json');seen=set()
  with tarfile.open(P/'runtime-payload.tar.gz')as tar:
   for member in tar:
    n=Path(member.name);assert member.isfile()and not n.is_absolute()and '..'not in n.parts and member.name in index and member.name not in seen;seen.add(member.name);dest=T/n;dest.parent.mkdir(parents=True,exist_ok=True);raw=tar.extractfile(member).read();assert len(raw)==index[member.name]['bytes']and hashlib.sha256(raw).hexdigest()==index[member.name]['sha256'];dest.write_bytes(raw)
  assert seen==set(index);A=T/'controls';W=T/'runtime';exit=J(A/'controller-exit.json');assert exit['returncode']==0 and exit['failure']is None and len(exit['children'])==7
  for row in exit['children']:
   assert row['returncode']==0 and H(A/(row['name']+'.stdout'))==row['stdout_sha256']and H(A/(row['name']+'.stderr'))==row['stderr_sha256'];assert J(A/(row['name']+'-exit.json'))==row
  assert J(A/'gate-before.json')==J(A/'gate-after.json')and J(A/'gate-after.json')['passed'];witness=J(A/'independent-post-attempt-witness.json');assert not witness['external_mismatches']and not witness['runtime_mismatches'];assert witness['actual_retained_external_hashes']==J(C/'static5435/reviewed-plan/external-inputs.json')and witness['actual_runtime_hashes']==J(C/'runtime-python-files.json')
  assert witness['seed_source14_actual']==witness['current_root_source14_actual']==g['source14'];expected=J(A/'runtime-source-before.json');expected['repro/mayhem/result-error-candidate.so']=g['candidate'];assert expected==J(A/'runtime-source-after.json');assert J(A/'burn-fixtures-before.json')==J(A/'burn-fixtures-after.json')
  for n,h in g['source14'].items():assert H(C/'seed/programs/mayhem'/n)==h
  shutil.copytree(C/'seed',W/'source');shutil.copy2(C/'static5435/build/candidate.so',W/'source/repro/mayhem/result-error-candidate.so');shutil.copytree(C/'burn-fixtures',W/'burn-fixtures');assert {str(f.relative_to(W/'source')):H(f)for f in(W/'source').rglob('*')if f.is_file()}==expected
  assert {str(f.relative_to(W/'burn-fixtures')):H(f)for f in(W/'burn-fixtures').rglob('*')if f.is_file()}==J(A/'burn-fixtures-after.json');(W/'build01/artifacts').mkdir(parents=True);shutil.copy2(C/'static5435/build/candidate.so',W/'build01/artifacts/mayhem_recovered.so')
  assert H(C/'static5435/build/candidate.so')==g['candidate']=='ca5d4f54b14e2f67c4eca56fcac29b54801906cecf23c463801916fd9d6b6621';assert H(C/'static5435/build/unstripped.so')==g['symbols']=='f9de20e991c9e14e77f2d9cded7da9c2dff892353f06f7c6f00ea18bfa8e911e'
  for n in ['replay.py','verify_replays.py','summarize.py']:assert(W/n).read_bytes()==(C/'baseline6129/methods'/n).read_bytes()
  # This verifier invokes only reviewed saved checks, never replay.py or a VM fixture.
  for cmd in [[sys.executable,'-B',str(C/'static5435/verify.py')],[sys.executable,'-B',str(C/'accept_receipts.py'),str(W)]]:
   before=H(W/'retarget-acceptance.json');r=subprocess.run(cmd,cwd=W,capture_output=True,text=True);assert r.returncode==0,r.stdout+r.stderr;assert H(W/'retarget-acceptance.json')==before
  acceptance=J(W/'retarget-acceptance.json');assert acceptance['passed']and acceptance['instruction_comparisons']==9595 and acceptance['suites']==21 and len(acceptance['existing61diagnostics'])==61 and acceptance['current_diagnostic_rows']==61
  assert len(J(W/'replay-attempts.json'))==21 and all(x['returncode']==0 for x in J(W/'replay-attempts.json'));assert len(J(W/'verification/results.json'))==15 and all(x['returncode']==0 for x in J(W/'verification/results.json'))
  signatures=J(A/'saved-raw-signatures.stdout');assert(signatures['raw_transactions_signature_verified'],signatures['individual_signatures_verified'],signatures['executions_without_retained_raw_transaction_bytes'])==(13284,26500,5906);assert signatures['all_execution_signatures_independently_verified']is False
  diagnostics=collections.Counter();strip=lambda rows:[r for r in rows if not re.search(r' consumed \d+ of \d+ compute units',r)]
  for row in acceptance['existing61diagnostics']:
   assert row['current']is not None and row['baseline']['original_logs']==row['current']['original_logs']
   if row['baseline']==row['current']:diagnostics['raw_identical']+=1
   elif strip(row['baseline']['candidate_logs'])==strip(row['current']['candidate_logs']):diagnostics['candidate_compute_lines_only']+=1
   else:diagnostics['other_candidate_log_difference']+=1
  assert diagnostics=={'raw_identical':3,'candidate_compute_lines_only':58}
  if args.runtime_signatures:
   import importlib.metadata;assert importlib.metadata.version('solders')=='0.27.1'
   for name,cmd in [('raw-signatures',[sys.executable,'-B',str(C/'saved_signature_inventory.py'),str(W)]),('unchanged-verifiers',[sys.executable,'-B',str(W/'verify_replays.py')])]:
    r=subprocess.run(cmd,cwd=W/'source',capture_output=True,text=True,env={**__import__('os').environ,'PYTHONDONTWRITEBYTECODE':'1','PYTHONPATH':str(W/'source/scripts')});assert r.returncode==0,r.stdout+r.stderr
    if args.output:(args.output/(name+'.stdout')).write_text(r.stdout);(args.output/(name+'.stderr')).write_text(r.stderr)
   assert J(W/'verification/results.json')==[{'name':r['name'],'returncode':0}for r in J(W/'verification/results.json')]
  if args.accepted_root:
   for n,h in g['source14'].items():assert H(args.accepted_root/'programs/mayhem'/n)==h
  result={'passed':True,'candidate':g['candidate'],'symbols':g['symbols'],'source14':True,'actual_outer_and7children_exit0':True,'instruction_comparisons':9595,'recorded_or_derived_signed_executions':19190,'retained_raw_transactions_verified_during_actualrun':13284,'individual_signatures_verified_during_actualrun':26500,'missing_raw_transaction_executions':5906,'diagnostics':dict(diagnostics),'saved_signatures_rechecked_now':args.runtime_signatures,'vm_executions_by_verifier':0,'compiler_invocations':0,'sdk_authority':'unresolved0Ballowlist; warning-only officialcheck','promotion_authorized':False}
  if args.output:(args.output/'result.json').write_text(json.dumps(result,indent=2)+'\n')
  print(json.dumps(result,indent=2))
if __name__=='__main__':main()
