"""Bounded unauthenticated public provenance reads; no builds or transaction calls."""
import urllib.request,urllib.error,json,hashlib,datetime,concurrent.futures
from pathlib import Path
OUT=Path(__file__).resolve().parent
base='https://api.github.com/repos/solana-labs/solana-program-library/'
queries={
 'release':base+'releases/tags/associated-token-account-v1.1.0',
 'tag-checks':base+'commits/c00194d2257302f028f44a403c6dee95c0f9c3bc/check-runs?per_page=100',
 'best-source-checks':base+'commits/f5ce86d43dd31ddefb96d4e8cdd67dd073dc5dca/check-runs?per_page=100',
 'release-day-actions':base+'actions/runs?created=2022-08-03..2022-08-04&per_page=100',
 'best-source-actions':base+'actions/runs?head_sha=f5ce86d43dd31ddefb96d4e8cdd67dd073dc5dca&per_page=100',
 'release-pr-comments':base+'issues/3427/comments?per_page=100',
}
def fetch(kv):
 name,url=kv;stamp=datetime.datetime.now(datetime.timezone.utc).isoformat();req=urllib.request.Request(url,headers={'Accept':'application/vnd.github+json','User-Agent':'source-provenance-read-only-review'})
 try:
  with urllib.request.urlopen(req,timeout=25) as r:status=r.status;body=r.read();headers=dict(r.headers)
 except urllib.error.HTTPError as e:status=e.code;body=e.read();headers=dict(e.headers)
 except Exception as e:return name,{'url':url,'retrieved_at_utc':stamp,'error':str(e)}
 (OUT/(name+'.json')).write_bytes(body)
 try:j=json.loads(body)
 except Exception:j={}
 summary={'url':url,'retrieved_at_utc':stamp,'status':status,'sha256':hashlib.sha256(body).hexdigest(),'bytes':len(body),'pagination_link':headers.get('Link')}
 if isinstance(j,dict):
  summary.update({k:j[k] for k in ['total_count','message','published_at','created_at','tag_name','target_commitish'] if k in j})
  if 'check_runs' in j:summary['check_runs']=[{k:r.get(k) for k in ['id','name','head_sha','details_url','started_at','completed_at','conclusion']} for r in j['check_runs']]
  if 'workflow_runs' in j:summary['workflow_runs']=[{k:r.get(k) for k in ['id','name','head_sha','html_url','created_at','conclusion']} for r in j['workflow_runs']]
 elif isinstance(j,list):summary['returned_entries']=len(j)
 return name,summary
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:results=dict(ex.map(fetch,queries.items()))
(OUT/'access-record.json').write_text(json.dumps(results,indent=2)+'\n');print(json.dumps(results,indent=2))
