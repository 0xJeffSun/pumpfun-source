"""Ordinary signed offline metadata creation probes for Uses validation."""
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
PAYER=Keypair.from_seed(bytes([157])*32);MINT=Pubkey(bytes([158])*32)
METADATA=Pubkey.find_program_address([b'metadata',bytes(PROGRAM),bytes(MINT)],PROGRAM)[0]
def run(binary,case):
    vm=LiteSVM().with_sigverify(True).with_blockhash_check(True).with_transaction_history(0)
    vm.add_program_from_file(PROGRAM,binary);vm.airdrop(PAYER.pubkey(),10**10)
    mint=struct.pack('<I',1)+bytes(PAYER.pubkey())+struct.pack('<QBBI',1,0,1,0)+bytes(32)
    vm.set_account(MINT,Account(10**8,mint,TOKEN))
    def string(s):
        b=s.encode();return struct.pack('<I',len(b))+b
    data=string('Offline test')+string('TEST')+string('')+struct.pack('<H',0)+bytes([0,0])
    data+=b'\1'+struct.pack('<BQQ',case['method'],case['remaining'],case['total'])
    payload=b'\x21'+data+bytes([1,0])
    metas=[AccountMeta(METADATA,False,True),AccountMeta(MINT,False,False),AccountMeta(PAYER.pubkey(),True,True),AccountMeta(PAYER.pubkey(),True,True),AccountMeta(PAYER.pubkey(),True,False),AccountMeta(Pubkey.from_string(case.get('system_program',str(Pubkey.default()))),False,False)]
    if case.get('extra_system'): metas.append(AccountMeta(Pubkey.default(),False,False))
    def state():
        out={}
        for k in [MINT,METADATA]:
            a=vm.get_account(k);out[str(k)]=None if not a else {'data_hex':a.data.hex(),'lamports':a.lamports,'owner':str(a.owner)}
        return out
    before=state();tx=Transaction.new_signed_with_payer([set_compute_unit_limit(1400000),Instruction(PROGRAM,payload,metas)],PAYER.pubkey(),[PAYER],vm.latest_blockhash());assert all(tx.verify_with_results())
    result=vm.send_transaction(tx);failed=isinstance(result,FailedTransactionMetadata);meta=result.meta() if failed else result;after=state()
    if failed:assert before==after
    return {'error':str(result.err()) if failed else None,'before':before,'after':after,'logs':meta.logs(),'inner':json.loads(meta.to_json())['inner_instructions'],'runtime_sigverify':True,'runtime_blockhash_check':True,'transaction_base64':base64.b64encode(bytes(tx)).decode()}
if __name__=='__main__':
    paths={'original':ROOT/'evidence/dependencies/token_metadata/deployed.so','candidate6':ROOT/'repro/pump/metaplex-candidate-build-6/token_metadata.so'};rows=[]
    for program,extra in [(program,extra) for program in [str(Pubkey.default()),str(TOKEN),'ComputeBudget111111111111111111111111111111',str(Pubkey(bytes([171])*32))] for extra in [False,True]]:
        case={'method':1,'remaining':2,'total':2,'system_program':program,'extra_system':extra};row={'case':case,**{side:run(path,case) for side,path in paths.items()}};row['diff']=[k for k in ['error','after','inner'] if row['original'][k]!=row['candidate6'][k]];rows.append(row)
    report={'scope':'Test-owned ordinary signed offline metadata creation with varied system-program account identity. Full watched state, errors, inner instructions and rollback.','case_count':len(rows),'signed_transactions':2*len(rows),'binary_sha256':{k:hashlib.sha256(p.read_bytes()).hexdigest() for k,p in paths.items()},'script_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows}
    Path(__file__).with_suffix('.json').write_text(json.dumps(report,separators=(',',':'))+'\n');print(json.dumps([{'case':r['case'],'original_error':r['original']['error'],'candidate_error':r['candidate6']['error'],'diff':r['diff']} for r in rows],indent=2))
