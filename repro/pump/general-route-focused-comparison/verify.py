#!/usr/bin/env python3
from pathlib import Path
import argparse,json,hashlib,base64,tarfile,re
P=Path(__file__).resolve().parent;sha=lambda b:hashlib.sha256(b).hexdigest();load=lambda n:json.loads((P/n).read_text());p=argparse.ArgumentParser();p.add_argument('--signatures',action='store_true');a=p.parse_args()
m=load('manifest-sha256.json');actual={str(q.relative_to(P))for q in P.rglob('*')if q.is_file()and q.name!='manifest-sha256.json'};assert actual==set(m)
for n,d in m.items():b=(P/n).read_bytes();assert sha(b)==d['sha256']and len(b)==d['bytes'],n
s=load('summary.json');ex=load('execution.json');assert s['stage']=='candidate'and s['all_pass']and s['case_count']==s['transaction_executions']==s['verified_signatures']==16 and len(s['receipt_sha256'])==48
assert ex['paired_comparisons']==16 and ex['candidate_transactions']==ex['original_transactions']==16 and ex['v4_retries']==0
assert s['candidate_sha256']==ex['candidate_sha256']=='5cc1ee21860551e09a4ce1de2d1148f7f4ce22c1fbe0ed7147317c17026c4198'
assert (P/'bindings-before.json').read_bytes()==(P/'bindings-after.json').read_bytes()
for n,h in s['receipt_sha256'].items():assert sha((P/n).read_bytes())==h
with tarfile.open(P/'accepted-original.tar.gz')as t:
 raw=t.extractfile('original-v4-run-01/manifest-sha256.json').read();assert sha(raw)==ex['accepted_original_manifest_sha256'];old=json.loads(raw)
 for n,d in old.items():assert sha(t.extractfile('original-v4-run-01/'+n).read())==d['sha256']
 get=lambda n:json.load(t.extractfile('original-v4-run-01/'+n));os=get('summary.json');ob=get('bindings-after.json');cb=load('bindings-before.json')
 assert {k:v for k,v in cb.items()if k!='candidate'}==ob and os['all_pass']and os['case_count']==16
 raw=t.extractfile('original-v4-run-01/summary.json').read();assert sha(raw)==s['accepted_original_summary_sha256']==ex['accepted_original_summary_sha256']
 for r in s['rows']:
  c=load(r['file']);o=get(r['file']);assert c['case']==o['case']and c['all_assertions_pass']and o['all_assertions_pass']and all(c['assertions'].values())and all(o['assertions'].values())and not r['mismatches']
  for key in ['error','normalized_logs','events','inner','return_data','before','after','pump_calls','token_calls']:assert c[key]==o[key],(r['file'],key)
  for label,d in [('candidate',c),('original',o)]:
   assert d['normalized_logs']==[re.sub(r' consumed [0-9]+ of [0-9]+ compute units',' consumed <CU> of <CU> compute units',x)for x in d['logs']]
   prefix=r['file'][:-5];tx=load(prefix+'.transaction.json')if label=='candidate'else get(prefix+'.transaction.json');raw_result=load(prefix+'.raw-result.json')if label=='candidate'else get(prefix+'.raw-result.json')
   assert d['transaction_base64']==tx['transaction_base64']and d['before']==tx['before']and d['after']==raw_result['after']and d['raw_metadata']==raw_result['raw_metadata']
   b=base64.b64decode(d['transaction_base64']);assert len(b)==1128 and sha(b)==d['transaction_sha256']==tx['transaction_sha256']and d['verified_signature_count']==1
   if a.signatures:
    from solders.transaction import Transaction
    tr=Transaction.from_bytes(b);assert len(tr.signatures)==1 and all(tr.verify_with_results())and len(tr.message.instructions)==2
    first,second=tr.message.instructions;assert str(tr.message.account_keys[first.program_id_index])=='ComputeBudget111111111111111111111111111111'and bytes(first.data).hex()=='02c0270900'and len(first.accounts)==0
    assert str(tr.message.account_keys[second.program_id_index])=='pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'
print(json.dumps({'pass':True,'payloads':len(m),'paired_comparisons':16,'successful_transactions':32,'signatures':32,'candidate_sha256':s['candidate_sha256'],'saved_signatures_rechecked':a.signatures}))
