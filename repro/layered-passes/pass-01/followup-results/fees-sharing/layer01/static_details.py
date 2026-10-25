"""Supplemental residual evidence. Shape alternatives never assert correspondence."""
import collections,struct,hashlib
sha=lambda b:hashlib.sha256(b).hexdigest()
def ranges(xs):
 out=[]
 for x in xs:
  if out and out[-1][1]==x:out[-1][1]+=1
  else:out.append([x,x+1])
 return out

def target_comparison(o,c,om,cm,ot,ct):
 a,b=om.get(ot),cm.get(ct)
 r=dict(original_target=ot,candidate_target=ct,original_window=a and [a['start'],a['end']],candidate_window=b and [b['start'],b['end']],raw_body_equal=None,normalized_body_equal=None,relocation_pattern_equal=None,full_transitive_equal=None)
 if a and b:
  r.update(raw_body_equal=o.b[ot:a['end']]==c.b[ct:b['end']],normalized_body_equal=o.normalized[ot:a['end']]==c.normalized[ct:b['end']],size_equal=a['bytes']==b['bytes'],relocation_pattern_equal=a['relocation_pattern']==b['relocation_pattern'],original_boundary_basis=a['boundary_basis'])
 return r

def run(cat,o,c,objects):
 om={r['start']:r for r in cat['original_rows']};cm={r['start']:r for r in cat['candidate_rows']}
 calls=[]
 for cr in cm.values():
  for m in cr['matches']:
   for q in m['calls']:
    ot=q['original_call']['target'];ct=q['candidate_call']['target']
    d=target_comparison(o,c,om,cm,ot,ct)
    d.update(original_caller=m['start'],candidate_caller=cr['start'],offset=q['offset'],original_pc=q['original_call']['pc'],candidate_pc=q['candidate_call']['pc'],original_signed_immediate=q['original_call']['signed_immediate'],candidate_signed_immediate=q['candidate_call']['signed_immediate'],historical_strict_status=q['status'],terminal_supplement=q['terminal_target_matches'],candidate_names=cm.get(ct,{}).get('names',[]))
    calls.append(d)
 # All same-size alternatives for every candidate residual. No top-k truncation.
 shapes=[]
 for cr in cm.values():
  if cr['status']=='normalized_call_consistent':continue
  alternatives=[]
  for r in om.values():
   if r['bytes']!=cr['bytes']:continue
   a,b=r['start'],cr['start'];size=r['bytes']
   slots=[i for i in range(0,size,8) if o.normalized[a+i:a+i+8]!=c.normalized[b+i:b+i+8]]
   alternatives.append(dict(original_start=a,original_end=r['end'],normalized_differing_slots=slots,normalized_differing_slot_count=len(slots),relocation_pattern_equal=r['relocation_pattern']==cr['relocation_pattern'],is_correspondence=False))
  alternatives.sort(key=lambda a:(a['normalized_differing_slot_count'],a['original_start']))
  shapes.append(dict(candidate_start=cr['start'],candidate_end=cr['end'],names=cr['names'],all_same_size_alternatives=alternatives,status='shape_only_not_attribution'))
 # Exact evidence for every <=5-slot shape alternative, not only the best one.
 small=[]
 for r in shapes:
  for a in r['all_same_size_alternatives']:
   if a['normalized_differing_slot_count']>5:continue
   os,cs=a['original_start'],r['candidate_start'];orow,crow=om[os],cm[cs];ds=[]
   for i in a['normalized_differing_slots']:
    ds.append(dict(offset=i,original_pc=os+i,candidate_pc=cs+i,original_raw=o.b[os+i:os+i+8].hex(),candidate_raw=c.b[cs+i:cs+i+8].hex(),original_decoded=list(struct.unpack_from('<BBhi',o.b,os+i)),candidate_decoded=list(struct.unpack_from('<BBhi',c.b,cs+i))))
   paircalls=[];ods={q['offset']:q for q in orow['dependencies']['direct']}
   for cc in crow['dependencies']['direct']:
    oo=ods.get(cc['offset']);paircalls.append(dict(offset=cc['offset'],candidate=cc,original=oo,comparison=target_comparison(o,c,om,cm,oo['target'],cc['target']) if oo else None))
   small.append(dict(candidate_start=cs,original_start=os,names=r['names'],size=crow['bytes'],differences=ds,call_pairs=paircalls,original_calls_without_candidate_offset=[q for q in ods.values() if q['offset'] not in {cc['offset'] for cc in crow['dependencies']['direct']}],is_correspondence=False))
 conflicts=[]
 for cr in cm.values():
  if cr['status']!='call_conflict':continue
  for m in cr['matches']:
   for q in m['calls']:
    if not q['unique_contradiction']:continue
    ot,ct=q['original_call']['target'],q['candidate_call']['target'];r=target_comparison(o,c,om,cm,ot,ct)
    r.update(original_caller=m['start'],candidate_caller=cr['start'],offset=q['offset'],strict_status='call_conflict_preserved')
    r['refined_disposition']='terminal-boundary exclusion: actual bounded bytes equal, historical strict label retained' if r['raw_body_equal'] else 'different immediate target bytes: normalized caller shape is not correspondence proof'
    conflicts.append(r)
 # Complement of actual ELF structures, not guessed compiler padding.
 regions={}
 for side,e in [('original',o),('candidate',c)]:
  b=e.b;phoff,shoff=struct.unpack_from('<QQ',b,32);eh,phs,phn,shs,shn=struct.unpack_from('<HHHHH',b,52)
  used=[(0,eh,'ELF_header'),(phoff,phoff+phs*phn,'program_headers'),(shoff,shoff+shs*shn,'section_headers')]
  used.extend((s[4],s[4]+s[5],n) for n,s in e.secs.items() if s[1]!=8 and s[5])
  mask=bytearray(len(b))
  for a,z,n in used:mask[a:z]=b'\1'*(z-a)
  unknown=[]
  for a,z in ranges(i for i,v in enumerate(mask) if not v):
   payload=b[a:z];unknown.append(dict(start=a,end=z,bytes=z-a,sha256=sha(payload),nonzero_bytes=sum(v!=0 for v in payload),status='outside_declared_ELF_structures_not_source_padding_proof',classification='toolchain/build provenance'))
  regions[side]=dict(structures=[dict(start=a,end=z,role=n,sha256=sha(b[a:z])) for a,z,n in used],unassigned_intervals=unknown)
 # Every known-object pairing at relocated LDDW positions, strict body alternatives only.
 byobj={(r['side'],r['target']):r for r in objects};data=[]
 for cr in cm.values():
  for m in cr['matches']:
   os=m['start'];cs=cr['start']
   for rr in cr['relocation_pattern']:
    if rr['type']!=8:continue
    cp=cs+rr['offset'];op=os+rr['offset']
    ot=struct.unpack_from('<I',o.b,op+4)[0]|struct.unpack_from('<I',o.b,op+12)[0]<<32
    ct=struct.unpack_from('<I',c.b,cp+4)[0]|struct.unpack_from('<I',c.b,cp+12)[0]<<32
    a,b=byobj.get(('original',ot)),byobj.get(('candidate',ct))
    if a and b:data.append(dict(original_pc=op,candidate_pc=cp,original_target=ot,candidate_target=ct,original_role=a['role'],candidate_role=b['role'],original_bytes=a['bytes'],candidate_bytes=b['bytes'],raw_equal=a['hex']==b['hex'],same_role=a['role']==b['role'],semantic_equal=None))
 # New helper-boundary lead connected through the normalized claim-v2 wrapper.
 wrapper=cm[353448];m=next(m for m in wrapper['matches'] if m['start']==647968)
 body=next(q for q in m['calls'] if q['offset']==688)
 assert (body['original_call']['target'],body['candidate_call']['target'])==(137280,397608)
 original_helper_calls=[q for q in om[137280]['dependencies']['direct'] if q['target']==243184]
 assert [q['pc'] for q in original_helper_calls]==[138936,141000]
 h=om[243184]
 assert any(q['pc']==246360 and q['target']==700528 for q in h['dependencies']['direct'])
 social=dict(original_wrapper=[647968,650064],candidate_wrapper=[353448,355544],wrapper_body_edge=body,original_body=[137280,147944],candidate_body=[397608,408344],reused_original_helper=[243184,249264],helper_calls=original_helper_calls,original_helper_dependencies=h['dependencies'],original_idempotent_instruction_call=[246360,700528],candidate_idempotent_wrapper_call=[402760,577728],candidate_idempotent_instruction_call=[577800,595760],original_zero_selector=[700496,0],original_one_selector=[700536,1],candidate_one_selector=[595768,1],status='nonduplicate source organization lead; helper contract not yet closed; no patch justified')
 return {'actual-call-targets.json':calls,'same-size-alternatives.json':shapes,'small-residual-evidence.json':small,'conflict-refinement.json':conflicts,'file-regions.json':regions,'bounded-paired-data.json':data,'social-helper-lead.json':social}
