from pathlib import Path
import json,gzip,shutil,subprocess,sys,hashlib,base64
W=Path(__file__).resolve().parent; R=W/'runtime-02';V=W/'saved-verification';V.mkdir();(V/'runtime').mkdir()
J=lambda p:json.loads(p.read_text())
for p in R.glob('*.json'):(V/'runtime'/(p.name+'.gz')).write_bytes(gzip.compress(p.read_bytes(),mtime=0))
shutil.copy2(W.parents[1]/'work/fees-v2-caller-build/handoff/verify_prior_saved.py',V/'verify_prior_saved.py')
(V/'candidate.so').symlink_to(W/'candidate.so');(V/'runner-repo').symlink_to(W/'runner-repo')
p=subprocess.run([sys.executable,'-B',str(V/'verify_prior_saved.py')],capture_output=True,text=True);(V/'prior.stdout').write_text(p.stdout);(V/'prior.stderr').write_text(p.stderr);assert p.returncode==0
rows=J(R/'differential.json')['suites']['withdrawal']['cases']; selected=[]
for row in rows:
 c=row['case']
 if c.get('omit') or c['name'].startswith('options-'):
  selected.append({'case':c,'match':row['match'],'original_error':row['original']['error'],'candidate_error':row['candidate']['error'],'original_error_logs':[x for x in row['original']['logs'] if 'Error' in x],'candidate_error_logs':[x for x in row['candidate']['logs'] if 'Error' in x]})
(V/'withdraw-options.json').write_text(json.dumps({'withdrawal_cases':len(rows),'option_matrix_and_omissions':selected,'limits':'Existing account parser can reject incomplete options before application; success of these cases is not direct execution evidence for each newly lazy application constructor.'},indent=2)+'\n')
from solders.transaction import VersionedTransaction
focused=J(R/'focused20.json');counts={'fields':0,'signatures':0}
def visit(x):
 if isinstance(x,dict):
  if isinstance(x.get('transaction_base64'),str):
   raw=base64.b64decode(x['transaction_base64']);tx=VersionedTransaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results());counts['fields']+=1;counts['signatures']+=len(tx.signatures)
  for k,v in x.items():
   if k!='transaction_base64':visit(v)
 elif isinstance(x,list):
  for v in x:visit(v)
visit(focused);(V/'focused-signatures.json').write_text(json.dumps(counts,indent=2)+'\n')
print(p.stdout);print(counts)
