from pathlib import Path
import json,hashlib,shutil,subprocess,os,gzip
W=Path(__file__).resolve().parent;R=W.parents[1];P=R/'repro/pump_fees/legacy-caller-v144';T=W/'portable-current-test';C=T/'repo';C.mkdir(parents=True);Q=C/'repro/pump_fees/legacy-caller-v144';Q.parent.mkdir(parents=True);shutil.copytree(P,Q)
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text());PY=str(R/'work/test-env/bin/python')
for n in ['source-sha256.json','build-helper-sha256.json','documentation-sha256.json','published-harness-sha256.json','published-focused-harness-sha256.json','published-focused-inputs-sha256.json','runtime-inputs.json']:
 for rel,h in J(P/n).items():
  assert H(R/rel)==h;d=C/rel;d.parent.mkdir(parents=True,exist_ok=True)
  if not d.exists():shutil.copy2(R/rel,d)
subprocess.run(['git','init','-q',str(C)],check=True);subprocess.run(['git','-C',str(C),'add','.'],check=True)
(T/'empty-cwd').mkdir();seal=H(P/'manifest-sha256.json');results=[]
def check(name,expected,runtime=False,current=False):
 cmd=[PY,'-B',str(Q/'verify.py')]+(['--runtime']if runtime else[])+(['--current-main','--repo',str(C)]if current else[])
 p=subprocess.run(cmd,cwd=T/'empty-cwd',env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
 (T/(name+'.stdout')).write_text(p.stdout);(T/(name+'.stderr')).write_text(p.stderr)
 row={'name':name,'returncode':p.returncode,'expected_success':expected,'passed':(p.returncode==0)==expected,'stdout_sha256':H(T/(name+'.stdout')),'stderr_sha256':H(T/(name+'.stderr'))};results.append(row);(W/'portable-current-results.json').write_text(json.dumps({'package_manifest_sha256':seal,'scope':'Minimal tracked copied repository; no external work/cache paths. No ELF bytes modified.','tests':results},indent=2)+'\n');assert row['passed'],row;print(name,'PASS',flush=True)
def reseal():
 m={str(p.relative_to(Q)):H(p)for p in sorted(Q.rglob('*'))if p.is_file()and str(p.relative_to(Q))not in['manifest-sha256.json','MANIFEST.sha256']};(Q/'manifest-sha256.json').write_text(json.dumps(m,indent=2,sort_keys=True)+'\n');(Q/'MANIFEST.sha256').write_text(H(Q/'manifest-sha256.json')+'  manifest-sha256.json\n')
check('copied-current-runtime',True,True,True)
f=Q/'pump_fees_candidate.so';f.rename(T/'temporarily-missing-candidate.so');check('missing-candidate',False);(T/'temporarily-missing-candidate.so').rename(f)
f=C/'programs/pump-fees/src/sharing_update.rs';b=f.read_bytes();f.write_bytes(b+b'\n');check('changed-current-source',False,current=True);f.write_bytes(b)
f=Q/'source-sha256.json';b=f.read_bytes();d=J(f);d['programs/pump-fees/src/sharing_update.rs']='0'*64;f.write_text(json.dumps(d)+'\n');reseal();check('wrong-text-binding-resealed',False);f.write_bytes(b);reseal()
f=Q/'focused20.json.gz';b=f.read_bytes();d=json.loads(gzip.decompress(b));d['cases'][0]['match']=False;f.write_bytes(gzip.compress((json.dumps(d)+'\n').encode(),mtime=0));reseal();check('changed-receipt-resealed',False);f.write_bytes(b);reseal()
assert H(P/'manifest-sha256.json')==seal and H(Q/'manifest-sha256.json')==seal
print('PASS all main-package tests; original package and ELF files unchanged',flush=True)
