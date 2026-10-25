#!/usr/bin/env python3
"""Saved-byte whitelist and mode analysis. No VM or source-hypothesis execution."""
from pathlib import Path
import importlib.util,hashlib,json,struct,sys
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('elf_primitives',P/'analyze_elf.py');a=importlib.util.module_from_spec(s);s.loader.exec_module(a)
H=lambda b:hashlib.sha256(b).hexdigest()
ROOTS=[0xa23f0,0xa08f8,0x7890,0xa1bd8,0x5a28,0x15dc90,0x19bd08,0x1ab8e8,0x1b3678,0x7fde8]
SLICES={'settlement-entry':(0x83c00,0x83cf0),'base-cpi-roles':(0x83d58,0x83ef8),'whitelist-predicate':(0x83ef8,0x84070),'whitelist-caller':(0x84468,0x845c0),'fee-supply-input':(0x7fff8,0x80038)}
def compute():
 e=a.Elf((P/'prior/b6/evidence/original.so').read_bytes());c=a.Elf((P/'prior/b5/inputs/current/unstripped.so').read_bytes())
 text=e.by_name['.text'];start=text['address'];end=start+text['size'];entries={start};pc=start
 while pc<end:
  op,r,o,i=struct.unpack('<BBhi',e.at(pc,8))
  if op==0x85 and r==16 and pc not in e.relocations:
   t=pc+8+8*i
   if start<=t<end:entries.add(t)
  pc+=16 if op==24 else 8
 assert int.from_bytes(e.at(1686888+4,4),'little')==0x1ab8e8 and e.relocations[1686888]['type']==8
 entries.add(0x1ab8e8) # Actual relocated formatter function pointer in 0x19bd08.
 ss=sorted(entries);bounds=dict(zip(ss,ss[1:]+[end]))
 # The pointer-only formatter is a branch-free 48-byte leaf ending at exit.
 # The next direct-call entry lies later and would incorrectly include neighbours.
 assert e.at(0x1ab910,8)==bytes.fromhex('9500000000000000')
 bounds[0x1ab8e8]=0x1ab918
 fs={k:e.function(k,bounds[k]-k,[])for k in ROOTS}
 targets={x['target']for f in fs.values()for x in f['direct_calls']}
 for k in sorted(targets):
  if k not in fs:fs[k]=e.function(k,bounds[k]-k,[])
 edges=[{'caller':k,**x,'body_included':x['target']in fs,'next_entry':bounds.get(x['target'])}for k,f in sorted(fs.items())for x in f['direct_calls']]
 slices={n:e.function(a,b-a,[])for n,(a,b)in SLICES.items()}
 def ins(pc):return {'pc':pc,'hex':e.at(pc,8).hex()}
 def branch(pc,target):
  op,r,o,i=struct.unpack('<BBhi',e.at(pc,8));assert op&7 in (5,6)and op not in (0x85,0x95,0x8d)and pc+8+o*8==target
  return {'pc':pc,'encoded_offset':o,'target':target,'hex':e.at(pc,8).hex()}
 def call(pc,target):
  op,r,o,i=struct.unpack('<BBhi',e.at(pc,8));assert op==0x85 and r==16 and pc not in e.relocations and pc+8+i*8==target
  return {'pc':pc,'encoded_displacement':i,'target':target,'hex':e.at(pc,8).hex()}
 branches=[branch(pc,t)for pc,t in [(0x83fa0,0x84468),(0x84588,0x83fa8),(0xa2408,0xa2558),(0xa2420,0xa2558),(0xa2430,0xa2528),(0xa2440,0xa2528),(0xa2450,0xa2528),(0xa24f8,0xa2570),(0xa2500,0xa2558),(0xa2518,0xa2558),(0xa2570,0xa2558),(0xa2588,0xa2558),(0xa2660,0xa26b0),(0xa2668,0xa2678),(0xa2778,0xa27c8),(0xa2788,0xa2798),(0xa27d0,0xa27e0)]]
 calls=[call(pc,t)for pc,t in [(0x84490,0x7890),(0x844d0,0x7890),(0x84578,0xa23f0),(0xa2540,0x15dc90),(0xa2690,0x15dc90),(0xa26c8,0x15dc90),(0xa27a8,0x19bd08),(0xa27f0,0x19bd08),(0xa25e8,0x1b55c8),(0xa2708,0x1b4088),(0xa0978,0x1b55c8),(0xa09b0,0x1b4088),(0x80028,0xa08f8)]]
 literals=[]
 for role,addr,n in [('integer_conversion_message',0x1bc94b,47),('overflow_name',0x1b645f,8),('invalid_numeric_error_discriminant',0x1b5f60,4)]:
  b=e.at(addr,n);literals.append({'role':role,'address':addr,'bytes':n,'hex':b.hex(),'sha256':H(b),'text':b.decode()if role!='invalid_numeric_error_discriminant'else None})
 assert int.from_bytes(e.at(0x1b5f60,4),'little')==4102
 assert struct.unpack('<i',e.at(1687160+4,4))[0]==4102
 # Candidate symbol attribution, limited to full normalized body correspondence.
 comparisons=[]
 for k in [0xa23f0,0xa08f8,0x7890,0x15dc90,0x19bd08,0x1ab8e8]:
  f=fs[k];matches=[]
  for sym in c.symbols:
   if sym['type']==2 and sym['size']==f['bytes']:
    g=c.function(sym['start'],sym['size'],[sym['name']])
    if g['normalized_sha256']==f['normalized_sha256']:matches.append({'symbol':sym['name'],'window':g,'raw_equal':g['raw_sha256']==f['raw_sha256']})
  comparisons.append({'original_start':k,'matches':matches,'scope':'Whole normalized body only, not transitive equivalence or historical source identity.'})
 # Existing sealed metadata selector: static branch-constant propagation for ordinal24 only.
 sys.path.insert(0,str(P/'prior/b5'))
 sp=importlib.util.spec_from_file_location('old_decoder',P/'prior/b5/decoder.py');old=importlib.util.module_from_spec(sp);sp.loader.exec_module(old)
 named=old.format_selector(old.Elf(P/'prior/b6/evidence/original.so'),1436840,24,'debug');assert named['text']=='Overflow'
 fields=[]
 for field,offset,pc in [('virtual_token_reserves',64,23368),('virtual_quote_reserves',72,23440),('real_token_reserves',80,23512),('real_quote_reserves',88,23584),('token_total_supply',96,23656)]:
  op,r,o,i=struct.unpack('<BBhi',e.at(pc,8));assert op==0x79 and r>>4==7 and o==offset+8
  fields.append({'field':field,'decoded_offset':offset,'wrapper_offset':offset+8,'serializer_load':ins(pc)})
 return {'function-ledger.json':{'original_sha256':H(e.b),'candidate_sha256':H((P/'prior/b5/inputs/current/candidate.so').read_bytes()),'symbol_artifact_sha256':H(c.b),'roots':ROOTS,'windows':[fs[k]for k in sorted(fs)],'edges':edges,'outside_frontier':sorted({x['target']for x in edges if not x['body_included']}),'slices':slices,'limits':['Entry boundaries are inferred, not original symbols.','Relocation-first call classification; data prefixes bounded to64 bytes, not full object proof.','Token reader bodies retained as runtime premises, no extension implementation supplied.']},'mode-contract.json':{'branches':branches,'calls':calls,'fields':fields,'literals':literals,'candidate_body_comparisons':comparisons,'overflow_error_name':named,'narrowing_code_store':ins(1687160),'no_origin_enum_conversion_store':ins(1433136),'quote_cap_stores':[ins(0xa2838),ins(0xa2870)],'global_whitelist_runtime_offset':648,'global_offset_instruction':ins(0x83f78),'native_quote_threshold':10000000,'nonnative_quote_threshold':1000000,'circulating_threshold':1000000000000,'native_quote_cap':2000000000000,'nonnative_quote_cap':160000000000,'error_contract':['checked2*supply,subvault,subuser,checkedu128product,andcheckeddivision map origin-free Pump Overflow6024','u128-to-u64 conversion beforecap maps origin-free Anchor InvalidNumericConversion4102 with TryFromIntError Display','no compared values on either path'],'source_scope':'uncompiled, unintegrated; no new acceptance or preserved runtime claims'}}
if __name__=='__main__':
 for n,v in compute().items():(P/n).write_text(json.dumps(v,sort_keys=True,indent=2)+'\n')
