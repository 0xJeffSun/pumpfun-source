"""Audit retained full-suite receipts and independently verify actual signatures.

The full-suite observations bind executed programs and transactions. Most suite
receipts do not carry transaction bytes, so this is not a cryptographic binding
of every account snapshot to its transaction. Focused triples provide that link.
"""
from pathlib import Path
from collections import Counter
import base64,gzip,hashlib,json,re,sys
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda name:json.loads(gzip.decompress((HERE/'runtime-all'/name).read_bytes()))
summary=read('summary.json.gz');progress=read('progress.json.gz')
assert len(progress)==summary['suites']==25
expected=json.loads((HERE/'builds/candidate/result.json').read_bytes())['candidate_sha256']
original=sha((HERE.parents[1]/'evidence/original/pump_amm/deployed.so').read_bytes())
assert summary['candidate_sha256']==expected and summary['original_sha256']==original
totals=Counter();details=[]
norm=lambda logs:[s for s in logs if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',s)]
for item in sorted(progress,key=lambda x:x['suite']):
 name=item['suite'];raw=gzip.decompress((HERE/'runtime-all'/(name+'.json.gz')).read_bytes());report=json.loads(raw)
 assert sha(raw)==item['receipt_sha256'] and item['returncode']==0
 assert report['candidate_sha256']==expected and report['original_sha256']==original
 assert not report['mismatches'] and report['case_count']==item['case_count']
 counts=Counter()
 def walk(value):
  if isinstance(value,list):
   for v in value:walk(v)
  elif isinstance(value,dict):
   if isinstance(value.get('original'),dict) and isinstance(value.get('candidate'),dict):
    a,b=value['original'],value['candidate'];assert a.keys()==b.keys()
    assert all(a[k]==b[k] for k in a if k!='logs'),name
    counts['pairs']+=1
    counts['noncompute_log_differences']+=norm(a.get('logs',[]))!=norm(b.get('logs',[]))
   else:
    for v in value.values():walk(v)
 walk(report['cases']);assert counts['pairs']==report['case_count']
 sidecar=HERE/'runtime-all'/(name+'-transactions.json.gz');assert sha(sidecar.read_bytes())==item['sidecar_sha256']
 observed=json.loads(gzip.decompress(sidecar.read_bytes()))
 harness=next(p for p in item['command'] if '/scripts/' in p and p.endswith('.py'))
 relative='scripts/'+harness.split('/scripts/',1)[1]
 assert observed['script_sha256']==summary['harness_sha256'][relative]
 if 'script_sha256' in report:assert observed['script_sha256']==report['script_sha256']
 assert observed['observer_sha256']==summary['observer_sha256']
 for row in observed['transactions']:
  raw=base64.b64decode(row['transaction_base64']);checks=Transaction.from_bytes(raw).verify_with_results()
  assert checks and all(checks) and row['all_signatures_verified']
  assert row['transaction_sha256']==sha(raw) and row['signature_count']==len(checks)
  assert row['amm_program_sha256'] in [original,expected]
  assert row['loaded_programs']['pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA']['sha256']==row['amm_program_sha256']
  for program in row['loaded_programs'].values():assert observed['program_file_sha256'][program['path']]==program
  counts['transactions']+=1;counts['signatures']+=len(checks)
 assert counts['transactions']==observed['transaction_count']==item['transactions']
 assert counts['signatures']==observed['signature_count']==item['signatures']
 totals.update(counts);details.append({'suite':name,**counts})
assert totals['pairs']==summary['cases']==17462
assert totals['transactions']==summary['transactions']==35074
assert totals['signatures']==summary['signatures']==35418
result={'totals':dict(totals),'functional_mismatches':0,'suites':details,'candidate_sha256':expected,'original_sha256':original,'scope':__doc__}
if '--write' in sys.argv:(HERE/'runtime-all/audit.json').write_bytes((json.dumps(result,indent=2)+'\n').encode())
else:assert result==json.loads((HERE/'runtime-all/audit.json').read_bytes())
print('PASS full suites:',dict(totals),'zero compared non-log differences',flush=True)
