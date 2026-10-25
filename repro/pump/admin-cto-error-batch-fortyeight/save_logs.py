from pathlib import Path
import sys,json
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));import coverage_admin as a
from coverage_owned import code,CODES
v=a.load(P/'differential/admin_cto.json.gz');old=a.load(P.parents[1]/'work/pump-admin-cto-owned6083-build/differential/admin_cto.json.gz');out=[]
for r in v['cases']:
 codes=[n for n in CODES if code(r['original']['error'],n)]
 if codes:
  z={'case':r['case']['name'],'codes':codes}
  for side in ['original','candidate']:z[side]={'error':r[side]['error'],'logs':[l for l in r[side]['logs']if 'Error'in l or 'error'in l]}
  p=next(x for x in old['cases']if x['case']==r['case']);z['baseline']={'error':p['candidate']['error'],'logs':[l for l in p['candidate']['logs']if 'Error'in l or 'error'in l]};out.append(z)
(P/'batch-saved-log-evidence.json').write_text(json.dumps(out,indent=2)+'\n')
f=[f for f in(P/'surfpool/admin_cto').glob('pump-*-transactions.json')if 'signed_transactions'in a.load(f)];assert len(f)==1;s=a.load(f[0]);out=[]
for o,c in zip(s['original'],s['candidate']):
 codes=[n for n in CODES if code(o['error'],n)]
 if codes:out.append({'case':o['case']['name'],'codes':codes,'original':{'error':o['error'],'logs':[l for l in o['logs']if 'Error'in l or 'error'in l]},'candidate':{'error':c['error'],'logs':[l for l in c['logs']if 'Error'in l or 'error'in l]}})
(P/'batch-surfpool-log-evidence.json').write_text(json.dumps(out,indent=2)+'\n')
