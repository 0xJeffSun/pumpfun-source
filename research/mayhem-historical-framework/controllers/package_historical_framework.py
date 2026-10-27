from pathlib import Path
import gzip,hashlib,io,json,shutil,tarfile
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-framework';D=P/'publication';D.mkdir(exist_ok=False);Q=W/'mayhem-whole-parser/publication'
def put(name,b):
    p=D/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(gzip.compress(b,mtime=0)if name.endswith('.gz')else b)
def copy(src,name):put(name,Path(src).read_bytes())
def js(name,v):put(name,(json.dumps(v,indent=2)+'\n').encode())
def pack(root,name):
    buf=io.BytesIO()
    with tarfile.open(fileobj=buf,mode='w',format=tarfile.USTAR_FORMAT)as tf:
        for p in sorted(root.rglob('*')):
            if not p.is_file():continue
            rel=p.relative_to(root).as_posix();b=p.read_bytes();t=tarfile.TarInfo(rel);t.size=len(b);t.mode=0o644;tf.addfile(t,io.BytesIO(b))
    put(name,buf.getvalue())
for n in('source-tree.json','acquisition.json','framework-packages.json','curve-comparison.json','registry-archive-proof.json','extra-packages.json','extra-receipts.json','historical-dependency-closure.json','historical-existing-packages.json','historical-missing-packages.json','locked-vendor-acquisition.json'):
    copy(P/n,n+'.gz')
pack(P/'historical','historical-source.tar.gz');pack(W/'mayhem-qualified-native/build-01/source/programs/mayhem','baseline-source.tar.gz');copy(W/'mayhem-qualified-native/source-inputs.json','baseline-inputs.json')
copy(W/'mayhem-whole-parser/historical-pump.json','historical-pump.json.gz');copy(W/'mayhem-whole-parser/historical-idl-origin.json','historical-idl-origin.json')
for label in('metadata-01','metadata-02','metadata-03','metadata-04','metadata-05','metadata-06','metadata-07'):
    folder=P/label
    for n in('launch.json','result.json','stdout.log','stderr.log'):copy(folder/n,f'metadata/{label}/{n}.gz')
    pack(folder/'source',f'metadata/{label}/source.tar.gz');pack(folder/'framework',f'metadata/{label}/framework.tar.gz');copy(folder/'cargo-home/config.toml',f'metadata/{label}/config.toml')
for label in('build-01','build-02','build-03-gated','build-04-empty'):
    folder=P/label
    for n in('launch.json','result.json','result-initial.json','stdout.log','stderr.log'):copy(folder/n,f'builds/{label}/{n}.gz')
    js(f'builds/{label}/records.json.gz',[json.loads(p.read_bytes())for p in sorted((folder/'wrapper-records').glob('*.json'))])
    if label!='build-01':
        for pattern,dest in[('libcurve_accounts-*.rlib','curve.rlib.gz'),('libanchor_lang-*.rlib','anchor-lang.rlib.gz')]:
            files=list((folder/'target/sbpf-solana-solana/release/deps').glob(pattern));assert len(files)==1;copy(files[0],f'builds/{label}/{dest}')
        files=list((folder/'target/release/deps').glob('anchor_attribute_program-*.dll'));assert len(files)==1;copy(files[0],f'builds/{label}/program-macro.dll.gz')
        js(f'builds/{label}/retained-output-bindings.json',[dict(original_path=str(p),bytes=p.stat().st_size,sha256=hashlib.sha256(p.read_bytes()).hexdigest(),retained=n)for p,n in[(next((folder/'target/sbpf-solana-solana/release/deps').glob('libcurve_accounts-*.rlib')),'curve.rlib.gz'),(next((folder/'target/sbpf-solana-solana/release/deps').glob('libanchor_lang-*.rlib')),'anchor-lang.rlib.gz'),(files[0],'program-macro.dll.gz')]])
for n in('launch.json','result.json','stdout.log','stderr.log'):copy(P/'curve-repeat'/n,'repeat/'+n+'.gz')
copy(next((P/'curve-repeat').glob('*.rlib')),'repeat/curve.rlib.gz')
rows=json.loads((P/'registry-archive-proof.json').read_bytes())
for r in rows:
    label=r['name']+'-'+r['version'];copy(P/'locked-archives'/(label+'.crate'),'registry/'+label+'.crate');log=P/'locked-archives'/(label+'.log')
    if log.exists():copy(log,'registry/'+label+'.log.gz')
for n in('context_helpers.py','tools/compiler_records.py','tools/archive.py','tools/reader.py'):copy(Q/n,n)
js('helper-origins.json',dict(revision='aff7fd5c7a6b52bac6aed1bcfc9badb9b026b614',path='research/mayhem-historical-macro-context',files={n:dict(bytes=(Q/n).stat().st_size,sha256=hashlib.sha256((Q/n).read_bytes()).hexdigest())for n in('context_helpers.py','tools/compiler_records.py','tools/archive.py','tools/reader.py')}))
for n in('prepare_historical_framework.py','acquire_framework_supplement.py','prepare_framework_candidate.py','acquire_historical_vendor.py','build_historical_framework.py','repeat_framework_curve.py','authenticate_framework_registry.py','package_historical_framework.py'):
    copy(W/n,'controllers/'+n)
copy(P/'vendor-acquisition.log','vendor-acquisition.log.gz')
print('Packaged',sum(p.is_file()for p in D.rglob('*')),'files,',sum(p.stat().st_size for p in D.rglob('*')if p.is_file()),'bytes')
