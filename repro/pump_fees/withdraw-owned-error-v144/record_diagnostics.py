from pathlib import Path
import json,gzip
W=Path(__file__).resolve().parent
rows=[]
def scan(v,path):
 if isinstance(v,dict):
  if isinstance(v.get('original'),dict) and isinstance(v.get('candidate'),dict):
   a,b=v['original'],v['candidate']
   for key in ['logs','error','events','inner','return']:
    if key in a and key in b and a[key]!=b[key]:rows.append({'path':path,'field':key,'original':a[key],'candidate':b[key]})
  for k,x in v.items():
   if k not in ['original','candidate']:scan(x,path+'/'+k)
 elif isinstance(v,list):
  for i,x in enumerate(v):scan(x,path+'/'+str(i))
for p in (W/'runtime-02').glob('*.json'):
 if p.name not in ['progress.json','summary.json']:scan(json.loads(p.read_text()),p.name)
counts={}
for r in rows:counts[r['field']]=counts.get(r['field'],0)+1
(W/'diagnostic-differences.json.gz').write_bytes(gzip.compress((json.dumps({'scope':'Raw saved original/candidate field differences; no extra normalization or runtime executions.','counts':counts,'rows':rows},indent=2)+'\n').encode(),mtime=0))
print(counts)
