from pathlib import Path
import gzip,json
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-panic-return';D=W/'mayhem-historical-root-compat/publication/panic-control';D.mkdir(exist_ok=False)
def put(n,b):
    p=D/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(gzip.compress(b,mtime=0) if n.endswith('.gz') else b)
def copy(p,n):
    b=p.read_bytes();put(n,gzip.decompress(b) if p.suffix=='.gz' else b)
for stage in ('baseline','after'):
    for prefix in ('source','framework','supplement'):copy(P/(prefix+'-'+stage+'.tar.gz'),prefix+'-'+stage+'.tar.gz')
    copy(P/('transition-'+stage+'.json'),'transition-'+stage+'.json.gz')
    for f in (P/('metadata-'+stage)).iterdir():
        if f.is_file():copy(f,'metadata-'+stage+'/'+f.name+'.gz')
    copy(P/('metadata-'+stage+'/cargo-home/config.toml'),'metadata-'+stage+'/config.toml')
for n in ('upstream-commit.json','upstream-before.rs','upstream-after.rs','local-crate-origin.json','comparison.json','panic-comparison.json','current-artifact-comparison.json'):copy(P/n,n)
copy(P/'analysis-summary.json','analysis-summary.json.gz')
for label in ('build-01-baseline','build-02-after','build-03-repeat'):
    src=P/label
    for n in ('launch.json','result.json','stdout.log','stderr.log','analysis.json','link-input-identities.json','symbols.so','stripped.so','strip.stdout.log','strip.stderr.log'):copy(src/n,label+'/'+n+'.gz')
    for f in (src/'link').iterdir():
        if f.is_file():copy(f,label+'/link/'+f.name+'.gz')
    records=[json.loads(f.read_bytes()) for f in sorted((src/'wrapper-records').glob('*.json'))];put(label+'/records.json.gz',(json.dumps(records,indent=2)+'\n').encode())
for n in ('prepare_panic_build.py','build_historical_panic_full.py','analyze_historical_panic.py','summarize_panic_control.py','package_panic_control.py'):copy(W/n,'controllers/'+n)
print('Packaged',sum(p.is_file() for p in D.rglob('*')),'panic control files')
