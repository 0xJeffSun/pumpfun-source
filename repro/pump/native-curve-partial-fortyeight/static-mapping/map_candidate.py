from pathlib import Path
import hashlib,json,sys
P=Path(__file__).resolve().parent;R=P.parents[1]
sys.path.insert(0,str(P));import extract as x
from elf_reader import Elf
C=Elf(R/'repro/pump/holder-nested-fortytwo/candidate.so');S=Elf(R/'repro/pump/holder-nested-fortytwo/unstripped.so')
assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi]
index={}
for f in S.funcs:index.setdefault((f['size'],hashlib.sha256(C.normalized[f['start']:f['start']+f['size']]).hexdigest()),[]).append(f)
targets=sorted({c['target'] for c in x.E.callsites(0x5b3b0,x.bound(0x5b3b0)-0x5b3b0)})
rows=[]
for start in targets:
 end=x.bound(start);h=hashlib.sha256(x.E.normalized[start:end]).hexdigest();matches=[]
 for f in index.get((end-start,h),[]):
  if C.pattern(f['start'],f['size'])==x.E.pattern(start,end-start):matches.append(f)
 rows.append({'original_start':start,'bytes':end-start,'normalized_instruction_and_relocation_matches':matches})
out={'scope':'Read-only normalized whole-window candidate symbol anchors. Call and relocation operands are normalized; an anchor alone does not prove direct-target identity or historical source spelling.','original':x.E.identity(),'candidate':C.identity(),'symbol_source':S.identity(),'symbol_source_text_identical':True,'rows':rows}
(P/'candidate-symbol-anchors.json').write_text(json.dumps(out,indent=2)+'\n')
for r in rows:
 if r['normalized_instruction_and_relocation_matches']:print(hex(r['original_start']),r['bytes'],[(hex(f['start']),f['name']) for f in r['normalized_instruction_and_relocation_matches']])
