"""Recover serialization/PDA ordering from complete functions and branch edges."""
from pathlib import Path
import hashlib,json,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf

def reaches(e,lo,hi,start,target,excluded=()):
 seen=set();todo=[start]
 while todo:
  at=todo.pop()
  if at==target:return True
  if at in seen or at in excluded or not lo<=at<hi:continue
  seen.add(at);op=e.b[at];off=struct.unpack_from('<h',e.b,at+2)[0]
  if op==0x95:continue
  if op==0x05:todo.append(at+8+off*8)
  elif op in [0x85,0x8d]:todo.append(at+8)
  elif op&7 in [5,6]:todo.extend([at+8,at+8+off*8])
  else:todo.append(at+(16 if op==0x18 else 8))
 return False

def audit(candidate,symbols):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols)
 f=next(f for f in s.funcs if f['name'].startswith('_ZN18pump_amm_recovered10legacy_buy7execute17'));lo=f['start'];hi=lo+f['size'];calls={a:t for a,t in c.calls.items()if lo<=a<hi}
 matches=[f for f in s.funcs if f['size']==1288 and c.normalized[f['start']:f['start']+1288]==o.normalized[0x48b8:0x4dc0] and c.pattern(f['start'],1288)==o.pattern(0x48b8,1288)]
 exits=[(a,t)for a,t in calls.items()if t in {f['start']for f in matches}];assert len(exits)==1;exit_at,serializer=exits[0]
 target=next(f for f in s.funcs if 'get_buyback_accounts'in f['name'])['start'];buyers=[a for a,t in calls.items()if t==target];assert len(buyers)==1;buyer=buyers[0]
 pda_targets={f['start']for f in s.funcs if 'find_program_address'in f['name']}
 pda=[a for a,t in calls.items()if t in pda_targets and reaches(c,lo,hi,exit_at+8,buyer) and not reaches(c,lo,hi,exit_at+8,buyer,[a])];assert len(pda)==1;pda=pda[0]
 def immediate(e,a):return struct.unpack_from('<I',e.b,a+4)[0]+(struct.unpack_from('<I',e.b,a+12)[0]<<32)
 pool=[immediate(c,a)for a in range(max(lo,pda-512),pda,8)if c.b[a]==0x18 and c.b[immediate(c,a):immediate(c,a)+7]==b'pool-v2'];assert len(pool)==1
 disc=hashlib.sha256(b'account:UserVolumeAccumulator').digest()[:8];assert o.b[0x11c5fe:0x11c606]==disc
 offsets=[i for i in range(0,1288,8)if o.b[0x48b8+i]==0x18 and immediate(o,0x48b8+i)==0x11c5fe];assert len(offsets)==1;assert c.b[immediate(c,serializer+offsets[0]):immediate(c,serializer+offsets[0])+8]==disc
 names={f['start']:f['name']for f in s.funcs};drops=[a for a,t in calls.items()if exit_at-160<=a<exit_at and 'drop_in_place'in names.get(t,'')and 'error..Error'in names[t]];assert len(drops)==1
 stores=[a for a in range(drops[0]+8,exit_at,8)if c.b[a]==0x7b and struct.unpack_from('<h',c.b,a+2)[0]==0x48];assert len(stores)==1
 return {'handler':f,'serialization_call':exit_at,'serializer':serializer,'original_serialization_call':0x36f38,'discriminator_hex':disc.hex(),'error_drop':drops[0],'cashback_store':stores[0],'pool_pda_call':pda,'buyback_reader_call':buyer,'pool_seed_address':pool[0],'scope':'Static complete serializer identity and conservative branch reachability prove the serializer is present before the subsequent PDA-check path; intermediate memory was not observed at runtime.'}
if __name__=='__main__':
 p=Path(__file__).resolve().parent;print(json.dumps(audit(p/'results/build/candidate.so',p/'results/build/unstripped.so'),indent=2))
