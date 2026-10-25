from pathlib import Path
import hashlib,json,os,shutil,subprocess,tempfile,time
ROOT=Path(__file__).resolve().parents[1];P=ROOT/'handoff';PY=ROOT.parent/'test-env/bin/python';OUT=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
original_seal=H(P/'manifest-sha256.json')
results=[]
def seal(p):
 m={str(f.relative_to(p)):{'sha256':H(f),'bytes':f.stat().st_size}for f in sorted(p.rglob('*'))if f.is_file()and str(f.relative_to(p))not in['manifest-sha256.json','MANIFEST.sha256']}
 (p/'manifest-sha256.json').write_text(json.dumps(m,sort_keys=True,indent=2)+'\n');(p/'MANIFEST.sha256').write_text(H(p/'manifest-sha256.json')+'  manifest-sha256.json\n')
with tempfile.TemporaryDirectory(prefix='fees-legacy-social-portable-')as tmp:
 p=Path(tmp)/'package';shutil.copytree(P,p)
 def run(name,ok,runtime=False):
  start=time.monotonic();cmd=[str(PY),'-B',str(p/'verify.py')]+(['--runtime']if runtime else[])
  r=subprocess.run(cmd,cwd='/',env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},capture_output=True,text=True)
  row={'name':name,'expected_exit_zero':ok,'returncode':r.returncode,'elapsed_seconds':time.monotonic()-start,'stdout':r.stdout,'stderr':r.stderr,'cwd':'/','package_copied_to_temporary_directory':True}
  results.append(row);assert(r.returncode==0)==ok,row
 run('standalone_saved_runtime_positive',True,True)
 tests=[('candidate_tamper','candidate.so','tamper',False),('source_tamper','source/programs/pump-fees/src/sharing_update.rs','tamper',False),('receipt_tamper','runtime/focused20.json.gz','tamper',False),('harness_missing','runner-repo/scripts/fees_validate_all.py','missing',False),('candidate_resealed_tamper','candidate.so','tamper',True),('source_resealed_tamper','source/programs/pump-fees/src/sharing_update.rs','tamper',True)]
 for name,n,mode,reseal in tests:
  f=p/n;b=f.read_bytes();manifest=(p/'manifest-sha256.json').read_bytes();outer=(p/'MANIFEST.sha256').read_bytes()
  if mode=='missing':f.unlink()
  else:f.write_bytes(bytes([b[0]^1])+b[1:])
  if reseal:seal(p)
  run(name,False)
  f.write_bytes(b);(p/'manifest-sha256.json').write_bytes(manifest);(p/'MANIFEST.sha256').write_bytes(outer)
 assert H(p/'manifest-sha256.json')==original_seal
assert H(P/'manifest-sha256.json')==original_seal
record={'status':'PASS','original_package_manifest_sha256':original_seal,'tests':results,'new_builds':0,'target_executions':0,'scope':'A byte-identical standalone package copied outside the repository, invoked with cwd /; negative tests modify only that copy. Compiler artifacts are not rebuilt and no target transaction is executed.'}
(OUT/'portability-negative-results.json').write_text(json.dumps(record,indent=2,sort_keys=True)+'\n')
print(json.dumps({'status':'PASS','tests':len(results),'manifest_sha256':original_seal}))
