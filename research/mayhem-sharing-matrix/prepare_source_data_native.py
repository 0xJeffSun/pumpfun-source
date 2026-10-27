from pathlib import Path
import gzip,hashlib,json,shutil,subprocess,tomllib
W=Path(__file__).resolve().parent;R=W/'pumpfun-source';P=W/'mayhem-parallel-native';C=W/'mayhem-source-data-native';C.mkdir(exist_ok=False)
REV='5f88c2f7e7b32bd499bda8aa86c68b6d6e061ac0'
def sha(b):return hashlib.sha256(b).hexdigest()
def blob(n):return subprocess.check_output(['git','show',REV+':'+n],cwd=R)
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n',encoding='utf8',newline='\n')
sources={p.relative_to(P/'sources').as_posix().removesuffix('.gz'):gzip.decompress(p.read_bytes())for p in(P/'sources').rglob('*.gz')}
assert len(sources)==60
for packet,count in [('mayhem-composed-recovery',64),('mayhem-source-data-recovery',65)]:
 prefix='research/'+packet;mf=json.loads(blob(prefix+'/manifest.json'))
 if count==65:
  delta=json.loads(blob(prefix+'/source-delta.json'))
  for name in delta['removed']:del sources[name]
 names=subprocess.check_output(['git','ls-tree','-r','--name-only',REV,prefix+'/overrides'],cwd=R,text=True).splitlines()
 for name in names:
  data=blob(name);assert sha(data)==mf[name.removeprefix(prefix+'/')];sources[name.removeprefix(prefix+'/overrides/')]=data
 assert len(sources)==count and{n:sha(b)for n,b in sources.items()}==json.loads(blob(prefix+'/source-inputs.json'))
for name,data in sources.items():
 dest=C/'sources'/(name+'.gz');dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(gzip.compress(data,mtime=0))
for name in ['builds']:shutil.copytree(P/name,C/name)
for name in ['sdk-components.json.gz','vendor-inputs.json']:shutil.copyfile(P/name,C/name)
shutil.copyfile(W/'windows-typeid-probe/linux-components.json',C/'target-components.json')
target=json.loads((C/'target-components.json').read_bytes());published=json.loads(blob('research/mayhem-source-data-recovery/provenance/target-libraries.json'))
assert target['archive_sha256']==published['archive_sha256']=='fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e'
assert{r['path'].removeprefix('rust/'):r['sha256']for r in target['files']if r['path'].startswith('rust/')}==published['files']
for row in target['files']:
 path=W/'windows-typeid-probe/linux-sysroot'/row['path'];assert path.stat().st_size==row['bytes'] and sha(path.read_bytes())==row['sha256']
registry=lambda lock:{(p['name'],p['version'],p['source']):p['checksum']for p in tomllib.loads(lock.decode())['package']if'checksum'in p}
assert registry(sources['Cargo.lock'])==registry(gzip.decompress((P/'sources/Cargo.lock.gz').read_bytes()))
save(C/'source-inputs.json',dict(revision=REV,source_files=[dict(path=n,bytes=len(b),sha256=sha(b))for n,b in sorted(sources.items())],locked_registry_packages=len(registry(sources['Cargo.lock']))))
builder=(P/'build.py').read_text();old="'--', '--remap-path-prefix=src/=programs/mayhem-program/src/']";new="'--', '--remap-path-prefix=src/=programs/mayhem-program/src/',\n                   '--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']";assert builder.count(old)==1;builder=builder.replace(old,new).replace('Darwin target libraries.','Linux target libraries.');(C/'build.py').write_text(builder,encoding='utf8',newline='\n')
prefix='research/mayhem-source-data-recovery';mf=json.loads(blob(prefix+'/manifest.json'))
for name in ['artifacts/recovered/symbols.so.gz','artifacts/recovered/candidate.so.gz','builds/recovered/launch.json','builds/recovered/stderr.gz','audit.json']:
 data=blob(prefix+'/'+name);assert sha(data)==mf[name];(C/('published-'+Path(name).name)).write_bytes(data)
(C/'published-symbols.so').write_bytes(gzip.decompress((C/'published-symbols.so.gz').read_bytes()))
save(C/'preparation.json',dict(source_inputs=65,target_components=len(target['files']),target_archive_sha256=target['archive_sha256'],builder_changes='Linux target-component inventory and exact published account_wrapper root remap; all other compiler checks retained.'))
print('Prepared exact65-input source,214registry pins,27Linux target components; all target hashes equal published recipe.')
