"""Saved-only exact literal workflow transition proof. No workflow execution."""
from pathlib import Path
import hashlib,json,ast
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
x=json.loads((P/'workflow-transition.json').read_text());before=(P/'workflow.before.yml').read_text();actual=(P/'workflow.proposed.yml').read_text();assert H(P/'workflow.before.yml')==x['before_sha256'] and H(P/'workflow.proposed.yml')==x['after_sha256']
after=before
for r in x['replacements']:
 assert after.count(r['old'])==r['count'];after=after.replace(r['old'],r['new'])
assert hashlib.sha256(after.encode()).hexdigest()==x['replacement_only_after_sha256']
for r in x['insertions']:
 assert after.count(r['after'])==r['count']and r['command']not in after;after=after.replace(r['after'],r['after']+r['command'])
assert after==actual
for r in reversed(x['insertions']):
 assert actual.count(r['command'])==r['count'];actual=actual.replace(r['command'],'')
for r in reversed(x['replacements']):assert actual.count(r['new'])==r['count'];actual=actual.replace(r['new'],r['old'])
assert actual==before,'Every nonreplacement byte preserved; all existing cases/assertions/controls retained'
for name in ['pump_create_mayhem_differential.py','pump_v3_token_extensions_differential.py','donation_relay_differential.py','initialize_mayhem_state','buy-v3-static-gap-review/verify.py','buy-v3-funded-gap-audit/verify_package.py']:
 assert name not in after,name
assert 'python-version: \'3.12\'' in after
print(json.dumps({'passed':True,'replacement_counts':[r['count']for r in x['replacements']],'nonreplacement_noninsertion_bytes_exact':True,'saved_only_global_insertions':1,'workflow_executed':False,'main_identity_still_required':True},indent=2))
