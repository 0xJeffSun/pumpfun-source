#!/usr/bin/env python3
"""Static only: complete selected bodies, actual call edges, bounded error data."""
from pathlib import Path
import hashlib,json,struct,bisect
from elf_reader import Elf
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def ins(e,a):
 op,r,off,imm=struct.unpack_from('<BBhi',e.b,a);d=dict(address=a,opcode=op,dst=r&15,src=r>>4,offset=off,immediate=imm)
 if op==24:d['wide_immediate']=struct.unpack_from('<I',e.b,a+4)[0]|struct.unpack_from('<I',e.b,a+12)[0]<<32
 if op&7 in (5,6) and op not in (133,141,149):d['branch_target']=a+8+off*8
 if a in e.calls:d['call_target']=e.calls[a]
 return d

def analyze():
 d=json.loads((P/'inputs/static-comparison.json').read_text());o=Elf(P/'inputs/original.so');c=Elf(P/'inputs/candidate.so');s=Elf(P/'inputs/symbols.so')
 assert sha(o.b)==d['original_sha256'] and sha(c.b)==d['candidate_sha256'] and sha(s.b)==d['symbols_sha256']
 assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]
 ob=dict(zip(o.entries,o.entries[1:]+[o.hi]));cb={f['start']:f['size'] for f in s.funcs}
 def eq(a,b,n):return cb.get(b)==n and o.normalized[a:a+n]==c.normalized[b:b+n] and o.pattern(a,n)==c.pattern(b,n)
 def body(e,a,n):return dict(address=a,bytes=n,raw_sha256=sha(e.b[a:a+n]),normalized_sha256=sha(e.normalized[a:a+n]),relocations=e.pattern(a,n),instructions=[ins(e,t) for t in range(a,a+n,8)])
 def edges(e,t):
  out=[]
  for at,target in e.calls.items():
   if target!=t:continue
   a=e.entries[bisect.bisect_right(e.entries,at)-1];end=ob[a] if e is o else a+cb[a]
   out.append(dict(call=at,target=t,owner_start=a,owner_bytes=end-a,owner_raw_sha256=sha(e.b[a:end]),symbols=[] if e is o else [f['name']for f in s.funcs if f['start']==a],preceding_instructions=[ins(e,x) for x in range(max(a,at-32),at,8)]))
  return out
 def refs(e,a,n):
  rows=[]
  for x in range(a,a+n,8):
   if e.relocations.get(x,{}).get('type')==8 and e.b[x]==24:
    ptr=ins(e,x)['wide_immediate'];rows.append(dict(reference=x,pointer=ptr,preview_hex=e.b[ptr:ptr+64].hex(),status='64-byte maximum preview, not a proved consumed object extent'))
  return rows
 fields=['lp_fee_basis_points','protocol_fee_basis_points','coin_creator_fee_basis_points'];out={'setters':{},'decision':'no_patch_evidence_insufficient_for_unique_source_correction'}
 # Recheck every full body in the retained static comparison, including actual helper.
 for r in list(d['roots'].values())+[d['actual_scalar_error_helper']]:
  for side,e in [('original',o),('candidate',c)]:
   b=r[side];assert body(e,b['address'],b['bytes'])==b
  assert eq(r['original']['address'],r['candidate']['address'],r['original']['bytes'])==r['complete_normalized_equal']
 for f in fields:
  r=d['roots'][f];a=r['original']['address'];b=r['candidate']['address'];assert r['original']['bytes']==616 and r['candidate']['bytes']==608
  dif=[x for x in range(0,552,8) if o.normalized[a+x:a+x+8]!=c.normalized[b+x:b+x+8]];assert dif==[40,456,464]
  # Full suffix after the different value setup and shifted call is equal under normalization.
  assert o.normalized[a+568:a+616]==c.normalized[b+560:b+608]
  assert ins(o,a+552)['opcode']==183 and ins(o,a+552)['immediate']==1000
  assert (ins(o,a+560)['opcode'],ins(o,a+560)['dst'],ins(o,a+560)['src'])==(191,5,7)
  assert (ins(c,b+552)['opcode'],ins(c,b+552)['dst'],ins(c,b+552)['src'])==(191,4,7)
  assert o.calls[a+568]==6208 and c.calls[b+560]==832
  pairs=[]
  for l,rgt in zip(o.callsites(a,616),c.callsites(b,608)):
   x,y=l['target'],rgt['target'];pairs.append(dict(original_call=a+l['offset'],candidate_call=b+rgt['offset'],original_target=x,candidate_target=y,original_bytes=ob[x]-x,candidate_bytes=cb[y],complete_normalized_equal=eq(x,y,ob[x]-x)))
  assert [p['complete_normalized_equal']for p in pairs]==[True]*4+[False]
  origins={}
  for side,e,start in [('original',o,a),('candidate',c,b)]:
   ptr=ins(e,start+416)['wide_immediate'];length=ins(e,start+464)['immediate'];origins[side]=dict(filename=e.b[ptr:ptr+length].decode(),line=ins(e,start+456)['immediate'],filename_bytes=length,error_number=ins(e,start+440)['immediate'],error_enum_discriminant=struct.unpack_from('<I',e.b,ins(e,start+64)['wide_immediate'])[0])
   assert origins[side]['error_number']==6000 and origins[side]['error_enum_discriminant']==0
  out['setters'][f]=dict(original_start=a,candidate_start=b,original_bytes=616,candidate_bytes=608,raw_equal=False,normalized_equal=False,pre_setup_differences=dif,post_setup_suffix_equal=True,origins=origins,all_five_actual_calls=pairs,original_data=refs(o,a,616),candidate_data=refs(c,b,608),original_incoming=edges(o,a),candidate_incoming=edges(c,b))
 h=d['actual_scalar_error_helper'];assert h['original']['address']==6208 and h['candidate']['address']==832
 delta=[x for x in range(0,1336,8)if o.normalized[6208+x:6216+x]!=c.normalized[832+x:840+x]];assert delta==[24,32,40,48]
 assert o.pattern(6208,1336)==c.pattern(832,1336)
 assert eq(6208,4872,1336)
 actual=[]
 for l,r in zip(o.callsites(6208,1336),c.callsites(832,1336)):
  assert l['offset']==r['offset'];a,b=l['target'],r['target'];actual.append(dict(offset=l['offset'],original_target=a,candidate_target=b,complete_normalized_equal=eq(a,b,ob[a]-a),original_body=body(o,a,ob[a]-a),candidate_body=body(c,b,cb[b])))
 assert len(actual)==8 and all(x['complete_normalized_equal'] for x in actual)
 out['helper']=dict(original_start=6208,candidate_actual_start=832,bytes=1336,normalized_differences=delta,original_incoming=edges(o,6208),candidate_actual_incoming=edges(c,832),candidate_other_helper_incoming=edges(c,4872),other_helper_is_not_scalar_target=True,all_eight_actual_calls=actual,original_data=refs(o,6208,1336),candidate_data=refs(c,832,1336),tuple_memory_after_prefix={'original_call_r4_1000_r5_fee':{'fp_minus_296':1000,'fp_minus_288':'fee'},'candidate_call_r4_fee':{'fp_minus_296':1000,'fp_minus_288':'fee'}},residual_limit='Tuple stores and normalized suffix match; relocated metadata, heap allocation behavior and historical type/source identity remain separate obligations.')
 assert len(out['helper']['original_incoming'])==24 and len(out['helper']['candidate_actual_incoming'])==3 and len(out['helper']['candidate_other_helper_incoming'])==6
 # Retained historical original rows must bind to the same complete original bodies.
 inv=json.loads((P/'inventory-reference.json').read_text())
 for r in inv['selected_original_rows']:assert sha(o.b[r['start']:r['end']])==r['raw_sha256']
 out['limits']=['Original windows are inferred boundaries.','No modified source or binary was produced.','Source-level i32 versus u64 versus usize possibilities must not be inferred from normalized helper equality alone.','No compiler, network, runtime fixture, transaction or new signature check.','Historical original source and transitive data equality remain unproved.','Retained static-comparison scope text describes its earlier source lineage; current candidate SHA and source22 are authoritative.']
 return out
if __name__=='__main__':print(json.dumps(analyze(),indent=2,sort_keys=True))
