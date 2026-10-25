#!/usr/bin/env python3
"""Read-only BuyV3 B4 admission byte/call/data frontier. No runtime simulation."""
from pathlib import Path
import importlib.util,json,struct,hashlib
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('elf_primitives',P/'analyze_elf.py');a=importlib.util.module_from_spec(s);s.loader.exec_module(a)
H=lambda b:hashlib.sha256(b).hexdigest()
def compute():
 e=a.Elf((P/'prior/b4/evidence/original.so').read_bytes());text=e.by_name['.text'];beg=text['address'];end=beg+text['size'];starts={beg};pc=beg
 while pc<end:
  op,reg,off,imm=struct.unpack('<BBhi',e.at(pc,8));rel=e.relocations.get(pc)
  if op==0x85 and reg==0x10 and not rel:
   target=pc+8+8*imm
   if beg<=target<end:starts.add(target)
  pc+=16 if op==0x18 else 8
 ss=sorted(starts);bounds=dict(zip(ss,ss[1:]+[end]));roots=[0x7f010,0x7e490,0x98438,0x6e78,0xf6c0,0x1991e0];fs={}
 for start in roots:
  fs[start]=e.function(start,bounds[start]-start,[])
 frontier={x['target'] for f in fs.values() for x in f['direct_calls']}
 for start in sorted(frontier):
  if start not in fs:fs[start]=e.function(start,bounds[start]-start,[])
 # Complete selected bodies plus all immediate direct callees. Calls beyond this
 # set are an explicit boundary, not proof of absent effects.
 edges=[]
 for start,f in sorted(fs.items()):
  for x in f['direct_calls']:edges.append({'caller':start,**x,'target_body_included':x['target']in fs,'target_boundary':bounds.get(x['target'])})
 def ins(pc):return {'pc':pc,'hex':e.at(pc,8).hex()}
 def call(pc,target):
  op,r,off,imm=struct.unpack('<BBhi',e.at(pc,8));assert op==0x85 and r==16 and pc not in e.relocations and pc+8+8*imm==target
  return {'pc':pc,'encoded_signed_displacement':imm,'target':target,'hex':e.at(pc,8).hex(),'relocation':None}
 anchors=[call(x,y) for x,y in [(0x7f908,0x7e490),(0x7e680,0x98438),(0x7ed78,0x98438),(0x7ee18,0x1991e0),(0x7ef98,0x1991e0),(0x7590,0xf6c0)]]
 auth=fs[0x98438];memcmp=[x for x in auth['direct_calls'] if x['target']==0x1b3678];assert len(memcmp)==9
 assert e.relocations[0x1b3690]['type']==10 and e.relocations[0x1b3690]['symbol']=='sol_memcmp_'
 # Reverify raw code branch/error constants rather than importing prose claims.
 assert struct.unpack('<i',e.at(624896+4,4))[0]==6062
 assert struct.unpack('<i',e.at(625288+4,4))[0]==6057
 assert struct.unpack('<h',e.at(623784+2,2))[0]*8+623792==624504
 # Global wire identity from captured IDL and serializer order, not declaration layout.
 idl=json.loads((P/'inputs/idl.json').read_text());g=next(t for t in idl['types']if t['name']=='Global')['type']['fields'];offset=8;wire=[]
 for f in g:
  t=f['type'];size={'bool':1,'u8':1,'u64':8,'pubkey':32}.get(t)if isinstance(t,str)else(32*t['array'][1] if t.get('array',[None])[0]=='pubkey'else None);assert size is not None
  wire.append({'field':f['name'],'offset':offset,'bytes':size});offset+=size
 bb=next(x for x in wire if x['field']=='buyback_fee_recipients');assert bb=={'field':'buyback_fee_recipients','offset':741,'bytes':256}
 literals=[]
 for name,address,n in [('global_error_origin',0x1b72c5,24),('admission_error_origin',0x1b723b,29)]:
  b=e.at(address,n);literals.append({'role':name,'address':address,'bytes':n,'hex':b.hex(),'text':b.decode(),'sha256':H(b)})
 zero_stores=[ins(pc)for pc in [623696,623704,623712,623720,624992,625000,625008,625016]]
 return {'function-ledger.json':{'original_sha256':H(e.b),'roots':roots,'windows':[{'inferred_boundary':'next unrelocated signed direct-call target',**fs[x]} for x in sorted(fs)],'edges':edges,'outside_frontier':sorted({x['target']for x in edges if not x['target_body_included']}),'limits':'All immediate target bodies included. Beyond-frontier calls, dynamic calls, data/vtable extents and host execution remain unproved. Token extension branches are opaque.'},'admission-contract.json':{'anchors':anchors,'zero_guard_compare':memcmp[0],'eight_membership_compares':memcmp[1:],'membership_array_offsets':list(range(0,256,32)),'zero_error':{'code':6062,'code_store':ins(624896),'line':1879,'key_order':['supplied key','zero key'],'with_pubkeys_call':call(625120,0x19c1b8)},'not_member_error':{'code':6057,'code_store':ins(625288),'line':1884,'compared_keys':None},'zero_storage':zero_stores,'memcmp_import':{'pc':0x1b3690,'relocation':e.relocations[0x1b3690]},'origin_literals':literals,'global_wire':bb,'global_runtime_array':{'caller_context_global_pointer_offset':0,'wrapper_array_offset':8,'serializer_array_pointer_instructions':[ins(0x7570),ins(0x7578)],'note':'Runtime wrapper +8 is not serialized offset741; typed proposal accesses the named array field.'},'token_order':['program owner6010','fallible shared borrow','decode','mint6004','copy token authority','release borrow','nonzero6062','Global membership6057','ATA derive','ATA compare2006, deriving again for compared-key diagnostic only on failure'],'native_order':['account key nonzero6062','Global membership6057'],'ordinary_fixed_layout_bytes':165,'extension_behavior':'opaque, Recovery::Unresolved; not rejection or fallback','new_runtime_cases':0},'global-wire-from-idl.json':wire}
if __name__=='__main__':
 for n,v in compute().items():(P/n).write_text(json.dumps(v,indent=2,sort_keys=True)+'\n')
