from pathlib import Path
import json,gzip,hashlib,sys
W=Path(__file__).resolve().parent
sys.path.insert(0,str(W/'reference/analysis-method'))
from elf_reader import Elf
O=Elf(W/'reference/analysis-method/inputs/original.so');C=Elf(W/'candidate.so');S=Elf(W/'symbols.so')
shared=min(len(O.b),len(C.b));runs=[];start=0;eq=O.b[0]==C.b[0]
for i in range(1,shared):
 state=O.b[i]==C.b[i]
 if state!=eq:runs.append([start,i,eq]);start=i;eq=state
runs.append([start,shared,eq])
sections=[]
for n in sorted(set(O.secs)|set(C.secs)):
 q={'name':n}
 for label,e in [('original',O),('candidate',C)]:
  if n not in e.secs:q[label]=None;continue
  h=e.secs[n];b=e.b[h[4]:h[4]+h[5]]
  q[label]={'header':list(h),'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b)}
 q['same_header']=q['original'] is not None and q['candidate'] is not None and q['original']['header']==q['candidate']['header']
 q['same_payload']=q['original'] is not None and q['candidate'] is not None and q['original']['sha256']==q['candidate']['sha256']
 sections.append(q)
out={'original_sha256':hashlib.sha256(O.b).hexdigest(),'candidate_sha256':hashlib.sha256(C.b).hexdigest(),'whole_original_equal':O.b==C.b,'whole_symbols_equal':O.b==S.b,'shared_length':shared,'shared_byte_runs_start_end_equal':runs,'original_only_tail':[shared,len(O.b)],'candidate_only_tail':[shared,len(C.b)],'sections':sections,'original_relocations':O.relocations,'candidate_relocations':C.relocations,'scope':'Every byte in both original and candidate accounted for; no normalization.'}
with gzip.open(W/'complete-byte-comparison.json.gz','wt') as f:json.dump(out,f,separators=(',',':'))
print('Full unnormalized byte inventory saved')
