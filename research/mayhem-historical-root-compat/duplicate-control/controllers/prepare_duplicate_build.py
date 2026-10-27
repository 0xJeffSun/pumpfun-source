from pathlib import Path
import gzip,hashlib,io,json,re,shutil,subprocess,tarfile
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-duplicate-check';M=P/'input';M.mkdir(exist_ok=False);S=M/'source';F=M/'framework'
shutil.copytree(W/'mayhem-historical-root-compat/api-02-repeat/source',S);shutil.copytree(P/'historical-before',F)
def ident(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
def snap(root):return{p.relative_to(root).as_posix():ident(p.read_bytes())for p in root.rglob('*')if p.is_file()}
def save(p,j):p.write_text(json.dumps(j,indent=2)+'\n',encoding='utf-8')
def pack(root,p):
    out=io.BytesIO()
    with tarfile.open(fileobj=out,mode='w',format=tarfile.USTAR_FORMAT)as tf:
        for f in sorted(root.rglob('*')):
            if f.is_file():
                b=f.read_bytes();m=tarfile.TarInfo(f.relative_to(root).as_posix());m.size=len(b);m.mode=0o644;tf.addfile(m,io.BytesIO(b))
    p.write_bytes(gzip.compress(out.getvalue(),mtime=0))
# Restrict workspace membership to the complete framework/IDL packages, preserving Rust sources.
p=F/'Cargo.toml';b=p.read_bytes();b,n=re.subn(rb'members = \[.*?\]',b'members = ["idl", "idl/spec", "lang", "lang/attribute/*", "lang/derive/*", "lang/syn", "spl"]',b,count=1,flags=re.S);assert n==1;p.write_bytes(b)
# Carry the already-recovered Program ID check in both adjacent-revision controls.
p=F/'lang/src/accounts/program.rs';b=p.read_bytes();old=b'        let is_unit_type = T::id() == Pubkey::default();\n\n        if !is_unit_type && info.key != &T::id() {';new=b'        // The captured System parser checks the all-zero ID too.\n\n        if info.key != &T::id() {';assert b.count(old)==1;p.write_bytes(b.replace(old,new))
p=S/'Cargo.toml';b=p.read_bytes();old=(W/'mayhem-historical-framework/metadata-05/framework').as_posix().encode();assert b.count(old)==2;p.write_bytes(b.replace(old,F.as_posix().encode()));shutil.copyfile(F/'Cargo.lock',S/'Cargo.lock')
(M/'cargo-home').mkdir();(M/'temp').mkdir();(M/'cargo-home/config.toml').write_text('[source.crates-io]\nreplace-with="locked-vendor"\n[source.locked-vendor]\ndirectory='+json.dumps(str(P/'locked-vendor'))+'\n[net]\noffline=true\n',encoding='utf-8')
env=json.loads((W/'mayhem-historical-root-compat/full-compatible-input/launch.json').read_bytes())['environment'];env.update(CARGO_HOME=str(M/'cargo-home'),CARGO_TARGET_DIR=str(M/'target'),TEMP=str(M/'temp'),TMP=str(M/'temp'))
before=snap(S);framework=snap(F);cmd=[str(W/'mayhem-native-build/sdk/rust/bin/cargo.exe'),'metadata','--offline','--manifest-path',str(S/'Cargo.toml'),'--format-version','1']
launch=dict(command=cmd,cwd=str(S),environment=env,source_inputs=before,framework_inputs=framework,framework=str(F),scope='Adjacent historical framework control: parent5d058305 before duplicate-mutable relaxationd790f27f. Both hold the existing reconstructed Program ID recovery, historical CreateEvent and four-lifetime Context signatures. Before omits the absent empty trait implementation. Initial metadata prunes the authenticated historical lock; full compilation is locked/offline. No target execution.',target_executions=0)
save(M/'launch.json',launch)
with(M/'stdout.log').open('wb')as so,(M/'stderr.log').open('wb')as se:r=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
after=snap(S);result=dict(returncode=r.returncode,source_unchanged_except_lock=all(after[n]==h for n,h in before.items()if n!='Cargo.lock'),framework_unchanged=snap(F)==framework,lock_before=before['Cargo.lock'],lock_after=after['Cargo.lock'],target_executions=0);save(M/'result.json',result)
assert r.returncode==0 and result['source_unchanged_except_lock']and result['framework_unchanged'],result
locked=list(cmd);locked.insert(3,'--locked')
with(M/'locked.stdout.log').open('wb')as so,(M/'locked.stderr.log').open('wb')as se:r=subprocess.run(locked,cwd=S,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
save(M/'locked-result.json',dict(command=locked,returncode=r.returncode,source_unchanged=snap(S)==after));assert r.returncode==0 and snap(S)==after
pack(S,P/'source-before.tar.gz');pack(F,P/'framework-before.tar.gz');save(P/'source-before.json',after)
shutil.copytree(M/'cargo-home',P/'metadata-before/cargo-home')
for n in('launch.json','result.json','stdout.log','stderr.log','locked.stdout.log','locked.stderr.log','locked-result.json'):shutil.copyfile(M/n,P/'metadata-before'/n)
b=(W/'build_historical_root_compat_full.py').read_bytes();b=b.replace(b"P=W/'mayhem-historical-framework'",b"P=W/'mayhem-historical-duplicate-check'").replace(b"P/'historical/Cargo.lock'",b"P/'historical-after/Cargo.lock'");(W/'build_historical_duplicate_full.py').write_bytes(b)
meta=json.loads((M/'stdout.log').read_bytes());print('Resolved',sum(bool(x.get('source'))for x in meta['packages']),'registry packages and accepted pruned lock unchanged')
