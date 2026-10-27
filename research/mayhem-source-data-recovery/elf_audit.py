from pathlib import Path
from collections import Counter,defaultdict
import hashlib,importlib.util,json,sys

P=Path(__file__).resolve().parent;R=P.parents[1];symbols_path=Path(sys.argv[1]).resolve();candidate_path=Path(sys.argv[2]).resolve();output=Path(sys.argv[3]).resolve()
spec=importlib.util.spec_from_file_location('elf',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py')
elf=importlib.util.module_from_spec(spec);spec.loader.exec_module(elf)
original=elf.Elf(R/'evidence/original/mayhem/deployed.so')
candidate=elf.Elf(candidate_path)
symbols=elf.Elf(symbols_path)
sha=lambda x:hashlib.sha256(x).hexdigest()
key=lambda x:(x['end']-x['start'],x['normalized_sha256'],json.dumps(x['normalization_pattern'],sort_keys=True))
rows=json.loads((R/'research/mayhem-full-curve-recovery/audit.json').read_bytes())['rows']
counterparts=defaultdict(list);raw=set()
for a,b in {(s['value'],s['value']+s['size'])for s in symbols.symbols if s['info']&15==2 and s['size']>=8 and symbols.lo<=s['value']<symbols.hi}:
 w=symbols.window(a,b);counterparts[key(w)].append(a);raw.add(w['raw_sha256'])
matched=[];unmatched=[];raw_rows=[]
for row in rows:
 w=original.window(row['start'],row['end'])
 if key(w)in counterparts:matched.append({'id':row['id'],'original':row['start'],'bytes':row['bytes'],'candidate_starts':counterparts[key(w)]})
 else:unmatched.append({'id':row['id'],'original':row['start'],'bytes':row['bytes']})
 if w['raw_sha256']in raw:raw_rows.append(row['id'])
sections=[]
for name in sorted(set(original.sec)|set(candidate.sec)):
 a,b=original.sec.get(name),candidate.sec.get(name)
 def describe(e,s):
  if s is None:return None
  return {k:s[k]for k in ['offset','address','size','alignment','type','flags']}|{'sha256':sha(e.b[s['offset']:s['offset']+s['size']])}
 sections.append({'name':name,'original':describe(original,a),'candidate':describe(candidate,b),'same_bytes':a is not None and b is not None and original.b[a['offset']:a['offset']+a['size']]==candidate.b[b['offset']:b['offset']+b['size']]})
result={'original_sha256':sha(original.b),'candidate_sha256':sha(candidate.b),'symbols_sha256':sha(symbols.b),'whole_file_equal':original.b==candidate.b,'original_bytes':len(original.b),'candidate_bytes':len(candidate.b),'original_header':original.header,'candidate_header':candidate.header,'sections':sections,'relocation_types_original':dict(Counter(x['type']for x in original.relocations)),'relocation_types_candidate':dict(Counter(x['type']for x in candidate.relocations)),'function_windows':len(rows),'normalized_matched':len(matched),'raw_local_matched':len(raw_rows),'normalized_matched_bytes':sum(x['bytes']for x in matched),'unmatched_body_bytes':sum(x['bytes']for x in unmatched),'unmatched_bodies':unmatched,'matched_windows':matched,'blockers':['The remaining unmatched bodies must first be recreated from source; normalized matches still mask call addresses and declared relocations.','Function order, size, alignment, entry offset and section contents differ; complete linker/layout reproduction is still required.','Typed data checks cover selected Source records, vtables and constants; unresolved extents and indirect dispatch remain outside whole-ELF proof.','The accepted experimental build combines an unmodified Mac compiler with official Linux target libraries; a native Linux full-build reproduction remains a distinct provenance task.'],'scope':'Measured stripped ELF and full original-window inventory only. No binary patching, new masks or output edits.'}
output.write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items()if k not in ['sections','matched_windows','original_header','candidate_header']},indent=2))
