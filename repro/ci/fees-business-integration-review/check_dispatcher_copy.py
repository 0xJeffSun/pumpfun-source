#!/usr/bin/env python3
from pathlib import Path
import hashlib,json,os,shutil,subprocess,tempfile
W=Path(__file__).resolve().parent;R=W.parents[1];P=R/'repro/pump_fees/donation-business-v144';PY=R/'work/test-env/bin/python';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
groups={n:json.loads((P/n).read_text()) for n in ['source-sha256.json','build-helper-sha256.json','documentation-sha256.json','published-harness-sha256.json','published-focused-harness-sha256.json','runtime-inputs.json']};mapping={}
for m in groups.values():
 for n,h in m.items():
  assert H(R/n)==h and not n.startswith('work/')
  if n in mapping:assert mapping[n]==h
  mapping[n]=h
for n in ['scripts/verify_current_bindings.py','scripts/verify_recovered_builds.py','scripts/compare.py','scripts/analyze.py','repro/status.json']:mapping[n]=H(R/n)
record={'scope':'Execute actual parent dispatcher and saved provenance checker in separate tracked checkout; no build or SBF replay.','package_manifest_sha256':H(P/'manifest-sha256.json'),'inputs_sha256':mapping,'tests':[]}
with tempfile.TemporaryDirectory(prefix='fees-integration-dispatch-') as t:
 T=Path(t);Q=T/'repro/pump_fees/donation-business-v144';shutil.copytree(P,Q)
 for n,h in mapping.items():
  f=T/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes((R/n).read_bytes());assert H(f)==h
 subprocess.run(['git','init','-q',str(T)],check=True);subprocess.run(['git','-C',str(T),'add','--','.'],check=True)
 for label,command in [('actual current dispatcher',[str(PY),'-B',str(T/'scripts/verify_current_bindings.py'),'fees']),('actual status receipt schema',[str(PY),'-B',str(T/'scripts/verify_recovered_builds.py'),'--program','pump_fees'])]:
  p=subprocess.run(command,cwd=T,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},text=True,capture_output=True)
  record['tests'].append({'name':label,'command':[x.replace(str(T),'<copied-checkout>') for x in command],'returncode':p.returncode,'stdout':p.stdout,'stderr':p.stderr});assert p.returncode==0,(label,p.stdout,p.stderr)
 assert not (T/'work').exists()
record['no_work_tree']=True;record['main_index_changed']=False
(W/'dispatcher-copy-verification.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps({'tests':len(record['tests']),'passed':True,'actual_parent_dispatcher_sha256':mapping['scripts/verify_current_bindings.py'],'status_sha256':mapping['repro/status.json']}))
