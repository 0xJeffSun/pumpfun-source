"""Check market-cap failure precedence before local AMM fee selection."""
from pathlib import Path
import argparse,hashlib,importlib.util,itertools,json,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_trade_v2_differential as h
s=importlib.util.spec_from_file_location('direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py');direct=importlib.util.module_from_spec(s);s.loader.exec_module(direct)
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name,canonical,reserve,length,whitelist in itertools.product(['sell_v2','buy_exact_quote_in_v2'],[False,True],[0,1],[2511,2512,4097],[False,True]):
  def override(vm,metas):
   h.rekey_pool(h.quote,canonical)(vm,metas);h.custom_fee_table([(0,(0,0,0))])(vm,metas)
   h.mutate(h.feeconfig,41,bytes(24))(vm,metas);h.mutate(h.feeconfig,0,b'',length)(vm,metas)
   h.mutate(h.vaultbase,64,struct.pack('<Q',reserve))(vm,metas)
   h.mutate(metas[0].pubkey,245,bytes(16))(vm,metas);h.mutate(metas[0].pubkey,261,bytes(8))(vm,metas);h.mutate(metas[0].pubkey,271,bytes(16))(vm,metas)
   h.mutate(h.CONFIG_KEY,353,bytes(h.PAYER.pubkey())if whitelist else bytes(32))(vm,metas)
  kw=dict(name=name,amount=10**7,limit=1,overrides=override);x=h.trade(**kw);y=h.trade(candidate=a.candidate,**kw);cx,cy=direct.clean(x),direct.clean(y)
  rows.append({'instruction':name,'canonical':canonical,'base_reserve':reserve,'fee_config_len':length,'whitelist':whitelist,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 result={'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'case_count':len(rows),'cases':rows};a.output.write_text(json.dumps(result,separators=(',',':'))+'\n')
 bad=[{k:v for k,v in r.items()if k not in ['original','candidate']}|{'original_error':r['original']['error'],'candidate_error':r['candidate']['error']}for r in rows if r['differences']]
 print(json.dumps({'cases':len(rows),'mismatches':len(bad),'examples':bad},indent=2))
if __name__=='__main__':main()
