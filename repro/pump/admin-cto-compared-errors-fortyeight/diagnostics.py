"""Retain raw saved-log differences; no normalization or target invocation."""
from pathlib import Path
import json,gzip,hashlib
R=Path(__file__).resolve().parents[2];P=Path(__file__).resolve().parent;O=R/'work/pump-admin-cto-6030-2006-runtime';W=O/'repo/work/pump-admin-cto-error-batch-build';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b)if b[:2]==b'\x1f\x8b'else b)
receipts=[];differences=[];counts={}
def compare(a,b,path,meta):
 if isinstance(a,dict)and isinstance(b,dict):
  for k in sorted(set(a)&set(b)):
   if k in ['logs','logMessages','log_messages']and isinstance(a[k],list)and isinstance(b[k],list):
    counts['paired_log_arrays']=counts.get('paired_log_arrays',0)+1
    if a[k]!=b[k]:differences.append({**meta,'json_path':path+'/'+k,'original':a[k],'candidate':b[k]})
   else:compare(a[k],b[k],path+'/'+k,meta)
 elif isinstance(a,list)and isinstance(b,list):
  for i,(x,y)in enumerate(zip(a,b)):compare(x,y,path+'/'+str(i),meta)
def walk(v,path,meta):
 if isinstance(v,dict):
  if 'original'in v and'candidate'in v:compare(v['original'],v['candidate'],path,{**meta,'case':v.get('case')})
  for k,x in v.items():walk(x,path+'/'+k,meta)
 elif isinstance(v,list):
  for i,x in enumerate(v):walk(x,path+'/'+str(i),meta)
for row in read(W/'differential/run.json'):
 p=W/'differential'/(row['suite']+'.json.gz');meta={'kind':'differential','suite':row['suite'],'path':str(p.relative_to(W)),'sha256':H(p)};receipts.append(meta);walk(read(p),'',meta)
for row in read(W/'surfpool/run.json'):
 directory=O/'repo'/row['output'];found=[p for p in directory.glob('pump-*-transactions.json')if isinstance(read(p),dict)and'signed_transactions'in read(p)and'candidate_sha256'in read(p)];assert len(found)==1;p=found[0];meta={'kind':'surfpool','suite':row['name'],'path':str(p.relative_to(W)),'sha256':H(p)};receipts.append(meta);walk(read(p),'',meta)
p=W/'nested-differential.json.gz';meta={'kind':'differential','suite':'nested_general','path':str(p.relative_to(W)),'sha256':H(p)};receipts.append(meta);walk(read(p),'',meta)
left=read(W/'route-original/summary.json');right=read(W/'route-candidate/summary.json');meta={'kind':'differential','suite':'general_route','summary_sha256':H(W/'route-candidate/summary.json')};receipts.append(meta)
for x,y in zip(left['rows'],right['rows']):compare(read(W/'route-original'/x['file']),read(W/'route-candidate'/y['file']),'',{**meta,'case':x['case']})
assert len(receipts)==68
out={'scope':'Complete unnormalized raw saved log-array differences for unchanged68 receipt domains; presence is not a functional mismatch or diagnostic identity claim. No arrays removed/normalized.','receipt_domains':receipts,'counts':counts,'raw_difference_rows':len(differences),'differences':differences}
(P/'raw-diagnostic-differences.json.gz').write_bytes(gzip.compress((json.dumps(out,separators=(',',':'))+'\n').encode(),mtime=0));print(json.dumps({'receipt_domains':len(receipts),'paired_log_arrays':counts.get('paired_log_arrays'),'raw_difference_rows':len(differences)}))
