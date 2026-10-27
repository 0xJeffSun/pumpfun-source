"""Probe original v2 exact-buy fee ordering and denominator boundaries."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,struct,sys,itertools
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_legacy_buy_differential as h
sp=importlib.util.spec_from_file_location('direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m)
def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for reserves,fee_state,whitelist in itertools.product([(100,1000,100),(2,2**64-1,1),(2**64-1,2**64-1,2**64-2),(2,1,1)],['valid','empty','short','extreme'],[False,True]):
  base_reserve,quote_reserve,amount=reserves
  def override(vm,metas):
   h.custom_fee_table([] if fee_state=='empty' else [(0,((2**64-1,0,0)if fee_state=='extreme' else(20,5,30)))])(vm,metas)
   h.mutate(h.CONFIG_KEY,353,bytes(h.PAYER.pubkey())if whitelist else bytes(32))(vm,metas)
   h.mutate(h.vaultbase,64,struct.pack('<Q',base_reserve))(vm,metas);h.mutate(h.vaultquote,64,struct.pack('<Q',quote_reserve))(vm,metas)
   h.mutate(metas[0].pubkey,245,bytes(16))(vm,metas);h.mutate(metas[0].pubkey,271,bytes(16))(vm,metas)
   if fee_state=='short':h.mutate(h.feeconfig,0,b'',2511)(vm,metas)
  kw=dict(name='buy',amount=amount,limit=2**64-1,overrides=override)
  x=h.legacy_buy(**kw);y=h.legacy_buy(candidate=a.candidate,**kw);cx,cy=m.clean(x),m.clean(y)
  rows.append({'base_reserve':base_reserve,'quote_reserve':quote_reserve,'amount':amount,'fee_state':fee_state,'whitelist':whitelist,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 r={'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'case_count':len(rows),'cases':rows};a.output.write_text(json.dumps(r,separators=(',',':'))+'\n')
 bad=[{k:v for k,v in r.items()if k not in ['original','candidate']}|{'original_error':r['original']['error'],'candidate_error':r['candidate']['error']}for r in rows if r['differences']]
 print(json.dumps({'cases':len(rows),'mismatches':len(bad),'examples':bad},indent=2))
if __name__=='__main__':main()
