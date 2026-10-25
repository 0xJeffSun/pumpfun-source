from pathlib import Path
import json,sys,hashlib
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'analysis/method'));from elf_reader import Elf
J=lambda p:json.loads(p.read_text());O=Elf(P/'analysis/method/inputs/original.so');C=Elf(P/'candidate.so');S=Elf(P/'symbols.so');I=J(P/'analysis/full-function-inventory.json');out=[]
for original,candidate,size in [(552776,377624,3712),(571320,390056,1072),(560200,279016,1400)]:
 assert O.normalized[original:original+size]==C.normalized[candidate:candidate+size]
 assert O.pattern(original,size)==C.pattern(candidate,size)
 r=next(x for x in I['candidate_rows']if x['start']==candidate);m=next(x for x in r['matches']if x['start']==original);assert m['all_direct_bodies_supported'] and m['unique_calls_consistent'];out.append({'original':[original,original+size],'candidate':[candidate,candidate+size],'all_direct_bodies_supported':True,'direct_calls':len(m['calls']),'raw_equal':m['raw_equal']})
assert C.calls[519336]==377624
f=next(x for x in S.funcs if '19pump_fees_candidate25create_fee_sharing_config'in x['name']);assert f['start']==515344
r={'passed':True,'candidate_sha256':hashlib.sha256(C.b).hexdigest(),'application':[f['start'],f['start']+f['size']],'first_typed_cpi_call':519336,'full_normalized_matches':out,'whole_program_identity':False,'recursive_target_semantics_proven':False}
(P/'static-gate.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
