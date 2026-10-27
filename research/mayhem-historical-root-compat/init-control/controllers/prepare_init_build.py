from pathlib import Path
import gzip,hashlib,io,json,shutil,subprocess,sys,tarfile
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-init-needed';M=P/'input';S=M/'source';F=M/'framework';stage=sys.argv[1];B=W/'mayhem-historical-borsh'
def ident(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
def snap(root):return {p.relative_to(root).as_posix():ident(p.read_bytes()) for p in root.rglob('*') if p.is_file()}
def save(p,j):p.write_text(json.dumps(j,indent=2)+'\n',encoding='utf-8')
def pack(root,p):
    out=io.BytesIO()
    with tarfile.open(fileobj=out,mode='w',format=tarfile.USTAR_FORMAT) as tf:
        for f in sorted(root.rglob('*')):
            if f.is_file():
                b=f.read_bytes();m=tarfile.TarInfo(f.relative_to(root).as_posix());m.size=len(b);m.mode=0o644;tf.addfile(m,io.BytesIO(b))
    p.write_bytes(gzip.compress(out.getvalue(),mtime=0))
if stage=='before':
    M.mkdir(exist_ok=False);shutil.copytree(B/'input/source',S);shutil.copytree(B/'input/framework',F)
    p=S/'Cargo.toml';b=p.read_bytes();old=(B/'input/framework').as_posix().encode();assert b.count(old)==2;p.write_bytes(b.replace(old,F.as_posix().encode()))
    (M/'cargo-home').mkdir();(M/'temp').mkdir();shutil.copyfile(B/'input/cargo-home/config.toml',M/'cargo-home/config.toml')
    pre_source=None;pre_framework=None
elif stage=='after':
    r=json.loads((P/'build-01-before/result.json').read_bytes());assert r['returncode']==0 and r['source_unchanged'] and r['framework_unchanged']
    last=json.loads((P/'build-01-before/launch.json').read_bytes());pre_source=snap(S);pre_framework=snap(F);assert pre_source==last['source_inputs'] and pre_framework==last['framework_inputs']
    for row in json.loads((P/'changed-files.json').read_bytes()):shutil.copyfile(P/'historical-after'/row['path'],F/row['path'])
else:raise ValueError(stage)
scope=('Adjacent Anchor a95c3564 before init_if_needed duplicate check inclusion; selected 150-file source identical to prior2dd5c247.' if stage=='before' else 'Adjacent Anchor7dba2009 after init_if_needed duplicate check inclusion; exactly three upstream framework Rust files change from before; source/lock/resolved metadata unchanged.')+' Both retain recovered Program ID check, restricted framework workspace, four-lifetime Context signatures and historical CreateEvent. Locked/offline; no target execution.'
env=json.loads((B/'metadata-after/launch.json').read_bytes())['environment'];env.update(CARGO_HOME=str(M/'cargo-home'),CARGO_TARGET_DIR=str(M/'target'),TEMP=str(M/'temp'),TMP=str(M/'temp'))
source=snap(S);framework=snap(F);cmd=[str(W/'mayhem-native-build/sdk/rust/bin/cargo.exe'),'metadata','--offline','--locked','--manifest-path',str(S/'Cargo.toml'),'--format-version','1']
launch=dict(command=cmd,cwd=str(S),environment=env,source_inputs=source,framework_inputs=framework,framework=str(F),scope=scope,target_executions=0);save(M/'launch.json',launch)
with(M/'stdout.log').open('wb') as so,(M/'stderr.log').open('wb') as se:r=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
result=dict(returncode=r.returncode,source_unchanged=snap(S)==source,framework_unchanged=snap(F)==framework,target_executions=0);save(M/'result.json',result);assert r.returncode==0 and result['source_unchanged'] and result['framework_unchanged']
if stage=='after':assert (M/'stdout.log').read_bytes()==(P/'metadata-before/stdout.log').read_bytes()
pack(S,P/('source-'+stage+'.tar.gz'));pack(F,P/('framework-'+stage+'.tar.gz'));save(P/('transition-'+stage+'.json'),dict(source_before=pre_source,framework_before=pre_framework,source_after=source,framework_after=framework,scope=scope))
out=P/('metadata-'+stage);shutil.copytree(M/'cargo-home',out/'cargo-home')
for n in ('launch.json','result.json','stdout.log','stderr.log'):shutil.copyfile(M/n,out/n)
if stage=='before':
    b=(W/'build_historical_borsh_full.py').read_bytes().replace(b"P=W/'mayhem-historical-borsh'",b"P=W/'mayhem-historical-init-needed'");(W/'build_historical_init_full.py').write_bytes(b)
    b=(W/'analyze_historical_borsh.py').read_bytes().replace(b"P=W/'mayhem-historical-borsh'",b"P=W/'mayhem-historical-init-needed'");(W/'analyze_historical_init.py').write_bytes(b)
print(stage,'metadata succeeded with source/framework unchanged')
