from pathlib import Path
from collections import defaultdict
import hashlib,json,shutil,tomllib
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-borsh';A=P/'historical-after';B=P/'historical-before'
def ident(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
def blob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def save(n,x):(P/n).write_text(json.dumps(x,indent=2)+'\n',encoding='utf-8')
shutil.copytree(W/'mayhem-historical-duplicate-check/historical-after',B);shutil.copytree(B,A)
shutil.copyfile(W/'mayhem-historical-duplicate-check/tree-after.json',P/'tree-before.json')
changed=json.loads((P/'changed-files.json').read_bytes())
for row in changed:
    b=row['text'].encode();assert blob(b)==row['sha'],row['path'];(A/row['path']).write_bytes(b)
snapshots={}
for stage,root in [('before',B),('after',A)]:
    tree=json.loads((P/('tree-'+stage+'.json')).read_bytes());rows={r['path']:r for r in tree['files']};files={p.relative_to(root).as_posix():p.read_bytes() for p in root.rglob('*') if p.is_file()}
    assert not tree['truncated'] and files.keys()==rows.keys()
    for n,b in files.items():assert len(b)==rows[n]['size'] and blob(b)==rows[n]['sha'] and rows[n]['mode']=='100644',n
    snapshots[stage]={n:ident(b) for n,b in files.items()}
save('source-acquisition.json',dict(**snapshots,changed=sorted(r['path'] for r in changed),target_executions=0))
workspace=tomllib.loads((A/'Cargo.toml').read_text(encoding='utf-8'));packages={}
for f in A.rglob('Cargo.toml'):
    j=tomllib.loads(f.read_text(encoding='utf-8'))
    if 'package' not in j:continue
    pkg=j['package'];version=pkg['version'];version=workspace['workspace']['package']['version'] if isinstance(version,dict) else version
    packages[pkg['name']]=dict(version=version,path=f.relative_to(A).as_posix())
save('framework-packages.json',packages)
lock=tomllib.loads((A/'Cargo.lock').read_text(encoding='utf-8'))['package'];bykey={(r['name'],r['version']):r for r in lock};byname=defaultdict(list)
for key in bykey:byname[key[0]].append(key)
todo=[(n,r['version']) for n,r in packages.items()];visited=set()
while todo:
    key=todo.pop()
    if key in visited:continue
    visited.add(key);r=bykey[key]
    for dep in r.get('dependencies',[]):
        parts=dep.split();candidates=byname[parts[0]]
        if len(parts)>1:candidates=[k for k in candidates if k[1]==parts[1]]
        assert len(candidates)==1,(dep,candidates);todo.append(candidates[0])
registry=[bykey[k] for k in sorted(visited) if bykey[k].get('source','').startswith('registry+')]
assert not [bykey[k] for k in visited if bykey[k].get('source') and not bykey[k]['source'].startswith('registry+')]
save('dependency-closure.json',dict(framework_packages=packages,packages=[bykey[k] for k in sorted(visited)],registry=registry))
cache={}
for root in (W/'mayhem-historical-duplicate-check/locked-vendor',W/'mayhem-native-build/vendor',W/'mayhem-historical-framework/locked-vendor'):
    for d in root.iterdir():
        if not(d/'.cargo-checksum.json').exists() or not(d/'Cargo.toml').exists():continue
        pkg=tomllib.loads((d/'Cargo.toml').read_text(encoding='utf-8'))['package'];ck=json.loads((d/'.cargo-checksum.json').read_bytes());cache[(pkg['name'],pkg['version'],ck['package'])]=d
existing=[];missing=[]
for r in registry:
    key=(r['name'],r['version'],r['checksum']);row={k:r[k] for k in ('name','version','checksum')}
    if key in cache:existing.append(dict(**row,path=str(cache[key])))
    else:missing.append(row)
save('existing-packages.json',existing);save('missing-packages.json',missing)
b=(W/'acquire_duplicate_vendor.py').read_bytes().replace(b"P=W/'mayhem-historical-duplicate-check'",b"P=W/'mayhem-historical-borsh'")
(W/'acquire_borsh_vendor.py').write_bytes(b)
print('Authenticated',len(snapshots['before']),len(snapshots['after']),'files;',len(registry),'registry closure;',len(existing),'cached;',len(missing),'missing')
print('Missing',[(r['name'],r['version']) for r in missing])
