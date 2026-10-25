from pathlib import Path
import json,gzip,hashlib,re
P=Path(__file__).resolve().parent;S=P/'source';R=P/'replay'
summary=[];diagnostics=[];total=0;txs=0
for a in json.loads((P/'replay-attempts.json').read_text()):
 assert a['returncode']==0
 name=a['name'];f=P/a['output'];f=f/'comparison.json' if name=='burn' else f
 j=json.loads(f.read_text());assert not j['mismatches'],name
 count=j['case_count'];count=count*2 if name=='burn' else count
 total+=count;txs+=j.get('signed_transactions',count*2)
 summary.append({'name':name,'instruction_comparisons':count,'mismatches':0,'receipt':str(f.relative_to(P))})
 for row in j['cases']:
  if row.get('normalized_log_difference'):
   diagnostics.append({'suite':name,'case':row['case'],'original_logs':row['original']['metadata']['logs'],'candidate_logs':row['candidate']['metadata']['logs']})
assert total==9595,total
assert txs==19190,txs
old=json.loads((S/'repro/mayhem/twentyfour/summary.json').read_text())
selected=[]
for name in ['buy-pump-swap-native','buy-pump-swap-token']:
 current=json.loads((R/(name+'.json')).read_text())
 prior_path=P.parents[1]/'repro/mayhem/twentyfour'/f'{name}-differential.json.gz'
 prior=json.loads(gzip.decompress(prior_path.read_bytes()))
 old_by={r['case']['name']:r for r in prior['cases']}
 for row in current['cases']:
  label=row['case']['name'];o=old_by[label]
  if label=='virtual_-122946690720':selected.append({'suite':name,'case':label,'original_logs':row['original']['metadata']['logs'],'old_candidate_logs':o['candidate']['metadata']['logs'],'new_candidate_logs':row['candidate']['metadata']['logs'],'still_log_difference':row['normalized_log_difference']})
report={'candidate_sha256':hashlib.sha256((P/'build01/artifacts/mayhem_recovered.so').read_bytes()).hexdigest(),'instruction_comparisons':total,'signed_transactions':txs,'suites':len(summary),'mismatches':0,'new_unique_cases':0,'rows':summary,'diagnostic_difference_rows':len(diagnostics),'whole_file_equal':False,'main_promoted':False}
(P/'summary.json').write_text(json.dumps(report,indent=2)+'\n')
(P/'diagnostic-differences.json').write_text(json.dumps(diagnostics,indent=2)+'\n')
(P/'selected-before-after-diagnostics.json').write_text(json.dumps(selected,indent=2)+'\n')
print(json.dumps(report))
