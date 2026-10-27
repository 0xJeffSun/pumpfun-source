from pathlib import Path
import hashlib, json, tarfile, tomllib
W=Path(__file__).resolve().parent; P=W/'mayhem-historical-framework'; A=W/'mayhem-whole-parser/anchor-source.tar.gz'
def ident(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
def blob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
tree=json.loads((P/'source-tree.json').read_bytes()); rows={r['path']:r for r in tree['files']}
assert hashlib.sha256(A.read_bytes()).hexdigest()=='d6852a2ac6278c74dbb29d5b8c91f2ae29efa0d5edd4cf0a43f36464f2eb4480'
S=P/'historical'; S.mkdir(exist_ok=False); found={}
with tarfile.open(A,'r:gz')as tf:
    for m in tf:
        name=m.name.split('/',1)[-1]
        if name not in rows:continue
        r=rows[name];assert m.isfile()and r['mode']=='100644'and name not in found
        b=tf.extractfile(m).read();assert len(b)==r['size']and blob(b)==r['sha'],name
        dest=S/name;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(b);found[name]=ident(b)
assert found.keys()==rows.keys()
(P/'acquisition.json').write_text(json.dumps(dict(archive=ident(A.read_bytes()),source_inputs=found,target_executions=0),indent=2)+'\n',encoding='utf8',newline='\n')
pkgs={}
for f in S.rglob('Cargo.toml'):
    d=tomllib.loads(f.read_text(encoding='utf8'))
    if 'package'in d:pkgs[d['package']['name']]=dict(path=f.relative_to(S).as_posix(),version=d['package']['version'])
(P/'framework-packages.json').write_text(json.dumps(pkgs,indent=2)+'\n',encoding='utf8',newline='\n')
print('Verified historical files',len(found),'packages',len(pkgs))
