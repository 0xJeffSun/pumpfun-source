from pathlib import Path
import json,gzip,hashlib,sys
W=Path(__file__).resolve().parent
p=W/'runtime-01/incentives_sync.json'
if not p.exists():p=Path(str(p)+'.gz')
raw=p.read_bytes();raw=gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw;d=json.loads(raw);old=json.loads((W/'baseline-log-evidence.json').read_text());expected={r['case_index']:r['original_nochange_messages']for r in old['nochange_rows']};assert len(expected)==113 and d['case_count']==222
rows=[]
for i,c in enumerate(d['cases']):
 o=[x for x in c['original'].get('logs',[])if 'No changes in accumulator for user='in x];n=[x for x in c['candidate'].get('logs',[])if 'No changes in accumulator for user='in x]
 assert o==n==expected.get(i,[]),(i,o,n,expected.get(i,[]))
 if o:rows.append({'case_index':i,'exact_messages':o})
assert len(rows)==113 and not d['mismatches']
result={'status':'PASS','case_count':222,'existing_message_cases':113,'candidate_sha256':d['candidate_sha256'],'receipt_raw_sha256':hashlib.sha256(raw).hexdigest(),'baseline_log_evidence_sha256':hashlib.sha256((W/'baseline-log-evidence.json').read_bytes()).hexdigest(),'exact_original_candidate_messages':rows,'new_cases':0,'target_executions':0}
if '--verify'in sys.argv:assert json.loads((W/'nochange-log-verification.json').read_text())==result
else:(W/'nochange-log-verification.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items()if k!='exact_original_candidate_messages'}))
