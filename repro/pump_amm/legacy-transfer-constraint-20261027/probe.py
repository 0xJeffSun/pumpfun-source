#!/usr/bin/env python3
"""Observe legacy transfer with coherent mint/ATA pairs and ordinary signatures."""
import argparse,base64,hashlib,json,sys,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_transfer_creator_differential as h

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def run(binary,kind,amount,lamports):
 vm=h.acquire_harness(binary).vm;vm.set_clock(h.Clock(100,1234567890,0,0,1234567890))
 for pid,name in [(h.TOKEN,'spl_token'),(h.TOKEN22,'spl_token_2022'),(h.ATA,'associated_token')]:vm.add_program_from_file(pid,ROOT/'evidence/dependencies'/name/'deployed.so')
 mint=h.quote if kind=='native'else h.base;program=h.TOKEN22 if kind=='token2022'else h.TOKEN;row=h.f['accounts']['quote_mint'if kind=='native'else'base_mint']
 vm.set_account(mint,h.Account(row['lamports'],base64.b64decode(row['data_base64']),program))
 vault=h.Pubkey.find_program_address([bytes(h.AUTH),bytes(program),bytes(mint)],h.ATA)[0]
 vm.set_account(vault,h.Account(lamports,h.token(mint,h.AUTH,amount,kind=='native'),program));vm.set_account(h.AUTH,h.Account(10**9,b'',h.Pubkey.default()));vm.set_account(h.PUMPVAULT,h.Account(10**9,b'',h.Pubkey.default()))
 keys=[mint,program,h.Pubkey.default(),h.ATA,h.CREATOR,h.AUTH,vault,h.PUMPVAULT,h.EVENT,h.PROGRAM];ix=next(x for x in h.IDL['instructions']if x['name']=='transfer_creator_fees_to_pump');metas=[h.AccountMeta(k,bool(x.get('signer')),bool(x.get('writable')))for k,x in zip(keys,ix['accounts'])]
 watch=set(keys+[h.PAYER.pubkey()])
 def snap():
  out={}
  for key in sorted(watch,key=str):
   a=vm.get_account(key)
   if a is None or not a.executable:out[str(key)]=None if a is None else{'data':a.data.hex(),'lamports':a.lamports,'owner':str(a.owner)}
  return out
 before=snap();tx=h.Transaction.new_signed_with_payer([h.Instruction(h.PROGRAM,bytes(ix['discriminator']),metas)],h.PAYER.pubkey(),[h.PAYER],vm.latest_blockhash());assert all(tx.verify_with_results());result=vm.send_transaction(tx);failed=isinstance(result,h.FailedTransactionMetadata);meta=result.meta()if failed else result;raw=json.loads(meta.to_json())
 return {'before':before,'after':snap(),'logs':meta.logs(),'error':str(result.err())if failed else None,'inner':raw['inner_instructions'],'return_data':raw['return_data'],'transaction_base64':base64.b64encode(bytes(tx)).decode()}
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--build-record',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();record=json.loads(a.build_record.read_text());assert record['returncode']==0 and record['source_unchanged'] and record['comparison']['candidate_sha256']==sha(a.candidate);cases=[]
 for kind in ['native','token','token2022']:
  for amount in [0,1]:
   for lamports in [1,2039280,10**9]:
    x=run(ROOT/'evidence/original/pump_amm/deployed.so',kind,amount,lamports);y=run(a.candidate,kind,amount,lamports);assert x['before']==y['before']and x['transaction_base64']==y['transaction_base64'];cases.append({'kind':kind,'amount':amount,'lamports':lamports,'original':x,'candidate':y});print(kind,amount,lamports,x['error'],y['error'])
 r={'candidate_sha256':sha(a.candidate),'original_sha256':sha(ROOT/'evidence/original/pump_amm/deployed.so'),'probe_sha256':sha(Path(__file__)),'build_record_sha256':sha(a.build_record),'input_sha256':{name:sha(ROOT/name)for name in ['scripts/pump_amm_transfer_creator_differential.py','scripts/pump_amm_liquidity_differential.py','scripts/pump_amm_reusable_harness.py']},'cases':cases};a.output.write_text(json.dumps(r,indent=2)+'\n')
if __name__=='__main__':main()
