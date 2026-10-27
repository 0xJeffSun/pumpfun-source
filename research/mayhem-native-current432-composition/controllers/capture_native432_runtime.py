from pathlib import Path
import gzip,hashlib,io,json,tarfile
W=Path(__file__).resolve().parent
R=Path('/workspace/scratch/08cb9746963a/pumpfun-body')
P=R/'research/mayhem-native-current432-composition'
B=W.parent/'buy-recovery-publication/research/mayhem-buy-retained-recovery'
H=R/'research/mayhem-historical-macro-linux'
h=lambda b:hashlib.sha256(b).hexdigest()
def put(n,b):
 p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
def js(n,v):put(n,(json.dumps(v,indent=2)+'\n').encode())
def archive(n,files):
 buf=io.BytesIO()
 with tarfile.open(fileobj=buf,mode='w:xz')as tar:
  for name,b in sorted(files.items()):
   info=tarfile.TarInfo(name);info.mode=0o644;info.size=len(b);tar.addfile(info,io.BytesIO(b))
 put(n,buf.getvalue());return {k:h(v)for k,v in files.items()}
runtime=W/'historical-linux432-runtime'
summary=json.loads((runtime/'summary.json').read_bytes());assert len(summary)==6 and sum(x['cases']for x in summary)==2496
inputs={}
for p,mode in [(H/'runtime/inputs.tar.gz','r:gz'),(B/'runtime/harness.tar.xz','r:xz'),(B/'runtime/executed-inputs.tar.xz','r:xz')]:
 with tarfile.open(p,mode)as tar:
  for m in tar:
   assert m.isfile()and not Path(m.name).is_absolute()and '..'not in Path(m.name).parts
   raw=tar.extractfile(m).read()
   if m.name in inputs:assert inputs[m.name]==raw,m.name
   else:inputs[m.name]=raw
for kind in ['rejections','pump-cpi']:
 report=json.loads(gzip.decompress((W/'historical-linux432-initializer-runtime'/(kind+'.json.gz')).read_bytes()))
 for name,digest in report['harness_sha256'].items():
  raw=(W.parent/'pumpfun-current'/name).read_bytes();assert h(raw)==digest,name
  if name in inputs:assert inputs[name]==raw,name
  else:inputs[name]=raw
js('runtime/inputs.json',archive('runtime/inputs.tar.xz',inputs))
files={p.relative_to(runtime).as_posix():p.read_bytes()for p in runtime.rglob('*')if p.is_file()}
assert len(files)==31
js('runtime/trades-files.json',archive('runtime/trades.tar.xz',files))
for kind in ['rejections','pump-cpi']:
 put('runtime/'+kind+'.json.gz',(W/'historical-linux432-initializer-runtime'/(kind+'.json.gz')).read_bytes())
 put('runtime/initializer-'+kind+'-cases.json',(H/'runtime'/('initializer-'+kind+'-cases.json')).read_bytes())
for n in ['historical-linux432-runtime-driver.log','historical-linux432-initializer-runtime.log']:
 put('controllers/'+n,(W/n).read_bytes())
put('controllers/capture_native432_runtime.py',Path(__file__).read_bytes())
print('Retained all31raw trade files and69initializer pairs',flush=True)
