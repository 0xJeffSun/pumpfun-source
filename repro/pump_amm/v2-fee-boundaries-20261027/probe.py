"""Probe original v2 exact-buy fee ordering and denominator boundaries."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,struct,sys,itertools
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_trade_v2_differential as h
sp=importlib.util.spec_from_file_location('direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m)
FEES=[(10001,0,0),(20000,0,0),(2**64-1,0,0),(0,2**64-1,0),(0,0,2**64-1),(2**64-1,2**64-1,0)]
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for fee,amount,whitelist,creator in itertools.product(FEES,[1000,10**15,2**64-1],[False,True],[False,True]):
  def override(vm,metas):
   h.rekey_pool(h.quote,True)(vm,metas);h.custom_fee_table([(0,fee)])(vm,metas)
   actual=metas[0].pubkey;acct=vm.vm.get_account(actual);raw=bytearray(acct.data);raw[211:243]=bytes(h.PAYER.pubkey())if creator else bytes(32);raw[261:269]=bytes(8);vm.vm.set_account(actual,h.Account(acct.lamports,bytes(raw),acct.owner))
   h.mutate(h.CONFIG_KEY,353,bytes(h.PAYER.pubkey())if whitelist else bytes(32))(vm,metas)
  kw=dict(name='buy_exact_quote_in_v2',amount=amount,limit=1,overrides=override)
  x=h.trade(**kw);y=h.trade(candidate=a.candidate,**kw);cx,cy=m.clean(x),m.clean(y);diff=[k for k in cx if cx[k]!=cy[k]]
  rows.append({'fees':fee,'amount':amount,'whitelist':whitelist,'creator':creator,'original':x,'candidate':y,'differences':diff})
 result={'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'case_count':len(rows),'cases':rows};a.output.write_text(json.dumps(result,separators=(',',':'))+'\n')
 bad=[{k:v for k,v in r.items()if k not in ['original','candidate']}|{'original_error':r['original']['error'],'candidate_error':r['candidate']['error']}for r in rows if r['differences']]
 print(json.dumps({'cases':len(rows),'mismatches':len(bad),'examples':bad[:12]},indent=2))
if __name__=='__main__':main()
