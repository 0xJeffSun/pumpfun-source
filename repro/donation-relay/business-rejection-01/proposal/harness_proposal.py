#!/usr/bin/env python3
"""Reviewable ordinary correctness runner. Prepared only; never run with --execute.

Default prints the fixed case inventory. Execution requires separate parent
approval and the explicit flag. No historical message is rewritten or re-signed.
"""
import argparse,base64,hashlib,json,re,importlib.util
from pathlib import Path
from solders.account import Account
from solders.clock import Clock
from solders.compute_budget import set_compute_unit_limit
from solders.instruction import AccountMeta,Instruction
from solders.keypair import Keypair
from solders.litesvm import LiteSVM
from solders.pubkey import Pubkey
from solders.rent import Rent
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata

P=Path(__file__).resolve().parent
RELAY=Pubkey.from_string('RLAYHr9TRFcKB2ubYQhspcnXiaGpaVzNQvHytt47RZu')
TOKEN=Pubkey.from_string('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
ATA=Pubkey.from_string('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')
WSOL=Pubkey.from_string('So11111111111111111111111111111111111111112')
SYSTEM=Pubkey.default();IDL_SELECTOR=bytes([64,244,188,120,167,233,105,10]);IDL_DISC=bytes([24,70,98,191,58,144,123,158])
H=lambda b:hashlib.sha256(b).hexdigest()
EXPECTED={'original':'367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563','candidate':'4954fdc437beed0f73e00d25f1df656ce7fdf0279f8f9bb8e70ca0bced4b53dd','token':'8190d3f7ceb6cb7a7a8d8924bff89f9f611e15ce1f806f2b6237f3311a98f697','ata':'6804554e69fd3a58caa191dc4a58f4c67223d30ca28ab8987f39fc18d2f7374d'}
DONATIONS=['donate_v1','donate_pubkey_config_id_v1','donate_pubkey_config_id_with_payer_v1','donate_native_v1','donate_native_pubkey_config_id_v1']
IDL_NAMES=['create','create_buffer','write','set_buffer','set_authority','close','resize']
CASES=[{'name':n,'kind':'donation','expected_error':None,'group':'ordinary'} for n in DONATIONS]+[{'name':'idl_'+n,'kind':'idl','operation':i,'expected_error':None,'group':'ordinary'} for i,n in enumerate(IDL_NAMES)]+[
 {'name':'donation_message_too_long','kind':'donation','instruction':'donate_v1','message':'m'*256,'expected_error':6009,'group':'business_rejection'},
 {'name':'donation_tip_too_large','kind':'donation','instruction':'donate_v1','tip':10001,'expected_error':6018,'group':'business_rejection'},
 {'name':'donation_insufficient_balance','kind':'donation','instruction':'donate_v1','source_amount':1,'expected_error':'token_insufficient_funds','group':'business_rejection'}]

def key(label):
 # Public reproducible fixture seed, never an external account/private key.
 return Keypair.from_seed(hashlib.sha256(('relay-local-owned-fixture/'+label).encode()).digest())
def pub(label):return Pubkey.from_bytes(hashlib.sha256(('relay-local-data/'+label).encode()).digest())
def minimum(n):return Rent.default().minimum_balance(n)
def pd(seeds):return Pubkey.find_program_address(seeds,RELAY)
def ata(owner,mint):return Pubkey.find_program_address([bytes(owner),bytes(TOKEN),bytes(mint)],ATA)[0]
def disc(name):return hashlib.sha256(('account:'+name).encode()).digest()[:8]
def account(lamports,data,owner):return {'lamports':lamports,'data_base64':base64.b64encode(data).decode(),'owner':str(owner),'executable':False,'rent_epoch':0}
def mint_data():
 b=bytearray(82);b[36:44]=(10**12).to_bytes(8,'little');b[44]=6;b[45]=1;return bytes(b)
def token_data(mint,authority,amount):
 b=bytearray(165);b[:32]=bytes(mint);b[32:64]=bytes(authority);b[64:72]=amount.to_bytes(8,'little');b[108]=1;return bytes(b)
def header(authority,body=b'',capacity=128):
 assert len(body)<=capacity
 return IDL_DISC+bytes(authority)+len(body).to_bytes(4,'little')+body+bytes(capacity-len(body))

def prepare(case,repo):
 fee,owner,other,new=[key(n) for n in ['fee','owner','separate-payer','new-authority']]
 signers=[fee,owner,other,new];accounts={str(k.pubkey()):account(10**10,b'',SYSTEM) for k in signers}
 def put(k,data=b'',program=SYSTEM,lamports=None):accounts[str(k)]=account(minimum(len(data)) if lamports is None else lamports,data,program)
 proof={'test_owned_pubkeys':[str(k.pubkey()) for k in signers],'synthetic_starting_state':True,'canonical_pdas':{},'source_capture':None}
 if case['kind']=='donation':
  name=case.get('instruction',case['name']);native='native' in name;mint=WSOL if native else pub('mint');config=bytes(pub('config'))
  epoch,eb=pd([b'epoch_tracker_v1',config,bytes(mint)]);debouncer,db=pd([b'debouncer_v1',config,bytes(mint)]);whitelist,wb=pd([b'mint_whitelist_v1']);event,eventb=pd([b'__event_authority'])
  source=pd([b'donate_native_wsol_tmp_v1',bytes(owner.pubkey()),bytes(TOKEN)])[0] if native else ata(owner.pubkey(),mint)
  target=ata(debouncer,mint)
  for k in [epoch,debouncer,event,target]:put(k,lamports=0)
  put(whitelist,disc('MintWhitelistV1')+bytes([wb])+bytes(4)+bytes(1024),RELAY)
  if native:
   capture_path=P/'inputs/amm-v2-trade-fixture.json';cap=json.loads(capture_path.read_text())['accounts']['quote_mint'];put(mint,base64.b64decode(cap['data_base64']),TOKEN,cap['lamports']);put(source,lamports=0);proof['source_capture']={'path':'research/imported-lab/analysis/pump_fun/amm-v2-trade-fixture.json','sha256':H(capture_path.read_bytes())}
  else:put(mint,mint_data(),TOKEN);put(source,token_data(mint,owner.pubkey(),case.get('source_amount',10**9)),TOKEN)
  names={'epoch_tracker':epoch,'debouncer':debouncer,'debouncer_token_account':target,'mint':mint,'from_token_account':source,'temp_wsol_token_account':source,'from':owner.pubkey(),'payer':other.pubkey(),'mint_whitelist':whitelist,'associated_token_program':ATA,'token_program':TOKEN,'system_program':SYSTEM,'event_authority':event,'program':RELAY}
  ix=next(i for i in json.loads((P/'inputs/idl.json').read_text())['instructions'] if i['name']==name)
  metas=[AccountMeta(names[a['name']],a.get('signer',False),a.get('writable',False)) for a in ix['accounts']]
  message=case.get('message','ordinary donation').encode();data=bytes(ix['discriminator'])+(1_000_000).to_bytes(8,'little')+config+case.get('tip',125).to_bytes(2,'little')+len(message).to_bytes(4,'little')+message+bytes(other.pubkey())
  proof['canonical_pdas']={n:str(names[n]) for n in ['epoch_tracker','debouncer','debouncer_token_account','mint_whitelist','event_authority']};proof['source_token_or_temp']=str(source)
 else:
  op=case['operation'];authority=owner.pubkey();idl=pub('idl-fixture');buffer=pub('idl-buffer');destination=other.pubkey();base,bump=pd([])
  canonical=Pubkey.create_with_seed(base,'anchor:idl',RELAY);proof['canonical_pdas']={'base':str(base),'canonical_idl':str(canonical)}
  if op==0:
   put(canonical,lamports=0);put(base,lamports=0);metas=[AccountMeta(authority,True,True),AccountMeta(canonical,False,True),AccountMeta(base,False,False),AccountMeta(SYSTEM,False,False),AccountMeta(RELAY,False,False)];payload=(128).to_bytes(8,'little')
  elif op==1:
   put(buffer,bytes(172),RELAY);metas=[AccountMeta(buffer,False,True),AccountMeta(authority,True,False)];payload=b''
  elif op==3:
   put(buffer,header(authority,b'buffer contents'),RELAY);put(idl,header(authority),RELAY);metas=[AccountMeta(buffer,False,True),AccountMeta(idl,False,True),AccountMeta(authority,True,False)];payload=b''
  elif op==5:
   put(idl,header(authority,b'closed bytes'),RELAY);metas=[AccountMeta(idl,False,True),AccountMeta(authority,True,False),AccountMeta(destination,False,True)];payload=b''
  elif op==6:
   data=header(authority,capacity=20);put(idl,data,RELAY,minimum(len(data)));metas=[AccountMeta(idl,False,True),AccountMeta(authority,True,True),AccountMeta(SYSTEM,False,False)];payload=(128).to_bytes(8,'little')
  else:
   put(idl,header(authority),RELAY);metas=[AccountMeta(idl,False,True),AccountMeta(authority,True,False)];body=b'ordinary idl bytes';payload=len(body).to_bytes(4,'little')+body if op==2 else bytes(new.pubkey())
  data=IDL_SELECTOR+bytes([op])+payload
 proof['accounts']=accounts
 proof['instruction_hex']=data.hex();proof['instruction_accounts']=[{'pubkey':str(a.pubkey),'signer':a.is_signer,'writable':a.is_writable} for a in metas]
 return accounts,Instruction(RELAY,data,metas),signers,fee,proof

def vm_for(binary,repo,accounts):
 vm=LiteSVM().with_sigverify(True).with_blockhash_check(True).with_transaction_history(256)
 vm.set_clock(Clock(1000,0,0,0,1700000000))
 for pid,path in [(RELAY,binary),(TOKEN,P/'artifacts/spl_token.so'),(ATA,P/'artifacts/associated_token.so')]:vm.add_program_from_file(pid,path)
 for k,a in accounts.items():vm.set_account(Pubkey.from_string(k),Account(a['lamports'],base64.b64decode(a['data_base64']),Pubkey.from_string(a['owner']),a['executable'],a['rent_epoch']))
 return vm

def snapshot(vm,keys):
 out={}
 for k in sorted(keys,key=str):
  a=vm.get_account(k)
  out[str(k)]=None if a is None else {'lamports':a.lamports,'owner':str(a.owner),'executable':a.executable,'rent_epoch':a.rent_epoch,'data_length':len(a.data),'data_sha256':H(a.data),'data_base64':None if a.executable else base64.b64encode(a.data).decode()}
 return out

def run_one(vm,tx,keys):
 assert all(tx.verify_with_results()) and tx.message.recent_blockhash==vm.latest_blockhash()
 before=snapshot(vm,keys);result=vm.send_transaction(tx);failed=isinstance(result,FailedTransactionMetadata);m=result.meta() if failed else result;meta=json.loads(m.to_json())
 out={'transaction_base64':base64.b64encode(bytes(tx)).decode(),'signature_verification':tx.verify_with_results(),'error':str(result.err()) if failed else None,'before':before,'after':snapshot(vm,keys),'logs':m.logs(),'inner_instructions':meta['inner_instructions'],'return_data':meta['return_data'],'metadata':meta}
 if failed:
  fee=str(tx.message.account_keys[0]);assert all(out['before'][k]==out['after'][k] for k in out['before'] if k!=fee),'failed transaction mutated non-fee-payer state'
 return out

def comparable(row):
 out={k:row[k] for k in ['error','inner_instructions','return_data']}
 # Retain full logs above; only metering numbers inherently differ by build.
 out['logs']=[x for x in row['logs'] if re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x) is None]
 for stage in ['before','after']:
  out[stage]=json.loads(json.dumps(row[stage]));a=out[stage].get(str(RELAY))
  if a:
   for field in ['data_length','data_sha256','data_base64']:a.pop(field)
   a['lamports']-=row['before'][str(RELAY)]['lamports']
 return out

def check_effects(case,proof,row):
 # Independent visible effects prevent two no-op implementations from passing.
 out=[]
 def demand(ok,label):
  if not ok:out.append(label)
 def data(k):
  a=row['after'].get(str(k));return b'' if not a else base64.b64decode(a['data_base64'])
 if case['kind']=='donation':
  p=proof['canonical_pdas'];t=data(p['epoch_tracker']);d=data(p['debouncer']);v=data(p['debouncer_token_account'])
  demand(t[:8]==disc('EpochTrackerV1') and len(t)>=90 and t[9]==1 and int.from_bytes(t[74:90],'little')==0,'initialized_epoch_zero')
  demand(d[:8]==disc('DebouncerV1') and len(d)>=82 and d[9]==1 and int.from_bytes(d[74:82],'little')==1_000_000,'debouncer_total')
  demand(len(v)>=165 and int.from_bytes(v[64:72],'little')==1_000_000,'destination_tokens')
  source=proof['source_token_or_temp'];a=row['after'].get(source)
  if 'native' in case.get('instruction',case['name']):demand(a is None or (a['lamports']==0 and a['data_length']==0),'native_temp_closed')
  else:demand(int.from_bytes(data(source)[64:72],'little')==999_000_000,'source_tokens_debited')
  demand(any(x.startswith('Program data: ') for x in row['logs']),'event_log')
 else:
  op=case['operation'];k=proof['instruction_accounts'][0]['pubkey'];b=data(k)
  if op==0:b=data(proof['canonical_pdas']['canonical_idl']);demand(len(b)==172 and b==header(key('owner').pubkey()),'created_idl')
  elif op==1:demand(b==header(key('owner').pubkey()),'initialized_buffer')
  elif op==2:demand(b==header(key('owner').pubkey(),b'ordinary idl bytes'),'written_idl')
  elif op==3:demand(data(proof['instruction_accounts'][1]['pubkey'])==header(key('owner').pubkey(),b'buffer contents'),'copied_buffer')
  elif op==4:demand(b==header(key('new-authority').pubkey()),'updated_authority')
  elif op==5:
   a=row['after'].get(k);demand(a is None or (a['lamports']==0 and a['data_length']==0),'closed_idl')
  elif op==6:demand(b==header(key('owner').pubkey(),capacity=84),'resized_idl')
 return out

def execute(repo,candidate,group,output):
 spec=importlib.util.spec_from_file_location('relay_proposal_verify',P/'verify.py');v=importlib.util.module_from_spec(spec);spec.loader.exec_module(v);v.verify(runtime=True)
 paths={'original':P/'artifacts/original.so','candidate':candidate,'token':P/'artifacts/spl_token.so','ata':P/'artifacts/associated_token.so'}
 for n,path in paths.items():assert H(path.read_bytes())==EXPECTED[n],n
 rows=[]
 for case in [c for c in CASES if c['group']==group]:
  accounts,ix,available,fee,proof=prepare(case,repo);a=vm_for(paths['original'],repo,accounts);b=vm_for(candidate,repo,accounts)
  assert a.latest_blockhash()==b.latest_blockhash()
  required={m.pubkey for m in ix.accounts if m.is_signer}|{fee.pubkey()};signers=[s for s in available if s.pubkey() in required];assert {s.pubkey() for s in signers}==required
  tx=Transaction.new_signed_with_payer([set_compute_unit_limit(1_400_000),ix],fee.pubkey(),signers,a.latest_blockhash());assert all(tx.verify_with_results())
  keys={Pubkey.from_string(k) for k in accounts}|set(tx.message.account_keys);left=run_one(a,tx,keys);right=run_one(b,tx,keys)
  x,y=comparable(left),comparable(right);mismatches=[k for k in x if x[k]!=y[k]]
  if case['expected_error'] is None and left['error'] is not None:mismatches.append('original_expected_success')
  if isinstance(case['expected_error'],int) and ('Custom('+str(case['expected_error'])+')') not in (left['error'] or '').replace(' ',''):mismatches.append('original_expected_error')
  if case['expected_error']=='token_insufficient_funds' and 'Custom(1)' not in (left['error'] or '').replace(' ',''):mismatches.append('original_expected_token_rejection')
  if left['error'] is None and case['expected_error'] is None:
   mismatches.extend('original_effect:'+e for e in check_effects(case,proof,left))
   if right['error'] is None:mismatches.extend('candidate_effect:'+e for e in check_effects(case,proof,right))
  rows.append({'case':case,'fixture':proof,'original':left,'candidate':right,'mismatches':mismatches})
  # Stop before broadening when the first ordinary mismatch needs review.
  if mismatches:break
 report={'candidate_sha256':EXPECTED['candidate'],'original_sha256':EXPECTED['original'],'group':group,'cases':rows,'runtime_sha256_map':json.loads((P/'loader-results.json').read_text())['runtime_files'],'harness_sha256':H(Path(__file__).read_bytes()),'proposal_manifest_sha256':H((P/'manifest.json').read_bytes()),'passed':sum(not r['mismatches'] for r in rows),'case_count':len(rows),'all_requested_completed':len(rows)==sum(c['group']==group for c in CASES),'normal_signature_blockhash_history_checks':True,'historical_transactions_rewritten':False}
 output.parent.mkdir(parents=True,exist_ok=True)
 output.write_text(json.dumps(report,indent=2)+'\n')
 if not report['all_requested_completed'] or report['passed']!=report['case_count']:raise SystemExit(1)

if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--execute',action='store_true');parser.add_argument('--repo',type=Path);parser.add_argument('--candidate',type=Path);parser.add_argument('--group',choices=['ordinary','business_rejection'],default='ordinary');parser.add_argument('--output',type=Path);args=parser.parse_args()
 if not args.execute:print(json.dumps({'execution_started':False,'cases':CASES},indent=2))
 else:
  if args.repo is None or args.candidate is None or args.output is None:parser.error('--execute requires --repo --candidate --output')
  execute(args.repo.resolve(),args.candidate.resolve(),args.group,args.output)
