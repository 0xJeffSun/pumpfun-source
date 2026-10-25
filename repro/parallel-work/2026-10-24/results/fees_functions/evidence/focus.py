from pathlib import Path
import json,struct,hashlib
from elf_reader import Elf
W=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def run():
 j=json.loads((W/'catalog.json').read_text());leads=json.loads((W/'leads.json').read_text()); C=Elf(W/'inputs/candidate.so');O=Elf(W/'inputs/original.so');cm={r['start']:r for r in j['candidate_rows']};om={r['start']:r for r in j['original_rows']}
 def window(e,a,n):return dict(start=a,end=a+n,bytes=n,sha256=sha(e.b[a:a+n]))
 def literal(e,a,off,n):
  pc=a+off;assert e.relocations[pc]['type']==8 and e.b[pc]==0x18
  p=struct.unpack_from('<I',e.b,pc+4)[0]|struct.unpack_from('<I',e.b,pc+12)[0]<<32
  return dict(instruction_offset=off,**window(e,p,n),hex=e.b[p:p+n].hex(),utf8=e.b[p:p+n].decode('utf8','replace'))
 def callers(e,target,rows):
  return [dict(pc=pc,body_start=next((r['start'] for r in rows if r['start']<=pc<r['end']),None)) for pc,t in e.calls.items() if t==target]
 records=[]
 for c,o in [(463456,85560),(315304,535376),(151912,532872),(155064,442944),(188656,531232),(251456,529488)]:
  lead=next(r for r in leads if r['candidate_start']==c and r['original_start']==o);n=lead['bytes'];data=[]
  spans=[(2232,32,'Instruction::new_with_bytes program_id argument: &Pubkey is 32 bytes'),(2424,17,'seed pointer stored at stack -40; length 17 stored at -32 at body+2472')] if c==463456 else [(488,struct.unpack_from('<i',C.b,c+536+4)[0],'filename pointer at +488, length immediate at +536'),(624,struct.unpack_from('<i',C.b,c+640+4)[0],'account type-name pointer +624, length immediate +640')]
  for off,size,basis in spans:
   on=size if c==463456 else struct.unpack_from('<i',O.b,o+(536 if off==488 else 640)+4)[0]
   a,b=literal(C,c,off,size),literal(O,o,off,on)
   data.append(dict(candidate=a,original=b,equal=a['hex']==b['hex'],extent_basis=basis))
  calls=[]
  for p in lead['direct_calls']:
   ca,oa=p['candidate_target'],p['original_target'];cr=cm[ca];orr=om[oa];cn=cr['bytes'];on=orr['bytes']
   calls.append(dict(**p,candidate=window(C,ca,cn),original=window(O,oa,on),names=cr['names'],normalized_equal=cn==on and C.normalized[ca:ca+cn]==O.normalized[oa:oa+on],relocation_pattern_equal=C.pattern(ca,cn)==O.pattern(oa,on),descendant_data_equivalence_proven=False))
  records.append(dict(candidate=window(C,c,n),original=window(O,o,n),names=cm[c]['names'],differences=lead['differences'],direct_calls=calls,relocated_data=data,all_immediate_relocated_data_extents_accounted_for=len(data)==len(cm[c]['dependencies']['relocated_targets']),candidate_callers=callers(C,c,j['candidate_rows']),original_callers=callers(O,o,j['original_rows']),diagnostic_line=None if c==463456 else dict(candidate=struct.unpack_from('<i',C.b,c+532)[0],original=struct.unpack_from('<i',O.b,o+532)[0]),remaining_data_sites=[d for d in cm[c]['dependencies']['relocated_targets'] if d['offset'] not in [x[0] for x in spans]],identity_limit='Named candidate; original identity supported by body/call/data evidence but historical function symbol unavailable.'))
 # Boundary-only matching must not be misreported as a compiler or dependency defect.
 terminal=[]
 for r in j['candidate_rows']:
  for p in r['matches']:
   for call in p['calls']:
    if not call['target_body_supported']:
     cr=cm.get(call['candidate_target']);orr=om.get(call['original_target'])
     if cr and orr and not orr['entry_bounded']:
      ca,oa,n=cr['start'],orr['start'],cr['bytes'];equal=n==orr['bytes'] and C.normalized[ca:ca+n]==O.normalized[oa:oa+n] and C.pattern(ca,n)==O.pattern(oa,n)
      terminal.append(dict(caller=r['start'],original_caller=p['start'],call_offset=call['offset'],candidate=window(C,ca,n),original=window(O,oa,orr['bytes']),normalized_equal=equal,reason='Original terminal text-boundary window excluded by entry-bounded matcher; do not infer semantic contradiction.'))
 return dict(focused=records,terminal_boundary_caveats=terminal)
if __name__=='__main__':(W/'focused-proof.json').write_text(json.dumps(run(),indent=2)+'\n')
