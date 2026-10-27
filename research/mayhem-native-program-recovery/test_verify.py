"""Negative controls reject resealed source and case-coverage changes."""
from pathlib import Path
import gzip,hashlib,json,shutil,subprocess,sys,tempfile
P=Path(__file__).resolve().parent;R=P.parents[1]
def seal(p):
 (p/'manifest.json').write_text(json.dumps({f.relative_to(p).as_posix():hashlib.sha256(f.read_bytes()).hexdigest()for f in p.rglob('*')if f.is_file()and f.name!='manifest.json'and'__pycache__'not in f.parts},indent=2,sort_keys=True)+'\n')
for case in ['vendor-id-check','duplicate-case']:
 with tempfile.TemporaryDirectory(prefix='native-program-negative-',dir=R/'work')as td:
  q=Path(td);shutil.copytree(P,q,dirs_exist_ok=True)
  if case=='vendor-id-check':
   f=q/'sources/vendor/anchor-lang/src/accounts/program.rs.gz';b=gzip.decompress(f.read_bytes());old=b'if info.key != &T::id() {';assert old in b;f.write_bytes(gzip.compress(b.replace(old,b'if false && info.key != &T::id() {'),mtime=0))
  else:
   f=q/'runtime/vendor-native.json.gz';d=json.loads(gzip.decompress(f.read_bytes()));d['cases'][-1]=d['cases'][0];f.write_bytes(gzip.compress(json.dumps(d).encode(),mtime=0))
  seal(q);r=subprocess.run([sys.executable,'-B',str(q/'verify.py')],capture_output=True,text=True);assert r.returncode!=0 and'AssertionError'in r.stderr,(case,r.stdout,r.stderr)
  print('PASS rejects',case)
