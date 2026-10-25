#!/usr/bin/env python3
"""Portable negative checks of the immutable inventory gate; no target execution."""
from pathlib import Path
import hashlib,json,shutil,subprocess,sys,tempfile
P=Path(__file__).resolve().parent
cases=[('candidate','pump/inputs/current/candidate.so','tamper'),('source','fees/inputs/source/programs/pump-fees/src/donation.rs','tamper'),('analysis_tool','pump/analyze.py','tamper'),('ledger','fees/ledgers/catalog.json.gz','tamper'),('missing_symbols','pump/inputs/current/symbols.so','missing')]
with tempfile.TemporaryDirectory(prefix='static-layer-negative-')as t:
 q=Path(t)/'package';shutil.copytree(P,q);rows=[]
 for name,path,action in cases:
  f=q/path;original=f.read_bytes()
  if action=='missing':f.unlink()
  else:f.write_bytes(original+b'\nintentional_negative_test\n')
  r=subprocess.run([sys.executable,'-B',str(q/'verify.py')],cwd=t,capture_output=True,text=True)
  assert r.returncode!=0,(name,'unexpected acceptance')
  assert path in r.stderr or ('map entries' in r.stderr and action=='missing'),(name,r.stderr)
  rows.append({'case':name,'path':path,'action':action,'rejected':True,'returncode':r.returncode,'stderr_sha256':hashlib.sha256(r.stderr.encode()).hexdigest()});f.write_bytes(original)
 r=subprocess.run([sys.executable,'-B',str(q/'verify.py')],cwd=t,capture_output=True,text=True);assert r.returncode==0,r.stderr
 print(json.dumps({'status':'PASS','original_manifest_sha256':hashlib.sha256((P/'manifest-sha256.json').read_bytes()).hexdigest(),'isolated_copy_restored_positive':json.loads(r.stdout),'negative_cases':rows,'builds':0,'target_executions':0},sort_keys=True))
