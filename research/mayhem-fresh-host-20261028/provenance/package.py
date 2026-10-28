from pathlib import Path
import gzip,hashlib,io,json,shutil,subprocess,tarfile
D=Path(__file__).resolve().parent;W=D.parent;P=D/'publication';P.mkdir(exist_ok=False);B=W/'mayhem-dynamic-order/publication';R=W/'pumpfun-source'
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
bindings=[]
def bound(src,n,rev,path):
 b=src.read_bytes();blob=subprocess.check_output(['git','show',rev+':'+path],cwd=R);assert b==blob;put(n,b);bindings.append(dict(local=n,revision=rev,path=path,bytes=len(b),sha256=sha(b),git_blob=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()))
parent='91ef81b58cb725b7c3783954870a0c7868c76299';prefix='research/mayhem-meaningful-elf-20261028/'
for folder in ['controller','reference']:
 for f in (B/folder).rglob('*'):
  if f.is_file():n=f.relative_to(B).as_posix();bound(f,n,parent,prefix+n)
bound(B/'verify.py','reference/identity_verify.py',parent,prefix+'verify.py')
bound(B/'baseline/link-invocation.json.gz','baseline/link-invocation.json.gz',parent,prefix+'baseline/link-invocation.json.gz')
for f in (D/'host-inputs').rglob('*'):
 if f.is_file():cp(f,'host-inputs/'+f.relative_to(D/'host-inputs').as_posix())
rev='4b163e0f6f7ff0f8ef7c947fad7993c8af694f7a';old='research/mayhem-historical-macro-context/'
for name in ['source-tree.json','supplement-packages.json','supplement-receipts.json']:
 bound(D/'host-inputs'/name,'host-inputs/'+name,rev,old+name)
path=old+'host/host-build-03/Cargo.lock.gz';b=subprocess.check_output(['git','show',rev+':'+path],cwd=R);assert gzip.decompress(b)==(P/'host-inputs/resolved-Cargo.lock').read_bytes();put('provenance/previous-resolved-Cargo.lock.gz',b);bindings.append(dict(local='provenance/previous-resolved-Cargo.lock.gz',revision=rev,path=path,bytes=len(b),sha256=sha(b),git_blob=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()))
save('provenance/bindings.json',bindings)
for n in ['host_build.py','build.py']:cp(D/n,n)
cases={}
for label in ['01','02','03']:
 H=D/('host-'+label) if label!='03' else D/'chain-03/host';T=D/('target-'+label) if label!='03' else D/'chain-03/target';host='hosts/'+label;out='builds/'+label
 C=D/('controller-'+label) if label!='03' else D/'chain-03/controller';cp(C/'historical-macro.json',out+'/macro-input.json')
 for n in ['launch.json','result.json','macro-binding.json','compile-commands.json']:cp(H/n,host+'/'+n)
 for n in ['stdout.log','stderr.log']:gz(H/n,host+'/'+n+'.gz')
 gz(H/'target/release/anchor_attribute_program.dll',host+'/anchor_attribute_program.dll.gz')
 put(host+'/source.tar.gz',tar({p.relative_to(H/'source').as_posix():p.read_bytes() for p in (H/'source').rglob('*') if p.is_file()}))
 for n in ['launch.json','result.json','wrapper-compile-result.json','linker-compile-result.json']:cp(T/n,out+'/'+n)
 for n in ['symbols.so','candidate-v154-strip.so','stderr.log','stdout.log']:gz(T/n,out+'/'+n+'.gz')
 source={p.relative_to(T/'source/programs/mayhem').as_posix():p.read_bytes() for p in (T/'source/programs/mayhem').rglob('*') if p.is_file()};assert len(source)==67;put(out+'/source.tar.gz',tar(source));put(out+'/wrapper-records.tar.gz',tar({p.name:p.read_bytes() for p in (T/'wrapper-records').glob('*.json')}))
 for f in (T/'link').iterdir():
  if f.is_file():gz(f,out+'/link/'+f.name+'.gz')
 inv=json.loads((T/'link/invocation.json').read_text());inputs=[]
 for r in inv['inputs']:
  b=(T/'link'/r['retained'] if r['retained'] else Path(r['path'])).read_bytes();inputs.append(dict(**r,bytes=len(b),sha256=sha(b),scope='Post-build content observation; ephemeral inputs retained by linker wrapper.'))
 save(out+'/link/input-identities.json',inputs);cases[label]=dict(host_source_archive_sha256=sha((P/host/'source.tar.gz').read_bytes()),target_source_archive_sha256=sha((P/out/'source.tar.gz').read_bytes()),macro=json.loads((H/'result.json').read_text())['macro'],target_outputs=json.loads((T/'result.json').read_text())['outputs'])
save('cases.json',cases);cp(D/'chain-03/result.json','provenance/integrated-result.json')
for f in [W/'prepare_fresh_host.py',D/'target_build.py',Path(__file__)]:cp(f,'provenance/'+f.name)
put('.gitattributes',b'* -text\n');print('files',sum(p.is_file() for p in P.rglob('*')),'bytes',sum(p.stat().st_size for p in P.rglob('*') if p.is_file()),'cases',sha((P/'cases.json').read_bytes()))
