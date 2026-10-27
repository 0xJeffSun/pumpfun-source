from pathlib import Path
import gzip,hashlib,importlib.util,io,json,tarfile,tomllib
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-root-compat';D=P/'publication';D.mkdir(exist_ok=False);H=W/'mayhem-historical-framework/publication';Q=W/'mayhem-whole-parser/publication'
def ident(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
def put(n,b):
    p=D/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(gzip.compress(b,mtime=0)if n.endswith('.gz')else b)
def copy(p,n):
    b=Path(p).read_bytes();put(n,gzip.decompress(b)if str(p).endswith('.gz')else b)
def js(n,v):put(n,(json.dumps(v,indent=2)+'\n').encode())
def pack(root,n):
    buf=io.BytesIO()
    with tarfile.open(fileobj=buf,mode='w',format=tarfile.USTAR_FORMAT)as tf:
        for p in sorted(root.rglob('*')):
            if not p.is_file():continue
            b=p.read_bytes();t=tarfile.TarInfo(p.relative_to(root).as_posix());t.size=len(b);t.mode=0o644;tf.addfile(t,io.BytesIO(b))
    put(n,buf.getvalue())
js('parent.json',dict(revision='0a881f726f8dae34a2f53f2438cdb271ab830e41',directory='mayhem-historical-framework',manifest=ident((H/'manifest.json').read_bytes()),files=json.loads((H/'manifest.json').read_bytes())['files']))
for n in('original.so.gz','prior-inventory.json.gz'):copy(Q/'reference'/n,'reference/'+n)
copy(W/'mayhem-qualified-native/vendor-inputs.json','reference/current-vendor-inputs.json');copy(W/'mayhem-qualified-native/build.py','reference/current-parent-build.py')
copy(P/'family-comparison.json','family-comparison.json');copy(P/'analysis-summary.json','analysis-summary.json.gz')
labels=('api-01','api-02-repeat','api-03-gated','api-04-empty','full-compatible-build-02','current-native-control')
for label in labels:
    src=P/label;dst='runs/'+label
    for n in('launch.json','result.json','stdout.log','stderr.log','analysis.json'):copy(src/n,dst+'/'+n+'.gz')
    copy(src/'symbols.so',dst+'/symbols.so.gz');strip=src/'candidate-v154-strip.so'if label=='current-native-control'else src/'stripped.so';copy(strip,dst+'/stripped.so.gz')
    for n in('strip.stdout.log','strip.stderr.log'):copy(src/n,dst+'/'+n+'.gz')
    if label.startswith('api-'):source=src/'source'
    elif label=='full-compatible-build-02':source=P/'full-compatible-input/source'
    else:source=src/'source/programs/mayhem'
    pack(source,dst+'/source.tar.gz')
    for p in(src/'link').iterdir():
        if p.is_file():copy(p,dst+'/link/'+p.name+'.gz')
    inv=json.loads((src/'link/invocation.json').read_bytes());rows=[]
    for row in inv['inputs']:
        path=src/'link'/row['retained']if row['retained']else Path(row['path']);rows.append(dict(**row,**ident(path.read_bytes())))
    js(dst+'/link-input-identities.json.gz',rows)
    if(src/'link-input-identities.json').exists():copy(src/'link-input-identities.json',dst+'/recorded-link-input-identities.json.gz')
    if(src/'wrapper-records').exists():js(dst+'/records.json.gz',[json.loads(p.read_bytes())for p in sorted((src/'wrapper-records').glob('*.json'))])
for n in('launch.json','result.json','stdout.log','stderr.log'):copy(P/'full-compatible-input'/n,'full-input/'+n+'.gz')
copy(P/'full-compatible-input/cargo-home/config.toml','full-input/config.toml')
for n in('build.py','source-inputs.json','vendor-inputs.json','wrapper.rs','linker.rs','default.ld','metadata-map.tsv','path-map.tsv','ordered-native.ld','host-tools.json','target-components.json','sdk-components.json.gz'):copy(P/'current-control-controller'/n,'current-controller/'+n)
for n in('wrapper-compile-result.json','wrapper-compile.stdout.log','wrapper-compile.stderr.log','linker-compile-result.json','linker-compile.stdout.log','linker-compile.stderr.log'):copy(P/'current-native-control'/n,'current-controller/'+n+'.gz')
copy(P/'full-compatible-controller.log','failed-controller/stderr.log.gz');copy(P/'build_compatible_full.py','failed-controller/build_compatible_full.py')
for n in('probe_historical_root_compat.py','analyze_historical_root_compat.py','prepare_compatible_full_build.py','build_historical_root_compat_full.py','package_historical_root_compat.py'):copy(W/n,'controllers/'+n)
# Bind native current-family compiler inputs to its earlier vendor checksum cohort.
vp=json.loads((W/'mayhem-qualified-native/vendor-inputs.json').read_bytes())['packages'];package_index=[]
for row in vp:
    root=W/'mayhem-native-build/vendor'/row['directory'];manifest=(root/'Cargo.toml').read_bytes();pkg=tomllib.loads(manifest.decode())['package'];name=pkg['name']+'-'+pkg['version'];copy(root/'Cargo.toml','current-registry/'+name+'/Cargo.toml.gz');copy(root/'.cargo-checksum.json','current-registry/'+name+'/checksum.json.gz');package_index.append(dict(name=pkg['name'],version=pkg['version'],original_root=str(root),directory=name,pin=row))
js('current-registry/index.json.gz',package_index)
s=importlib.util.spec_from_file_location('compiler_helper',H/'tools/compiler_records.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
primary={};records=[json.loads(p.read_bytes())for p in(P/'current-native-control/wrapper-records').glob('*.json')]
for r in records:
    if not v.is_compile(r['after']):continue
    f=Path(v.source(r['after']));f=f if f.is_absolute()else Path(r['cwd'])/f;b=f.read_bytes();key=hashlib.sha256(b).hexdigest();put('primary-sources/'+key+'.gz',b);primary[str(f)]=dict(retained='primary-sources/'+key+'.gz',**ident(b))
js('current-primary-sources.json.gz',primary)
print('Packaged',sum(p.is_file()for p in D.rglob('*')),'files',sum(p.stat().st_size for p in D.rglob('*')if p.is_file()),'bytes')
