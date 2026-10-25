from pathlib import Path
import hashlib,json,subprocess,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;sha=lambda b:hashlib.sha256(b).hexdigest()
inputs=json.loads((W/'input-manifest.json').read_text())
for p,row in inputs['files'].items():
 assert not Path(p).is_absolute()and '..'not in Path(p).parts and not p.endswith('-keypair.json');b=(W/'inputs'/p).read_bytes();assert sha(b)==row['sha256']and len(b)==row['bytes']
r=subprocess.run([sys.executable,'-B',str(W/'analyze.py'),'--verify'],capture_output=True,text=True);assert r.returncode==0,r.stdout+r.stderr
sealed=False
if(W/'manifest.json').exists():
 m=json.loads((W/'manifest.json').read_text());actual=set()
 for p in W.rglob('*'):
  assert not p.is_symlink()and not p.name.endswith('-keypair.json')
  if p.is_file()and p!=W/'manifest.json':actual.add(str(p.relative_to(W)))
 assert actual==set(m['files'])
 for p,row in m['files'].items():
  rel=Path(p);assert not rel.is_absolute()and '..'not in rel.parts;b=(W/rel).read_bytes();assert sha(b)==row['sha256']and len(b)==row['bytes']
 sealed=True
print(json.dumps({'status':'PASS','sealed':sealed,'payload_files':len(m['files'])if sealed else None,'static':json.loads(r.stdout),'build_or_runtime':False},indent=2))
