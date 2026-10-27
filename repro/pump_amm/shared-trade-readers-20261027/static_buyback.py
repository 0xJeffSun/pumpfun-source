"""Compare complete remaining-account and recipient-validation helpers."""
from pathlib import Path
import sys,hashlib,json
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
def audit(candidate,symbols):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols);rows=[]
 specs=[('get_buyback_accounts',0x37150,1376,[656,664,1232,1240]),('validate_buyback_recipient',0x62e68,2320,[1320,1328,1816,1824,2232,2240])]
 for name,original,size,expected in specs:
  f=next(f for f in s.funcs if name in f['name']);start=f['start'];assert f['size']==size and o.pattern(original,size)==c.pattern(start,size)
  diff=[{'offset':i,'original':o.normalized[original+i:original+i+8].hex(),'candidate':c.normalized[start+i:start+i+8].hex()}for i in range(0,size,8)if o.normalized[original+i:original+i+8]!=c.normalized[start+i:start+i+8]]
  assert [x['offset']for x in diff]==expected
  rows.append({'original':original,'candidate':f,'differences':diff})
 get,validate=rows
 caller=[a for a,t in c.calls.items()if get['candidate']['start']<=a<get['candidate']['start']+1376 and t==validate['candidate']['start']];assert len(caller)==1
 assert o.calls[0x37150+(caller[0]-get['candidate']['start'])]==0x62e68
 return {'helpers':rows,'validation_call_offset':caller[0]-get['candidate']['start'],'scope':'Full helper windows and direct validation call structure match except declared source-line and source-path-length constants. No whole-window or complete data identity claim.'}
if __name__=='__main__':
 p=Path(__file__).resolve().parent;print(json.dumps(audit(p/'results/build/candidate.so',p/'results/build/unstripped.so'),indent=2))
