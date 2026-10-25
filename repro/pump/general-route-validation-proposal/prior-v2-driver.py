#!/usr/bin/env python3
"""Reviewable ordinary depth-three proposal. --plan is unsigned serialization only.

Runtime stages require separate approval: original-only first, then candidate
against those immutable original receipts. No RPC or bypass of runtime controls.
"""
from pathlib import Path
import argparse,base64,hashlib,json,re,struct,sys,traceback
sys.dont_write_bytecode=True
from solders.account import Account
from solders.clock import Clock
from solders.hash import Hash
from solders.instruction import AccountMeta,Instruction
from solders.keypair import Keypair
from solders.litesvm import LiteSVM
from solders.message import Message
from solders.pubkey import Pubkey
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata
H=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
PUMP=Pubkey.from_string('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P');AMM=Pubkey.from_string('pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA')
TOKEN=Pubkey.from_string('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');TOKEN22=Pubkey.from_string('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb')
ATA=Pubkey.from_string('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');FEES=Pubkey.from_string('pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ');WSOL=Pubkey.from_string('So11111111111111111111111111111111111111112')
PUMP_DISC=bytes([225,154,117,22,215,86,246,103]);TRADE_DISC=hashlib.sha256(b'event:TradeEvent').digest()[:8]
PROGRAMS=[(AMM,'evidence/original/pump_amm/deployed.so'),(TOKEN,'evidence/dependencies/spl_token/deployed.so'),(TOKEN22,'evidence/dependencies/spl_token_2022/deployed.so'),(ATA,'evidence/dependencies/associated_token/deployed.so'),(FEES,'evidence/original/pump_fees/deployed.so')]
T=json.loads((H/'base-fixture.json').read_text());KEYS=[Pubkey.from_string(k)for k in T['selected_outer_account_keys']];USER_KEY=KEYS[0]
ata=lambda a,m:Pubkey.find_program_address([bytes(a),bytes(TOKEN),bytes(m)],ATA)[0]
MINTS=[KEYS[16],Pubkey.from_bytes(bytes([84])*32),Pubkey.from_bytes(bytes([85])*32)]
CURVES=[Pubkey.find_program_address([b'bonding-curve',bytes(m)],PUMP)[0]for m in MINTS]
GROUPS=[[m,WSOL if i==0 else MINTS[i-1],CURVES[i],ata(CURVES[i],m),ata(CURVES[i],WSOL if i==0 else MINTS[i-1])]for i,m in enumerate(MINTS)]
assert GROUPS[0]==KEYS[16:21]
UW=ata(USER_KEY,WSOL);UC=ata(USER_KEY,MINTS[2])

def cases():
 return [dict(name=f'{direction}-{mode}-{amount}',sell=direction=='sell',mode=mode,amount=amount,limit=1,depth=3,flags=[2,0,1]if direction=='sell'else[1,0,2])for direction in ['buy','sell']for mode in ['captured','exotic','flat-fallback','legacy-flat']for amount in [10**6,10**9]]

def setup_meta(repo,case):
 idl=json.loads((repo/'evidence/upstream/pump_amm.json').read_text());ix=next(x for x in idl['instructions']if x['name']=='multi_hop_swap')
 fixed=KEYS[:16];fixed[1]=UC if case['sell']else UW;fixed[2]=UW if case['sell']else UC
 metas=[AccountMeta(k,bool(spec.get('signer')),bool(spec.get('writable')))for k,spec in zip(fixed,ix['accounts'])]
 for group in list(reversed(GROUPS))if case['sell']else GROUPS:metas.extend(AccountMeta(k,False,i>=2)for i,k in enumerate(group))
 assert len(metas)==31 and [m.pubkey for m in metas if m.is_signer]==[USER_KEY]
 assert KEYS[3]==Pubkey.find_program_address([b'global_config'],AMM)[0]and not metas[3].is_signer
 instruction=Instruction(AMM,bytes(ix['discriminator'])+struct.pack('<QQ',case['amount'],case['limit']),metas)
 return metas,instruction

def unsigned_plan(repo):
 rows=[]
 for case in cases():
  metas,ix=setup_meta(repo,case);msg=Message.new_with_blockhash([ix],USER_KEY,Hash.default());tx=Transaction.new_unsigned(msg)
  assert len(bytes(tx))<=1232
  rows.append(dict(case=case,message_account_keys=[str(k)for k in msg.account_keys],outer_metas=[dict(pubkey=str(m.pubkey),signer=m.is_signer,writable=m.is_writable)for m in metas],unsigned_transaction_bytes=len(bytes(tx)),expected_signed_transaction_bytes=len(bytes(tx)),expected_pump_accounts=28,expected_signatures=1))
 recipient=bytes.fromhex(T['accounts'][str(KEYS[6])]['data_hex']);global_data=bytes.fromhex(T['accounts'][str(KEYS[13])]['data_hex']);authority=Pubkey.from_bytes(recipient[32:64])
 assert recipient[:32]==bytes(WSOL)and len(recipient)==165 and recipient[108]==1
 assert authority!=Pubkey.default()and bytes(authority)in[global_data[i:i+32]for i in range(741,997,32)]and ata(authority,WSOL)==KEYS[6]
 return dict(scope='Unsigned message serialization and existing fixture preflight compatibility only; no Keypair signing, VM instantiation or transaction execution.',case_count=len(rows),case_rows=rows,recipient=dict(key=str(KEYS[6]),mint=str(WSOL),authority=str(authority),canonical_ata=True,pump_global_membership=True,enabled_hop_quote='WSOL in both directions',pump_global_buyback_basis_points=struct.unpack_from('<Q',global_data,997)[0]))

def token(mint,owner,amount):
 b=bytearray(165);b[:32]=bytes(mint);b[32:64]=bytes(owner);struct.pack_into('<Q',b,64,amount);b[108]=1;return bytes(b)

def fee_config(mode):
 b=bytes.fromhex(T['accounts'][str(KEYS[14])]['data_hex'])
 if mode=='captured':return b
 data=b[:41]+struct.pack('<QQQ',0,70,25)+struct.pack('<I',1)+bytes(16)+struct.pack('<QQQ',0,60,30)
 if mode!='legacy-flat':data+=struct.pack('<I',0)+struct.pack('<QQQ',*( (0,80,40)if mode=='exotic'else(0,0,0)))
 return data.ljust(2512 if mode=='legacy-flat' else 4097,b'\0')

def invoke(repo,case,candidate=None,capture=None):
 # Default signature, blockhash and history controls; one fresh VM per side.
 vm=LiteSVM();vm.set_clock(Clock(100,1234567890,0,0,1234567890))
 selected=[(pid,repo/p)for pid,p in PROGRAMS]+[(PUMP,candidate or repo/'evidence/original/pump/deployed.so')]
 for pid,path in selected:vm.add_program_from_file(pid,path)
 for key,row in T['accounts'].items():
  if row is not None:vm.set_account(Pubkey.from_string(key),Account(row['lamports'],bytes.fromhex(row['data_hex']),Pubkey.from_string(row['owner'])))
 idl=json.loads((repo/'evidence/upstream/pump_amm.json').read_text());vol=bytes(next(x for x in idl['accounts']if x['name']=='UserVolumeAccumulator')['discriminator'])+bytes(USER_KEY)+bytes(97)
 vm.set_account(KEYS[5],Account(10**9,vol,AMM))
 raw=bytearray(vm.get_account(CURVES[0]).data);assert len(raw)==166 and raw[48]==0 and raw[81:83]==b'\0\0'and raw[83:115]==bytes(32)and raw[124]==0
 mint=vm.get_account(MINTS[0]);assert mint.owner==TOKEN and len(mint.data)==82
 for i in [1,2]:
  data=bytearray(raw)
  for offset in [8,16,24,32,40,142]:struct.pack_into('<Q',data,offset,10**15)
  data[83:115]=bytes(MINTS[i-1]);data[125:141]=bytes(16);data[141]=1
  vm.set_account(CURVES[i],Account(10**9,bytes(data),PUMP));vm.set_account(MINTS[i],Account(mint.lamports,bytes(mint.data),TOKEN))
  vm.set_account(GROUPS[i][3],Account(10**9,token(MINTS[i],CURVES[i],10**15),TOKEN));vm.set_account(GROUPS[i][4],Account(10**9,token(MINTS[i-1],CURVES[i],10**15),TOKEN))
 vm.set_account(UC,Account(10**9,token(MINTS[2],USER_KEY,10**15),TOKEN))
 old=vm.get_account(KEYS[1]);vm.set_account(UW,Account(old.lamports,bytes(old.data),TOKEN))
 old=vm.get_account(KEYS[14]);vm.set_account(KEYS[14],Account(old.lamports,fee_config(case['mode']),old.owner))
 metas,ix=setup_meta(repo,case);watched=sorted(set([Pubkey.from_string(k)for k in T['accounts']]+[m.pubkey for m in metas]+[UW,UC]+CURVES),key=str)
 def snapshot():
  result={}
  for key in watched:
   a=vm.get_account(key)
   if a is None or not a.executable:result[str(key)]=None if a is None else dict(lamports=a.lamports,owner=str(a.owner),data_hex=bytes(a.data).hex(),executable=a.executable,rent_epoch=a.rent_epoch)
  return result
 before=snapshot();signer=Keypair.from_seed(bytes([201])*32);assert signer.pubkey()==USER_KEY
 tx=Transaction.new_signed_with_payer([ix],USER_KEY,[signer],vm.latest_blockhash());raw_tx=bytes(tx)
 assert len(raw_tx)<=1232 and len(tx.signatures)==1 and all(tx.verify_with_results())
 assert capture is not None
 save(Path(str(capture)+'.transaction.json'),dict(case=case,before=before,transaction_base64=base64.b64encode(raw_tx).decode(),transaction_sha256=hashlib.sha256(raw_tx).hexdigest(),transaction_bytes=len(raw_tx),verified_signatures=len(tx.signatures),program_sha256={str(pid):sha(path)for pid,path in selected},fresh_vm=True,default_signature_blockhash_history=True))
 result=vm.send_transaction(tx);failed=isinstance(result,FailedTransactionMetadata);metadata=result.meta()if failed else result;encoded=json.loads(metadata.to_json())
 save(Path(str(capture)+'.raw-result.json'),dict(case=case,error=str(result.err())if failed else None,raw_metadata=encoded,logs=metadata.logs(),after=snapshot()))
 keys=tx.message.account_keys;pump=[];tokens=[]
 for group in encoded['inner_instructions']:
  for entry in group:
   ins=entry['instruction'];payload=bytes(ins['data'][1:]);accounts=[str(keys[i])for i in ins['accounts'][1:]];pid=keys[ins['programIdIndex']]
   if pid==PUMP and payload.startswith(PUMP_DISC):pump.append(dict(amount=struct.unpack_from('<Q',payload,8)[0],flags=list(payload[20:]),accounts=accounts))
   if pid==TOKEN:tokens.append(dict(data_hex=payload.hex(),accounts=accounts))
 logs=metadata.logs();events=[x for x in logs if x.startswith('Program data: ')];trade_events=[x for x in events if base64.b64decode(x[14:]).startswith(TRADE_DISC)]
 normalized_logs=[re.sub(r' consumed [0-9]+ of [0-9]+ compute units',' consumed <CU> of <CU> compute units',x)for x in logs]
 # Distinct curve authorities must carry intermediate tokens, in route order.
 expected_transfers=([(str(GROUPS[2][4]),str(MINTS[1]),str(GROUPS[1][3]),str(CURVES[2])),(str(GROUPS[1][4]),str(MINTS[0]),str(GROUPS[0][3]),str(CURVES[1]))] if case['sell'] else [(str(GROUPS[0][3]),str(MINTS[0]),str(GROUPS[1][4]),str(CURVES[0])),(str(GROUPS[1][3]),str(MINTS[1]),str(GROUPS[2][4]),str(CURVES[1]))])
 observed_transfers=[tuple(x['accounts'][:4])for x in tokens if bytes.fromhex(x['data_hex'])[0:1]==bytes([12])]
 cursor=0
 for transfer in observed_transfers:
  if cursor<len(expected_transfers) and transfer==expected_transfers[cursor]:cursor+=1
 trade_bytes=[base64.b64decode(x[14:])for x in trade_events]
 expected_mints=list(reversed(MINTS))if case['sell']else MINTS
 checks=dict(intermediate_authorities_in_order=cursor==len(expected_transfers),trade_mints_in_order=[x[8:40]for x in trade_bytes]==[bytes(m)for m in expected_mints],trade_directions=[x[56]for x in trade_bytes]==[int(not case['sell'])]*3,success=not failed,one_pump_route_call=len(pump)==1,expected_flags=len(pump)==1 and pump[0]['flags']==case['flags'],expected_pump_account_count=len(pump)==1 and len(pump[0]['accounts'])==28,actual_amm_global_signer_path=len(pump)==1 and pump[0]['accounts'][2]==str(KEYS[3]),three_trade_events=len(trade_events)==3,outer_signature_valid=all(tx.verify_with_results()),packet_legal=len(raw_tx)<=1232)
 return dict(case=case,error=str(result.err())if failed else None,logs=logs,normalized_logs=normalized_logs,events=events,inner=encoded['inner_instructions'],return_data=encoded.get('return_data'),before=before,after=snapshot(),transaction_base64=base64.b64encode(raw_tx).decode(),transaction_sha256=hashlib.sha256(raw_tx).hexdigest(),transaction_bytes=len(raw_tx),verified_signature_count=1,fresh_vm=True,default_signature_blockhash_history=True,pump_calls=pump,token_calls=tokens,assertions=checks,all_assertions_pass=all(checks.values()),program_sha256={str(pid):sha(path)for pid,path in selected},raw_metadata=encoded)

def bindings(repo,candidate=None,report=None):
 paths=['evidence/upstream/pump_amm.json','evidence/original/pump/deployed.so']+[p for _,p in PROGRAMS]
 result=dict(repository_inputs={p:sha(repo/p)for p in paths},harness_inputs={p.name:sha(p)for p in [Path(__file__),H/'base-fixture.json']},python_version=sys.version,runtime_files={str(Path(sys.executable).resolve()):sha(Path(sys.executable).resolve())})
 for name,m in sorted(sys.modules.items()):
  p=getattr(m,'__file__',None)
  if name.startswith('solders')and p and Path(p).is_file():result['runtime_files'][str(Path(p).resolve())]=sha(p)
 if candidate:
  assert report
  data=json.loads(report.read_text());attempt_path=report.with_name('build-attempt.json');attempt=json.loads(attempt_path.read_text())
  assert attempt['returncode']==0 and attempt['source_unchanged']and attempt['source_sha256']==attempt['source_after_sha256']==data['source_sha256']
  assert data['comparison']['candidate_sha256']==sha(candidate)and len(data['source_sha256'])==36
  for p,h in data['source_sha256'].items():assert sha(repo/p)==h,p
  result['candidate']=dict(sha256=sha(candidate),build_report_sha256=sha(report),build_attempt_sha256=sha(attempt_path),source_sha256=data['source_sha256'])
 return result

def save(p,d):p.write_text(json.dumps(d,indent=2)+'\n')
def main():
 p=argparse.ArgumentParser();p.add_argument('--repo',required=True,type=Path);p.add_argument('--stage',choices=['plan','original','candidate'],required=True);p.add_argument('--output',required=True,type=Path);p.add_argument('--candidate',type=Path);p.add_argument('--build-report',type=Path);p.add_argument('--accepted-original',type=Path);a=p.parse_args();repo=a.repo.resolve()
 assert not a.output.exists(),'Fresh output directory required; preserve failures';a.output.mkdir(parents=True)
 plan=unsigned_plan(repo);save(a.output/'packet-plan.json',plan)
 if a.stage=='plan':save(a.output/'result.json',dict(stage='unsigned-plan-only',runtime_executions=0,signatures_created=0,case_count=len(cases()),maximum_packet_bytes=max(x['expected_signed_transaction_bytes']for x in plan['case_rows'])));return
 if a.stage=='candidate':assert a.candidate and a.build_report and a.accepted_original
 else:assert not a.candidate and not a.build_report and not a.accepted_original
 before=bindings(repo,a.candidate,a.build_report);save(a.output/'bindings-before.json',before)
 original_summary=None
 if a.stage=='candidate':
  original_summary=json.loads((a.accepted_original/'summary.json').read_text());assert original_summary['stage']=='original'and original_summary['all_pass']and original_summary['case_count']==16
  saved=json.loads((a.accepted_original/'bindings-after.json').read_text());assert {k:v for k,v in before.items()if k!='candidate'}==saved
  for name,h in original_summary['receipt_sha256'].items():assert sha(a.accepted_original/name)==h
 rows=[]
 try:
  for index,case in enumerate(cases()):
   prefix=f'{index:02d}-{case["name"]}';row=invoke(repo,case,a.candidate,a.output/prefix);filename=prefix+'.json';save(a.output/filename,row)
   mismatch=[]
   if original_summary:
    original=json.loads((a.accepted_original/filename).read_text());assert original['case']==case and original['all_assertions_pass']
    fields=['error','normalized_logs','events','inner','return_data','before','after','pump_calls','token_calls']
    mismatch=[k for k in fields if original[k]!=row[k]]
   rows.append(dict(case=case['name'],file=filename,assertions=row['assertions'],mismatches=mismatch));save(a.output/'progress.json',rows)
   assert row['all_assertions_pass'],row['assertions'];assert not mismatch,mismatch
  after=bindings(repo,a.candidate,a.build_report);assert before==after;save(a.output/'bindings-after.json',after)
  save(a.output/'summary.json',dict(stage=a.stage,all_pass=True,case_count=len(rows),transaction_executions=len(rows),verified_signatures=len(rows),candidate_sha256=sha(a.candidate)if a.candidate else None,receipt_sha256={name:sha(a.output/name)for r in rows for name in [r['file'],r['file'][:-5]+'.transaction.json',r['file'][:-5]+'.raw-result.json']},accepted_original_summary_sha256=sha(a.accepted_original/'summary.json')if original_summary else None,rows=rows))
 except BaseException as e:
  save(a.output/'failure.json',dict(type=type(e).__name__,message=str(e),traceback=traceback.format_exc(),completed_rows=len(rows),runtime_claim='Partial receipts retained; no pass claim'))
  raise
if __name__=='__main__':main()
