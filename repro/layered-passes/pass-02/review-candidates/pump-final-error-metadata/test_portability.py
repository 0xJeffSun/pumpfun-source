"""Copied-directory verification and integrity/cryptographic negative checks only."""
from pathlib import Path
import base64,gzip,hashlib,json,shutil,subprocess,tempfile,sys
W=Path(__file__).resolve().parent;P=W/'handoff';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();PYTHON=W.parents[1]/'work/test-env/bin/python'
# Resolve configured accepted interpreter independently of the copied artifact.
R=next(p for p in W.parents if(p/'evidence/original/pump/deployed.so').is_file());PYTHON=R/'work/test-env/bin/python'
results=[]
def run(label,p,success):
 r=subprocess.run([str(PYTHON),'-B',str(p/'verify.py')],cwd='/',text=True,capture_output=True);(W/(label+'.stdout')).write_text(r.stdout);(W/(label+'.stderr')).write_text(r.stderr)
 row={'label':label,'returncode':r.returncode,'expected_success':success,'result_as_expected':(r.returncode==0)==success,'stdout_sha256':hashlib.sha256(r.stdout.encode()).hexdigest(),'stderr_sha256':hashlib.sha256(r.stderr.encode()).hexdigest()};results.append(row);assert row['result_as_expected'],r.stdout+r.stderr
 print(json.dumps(row),flush=True)
def reseal(p):
 m={f.relative_to(p).as_posix():{'sha256':H(f),'bytes':f.stat().st_size}for f in sorted(p.rglob('*'))if f.is_file()and f not in[p/'manifest.json',p/'manifest.sha256']}
 (p/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');(p/'manifest.sha256').write_text(H(p/'manifest.json')+'  manifest.json\n')
with tempfile.TemporaryDirectory(prefix='pump-error-portable-')as temp:
 t=Path(temp);good=t/'positive';shutil.copytree(P,good);run('portable-positive',good,True)
 missing=t/'missing';shutil.copytree(P,missing);(missing/'candidate.so').unlink();run('portable-negative-missing',missing,False)
 bad=t/'signature';shutil.copytree(P,bad);f=bad/'nested-differential.json.gz';data=json.loads(gzip.decompress(f.read_bytes()));tx=bytearray(base64.b64decode(data['cases'][0]['candidate']['transaction_base64']));tx[10]^=1;data['cases'][0]['candidate']['transaction_base64']=base64.b64encode(tx).decode();f.write_bytes(gzip.compress((json.dumps(data,separators=(',',':'))+'\n').encode(),mtime=0))
 binding=json.loads((bad/'receipt-bindings.json').read_text())
 for row in binding:
  if row['path']==f.name:row['sha256']=H(f)
 (bad/'receipt-bindings.json').write_text(json.dumps(binding,indent=2)+'\n');reseal(bad);run('portable-negative-resealed-signature',bad,False)
(W/'portability-results.json').write_text(json.dumps({'tested_original_manifest_sha256':H(P/'manifest.json'),'tests':results,'scope':'Copied outside repository and executed with cwd=/; no VM/build/network. Negative signature case reseals transport hashes to require substantive saved-signature rejection.'},indent=2)+'\n')
