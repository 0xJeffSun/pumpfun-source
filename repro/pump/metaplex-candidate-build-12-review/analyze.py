"""Read-only complete Utilize and full-text insertion alignment; no executable bytes are rewritten."""
from pathlib import Path
import collections,difflib,hashlib,json,struct,sys
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/dependencies/token_metadata/deployed.so').is_file())
from elf_reader import Elf
H=lambda b:hashlib.sha256(b).hexdigest()
PATHS={'original':'evidence/dependencies/token_metadata/deployed.so','candidate11':'repro/pump/metaplex-candidate-build-11/token_metadata.so','candidate12':'@package/candidate12.so'}
LO=236632;HI=241736;INSERT=238840

def decode(e,lo,hi):
 out=[];at=lo
 while at<hi:
  raw=e.b[at:at+8];op,regs,off,imm=struct.unpack('<BBhi',raw);size=16 if op==0x18 else 8
  row=dict(file_offset=at,body_offset=at-lo,raw=e.b[at:at+size].hex(),opcode=op,dst=regs&15,src=regs>>4,displacement=off,immediate=imm,size=size)
  if size==16:row['u64']=(imm&0xffffffff)|(struct.unpack_from('<I',e.b,at+12)[0]<<32)
  if at in e.calls:row['call_target']=e.calls[at]
  if (op&7) in [5,6] and op not in [0x85,0x95]:row['branch_target']=at+8+off*8
  if at in e.relocations:row['relocation']=e.relocations[at]
  out.append(row);at+=size
 assert at==hi
 return out

def analyze():
 es={k:Elf(P/v[len('@package/'):] if v.startswith('@package/') else ROOT/v) for k,v in PATHS.items()};O=es['original'];A=es['candidate11'];B=es['candidate12']
 assert [x for x in O.entries if LO<=x<=HI]==[LO,HI]
 assert [x for x in B.entries if LO<=x<=HI+8]==[LO,HI+8]
 def mapping(at):return at+8 if INSERT<=at<O.hi else at
 def transform_compatible(x,y):
  reasons=[]
  # Compare fields, except relative address encodings whose target must map.
  for key in ['opcode','dst','src','size','immediate']:
   if key=='immediate' and ('call_target' in x or 'u64' in x):continue
   if x[key]!=y[key]:reasons.append(key)
  if 'branch_target'in x:
   if y.get('branch_target')!=mapping(x['branch_target']):reasons.append('branch_target')
  elif x['displacement']!=y['displacement']:reasons.append('displacement')
  if 'call_target'in x and y.get('call_target')!=mapping(x['call_target']):reasons.append('call_target')
  if x.get('relocation')!=y.get('relocation'):reasons.append('relocation')
  if 'u64' in x:
   wanted=mapping(x['u64']) if x.get('relocation',{}).get('type')==8 else x['u64']
   if wanted!=y.get('u64'):reasons.append('u64')
  return reasons
 fullO=decode(O,O.lo,O.hi);fullB=decode(B,B.lo,B.hi);dictB={r['file_offset']:r for r in fullB};changes=[]
 for x in fullO:
  y=dictB[mapping(x['file_offset'])];why=transform_compatible(x,y)
  if why:changes.append(dict(original=x,candidate12=y,differing_fields=why))
 mapped_offsets={mapping(x['file_offset']) for x in fullO}
 extras=[r for r in fullB if r['file_offset'] not in mapped_offsets]
 bodies={name:decode(e,LO,HI+(8 if name=='candidate12' else 0)) for name,e in es.items()}
 sections=[]
 for name,e in es.items():
  padded=e.b+bytes(len(O.b)-len(e.b));dif=[i for i in range(len(O.b)) if O.b[i]!=padded[i]]
  per={}
  for n,s in O.secs.items():
   if not n or s[1]==8:continue
   start,length=s[4:6];per[n]=sum(O.b[i]!=padded[i] for i in range(start,start+length))
  sections.append(dict(name=name,bytes=len(e.b),sha256=H(e.b),payload_bytes=len(padded),payload_sha256=H(padded),different_bytes=len(dif),first_difference=next(iter(dif),None),text_bytes=e.hi-e.lo,per_original_section=per))
 # Align direct call identity by the measured file insertion, not ordinal guessing.
 calls={}
 for name,rows in bodies.items():
  calls[name]=[dict(file_offset=r['file_offset'],body_offset=r['body_offset'],target=r['call_target']) for r in rows if 'call_target'in r]
 original_targets=collections.Counter(c['target'] for c in calls['original'])
 mapped_targets=collections.Counter(mapping(c['target']) for c in calls['original'])
 oldset=collections.Counter(c['target'] for c in calls['candidate11']);newset=collections.Counter(c['target'] for c in calls['candidate12'])
 relocs={name:[dict(file_offset=at,body_offset=at-LO,**rel) for at,rel in e.relocations.items() if LO<=at<HI+(8 if name=='candidate12' else 0)] for name,e in es.items()}
 # Account for every loader relocation and the remaining source-coordinate bytes.
 mapped_relocations={(mapping(at),r['type'],r['symbol']) for at,r in O.relocations.items()}
 candidate_relocations={(at,r['type'],r['symbol']) for at,r in B.relocations.items()}
 data_lo,data_size=O.secs['.data.rel.ro'][4:6];covered=set();pointer_changes=[]
 for at,r in O.relocations.items():
  if not data_lo<=at<data_lo+data_size:continue
  old=struct.unpack_from('<Q',O.b,at)[0];new=struct.unpack_from('<Q',B.b,at)[0]
  if old!=new:
   expected=(mapping(old>>32)<<32)|(old&0xffffffff)
   pointer_changes.append(dict(file_offset=at,original_raw=O.b[at:at+8].hex(),candidate12_raw=B.b[at:at+8].hex(),original_pointer=old>>32,candidate12_pointer=new>>32,mapped_equal=expected==new));covered.update(range(at,at+8))
 remaining=[dict(file_offset=i,original=O.b[i],candidate11=A.b[i],candidate12=B.b[i]) for i in range(data_lo,data_lo+data_size) if O.b[i]!=B.b[i] and i not in covered]
 data_alignment=dict(all_mapped_relocations_equal=mapped_relocations==candidate_relocations,relocation_count=len(mapped_relocations),shifted_pointer_slots=pointer_changes,remaining_coordinate_bytes=remaining,coordinate_residual_unchanged_from11=all(r['candidate11']==r['candidate12'] for r in remaining),entrypoint_mapping_equal=mapping(struct.unpack_from('<Q',O.b,24)[0])==struct.unpack_from('<Q',B.b,24)[0],function_entries_mapping_equal=[mapping(x) for x in O.entries]==B.entries)
 guard={name:[r for r in rows if 238800<=r['file_offset']<239000] for name,rows in bodies.items()}
 result=dict(scope='Independent static three-artifact comparison; no builds, VM, transactions or executable mutations',inputs=PATHS,artifacts=sections,body_ranges={name:[LO,HI+(8 if name=='candidate12' else 0)] for name in es},body_counts={name:dict(bytes=HI-LO+(8 if name=='candidate12' else 0),instructions=len(rows),slots=sum(r['size']//8 for r in rows),calls=len(calls[name]),branches=sum('branch_target'in r for r in rows),sha256=H(es[name].b[LO:HI+(8 if name=='candidate12' else 0)])) for name,rows in bodies.items()},insertion=dict(file_offset=INSERT,bytes=8,scope='In-memory address correspondence only, never written into an executable'),full_text_alignment=dict(original_instructions=len(fullO),candidate12_instructions=len(fullB),changed_original_instructions=changes,inserted_candidate_instructions=extras),calls=calls,original_vs_candidate11_call_multisets_equal=original_targets==oldset,original_vs_candidate12_mapped_call_multisets_equal=mapped_targets==newset,body_relocations=relocs,guard_and_cleanup=guard,data_and_relocation_alignment=data_alignment,
 conclusions=dict(predicted1479_byte_fix_disproved=True,candidate12_accepted=False,original_complete_body_equal=False,byte_identity=False))
 return result,bodies

if __name__=='__main__':
 result,bodies=analyze()
 if '--write'in sys.argv:
  (P/'result.json').write_text(json.dumps(result,indent=2)+'\n');(P/'complete-body-decode.json').write_text(json.dumps(bodies,indent=2)+'\n')
 else:
  assert result==json.loads((P/'result.json').read_text());assert bodies==json.loads((P/'complete-body-decode.json').read_text())
 print(json.dumps(dict(verified=True,changed_full_text_instructions=len(result['full_text_alignment']['changed_original_instructions']),inserted_instructions=len(result['full_text_alignment']['inserted_candidate_instructions']),different_bytes={r['name']:r['different_bytes'] for r in result['artifacts']},call_multiset_mapped_equal=result['original_vs_candidate12_mapped_call_multisets_equal']),indent=2))
