"""Verify complete original Pool reader windows and their actual direct callees."""
from pathlib import Path
import argparse,hashlib,json,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
SPECS=[(203,0x65330,2656),(235,0x65d90,2904),(236,0x668e8,3056),(237,0x674d8,3136),(253,0x68118,3272),(262,0x68de0,3448),(263,0x69b58,3528),(279,0x6a920,3680)]
def verify(candidate,symbols):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols);rows=[]
 for payload,at,size in SPECS:
  f=next(f for f in s.funcs if f'read_pool_{payload}17' in f['name']);start=f['start'];assert f['size']==size
  assert o.normalized[at:at+size]==c.normalized[start:start+size] and o.pattern(at,size)==c.pattern(start,size)
  callees=[]
  for site,target in o.calls.items():
   if not at<=site<at+size:continue
   ct=c.calls[start+site-at];end=next(x for x in o.entries if x>target);n=end-target
   matches=[f for f in s.funcs if f['start']==ct and f['size']==n]
   assert matches,(hex(site),hex(target),hex(ct),n)
   assert o.normalized[target:end]==c.normalized[ct:ct+n] and o.pattern(target,n)==c.pattern(ct,n),(hex(site),hex(target),hex(ct))
   callees.append({'offset':site-at,'original':target,'candidate':ct,'bytes':n})
  rows.append({'payload_bytes':payload,'original':at,'candidate':f,'normalized_sha256':hashlib.sha256(o.normalized[at:at+size]).hexdigest(),'direct_callees':callees})
 return {'candidate_sha256':hashlib.sha256(c.b).hexdigest(),'original_sha256':hashlib.sha256(o.b).hexdigest(),'readers':rows,'scope':'All8 complete Pool reader windows and actual direct callee bodies match under the retained normalization. Referenced data/deeper closure remain unproved.'}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--symbols',type=Path,required=True);a=p.parse_args();print(json.dumps(verify(a.candidate,a.symbols),indent=2))
