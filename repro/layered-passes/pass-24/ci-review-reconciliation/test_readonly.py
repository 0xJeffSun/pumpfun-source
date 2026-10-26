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
before=(P/'before-workflow.yml').read_text();after=(P/'after-workflow.yml').read_text();rows=D['workflow']['replacements'];assert workflow_transition(before,after,rows)==after
reject('old workflow retained',lambda:workflow_transition(before,before,rows))
reject('third workflow edit',lambda:workflow_transition(before,after+'\n# extra edit\n',rows))
reject('stopped command reintroduced',lambda:workflow_transition(before,after+'\npython -B repro/pump/buy-v3-funded-gap-audit/verify_package.py --repo-root .\n',rows))
bad=copy.deepcopy(rows);bad[0]['new']=bad[0]['old'];reject('change policy relabeled',lambda:workflow_transition(before,after,bad))
print(json.dumps({'passed':True,'negative_cases':results,'count':len(results),'current_files_mutated':0,'shadow_roots_or_overlays':0,'historical_current_verifiers_executed':0,'crypto_or_target_executions':0},indent=2))
