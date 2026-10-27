"""Observe v2 whitelist bypass ordering against fee-selection failures."""
import argparse,hashlib,json,struct,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'));sys.path.insert(0,str(Path(__file__).resolve().parent))
import pump_amm_trade_v2_differential as h
from v2_whitelist_probe import clean

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for name in ['buy_v2','buy_exact_quote_in_v2','sell_v2']:
  for white in [False,True]:
   for kind in ['default','short-valid','empty-tiers','huge-lp']:
    def override(vm,m):
     h.rekey_pool(h.quote,True)(vm,m);h.mutate(h.CONFIG_KEY,353,bytes(h.PAYER.pubkey()if white else h.Pubkey.default()))(vm,m)
     old=vm.vm.get_account(h.feeconfig)
     if kind=='short-valid':raw=old.data[:41]+struct.pack('<QQQIIQQQ',25,5,10,0,0,0,0,0);vm.vm.set_account(h.feeconfig,h.Account(old.lamports,raw,old.owner))
     elif kind=='empty-tiers':h.custom_fee_table([])(vm,m)
     elif kind=='huge-lp':h.custom_fee_table([(0,(2**64-1,0,0))])(vm,m)
    kw={'name':name,'amount':10**7 if name=='buy_exact_quote_in_v2'else 10**10,'limit':10**12 if name=='buy_v2'else 1,'overrides':override}
    x=h.trade(**kw);y=h.trade(candidate=a.candidate,**kw);cx,cy=clean(x),clean(y);rows.append({'instruction':name,'whitelisted':white,'fee_case':kind,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 a.output.write_text(json.dumps({'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows},separators=(',',':'))+'\n');print(json.dumps({'cases':len(rows),'mismatches':sum(bool(c['differences'])for c in rows)}))
if __name__=='__main__':main()
