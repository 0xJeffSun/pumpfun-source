"""Cross-check six AMM trade entrypoints at reserve, fee and waiver boundaries."""
from pathlib import Path
import argparse,hashlib,importlib.util,itertools,json,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_trade_v2_differential as v2
import pump_amm_legacy_buy_differential as legacy
s=importlib.util.spec_from_file_location('direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py');direct=importlib.util.module_from_spec(s);s.loader.exec_module(direct)
MAX=2**64-1

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name,reserves,amount,limit,fees,whitelist in itertools.product(['buy','buy_exact_quote_in','sell','buy_v2','buy_exact_quote_in_v2','sell_v2'],[(1,1),(2,1),(MAX,MAX),(10,MAX)],[1,2,10,MAX],[1,MAX],[(0,0,0),(20,5,30),(10000,10000,10000),(MAX,0,0)],[False,True]):
  h=v2 if name.endswith('_v2')else legacy
  def override(vm,metas):
   h.custom_fee_table([(0,fees)])(vm,metas)
   h.mutate(h.CONFIG_KEY,353,bytes(h.PAYER.pubkey())if whitelist else bytes(32))(vm,metas)
   h.mutate(h.vaultbase,64,struct.pack('<Q',reserves[0]))(vm,metas);h.mutate(h.vaultquote,64,struct.pack('<Q',reserves[1]))(vm,metas)
   h.mutate(metas[0].pubkey,245,bytes(16))(vm,metas);h.mutate(metas[0].pubkey,261,bytes(8))(vm,metas);h.mutate(metas[0].pubkey,271,bytes(16))(vm,metas)
  kw=dict(amount=amount,limit=limit,overrides=override)
  if name.endswith('_v2'):run=v2.trade;kw['name']=name
  elif name=='sell':run=legacy.legacy
  else:run=legacy.legacy_buy;kw['name']=name
  x=run(**kw);y=run(candidate=a.candidate,**kw);cx,cy=direct.clean(x),direct.clean(y)
  rows.append({'instruction':name,'base_reserve':reserves[0],'quote_reserve':reserves[1],'amount':amount,'limit':limit,'fees':fees,'whitelist':whitelist,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 result={'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'case_count':len(rows),'cases':rows};a.output.write_text(json.dumps(result,separators=(',',':'))+'\n')
 bad=[{k:v for k,v in r.items()if k not in ['original','candidate']}|{'original_error':r['original']['error'],'candidate_error':r['candidate']['error']}for r in rows if r['differences']]
 print(json.dumps({'cases':len(rows),'mismatches':len(bad),'examples':bad[:10]},indent=2))
if __name__=='__main__':main()
