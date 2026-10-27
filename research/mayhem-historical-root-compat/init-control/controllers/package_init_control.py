from pathlib import Path
import gzip,io,json,tarfile
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-init-needed';D=W/'mayhem-historical-root-compat/publication/init-control';D.mkdir(exist_ok=False)
def put(n,b):
    p=D/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(gzip.compress(b,mtime=0) if n.endswith('.gz') else b)
def copy(p,n):
    b=p.read_bytes();put(n,gzip.decompress(b) if p.suffix=='.gz' else b)
out=io.BytesIO()
with tarfile.open(fileobj=out,mode='w',format=tarfile.USTAR_FORMAT) as tf:
    for f in sorted((P/'historical-after').rglob('*')):
        if f.is_file():
            b=f.read_bytes();m=tarfile.TarInfo(f.relative_to(P/'historical-after').as_posix());m.size=len(b);m.mode=0o644;tf.addfile(m,io.BytesIO(b))
put('upstream-after.tar.gz',out.getvalue())
for stage in ('before','after'):
    for prefix in ('source','framework'):copy(P/(prefix+'-'+stage+'.tar.gz'),prefix+'-'+stage+'.tar.gz')
    copy(P/('tree-'+stage+'.json'),'tree-'+stage+'.json');copy(P/('transition-'+stage+'.json'),'transition-'+stage+'.json.gz')
    for f in (P/('metadata-'+stage)).iterdir():
        if f.is_file():copy(f,'metadata-'+stage+'/'+f.name+'.gz')
    copy(P/('metadata-'+stage+'/cargo-home/config.toml'),'metadata-'+stage+'/config.toml')
for n in ('upstream-commit.json','comparison.json'):copy(P/n,n)
for n in ('source-acquisition.json','analysis-summary.json'):copy(P/n,n+'.gz')
for label in ('build-01-before','build-02-after','build-03-repeat'):
    src=P/label
    for n in ('launch.json','result.json','stdout.log','stderr.log','analysis.json','link-input-identities.json','symbols.so','stripped.so','strip.stdout.log','strip.stderr.log'):copy(src/n,label+'/'+n+'.gz')
    for f in (src/'link').iterdir():
        if f.is_file():copy(f,label+'/link/'+f.name+'.gz')
    records=[json.loads(f.read_bytes()) for f in sorted((src/'wrapper-records').glob('*.json'))];put(label+'/records.json.gz',(json.dumps(records,indent=2)+'\n').encode())
for n in ('comparison.json','old-definitions.rs','current-definitions.rs','old-checksum.json','current-checksum.json','historical-objdump.log','current-objdump.log'):copy(P/'panic-candidate'/n,'panic-candidate/'+n)
for n in ('prepare_init_sources.py','prepare_init_build.py','build_historical_init_full.py','analyze_historical_init.py','summarize_init_control.py','inspect_init_panic.py','package_init_control.py'):copy(W/n,'controllers/'+n)
print('Packaged',sum(p.is_file() for p in D.rglob('*')),'init_if_needed control files')
