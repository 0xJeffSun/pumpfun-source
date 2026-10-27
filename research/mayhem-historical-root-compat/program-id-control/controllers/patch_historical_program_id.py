from pathlib import Path
import gzip,hashlib,io,json,tarfile
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-program-id';F=P/'input/framework'
result=json.loads((P/'build-01-baseline/result.json').read_bytes());assert result['returncode']==0 and result['framework_unchanged']
def ident(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
before={p.relative_to(F).as_posix():ident(p.read_bytes())for p in F.rglob('*')if p.is_file()};assert before==json.loads((P/'build-01-baseline/launch.json').read_bytes())['framework_inputs']
old=b'        let is_unit_type = T::id() == Pubkey::default();\n\n        if !is_unit_type && info.key != &T::id() {'
new=b'        // The captured System parser checks the all-zero ID too.\n\n        if info.key != &T::id() {'
p=F/'lang/src/accounts/program.rs';b=p.read_bytes();assert b.count(old)==1;p.write_bytes(b.replace(old,new))
after={p.relative_to(F).as_posix():ident(p.read_bytes())for p in F.rglob('*')if p.is_file()};changed=[n for n in before if before[n]!=after[n]];assert changed==['lang/src/accounts/program.rs']
out=io.BytesIO()
with tarfile.open(fileobj=out,mode='w',format=tarfile.USTAR_FORMAT)as tf:
    for p in sorted(F.rglob('*')):
        if p.is_file():
            b=p.read_bytes();t=tarfile.TarInfo(p.relative_to(F).as_posix());t.size=len(b);t.mode=0o644;tf.addfile(t,io.BytesIO(b))
(P/'framework-program-id.tar.gz').write_bytes(gzip.compress(out.getvalue(),mtime=0))
(P/'patch.json').write_text(json.dumps(dict(changed_files=changed,before=before,after=after,recovery='Exact Program::try_from condition already used in the current reconstruction; apply to historical framework. Not an authentic upstream revision claim.',target_executions=0),indent=2)+'\n',encoding='utf-8')
print('Applied only recovered Program ID check; retained before/after framework archives')
