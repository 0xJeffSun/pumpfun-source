from pathlib import Path
import json,re
from analyze import Elf,H
from disasm import render
P=Path(__file__).resolve().parent
def generate():
 o=json.loads((P/'original-function-ledger.json').read_text());c=json.loads((P/'candidate-function-ledger.json').read_text());m=json.loads((P/'match-ledger.json').read_text());old=json.loads((P/'previous/match-ledger.json').read_text())
 selected_o=[r for r in o if r['ordinal'] in [16,19,170,171,209,213,216,217,218,281,285,286,288,289,290,296,297,298,346,347,352]]
 selected_c=[r for r in c if any(x in ' '.join(r['names']) for x in ['idl','generated_exit','error_report'])]
 def closure(rows,roots):
  by={r['start']:r for r in rows};seen=set();todo=[r['start'] for r in roots];unresolved=[]
  while todo:
   a=todo.pop()
   if a in seen:continue
   seen.add(a)
   for call in by[a]['direct_calls']:
    if call['target'] not in by:unresolved.append(call)
    else:todo.append(call['target'])
  return {'windows':[by[a] for a in sorted(seen)],'unresolved_direct_calls':unresolved,'indirect_calls':[{**x,'window_start':a} for a in sorted(seen) for x in by[a]['indirect_calls']]}
 backend=[x for x in (P/'attempt/build.stderr').read_text().splitlines() if re.search(r'Stack offset|exceeded max offset|error:|LLVM ERROR|stack frame.*exceed',x,re.I)]
 frames=[{'index':r['index'],'names':r['names'],'start':r['start'],'minimum_direct_r10_offset':min([x['offset'] for x in r['direct_r10_accesses']],default=0),'out_of_range':[x for x in r['direct_r10_accesses'] if x['offset'] < -4096 or x['offset']>=0]} for r in c]
 result={'selected_originals':selected_o,'selected_candidates':selected_c,'original_closure':closure(o,selected_o),'candidate_closure':closure(c,selected_c),'match_delta':{'gained':[r for r in m if r['normalized_candidate_indices']and not old[r['ordinal']]['normalized_candidate_indices']],'lost':[r for r in m if not r['normalized_candidate_indices']and old[r['ordinal']]['normalized_candidate_indices']]},'whitelist_match':m[158],'writer_match':m[281]}
 out={'review.json':result,'stack-observations.json':{'backend_errors':backend,'frames':frames,'limits':'Direct-r10 operand inventory only; derived-pointer accesses are retained in full disassembly rather than assigned invented offsets.'}}
 for side,e,rs,key in [('original',Elf((P/'original.so').read_bytes()),selected_o,'ordinal'),('candidate',Elf((P/'candidate.so').read_bytes()),selected_c,'index')]:
  for r in rs:out['disassembly/'+side+'-'+str(r[key])+'.asm']=render(e,r['start'],r['end'])
 return out
if __name__=='__main__':
 for n,v in generate().items():
  p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(v if isinstance(v,str)else json.dumps(v,indent=2,sort_keys=True)+'\n')
