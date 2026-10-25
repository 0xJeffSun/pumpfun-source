#!/usr/bin/env python3
"""Static read-only review. Never compiles, executes or edits ELF bytes."""
import hashlib,json,struct
from pathlib import Path
from analyze import Elf
from disasm import render
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def J(n):return json.loads((P/n).read_text())
def generate():
 b=P/'inputs/build06';o=Elf((b/'original.so').read_bytes());c=Elf((b/'unstripped.so').read_bytes())
 of=J('inputs/build06/original-function-ledger.json');cf=J('inputs/build06/candidate-function-ledger.json')
 for e,fs in [(o,of),(c,cf)]:
  for f in fs:
   fresh=e.function(f['start'],f['bytes'],f['names'])
   assert all(f[k]==v for k,v in fresh.items()),f['start']
 comparisons=[]
 pairs=[('writer',281,72),('short-write constructor',256,1),('allocator',195,135),('deallocator',196,136),('io Error::_new',360,180),('StringError drop',263,21),('StringError type_id',267,31),('StringError description',384,198),('StringError Debug',386,200),('StringError Display',385,199),('Error source/cause',265,29),('Error provide',266,30),('raw_vec handle_error',382,196),('handle_alloc_error',383,197),('allocation-error entry',219,140),('rg_oom',370,187),('writer overflow',449,257),('tracker',18,73),('debouncer',17,75),('distribution',20,74),('receipt wrapper envelope',153,88)]
 for role,oi,ci in pairs:
  a,z=of[oi],cf[ci]
  comparisons.append({'role':role,'original':a,'candidate':z,'raw_equal':a['raw_sha256']==z['raw_sha256'],'normalized_equal':a['normalized_sha256']==z['normalized_sha256']})
 assert comparisons[2]['raw_equal'] and comparisons[3]['raw_equal'] and comparisons[4]['normalized_equal']
 def object(e,addr,n):
  return {'address':addr,'bytes':n,'hex':e.at(addr,n).hex(),'sha256':H(e.at(addr,n))}
 labels=['drop','size','alignment','Debug::fmt','Display::fmt','Display upcast table','source','type_id','description','cause','provide']
 tables=[];vroot={}
 for side,e,fs,addr,up in [('original',o,of,774744,774712),('candidate',c,cf,421144,421112)]:
  slots=[];roots=[]
  for i,label in enumerate(labels):
   pc=addr+8*i;raw=e.at(pc,8);rel=e.relocations.get(pc);lo,hi=struct.unpack('<II',raw)
   if rel:assert rel['type']==8 and lo==0
   value=hi if rel else struct.unpack('<Q',raw)[0]
   f=next((f for f in fs if f['start']==value),None)
   if f:roots.append(f.get('ordinal',f.get('index')))
   slots.append({'offset':i*8,'role':label,'raw':raw.hex(),'relocation':rel,'value':value,'function':f})
  assert slots[1]['value']==24 and slots[2]['value']==8 and slots[5]['value']==up
  tables.append({'side':side,'table':object(e,addr,88),'slots':slots,'upcast_table':object(e,up,32),'extent_basis':'Three layout entries, two formatting entries, one Display upcast pointer, five Error method entries; no adjacent object bytes included.'})
  vroot[side]=roots
 def closure(e,fs,roots):
  starts={f['start']:i for i,f in enumerate(fs)};seen=set();todo=list(roots)
  while todo:
   i=todo.pop()
   if i in seen:continue
   seen.add(i)
   for x in fs[i]['direct_calls']:assert x['target'] in starts;todo.append(starts[x['target']])
  selected=[fs[i] for i in sorted(seen)]
  return {'roots':roots,'functions':selected,'count':len(selected),'direct_calls':sum(len(f['direct_calls'])for f in selected),'indirect_calls':[{'caller':f['start'],**x}for f in selected for x in f['indirect_calls']],'data_references':[{'caller':f['start'],**x}for f in selected for x in f['data_references']],'limit':'Complete direct-call closure plus explicitly decoded StringError vtable targets. Other indirect targets and arbitrary data-object extents remain unresolved; 64-byte samples do not establish full objects.'}
 oc=closure(o,of,[17,18,20,153,281]+vroot['original']);cc=closure(c,cf,[72,73,74,75,88]+vroot['candidate'])
 # Concrete first-write data objects, each exactly eight bytes.
 disc=[]
 for account,oa,ca in [('tracker',757517,406645),('debouncer',757573,406685),('distribution',757557,406669),('receipt',757589,406693)]:
  a,z=object(o,oa,8),object(c,ca,8);assert a['hex']==z['hex'];disc.append({'account':account,'original':a,'candidate':z,'equal':True})
 def string(e,pcs,tail):return b''.join(e.at(pc,16)[4:8]+e.at(pc,16)[12:16]for pc in pcs)+e.at(tail,8)[4:8]
 assert string(o,[645424,645400,645376],645448)==string(c,[1984,1960,1936],2008)==b'failed to write whole buffer'
 incoming={}
 for side,fs,targets in [('original',of,[of[i]['start']for i in [17,18,20,153,256,281]]),('candidate',cf,[cf[i]['start']for i in [1,72,73,74,75,88]])]:
  incoming[side]=[{'target':t,'callers':[{'caller':f['start'],'caller_id':f.get('ordinal',f.get('index')),**x}for f in fs for x in f['direct_calls']if x['target']==t]}for t in targets]
 rows=J('inputs/build06/serializer-fields.json')
 for r in rows:
  for f in r['fields']:
   assert any(x['pc']==f['original_pc']and x['target']==651064 for x in of[r['original_ordinal']]['direct_calls'])
   pc=f['candidate_pc'];rel=c.relocations.get(pc)
   assert (rel and rel['type']==10 and rel['symbol']=='sol_memcpy_') or any(x['pc']==pc and x['target']==62424 for x in cf[r['candidate_index']]['direct_calls'])
 summary={'original_sha256':H((b/'original.so').read_bytes()),'candidate_sha256':H((b/'candidate.so').read_bytes()),'symbols_sha256':H((b/'unstripped.so').read_bytes()),'original_windows':len(of),'candidate_windows':len(cf),'expanded_original_closure':oc['count'],'expanded_candidate_closure':cc['count'],'original_indirect_sites':len(oc['indirect_calls']),'candidate_indirect_sites':len(cc['indirect_calls']),'original_data_refs':len(oc['data_references']),'candidate_data_refs':len(cc['data_references']),'source_inputs':len(J('inputs/build06/launcher/resolved-source-sha256.json')),'field_sites':sum(len(r['fields'])for r in rows),'full_serializer_matches':0,'writer_normalized_equal':True,'allocator_and_deallocator_raw_equal':True,'error_new_normalized_equal':True,'constructor_complete_equal':False,'StringError_drop_equal':False,'type_id_equal':False,'new_runtime_executions':0,'new_source_changes':0,'decision':'No allocator/inlining/type-id source change justified. Review the owned framework error and caller propagation as a separate source hypothesis.'}
 result={'function-comparisons.json':comparisons,'StringError-vtables.json':tables,'expanded-original-closure.json':oc,'expanded-candidate-closure.json':cc,'discriminators.json':disc,'incoming-calls.json':incoming,'summary.json':summary}
 # Entire bodies, not excerpts, for selected pairs and the owned error producer.
 for side,e,fs,inds in [('original',o,of,sorted(set([x[1]for x in pairs]+[296,297]))),('candidate',c,cf,sorted(set(x[2]for x in pairs)))]:
  for i in inds:
   f=fs[i];result[f'disassembly/{side}-{i}.asm']=render(e,f['start'],f['end'])
 return result
if __name__=='__main__':
 for n,v in generate().items():
  q=P/n;q.parent.mkdir(parents=True,exist_ok=True);q.write_text(v if isinstance(v,str) else json.dumps(v,sort_keys=True,indent=2)+'\n')
 print((P/'summary.json').read_text())
