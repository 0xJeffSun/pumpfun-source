"""Probe original v2 exact-buy fee ordering and denominator boundaries."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,struct,sys,itertools
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_trade_v2_differential as h
sp=importlib.util.spec_from_file_location('direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m)
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name,amount_limit,fee_state,net_zero in itertools.product(['buy_v2','sell_v2','buy_exact_quote_in_v2'],[(0,0),(0,1),(1,0),(1,1),(10**7,1),(10**7,2**64-1)],['valid','empty','short','zero-base','accrued-overflow','buyback-owner','cashback'],[False,True]):
  amount,limit=amount_limit
  def override(vm,metas):
   h.rekey_pool(h.quote,True)(vm,metas);h.custom_fee_table([] if fee_state=='empty' else [(0,(20,5,30))])(vm,metas)
   h.mutate(h.CONFIG_KEY,353,bytes(32))(vm,metas)
   if fee_state=='short':h.mutate(h.feeconfig,0,b'',2511)(vm,metas)
   if fee_state=='zero-base':h.mutate(h.vaultbase,64,bytes(8))(vm,metas)
   if fee_state=='accrued-overflow':h.mutate(metas[0].pubkey,271,struct.pack('<QQ',2**64-1,1))(vm,metas)
   if fee_state=='buyback-owner':h.mutate(metas[14].pubkey,0,b'',owner=h.Pubkey.default())(vm,metas)
   if fee_state=='cashback':h.mutate(metas[0].pubkey,244,b'\x01')(vm,metas)
   if net_zero:h.trade_transferfee(h.quote,10000,2**64-1)(vm,metas)
  kw=dict(name=name,amount=amount,limit=limit,overrides=override)
  x=h.trade(**kw);y=h.trade(candidate=a.candidate,**kw);cx,cy=m.clean(x),m.clean(y)
  rows.append({'instruction':name,'amount':amount,'limit':limit,'fee_state':fee_state,'net_zero':net_zero,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 r={'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'case_count':len(rows),'cases':rows};a.output.write_text(json.dumps(r,separators=(',',':'))+'\n')
 bad=[{k:v for k,v in r.items()if k not in ['original','candidate']}|{'original_error':r['original']['error'],'candidate_error':r['candidate']['error']}for r in rows if r['differences']]
 print(json.dumps({'cases':len(rows),'mismatches':len(bad),'examples':bad[:30]},indent=2))
if __name__=='__main__':main()
