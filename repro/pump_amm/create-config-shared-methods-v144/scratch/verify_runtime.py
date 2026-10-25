"""Read-only existing-receipt, transaction-signature and scalar-diagnostic checks."""
from pathlib import Path
import base64,gzip,hashlib,json,struct,sys
sys.dont_write_bytecode=True
from solders.transaction import Transaction
W=Path(__file__).resolve().parent;OUT=W/'runtime-01';sha=lambda b:hashlib.sha256(b).hexdigest()
def payload(p):
 if not p.exists():p=Path(str(p)+'.gz')
 raw=p.read_bytes();return gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw
read=lambda p:json.loads(payload(p))
old=W
baseline=json.loads(gzip.decompress((old/'inputs/repro/pump_amm/scalar-guard-order-v144/fee_config-differential.json.gz').read_bytes()))
inputs=read(OUT/'inputs-before.json');assert inputs==read(OUT/'inputs-after.json')
cand=inputs['candidate_sha256'];orig='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
rows=read(OUT/'run.json');assert len(rows)==25 and sum(r['case_count']for r in rows)==17462
idl=read(old/'inputs/evidence/upstream/pump_amm.json');create=bytes(next(x['discriminator']for x in idl['instructions']if x['name']=='create_pool'));amm=idl['address']
summary=[];bindings=[];total_sigs=0;total_tx=0;setup_tx=0
for row in rows:
 name=row['suite'];raw=payload(OUT/(name+'.json'));d=json.loads(raw);z=(OUT/(name+'-transactions.json.gz')).read_bytes();obs=json.loads(gzip.decompress(z))
 assert sha(raw)==row['receipt_sha256']and sha(z)==row['transaction_sidecar_sha256']
 assert row['returncode']==0 and not row['mismatches']and not d['mismatches']
 assert d['candidate_sha256']==cand and d['original_sha256']==orig and d['case_count']==row['case_count']==len(d['cases'])
 assert row['actual_source_sha256']==inputs['actual_compiled_source']and row['build_report_sha256']==inputs['build_report_sha256']
 retained=[];setup=[];sigcount=0
 for i,t in enumerate(obs['transactions']):
  rawtx=base64.b64decode(t['transaction_base64']);tx=Transaction.from_bytes(rawtx);checks=tx.verify_with_results()
  assert t['sequence']==i and checks and all(checks)and t['signature_count']==len(checks)and t['all_signatures_verified']and sha(rawtx)==t['transaction_sha256']
  assert t['amm_program_sha256']in [orig,cand]
  for pid,loaded in t['loaded_programs'].items():assert obs['program_file_sha256'][loaded['path']]==loaded
  is_setup=name=='boost'and any(str(tx.message.account_keys[ix.program_id_index])==amm and bytes(ix.data)[:8]==create for ix in tx.message.instructions)
  if is_setup:
   assert t['amm_program_sha256']==orig;setup.append(i)
  else:retained.append(t)
  sigcount+=len(checks)
 assert len(retained)==2*d['case_count']
 assert len(setup)==(150 if name=='boost'else 0)
 case_map=[]
 for i,case in enumerate(d['cases']):
  pair=retained[2*i:2*i+2]
  for side,t,expected in zip(['original','candidate'],pair,[orig,cand]):
   assert t['amm_program_sha256']==expected,(name,i,side)
   assert t['error']==case[side]['error'],(name,i,side)
   if 'logs'in case[side]:assert t['logs_sha256']==sha(json.dumps(case[side]['logs'],separators=(',',':')).encode()),(name,i,side)
  case_map.append({'case_index':i,'original_transaction_sequence':pair[0]['sequence'],'candidate_transaction_sequence':pair[1]['sequence']})
 assert sigcount==obs['signature_count']==row['signature_count']and len(obs['transactions'])==row['transaction_count']
 bindings.append({'suite':name,'receipt_sha256':sha(raw),'transaction_sidecar_sha256':sha(z),'actual_source_sha256':inputs['actual_compiled_source'],'build_report_sha256':inputs['build_report_sha256'],'case_transactions':case_map,'existing_fixture_setup_transaction_sequences':setup,'receipt_source_map_note':inputs['legacy_source_note']})
 summary.append({'suite':name,'case_count':d['case_count'],'transactions':len(obs['transactions']),'signatures':sigcount,'setup_transactions':len(setup)})
 total_tx+=len(obs['transactions']);total_sigs+=sigcount;setup_tx+=len(setup)
fee=read(OUT/'fee_config.json');assert len(fee['cases'])==len(baseline['cases'])==356
strict=[];recipient_strict=[]
for i,(new,oldcase)in enumerate(zip(fee['cases'],baseline['cases'])):
 assert {k:v for k,v in new.items()if k not in ['original','candidate','match']}=={k:v for k,v in oldcase.items()if k not in ['original','candidate','match']}
 if 'Custom(6000)'in str(new['original']['error']):
  vals=lambda side:[s for s in new[side]['logs']if s.startswith('Program log: Left: ')or s.startswith('Program log: Right: ')]
  original,candidate=vals('original'),vals('candidate');fee_payload=bytes.fromhex(new['payload_hex']);fees=[struct.unpack_from('<Q',fee_payload,j)[0]for j in [0,8,272]]
  assert original==candidate==['Program log: Left: 1000','Program log: Right: '+str(next(v for v in fees if v>1000))]
  strict.append({'case_index':i,'fees_lp_protocol_creator':fees,'compared_value_logs':candidate})
 if any('Custom('+str(code)+')'in str(new['original']['error'])for code in [6011,6012]):
  # Existing inputs only: compare exact error semantics; retain truthful source
  # coordinates and metered compute as explicit allowed textual differences.
  def diagnostic(side):
   out=[]
   for log in new[side]['logs']:
    if log.startswith('Program log: AnchorError thrown in '):
     marker='. Error Code: ';assert marker in log;out.append('Program log: AnchorError'+marker+log.split(marker,1)[1])
    elif ' consumed 'in log and log.endswith(' compute units'):continue
    else:out.append(log)
   return out
  original,candidate=diagnostic('original'),diagnostic('candidate')
  assert original==candidate,(i,original,candidate)
  assert not any(s.startswith('Program log: Left:')or s.startswith('Program log: Right:')for s in new['candidate']['logs'])
  assert new['original']['rollback']is True and new['candidate']['rollback']is True
  recipient_strict.append({'case_index':i,'error':new['original']['error'],'matched_diagnostics_excluding_source_coordinates_and_compute':candidate,'original_logs':new['original']['logs'],'candidate_logs':new['candidate']['logs'],'rollback':True})

assert all(any(x['case_index']==i for x in strict)for i in [4,5,24,30,144,180])
result={'status':'PASS','case_count':17462,'suite_count':25,'transaction_count':total_tx,'signature_count':total_sigs,'comparison_transactions':34924,'existing_setup_transactions':setup_tx,'new_cases':0,'stricter_existing_scalar_cases':len(strict),'stricter_existing_recipient_cases':len(recipient_strict),'full_byte_equality':False,'runtime_rerun_performed_by_verifier':False,'mismatches':[],'suites':summary,'diagnostics':'Unchanged25-suite corpus. Existing boost fixture preparation contributes150 signed original create_pool transactions, accounted separately from34924 comparison transactions. Existing fee-config inputs additionally check scalar Left/Right and recipient error diagnostics; truthful source coordinates and measured compute are retained as explicit differences.'}
if '--verify'in sys.argv:
 assert read(W/'runtime-summary.json')==result and read(W/'receipt-bindings.json')==bindings and read(W/'scalar-diagnostics.json')==strict and read(W/'recipient-diagnostics.json')==recipient_strict
else:
 for name,data in [('runtime-summary.json',result),('receipt-bindings.json',bindings),('scalar-diagnostics.json',strict),('recipient-diagnostics.json',recipient_strict)]: (W/name).write_text(json.dumps(data,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items()if k!='suites'},indent=2))
