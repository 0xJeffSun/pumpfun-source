from pathlib import Path
import concurrent.futures,hashlib,json,subprocess,sys
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if(p/'evidence/original/pump/deployed.so').is_file());names=['analyze_fresh.py','metadata_closure.py','full_inventory.py','match-serializer.py'];H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def run(name):
 cmd=[sys.executable,'-B',str(W/name),'--check'];r=subprocess.run(cmd,text=True,capture_output=True);(W/(name+'.check.stdout')).write_text(r.stdout);(W/(name+'.check.stderr')).write_text(r.stderr);return {'name':name,'sha256':H(W/name),'command':cmd,'returncode':r.returncode,'stdout_sha256':H(W/(name+'.check.stdout')),'stderr_sha256':H(W/(name+'.check.stderr'))}
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:rows=list(pool.map(run,names))
(W/'final-static-checks.json').write_text(json.dumps(rows,indent=2)+'\n');print(json.dumps(rows,indent=2));assert all(r['returncode']==0 for r in rows)
