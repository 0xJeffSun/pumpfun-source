from pathlib import Path
import base64,gzip,hashlib,json,struct
from solders.account import Account
from solders.compute_budget import set_compute_unit_limit
from solders.instruction import AccountMeta,Instruction
from solders.keypair import Keypair
from solders.litesvm import LiteSVM
from solders.pubkey import Pubkey
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata
p=Path('/home/ahi200/pumpfun-work/20261027-metaplex/runtime-portable');root=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');H=lambda b:hashlib.sha256(b).hexdigest()
PROGRAM=Pubkey.from_string('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');TOKEN=Pubkey.from_string('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');ATA=Pubkey.from_string('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');RENT=Pubkey.from_string('SysvarRent111111111111111111111111111111111');SYSTEM=Pubkey.default()
OWNER=Keypair.from_seed(bytes([181])*32);MINT=Pubkey(bytes([182])*32);TOKEN_ACCOUNT=Pubkey(bytes([183])*32);METADATA=Pubkey.find_program_address([b'metadata',bytes(PROGRAM),bytes(MINT)],PROGRAM)[0];EDITION,BUMP=Pubkey.find_program_address([b'metadata',bytes(PROGRAM),bytes(MINT),b'edition'],PROGRAM)
paths={'original':root/'evidence/dependencies/token_metadata/deployed.so','candidate':Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source/research/metaplex-utilize-exact-recovery/candidate.so')}
U=(1<<64)-1
cases=[{'name':name,'method':method,'remaining':remaining,'total':total,'count':count,'success':success} for name,method,remaining,total,count,success in [('zero',1,5,5,0,False),('above-total',1,5,5,6,False),('above-remaining',1,5,10,6,False),('exact-remaining',1,5,10,5,True),('partial',1,5,10,1,True),('empty',1,0,10,1,False),('maximum-exact',1,U,U,U,True),('maximum-over-remaining',1,U-1,U,U,False),('maximum-partial',1,U,U,1,True),('single-terminal',2,1,1,1,True),('burn-terminal',0,1,1,1,True),('burn-partial',0,2,2,1,True)]]
def setup(path,case):
 vm=LiteSVM().with_sigverify(True).with_blockhash_check(True).with_transaction_history(0);vm.add_program_from_file(PROGRAM,path);vm.add_program_from_file(TOKEN,root/'evidence/dependencies/spl_token/deployed.so');vm.add_program_from_file(ATA,root/'evidence/dependencies/associated_token/deployed.so');vm.airdrop(OWNER.pubkey(),10**10)
 mint=struct.pack('<I',1)+bytes(EDITION)+struct.pack('<QBBI',1,0,1,1)+bytes(EDITION)
 token=bytes(MINT)+bytes(OWNER.pubkey())+struct.pack('<Q',1)+bytes(36)+b'\1'+bytes(56)
 string=lambda s:struct.pack('<I',len(s))+s
 metadata=b'\4'+bytes(OWNER.pubkey())+bytes(MINT)+string(b'Owned use fixture')+string(b'USE')+string(b'')+struct.pack('<H',0)+bytes([0,0,1,1,BUMP,1,0,0,1])+struct.pack('<BQQ',case['method'],case['remaining'],case['total'])+bytes([0,0]);metadata=metadata.ljust(679,b'\0')
 assert len(mint)==82 and len(token)==165
 for key,data,owner in [(MINT,mint,TOKEN),(TOKEN_ACCOUNT,token,TOKEN),(METADATA,metadata,PROGRAM)]:vm.set_account(key,Account(10**8,data,owner))
 return vm
def decode_uses(encoded):
 data=bytes.fromhex(encoded);offset=65
 for _ in range(3):
  length=struct.unpack_from('<I',data,offset)[0];offset+=4+length
 offset+=2
 creators=data[offset];offset+=1
 if creators:
  count=struct.unpack_from('<I',data,offset)[0];offset+=4+34*count
 offset+=2
 for payload_size in [1,1,33]:
  present=data[offset];offset+=1
  if present:offset+=payload_size
 assert data[offset]==1;offset+=1
 return struct.unpack_from('<BQQ',data,offset)
rows=[]
for case in cases:
 vms={k:setup(path,case) for k,path in paths.items()};assert len({str(vm.latest_blockhash()) for vm in vms.values()})==1
 metas=[AccountMeta(METADATA,False,True),AccountMeta(TOKEN_ACCOUNT,False,True),AccountMeta(MINT,False,True),AccountMeta(OWNER.pubkey(),True,True),AccountMeta(OWNER.pubkey(),True,True),AccountMeta(TOKEN,False,False),AccountMeta(ATA,False,False),AccountMeta(SYSTEM,False,False),AccountMeta(RENT,False,False)]
 tx=Transaction.new_signed_with_payer([set_compute_unit_limit(1400000),Instruction(PROGRAM,bytes([19])+struct.pack('<Q',case['count']),metas)],OWNER.pubkey(),[OWNER],vms['original'].latest_blockhash());assert all(tx.verify_with_results());results={}
 for label,vm in vms.items():
  def state():
   answer={}
   for key in [MINT,TOKEN_ACCOUNT,METADATA,OWNER.pubkey()]:
    a=vm.get_account(key);answer[str(key)]=None if a is None else {'data_hex':a.data.hex(),'lamports':a.lamports,'owner':str(a.owner),'executable':a.executable}
   return answer
  before=state();result=vm.send_transaction(tx);failed=isinstance(result,FailedTransactionMetadata);meta=result.meta() if failed else result;after=state()
  if failed:
   for key in [MINT,TOKEN_ACCOUNT,METADATA]:assert before[str(key)]==after[str(key)]
  results[label]={'error':str(result.err()) if failed else None,'before':before,'after':after,'inner':json.loads(meta.to_json())['inner_instructions'],'logs':meta.logs(),'transaction_base64':base64.b64encode(bytes(tx)).decode(),'runtime_sigverify':True,'runtime_blockhash_check':True}
 left,right=results['original'],results['candidate'];diff=[k for k in ['error','after','inner'] if left[k]!=right[k]];rows.append({'case':case,'results':results,'mismatches':diff});print(case['name'],left['error'],diff,flush=True)
 assert (left['error'] is None)==case['success'] and not diff
 for result in results.values():
  assert any('IX: Use/Utilize Token' in line for line in result['logs'])
  if case['success']:
   assert decode_uses(result['after'][str(METADATA)]['data_hex'])==(case['method'],case['remaining']-case['count'],case['total'])
   supply=struct.unpack_from('<Q',bytes.fromhex(result['after'][str(MINT)]['data_hex']),36)[0]
   amount=struct.unpack_from('<Q',bytes.fromhex(result['after'][str(TOKEN_ACCOUNT)]['data_hex']),64)[0]
   expected=0 if case['method']==0 and case['remaining']==case['count'] else 1
   assert supply==amount==expected
  else:
   assert 'InstructionErrorCustom(86)' in result['error']
report={'binary_sha256':{k:H(v.read_bytes()) for k,v in paths.items()},'case_count':len(rows),'signed_transactions':len(rows)*2,'cases':rows,'scope':'Owned owner-use fixtures with canonical metadata PDA, fixed valid signatures and blockhash checks. Compare all watched state, errors and inner instructions; logs/compute excluded. Does not cover delegated authority.'};(p/'utilize-validation.json.gz').write_bytes(gzip.compress(json.dumps(report,indent=2).encode(),mtime=0))
