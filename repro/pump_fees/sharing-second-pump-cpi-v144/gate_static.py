from pathlib import Path
import json,hashlib,sys
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'analysis/method'));from elf_reader import Elf
J=lambda p:json.loads(p.read_text());C=Elf(P/'candidate.so');S=Elf(P/'symbols.so');O=Elf(P/'analysis/method/inputs/original.so');a=J(P/'analysis/full-function-inventory.json');out=[]
for original,candidate,size in [(552776,377624,3712),(571320,393768,1072),(560200,279016,1400),(556488,381336,3712),(572392,394840,1072)]:
 assert O.normalized[original:original+size]==C.normalized[candidate:candidate+size]and O.pattern(original,size)==C.pattern(candidate,size)
 row=next(x for x in a['candidate_rows']if x['start']==candidate);match=next(x for x in row['matches']if x['start']==original);assert match['all_direct_bodies_supported']and match['unique_calls_consistent'];out.append({'original':[original,original+size],'candidate':[candidate,candidate+size],'all_direct_bodies_supported':True,'immediate_calls':len(match['calls'])})
f=next(x for x in S.funcs if '19pump_fees_candidate25create_fee_sharing_config'in x['name']);calls=[{'pc':pc,'target':target}for pc,target in C.calls.items()if f['start']<=pc<f['start']+f['size']]
assert sum(c['target']==377624 for c in calls)==sum(c['target']==381336 for c in calls)==1
# The two generated calls must retain their success barriers before later work.
barriers={524120:'8510000077b8ffff',524128:'79a390fc00000000',524136:'79a488fc00000000',524144:'5504f50102000000',529000:'85100000e5b7ffff',529008:'79a380fc00000000',529016:'79a478fc00000000',529024:'79a198fa00000000',529032:'550492ff02000000',529040:'5501130000000000'}
for pc,expected in barriers.items():assert C.b[pc:pc+8].hex()==expected,(pc,expected)
assert C.calls[524120]==377624 and C.calls[529000]==381336
(P/'static-gate.json').write_text(json.dumps({'passed':True,'candidate_sha256':hashlib.sha256(C.b).hexdigest(),'application':f,'all_application_immediate_calls':calls,'complete_normalized_helper_matches':out,'caller_success_barrier_instructions':barriers,'original_unattributed_windows':125,'whole_original_equal':False,'recursive_downstream_semantics_proven':False},indent=2)+'\n');print('PASS: two added complete original helpers; both Pump CPI generated APIs now present; prior three matches retained.')
