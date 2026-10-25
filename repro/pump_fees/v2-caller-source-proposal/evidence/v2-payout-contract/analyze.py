"""Static witnesses only. Never executes a captured program or writes ELF bytes."""
from pathlib import Path
import json, struct, hashlib
from elf_reader import Elf
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def analyze():
 ledger=json.loads((P/'inputs/full-function-inventory.json').read_text())
 es={k:Elf(P/'inputs'/f'{k}.so') for k in ['original','candidate','symbols']}
 rows={k:{r['start']:r for r in ledger[k+'_rows']} for k in ['original','candidate']}
 assert es['candidate'].b[es['candidate'].lo:es['candidate'].hi]==es['symbols'].b[es['symbols'].lo:es['symbols'].hi]
 for k in rows: assert H(es[k].b)==ledger['inputs'][k]['sha256']
 # Preserve the complete prior inventory without reclassifying its rows. Only
 # decode owned roots, business callees, and their immediate dependencies.
 roots={'original':[211408,199072,75880,219376,225920,236240,548160,568848,564232,234096,240088,41248], 'candidate':[517160,74088,70560,67216,271472]}
 opaque={231576,68904}
 result={'scope':'Static impacted windows; original boundaries inferred, not recovered function names.', 'opaque_edges':[], 'windows':{},'input_hashes':{k:H(e.b) for k,e in es.items()}}
 def decode(e,start,end):
  out=[];pc=start
  while pc<end:
   op,regs,off,imm=struct.unpack_from('<BBhi',e.b,pc);size=16 if op==24 else 8
   q={'pc':pc,'raw':e.b[pc:pc+size].hex(),'opcode':op,'dst':regs&15,'src':regs>>4,'offset':off,'immediate':imm}
   if op==24:q['value']=struct.unpack_from('<I',e.b,pc+4)[0]|struct.unpack_from('<I',e.b,pc+12)[0]<<32
   if pc in e.calls:q['call_target']=e.calls[pc]
   if pc in e.relocations:q['relocation']=e.relocations[pc]
   if op&7 in (5,6) and op not in (0x85,0x95,0x8d):q['branch_target']=pc+8+8*off
   out.append(q);pc+=size
  assert pc==end
  return out
 for k in rows:
  selected=set(roots[k])
  for a in roots[k]:
   for dep in rows[k][a]['dependencies']['direct']:
    t=dep['target']
    if t in opaque:result['opaque_edges'].append({'side':k,'pc':dep['pc'],'target':t});continue
    if t in rows[k]:selected.add(t)
  ws=[];e=es[k]
  for a in sorted(selected):
   r=rows[k][a];z=r['end'];assert H(e.b[a:z])==r['raw_sha256'];assert H(e.normalized[a:z])==r['normalized_sha256']
   ins=decode(e,a,z)
   data=[]
   for q in ins:
    if q.get('relocation',{}).get('type')==8 and 'value' in q:
     t=q['value'];n=min(96,max(0,len(e.b)-t))
     data.append({'pc':q['pc'],'address':t,'preview_length':n,'preview_hex':e.b[t:t+n].hex(),'extent_proven':False})
   other='candidate' if k=='original' else 'original';matches=[]
   for b,rr in rows[other].items():
    zz=rr['end']
    if zz-b==z-a and es[other].normalized[b:zz]==e.normalized[a:z]:
     matches.append({'start':b,'raw_equal':es[other].b[b:zz]==e.b[a:z],'normalization_only_not_call_or_data_closure':True})
   ws.append({'start':a,'end':z,'raw_sha256':r['raw_sha256'],'normalized_sha256':r['normalized_sha256'],'prior_status':r['status'],'instructions':ins,'all_direct_edges':r['dependencies']['direct'],'external_edges':r['dependencies']['external'],'bounded_data_previews':data,'complete_body_matches':matches})
  result['windows'][k]=ws
 result['whole_file_equal']=es['original'].b==es['candidate'].b
 # Machine-check concrete branch sequence and wire anchors cited in report.
 o=es['original'];c=es['candidate']
 edges={217544:75880,217776:199072,219040:219376,218720:236240,218792:225920,219280:225920,219192:19528,237408:548160,548424:568848,548736:564232,550512:724336,230392:500928,230528:500928}
 for pc,t in edges.items():assert o.calls[pc]==t
 for pc,t in {526488:74088,526760:70560,527296:271472,527456:271472}.items():assert c.calls[pc]==t
 assert struct.unpack_from('<h',o.b,217714)[0]*8+217720==218984
 assert o.b[217712]==0x15
 assert struct.unpack_from('<I',o.b,548356)[0]|struct.unpack_from('<I',o.b,548364)[0]<<32==0x9f0844f44f13cbff
 flags=[]
 for q in decode(o,568848,571320):
  if q['opcode']==0x6a and q['offset']>=32 and (q['offset']-32)%34==0:flags.append(q['immediate'])
 assert flags==[257,0,0,0,256,0,0,0,256,0,0,0]
 result['verified_anchors']={'original_edges':{str(k):v for k,v in edges.items()},'fixed_cpi_meta_flag_words':flags,'wire_discriminator_hex':'ffcb134ff444089f','cpi_argument':1,'wire_argument_evidence_pc':237400}
 result['limits']=['No build, execution, new fixture or input-space proof.','Full prior inventory is retained unchanged; normalized matches do not prove targets or data.','Preprocessing edge at 231576 remains opaque; no decoding in impacted witness.','Bounded relocated data previews are not proven literal extents or transitive closure.','No source patch: ownership/result variants and nonzero-quote contract remain insufficient for an exact replacement.']
 return result
if __name__=='__main__': print(json.dumps(analyze(),sort_keys=True,indent=2))
