#!/usr/bin/env python3
"""Read-only corrected call/data review for the actual build06 output."""
import importlib.util,json,struct,hashlib
from pathlib import Path
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('elf6',P/'analyze.py');a=importlib.util.module_from_spec(s);s.loader.exec_module(a)
H=lambda b:hashlib.sha256(b).hexdigest()
def J(n):return json.loads((P/n).read_text())
def review():
 of=J('original-function-ledger.json');cf=J('candidate-function-ledger.json');old=J('previous/match-ledger.json');new=J('match-ledger.json');o=a.Elf((P/'original.so').read_bytes());c=a.Elf((P/'unstripped.so').read_bytes())
 def closure(fs,roots):
  starts={f['start']:i for i,f in enumerate(fs)};seen=set();todo=roots[:];missing=[]
  while todo:
   i=todo.pop()
   if i in seen:continue
   seen.add(i)
   for x in fs[i]['direct_calls']:
    if x['target'] in starts:todo.append(starts[x['target']])
    else:missing.append({'caller':i,**x})
  return {'roots':roots,'function_indices':sorted(seen),'functions':[fs[i] for i in sorted(seen)],'unresolved_direct_targets':missing,'scope':'complete direct-call closure; candidate88 is whole just-swap wrapper; indirect targets and arbitrary data extents remain unresolved'}
 oc=closure(of,[17,18,20,153,281]);cc=closure(cf,[72,73,74,75,88]);assert not oc['unresolved_direct_targets']and not cc['unresolved_direct_targets']
 w=cf[72];assert w['bytes']==of[281]['bytes']==288 and w['normalized_sha256']==of[281]['normalized_sha256'];assert w['raw_sha256']!=of[281]['raw_sha256']
 def loc(e,address):
  b=e.at(address,24);r=e.relocations[address];assert r['type']==8;lo,ptr,n,line,col=struct.unpack('<IIQII',b);assert lo==0
  return {'address':address,'raw_hex':b.hex(),'relocation':r,'encoded_address_high_word':ptr,'filename_bytes':n,'filename':e.at(ptr,n).decode(),'line':line,'column':col,'interpretation':'RELATIVE type8 raw object stores pointer addend in high32; raw bytes differ until interpreted with relocation; no binary edits'}
 ol,cl=loc(o,774960),loc(c,422184);assert [(z['filename'],z['line'],z['column']) for z in [ol,cl]]==[('src/bpf_writer.rs',28,9)]*2
 # Reconstruct string immediates in original/new error constructors.
 def string(e,pcs,tail):return b''.join(e.at(pc,16)[4:8]+e.at(pc,16)[12:16] for pc in pcs)+e.at(tail,8)[4:8]
 om=string(o,[645424,645400,645376],645448);cm=string(c,[1984,1960,1936],2008);assert om==cm==b'failed to write whole buffer'
 def literal(e,address,n):return {'address':address,'bytes':n,'hex':e.at(address,n).hex(),'sha256':H(e.at(address,n))}
 # First format-piece pointer+length from the add-overflow panic table.
 def panic_piece(e,address):
  b=e.at(address,16);assert e.relocations[address]['type']==8;lo,ptr,n=struct.unpack('<IIQ',b);assert lo==0
  return {'descriptor':literal(e,address,16),'relocation':e.relocations[address],'pointed_literal':literal(e,ptr,n)}
 op,cp=panic_piece(o,778704),panic_piece(c,425136);assert op['pointed_literal']['hex']==cp['pointed_literal']['hex']
 ext=[]
 for e,pc in [(o,651224),(c,62584)]:
  r=e.relocations[pc];assert r['type']==10 and r['symbol']=='sol_memcpy_';ext.append({'pc':pc,'raw_hex':e.at(pc,8).hex(),'relocation':r})
 rows=[]
 for name,oi,ci,widths,opcs,cpcs in [
  ('tracker',18,73,[8,1,1,32,32,16],[15160,15384,15456,15512,15568,15656],[63280,63392,63496,63672,63768,63864]),
  ('debouncer',17,75,[8,1,1,32,32,8],[14208,14432,14504,14560,14616,14688],[66136,66248,66352,66528,66624,66704]),
  ('distribution',20,74,[8,1,1,32,32,16,8],[16896,17120,17192,17248,17304,17392,17464],[64672,64784,64888,65064,65160,65248,65328]),
  ('receipt',153,88,[8,1,32,8],[465816,466304,466360,466432],[197760,197848,197976,198184])]:
  fields=[];pos=0
  for width,oldpc,pc in zip(widths,opcs,cpcs):
   assert any(x['pc']==oldpc and x['target']==651064 for x in of[oi]['direct_calls'])
   r=c.relocations.get(pc)
   if r and r['type']==10:assert r['symbol']=='sol_memcpy_';kind='inlined writer direct memcpy syscall'
   else:assert any(x['pc']==pc and x['target']==62424 for x in cf[ci]['direct_calls']);kind='complete writer72 call'
   fields.append({'offset':pos,'bytes':width,'original_pc':oldpc,'candidate_pc':pc,'candidate_kind':kind});pos+=width
  rows.append({'account':name,'original_ordinal':oi,'candidate_index':ci,'original_bytes':of[oi]['bytes'],'candidate_bytes':cf[ci]['bytes'],'fields':fields,'whole_body_normalized_equal':of[oi]['normalized_sha256']==cf[ci]['normalized_sha256']})
 delta=[]
 for x,y in zip(old,new):
  assert x['ordinal']==y['ordinal'];before='raw' if x['raw_candidate_indices'] else 'normalized' if x['normalized_candidate_indices'] else 'unmatched';after='raw' if y['raw_candidate_indices'] else 'normalized' if y['normalized_candidate_indices'] else 'unmatched'
  if before!=after:delta.append({'ordinal':x['ordinal'],'start':x['start'],'bytes':x['bytes'],'before':before,'after':after,'new_candidate_indices':y['normalized_candidate_indices']})
 comparisons=[]
 for oi,ci,role in [(281,72,'writer'),(256,1,'WriteZero constructor'),(449,257,'add-overflow panic helper')]:
  comparisons.append({'role':role,'original':of[oi],'candidate':cf[ci],'raw_equal':of[oi]['raw_sha256']==cf[ci]['raw_sha256'],'normalized_equal':of[oi]['normalized_sha256']==cf[ci]['normalized_sha256'],'positional_residuals':a.residual(o.at(of[oi]['start'],of[oi]['bytes']),c.at(cf[ci]['start'],cf[ci]['bytes']))})
 return {'writer-comparison.json':{'functions':comparisons,'writer_external_imports':ext,'writer_source_locations':[ol,cl],'error_text':om.decode(),'error_text_original_pcs':[645424,645400,645376,645448],'error_text_candidate_pcs':[1984,1960,1936,2008],'panic_first_literal':[op,cp],'limits':'writer complete normalized shape + import/source-location equality; its error target differs and entire panic/error/transitive data closure is not proved'},'serializer-fields.json':rows,'closure-original.json':oc,'closure-candidate.json':cc,'before-after-window-delta.json':delta,'review-summary.json':{'original_closure_windows':len(oc['functions']),'candidate_closure_windows':len(cc['functions']),'original_indirect_sites':sum(len(f['indirect_calls'])for f in oc['functions']),'candidate_indirect_sites':sum(len(f['indirect_calls'])for f in cc['functions']),'original_data_refs':sum(len(f['data_references'])for f in oc['functions']),'candidate_data_refs':sum(len(f['data_references'])for f in cc['functions']),'field_sites':sum(len(r['fields'])for r in rows),'writer_normalized_equal':True,'writer_raw_equal':False,'writer_error_target_equal':False,'whole_serializer_matches':0,'new_runtime_cases':0,'status_changes':delta}}
if __name__=='__main__':
 for n,v in review().items():(P/n).write_text(json.dumps(v,sort_keys=True,indent=2)+'\n')
 print((P/'review-summary.json').read_text())
