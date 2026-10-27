"""Meaningful corruption controls for the qualified Sell composition."""
from pathlib import Path
import gzip,hashlib,json,os,shutil,subprocess,sys,tempfile
P=Path(__file__).resolve().parent

def seal(root):
 d={p.relative_to(root).as_posix():hashlib.sha256(p.read_bytes()).hexdigest()for p in root.rglob('*')if p.is_file()and p!=root/'manifest.json'}
 (root/'manifest.json').write_text(json.dumps(d,indent=2)+'\n')
def json_change(root,name,fn):
 p=root/name;b=p.read_bytes();v=json.loads(gzip.decompress(b)if p.suffix=='.gz'else b);fn(v);b=(json.dumps(v,indent=2)+'\n').encode();p.write_bytes(gzip.compress(b,mtime=0)if p.suffix=='.gz'else b)
def binary(root):
 p=root/'builds/current/candidate.so.gz';b=bytearray(gzip.decompress(p.read_bytes()));b[5000]^=1;p.write_bytes(gzip.compress(b,mtime=0))
def source(root):
 p=root/'overrides/src/state.rs';s=p.read_text();assert 'let _ = retained_basis_points(retained_bps);'in s;p.write_text(s.replace('let _ = retained_basis_points(retained_bps);','let _ = retained_basis_points(0);',1))
checks=[('source',source,True),('artifact',binary,True),('count',lambda r:json_change(r,'inventory.json',lambda d:d['counts'].update({'unmatched':9})),True),('typed reference',lambda r:json_change(r,'analysis/quote-static.json',lambda d:d['candidate_data'][0].update({'bytes':42})),True),('signed input',lambda r:json_change(r,'runtime/current/rejections.json.gz',lambda d:d['cases'][0]['candidate_executions'].clear()),True),('extra file',lambda r:(r/'extra').write_text('unexpected'),False),('special file',lambda r:os.mkfifo(r/'fifo'),False),('symlink',lambda r:(r/'link').symlink_to(r/'README.md'),False)]
with tempfile.TemporaryDirectory(prefix='current-sell-mutation-')as tmp:
 root=Path(tmp)/'packet'
 for label,fn,reseal in checks:
  shutil.copytree(P,root);fn(root)
  if reseal:seal(root)
  result=subprocess.run([sys.executable,'-B',str(P/'verify.py'),'--packet',str(root)],capture_output=True,text=True)
  assert result.returncode!=0,(label,'accepted');print(label,'rejected',flush=True);shutil.rmtree(root)
 result=subprocess.run([sys.executable,'-O','-B',str(P/'verify.py')],capture_output=True,text=True)
 assert result.returncode!=0 and 'verification requires assertions'in result.stderr
 print('optimized Python rejected')
