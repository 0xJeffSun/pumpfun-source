from pathlib import Path
import base64,gzip,hashlib,json
from solders.transaction import Transaction
B=Path('/home/ahi200/pumpfun-work/20261028-fees-causal');D=B/'runtime-after'
O='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
C='7f12e1313a5c6f028f9d124563109a02a6ac630f52d83203f65764c640ab3025'
FEES='pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ'
summary=[]
for summary_file in sorted(D.glob('*-observed.json')):
 name=summary_file.name[:-len('-observed.json')];header=json.loads(summary_file.read_bytes())
 reports={O:[],C:[]};signatures=0
 with gzip.open(D/(name+'-observed.jsonl.gz'),'rt')as f:
  for line in f:
   row=json.loads(line);tx=Transaction.from_bytes(base64.b64decode(row['transaction_base64'],validate=True))
   checks=tx.verify_with_results();assert checks and all(checks)and len(checks)==row['signature_fields'];signatures+=len(checks)
   assert row['fees_sha256']in reports
   for digest in row['loaded_programs'].values():assert digest in {x['sha256']for x in header['loaded_files'].values()}
   reports[row['fees_sha256']].append(row)
 assert len(reports[O])==len(reports[C])and signatures==header['signature_fields']
 assert len(reports[O])*2==header['transactions']
 differences=[];raw_logs=0;program_logs=0
 for i,(o,c)in enumerate(zip(reports[O],reports[C])):
  fields=[k for k in ['transaction_base64','error','before','after','inner','return_data']if o[k]!=c[k]]
  op=[s for s in o['logs']if s.startswith(('Program log:','Program data:','Program return:'))]
  cp=[s for s in c['logs']if s.startswith(('Program log:','Program data:','Program return:'))]
  if op!=cp:program_logs+=1;fields.append('program_logs')
  raw_logs+=o['logs']!=c['logs']
  if fields:differences.append(dict(index=i,fields=fields,original_error=o['error'],candidate_error=c['error'],original_program_logs=op,candidate_program_logs=cp))
 canonical=json.loads((D/(name+'.json')).read_bytes());cases=canonical.get('case_count',len(canonical['cases']))
 assert cases==len(reports[O]);assert not canonical.get('mismatches',canonical.get('failures',[]))
 result=dict(suite=name,cases=cases,transactions=header['transactions'],signature_fields=signatures,extended_differences=differences,raw_log_differences=raw_logs,program_log_differences=program_logs)
 summary.append(result);print(name,cases,'extended differences',len(differences),'raw logs',raw_logs,flush=True)
(B/'runtime-check.json').write_text(json.dumps(summary,indent=2)+'\n')
print('suites',len(summary),'cases',sum(r['cases']for r in summary),'signatures',sum(r['signature_fields']for r in summary),flush=True)
