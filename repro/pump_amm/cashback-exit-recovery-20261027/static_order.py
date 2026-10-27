"""Verify the added serialization call, serializer identity and intervening PDA check."""
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
  seen.add(at);op=e.b[at];offset=struct.unpack_from('<h',e.b,at+2)[0]
  if op==0x95:continue
  if op==0x05:todo.append(at+8+offset*8)
  elif op in [0x85,0x8d]:todo.append(at+8)
  elif op&7 in [5,6]:todo.extend([at+8,at+8+offset*8])
  else:todo.append(at+(16 if op==0x18 else 8))
 return False

def audit(candidate,symbols):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols)
 handler=next(f for f in s.funcs if f['name'].startswith('_ZN18pump_amm_recovered10legacy_buy7execute17'));lo=handler['start'];hi=lo+handler['size']
 serializer=next(f for f in s.funcs if f['start']==c.calls[0x1bef8]);assert serializer['size']==1288
 assert o.calls[0x36f38]==0x48b8
 assert o.normalized[0x48b8:0x4dc0]==c.normalized[serializer['start']:serializer['start']+1288]
 assert o.pattern(0x48b8,1288)==c.pattern(serializer['start'],1288)
 discriminator=hashlib.sha256(b'account:UserVolumeAccumulator').digest()[:8]
 assert o.b[0x11c5fe:0x11c606]==discriminator
 literals=[]
 for offset in range(0,1288,8):
  at=0x48b8+offset
  if o.b[at]!=0x18:continue
  value=struct.unpack_from('<I',o.b,at+4)[0]+(struct.unpack_from('<I',o.b,at+12)[0]<<32)
  if value!=0x11c5fe:continue
  at=serializer['start']+offset;value=struct.unpack_from('<I',c.b,at+4)[0]+(struct.unpack_from('<I',c.b,at+12)[0]<<32)
  assert c.b[value:value+8]==discriminator;literals.append(value)
 assert len(literals)==1
 assert any(f['start']==c.calls[0x19718] and 'get_buyback_accounts'in f['name']for f in s.funcs)
 assert any(f['start']==c.calls[0x1a038] and 'find_program_address'in f['name']for f in s.funcs)
 assert c.b[0x11890e:0x118915]==b'pool-v2'
 assert reaches(c,lo,hi,0x1bef8+8,0x19718)
 assert not reaches(c,lo,hi,0x1bef8+8,0x19718,[0x1a038])
 assert any(f['start']==c.calls[0x1bea0] and 'drop_in_place'in f['name'] and 'error..Error'in f['name']for f in s.funcs)
 assert c.b[0x1beb8:0x1bec0]==bytes.fromhex('7b91480000000000')
 return {'handler':handler,'original_serialization_call':0x36f38,'serialization_call':0x1bef8,'serializer':serializer,'discriminator_hex':discriminator.hex(),'candidate_discriminator_address':literals[0],'error_drop_before_store':0x1bea0,'cashback_store':0x1beb8,'pool_pda_call':0x1a038,'remaining_buyback_call':0x19718,'pda_dominates_buyback_after_serialization':True,'scope':'Static instruction/call and conservative direct-branch graph evidence. The added serializer matches the original under retained normalization and writes the same account discriminator. Not a runtime observation of intermediate memory.'}
if __name__=='__main__':
 p=Path(__file__).resolve().parent;print(json.dumps(audit(p/'results/build/candidate.so',p/'results/build/unstripped.so'),indent=2))
