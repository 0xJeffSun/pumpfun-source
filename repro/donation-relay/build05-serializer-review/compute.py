#!/usr/bin/env python3
"""Static complete-window/relocation-first evidence; never executes target code."""
import gzip,importlib.util,json,struct,hashlib
from pathlib import Path
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('static_elf',P/'build05/analyze.py');a=importlib.util.module_from_spec(s);s.loader.exec_module(a)
H=lambda b:hashlib.sha256(b).hexdigest()
FIELDS=[
 ('tracker',18,67,[8,1,1,32,32,16],[15160,15384,15456,15512,15568,15656],[62400,62624,62848,63040,63240,63480],757517,407837),
 ('debouncer',17,69,[8,1,1,32,32,8],[14208,14432,14504,14560,14616,14688],[66624,66848,67072,67264,67464,67688],757573,407877),
 ('distribution',20,68,[8,1,1,32,32,16,8],[16896,17120,17192,17248,17304,17392,17464],[64400,64624,64848,65040,65240,65480,65704],757557,407861),
 ('receipt',153,82,[8,1,32,8],[465816,466304,466360,466432],[198856,199104,199320,199560],757589,407885)]
def make():
 result=a.analyze(P/'build05');of=result['original-function-ledger.json'];cf=result['candidate-function-ledger.json'];o=a.Elf((P/'build05/original.so').read_bytes());c=a.Elf((P/'build05/unstripped.so').read_bytes())
 def closure(fs,roots):
  by={x['start']:i for i,x in enumerate(fs)};seen=set();pending=list(roots);outside=[]
  while pending:
   i=pending.pop()
   if i in seen:continue
   seen.add(i)
   for call in fs[i]['direct_calls']:
    if call['target'] in by:pending.append(by[call['target']])
    else:outside.append({'caller':i,**call})
  return {'roots':roots,'function_indices':sorted(seen),'functions':[fs[i] for i in sorted(seen)],'unresolved_direct_targets':outside,'scope':'complete functions including error/panic/direct runtime closure; dynamic call targets are explicit unresolved premises; candidate82 includes the entire just-swap wrapper, not only its receipt region'}
 oc=closure(of,[17,18,20,153]);cc=closure(cf,[67,68,69,82]);assert not oc['unresolved_direct_targets'] and not cc['unresolved_direct_targets']
 fields=[]
 for name,oi,ci,widths,opcs,cpcs,oa,ca in FIELDS:
  om={x['pc']:x for x in of[oi]['direct_calls']};cm={x['pc']:x for x in cf[ci]['direct_calls']}
  assert all(om[pc]['target']==651064 for pc in opcs);assert all(cm[pc]['target']==397280 for pc in cpcs)
  assert o.at(oa,8)==c.at(ca,8)
  pos=0;items=[]
  for width,op,cp in zip(widths,opcs,cpcs):
   items.append({'offset':pos,'bytes':width,'original_writer_call':om[op],'candidate_memcpy_call':cm[cp]});pos+=width
  fields.append({'name':name,'original_ordinal':oi,'candidate_index':ci,'field_bytes':pos,'fields':items,'discriminator':{'original_address':oa,'candidate_address':ca,'bytes':8,'hex':o.at(oa,8).hex(),'sha256':H(o.at(oa,8))},'complete_body_raw_equal':of[oi]['raw_sha256']==cf[ci]['raw_sha256'],'complete_body_normalized_equal':of[oi]['normalized_sha256']==cf[ci]['normalized_sha256'],'interpretation':'field store mapping, not body equivalence; receipt candidate mapping refers to an inlined subregion of wrapper82'})
 # Genuine common syscall identification is independent of identical machine immediates.
 ex=[]
 for label,elf,pc,symbol in [('original writer',o,651224,'sol_memcpy_'),('candidate memcpy shim',c,397288,'sol_memcpy_'),('original memcmp shim',o,743472,'sol_memcmp_'),('candidate memcmp shim',c,397408,'sol_memcmp_')]:
  r=elf.relocations[pc];assert r['type']==10 and r['symbol']==symbol
  ex.append({'role':label,'pc':pc,'instruction_hex':elf.at(pc,8).hex(),'relocation':r,'matched_symbol':symbol,'semantic_limit':'same imported symbol; host ABI/implementation remains a runtime premise'})
 # Original constructor spells its 28-byte string via immediate stores, not a rodata pointer.
 chunks=[]
 for pc in [645424,645400,645376]:
  b=o.at(pc,16);chunks.append(b[4:8]+b[12:16])
 b=o.at(645448,8);chunks.append(b[4:8]);msg=b''.join(chunks);assert msg==b'failed to write whole buffer'
 writer=of[281];constructor=of[256]
 pairrows=[];oset=set(oc['function_indices']);cset=set(cc['function_indices'])
 for row in result['match-witnesses.json']:
  if row['original_ordinal'] in oset or row['candidate_index'] in cset:pairrows.append(row)
 # Export all raw calls/refs and matching evidence, including unresolved data object extent.
 out={'closure-original.json':oc,'closure-candidate.json':cc,'closure-pair-witnesses.json':pairrows,'field-stream-map.json':fields,'import-symbol-witnesses.json':ex,'writer-contract.json':{'writer_ordinal':281,'writer_start':writer['start'],'writer_end':writer['end'],'writer_sha256':writer['raw_sha256'],'constructor_ordinal':256,'constructor_sha256':constructor['raw_sha256'],'string_construction_instruction_pcs':[645424,645400,645376,645448],'error_string':msg.decode(),'error_string_hex':msg.hex(),'single_copy_pc':651224,'full_capacity_guard_pc':651104,'position_store_pc':651288,'compare_written_to_requested_pc':651304,'short_result_call_pc':651312,'overflow_panic_call_pc':651344,'candidate_first_field_copy_pc':62400,'candidate_exhausted_guard_pc':62416,'candidate_remaining_branch_pc':62456,'candidate_retry_head':62520,'candidate_short_error_target':63616,'claim':'original single partial-copy write_all versus candidate Cursor retry-loop; no entire compiler/library identity claimed'},'scope-summary.json':{'original_direct_closure_windows':len(oset),'candidate_direct_closure_windows':len(cset),'original_data_refs':sum(len(of[i]['data_references']) for i in oset),'candidate_data_refs':sum(len(cf[i]['data_references']) for i in cset),'original_indirect_calls':sum(len(of[i]['indirect_calls']) for i in oset),'candidate_indirect_calls':sum(len(cf[i]['indirect_calls']) for i in cset),'fixed_field_calls':sum(len(x['fields']) for x in fields),'new_runtime_cases':0,'source_proposal_compiled':False,'full_body_matches_for_four_mappings':0,'global_comparison':result['comparison-summary.json'],'data_limit':'Each relocation-backed lddw gets a bounded at-most-64-byte sample. Samples may cross object boundaries; only four explicit 8-byte discriminator extents are claimed complete. Full data/static vtable/indirect target identity is not established.'}}
 return result,out
if __name__=='__main__':
 r,out=make()
 for name,v in out.items():(P/name).write_bytes(a.encode(v))
 print(json.dumps(out['scope-summary.json'],indent=2))
