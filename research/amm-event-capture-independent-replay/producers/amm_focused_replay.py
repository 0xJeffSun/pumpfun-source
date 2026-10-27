from pathlib import Path
import json,subprocess,time,hashlib,sys
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');B=Path('/home/ahi200/pumpfun-work/20261027-amm-event-replay');P=R/'repro/pump_amm/account-context-recovery-20261027';PY='/home/ahi200/pumpfun-work/20261027-fidelity/runtime-venv/bin/python'
P=R/'repro/pump_amm/guard-data-recovery-20261027'
out=B/'latest-focused';out.mkdir(exist_ok=False);candidate=B/'builds/latest-proposal/candidate.so';observer=R/'repro/pump_amm/owner6048-v144/runtime/observe_suite.py';rows=[]
for name in ['sell','buy']:
 script=P/('probe_'+name+'_events.py');cmd=[PY,'-B',str(observer),str(out/(name+'-transactions.json.gz')),str(script),'--candidate',str(candidate),'--output',str(out/(name+'.json'))]
 start=time.time()
 with (out/(name+'.log')).open('wb') as f:r=subprocess.run(cmd,cwd=R,stdout=f,stderr=subprocess.STDOUT)
 row={'name':name,'command':cmd,'returncode':r.returncode,'seconds':time.time()-start};rows.append(row)
 assert r.returncode==0
 data=json.loads((out/(name+'.json')).read_text());assert data['mismatch_count']==0;row['cases']=data['case_count'];print(row['name'],row['cases'],'passed',flush=True)
(out/'execution.json').write_text(json.dumps(rows,indent=2)+'\n')
