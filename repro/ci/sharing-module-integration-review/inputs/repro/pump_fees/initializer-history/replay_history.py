#!/usr/bin/env python3
"""Replay two exact authentic historical messages, signature checks enabled, local only."""
from pathlib import Path
import argparse,base64,hashlib,json,struct
from solders.litesvm import LiteSVM
from solders.transaction import VersionedTransaction
from solders.transaction_metadata import FailedTransactionMetadata
from solders.pubkey import Pubkey
from solders.account import Account
from solders.clock import Clock
ROOT=Path(__file__).resolve().parent;REPO=next(p for p in ROOT.parents if (p/'evidence/original').exists())
FEES=Pubkey.from_string('pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ');ADMIN=Pubkey.from_string('8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8');SYSTEM=Pubkey.default();sha=lambda b:hashlib.sha256(b).hexdigest()
NAMESPACE_PROGRAMS={'6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P':'pump','pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA':'pump_amm'}
def snapshot(vm,keys):
 out={}
 for k in keys:
  a=vm.get_account(k)
  out[str(k)]={'lamports':a.lamports,'owner':str(a.owner),'executable':a.executable,'data_bytes':len(a.data),'data_sha256':sha(a.data)} if a else None
 return out

def run(binary,index,blockhash_check=False):
 capture=ROOT/f'transactions/admin-success-{index}.json';r=json.loads(capture.read_text())['response']['result'];raw=base64.b64decode(r['transaction'][0]);tx=VersionedTransaction.from_bytes(raw)
 assert tx.verify_with_results()==[True], 'Historical admin signature is invalid'
 assert bytes(tx)==raw and tx.message.account_keys[0]==ADMIN
 assert len(tx.message.instructions)==1 and bytes(tx.message.instructions[0].data)==bytes.fromhex('3ea214857941911b')
 keys=list(tx.message.account_keys);ix=tx.message.instructions[0];config=keys[ix.accounts[1]];namespace=keys[ix.accounts[3]];event=keys[ix.accounts[4]]
 vm=LiteSVM().with_sigverify(True).with_blockhash_check(blockhash_check).with_transaction_history(0)
 vm.add_program_from_file(FEES,binary)
 namespace_binary=REPO/f'evidence/original/{NAMESPACE_PROGRAMS[str(namespace)]}/deployed.so';vm.add_program_from_file(namespace,namespace_binary)
 clock=vm.get_clock();vm.set_clock(Clock(r['slot'],clock.epoch_start_timestamp,clock.epoch,clock.leader_schedule_epoch,r['blockTime']))
 for i,k in enumerate(keys):
  old=vm.get_account(k)
  if k in (config,event):
   assert r['meta']['preBalances'][i]==0
   # Historical absent accounts remain absent; no forged program-owned state.
   assert old is None or (old.lamports==0 and not old.data)
  elif k==ADMIN:vm.set_account(k,Account(r['meta']['preBalances'][i],b'',SYSTEM))
  else:
   assert old is not None
   vm.set_account(k,Account(r['meta']['preBalances'][i],old.data,old.owner,old.executable,old.rent_epoch))
 before=snapshot(vm,keys);result=vm.send_transaction(tx);failed=isinstance(result,FailedTransactionMetadata);meta=result.meta() if failed else result;after=snapshot(vm,keys);state=vm.get_account(config)
 assert bytes(tx)==raw and tx.verify_with_results()==[True], 'Historical signed bytes changed'
 logs=meta.logs();events=[line for line in logs if line.startswith('Program data: ')]
 expected_events=[line for line in r['meta']['logMessages'] if line.startswith('Program data: ')]
 expected_key,bump=Pubkey.find_program_address([b'fee_config',bytes(namespace)],FEES);assert expected_key==config
 expected_data=(bytes.fromhex('8f3492bbdb7b4c9b')+bytes([bump])+bytes(ADMIN)).ljust(2512,b'\0')
 postbalances=[vm.get_account(k).lamports if vm.get_account(k) else 0 for k in keys]
 return {'historical_index':index,'raw_transaction_sha256':sha(raw),'signature':str(tx.signatures[0]),'signature_verification':True,'sigverify_runtime_enabled':True,'blockhash_freshness_check':blockhash_check,'signed_message_and_signature_unchanged':bytes(tx)==raw,'raw_transaction_bytes':len(raw),'historical_slot':r['slot'],'historical_timestamp':r['blockTime'],'original_blockhash':str(tx.message.recent_blockhash),'namespace_program':{'name':NAMESPACE_PROGRAMS[str(namespace)],'sha256':sha(namespace_binary.read_bytes()),'used_only_as_readonly_namespace':True},'before':before,'after':after,'error':str(result.err()) if failed else None,'state_data_hex':state.data.hex() if state else None,'state_matches_static_prediction':state is not None and state.data==expected_data,'historical_postbalances':r['meta']['postBalances'],'postbalances':postbalances,'balances_match_recorded_history':postbalances==r['meta']['postBalances'],'events':events,'events_match_recorded_history':events==expected_events,'inner_instructions':json.loads(meta.to_json())['inner_instructions'],'logs':logs}

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path);p.add_argument('--output',type=Path,required=True);a=p.parse_args();original=REPO/'evidence/original/pump_fees/deployed.so';rows=[];mismatch=[]
 for index in [81,80]:
  x=run(original,index);y=run(a.candidate,index) if a.candidate else None
  fields=['error','state_data_hex','postbalances','events','inner_instructions']
  matched=all(x[k]==y[k] for k in fields) if y else None
  if y:
   # The loaded executable is intentionally different and its full hash/size
   # remains in both snapshots and the build comparison. Verify it is unchanged
   # within each run, and compare all other account fields/state exactly.
   for result in [x,y]:assert result['before'][str(FEES)]==result['after'][str(FEES)]
   for phase in ['before','after']:
    left=json.loads(json.dumps(x[phase]));right=json.loads(json.dumps(y[phase]))
    for snapshot in [left,right]:
     snapshot[str(FEES)].pop('data_sha256');snapshot[str(FEES)].pop('data_bytes')
    matched=matched and left==right
  rows.append({'index':index,'original':x,'candidate':y,'match':matched})
  if matched is False:mismatch.append(index)
  assert x['error'] is None and x['state_matches_static_prediction'] and x['balances_match_recorded_history'] and x['events_match_recorded_history'], 'Captured executable does not reproduce expected historical initializer result'
  if y:assert y['error'] is None
  print(json.dumps({'index':index,'original_error':x['error'],'candidate_error':y['error'] if y else None,'match':matched}),flush=True)
 # A control retains freshness checking: an unchanged old message must fail as stale.
 freshness=run(original,81,True);assert freshness['error'] is not None and 'BlockhashNotFound' in freshness['error']
 out={'scope':'Two exact authentic historical initializer messages replayed locally against the later captured Fees executable and candidate. Signature verification remains enabled. Only blockhash freshness is disabled for replay; signed bytes are unchanged. Namespace captures are loaded read-only; no namespace CPI is expected. Historical account-data prestate beyond absent config/admin System account is not available, and this is not a full historical bank reproduction. No network writes.','original_sha256':sha(original.read_bytes()),'candidate_sha256':sha(a.candidate.read_bytes()) if a.candidate else None,'case_count':len(rows),'signed_transactions':len(rows)*(2 if a.candidate else 1),'mismatches':mismatch,'cases':rows,'freshness_control':freshness,'comparison_method':'Compare all account fields and state bytes except the intentionally different loaded Fees executable size/hash; retain both exact values and assert each executable account unchanged within its run. Also compare errors, balances, log event payloads and exact inner instruction structures. Full executable byte equality remains false.'}
 a.output.write_text(json.dumps(out,indent=2)+'\n');assert not mismatch
if __name__=='__main__':main()
