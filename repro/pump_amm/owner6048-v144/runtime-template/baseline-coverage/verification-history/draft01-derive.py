"""Saved receipts/fixture/source attribution only; no VM or signature re-execution."""
from pathlib import Path
import base64,gzip,json,hashlib,re,struct,argparse
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def var(b,at):
 n=0;s=0
 while True:
  c=b[at];at+=1;n|=(c&127)<<s
  if c<128:return n,at
  s+=7

def txparts(b):
 n,at=var(b,0);signatures=[b[at+64*i:at+64*(i+1)]for i in range(n)];at+=64*n;start=at;header=b[at:at+3];at+=3;count,at=var(b,at);keys=[b[at+32*i:at+32*(i+1)]for i in range(count)];at+=32*count;blockhash=b[at:at+32];at+=32;count,at=var(b,at);ix=[]
 for _ in range(count):
  pid=b[at];at+=1;n,at=var(b,at);accounts=b[at:at+n];at+=n;n,at=var(b,at);data=b[at:at+n];at+=n;ix.append({'program':keys[pid].hex(),'accounts':[keys[i].hex()for i in accounts],'data_hex':data.hex()})
 assert at==len(b)and header[0]==len(signatures);return signatures,ix

def derive():
 controls=J(P/'controls/test-source-sha256.json');
 for f in(P/'fixture-source').iterdir():assert H(f)==controls['scripts/'+f.name]
 before=J(P/'receipts/inputs-before.json.gz');assert before==J(P/'receipts/inputs-after.json.gz');assert before['actual_compiled_source']==J(P/'accepted-source30.json');assert before['candidate_sha256']=='6dc621c8c6a165650a159b67f9f2d042c3ffc71481236208d2565485c3e169b2'
 counts=J(P/'controls/summary.json')['suites'];runs=J(P/'receipts/run.json.gz');assert len(runs)==25 and sum(counts.values())==17462
 alltx=set();allsig=set();outcomes=[];exact_hits=[];total_tx=total_sig=0;total_cases=0
 for row in runs:
  name=row['suite'];receipt=P/'receipts'/(name+'.json.gz');sidecar=P/'receipts'/(name+'-transactions.json.gz');data=J(receipt);obs=J(sidecar);assert obs['observer_sha256']==H(P/'observe_suite.py')
  assert row['case_count']==data['case_count']==len(data['cases'])==counts[name]and row['returncode']==0 and not data['mismatches'];assert hashlib.sha256(gzip.decompress(receipt.read_bytes())).hexdigest()==row['receipt_sha256'];assert H(sidecar)==row['transaction_sidecar_sha256'];total_cases+=data['case_count']
  for t in obs['transactions']:
   raw=base64.b64decode(t['transaction_base64'],validate=True);sigs,ix=txparts(raw);assert hashlib.sha256(raw).hexdigest()==t['transaction_sha256']and len(sigs)==t['signature_count']and t['all_signatures_verified'];alltx.add(raw);allsig.update(sigs);total_tx+=1;total_sig+=len(sigs)
  for i,case in enumerate(data['cases']):
   for side in ['original','candidate']:
    value=case[side].get('error')
    if re.search(r'InstructionErrorCustom\(6048\)',str(value)):
     exact_hits.append({'suite':name,'case_index':i,'side':side,'case':case.get('case'),'error':value})
     assert name=='collect';sequence=2*i+(side=='candidate');t=obs['transactions'][sequence];assert t['sequence']==sequence and t['error']==value
     raw=base64.b64decode(t['transaction_base64']);sigs,ix=txparts(raw);assert len(ix)==1 and ix[0]['data_hex']=='a039592ab58b2b42'and len(ix[0]['accounts'])==8
     creator_hex=ix[0]['accounts'][2];creator=next(k for k,v in case[side]['states'].items()if v and v['owner']=='pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ');state=case[side]['states'][creator];alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';key=0
     for ch in creator:key=key*58+alphabet.index(ch)
     assert key.to_bytes(32,'big').hex()==creator_hex
     assert state['lamports']==10**9 and len(bytes.fromhex(state['data']))in[0,8,208,200];assert not case[side]['events']and case[side]['inner']==[[]];assert 'logs'not in case[side]and'logs'not in t
     label=case['case'];match=re.search(r'^creator-state=\((0|1000), Pubkey\(\s+pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ,\s+\), (0|8|208|200), ',label);assert match
     outcomes.append({'suite':name,'case_index':i,'side':side,'amount':int(match[1]),'creator_data_bytes':len(bytes.fromhex(state['data'])),'creator_owner':state['owner'],'creator_account':creator,'creator_transaction_key_hex':creator_hex,'error':value,'transaction_sequence':sequence,'transaction_sha256':t['transaction_sha256'],'signature_hex':[s.hex()for s in sigs],'logs_sha256':t['logs_sha256'],'raw_diagnostic_origin_or_PC_retained':False,'compared_key_logs_asserted_by_suite':False})
 assert total_cases==17462 and total_tx==35074 and total_sig==35418;assert len(exact_hits)==len(outcomes)==16;indices=sorted({r['case_index']for r in outcomes});assert indices==[62,63,64,65,124,125,126,127]
 # Confirm source attribution and why numeric parity does not test decoration.
 fixture=(P/'fixture-source/pump_amm_collect_differential.py').read_text();observer=(P/'observe_suite.py').read_text();assert "r['events']=[v for v in r.pop('logs') if v.startswith('Program data: ')]"in fixture and "'logs_sha256':sha(json.dumps(logs,separators=(',',':')).encode())"in observer;assert "for owner in [Pubkey.default(),fee,PROGRAM,TOKEN]"in fixture
 current=(P/'source-proof/baseline/collect.rs').read_text();assert current.count('PumpAmmError::CreatorVaultMigratedToSharingConfig')==1 and 'require_keys_neq!(*a.coin_creator.owner,crate::trade::FEE_OWNER' in current
 return {'status':'SAVED_ONLY_COVERAGE','accepted_candidate':'6dc621c8c6a165650a159b67f9f2d042c3ffc71481236208d2565485c3e169b2','total_existing_cases':total_cases,'total_submissions':total_tx,'encoded_signature_fields':total_sig,'unique_transaction_bytes':len(alltx),'unique_signature_bytes':len(allsig),'exact6048_paired_cases':8,'exact6048_side_outcomes':16,'exact6048_suites':['collect'],'case_indices':indices,'owner_fixture_unique_transactions':len({r['transaction_sha256']for r in outcomes}),'owner_fixture_unique_signatures':len({s for r in outcomes for s in r['signature_hex']}),'current_application_owner_source_attributed_cases':8,'original_same_code_owner_fixture_cases':8,'original_dynamic_handler_vs_parser_PC_attribution_proved':False,'proven_parser6048_cases':0,'other_suite_exact6048_hits':0,'owner6048_diagnostic_or_compared_key_log_assertion_cases':0,'metadata_only_logs_hashes_not_reconstructed':True,'current_static6048_location':{'handler':[781856,788224],'store':785296,'with_pubkeys_call':785600,'source':'src/collect.rs:20'},'original_static6048_location':{'handler':[142984,147008],'store':144360,'direct_plain_owned_return':144432,'source':'programs/pump-amm/src/instructions/coin_creator/collect_coin_creator_fee.rs:68'},'outcomes':outcomes,'new_signature_cryptography_VM_build_runs':0}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--output',type=Path);x=a.parse_args();result=derive();text=json.dumps(result,indent=2)+'\n';x.output.write_text(text)if x.output else print(text)
