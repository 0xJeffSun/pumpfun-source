import json,pathlib,hashlib
from solders.account import Account
from solders.instruction import AccountMeta,Instruction
from solders.keypair import Keypair
from solders.pubkey import Pubkey
from solders.litesvm import LiteSVM
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata
R=pathlib.Path.cwd();P=Pubkey.from_string('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');T=Pubkey.from_string('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');SYS=Pubkey.default();I=Pubkey.from_string('Sysvar1nstructions1111111111111111111111111');D=Keypair.from_seed(bytes([177])*32);U=Keypair.from_seed(bytes([178])*32);PAY=Keypair.from_seed(bytes([179])*32);M=Pubkey(bytes([180])*32);MD=Pubkey.find_program_address([b'metadata',bytes(P),bytes(M)],P)[0];REC,B=Pubkey.find_program_address([b'metadata',bytes(P),bytes(M),b'collection_delegate',bytes(U.pubkey()),bytes(D.pubkey())],P)
def run(binary,mode):
 vm=LiteSVM().with_transaction_history(0);vm.add_program_from_file(P,binary)
 for k in [D,U,PAY]:vm.airdrop(k.pubkey(),10**10)
 md=(bytes([4])+bytes(U.pubkey())+bytes(M)+bytes(12)+bytes(2)+bytes([0,0,1])+bytes(6)).ljust(679,b'\0')
 vm.set_account(MD,Account(10**8,md,P));vm.set_account(M,Account(10**8,bytes(82),T))
 rec=bytes([12,B])+bytes(M)+bytes(D.pubkey())+bytes(U.pubkey());vm.set_account(REC,Account(10**8,rec,P))
 auth=D if mode=='self_revoke' else U
 keys=[REC,D.pubkey(),MD,P,P,M,P,auth.pubkey(),PAY.pubkey(),SYS,I,P,P,P]
 metas=[AccountMeta(k,i in [7,8],i in [0,2,4,6,8] and k!=P) for i,k in enumerate(keys)]
 tx=Transaction.new_signed_with_payer([Instruction(P,bytes([45,0]),metas)],PAY.pubkey(),[PAY,auth],vm.latest_blockhash());assert all(tx.verify_with_results());r=vm.send_transaction(tx);failed=isinstance(r,FailedTransactionMetadata);m=r.meta() if failed else r
 a=vm.get_account(REC)
 return {'error':str(r.err()) if failed else None,'logs':m.logs(),'record_lamports':a.lamports if a else None,'record_data':a.data.hex() if a else None,'payer_lamports':vm.get_account(PAY.pubkey()).lamports}
paths={'original':R/'evidence/dependencies/token_metadata/deployed.so','trial3':R/'repro/pump/metaplex-candidate-build-3/token_metadata.so'}
result={'binary_sha256':{k:hashlib.sha256(p.read_bytes()).hexdigest() for k,p in paths.items()},'cases':{mode:{k:run(p,mode) for k,p in paths.items()} for mode in ['self_revoke','update_authority_revoke']}}
print(json.dumps(result,indent=2));(R/'work/pump-recovery').mkdir(parents=True,exist_ok=True);(R/'work/pump-recovery/metadata-self-revoke-proof.json').write_text(json.dumps(result,indent=2)+'\n')
