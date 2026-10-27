"""Verify all five original GlobalConfig layout functions and their direct calls."""
from pathlib import Path
import argparse,hashlib,json,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
SPECS=[('GlobalConfig$u20$as$u20$anchor_lang..AccountDeserialize$GT$15try_deserialize17',0x5e778,512),('GlobalConfig$u20$as$u20$anchor_lang..AccountDeserialize$GT$25try_deserialize_unchecked17',0x5e978,384),('read_global_config_89917',0x5eaf8,3336),('read_global_config_93217',0x5f800,3736),('read_global_config_94117',0x60698,3992)]
def verify(candidate,symbols):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols);rows=[]
 for name,at,size in SPECS:
  f=next(f for f in s.funcs if name in f['name']);start=f['start'];assert f['size']==size
  assert o.normalized[at:at+size]==c.normalized[start:start+size]and o.pattern(at,size)==c.pattern(start,size)
  calls=[]
  for site,target in o.calls.items():
   if not at<=site<at+size:continue
   ct=c.calls[start+site-at];end=next(x for x in o.entries if x>target);n=end-target
   assert any(f['start']==ct and f['size']==n for f in s.funcs),(hex(site),hex(target),hex(ct))
   assert o.normalized[target:end]==c.normalized[ct:ct+n]and o.pattern(target,n)==c.pattern(ct,n),(hex(site),hex(target),hex(ct))
   calls.append({'offset':site-at,'original':target,'candidate':ct,'bytes':n})
  rows.append({'original':at,'candidate':f,'normalized_sha256':hashlib.sha256(o.normalized[at:at+size]).hexdigest(),'direct_callees':calls})
 return {'candidate_sha256':hashlib.sha256(c.b).hexdigest(),'original_sha256':hashlib.sha256(o.b).hexdigest(),'functions':rows,'scope':'Five complete GlobalConfig functions and all their actual direct callee bodies match under the retained normalization. Referenced data/deeper closure remain unproved.'}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--symbols',type=Path,required=True);a=p.parse_args();print(json.dumps(verify(a.candidate,a.symbols),indent=2))
