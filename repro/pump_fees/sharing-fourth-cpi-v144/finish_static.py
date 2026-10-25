from pathlib import Path
import json,hashlib,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'analysis/method'));from elf_reader import Elf
J=lambda p:json.loads(p.read_text());C=Elf(P/'candidate.so');S=Elf(P/'symbols.so');O=Elf(P/'analysis/method/inputs/original.so');a=J(P/'analysis/full-function-inventory.json');out=[]
for original,candidate,size in [(552776,376272,3712),(571320,392416,1072),(560200,277664,1400),(556488,379984,3712),(572392,393488,1072),(579040,402608,3584),(592712,413384,872),(591584,412256,1128)]:
 assert O.normalized[original:original+size]==C.normalized[candidate:candidate+size]and O.pattern(original,size)==C.pattern(candidate,size)
 row=next(x for x in a['candidate_rows']if x['start']==candidate);match=next(x for x in row['matches']if x['start']==original);assert match['all_direct_bodies_supported']and match['unique_calls_consistent'];out.append({'original':[original,original+size],'candidate':[candidate,candidate+size],'all_direct_bodies_supported':True,'immediate_calls':len(match['calls'])})
f=next(x for x in S.funcs if '19pump_fees_candidate25create_fee_sharing_config'in x['name']);calls=[{'pc':pc,'target':target}for pc,target in C.calls.items()if f['start']<=pc<f['start']+f['size']]
for pc,target in [(528352,376272),(533232,379984),(536152,376272),(536464,402608)]:assert C.calls[pc]==target
for pc,raw in [(528376,'5504f50102000000'),(533264,'550492ff02000000'),(533272,'5501130000000000'),(536176,'550426fe02000000'),(536488,'15046efe02000000')]:assert C.b[pc:pc+8].hex()==raw
(P/'static-gate.json').write_text(json.dumps({'passed':True,'candidate_sha256':hashlib.sha256(C.b).hexdigest(),'application':f,'all_application_immediate_calls':calls,'complete_normalized_helper_matches':out,'caller_success_barrier_instructions':{str(pc):C.b[pc:pc+8].hex()for pc in[528376,533264,533272,536176,536488]},'original_unattributed_windows':122,'whole_original_equal':False,'recursive_downstream_semantics_proven':False},indent=2)+'\n');print('PASS: two added complete original helpers; both Pump CPI generated APIs now present; prior three matches retained.')
