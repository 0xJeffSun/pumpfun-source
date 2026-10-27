#!/usr/bin/env python3
"""Verify concrete AMM String-writer vtable and EOF descriptor data boundaries."""
from pathlib import Path
import collections,hashlib,json,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
BASE=ROOT/'repro/pump_amm/diagnostic-parity-20261027/results'
CLOSURE=ROOT/'repro/pump_amm/call-closure-audit-20261027/results.json'

def immediate(e,p):return struct.unpack_from('<I',e.b,p+4)[0]|(struct.unpack_from('<I',e.b,p+12)[0]<<32)
def word(e,p):return struct.unpack_from('<Q',e.b,p)[0]
def relocated_pointer(e,p):
 assert e.relocations[p]=={'type':8,'symbol':''}
 raw=word(e,p);assert raw&0xffffffff==0
 return raw>>32

def audit():
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(BASE/'build/candidate.so');s=Elf(BASE/'build/unstripped.so');closure=json.loads(CLOSURE.read_text());assert closure['candidate_sha256']==hashlib.sha256(c.b).hexdigest()
 pairs={(p['original'],p['candidate']):p for p in closure['pairs']};names=collections.defaultdict(list)
 for f in s.funcs:names[f['start']].append(f['name'])
 def refs(original_pointer):
  out=[]
  for (a,b),p in pairs.items():
   for at,rel in o.relocations.items():
    if a<=at<a+p['bytes'] and rel['type']==8 and o.b[at]==0x18 and immediate(o,at)==original_pointer:
     ca=b+at-a;assert c.b[ca]==0x18 and c.relocations[ca]==rel
     out.append({'original_window':a,'candidate_window':b,'offset':at-a,'candidate_pointer':immediate(c,ca),'candidate_names':p['candidate_names']})
  return out
 vrefs=refs(0x1221e0);tables=[]
 def in_data(e,p,n):
  section=e.secs['.data.rel.ro'];return section[4]<=p and p+n<=section[4]+section[5]
 assert in_data(o,0x1221e0,48) and word(o,0x1221e8)==24 and word(o,0x1221f0)==8
 for at in sorted({r['candidate_pointer']for r in vrefs}):
  assert in_data(c,at,48)
  scalar=[];functions=[]
  for offset in [8,16]:
   assert 0x1221e0+offset not in o.relocations and at+offset not in c.relocations
   scalar.append({'offset':offset,'original':word(o,0x1221e0+offset),'candidate':word(c,at+offset),'equal':word(o,0x1221e0+offset)==word(c,at+offset)})
  for offset in [0,24,32,40]:
   ot=relocated_pointer(o,0x1221e0+offset);ct=relocated_pointer(c,at+offset);pair=pairs.get((ot,ct))
   functions.append({'offset':offset,'original_target':ot,'candidate_target':ct,'candidate_names':names[ct],'full_body_pair_match':pair is not None,'in_internal_direct_closure':bool(pair and pair['in_internal_direct_closure'])})
  tables.append({'original_pointer':0x1221e0,'candidate_pointer':at,'bytes':48,'scalar_fields':scalar,'function_fields':functions,'all_contents_and_direct_targets_verified':all(x['equal']for x in scalar)and all(x['in_internal_direct_closure']for x in functions)})
 verified={t['candidate_pointer']for t in tables if t['all_contents_and_direct_targets_verified']}
 # Verify the explicit std::fmt::Write::write_fmt wrapper instantiation:
 wrapper=next(p for p in closure['pairs']if p['original']==0x8998 and p['candidate']==0x9570)
 assert immediate(o,0x89a0)==0x1221e0 and immediate(c,0x9578)in verified
 assert o.b[0x8998:0x89a0]==c.b[0x9570:0x9578]==bytes.fromhex('bf23000000000000')
 ot=o.calls[0x89b0];ct=c.calls[0x9588];fmt=pairs[(ot,ct)];assert fmt['bytes']==1056 and fmt['in_internal_direct_closure']
 assert o.b[ot:ot+8]==c.b[ct:ct+8]==bytes.fromhex('7b2ae8ff00000000')
 writer_calls=[]
 for offset in fmt['indirect_call_offsets']:
  oa=ot+offset;ca=ct+offset
  if o.b[oa:oa+8]!=bytes.fromhex('8d00000004000000'):continue
  # A bounded local def-use chain: r4 = *(r1+24), r1 = *(r10-24).
  loads=[a for a in range(oa-48,oa,8)if o.b[a:a+8]==bytes.fromhex('7914180000000000')]
  assert len(loads)==1;load=loads[0]
  assert o.b[load-8:load]==bytes.fromhex('79a1e8ff00000000')
  assert c.b[ca-(oa-load)-8:ca-(oa-load)]==bytes.fromhex('79a1e8ff00000000')
  assert c.b[ca-(oa-load):ca-(oa-load)+8]==bytes.fromhex('7914180000000000')
  t=next(t for t in tables if t['candidate_pointer']==immediate(c,0x9578));method=next(x for x in t['function_fields']if x['offset']==24)
  writer_calls.append({'offset':offset,'writer_vtable_slot':24,'original_target_if_pinned_vtable':method['original_target'],'candidate_target_if_pinned_vtable':method['candidate_target']})
 assert [r['offset']for r in writer_calls]==[184,584,1008]
 eofrefs=refs(0x1221c8);descriptors=[]
 for at in sorted({r['candidate_pointer']for r in eofrefs}):
  assert in_data(o,0x1221c8,24) and in_data(c,at,24)
  op=relocated_pointer(o,0x1221c8);cp=relocated_pointer(c,at);n=word(o,0x1221d0);cn=word(c,at+8);kind=word(o,0x1221d8);ck=word(c,at+16)
  assert n==cn==27 and kind==ck==37
  assert o.b[op:op+n]==c.b[cp:cp+cn]==b'failed to fill whole buffer'
  descriptors.append({'original_pointer':0x1221c8,'candidate_pointer':at,'bytes':24,'message_length':27,'numeric_kind_field':37,'message_sha256':hashlib.sha256(o.b[op:op+n]).hexdigest()})
 invalid={(r['original_window'],r['candidate_window'])for r in vrefs if r['candidate_pointer']not in verified}
 constrained={key for key,p in pairs.items()if p['in_internal_direct_closure'] and key not in invalid}
 while True:
  removed={key for key in constrained if any((e['original_target'],e['candidate_target'])not in constrained for e in pairs[key]['edges'])}
  if not removed:break
  constrained-=removed
 return {'vtable_constrained_direct_closure_pairs':len(constrained),'vtable_constrained_direct_closure_windows':len({x for x,y in constrained}),'original_sha256':hashlib.sha256(o.b).hexdigest(),'candidate_sha256':hashlib.sha256(c.b).hexdigest(),'vtable_references':vrefs,'vtables':tables,'verified_vtable_reference_count':sum(r['candidate_pointer']in verified for r in vrefs),'unresolved_vtable_reference_count':sum(r['candidate_pointer']not in verified for r in vrefs),'writer_wrapper':{'original':0x8998,'candidate':0x9570,'fmt_write_original':ot,'fmt_write_candidate':ct,'conditional_writer_method_calls':writer_calls,'unresolved_format_argument_call_offsets':[x for x in fmt['indirect_call_offsets']if x not in [r['offset']for r in writer_calls]]},'eof_descriptor_references':eofrefs,'eof_descriptors':descriptors,'scope':'Concrete 48-byte formatting-vtable fields and 24-byte EOF descriptors are compared, including actual function targets and complete normalized callee bodies/direct closure. Writer-call resolutions are conditional on this pinned vtable instantiation. Other vtables, user formatting callbacks, escaped Formatter mutation, allocation semantics and global indirect-call closure remain unproved.'}
if __name__=='__main__':
 p=Path(__file__).resolve().parent;out=p/'results.json';assert not out.exists();r=audit();out.write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'verified_vtable_references':r['verified_vtable_reference_count'],'unresolved_vtable_references':r['unresolved_vtable_reference_count'],'eof_descriptors':len(r['eof_descriptors']),'eof_refs':len(r['eof_descriptor_references']),'conditional_writer_calls':len(r['writer_wrapper']['conditional_writer_method_calls'])}))
