"""Self-contained saved-evidence replay; requires Solders0.27.1, no compiler or VM."""
from pathlib import Path
import hashlib,json,subprocess,sys,tarfile,tempfile
if not __debug__:raise RuntimeError('Assertions required')
P=Path(__file__).resolve().parent;sha=lambda b:hashlib.sha256(b).hexdigest()
def verify():
 manifest=json.loads((P/'manifest.json').read_text())
 assert {str(p.relative_to(P)):sha(p.read_bytes())for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}==manifest
 assert not any(p.is_symlink()for p in P.rglob('*'))
 with tarfile.open(P/'captures.tar.xz','r:*')as t:
  ms=t.getmembers();assert all(m.isfile()and not m.name.startswith('/')and '..'not in Path(m.name).parts for m in ms)
  assert len({m.name for m in ms})==len(ms);files={m.name:t.extractfile(m).read()for m in ms}
 assert {n:sha(b)for n,b in files.items()}==json.loads((P/'capture-map.json').read_text())
 with tempfile.TemporaryDirectory(prefix='pump-sell-sync-offline-')as td:
  r=Path(td)
  for n,b in files.items():p=r/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
  expected=json.loads(files['qualification.json'])
  x=subprocess.run([sys.executable,'-I','-B',str(r/'qualify_saved.py')],capture_output=True,text=True)
  assert x.returncode==0,x.stderr
  actual=json.loads(x.stdout);assert actual==expected
  assert actual['normalized']==actual['membership']==755 and actual['raw']==131 and actual['frozen_sell_pairs']==115 and actual['signed_records']==238
 return actual
if __name__=='__main__':print(json.dumps(verify(),sort_keys=True))
