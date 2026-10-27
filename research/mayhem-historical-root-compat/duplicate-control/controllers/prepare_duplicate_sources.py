from pathlib import Path, PurePosixPath
from collections import defaultdict
import hashlib,json,tarfile,tomllib

W=Path(__file__).resolve().parent;P=W/'mayhem-historical-duplicate-check'
def ident(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
def blob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def save(n,x):(P/n).write_text(json.dumps(x,indent=2)+'\n',encoding='utf-8')
after=json.loads((P/'tree-after.json').read_bytes());before=json.loads((P/'tree-before.json').read_bytes());rows={r['path']:r for r in after['files']};assert not after['truncated']and not before['truncated']
A=P/'historical-after';B=P/'historical-before';A.mkdir(exist_ok=False);B.mkdir(exist_ok=False);found={}
with tarfile.open(P/'anchor-d790.tar.gz','r:gz')as tf:
    for m in tf:
        name=m.name.split('/',1)[-1]
        if name not in rows:continue
        r=rows[name];p=PurePosixPath(name);assert not p.is_absolute()and'..'not in p.parts and'\\'not in name and':'not in name
        assert m.isfile()and r['mode']=='100644'and name not in found
        b=tf.extractfile(m).read();assert len(b)==r['size']and blob(b)==r['sha'],name
        f=A/name;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b);found[name]=ident(b)
assert found.keys()==rows.keys()
old={}
for r in before['files']:
    name=r['path'];p=A/name
    if not p.exists()or blob(p.read_bytes())!=r['sha']:p=P/'old-files'/name
    b=p.read_bytes();assert r['mode']=='100644'and len(b)==r['size']and blob(b)==r['sha'],name
    f=B/name;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b);old[name]=ident(b)
assert (A/'Cargo.lock').read_bytes()==(B/'Cargo.lock').read_bytes()
save('source-acquisition.json',dict(archive=ident((P/'anchor-d790.tar.gz').read_bytes()),before=old,after=found,changed=sorted(n for n in set(old)|set(found)if old.get(n)!=found.get(n)),target_executions=0))
workspace=tomllib.loads((A/'Cargo.toml').read_text(encoding='utf-8'))
packages={}
for f in A.rglob('Cargo.toml'):
    j=tomllib.loads(f.read_text(encoding='utf-8'))
    if'package'not in j:continue
    pkg=j['package'];version=pkg['version'];version=workspace['workspace']['package']['version']if isinstance(version,dict)else version
    packages[pkg['name']]=dict(version=version,path=f.relative_to(A).as_posix())
save('framework-packages.json',packages)
lock=tomllib.loads((A/'Cargo.lock').read_text(encoding='utf-8'))['package'];bykey={(r['name'],r['version']):r for r in lock};byname=defaultdict(list)
for key in bykey:byname[key[0]].append(key)
todo=[(n,r['version'])for n,r in packages.items()];visited=set()
while todo:
    key=todo.pop()
    if key in visited:continue
    visited.add(key);r=bykey[key]
    for dep in r.get('dependencies',[]):
        parts=dep.split();candidates=byname[parts[0]]
        if len(parts)>1:candidates=[k for k in candidates if k[1]==parts[1]]
        assert len(candidates)==1,(dep,candidates);todo.append(candidates[0])
registry=[bykey[k]for k in sorted(visited)if bykey[k].get('source','').startswith('registry+')];other=[bykey[k]for k in visited if bykey[k].get('source')and not bykey[k]['source'].startswith('registry+')];assert not other,other
save('dependency-closure.json',dict(framework_packages=packages,packages=[bykey[k]for k in sorted(visited)],registry=registry))
cache={}
for root in(W/'mayhem-historical-framework/locked-vendor',W/'mayhem-native-build/vendor',W/'mayhem-whole-parser/supplements',W/'mayhem-historical-framework/supplements'):
    if not root.exists():continue
    for d in root.iterdir():
        if not(d/'.cargo-checksum.json').exists()or not(d/'Cargo.toml').exists():continue
        pkg=tomllib.loads((d/'Cargo.toml').read_text(encoding='utf-8'))['package'];ck=json.loads((d/'.cargo-checksum.json').read_bytes());cache[(pkg['name'],pkg['version'],ck['package'])]=d
existing=[];missing=[]
for r in registry:
    key=(r['name'],r['version'],r['checksum']);row={k:r[k]for k in('name','version','checksum')}
    if key in cache:existing.append(dict(**row,path=str(cache[key])))
    else:missing.append(row)
save('existing-packages.json',existing);save('missing-packages.json',missing)
print('Authenticated before/after files',len(old),len(found),'framework packages',len(packages),'registry closure',len(registry),'cached',len(existing),'missing',len(missing))
