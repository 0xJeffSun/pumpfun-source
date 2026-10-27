"""Bound which exact-v2 amount reaches initial fee arithmetic with transfer fees."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,struct,sys,itertools
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_trade_v2_differential as h
sp=importlib.util.spec_from_file_location('direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m)
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for cap,whitelist in itertools.product([((1<<64)-1)//2,((1<<64)-1)//2+1],[False,True]):
  def override(vm,metas):
   h.rekey_pool(h.quote,True)(vm,metas);h.custom_fee_table([(0,(20000,0,0))])(vm,metas)
   h.mutate(h.CONFIG_KEY,353,bytes(h.PAYER.pubkey())if whitelist else bytes(32))(vm,metas)
   h.mutate(metas[0].pubkey,261,bytes(8))(vm,metas);h.trade_transferfee(h.quote,10000,cap)(vm,metas)
  kw=dict(name='buy_exact_quote_in_v2',amount=(1<<64)-1,limit=1,overrides=override)
  x=h.trade(**kw);y=h.trade(candidate=a.candidate,**kw);cx,cy=m.clean(x),m.clean(y)
  rows.append({'transfer_cap':cap,'whitelist':whitelist,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 r={'case_count':len(rows),'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(r,separators=(',',':'))+'\n');print(json.dumps({'cases':len(rows),'observations':[{'cap':x['transfer_cap'],'whitelist':x['whitelist'],'original_error':x['original']['error'],'candidate_error':x['candidate']['error'],'differences':x['differences']}for x in rows]},indent=2))
if __name__=='__main__':main()
