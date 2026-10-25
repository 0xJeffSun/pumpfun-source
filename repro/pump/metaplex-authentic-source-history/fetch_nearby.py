from pathlib import Path
import concurrent.futures,hashlib,json,subprocess,urllib.request,os
P=Path(__file__).resolve().parent;R=P.parents[1];C=R/'work/metaplex-utilize-12/source';B='17e99434af5ead3e989c08f32af33609821d0bc0'
inputs=json.loads((R/'repro/pump/metaplex-candidate-build-11/patch-source-inputs.json').read_text());jobs=[]
for name in inputs['patched']:
 for path in [name,name.replace('programs/token-metadata/','token-metadata/',1)]:
  x=subprocess.run(['git','-C',str(C),'log',B,'-3','--format=%H','--',path],capture_output=True,text=True,env=dict(os.environ,GIT_NO_LAZY_FETCH='1'))
  for commit in x.stdout.splitlines():jobs.append((name,path,commit))
def get(t):
 name,path,commit=t;url=f'https://raw.githubusercontent.com/metaplex-foundation/mpl-token-metadata/{commit}/{path}';out=dict(recovered_path=name,commit=commit,path=path,url=url)
 try:
  with urllib.request.urlopen(url,timeout=30) as f:b=f.read()
  h=hashlib.sha256(b).hexdigest();saved='public-source/'+h+'.rs';(P/saved).write_bytes(b);out.update(sha256=h,bytes=len(b),saved=saved,matched_accepted11=h==inputs['patched'][name],matched_baseline=h==inputs['baseline'][name])
 except Exception as e:out['error']=str(e)
 return out
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as e:out=list(e.map(get,jobs))
(P/'nearby-primary-downloads.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps({'requested':len(out),'downloaded':sum('sha256'in x for x in out),'failures':sum('error'in x for x in out),'accepted11_exact_matches':[x['recovered_path']for x in out if x.get('matched_accepted11')]},indent=2))
