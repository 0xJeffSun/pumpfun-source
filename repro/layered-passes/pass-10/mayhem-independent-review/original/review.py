from pathlib import Path
import json,gzip,hashlib,struct,sys,base64,re,copy,difflib
from solders.transaction import Transaction
R=Path.cwd();W=R/'work/mayhem-result-error-independent-review';P=R/'work/mayhem-next-pass';B=R/'work/mayhem-result-error-build';S=B/'source'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
sys.path.insert(0,str(B/'static/method'));import disasm
O=disasm.a.Elf((P/'inputs/original.so').read_bytes());C=disasm.a.Elf((B/'build01/artifacts/mayhem_recovered.so').read_bytes());U=disasm.a.Elf((B/'build01/target/sbf-solana-solana/release/mayhem_recovered.so').read_bytes())
ins=lambda e,pc:struct.unpack('<BBhi',e.at(pc,8))
def call(e,pc,target):assert ins(e,pc)[0]==0x85 and pc+8+ins(e,pc)[3]*8==target
def branch(e,pc,target):assert pc+8+ins(e,pc)[2]*8==target
assert H(P/'inputs/original.so')=='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
assert H(B/'build01/artifacts/mayhem_recovered.so')=='dda5554a2faf8aa40fc86547e91c4b32c6ac44b878073dcb8bd9f7ac60b47cd4'
assert ins(O,186200)==(0x62,0xa,-8,11);branch(O,186192,186000);call(O,87736,185296);call(O,186280,674280)
assert O.relocations[727056]['type']==8 and struct.unpack('<II',O.at(727056,8))[1]==196888
assert struct.unpack('<QQ',O.at(727040,16))==(4,4)
assert struct.unpack('<II',O.at(727784,8))[1]==710761 and struct.unpack('<Q',O.at(713200,8))[0]==23
assert O.at(710761,23)==b'PumpSwapCpiMathOverflow';assert O.at(711138,35)==b'Math Overflow in Pump Swap CPI call'
for a,t in [(196096,196168),(196176,196376),(196376,196784),(196808,196872)]:branch(O,a,t)
assert ins(C,130856)==(0x62,0xa,-2880,11);branch(C,130848,125648);call(C,130936,573992)
assert ins(C,130800)==(0x0f,0x86,0,0) and ins(C,130840)==(0x4f,0x71,0,0)
assert ins(C,130864)==(0xbf,0xa3,0,0) and ins(C,130872)==(0x07,0x03,0,-2880)
assert struct.unpack('<QQ',C.at(625432,16))==(4,4);assert struct.unpack('<II',C.at(625448,8))[1]==290504
assert C.at(610788,23)==O.at(710761,23)
assert C.at(609619,43)==O.at(709876,43)==b'called `Result::unwrap()` on an `Err` value'
assert ins(C,290536)[0:3]==(0x15,0x01,2) and ins(C,290536)[3]==10
assert ins(C,290576)==(0xb7,0x03,0,23)
for sec in U.sections:
 if sec['flags']&2 and sec['type']!=8:assert U.section_bytes(sec)==C.section_bytes(C.by_name[sec['name']])
# Reproduce exact reviewed source patch and preserve prior opaque attribution.
diff=''
for name in ['buy_pump_swap.rs','pump_swap_types.rs']:
 before=(P/'before'/name).read_text();after=(P/'proposal'/name).read_text()
 diff+=''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/mayhem/src/instructions/'+name,tofile='b/programs/mayhem/src/instructions/'+name))
assert diff==(P/'proposal.patch').read_text()
assert J(B/'static/full-ledger.json')['original_rows']==J(R/'repro/layered-passes/pass-01/results/mayhem/residual-ledger.json')['original_rows']

# Frozen proposal -> actual compiled source, exact two-file delta.
gate=J(B/'gate-before.json');actual={}
for n,h in gate['main_sources'].items():
 f=S/n
 if not f.exists():continue
 want=P/'proposal'/Path(n).name
 if n.endswith(('buy_pump_swap.rs','pump_swap_types.rs')):
  if not want.exists():want=P/'proposal'/n
  assert f.read_bytes()==want.read_bytes(),(n,str(want))
  assert H(f)!=h
 else:assert H(f)==h,n
 actual[n]=H(f)
for m in ['helpers','runtime_inputs']:
 for n,h in gate[m].items():assert H(S/n)==h,n
attempt=J(B/'build01/build-attempt.json');assert attempt['returncode']==0 and attempt['source_unchanged'];assert attempt['source_sha256']==attempt['source_after_sha256']
for n,h in attempt['source_sha256'].items():assert H(R/n)==h,n
# Independent corpus accounting and retained checks, no transaction execution.
attempts=J(B/'replay-attempts.json');assert len(attempts)==21 and all(x['returncode']==0 for x in attempts)
flat=0;tx_count=0;verified_transactions=0;verified_signatures=0;diag=0;counts=[]
def validate_tx(raw):
 global verified_transactions,verified_signatures
 tx=Transaction.from_bytes(base64.b64decode(raw));v=tx.verify_with_results();assert v and all(v);verified_transactions+=1;verified_signatures+=len(v)
for a in attempts:
 if a['name']=='burn':continue
 d=J(B/a['output']);assert not d['mismatches'] and d['case_count']==len(d['cases']);assert d['candidate_sha256']==H(B/'build01/artifacts/mayhem_recovered.so');flat+=d['case_count'];tx_count+=d.get('signed_transactions',2*d['case_count']);counts.append([a['name'],d['case_count']])
 for row in d['cases']:
  assert not row.get('different_fields',[])
  if 'equal'in row:assert row['equal'] is True
  for side in ['original','candidate']:
   if 'transaction_base64'in row[side]:validate_tx(row[side]['transaction_base64'])
 diag+=len(d.get('normalized_log_differences',[]))
assert flat==9589
burn=J(B/'replay/burn/comparison.json');baseline=J(R/'repro/mayhem/twentyfour/burn-sequences/comparison.json');assert burn['case_count']==3 and burn['mismatches']==baseline['mismatches']==[0,1,2];assert burn['signed_transactions']==12
program='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
for row,old in zip(burn['cases'],baseline['cases']):
 assert row['different_fields']==old['different_fields']==['second.logs_without_compute_numbers']
 a,b=row['original'],row['candidate'];assert row['same_signed_message']
 for k in ['error','parsed_after','events','inner_instructions','return_data','logs_without_compute_numbers']:assert a[k]==b[k],k
 for side in ['original','candidate']:
  t=row[side];validate_tx(t['transaction_base64']);validate_tx(t['sequential_second']['transaction_base64']);assert t['runtime_sigverify'] and t['runtime_blockhash_check'] and t['signature_verified_before_and_after'];assert t['sequential_second']['signature_valid'] and t['sequential_second']['new_blockhash']!=t['sequential_second']['first_blockhash']
 for phase in ['before','after']:
  assert {k:v for k,v in a[phase].items()if k!=program}=={k:v for k,v in b[phase].items()if k!=program}
  assert {k:v for k,v in a['sequential_second'][phase].items()if k!=program}=={k:v for k,v in b['sequential_second'][phase].items()if k!=program}
 for k in ['error','transaction_base64']:assert a['sequential_second'][k]==b['sequential_second'][k]
 assert a['sequential_second']['metadata']['inner_instructions']==b['sequential_second']['metadata']['inner_instructions']
 la=a['sequential_second']['logs_without_compute_numbers'];lb=b['sequential_second']['logs_without_compute_numbers'];assert len(la)==len(lb)
 differences=[(x,y)for x,y in zip(la,lb)if x!=y];assert len(differences)==1
 for x,y in differences:
  assert x=='Program log: AnchorError thrown in programs/mayhem-program/src/instructions/burn.rs:82. Error Code: MayhemModeEnded. Error Number: 6004. Error Message: Mayhem mode ended.'
  assert y=='Program log: AnchorError thrown in src/instructions/burn.rs:43. Error Code: MayhemModeEnded. Error Number: 6004. Error Message: Mayhem mode ended.'
assert flat+2*burn['case_count']==9595 and tx_count+burn['signed_transactions']==19190
results=J(B/'verification/results.json');assert len(results)==15 and all(x['returncode']==0 for x in results)
out={'status':'PASS_WITH_EXPLICIT_LIMITS','original_sha256':H(P/'inputs/original.so'),'candidate_sha256':H(B/'build01/artifacts/mayhem_recovered.so'),'typed11_result_debug_path_verified':True,'unchanged_source_delta_files':2,'flat_receipts':20,'flat_comparisons':flat,'burn_sequences':3,'burn_instruction_comparisons':6,'total_comparisons':9595,'signed_executions_recorded_or_derived':tx_count+12,'retained_transactions_independently_signature_checked':verified_transactions,'retained_signatures_independently_checked':verified_signatures,'burn_known_source_location_only_differences':3,'flat_diagnostic_difference_rows':diag,'saved_verifier_exit_zeros':15,'new_runtime_execution':False,'full_semantic_or_raw_log_equivalence':False}
(W/'result.json').write_text(json.dumps(out,indent=2)+'\n');(W/'counts.json').write_text(json.dumps(counts,indent=2)+'\n');print(json.dumps(out,indent=2))
