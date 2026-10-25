"""Actual-root digest guards and pure transition negatives; never mutate/overlay a root."""
from pathlib import Path
import copy,json
from common import J,digest,sealed
from verify import P,R,workflow_transition
D=J(P/'bindings.json');results=[]
def reject(name,call):
 try:call()
 except AssertionError:results.append({'case':name,'rejected':True});return
 raise AssertionError('Accepted negative: '+name)
for name,path in [('Pump source','programs/pump/src/admin_cto.rs'),('actual status','repro/status.json'),('selected Pump artifact',D['compiled']['pump']['candidate']),('Relay selection','repro/donation-relay/current.json'),('CI preparation helper','scripts/prepare_pump_nested_runtime.py'),('restored old payload',J(P/'restoration-witness.json')['restored_path'])]:reject(name,lambda n=path:digest(R,n,'0'*64))
reject('old f4 package seal',lambda:sealed(R/D['f4_package'],'0'*64))
reject('old latest package seal',lambda:sealed(R/D['latest_package'],'0'*64))
reject('immutable v1 seal',lambda:sealed(R/D['prior_current_companion'],'0'*64))
reject('new incoming guard seal',lambda:sealed(R/D['new_incoming_guard'],'0'*64))
for path in ['programs/donation-relay/src/exit_error.rs','programs/donation-relay/src/idl.rs','programs/donation-relay/source-selected.json','repro/upstream-reconciliation/.gitattributes']:
 reject('new bound '+path,lambda n=path:digest(R,n,'0'*64))
row=next(iter(D['new_incoming_git_blobs'].values()));reject('opaque new incoming blob',lambda:digest(R,row['archive_path'],'0'*64))
reject('immutable v2 seal',lambda:sealed(R/D['prior_v2_companion'],'0'*64))
reject('newest incoming guard seal',lambda:sealed(R/D['newest_incoming_guard'],'0'*64))
reject('newest passive doc',lambda:digest(R,D['newest_passive_doc'],'0'*64))
row3=next(iter(D['newest_incoming_git_blobs'].values()));reject('newest opaque incoming blob',lambda:digest(R,D['newest_incoming_guard']+'/'+row3['archive_path'],'0'*64))
from transition_v2_v3 import workflow_transition as v2transition
v2after=(R/D['prior_v2_companion']/'after-workflow.yml').read_text();v3after=(R/D['prior_v3_companion']/'after-workflow.yml').read_text();assert v2transition(v2after,v3after)==v3after
reject('v2 endpoint retained',lambda:v2transition(v2after,v2after))
reject('v2 to v3 plus extra edit',lambda:v2transition(v2after,v3after+'\n# extra\n'))
reject('immutable v3 seal',lambda:sealed(R/D['prior_v3_companion'],'0'*64))
reject('da404 guard seal',lambda:sealed(R/D['da404_guard'],'0'*64))
for n in D['da404_passive']:reject('da404 passive hash '+n,lambda name=n:digest(R,name,'0'*64))
row4=next(iter(D['da404_incoming'].values()));reject('da404 opaque blob',lambda:digest(R,D['da404_guard']+'/'+row4['archive_path'],'0'*64))
from transition import workflow_transition as v3transition
v4after=(P/'after-workflow.yml').read_text();assert v3transition(v3after,v4after)==v4after
reject('v3 endpoint retained',lambda:v3transition(v3after,v3after))
reject('v3 to v4 plus extra edit',lambda:v3transition(v3after,v4after+'\n#extra\n'))
before=(P/'before-workflow.yml').read_text();after=(P/'after-workflow.yml').read_text();rows=D['workflow']['replacements'];assert workflow_transition(before,after,rows)==after
reject('old workflow retained',lambda:workflow_transition(before,before,rows))
reject('third workflow edit',lambda:workflow_transition(before,after+'\n# extra edit\n',rows))
reject('stopped command reintroduced',lambda:workflow_transition(before,after+'\npython -B repro/pump/buy-v3-funded-gap-audit/verify_package.py --repo-root .\n',rows))
bad=copy.deepcopy(rows);bad[0]['new']=bad[0]['old'];reject('change policy relabeled',lambda:workflow_transition(before,after,bad))
print(json.dumps({'passed':True,'negative_cases':results,'count':len(results),'current_files_mutated':0,'shadow_roots_or_overlays':0,'historical_current_verifiers_executed':0,'crypto_or_target_executions':0},indent=2))
