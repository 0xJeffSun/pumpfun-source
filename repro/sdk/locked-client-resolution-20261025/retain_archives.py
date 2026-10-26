"""Fetch fixed public-registry lock URLs and verify SRI; never extract/execute packages."""
from pathlib import Path
import base64,concurrent.futures,datetime,hashlib,json,urllib.parse,urllib.request
P=Path(__file__).resolve().parent;lock=json.loads((P/'resolution/package-lock.json').read_text());A=P/'archives';A.mkdir(exist_ok=False)
records={}
for name,row in lock['packages'].items():
 if not name:continue
 u=urllib.parse.urlparse(row['resolved']);assert u.scheme=='https'and u.hostname=='registry.npmjs.org'and not u.username and not u.password
 records.setdefault(row['resolved'],{'integrity':row['integrity'],'paths':[]})['paths'].append(name);assert records[row['resolved']]['integrity']==row['integrity']
def fetch(item):
 url,row=item;req=urllib.request.Request(url,headers={'User-Agent':'pumpfun-source-frozen-sdk-audit/1'})
 with urllib.request.urlopen(req,timeout=60)as response:
  assert urllib.parse.urlparse(response.url).hostname=='registry.npmjs.org';data=response.read(50*1024*1024+1);assert len(data)<=50*1024*1024;status=response.status;headers={k:response.headers[k]for k in ['Content-Type','Content-Length','ETag','Last-Modified']if response.headers.get(k)}
 algorithm,digest=row['integrity'].split('-',1);assert algorithm in ['sha512','sha256','sha1'];assert base64.b64encode(hashlib.new(algorithm,data).digest()).decode()==digest
 name=hashlib.sha256(data).hexdigest()+'.tgz';(A/name).write_bytes(data)
 return {'url':url,'lock_paths':row['paths'],'integrity':row['integrity'],'sha256':hashlib.sha256(data).hexdigest(),'sha1':hashlib.sha1(data).hexdigest(),'bytes':len(data),'file':'archives/'+name,'status':status,'headers':headers}
rows=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=6)as pool:
 for row in pool.map(fetch,records.items()):rows.append(row);(P/'archive-receipts.json').write_text(json.dumps({'scope':'Exact newly resolved public npm archives; no install/scripts/JS/RPC/target execution','archives':rows},indent=2)+'\n')
print('Complete archives',len(rows),'locknodes',sum(len(r['lock_paths'])for r in rows),'bytes',sum(r['bytes']for r in rows),flush=True)
