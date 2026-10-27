from pathlib import Path
import gzip,json
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-program-id';D=W/'mayhem-historical-root-compat/publication/program-id-control';D.mkdir(exist_ok=False)
def put(n,b):
    p=D/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(gzip.compress(b,mtime=0)if n.endswith('.gz')else b)
def copy(p,n):
    b=p.read_bytes();put(n,gzip.decompress(b)if p.suffix=='.gz'else b)
for n in('source.tar.gz','framework-baseline.tar.gz','framework-program-id.tar.gz','patch.json','comparison.json','analysis-summary.json'):copy(P/n,n)
for n in('launch.json','result.json','stdout.log','stderr.log'):copy(P/'input'/n,'input/'+n+'.gz')
copy(P/'input/cargo-home/config.toml','input/config.toml')
for label in('build-01-baseline','build-02-program-id','build-03-repeat'):
    src=P/label
    for n in('launch.json','result.json','stdout.log','stderr.log','analysis.json','link-input-identities.json','symbols.so','stripped.so','strip.stdout.log','strip.stderr.log'):copy(src/n,label+'/'+n+'.gz')
    for p in(src/'link').iterdir():
        if p.is_file():copy(p,label+'/link/'+p.name+'.gz')
    records=[json.loads(p.read_bytes())for p in sorted((src/'wrapper-records').glob('*.json'))];put(label+'/records.json.gz',(json.dumps(records,indent=2)+'\n').encode())
for n in('prepare_historical_program_id.py','patch_historical_program_id.py','analyze_historical_program_id.py','package_historical_program_id.py'):copy(W/n,'controllers/'+n)
print('Retained',sum(p.is_file()for p in D.rglob('*')),'follow-up files')
