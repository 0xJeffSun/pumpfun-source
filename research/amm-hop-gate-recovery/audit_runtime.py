from pathlib import Path
import json,gzip,hashlib,base64,collections,re
from solders.transaction import Transaction
H=Path(__file__).resolve().parent;report=json.loads(gzip.decompress((H/'runtime/triples.json.gz').read_bytes()));observer=json.loads(gzip.decompress((H/'runtime/observed.json.gz').read_bytes()));sha=lambda b:hashlib.sha256(b).hexdigest();norm=lambda logs:[x for x in logs if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]
hashes={k:v['sha256'] for k,v in report['images'].items()};records=collections.Counter();signatures=0
assert hashes['original']==sha((H.parents[1]/'evidence/original/pump_amm/deployed.so').read_bytes())
for label in ['baseline','candidate']:
 assert hashes[label]==json.loads((H/'builds'/label/'result.json').read_bytes())['candidate_sha256']
for row in observer['transactions']:
 raw=base64.b64decode(row['transaction_base64']);tx=Transaction.from_bytes(raw);checks=tx.verify_with_results();assert checks and all(checks);assert row['transaction_sha256']==sha(raw) and row['signature_count']==len(checks) and row['all_signatures_verified'];assert row['amm_program_sha256'] in hashes.values();assert row['loaded_programs']['pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA']['sha256']==row['amm_program_sha256'];signatures+=len(checks)
 for program in row['loaded_programs'].values():assert observer['program_file_sha256'][program['path']]==program
 records[(sha(raw),row['amm_program_sha256'],row['error'],row['logs_sha256'])]+=1
counts=collections.Counter();logs=collections.Counter();successes=0
assert len(report['cases'])==report['case_count']==735
for row in report['cases']:
 vals=row['results'];o=vals['original'];successes+=o['error'] is None
 for label,value in vals.items():
  raw=base64.b64decode(value['transaction_base64']);checks=Transaction.from_bytes(raw).verify_with_results();assert checks and all(checks);key=(sha(raw),hashes[label],value['error'],sha(json.dumps(value['logs'],separators=(',',':')).encode()));assert records[key]>0;records[key]-=1;counts[label]+=1
  assert all(o[k]==value[k] for k in o if k!='logs'),(row['case'],label)
  logs[label]+=norm(o['logs'])!=norm(value['logs'])
 assert norm(vals['baseline']['logs'])==norm(vals['candidate']['logs'])
remaining=[{'key':list(k),'count':v} for k,v in records.items() if v];result={'cases':735,'matched_observed_transactions':sum(counts.values()),'observed_transactions':len(observer['transactions']),'observed_signature_fields':signatures,'original_successes':successes,'functional_mismatches':0,'candidate_baseline_noncompute_log_mismatches':0,'raw_noncompute_log_mismatches':dict(logs),'unmatched_observer_records':remaining,'hashes':hashes};assert result==json.loads((H/'runtime/audit.json').read_bytes());assert not remaining and signatures==2217;print(json.dumps(result),flush=True)
