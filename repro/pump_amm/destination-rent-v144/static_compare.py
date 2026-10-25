"""Fresh symbol-located complete roots, all direct targets, and bounded data."""
from pathlib import Path
import hashlib,json,struct,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;P=W/'static-reference';sys.path.insert(0,str(P))
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
O=W/'inputs/deployed.so';C=W/'candidate.so';S=W/'unstripped.so'
o,c,s=Elf(O),Elf(C),Elf(S);assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]and c.pattern(c.lo,c.hi-c.lo)==s.pattern(s.lo,s.hi-s.lo)
assert sha(o.b)=='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
ob=dict(zip(o.entries,o.entries[1:]+[o.hi]));cf={};names={}
for f in s.funcs:cf[f['start']]=f['size'];names.setdefault(f['start'],[]).append(f['name'])
def ins(e,a):
 op,r,off,imm=struct.unpack_from('<BBhi',e.b,a);v={'address':a,'opcode':op,'dst':r&15,'src':r>>4,'offset':off,'immediate':imm}
 if op==0x18:v['wide_immediate']=struct.unpack_from('<I',e.b,a+4)[0]|struct.unpack_from('<I',e.b,a+12)[0]<<32
 if op&7 in(5,6)and op not in(0x85,0x8d,0x95):v['branch_target']=a+8+off*8
 if a in e.calls:v['call_target']=e.calls[a]
 return v
def body(e,a,n):return {'address':a,'bytes':n,'raw_sha256':sha(e.b[a:a+n]),'normalized_sha256':sha(e.normalized[a:a+n]),'relocations':e.pattern(a,n),'instructions':[ins(e,x)for x in range(a,a+n,8)]}
def equal(a,b,n):return cf.get(b)==n and o.normalized[a:a+n]==c.normalized[b:b+n]and o.pattern(a,n)==c.pattern(b,n)
def matchtargets(a):
 n=ob[a]-a
 return [{'address':b,'bytes':n,'symbols':names[b]}for b in cf if equal(a,b,n)]
def target(e,a,original=False):
 n=ob[a]-a if original else cf.get(a)
 return {'address':a,'bytes':n,'raw_sha256':sha(e.b[a:a+n])if n else None,'normalized_sha256':sha(e.normalized[a:a+n])if n else None,'symbols':[]if original else names.get(a,[])}
def find(pred):
 m=[f for f in s.funcs if pred(f['name'])];assert len(m)==1,[(x['name'],x['size'])for x in m];return m[0]
funcs={
 'create_wrapper':find(lambda x:'__global13create_config'in x),
 'create_handler':find(lambda x:'18pump_amm_recovered13create_config'in x),
 'create_context':find(lambda x:'create_config..CreateConfig$u20$as'in x and'12try_accounts17h'in x),
 'init_helper':find(lambda x:'create_config..CreateConfig$u20$as'in x and'12try_accounts28_'in x),
 'recipient_setter':find(lambda x:'27set_protocol_fee_recipients17h'in x),
 'create_event':find(lambda x:'CreateConfigEvent$u20$as'in x and'4data17h'in x),
 'update_wrapper':find(lambda x:'__global17update_fee_config'in x),
 'update_handler':find(lambda x:'18pump_amm_recovered17update_fee_config'in x),
 'update_event':find(lambda x:'UpdateFeeConfigEvent$u20$as'in x and'4data17h'in x),
}
for field in ['lp_fee_basis_points','protocol_fee_basis_points','coin_creator_fee_basis_points']:funcs[field]=find(lambda x:'set_'+field+'17h'in x)
orig={k:(v['original']['start'],v['original']['bytes'])for k,v in json.loads((P/'original-evidence.json').read_text())['static_identity_matches'].items()};orig.update(update_event=(0x89148,744),update_wrapper=(0xe2230,2296),update_handler=(0x1d8a0,2912),lp_fee_basis_points=(0x61630,616),protocol_fee_basis_points=(0x61898,616),coin_creator_fee_basis_points=(0x61b00,616))
roots={}
for label,(a,n)in orig.items():
 f=funcs[label];b,k=f['start'],f['size'];same=equal(a,b,n);oc=o.callsites(a,n);cc=c.callsites(b,k);aligned=n==k and [x['offset']for x in oc]==[x['offset']for x in cc]
 calls=[]
 for x in oc:
  at=a+x['offset'];t=x['target'];other=c.calls.get(b+x['offset'])if aligned else None
  calls.append({'original_call':at,'original_target':target(o,t,True),'aligned_candidate_call':b+x['offset']if aligned else None,'aligned_candidate_target':target(c,other)if other is not None else None,'complete_normalized_equal':equal(t,other,ob[t]-t)if other in cf else None,'fresh_complete_matches_anywhere':matchtargets(t)})
 roots[label]={'original':body(o,a,n),'candidate':body(c,b,k),'symbol':f['name'],'raw_equal':n==k and o.b[a:a+n]==c.b[b:b+k],'complete_normalized_equal':same,'direct_call_offsets_align':aligned,'direct_targets':calls,'candidate_direct_calls':[{'call':b+x['offset'],'target':target(c,x['target'])}for x in cc],'normalized_instruction_differences_in_shared_extent':[{'offset':d,'original':ins(o,a+d),'candidate':ins(c,b+d)}for d in range(0,min(n,k),8)if o.normalized[a+d:a+d+8]!=c.normalized[b+d:b+d+8]],'extent_difference':k-n}
# All four methods have real create and update callers, no synthetic callsites.
callgraph=[]
for field in ['lp_fee_basis_points','protocol_fee_basis_points','protocol_fee_recipients','coin_creator_fee_basis_points']:
 f=funcs['recipient_setter'if field=='protocol_fee_recipients'else field];t=f['start'];calls=[a for a,b in c.calls.items()if b==t];assert len(calls)==2
 owners=[]
 for at in calls:
  matches=[name for name in['create_handler','update_handler']if funcs[name]['start']<=at<funcs[name]['start']+funcs[name]['size']];assert len(matches)==1;owners.append({'call':at,'handler':matches[0]})
 assert {x['handler']for x in owners}=={'create_handler','update_handler'}
 callgraph.append({'field':field,'target':target(c,t),'callers':owners})
# Recompute each prebuild literal at its fresh corresponding reference site.
data=[]
for old in json.loads((P/'static-closure.json').read_text())['data_references']:
 label=old['body'];a,n=orig[label];b=funcs[label]['start'];at=old['original_reference'];other=b+at-a
 row={'body':label,'original_reference':at,'candidate_reference':other,'kind':old['kind'],'reference_instruction_shape_preserved':o.normalized[at:at+16]==c.normalized[other:other+16]and c.relocations.get(other)==o.relocations.get(at)}
 if not row['reference_instruction_shape_preserved']:row['status']='Reference moved or instruction changed; no pointer correspondence inferred.';data.append(row);continue
 p=ins(c,other)['wide_immediate'];row['candidate_pointer']=p
 if old['kind']=='bounded_direct_bytes':
  n=old['original_consumed']['bytes'];q=old['original_consumed']['address'];row.update(original_bytes=n,original_sha256=sha(o.b[q:q+n]),candidate_same_extent_sha256=sha(c.b[p:p+n]),equal_same_extent=o.b[q:q+n]==c.b[p:p+n])
  # Source-coordinate lengths are explicit stores at +48; preserve actual span.
  if at in(0x82f58,0x62518,0x62608):
   ci=ins(c,other+48);actual=ci['immediate'];assert ci['opcode']==0x7a and 0<actual<256
   row.update(candidate_actual_extent=actual,candidate_actual_text=c.b[p:p+actual].decode(),candidate_length_instruction=ci)
 elif old['kind']=='single_seed_fat_pointer':
  n=struct.unpack_from('<Q',c.b,p+8)[0];q=struct.unpack_from('<Q',c.b,p)[0]>>32;expected=old['original_consumed'];row.update(candidate_consumed_bytes=n,candidate_consumed_hex=c.b[q:q+n].hex(),equal_consumed=n==expected['bytes']and c.b[q:q+n].hex()==expected['hex'])
 else:row['status']='Compiler metadata pointer retained; recursive consumed extent remains unproved.'
 data.append(row)
# Inline event discriminator/tag follow fresh actual serializer/handler locations.
inline=[]
for label,at,val in [('create_event',0x83e00,0x1651e2378159346b),('create_handler',0x17460,0x1d9acb512ea545e4)]:
 original=ins(o,at);assert original['wide_immediate']==val;other=funcs[label]['start']+at-orig[label][0];assert ins(c,other)['wide_immediate']==val;inline.append({'kind':label,'original':original,'candidate':ins(c,other),'equal':True})

actual_values=[]
for field in ['lp_fee_basis_points','protocol_fee_basis_points','coin_creator_fee_basis_points']:
 row=roots[field];cc=row['candidate_direct_calls'];oc=row['direct_targets'];assert len(cc)==len(oc)==5
 paired=[]
 for left,right in zip(oc,cc):
  a=left['original_target']['address'];b=right['target']['address'];n=ob[a]-a
  paired.append({'original_call':left['original_call'],'candidate_call':right['call'],'original_target':left['original_target'],'candidate_target':right['target'],'complete_normalized_equal':equal(a,b,n),'pairing_basis':'Five original and candidate direct calls in source order; names and target identities retained. No same-offset alignment claimed.'})
 row['semantic_call_order_pairs']=paired
 chosen=[x for x in cc if any('Error11with_values'in n for n in x['target']['symbols'])];assert len(chosen)==1;actual_values.append(chosen[0])
assert len({x['target']['address']for x in actual_values})==1
b=actual_values[0]['target']['address'];n=ob[0x1840]-0x1840;k=cf[b];calls=[]
for x in o.callsites(0x1840,n):
 t=x['target'];ct=c.calls.get(b+x['offset']);calls.append({'offset':x['offset'],'original':target(o,t,True),'candidate':target(c,ct)if ct else None,'equal':equal(t,ct,ob[t]-t)if ct in cf else False})
scalar_error_helper={'original':body(o,0x1840,n),'candidate':body(c,b,k),'complete_normalized_equal':equal(0x1840,b,n),'normalized_shared_instruction_differences':[{'offset':d,'original':ins(o,0x1840+d),'candidate':ins(c,b+d)}for d in range(0,min(n,k),8)if o.normalized[0x1840+d:0x1840+d+8]!=c.normalized[b+d:b+d+8]],'direct_targets':calls,'actual_callers':actual_values,'unused_generic_complete_matches':matchtargets(0x1840),'limit':'An unused generic complete match is not substituted for these actual error-path calls.'}
relocated_roots={}
for label,row in roots.items():
 sides={}
 for which,e in [('original',o),('candidate',c)]:
  a=row[which]['address'];n=row[which]['bytes'];items=[]
  for at,rel in sorted(e.relocations.items()):
   if a<=at<a+n and rel['type']==8:
    pointer=ins(e,at)['wide_immediate'];entry={'reference':at,'pointer':pointer,'consumed_extent':'See bounded_data for six initializer roots; otherwise not newly closed.'}
    # Original/current scalar path length is explicitly stored in origin struct.
    if label in ['lp_fee_basis_points','protocol_fee_basis_points','coin_creator_fee_basis_points']:
     for candidate_path in [b'programs/pump-amm/src/state/global_config.rs',b'src/state/global_config.rs']:
      if e.b[pointer:pointer+len(candidate_path)]==candidate_path:
       npath=len(candidate_path);entry.update(source_path=candidate_path.decode(),bytes=npath,sha256=sha(e.b[pointer:pointer+npath]),consumed_extent='Source origin filename; matching length immediate searched in next64 instruction bytes.',length_evidence=[ins(e,q)for q in range(at+16,min(a+n,at+80),8)if ins(e,q)['opcode']==0x7a and ins(e,q)['immediate']==npath]);assert entry['length_evidence']
    items.append(entry)
  sides[which]=items
 relocated_roots[label]=sides

report={'scope':'One fixed22-input source build with only update event clone removed. Fresh complete roots and actual targets/data; initializer still static-only. No source/compiler variants.','original_sha256':sha(o.b),'candidate_sha256':sha(c.b),'symbols_sha256':sha(s.b),'roots':roots,'actual_shared_callgraph':callgraph,'bounded_data':data,'inline_literals':inline,'actual_scalar_error_helper':scalar_error_helper,'all_root_data_reference_ledger':relocated_roots,'limits':['A normalized instruction match does not close callee or relocated data identity. All immediate calls and known bounded data obligations are shown separately.','The historical proposed source paths/line numbers are not spoofed; truthful current diagnostics differ.','Compiler panic/format/I/O metadata transitive closure remains unproved.','Original initializer positive runtime coverage remains zero; the unchanged corpus executes existing bounded handlers only.','Full ELF equality remains false; no handler-count increment.']}
summary={'candidate_sha256':sha(c.b),'candidate_bytes':len(c.b),'roots':{name:{'original_bytes':row['original']['bytes'],'candidate_bytes':row['candidate']['bytes'],'complete_normalized_equal':row['complete_normalized_equal'],'normalized_shared_instruction_differences':len(row['normalized_instruction_differences_in_shared_extent']),'aligned_target_matches':sum(x['complete_normalized_equal']is True for x in row['direct_targets']),'direct_targets':len(row['direct_targets'])}for name,row in roots.items()},'shared_methods_with_two_real_callers':len(callgraph),'actual_scalar_error_helper_mismatched_instructions':len(scalar_error_helper['normalized_shared_instruction_differences']),'initializer_positive_runtime':False,'full_byte_equality':False}
report['summary']=summary
if '--verify'in sys.argv:assert json.loads(json.dumps(report))==json.loads((W/'static-comparison.json').read_text())
else:(W/'static-comparison.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(summary,indent=2))
