"""Offline saved-evidence verifier; no VM, transaction submission or compilation."""
from pathlib import Path
import json,hashlib,base64,importlib.util,sys,gzip
from solders.transaction import VersionedTransaction
P=Path(__file__).resolve().parent
J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def encoded(x,path=''):
 if isinstance(x,dict):
  for k,v in x.items():
   if k.endswith('transaction_base64') and isinstance(v,str):yield path+'/'+k,v
   else:yield from encoded(v,path+'/'+k)
 elif isinstance(x,list):
  for i,v in enumerate(x):yield from encoded(v,path+'/'+str(i))
def verify():
 manifest=P/'manifest.json'
 if manifest.exists():
  assert H(manifest)==(P/'MANIFEST.sha256').read_text().strip()
  m=J(manifest);assert {str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}==set(m)|{'manifest.json','MANIFEST.sha256'}
  for n,h in m.items():assert not (P/n).is_symlink() and 'keypair' not in n and H(P/n)==h,n
 C=P/'candidate.so';digest=H(C);out={};total=0
 for name,count in [('differential',17331),('initializer-history',2),('initializer-rejections',28),('messages',2),('codec-rejections',9),('compared-values',9),('authority-logs',3),('signed-transfers',56),('serialization-error',1),('focused20',20),('donation-sequence',None)]:
  data=J(P/'runtime'/(name+'.json'));assert data['candidate_sha256']==digest and not data.get('mismatches',data.get('failures',[]))
  assert not data.get('unexpected_errors',[]) and not data.get('unexpected_original_errors',[])
  if count is not None:assert data['case_count']==count;total+=count
  else:assert len(data['steps'])==10
  rows=list(encoded(data));sig=0
  for path,b in rows:
   raw=base64.b64decode(b,validate=True);tx=VersionedTransaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results()),(name,path);sig+=len(tx.signatures)
  out[name]={'encoded_fields':len(rows),'verified_signatures':sig,'sha256':H(P/'runtime'/(name+'.json'))}
 assert total==17461
 progress=J(P/'runtime/progress.json');assert len(progress)==11 and all(x['returncode']==0 and x['passed'] for x in progress)
 focused=J(P/'runtime/focused20.json');assert focused['runtime']=={'signature_verification':True,'blockhash_check':True,'history':'default enabled; fresh VM per case'}
 assert all(x['match'] and not any(x['expected_failures'].values()) for x in focused['cases'])
 # The original saved-runtime validator retains all existing diagnostics and historical signature checks.
 spec=importlib.util.spec_from_file_location('prior_saved',P/'verify_prior_saved.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);assert m.RESULT['comparison_receipts']==17441
 sys.path.insert(0,str(P/'validation-layer/harness'))
 import check_retained_diagnostics as d
 diagnostics=d.check(P/'runtime/differential.json');assert len(diagnostics['rows'])==11 and not diagnostics['mismatches']
 original=P/'reference/analysis-method/inputs/original.so';a=original.read_bytes();b=C.read_bytes()
 comparison={'original_bytes':len(a),'candidate_bytes':len(b),'original_sha256':H(original),'candidate_sha256':digest,'full_byte_equality':a==b,'first_difference':next((i for i,(x,y) in enumerate(zip(a,b)) if x!=y),None),'different_positions_in_shared_length':sum(x!=y for x,y in zip(a,b)),'length_difference':len(b)-len(a)}
 assert comparison==J(P/'build-01/build-comparison.json')['comparison']
 full=json.loads(gzip.decompress((P/'complete-byte-comparison.json.gz').read_bytes()));cursor=0
 for start,end,equal in full['shared_byte_runs_start_end_equal']:
  assert start==cursor and start<end
  assert all((x==y)==equal for x,y in zip(a[start:end],b[start:end]))
  cursor=end
 assert cursor==min(len(a),len(b)) and full['original_only_tail']==[cursor,len(a)] and full['candidate_only_tail']==[cursor,len(b)]
 source=J(P/'inputs/corrected-source-sha256.json');assert len(source)==26
 for n,h in source.items():assert H(P/'source'/n)==h
 build=J(P/'build-result.json');assert build['returncode']==0 and build['source_before']==build['source_after']==source and not build['backend_stack_diagnostics']
 base=J(P/'inputs/source-sha256.json');assert set(source)==set(base)
 assert {n for n in source if source[n]!=base[n]}=={'programs/pump-fees/src/donation.rs','programs/pump-fees/src/sharing_update.rs'}
 assert H(P/'source/programs/pump-fees/src/donation.rs')==H(P/'inputs/fees-quote-ownership/proposed-donation.rs')
 assert H(P/'source/programs/pump-fees/src/sharing_update.rs')==H(P/'inputs/fees-sharing/pending-sharing_update.rs')
 tools=J(P/'inputs/tools-before.json');phase=J(P/'tool-phase-provenance.json')
 assert phase['candidate_sha256']==digest and phase['symbols_sha256']==H(P/'symbols.so')
 assert phase['strip']['sha256']==tools['strip_tool']['sha256']
 assert {n:v['sha256'] for n,v in phase['compile'].items()}=={n:v['sha256'] for n,v in tools['compile_tools'].items()}
 assert phase['sdk_files']==tools['sdk_template_files']
 for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert build['tool_after'][v['resolved_path']]==v['sha256']
 # Regenerate full inventory and caller proof from retained ELFs; no executable is run.
 spec=importlib.util.spec_from_file_location('inspection',P/'reference/inspect_candidate.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 for n,v in m.run().items():assert v==J(P/n),n
 from elf_reader import Elf
 from window_tools import instructions
 gate=J(P/'static-gate.json');assert gate['passed'] and gate['candidate_sha256']==digest
 elves={'original':Elf(original),'candidate':Elf(C)}
 for row in gate['reserve_predicates']:
  for x in row['instructions']:assert instructions(elves[row['side']],x['pc'],x['size'])[0]==x
 for side in ['original','candidate']:
  for x in gate['quote_ownership'][side]:assert instructions(elves[side],x['pc'],x['size'])[0]==x
 return {'verified':True,'candidate_sha256':digest,'baseline':17441,'focused':20,'separate_sequence_steps':10,'signatures':out,'diagnostics':diagnostics,'whole_original_equal':a==b,'new_cases':0}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
