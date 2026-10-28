"""Execute signed loader instructions in local memory; no RPC or live accounts."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json,struct
from solders.litesvm import LiteSVM
from solders.pubkey import Pubkey
from solders.keypair import Keypair
from solders.transaction import Transaction
from solders.instruction import Instruction,AccountMeta
from solders.system_program import create_account
from solders.compute_budget import set_compute_unit_limit
from solders.sysvar import RENT,CLOCK
from solders.transaction_metadata import FailedTransactionMetadata
from importlib.metadata import version

sha=lambda b:hashlib.sha256(b).hexdigest()

def execute(root,candidate,output):
 output.mkdir(parents=True,exist_ok=False)
 capture=root/'evidence/dependencies/token_metadata'
 info=json.loads((capture/'capture.json').read_bytes())
 original=(capture/'deployed.so').read_bytes();original_account=(capture/'programdata-account.bin').read_bytes()
 assert sha(original)==info['payload_sha256'] and sha(original_account)==info['programdata_sha256']
 assert original_account[45:]==original and struct.unpack_from('<I',original_account)[0]==3
 capacity=len(original_account)-45;assert capacity==info['payload_bytes']==793991
 elf=candidate.read_bytes();assert len(elf)==707448 and elf==original[:len(elf)]
 assert sha(elf)=='99ee61a5159e15a359b01298b52c9f9f912eb19e47bdfe83987c16de52a4b1ff'
 loader=Pubkey.from_string('BPFLoaderUpgradeab1e11111111111111111111111')
 payer=Keypair.from_seed(bytes([61])*32);buffer=Keypair.from_seed(bytes([62])*32);program=Keypair.from_seed(bytes([63])*32)
 pdata,_=Pubkey.find_program_address([bytes(program.pubkey())],loader)
 vm=LiteSVM().with_sigverify(True).with_blockhash_check(True).with_transaction_history(0)
 vm.airdrop(payer.pubkey(),10**12)
 receipts=[]
 meta=lambda k,s=False,w=False:AccountMeta(k,s,w)
 def send(label,ixs,signers):
  tx=Transaction.new_signed_with_payer(ixs,payer.pubkey(),signers,vm.latest_blockhash())
  assert len(bytes(tx))<=1232 and all(tx.verify_with_results())
  result=vm.send_transaction(tx)
  if isinstance(result,FailedTransactionMetadata):raise RuntimeError((label,result))
  receipts.append(dict(label=label,transaction_base64=base64.b64encode(bytes(tx)).decode(),signatures=[str(s)for s in tx.signatures],compute_units=result.compute_units_consumed(),logs=result.logs()))
  if len(receipts)%100==0:print('loader transactions',len(receipts),flush=True)
  return result
 send('create-and-initialize-buffer',[create_account(dict(from_pubkey=payer.pubkey(),to_pubkey=buffer.pubkey(),lamports=vm.minimum_balance_for_rent_exemption(37+len(elf)),space=37+len(elf),owner=loader)),Instruction(loader,struct.pack('<I',0),[meta(buffer.pubkey(),w=True),meta(payer.pubkey())])],[payer,buffer])
 for offset in range(0,len(elf),900):
  chunk=elf[offset:offset+900]
  send('write-'+str(offset),[Instruction(loader,struct.pack('<IIQ',1,offset,len(chunk))+chunk,[meta(buffer.pubkey(),w=True),meta(payer.pubkey(),s=True)])],[payer])
 actual_buffer=vm.get_account(buffer.pubkey());assert bytes(actual_buffer.data)[37:]==elf
 send('create-program-and-deploy',[set_compute_unit_limit(1400000),create_account(dict(from_pubkey=payer.pubkey(),to_pubkey=program.pubkey(),lamports=vm.minimum_balance_for_rent_exemption(36),space=36,owner=loader)),Instruction(loader,struct.pack('<IQ',2,capacity),[meta(payer.pubkey(),s=True,w=True),meta(pdata,w=True),meta(program.pubkey(),w=True),meta(buffer.pubkey(),w=True),meta(RENT),meta(CLOCK),meta(Pubkey.default()),meta(payer.pubkey(),s=True)])],[payer,program])
 account=vm.get_account(pdata);data=bytes(account.data);program_account=vm.get_account(program.pubkey())
 assert account.owner==loader and program_account.owner==loader and program_account.executable
 assert len(data)==capacity+45 and data[45:]==original
 assert data[45:45+len(elf)]==elf and not any(data[45+len(elf):])
 assert data!=original_account
 report=dict(schema='metaplex-signed-local-loader-v1',solders=version('solders'),candidate_sha256=sha(elf),candidate_bytes=len(elf),capture_sha256=sha((capture/'capture.json').read_bytes()),observed_capacity=capacity,programdata_bytes=len(data),programdata_sha256=sha(data),payload_sha256=sha(data[45:]),payload_equals_capture=True,programdata_equals_capture=False,zero_tail_bytes=capacity-len(elf),program=str(program.pubkey()),programdata=str(pdata),payer=str(payer.pubkey()),buffer=str(buffer.pubkey()),program_account_data=base64.b64encode(bytes(program_account.data)).decode(),program_executable=program_account.executable,programdata_owner=str(account.owner),programdata_lamports=account.lamports,transactions=len(receipts),verified_signature_fields=sum(len(x['signatures'])for x in receipts),receipts=receipts,scope='Synthetic local program, payer, authority and slot. Capacity selected from captured account extent, not independently recovered deployment history. No original program ID, historical metadata, or network deployment claim.')
 (output/'programdata.bin.gz').write_bytes(gzip.compress(data,mtime=0))
 (output/'receipt.json.gz').write_bytes(gzip.compress(json.dumps(report,indent=2).encode(),mtime=0))
 print(json.dumps({k:v for k,v in report.items()if k!='receipts'},indent=2),flush=True)

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--root',type=Path,required=True);p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();execute(a.root.resolve(),a.candidate.resolve(),a.output.resolve())
