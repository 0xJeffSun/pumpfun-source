from pathlib import Path
import gzip,hashlib,io,json,shutil,tarfile
W=Path(__file__).resolve().parent
R=Path('/workspace/scratch/08cb9746963a/pumpfun-body')
P=R/'research/mayhem-native-current432-composition'
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
src=W/'buy-sell-current-initializer-source/programs/mayhem'
base={p.relative_to(src).as_posix():p.read_bytes()for p in src.rglob('*')if p.is_file()}
assert len(base)==67
js('source-inputs.json',archive('source.tar.xz',base))
labels={'parent':W/'buy-sell-current-initializer-build',
        'composed':W/'historical-linux-current432/build','repeat':W/'historical-linux-current432/repeat'}
sources={'parent':src,'composed':W/'historical-linux-current432/programs/mayhem','repeat':W/'historical-linux-current432/programs/mayhem'}
for label in ['legacy-sell-retained-error432','legacy-sell-anchor-result432','legacy-sell-value-price432','legacy-sell-value64-price432']:
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
for n in ['replay_historical_linux_432.py','build_native.py']:
 put('controllers/'+n,(W/n).read_bytes())
put('controllers/initializer_replay.py',(H/'controllers/initializer_replay.py').read_bytes())
put('controllers/run_runtime.py',(W/'native432-historical-pending/run_runtime.py').read_bytes())
for n in ['historical-linux432-driver.log','historical-linux432-runtime-driver.log','historical-linux432-initializer-runtime.log']:
 if(W/n).exists():put('controllers/'+n,(W/n).read_bytes())
put('.gitattributes',b'*.gz binary\n*.xz binary\n')
gz('host-macro.so',(W/'historical-linux-macro/target/release/libanchor_attribute_program.so').read_bytes())
root_inputs=json.loads((B/'scope.json').read_bytes())['root_inputs']
for n,digest in root_inputs.items():
 raw=(B.parents[1]/n).read_bytes();assert h(raw)==digest
 q=R/n
 if q.exists():assert q.read_bytes()==raw
 else:q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(raw)
js('root-inputs.json',root_inputs)
for n in ['archive-receipt.json','target-library-check.json','lld-executable-mode-repair.json']:
 put('sdk/'+n,(W.parent/'mayhem-sdk'/n).read_bytes())
libs=json.loads((W.parent/'mayhem-sdk/target-library-check.json').read_bytes())['files']
assert len(libs)==26
assert all(h((W.parent/'mayhem-sdk/v1.54/rust'/n).read_bytes())==v for n,v in libs.items())
tools=json.loads((W/'historical-linux-current432/build/launch.json').read_bytes())['checked_tools']
assert all(h(Path(n).read_bytes())==v for n,v in tools.items())
js('sdk/post-run.json',dict(tools=tools,target_libraries=libs,unchanged=True))
put('controllers/capture_native432.py',Path(__file__).read_bytes())
print('Captured sources, seven output pairs and native receipts',flush=True)
