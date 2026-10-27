from pathlib import Path
import gzip,hashlib,io,json,shutil,subprocess,sys,tarfile,tomllib
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-panic-return';M=P/'input';S=M/'source';F=M/'framework';L=M/'supplements/solana-define-syscall';B=W/'mayhem-historical-init-needed';stage=sys.argv[1]
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
if stage=='baseline':
    M.mkdir(parents=True,exist_ok=False);shutil.copytree(B/'input/source',S);shutil.copytree(B/'input/framework',F)
    old_vendor=W/'mayhem-historical-borsh/locked-vendor/solana-define-syscall-3.0.0';shutil.copytree(old_vendor,L,ignore=shutil.ignore_patterns('.cargo-checksum.json'))
    proof=next(r for r in json.loads(gzip.decompress((W/'mayhem-historical-framework/publication/registry-archive-proof.json.gz').read_bytes())) if (r['name'],r['version'])==('solana-define-syscall','3.0.0'))
    assert {n:h['sha256'] for n,h in snap(L).items()}==proof['files'];save(P/'local-crate-origin.json',proof)
    p=S/'Cargo.toml';b=p.read_bytes();old=(B/'input/framework').as_posix().encode();assert b.count(old)==2;b=b.replace(old,F.as_posix().encode());needle=b'[patch.crates-io]\n';assert b.count(needle)==1;b=b.replace(needle,needle+b'solana-define-syscall = { path = '+json.dumps(L.as_posix()).encode()+b' }\n');p.write_bytes(b)
    (M/'cargo-home').mkdir();(M/'temp').mkdir();shutil.copyfile(B/'input/cargo-home/config.toml',M/'cargo-home/config.toml')
    pre_source=None;pre_framework=None;pre_local=None
    scope='Path-source control: unchanged authenticated solana-define-syscall3.0.0 archive sources replace only that registry package through a fixed Cargo patch path. Root/Anchor source otherwise matches init_if_needed control with two relocated manifest paths. Original vendor checksum file is omitted for the path crate; original archive proof is retained. Initial offline metadata updates only that package source locator. No target execution.'
elif stage=='after':
    result=json.loads((P/'build-01-baseline/result.json').read_bytes());assert result['returncode']==0 and result['source_unchanged'] and result['supplements_unchanged']
    launch=json.loads((P/'build-01-baseline/launch.json').read_bytes());pre_source=snap(S);pre_framework=snap(F);pre_local=snap(L);assert pre_source==launch['source_inputs'] and pre_framework==launch['framework_inputs'] and launch['supplements']=={str(L):pre_local}
    p=L/'src/definitions.rs';b=p.read_bytes();old=b'define_syscall!(fn sol_panic_(filename: *const u8, filename_len: u64, line: u64, column: u64));';new=b'define_syscall!(fn sol_panic_(filename: *const u8, filename_len: u64, line: u64, column: u64) -> !);';assert b.count(old)==1;p.write_bytes(b.replace(old,new))
    scope='One-line source port of the upstream sol_panic_ never-return declaration into the local3.0.0 path crate. Does not add the separate abort declaration or claim an authentic unmodified crate version. Root/framework/lock/registry graph and paths unchanged from baseline; no target execution.'
else:raise ValueError(stage)
env=json.loads((B/'metadata-after/launch.json').read_bytes())['environment'];env.update(CARGO_HOME=str(M/'cargo-home'),CARGO_TARGET_DIR=str(M/'target'),TEMP=str(M/'temp'),TMP=str(M/'temp'))
source=snap(S);framework=snap(F);local=snap(L);cmd=[str(W/'mayhem-native-build/sdk/rust/bin/cargo.exe'),'metadata','--offline','--manifest-path',str(S/'Cargo.toml'),'--format-version','1']
if stage=='after':cmd.insert(3,'--locked')
launch=dict(command=cmd,cwd=str(S),environment=env,source_inputs=source,framework_inputs=framework,framework=str(F),supplement=str(L),supplement_inputs=local,scope=scope,target_executions=0);save(M/'launch.json',launch)
with(M/'stdout.log').open('wb') as so,(M/'stderr.log').open('wb') as se:r=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
after=snap(S);result=dict(returncode=r.returncode,source_unchanged_except_lock=all(after[n]==h for n,h in source.items() if n!='Cargo.lock'),source_unchanged=source==after,framework_unchanged=snap(F)==framework,supplement_unchanged=snap(L)==local,lock_before=source['Cargo.lock'],lock_after=after['Cargo.lock'],target_executions=0);save(M/'result.json',result)
assert r.returncode==0 and result['source_unchanged_except_lock'] and result['framework_unchanged'] and result['supplement_unchanged']
locked=list(cmd)
if '--locked' not in locked:locked.insert(3,'--locked')
with(M/'locked.stdout.log').open('wb') as so,(M/'locked.stderr.log').open('wb') as se:r=subprocess.run(locked,cwd=S,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
save(M/'locked-result.json',dict(command=locked,returncode=r.returncode,source_unchanged=snap(S)==after));assert r.returncode==0 and snap(S)==after and (M/'stdout.log').read_bytes()==(M/'locked.stdout.log').read_bytes()
if stage=='baseline':
    old=tomllib.loads((B/'input/source/Cargo.lock').read_text(encoding='utf-8'));new=tomllib.loads((S/'Cargo.lock').read_text(encoding='utf-8'));row=next(p for p in old['package'] if (p['name'],p['version'])==('solana-define-syscall','3.0.0'));del row['source'];del row['checksum'];assert old==new
else:assert (M/'stdout.log').read_bytes()==(P/'metadata-baseline/stdout.log').read_bytes()
for prefix,root in [('source',S),('framework',F),('supplement',L)]:pack(root,P/(prefix+'-'+stage+'.tar.gz'))
save(P/('transition-'+stage+'.json'),dict(source_before=pre_source,framework_before=pre_framework,supplement_before=pre_local,source_after=after,framework_after=framework,supplement_after=local,scope=scope))
out=P/('metadata-'+stage);shutil.copytree(M/'cargo-home',out/'cargo-home')
for n in ('launch.json','result.json','stdout.log','stderr.log','locked.stdout.log','locked.stderr.log','locked-result.json'):shutil.copyfile(M/n,out/n)
if stage=='baseline':
    b=(W/'build_historical_init_full.py').read_bytes().replace(b"P=W/'mayhem-historical-init-needed'",b"P=W/'mayhem-historical-panic-return'");(W/'build_historical_panic_full.py').write_bytes(b)
    b=(W/'analyze_historical_init.py').read_bytes().replace(b"P=W/'mayhem-historical-init-needed'",b"P=W/'mayhem-historical-panic-return'");(W/'analyze_historical_panic.py').write_bytes(b)
    shutil.copyfile(B/'panic-candidate/never-return-commit.json',P/'upstream-commit.json')
meta=json.loads((M/'stdout.log').read_bytes());print(stage,'resolved',sum(bool(p.get('source')) for p in meta['packages']),'registry packages; local source and locked metadata checked')
