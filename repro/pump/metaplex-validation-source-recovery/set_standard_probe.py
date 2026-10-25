"""Ordinary signed offline SetTokenStandard mint-owner boundary probes."""
from pathlib import Path
import base64,hashlib,json,struct
from solders.account import Account
from solders.compute_budget import set_compute_unit_limit
from solders.instruction import AccountMeta,Instruction
from solders.keypair import Keypair
from solders.litesvm import LiteSVM
from solders.pubkey import Pubkey
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata
ROOT=Path(__file__).resolve().parents[2]
PROGRAM=Pubkey.from_string('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
TOKEN=Pubkey.from_string('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
ATA=Pubkey.from_string('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')
RENT=Pubkey.from_string('SysvarRent111111111111111111111111111111111')
PAYER=Keypair.from_seed(bytes([159])*32);MINT=Pubkey(bytes([160])*32);TOKEN_ACCOUNT=Pubkey(bytes([161])*32)
METADATA=Pubkey.find_program_address([b'metadata',bytes(PROGRAM),bytes(MINT)],PROGRAM)[0]
def run(binary,case):
    vm=LiteSVM().with_sigverify(True).with_blockhash_check(True).with_transaction_history(0)
    vm.add_program_from_file(PROGRAM,binary);vm.airdrop(PAYER.pubkey(),10**10)
    vm.add_program_from_file(TOKEN,ROOT/'evidence/dependencies/spl_token/deployed.so')
    vm.add_program_from_file(ATA,ROOT/'evidence/dependencies/associated_token/deployed.so')
    mint=struct.pack('<I',1)+bytes(PAYER.pubkey())+struct.pack('<QBBI',1,case['decimals'],1,0)+bytes(32)
    token=bytes(MINT)+bytes(PAYER.pubkey())+struct.pack('<Q',1)+bytes(36)+b'\1'+bytes(56)
    vm.set_account(MINT,Account(10**8,mint,Pubkey.from_string(case['mint_owner'])));vm.set_account(TOKEN_ACCOUNT,Account(10**8,token,TOKEN))
    def string(s):
        b=s.encode();return struct.pack('<I',len(b))+b
    metadata=b'\4'+bytes(PAYER.pubkey())+bytes(MINT)+string('Offline Uses fixture')+string('TEST')+string('')+struct.pack('<H',0)+bytes([0,0,1,0])
    standard=None;metadata+=b'\0' if standard is None else bytes([1,standard]);metadata+=b'\0'
    metadata+=b'\0' if case.get('no_uses') else b'\1'+struct.pack('<BQQ',1,2,2)
    metadata+=bytes(2);vm.set_account(METADATA,Account(10**8,metadata.ljust(679,b'\0'),PROGRAM))
    metas=[AccountMeta(METADATA,False,True),AccountMeta(PAYER.pubkey(),True,True),AccountMeta(MINT,False,False)]
    def state():
        out={}
        for k in [MINT,METADATA,TOKEN_ACCOUNT]:
            a=vm.get_account(k);out[str(k)]={'data_hex':a.data.hex(),'lamports':a.lamports,'owner':str(a.owner)}
        return out
    before=state();tx=Transaction.new_signed_with_payer([set_compute_unit_limit(1400000),Instruction(PROGRAM,b'\x23',metas)],PAYER.pubkey(),[PAYER],vm.latest_blockhash());assert all(tx.verify_with_results())
    result=vm.send_transaction(tx);failed=isinstance(result,FailedTransactionMetadata);meta=result.meta() if failed else result;after=state()
    if failed:assert before==after
    return {'error':str(result.err()) if failed else None,'before':before,'after':after,'logs':meta.logs(),'inner':json.loads(meta.to_json())['inner_instructions'],'runtime_sigverify':True,'runtime_blockhash_check':True,'transaction_base64':base64.b64encode(bytes(tx)).decode()}
if __name__=='__main__':
    paths={'original':ROOT/'evidence/dependencies/token_metadata/deployed.so','candidate7':ROOT/'repro/pump/metaplex-candidate-build-7/token_metadata.so'};rows=[]
    for owner,decimals in [(owner,d) for owner in [str(TOKEN),'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',str(Pubkey.default()),str(PROGRAM),str(Pubkey(bytes([179])*32))] for d in [0,9]]:
        case={'mint_owner':owner,'decimals':decimals};row={'case':case,**{side:run(path,case) for side,path in paths.items()}};row['diff']=[k for k in ['error','after','inner'] if row['original'][k]!=row['candidate7'][k]];rows.append(row)
    report={'scope':'Ordinary test-owned update-authority signed SetTokenStandard, offline synthetic mint-owner/decimals matrix; complete watched state/errors/inner and rollback.','case_count':len(rows),'signed_transactions':2*len(rows),'binary_sha256':{k:hashlib.sha256(p.read_bytes()).hexdigest() for k,p in paths.items()},'script_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};Path(__file__).with_suffix('.json').write_text(json.dumps(report,separators=(',',':'))+'\n')
    print(json.dumps([{'case':r['case'],'original_error':r['original']['error'],'candidate_error':r['candidate7']['error'],'diff':r['diff']} for r in rows],indent=2))
