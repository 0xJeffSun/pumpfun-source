#!/usr/bin/env python3
"""Check that absent coin creators suppress creator-fee precomputation."""
import argparse,base64,hashlib,json,struct,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'));sys.path.insert(0,str(Path(__file__).resolve().parent))
import pump_amm_legacy_buy_differential as h
from probe_creator_fee_gate import clean

def override(name,bps):
 def ov(vm,m):
  h.mutate(h.pool,211,bytes(32))(vm,m);h.mutate(h.pool,261,struct.pack('<Q',bps))(vm,m);h.mutate(h.CONFIG_KEY,940,b'\1')(vm,m)
  vault=h.Pubkey.find_program_address([b'creator_vault',bytes(32)],h.PROGRAM)[0];ata=h.Pubkey.find_program_address([bytes(vault),bytes(h.TOKEN),bytes(h.quote)],h.ATA)[0]
  vm.vm.set_account(vault,h.Account(10**9,b'',h.Pubkey.default()));vm.vm.set_account(ata,h.Account(2039280,h.token(h.quote,vault,0,True),h.TOKEN));m[17]=h.AccountMeta(ata,False,True);m[18]=h.AccountMeta(vault,False,False)
  del m[21 if name=='sell' else 23]
 return ov

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name in ['buy','buy_exact_quote_in','sell']:
  for bps in [1,10000,2**64-1]:
   for amount in ([1,2**64-1]if name=='buy_exact_quote_in'else[10**6,10**10]):
    kw={'amount':amount,'overrides':override(name,bps)}
    if name=='sell':run=h.legacy
    else:run=h.legacy_buy;kw.update(name=name,limit=1 if name=='buy_exact_quote_in' else 10**12)
    x,y=run(**kw),run(candidate=a.candidate,**kw)
    for z in [x,y]:assert all(h.Transaction.from_bytes(base64.b64decode(z['transaction_base64'])).verify_with_results())
    assert x['before']==y['before']and x['transaction_base64']==y['transaction_base64'];cx,cy=clean(x),clean(y);rows.append({'instruction':name,'bps':bps,'amount':amount,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 out={'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'cases':len(rows),'mismatches':[{'instruction':x['instruction'],'bps':x['bps'],'amount':x['amount'],'differences':x['differences']}for x in rows if x['differences']]}))
if __name__=='__main__':main()
