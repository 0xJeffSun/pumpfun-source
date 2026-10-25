#!/usr/bin/env python3
from pathlib import Path
import json,hashlib,base64,tarfile
P=Path(__file__).resolve().parent;sha=lambda b:hashlib.sha256(b).hexdigest();load=lambda n:json.loads((P/n).read_text());m=load('manifest-sha256.json');actual={str(q.relative_to(P))for q in P.rglob('*')if q.is_file()and q.name!='manifest-sha256.json'};assert actual==set(m)
for n,d in m.items():b=(P/n).read_bytes();assert sha(b)==d['sha256']and len(b)==d['bytes'],n
row=load('00-buy-captured-1000000.json');tx=load('00-buy-captured-1000000.transaction.json');raw=load('00-buy-captured-1000000.raw-result.json');sig=load('saved-signature-check.json');ex=load('execution.json');before=load('bindings-before.json');post=load('post-failure-input-check.json')
assert row['case']==tx['case']==raw['case']and ex['executed_transactions']==1 and ex['accepted_cases']==ex['candidate_transactions']==ex['retries']==0
b=base64.b64decode(row['transaction_base64']);assert sha(b)==row['transaction_sha256']==tx['transaction_sha256']==sig['transaction_sha256']and len(b)==1088
assert row['transaction_base64']==tx['transaction_base64']and row['raw_metadata']==raw['raw_metadata']and row['logs']==raw['logs']and row['after']==raw['after']and row['before']==tx['before']
assert sig['all_signatures_valid']and sig['signature_count']==1 and not row['all_assertions_pass']and 'ProgramFailedToComplete'in row['error']
assert any('consumed 200000 of 200000 compute units'in x for x in row['logs'])and any('exceeded CUs meter at BPF instruction'in x for x in row['logs'])
assert len(row['pump_calls'])==1 and row['pump_calls'][0]['flags']==[1,0,2]and len(row['pump_calls'][0]['accounts'])==28
for k in ['repository_inputs','harness_inputs','runtime_files']:assert before[k]==post[k]
with tarfile.open(P/'frozen-v3-proposal.tar.gz')as t:
 b=t.extractfile('proposal-v3/manifest-sha256.json').read();assert sha(b)==ex['proposal_seal'];inner=json.loads(b)
 for n,d in inner.items():assert sha(t.extractfile('proposal-v3/'+n).read())==d['sha256']
print(json.dumps({'pass':True,'payloads':len(m),'failed_original_executions':1,'accepted_cases':0,'candidate_executions':0,'retry_count':0}))
