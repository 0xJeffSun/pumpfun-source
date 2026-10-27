"""Distinguish AMM quote fee routes, including an artificial zero-mint edge."""
from pathlib import Path
import argparse,hashlib,importlib.util,itertools,json,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_trade_v2_differential as h
s=importlib.util.spec_from_file_location('direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py');direct=importlib.util.module_from_spec(s);s.loader.exec_module(direct)
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 quotes=[('native',h.quote),('stable',h.Pubkey.from_string('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')),('normal-2',h.Pubkey.from_string('9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP')),('exotic',h.Pubkey.from_bytes(bytes([90])*32)),('zero-synthetic',h.Pubkey.default())]
 for (label,quote),canonical,whitelist in itertools.product(quotes,[False,True],[False,True]):
  def override(vm,metas):
   h.rekey_pool(quote,canonical)(vm,metas)
   old=vm.vm.get_account(h.feeconfig);raw=bytes(old.data[:41])+struct.pack('<QQQ',10,11,12)
   for fees in [(1,2,3),(4,5,6)]:raw+=struct.pack('<I',1)+bytes(16)+struct.pack('<QQQ',*fees)
   raw+=struct.pack('<QQQ',7,8,9);vm.vm.set_account(h.feeconfig,h.Account(old.lamports,raw.ljust(4097,b'\0'),old.owner))
   h.mutate(metas[0].pubkey,261,bytes(8))(vm,metas);h.mutate(h.CONFIG_KEY,353,bytes(h.PAYER.pubkey())if whitelist else bytes(32))(vm,metas)
   disc=bytes(next(x for x in h.IDL['accounts']if x['name']=='UserVolumeAccumulator')['discriminator'])
   vm.vm.set_account(h.volume,h.Account(10**9,disc+bytes(h.PAYER.pubkey())+bytes(97),h.PROGRAM))
   if label=='zero-synthetic':
    mint=vm.vm.get_account(quote);vm.vm.set_account(quote,h.Account(mint.lamports,bytes(mint.data),mint.owner,True))
  kw=dict(name='buy_exact_quote_in_v2',amount=10**7,limit=1,overrides=override);x=h.trade(**kw);y=h.trade(candidate=a.candidate,**kw);cx,cy=direct.clean(x),direct.clean(y)
  rows.append({'quote_route':label,'canonical':canonical,'whitelist':whitelist,'synthetic_zero_program_mint':label=='zero-synthetic','original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 result={'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'case_count':len(rows),'cases':rows};a.output.write_text(json.dumps(result,separators=(',',':'))+'\n')
 bad=[{k:v for k,v in r.items()if k not in ['original','candidate']}|{'original_error':r['original']['error'],'candidate_error':r['candidate']['error']}for r in rows if r['differences']]
 print(json.dumps({'cases':len(rows),'mismatches':len(bad),'examples':bad},indent=2))
if __name__=='__main__':main()
