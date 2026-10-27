"""Single-AMM-hop fee config size and creator-guard observations."""
import argparse,hashlib,json,re,struct,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import pump_amm_multi_hop_differential as h
import pump_amm_trade_v2_differential as v2

def clean(v):
 if isinstance(v,dict):return{k:clean(x)for k,x in v.items()}
 if isinstance(v,list):return[re.sub(r'(?<=thrown in )[^ ]+:[0-9]+','<source>',re.sub(r'(?<=panicked at )[^ ]+:[0-9]+:[0-9]+','<source>',x))if isinstance(x,str)else clean(x)for x in v if not isinstance(x,str)or not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',x)]
 return v

def main():
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert not a.output.exists();rows=[]
 for kind in ['native','stable','exotic']:
  quote=h.quote if kind=='native'else h.Pubkey.from_string('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')if kind=='stable'else h.Pubkey.from_bytes(bytes([90])*32)
  for sell in [False,True]:
   for length in [177,2511,2512,4072,4073,4096,4097]:
    for flag in [False,True]:
     for bps in [0,100]:
      def override(vm,m):
       shadow=[h.AccountMeta(h.PAYER.pubkey(),False,False)for _ in range(17)];shadow[0]=m[18];shadow[4]=m[17];shadow[14]=m[6];v2.rekey_pool(quote)(vm,shadow);m[18]=shadow[0];m[17]=shadow[4];m[6]=shadow[14]
       account=vm.vm.get_account(m[18].pubkey);data=bytearray(account.data);data[211:243]=bytes(h.PAYER.pubkey());data[261:269]=struct.pack('<Q',bps);vm.vm.set_account(m[18].pubkey,h.Account(account.lamports,bytes(data),account.owner))
       h.mutate(h.CONFIG_KEY,940,bytes([flag]))(vm,m)
       old=vm.vm.get_account(h.feeconfig);raw=old.data[:41]+struct.pack('<QQQI',25,5,10,1)+bytes(16)+struct.pack('<QQQ',30,10,20)+struct.pack('<I',1)+bytes(16)+struct.pack('<QQQ',40,20,30)+struct.pack('<QQQ',50,30,40)
       assert len(raw)==177;vm.vm.set_account(h.feeconfig,h.Account(old.lamports,bytes(raw).ljust(length,b'\0'),old.owner))
      x=h.run(amount=10**7,limit=1,sell=sell,overrides=override);y=h.run(candidate=a.candidate,amount=10**7,limit=1,sell=sell,overrides=override);cx,cy=clean(x),clean(y);rows.append({'quote':kind,'sell':sell,'length':length,'flag':flag,'bps':bps,'original':x,'candidate':y,'differences':[k for k in cx if cx[k]!=cy[k]]})
 result={'candidate_sha256':hashlib.sha256(a.candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()).hexdigest(),'probe_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':rows};a.output.write_text(json.dumps(result,separators=(',',':'))+'\n');print(json.dumps({'cases':len(rows),'mismatches':sum(bool(c['differences'])for c in rows)}))
if __name__=='__main__':main()
