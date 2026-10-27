from pathlib import Path
import gzip, io, json, tarfile
W=Path(__file__).resolve().parent; P=W/'mayhem-historical-duplicate-check'; D=W/'mayhem-historical-root-compat/publication/duplicate-control'
D.mkdir(exist_ok=False)
def put(n,b):
    p=D/n; p.parent.mkdir(parents=True,exist_ok=True); p.write_bytes(gzip.compress(b,mtime=0) if n.endswith('.gz') else b)
def copy(p,n):
    b=p.read_bytes(); put(n,gzip.decompress(b) if p.suffix=='.gz' else b)
def pack(root):
    out=io.BytesIO()
    with tarfile.open(fileobj=out,mode='w',format=tarfile.USTAR_FORMAT) as tf:
        for p in sorted(root.rglob('*')):
            if p.is_file():
                b=p.read_bytes(); m=tarfile.TarInfo(p.relative_to(root).as_posix()); m.size=len(b); m.mode=0o644; tf.addfile(m,io.BytesIO(b))
    return out.getvalue()
for stage in ('before','after'):
    for prefix in ('source','framework'): copy(P/(prefix+'-'+stage+'.tar.gz'),prefix+'-'+stage+'.tar.gz')
    put('upstream-'+stage+'.tar.gz',pack(P/('historical-'+stage)))
    copy(P/('tree-'+stage+'.json'),'tree-'+stage+'.json')
    for p in (P/('metadata-'+stage)).iterdir():
        if p.is_file(): copy(p,'metadata-'+stage+'/'+p.name+'.gz')
    copy(P/('metadata-'+stage+'/cargo-home/config.toml'),'metadata-'+stage+'/config.toml')
for n in ('source-acquisition.json','transition.json','comparison.json','analysis-summary.json','dependency-closure.json','framework-packages.json','locked-vendor-acquisition.json'):
    copy(P/n,n+'.gz' if n not in ('comparison.json',) else n)
copy(P/'locked-archives/proc-macro2-1.0.105.crate','registry/proc-macro2-1.0.105.crate')
copy(P/'locked-vendor/proc-macro2-1.0.105/.cargo-checksum.json','registry/proc-macro2-1.0.105-checksum.json.gz')
for label in ('build-01-before','build-02-after','build-03-repeat'):
    src=P/label
    for n in ('launch.json','result.json','stdout.log','stderr.log','analysis.json','link-input-identities.json','symbols.so','stripped.so','strip.stdout.log','strip.stderr.log'): copy(src/n,label+'/'+n+'.gz')
    for p in (src/'link').iterdir():
        if p.is_file(): copy(p,label+'/link/'+p.name+'.gz')
    records=[json.loads(p.read_bytes()) for p in sorted((src/'wrapper-records').glob('*.json'))]
    put(label+'/records.json.gz',(json.dumps(records,indent=2)+'\n').encode())
for n in ('prepare_duplicate_sources.py','acquire_duplicate_vendor.py','prepare_duplicate_build.py','build_historical_duplicate_full.py','advance_duplicate_framework.py','analyze_historical_duplicate.py','summarize_duplicate_control.py','package_duplicate_control.py'):
    copy(W/n,'controllers/'+n)
print('Packaged',sum(p.is_file() for p in D.rglob('*')),'adjacent-revision evidence files')
