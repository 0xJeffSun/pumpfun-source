from pathlib import Path
import gzip,hashlib,io,json,re,shutil,subprocess,tarfile
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-duplicate-check';M=P/'input';F=M/'framework';S=M/'source'
r=json.loads((P/'build-01-before/result.json').read_bytes());assert r['returncode']==0 and r['source_unchanged']and r['framework_unchanged']
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
before_f=snap(F);before_s=snap(S);launch=json.loads((P/'build-01-before/launch.json').read_bytes());assert before_f==launch['framework_inputs']and before_s==launch['source_inputs']
changed=json.loads((P/'source-acquisition.json').read_bytes())['changed'];assert len(changed)==5
for n in changed:
    source=P/'historical-after'/n;assert source.is_file();target=F/n;target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(source,target)
# Restore exactly the empty trait implementation now required by this upstream commit.
current=W/'mayhem-historical-root-compat/current-native-control/source/programs/mayhem/src/checked_program.rs';b=current.read_bytes();trait=b"impl anchor_lang::DuplicateMutableAccountKeys for CheckedSystemProgram<'_> {\n    fn duplicate_mutable_account_keys(&self) -> Vec<Pubkey> { vec![] }\n}\n";assert b.count(trait)==1 and(S/'src/checked_program.rs').read_bytes()==b.replace(trait,b'\n'*trait.count(b'\n'));(S/'src/checked_program.rs').write_bytes(b)
after_f=snap(F);after_s=snap(S);assert sorted(n for n in set(before_f)|set(after_f)if before_f.get(n)!=after_f.get(n))==changed
assert [n for n in before_s if before_s[n]!=after_s[n]]==['src/checked_program.rs']
save(P/'transition.json',dict(framework_changed=changed,source_changed=['src/checked_program.rs'],before_framework=before_f,after_framework=after_f,before_source=before_s,after_source=after_s,scope='Exact upstream adjacent commit change plus restoration of the now-present empty DuplicateMutableAccountKeys implementation; both variants retain the same known Program ID recovery and fixed source paths.',target_executions=0))
ml=json.loads((M/'launch.json').read_bytes());ml['command'].insert(3,'--locked');ml.update(source_inputs=after_s,framework_inputs=after_f,scope='Adjacent historical framework d790f27f after duplicate-mutable relaxation. Exact five upstream framework-file changes, unchanged dependency graph and Program ID recovery, and restored empty root trait implementation. Locked/offline metadata; no target execution.')
save(M/'launch.json',ml)
with(M/'stdout.log').open('wb')as so,(M/'stderr.log').open('wb')as se:r=subprocess.run(ml['command'],cwd=S,env=ml['environment'],stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
observed=dict(returncode=r.returncode,source_unchanged=snap(S)==after_s,framework_unchanged=snap(F)==after_f,target_executions=0);save(M/'result.json',observed);assert r.returncode==0 and observed['source_unchanged']and observed['framework_unchanged']
pack(S,P/'source-after.tar.gz');pack(F,P/'framework-after.tar.gz');save(P/'source-after.json',after_s)
shutil.copytree(M/'cargo-home',P/'metadata-after/cargo-home')
for n in('launch.json','result.json','stdout.log','stderr.log'):shutil.copyfile(M/n,P/'metadata-after'/n)
print('Advanced exact five framework files and restored empty trait implementation; locked graph accepted')
