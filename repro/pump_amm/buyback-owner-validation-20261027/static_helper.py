"""Compare the recovered buyback validator with its complete original body."""
from pathlib import Path
import hashlib,json,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
def compare(candidate,symbols):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols)
 f=next(f for f in s.funcs if 'validate_buyback_recipient' in f['name']);start=f['start'];size=f['size'];assert size==2320
 differences=[{'offset':i,'original':o.normalized[0x62e68+i:0x62e70+i].hex(),'candidate':c.normalized[start+i:start+i+8].hex()}for i in range(0,size,8)if o.normalized[0x62e68+i:0x62e70+i]!=c.normalized[start+i:start+i+8]]
 assert [x['offset']for x in differences]==[1320,1328,1816,1824,2232,2240]
 assert o.pattern(0x62e68,size)==c.pattern(start,size)
 return {'original':0x62e68,'candidate':f,'different_instructions':differences,'scope':'Complete equal-size 2320-byte windows; remaining differences are three source line values and three source path lengths. Not normalized byte identity.'}
if __name__=='__main__':
 p=Path(__file__).resolve().parent;print(json.dumps(compare(p/'results/build/candidate.so',p/'results/build/unstripped.so'),indent=2))
