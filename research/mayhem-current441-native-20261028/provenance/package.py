from pathlib import Path
import gzip,hashlib,io,json,shutil,subprocess,tarfile
W=Path(__file__).resolve().parent;D=W/'mayhem-current441-native';P=D/'publication';P.mkdir(exist_ok=False)
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
for p in (D/'controller-02-native-selectors').rglob('*'):
 if p.is_file():cp(p,'controller/'+p.relative_to(D/'controller-02-native-selectors').as_posix())
for p in (D/'upstream').rglob('*'):
 if p.is_file():cp(p,'upstream/'+p.relative_to(D/'upstream').as_posix())
cp(D/'acquisition.json','provenance/upstream-bindings.json')
old=W/'mayhem-v2-caller/publication';prior=json.loads((old/'provenance/bindings.json').read_text());chosen=[]
for r in prior['files']:
 if r['local'].startswith('reference/') and 'parent-source' not in r['local']:
  cp(old/r['local'],r['local']);chosen.append(r)
 elif r['local'].startswith('controller/') and not r['local'].endswith('ordered-native.ld'):
  assert (old/r['local']).read_bytes()==(P/r['local']).read_bytes();chosen.append(r)
save('provenance/recipe-bindings.json',dict(revision=prior['revision'],files=chosen));cases={}
for label in ['01-shipped-linker','02-native-selectors']:
 B=D/('build-'+label);out='builds/'+label
 for n in ['launch.json','result.json','wrapper-compile-result.json','linker-compile-result.json']:cp(B/n,out+'/'+n)
 for n in ['symbols.so','candidate-v154-strip.so','stderr.log','stdout.log']:gz(B/n,out+'/'+n+'.gz')
 source={p.relative_to(B/'source/programs/mayhem').as_posix():p.read_bytes() for p in (B/'source/programs/mayhem').rglob('*') if p.is_file()};assert len(source)==67;put(out+'/source.tar.gz',tar(source))
 put(out+'/wrapper-records.tar.gz',tar({p.name:p.read_bytes() for p in (B/'wrapper-records').glob('*.json')}))
 for p in (B/'link').iterdir():
  if p.is_file():gz(p,out+'/link/'+p.name+'.gz')
 inv=json.loads((B/'link/invocation.json').read_text());inputs=[]
 for r in inv['inputs']:
  data=(B/'link'/r['retained'] if r['retained'] else Path(r['path'])).read_bytes();inputs.append(dict(**r,bytes=len(data),sha256=sha(data),scope='Post-build content acquisition; ephemeral inputs were copied by the linker wrapper.'))
 save(out+'/link/input-identities.json',inputs);cases[label]=dict(source_archive_sha256=sha((P/out/'source.tar.gz').read_bytes()),outputs=json.loads((B/'result.json').read_text())['outputs'])
save('cases.json',cases)
mapping=json.loads((D/'selector-map.json').read_text());ar=W/'mayhem-native-build/sdk/llvm/bin/llvm-ar.exe'
for i,row in enumerate(mapping['bindings']):
 data=Path(row['retained_path']).read_bytes() if row['kind']=='object' else subprocess.run([str(ar),'p',row['path'],row['member']],capture_output=True,check=True).stdout
 assert sha(data)==row.get('member_sha256',row.get('sha256'));name=f'selector-members/{i:02}.o.gz';put(name,gzip.compress(data,mtime=0));row['saved_member']=name
save('selector-map.json',mapping)
for src,name in [(W/'prepare_current441_native.py','acquire.py'),(D/'native_selectors.py','native_selectors.py'),(Path(__file__),'package.py')]:cp(src,'provenance/'+name)
cp(W/'current441-native-02.log','provenance/initial-selector-preparation-failure.log');put('.gitattributes',b'* -text\n')
print('Packaged',sum(p.is_file() for p in P.rglob('*')),'files;',sum(p.stat().st_size for p in P.rglob('*') if p.is_file()),'bytes; cases',sha((P/'cases.json').read_bytes()))
