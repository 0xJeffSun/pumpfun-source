from pathlib import Path
import gzip,hashlib,io,json,tarfile
W=Path(__file__).resolve().parent;R=W.parent/'pumpfun-current'
P=Path('/workspace/scratch/08cb9746963a/pumpfun-body/research/mayhem-current-native-ownership-composition')
D=W/'qualified-current432-historical-buy-runtime'
h=lambda b:hashlib.sha256(b).hexdigest()
def put(n,b):
 p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
def js(n,v):put(n,(json.dumps(v,indent=2)+'\n').encode())
def archive(n,files):
 buf=io.BytesIO()
 with tarfile.open(fileobj=buf,mode='w:xz')as t:
  for name,b in sorted(files.items()):
   i=tarfile.TarInfo(name);i.size=len(b);i.mode=0o644;t.addfile(i,io.BytesIO(b))
 put(n,buf.getvalue());return {k:h(v)for k,v in files.items()}
summary=json.loads((D/'summary.json').read_bytes());assert summary['cases']==486 and summary['independent']['verified_signed_transactions']==972
report=json.loads((D/'buy.json').read_bytes());inputs={}
for n,digest in report['harness_sha256'].items():
 raw=(R/n).read_bytes();assert h(raw)==digest;inputs[n]=raw
commands=json.loads((D/'commands.json').read_bytes())
for n,digest in commands['input_hashes'].items():
 raw=(R/n).read_bytes();assert h(raw)==digest
 if n in inputs:assert inputs[n]==raw
 inputs[n]=raw
n='evidence/original/mayhem/deployed.so';inputs[n]=(R/n).read_bytes()
js('runtime/inputs.json',archive('runtime/inputs.tar.xz',inputs))
files={p.relative_to(D).as_posix():p.read_bytes()for p in D.rglob('*')if p.is_file()};assert len(files)==6
js('runtime/records-files.json',archive('runtime/records.tar.xz',files))
put('controllers/capture_current_ownership_runtime.py',Path(__file__).read_bytes())
put('controllers/runtime-driver.log',(W/'qualified-current432-historical-buy-runtime-driver.log').read_bytes())
put('controllers/first-static-attempt.log',(W/'current-ownership-native-static.log').read_bytes())
print('Captured all six runtime files and seven exact checker inputs',flush=True)
