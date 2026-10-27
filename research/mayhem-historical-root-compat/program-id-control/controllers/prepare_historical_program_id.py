from pathlib import Path
import gzip,hashlib,io,json,shutil,subprocess,tarfile

W=Path(__file__).resolve().parent;P=W/'mayhem-historical-program-id';P.mkdir(exist_ok=False)
H=W/'mayhem-historical-framework';C=W/'mayhem-historical-root-compat';M=P/'input';M.mkdir();S=M/'source';F=M/'framework'
shutil.copytree(C/'full-compatible-input/source',S);shutil.copytree(H/'metadata-05/framework',F);shutil.copytree(C/'full-compatible-input/cargo-home',M/'cargo-home')
p=S/'Cargo.toml';b=p.read_bytes();old=(H/'metadata-05/framework').as_posix().encode();assert b.count(old)==2;p.write_bytes(b.replace(old,F.as_posix().encode()))

def ident(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
def snap(p):return{f.relative_to(p).as_posix():ident(f.read_bytes())for f in p.rglob('*')if f.is_file()}
def pack(p,dst):
    out=io.BytesIO()
    with tarfile.open(fileobj=out,mode='w',format=tarfile.USTAR_FORMAT)as tf:
        for f in sorted(p.rglob('*')):
            if f.is_file():
                b=f.read_bytes();t=tarfile.TarInfo(f.relative_to(p).as_posix());t.size=len(b);t.mode=0o644;tf.addfile(t,io.BytesIO(b))
    dst.write_bytes(gzip.compress(out.getvalue(),mtime=0))

before=snap(S);env=json.loads((C/'full-compatible-input/launch.json').read_bytes())['environment'];(M/'temp').mkdir()
env.update(CARGO_HOME=str(M/'cargo-home'),CARGO_TARGET_DIR=str(M/'target'),TEMP=str(M/'temp'),TMP=str(M/'temp'))
cmd=[str(W/'mayhem-native-build/sdk/rust/bin/cargo.exe'),'metadata','--offline','--locked','--manifest-path',str(S/'Cargo.toml'),'--format-version','1']
launch=dict(command=cmd,cwd=str(S),environment=env,source_inputs=before,framework=str(F),scope='Isolated continuation of PR277: identical compatibility source and historical graph, relocating only two root manifest framework paths. Baseline precedes one previously recovered Program ID-check change. No target execution.',target_executions=0)
(M/'launch.json').write_text(json.dumps(launch,indent=2)+'\n',encoding='utf-8')
with(M/'stdout.log').open('wb')as so,(M/'stderr.log').open('wb')as se:r=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
result=dict(returncode=r.returncode,source_unchanged=snap(S)==before,target_executions=0);(M/'result.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8');assert r.returncode==0 and result['source_unchanged'],result
pack(S,P/'source.tar.gz');pack(F,P/'framework-baseline.tar.gz');print('Prepared isolated source/framework and accepted unchanged lock')
