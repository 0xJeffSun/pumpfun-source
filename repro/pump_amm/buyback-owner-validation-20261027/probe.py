"""Differentially observe the legacy AMM's zero buyback-recipient rejection."""
import argparse,base64,hashlib,json,re,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_legacy_buy_differential as h

def override(owner,slot,bps,valid_ata):
 def apply(vm,metas):
  config=vm.vm.get_account(h.CONFIG_KEY);raw=bytearray(config.data)
  raw[643:899]=bytes(h.OUTSIDER.pubkey())*8
  if slot is not None:raw[643+slot*32:675+slot*32]=bytes(owner)
  raw[899:907]=bps.to_bytes(8,'little');vm.vm.set_account(h.CONFIG_KEY,h.Account(config.lamports,bytes(raw),config.owner))
  dest=h.Pubkey.find_program_address([bytes(owner),bytes(h.TOKEN),bytes(h.quote)],h.ATA)[0] if valid_ata else h.buyback
  vm.vm.set_account(dest,h.Account(2039280,h.token(h.quote,owner,0,True),h.TOKEN))
  metas[-2]=h.AccountMeta(owner,False,False);metas[-1]=h.AccountMeta(dest,False,True)
 return apply

def normalized(v):
 return {k:([re.sub(r'(?<=thrown in )[^ ]+:[0-9]+', '<source>',s) for s in x if not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',s)] if k=='logs' else x) for k,x in v.items()}

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name in ['buy','buy_exact_quote_in','sell']:
  for zero in [True,False]:
   owner=h.Pubkey.default() if zero else h.owner
   for slot in [None,0,7]:
    for bps in [0,10000]:
     for valid in [True,False]:
      kw={'overrides':override(owner,slot,bps,valid)}
      if name=='sell':fn=h.legacy
      else:fn=h.legacy_buy;kw.update(name=name,amount=10**10 if name=='buy' else 10**7,limit=10**12 if name=='buy' else 1)
      x=fn(**kw);y=fn(candidate=a.candidate,**kw)
      for v in [x,y]:assert all(h.Transaction.from_bytes(base64.b64decode(v['transaction_base64'])).verify_with_results())
      assert x['before']==y['before'] and x['transaction_base64']==y['transaction_base64']
      nx,ny=normalized(x),normalized(y);diff=[k for k in nx if nx[k]!=ny[k]]
      rows.append({'instruction':name,'zero':zero,'slot':slot,'bps':bps,'valid_ata':valid,'original':x,'candidate':y,'diff':diff})
 print(json.dumps({'cases':len(rows),'mismatches':sum(bool(r['diff'])for r in rows),'examples':[{'instruction':r['instruction'],'slot':r['slot'],'bps':r['bps'],'original':r['original']['error'],'candidate':r['candidate']['error'],'diff':r['diff']}for r in rows if r['diff']][:8]},indent=2))
 a.output.write_text(json.dumps({'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows},indent=2)+'\n')
if __name__=='__main__':main()
