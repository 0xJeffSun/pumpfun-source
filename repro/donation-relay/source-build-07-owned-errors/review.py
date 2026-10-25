from pathlib import Path
import json,struct
from analyze import Elf
from disasm import render
P=Path(__file__).resolve().parent

def generate():
 original=json.loads((P/'original-function-ledger.json').read_text());candidate=json.loads((P/'candidate-function-ledger.json').read_text())
 previous={r['ordinal']:r for r in json.loads((P/'previous/match-ledger.json').read_text())};current=json.loads((P/'match-ledger.json').read_text())
 delta={'gained_normalized_originals':[r for r in current if r['normalized_candidate_indices']and not previous[r['ordinal']]['normalized_candidate_indices']],'lost_normalized_originals':[r for r in current if not r['normalized_candidate_indices']and previous[r['ordinal']]['normalized_candidate_indices']]}
 o=Elf((P/'original.so').read_bytes());c=Elf((P/'candidate.so').read_bytes())
 selected_o=[r for r in original if r['ordinal']in[17,18,20,125,153,158,279,281,282,285,286,288,289,290,296,297,298]]
 selected_c=[r for r in candidate if any(k in ' '.join(r['names'])for k in ['generated_exit','error_report'])]
 writer=[r for r in current if r['ordinal']==281][0];assert len(writer['normalized_candidate_indices'])==1
 write=[r for r in candidate if any('generated_exit11write_error' in n for n in r['names'])];assert len(write)==1;w=write[0]
 # Fresh candidate operand witnesses: code3004 at AnchorError+152 and
 # 160-byte aligned heap reservation; these are not full allocator/CFG proofs.
 stores=[];reserve=[]
 for pc in range(w['start'],w['end'],8):
  op,regs,off,imm=struct.unpack('<BBhi',c.at(pc,8))
  if op==0x62 and off==152 and imm==3004:stores.append({'pc':pc,'raw_hex':c.at(pc,8).hex(),'base_register':regs&15})
  if op==7 and imm==-160:reserve.append({'pc':pc,'raw_hex':c.at(pc,8).hex(),'register':regs&15})
 assert len(stores)==1 and len(reserve)==1
 data={'delta':delta,'writer_original':writer,'source_owned_error_constructor':w,'fresh_3004_stores':stores,'fresh_160_byte_reservations':reserve,'original_roots':selected_o,'candidate_roots':selected_c,'limits':['Selected source/operand observations do not prove complete CFG, allocator, data or transitive equivalence.','Full serializer, name, logging, conversion bodies remain unequal.','Normalized equality is not byte identity or security sign-off.']}
 out={'owned-error-review.json':data}
 for side,e,rows,key in [('original',o,selected_o,'ordinal'),('candidate',c,selected_c,'index')]:
  for r in rows:out['disassembly/'+side+'-'+str(r[key])+'.asm']=render(e,r['start'],r['end'])
 return out
if __name__=='__main__':
 for n,v in generate().items():
  q=P/n;q.parent.mkdir(parents=True,exist_ok=True);q.write_text(v if isinstance(v,str)else json.dumps(v,indent=2,sort_keys=True)+'\n')
