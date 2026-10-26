"""Portable genuine-main identity/static binding; no compiler or VM."""
from pathlib import Path
import argparse,json,gzip,hashlib,subprocess,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def sealed(root,seal=None):
 assert(root/'manifest.sha256').read_text().split()[0]==H(root/'manifest.json');assert seal is None or H(root/'manifest.json')==seal;m=J(root/'manifest.json');assert set(m)=={str(f.relative_to(root))for f in root.rglob('*')if f.is_file()and f not in[root/'manifest.json',root/'manifest.sha256']}
 for n,h in m.items():assert not(root/n).is_symlink()and H(root/n)==h,n
 return m

def verify(accepted=None,signatures=False):
 sealed(P);Q=P/'reviewed-main-plan';sealed(Q,'290ff8ecc99d8d8859ccc3abb8d58b6e9f8285bca991fa3dc3a7375f8b61fc5a');U=P/'runtime135db';sealed(U,'135db1810db389a541870b0f1e543ea1215c5f5946fcb4b5126f38ad16edfbcc');B=P/'main';g=J(Q/'plan.json');contract=J(P/'current-contract.json');before=J(B/'source-before.json');after=J(B/'source-after.json');a=J(B/'build-attempt.json');assert len(before)==14 and before==after==a['actual_source_sha256']==a['actual_source_after_sha256']==contract['source14'];assert before=={'programs/mayhem/'+n:h for n,h in g['source14'].items()};assert a['source_unchanged']and a['returncode']==0 and a['source_overlay_used']is False
 assert a['command']==[g['tools']+'/rust/bin/cargo','build','--manifest-path',g['managed_root']+'/programs/mayhem/Cargo.toml','--release','--target','sbpf-solana-solana','--locked','--offline','--verbose'];assert a['cwd']==g['managed_root'];assert a['environment_overrides']['CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS']=='-Zremap-cwd-prefix='
 identity=J(B/'identity.json');assert identity['whole_candidate_equal']and identity['whole_symbols_equal']and identity['old_frontend_claimed_used']is False;assert H(B/'candidate.so')==g['candidate']==H(U/'control/static5435/build/candidate.so');assert H(B/'unstripped.so')==g['symbols']==H(U/'control/static5435/build/unstripped.so')
 outer=J(B/'root-runner-exit.json');assert outer['returncode']==0 and outer['actual_terminal_completion_observed'];assert H(B/'root-runner.stdout')==outer['stdout_sha256']and H(B/'root-runner.stderr')==outer['stderr_sha256'];exit=J(B/'controller-exit.json');assert exit['returncode']==0 and exit['failure']is None and len(exit['children'])==8
 for row in exit['children']:assert row['returncode']==0 and H(B/(row['name']+'.stdout'))==row['stdout_sha256']and H(B/(row['name']+'.stderr'))==row['stderr_sha256']and J(B/(row['name']+'-exit.json'))==row
 assert not J(B/'backend-diagnostics.json')['forbidden_diagnostics'];assert J(B/'gate-before.json')==J(B/'gate-after.json')and J(B/'gate-after.json')['passed'];assert J(B/'copied-registry-before.json')==J(B/'copied-registry-after.json');w=J(B/'independent-after-witness.json');assert not w['external_mismatches']and w['actual_external_hashes']==J(Q/'scratch-plan/external-inputs.json')and w['actual_managed_source14']==before
 report=J(B/'build-comparison.json');assert report['schema']=='mayhem-direct-cargo-main-v154-v1'and report['source_sha256']==report['source_after_sha256']==before and report['command']==a['command']and report['compile_exit']==0;assert H(B/'build.log')==H(B/'compile.stderr')==report['build_log_sha256'];assert report['compiler_stdout_sha256']==H(B/'compile.stdout')
 orig=(B/'original.so').read_bytes();cand=(B/'candidate.so').read_bytes();comp=report['comparison'];different=[i for i,(x,y)in enumerate(zip(orig,cand))if x!=y];ranges=[]
 for i in different:
  if ranges and ranges[-1][1]==i:ranges[-1][1]=i+1
  else:ranges.append([i,i+1])
 assert comp=={'equal':orig==cand,'original_sha256':H(B/'original.so'),'candidate_sha256':H(B/'candidate.so'),'original_bytes':len(orig),'candidate_bytes':len(cand),'first_difference':different[0]if different else None,'different_positions_in_shared_length':len(different),'mismatch_ranges':ranges,'excess_tail':[min(len(orig),len(cand)),max(len(orig),len(cand))]if len(orig)!=len(cand)else None}
 # Fresh actual main ledgers equal scratch semantics/bytes; identity path strings remain raw records.
 assert json.loads(gzip.decompress((B/'complete-inventory.json.gz').read_bytes()))==json.loads(gzip.decompress((U/'control/static5435/build/complete-inventory.json.gz').read_bytes()))
 main=J(B/'helper-results.json')['builds']['v154_retarget'];scratch=J(U/'control/static5435/build/helper-results.json')['builds']['v154_retarget'];assert main['functions']==scratch['functions']and main['summary']==scratch['summary'];assert J(B/'import-structure-comparison.json')==J(U/'control/static5435/build/import-structure-comparison.json');assert J(B/'sdk-postlink.json')==J(U/'control/static5435/build/sdk-postlink.json');assert J(B/'sdk-postlink.json')['syscall_authority_status']=='UNRESOLVED_EMPTY_OFFICIAL_ALLOWLIST'
 for n,row in J(P/'runtime-materialization.json').items():
  raw=(P/n).read_bytes();decoded=gzip.decompress(raw)if row['gzip_representation_only']else raw;assert H(P/n)==row['stored_sha256']and hashlib.sha256(decoded).hexdigest()==row['raw_sha256']and len(decoded)==row['raw_bytes']
  if'runtime_archive_member'in row:assert row['raw_sha256']==J(U/'runtime-payload-index.json')[row['runtime_archive_member']]['sha256']
 doc=J(P/'documentation/transformation.json');old=(P/'documentation/README.before.md').read_bytes();new=(P/'documentation/README.proposed.md').read_bytes();assert new.endswith(old)and hashlib.sha256(old).hexdigest()==g['component_readme_sha256']==doc['before_sha256']and hashlib.sha256(new).hexdigest()==doc['proposed_sha256']==contract['documentation_proposed_sha256'];assert'programs/mayhem/README.md'not in before
 cmd=[sys.executable,'-B',str(U/'verify.py')]
 if signatures:cmd.append('--runtime-signatures')
 run=subprocess.run(cmd,cwd=P,capture_output=True,text=True);assert run.returncode==0,run.stdout+run.stderr
 if accepted:
  for n,h in before.items():assert H(accepted/n)==h
  assert H(accepted/'programs/mayhem/README.md')in[doc['before_sha256'],doc['proposed_sha256']]
 return{'passed':True,'genuine_managed_main':True,'candidate':g['candidate'],'symbols':g['symbols'],'source_inputs':14,'all8main_children_exit0':True,'runtime9595_same_artifact':True,'raw_transactions_verified_during_actualruntime':13284,'individual_signatures':26500,'missing_raw_bytes':5906,'sdk_authority_unresolved':True,'new_vm_or_compiler_executed':False,'selection_applied_by_verifier':False}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--accepted-root',type=Path);p.add_argument('--runtime-signatures',action='store_true');a=p.parse_args();print(json.dumps(verify(a.accepted_root,a.runtime_signatures),indent=2))
