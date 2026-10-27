from pathlib import Path
import gzip,hashlib,io,json,shutil,tarfile
W=Path(__file__).resolve().parent
R=Path('/workspace/scratch/08cb9746963a/pumpfun-body')
P=R/'research/mayhem-current-native-ownership-composition'
B=W.parent/'buy-recovery-publication/research/mayhem-buy-retained-recovery'
H=R/'research/mayhem-historical-macro-linux'
h=lambda b:hashlib.sha256(b).hexdigest()
def put(n,b):
 p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
def js(n,v):put(n,(json.dumps(v,indent=2)+'\n').encode())
def gz(n,b):put(n+'.gz',gzip.compress(b,mtime=0))
def archive(n,files,mode='w:xz'):
 buf=io.BytesIO()
 with tarfile.open(fileobj=buf,mode=mode)as t:
  for name,b in sorted(files.items()):
   i=tarfile.TarInfo(name);i.mode=0o644;i.size=len(b);t.addfile(i,io.BytesIO(b))
 put(n,buf.getvalue());return {k:h(v)for k,v in files.items()}
src=W/'qualified-current432-native-source/programs/mayhem'
base={p.relative_to(src).as_posix():p.read_bytes()for p in src.rglob('*')if p.is_file()}
assert len(base)==67
js('source-inputs.json',archive('source.tar.xz',base))
labels={'parent':W/'qualified-current432-native-build',
        'composed':W/'qualified-current432-historical/build','repeat':W/'qualified-current432-historical/repeat'}
sources={'parent':src,'composed':W/'qualified-current432-historical/programs/mayhem','repeat':W/'qualified-current432-historical/programs/mayhem'}
for label in ['legacy-buy-scaled-result-current432','legacy-buy-eager-scaled-current432','legacy-buy-positive-range-current432','legacy-buy-program-info-key-current432']:
 labels[label]=W/(label+'-build');sources[label]=W/(label+'-source/programs/mayhem')
maps={}
for label,d in labels.items():
 files={p.relative_to(sources[label]).as_posix():p.read_bytes()for p in sources[label].rglob('*')if p.is_file()}
 assert files.keys()==base.keys();maps[label]={k:h(v)for k,v in files.items()}
 changes={k:v for k,v in files.items()if v!=base[k]}
 for k,b in changes.items():gz('builds/'+label+'/overrides/'+k,b)
 for n in ['launch.json','result.json']:put('builds/'+label+'/'+n,(d/n).read_bytes())
 for n in ['stdout','stderr','link.map']:
  if(d/n).exists():gz('builds/'+label+'/'+n,(d/n).read_bytes())
 for n in ['candidate.so','symbols.so']:gz('builds/'+label+'/'+n,(d/n).read_bytes())
js('all-source-inputs.json',maps)
for n in ['replay_qualified_current432_historical.py','build_native.py']:
 put('controllers/'+n,(W/n).read_bytes())
# No fresh initializer execution is claimed on this follow-up.
put('controllers/run_buy.py',(W/'run_qualified_current432_buy.py').read_bytes())
for n in ['qualified-current432-historical-driver.log','qualified-current432-historical-buy-runtime-driver.log']:
 if(W/n).exists():put('controllers/'+n,(W/n).read_bytes())
put('.gitattributes',b'*.gz binary\n*.xz binary\n')
# Host macro is an exact pinned external input already merged upstream.
root_inputs=json.loads((B/'scope.json').read_bytes())['root_inputs']
for n in ['research/mayhem-legacy-buy-cpi-ownership/verify.py','research/mayhem-quotes-current-recovery-20261027/source-inputs.json','research/mayhem-quotes-current-recovery-20261027/builds/current/symbols.so.gz','research/mayhem-historical-macro-linux/captures/host-macro.so.gz']:
 raw=__import__('subprocess').check_output(['git','show','c7837e92df45d29228265a960d279d8ff928ccc0:'+n],cwd=R);root_inputs[n]=h(raw);dest=R/n
 if dest.exists():assert dest.read_bytes()==raw
 else:dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(raw)
for n,digest in root_inputs.items():
 raw=(R/n).read_bytes();assert h(raw)==digest
 q=R/n
 if q.exists():assert q.read_bytes()==raw
 else:q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(raw)
js('root-inputs.json',root_inputs)
for n in ['archive-receipt.json','target-library-check.json','lld-executable-mode-repair.json']:
 put('sdk/'+n,(W.parent/'mayhem-sdk'/n).read_bytes())
libs=json.loads((W.parent/'mayhem-sdk/target-library-check.json').read_bytes())['files']
assert len(libs)==26
assert all(h((W.parent/'mayhem-sdk/v1.54/rust'/n).read_bytes())==v for n,v in libs.items())
tools=json.loads((W/'qualified-current432-historical/build/launch.json').read_bytes())['checked_tools']
assert all(h(Path(n).read_bytes())==v for n,v in tools.items())
js('sdk/post-run.json',dict(tools=tools,target_libraries=libs,unchanged=True))
put('controllers/capture_current_ownership_native.py',Path(__file__).read_bytes())
print('Captured sources, seven output pairs and native receipts',flush=True)
