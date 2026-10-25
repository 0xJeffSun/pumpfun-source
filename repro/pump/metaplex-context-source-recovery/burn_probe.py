"""Test-owned, normally signed NFT burn regression fixtures in offline LiteSVM."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json,struct
from solders.account import Account
from solders.compute_budget import set_compute_unit_limit
from solders.instruction import AccountMeta,Instruction
from solders.keypair import Keypair
from solders.litesvm import LiteSVM
from solders.pubkey import Pubkey
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata
ROOT=next(p for p in Path(__file__).resolve().parents if (p/'evidence/dependencies/token_metadata/deployed.so').is_file())
PROGRAM=Pubkey.from_string('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');TOKEN=Pubkey.from_string('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');SYSVAR=Pubkey.from_string('Sysvar1nstructions1111111111111111111111111')
PAYER=Keypair.from_seed(bytes([172])*32);MINT=Pubkey(bytes([173])*32);TOKEN_ACCOUNT=Pubkey(bytes([174])*32)
METADATA=Pubkey.find_program_address([b'metadata',bytes(PROGRAM),bytes(MINT)],PROGRAM)[0]
EDITION,BUMP=Pubkey.find_program_address([b'metadata',bytes(PROGRAM),bytes(MINT),b'edition'],PROGRAM)
def run(binary,case):
    vm=LiteSVM().with_sigverify(True).with_blockhash_check(True).with_transaction_history(0)
    vm.add_program_from_file(PROGRAM,binary);vm.add_program_from_file(TOKEN,ROOT/'evidence/dependencies/spl_token/deployed.so');vm.airdrop(PAYER.pubkey(),10**10)
    mint=struct.pack('<I',1)+bytes(EDITION)+struct.pack('<QBBI',1,0,1,1)+bytes(EDITION)
    token=bytes(MINT)+bytes(PAYER.pubkey())+struct.pack('<Q',1)+bytes(36)+b'\1'+bytes(56)
    assert len(mint)==82 and len(token)==165
    string=lambda s:struct.pack('<I',len(s))+s
    metadata=b'\4'+bytes(PAYER.pubkey())+bytes(MINT)+string(b'Owned offline NFT')+string(b'TEST')+string(b'')+struct.pack('<H',0)+bytes([0,0,1])
    nonce=case.get('nonce','valid');metadata += b'\0' if nonce=='none' else bytes([1,BUMP if nonce=='valid' else 0])
    metadata+=bytes([1,0,0,0,0,0]);metadata=metadata.ljust(679,b'\0')
    edition=(bytes([case.get('key',6)])+struct.pack('<Q',case.get('supply',0))+b'\0').ljust(case.get('edition_len',282),b'\0')[:case.get('edition_len',282)]
    for k,data,owner in [(MINT,mint,TOKEN),(TOKEN_ACCOUNT,token,TOKEN),(METADATA,metadata,PROGRAM),(EDITION,edition,PROGRAM)]:vm.set_account(k,Account(10**8,data,owner))
    absent=AccountMeta(PROGRAM,False,False)
    metas=[AccountMeta(PAYER.pubkey(),True,True),absent,AccountMeta(METADATA,False,True),AccountMeta(EDITION,False,True),AccountMeta(MINT,False,True),AccountMeta(TOKEN_ACCOUNT,False,True),absent,absent,absent,absent,absent,AccountMeta(Pubkey.default(),False,False),AccountMeta(SYSVAR,False,False),AccountMeta(TOKEN,False,False)]
    def state():
        out={}
        for k in [MINT,TOKEN_ACCOUNT,METADATA,EDITION,PAYER.pubkey()]:
            a=vm.get_account(k);out[str(k)]=None if not a else {'data_hex':a.data.hex(),'lamports':a.lamports,'owner':str(a.owner),'executable':a.executable}
        return out
    before=state();tx=Transaction.new_signed_with_payer([set_compute_unit_limit(1400000),Instruction(PROGRAM,bytes([41,0])+struct.pack('<Q',case.get('amount',1)),metas)],PAYER.pubkey(),[PAYER],vm.latest_blockhash());assert all(tx.verify_with_results())
    result=vm.send_transaction(tx);failed=isinstance(result,FailedTransactionMetadata);meta=result.meta() if failed else result;after=state()
    if failed:assert all(before[str(k)]==after[str(k)] for k in [MINT,TOKEN_ACCOUNT,METADATA,EDITION])
    return {'error':str(result.err()) if failed else None,'before':before,'after':after,'inner':json.loads(meta.to_json())['inner_instructions'],'logs':meta.logs(),'runtime_sigverify':True,'runtime_blockhash_check':True,'transaction_base64':base64.b64encode(bytes(tx)).decode()}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();sha=lambda f:hashlib.sha256(f.read_bytes()).hexdigest();original=ROOT/'evidence/dependencies/token_metadata/deployed.so'
    cases=[{'nonce':n,**v} for n in ['valid','none','wrong'] for v in [{},{'supply':1},{'key':2},{'amount':0},{'amount':2},{'edition_len':0},{'edition_len':8}]];rows=[]
    for case in cases:
        x=run(original,case);y=run(a.candidate,case);rows.append({'case':case,'original':x,'candidate':y,'diff':[k for k in ['error','after','inner'] if x[k]!=y[k]]})
    report={'scope':'Ordinary owner-signed offline NFT burn with canonical own edition PDA, nonce and boundary variants. Complete watched state/errors/inner instructions; logs and compute excluded.','case_count':len(rows),'signed_transactions':len(rows)*2,'original_sha256':sha(original),'candidate_sha256':sha(a.candidate),'script_sha256':sha(Path(__file__)),'mismatches':[{'case':r['case'],'diff':r['diff']} for r in rows if r['diff']],'cases':rows};data=json.dumps(report,separators=(',',':')).encode();a.output.write_bytes(gzip.compress(data,mtime=0) if a.output.suffix=='.gz' else data)
    print(json.dumps({'case_count':len(rows),'successes':sum(r['original']['error'] is None for r in rows),'mismatches':report['mismatches'],'first_error':rows[0]['original']['error']},indent=2));assert not report['mismatches']
