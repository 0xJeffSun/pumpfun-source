from pathlib import Path
import gzip,hashlib,io,json,re,shutil,subprocess,sys,tarfile
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-borsh';M=P/'input';S=M/'source';F=M/'framework';stage=sys.argv[1]
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
    M.mkdir(exist_ok=False);shutil.copytree(W/'mayhem-historical-duplicate-check/input/source',S);shutil.copytree(P/'historical-before',F)
    # Keep both lock closures available at one fixed vendor location.
    for row in json.loads((W/'mayhem-historical-duplicate-check/dependency-closure.json').read_bytes())['registry']:
        name=row['name']+'-'+row['version'];dst=P/'locked-vendor'/name
        if dst.exists():continue
        src=W/'mayhem-historical-duplicate-check/locked-vendor'/name;ck=json.loads((src/'.cargo-checksum.json').read_bytes());assert ck['package']==row['checksum']
        assert {f.relative_to(src).as_posix() for f in src.rglob('*') if f.is_file() and f.name!='.cargo-checksum.json'}==set(ck['files'])
        assert all(ident((src/n).read_bytes())['sha256']==h for n,h in ck['files'].items());shutil.copytree(src,dst)
    p=F/'Cargo.toml';b,n=re.subn(rb'members = \[.*?\]',b'members = ["idl", "idl/spec", "lang", "lang/attribute/*", "lang/derive/*", "lang/syn", "spl"]',p.read_bytes(),count=1,flags=re.S);assert n==1;p.write_bytes(b)
    p=F/'lang/src/accounts/program.rs';b=p.read_bytes();old=b'        let is_unit_type = T::id() == Pubkey::default();\n\n        if !is_unit_type && info.key != &T::id() {';new=b'        // The captured System parser checks the all-zero ID too.\n\n        if info.key != &T::id() {';assert b.count(old)==1;p.write_bytes(b.replace(old,new))
    p=S/'Cargo.toml';b=p.read_bytes();old=(W/'mayhem-historical-duplicate-check/input/framework').as_posix().encode();assert b.count(old)==2;p.write_bytes(b.replace(old,F.as_posix().encode()))
    (M/'cargo-home').mkdir();(M/'temp').mkdir();(M/'cargo-home/config.toml').write_text('[source.crates-io]\nreplace-with="locked-vendor"\n[source.locked-vendor]\ndirectory='+json.dumps(str(P/'locked-vendor'))+'\n[net]\noffline=true\n',encoding='utf-8')
    scope='Relocated d790f27f baseline, old coherent registry lock; recovered Program ID check and four-lifetime Context source retained. Locked/offline metadata; no target execution.'
    pre_source=None;pre_framework=None
elif stage in ('graph','after'):
    last='build-01-baseline' if stage=='graph' else 'build-02-graph';r=json.loads((P/last/'result.json').read_bytes());assert r['returncode']==0 and r['source_unchanged'] and r['framework_unchanged']
    last_launch=json.loads((P/last/'launch.json').read_bytes());pre_source=snap(S);pre_framework=snap(F);assert pre_source==last_launch['source_inputs'] and pre_framework==last_launch['framework_inputs']
    changes=('Cargo.lock','lang/derive/serde/Cargo.toml') if stage=='graph' else ('lang/derive/serde/src/lib.rs','lang/src/lib.rs')
    for name in changes:shutil.copyfile(P/'historical-after'/name,F/name)
    if stage=='graph':shutil.copyfile(F/'Cargo.lock',S/'Cargo.lock')
    scope=('Synthetic dependency graph control: d790f27f Rust source with exactly the successor derive manifest and lock; no Rust changes.' if stage=='graph' else 'Exact 2dd5c247 historical framework Rust source with unchanged common Program ID recovery and restricted root workspace. Compared with graph control, only two upstream Rust files change; registry metadata must remain byte-identical.')+' No target execution.'
else:raise ValueError(stage)
env=json.loads((W/'mayhem-historical-duplicate-check/metadata-before/launch.json').read_bytes())['environment'];env.update(CARGO_HOME=str(M/'cargo-home'),CARGO_TARGET_DIR=str(M/'target'),TEMP=str(M/'temp'),TMP=str(M/'temp'))
before=snap(S);framework=snap(F);cmd=[str(W/'mayhem-native-build/sdk/rust/bin/cargo.exe'),'metadata','--offline','--manifest-path',str(S/'Cargo.toml'),'--format-version','1']
if stage!='graph':cmd.insert(3,'--locked')
launch=dict(command=cmd,cwd=str(S),environment=env,source_inputs=before,framework_inputs=framework,framework=str(F),scope=scope,target_executions=0)
save(M/'launch.json',launch)
with(M/'stdout.log').open('wb') as so,(M/'stderr.log').open('wb') as se:r=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
after=snap(S);result=dict(returncode=r.returncode,source_unchanged_except_lock=all(after[n]==h for n,h in before.items() if n!='Cargo.lock'),source_unchanged=before==after,framework_unchanged=snap(F)==framework,lock_before=before['Cargo.lock'],lock_after=after['Cargo.lock'],target_executions=0);save(M/'result.json',result)
assert r.returncode==0 and result['source_unchanged_except_lock'] and result['framework_unchanged'],result
locked=list(cmd)
if '--locked' not in locked:locked.insert(3,'--locked')
with(M/'locked.stdout.log').open('wb') as so,(M/'locked.stderr.log').open('wb') as se:r=subprocess.run(locked,cwd=S,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
save(M/'locked-result.json',dict(command=locked,returncode=r.returncode,source_unchanged=snap(S)==after));assert r.returncode==0 and snap(S)==after
assert (M/'stdout.log').read_bytes()==(M/'locked.stdout.log').read_bytes()
if stage=='after':assert (M/'stdout.log').read_bytes()==(P/'metadata-graph/stdout.log').read_bytes()
pack(S,P/('source-'+stage+'.tar.gz'));pack(F,P/('framework-'+stage+'.tar.gz'));save(P/('transition-'+stage+'.json'),dict(source_before=pre_source,framework_before=pre_framework,source_after=after,framework_after=framework,scope=scope))
out=P/('metadata-'+stage);shutil.copytree(M/'cargo-home',out/'cargo-home')
for n in ('launch.json','result.json','stdout.log','stderr.log','locked.stdout.log','locked.stderr.log','locked-result.json'):shutil.copyfile(M/n,out/n)
if stage=='baseline':
    b=(W/'build_historical_duplicate_full.py').read_bytes().replace(b"P=W/'mayhem-historical-duplicate-check'",b"P=W/'mayhem-historical-borsh'").replace(b"P/'historical-after/Cargo.lock'",b"F/'Cargo.lock'");(W/'build_historical_borsh_full.py').write_bytes(b)
    b=(W/'analyze_historical_duplicate.py').read_bytes().replace(b"P=W/'mayhem-historical-duplicate-check'",b"P=W/'mayhem-historical-borsh'");(W/'analyze_historical_borsh.py').write_bytes(b)
metadata=json.loads((M/'stdout.log').read_bytes());print(stage,'resolved',sum(bool(p.get('source')) for p in metadata['packages']),'registry packages; locked metadata repeat identical')
