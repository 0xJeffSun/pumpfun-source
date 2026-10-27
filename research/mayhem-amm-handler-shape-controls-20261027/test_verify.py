"""Corruption controls for source and compiler-output evidence."""
from pathlib import Path
import gzip,hashlib,json,shutil,subprocess,sys,tempfile
P=Path(__file__).resolve().parent
def seal(p):
 (p/'manifest.json').write_text(json.dumps({f.relative_to(p).as_posix():hashlib.sha256(f.read_bytes()).hexdigest()for f in p.rglob('*')if f.is_file()and f.name!='manifest.json'},indent=2)+'\n')
def change(p,n,fn):
 f=p/n;v=json.loads(f.read_bytes());fn(v);f.write_text(json.dumps(v,indent=2)+'\n')
def source(p):
 change(p,'base-source-inputs.json',lambda x:x.update({'src/state.rs':'0'*64}))
def binary(p):
 f=p/'controls/root-sell-inline-current/candidate.so.gz';b=bytearray(gzip.decompress(f.read_bytes()));b[5000]^=1;f.write_bytes(gzip.compress(b,mtime=0))
checks=[('source',source,True),('artifact',binary,True),('false gain',lambda p:change(p,'report.json',lambda x:x.update(accepted_new_windows=1)),True),('missing control',lambda p:change(p,'controls.json',lambda x:x.pop()),True),('extra flag',lambda p:change(p,'controls/baseline/launch.json',lambda x:x['flags'].append('-Copt-level=0')),True),('extra file',lambda p:(p/'extra').write_text('unexpected'),False),('symlink',lambda p:(p/'link').symlink_to(p/'README.md'),False)]
with tempfile.TemporaryDirectory(prefix='mayhem-shape-tests-')as td:
 root=Path(td)/'packet'
 for label,fn,reseal in checks:
  shutil.copytree(P,root);fn(root)
  if reseal:seal(root)
  r=subprocess.run([sys.executable,'-B',str(P/'verify.py'),'--packet',str(root)],capture_output=True,text=True)
  assert r.returncode!=0,(label,'accepted');print(label,'rejected',flush=True);shutil.rmtree(root)
 r=subprocess.run([sys.executable,'-O','-B',str(P/'verify.py')],capture_output=True,text=True)
 assert r.returncode!=0 and 'verification requires assertions'in r.stderr
 print('optimized Python rejected')
