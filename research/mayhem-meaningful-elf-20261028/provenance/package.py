"""Retain source-only module-order experiments and ordinary linker output."""
from pathlib import Path
import gzip,hashlib,io,json,shutil,subprocess,tarfile
D=Path(__file__).resolve().parent;W=D.parent;N=W/'mayhem-current441-native/publication';P=D/'publication';P.mkdir(exist_ok=False)
sha=lambda b:hashlib.sha256(b).hexdigest()
def put(n,b):
 p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
def cp(p,n):put(n,p.read_bytes())
def gz(p,n):put(n,gzip.compress(p.read_bytes(),mtime=0))
def save(n,x):put(n,(json.dumps(x,indent=2)+'\n').encode())
def tar(files):
 b=io.BytesIO()
 with tarfile.open(fileobj=b,mode='w') as t:
  for n,data in sorted(files.items()):
   m=tarfile.TarInfo(n);m.size=len(data);m.mode=0o644;t.addfile(m,io.BytesIO(data))
 return gzip.compress(b.getvalue(),mtime=0)
for folder in ['reference']:
 for f in (N/folder).rglob('*'):
  if f.is_file():cp(f,f.relative_to(N).as_posix())
for f in (D/'controller-02-rebound-layout').rglob('*'):
 if f.is_file():cp(f,'controller/'+f.relative_to(D/'controller-02-rebound-layout').as_posix())
cp(N/'upstream/sources/source.tar.gz','baseline/source.tar.gz')
cp(N/'controller/ordered-native.ld','baseline/ordered-native.ld')
for n in ['symbols.so.gz','candidate-v154-strip.so.gz']:cp(N/'builds/02-native-selectors'/n,'baseline/'+n)
prior=json.loads((N/'provenance/recipe-bindings.json').read_text());prior['files']=[r for r in prior['files'] if r['local'].startswith('reference/') or (r['local'].startswith('controller/') and not r['local'].endswith('ordered-native.ld'))];save('provenance/recipe-bindings.json',prior)
rows=[]
for f in ['baseline/source.tar.gz','baseline/ordered-native.ld','baseline/symbols.so.gz','baseline/candidate-v154-strip.so.gz']:
 orig={'baseline/source.tar.gz':'upstream/sources/source.tar.gz','baseline/ordered-native.ld':'controller/ordered-native.ld','baseline/symbols.so.gz':'builds/02-native-selectors/symbols.so.gz','baseline/candidate-v154-strip.so.gz':'builds/02-native-selectors/candidate-v154-strip.so.gz'}[f]
 b=(P/f).read_bytes();rows.append(dict(local=f,path='research/mayhem-current441-native-20261028/'+orig,bytes=len(b),sha256=sha(b),git_blob=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()))
save('provenance/baseline-bindings.json',dict(revision='9f3a6988f4d83dd3054f83115914a177756999a5',files=rows))
layout=[]
for r in json.loads((D/'layout-acquisition.json').read_text())['inputs']:
 if 'revision' not in r:continue
 n='layout-tools/'+Path(r['path']).name;cp(D/'layout/tools'/Path(r['path']).name,n);layout.append(dict(r,local=n))
save('provenance/layout-bindings.json',dict(revision='dc8f791d32ae7fd6d9660cd1bf003fb02737f78f',files=layout))
cp(D/'01-data-binding.json','layout-data-binding.json')
cp(D/'01-anchor-module-order-source.patch','source.patch')
cp(D/'01-anchor-module-order-plan.json','source-plan.json')
cases={}
for label in ['01-anchor-module-order','02-rebound-layout','03-repeat-rebound']:
 B=D/('build-'+label);out='builds/'+label
 for n in ['launch.json','result.json','wrapper-compile-result.json','linker-compile-result.json']:cp(B/n,out+'/'+n)
 for n in ['symbols.so','candidate-v154-strip.so','stderr.log','stdout.log']:gz(B/n,out+'/'+n+'.gz')
 source={p.relative_to(B/'source/programs/mayhem').as_posix():p.read_bytes() for p in (B/'source/programs/mayhem').rglob('*') if p.is_file()};assert len(source)==67;put(out+'/source.tar.gz',tar(source))
 put(out+'/wrapper-records.tar.gz',tar({p.name:p.read_bytes() for p in (B/'wrapper-records').glob('*.json')}))
 for f in (B/'link').iterdir():
  if f.is_file():gz(f,out+'/link/'+f.name+'.gz')
 inv=json.loads((B/'link/invocation.json').read_text());inputs=[]
 for r in inv['inputs']:
  b=(B/'link'/r['retained'] if r['retained'] else Path(r['path'])).read_bytes();inputs.append(dict(**r,bytes=len(b),sha256=sha(b),scope='Post-build content acquisition; ephemeral inputs were copied by the linker wrapper.'))
 save(out+'/link/input-identities.json',inputs)
 cases[label]=dict(source_archive_sha256=sha((P/out/'source.tar.gz').read_bytes()),outputs=json.loads((B/'result.json').read_text())['outputs'])
save('cases.json',cases)
for name in ['build_module_order.py','build_rebound.py','rebind_layout.py','package.py']:
 cp(D/name,'provenance/'+name)
for name in ['module-order-01.log','module-order-01b.log','module-order-02.log','module-order-03.log','rebind-01.log']:
 cp(D/name,'provenance/'+name)
put('provenance/acquisition-failure.txt',b'Initial read-only tool acquisition requested layout/inputs/reader.py at dc8f791d32ae7fd6d9660cd1bf003fb02737f78f; Git reported this path absent (exit 128). No build occurred. The adapter instead uses the immutable reader/inventory already bound in PR439, adding end=start+bytes for the upstream layout tool.\n')
lld=W/'mayhem-native-build/sdk/llvm/bin/ld.lld.exe'
result=subprocess.run([str(lld),'--version'],capture_output=True,check=True)
save('provenance/linker-version.json',dict(path=str(lld),sha256=sha(lld.read_bytes()),returncode=result.returncode,stdout=result.stdout.decode(),stderr=result.stderr.decode(),rust_revision='daa3af4a1110ec3f10ce08083bb0b7855a88416f',llvm_revision='7ab1c5c58f2d29bfcd27e27b50f7e68101cdeaa6'))
put('.gitattributes',b'* -text\n')
print('Packaged',sum(f.is_file() for f in P.rglob('*')),'files;',sum(f.stat().st_size for f in P.rglob('*') if f.is_file()),'bytes; cases',sha((P/'cases.json').read_bytes()))
