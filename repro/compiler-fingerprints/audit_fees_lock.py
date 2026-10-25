#!/usr/bin/env python3
"""Read-only Cargo.lock compatibility audit, with files/checksums recorded in scratch."""
import hashlib,io,json,tarfile,tomllib
from pathlib import Path
ROOT=Path(__file__).resolve().parent;REPO=ROOT.parent.parent
REGISTRIES=list((Path.home()/'.cargo/registry/src').glob('*'))
def digest(b):return hashlib.sha256(b).hexdigest()
def manifest(name,version):
 path=next(r/f'{name}-{version}'/'Cargo.toml' for r in REGISTRIES if (r/f'{name}-{version}'/'Cargo.toml').exists())
 b=path.read_bytes();d=tomllib.loads(b.decode());p=d['package']
 archive=path.parents[2]/'cache'/path.parent.parent.name/f'{name}-{version}.crate'
 if not archive.exists(): archive=(Path.home()/'.cargo/registry/cache')/path.parent.parent.name/f'{name}-{version}.crate'
 archive_data=archive.read_bytes()
 with tarfile.open(fileobj=io.BytesIO(archive_data),mode='r:gz') as tar:original=tar.extractfile(f'{name}-{version}/Cargo.toml').read()
 return {'name':name,'version':version,'edition':p.get('edition','2015'),'rust_version':p.get('rust-version'),'manifest_path':str(path),'manifest_sha256':digest(b),'manifest_matches_registry_file_checksum':b==original,'crate_sha256':digest(archive_data),'dependencies':d.get('dependencies',{}),'build_dependencies':d.get('build-dependencies',{}),'target_dependencies':d.get('target',{})}
lockpath=ROOT/'fees-Cargo.lock.snapshot';raw=lockpath.read_bytes();lock=tomllib.loads(raw.decode());(ROOT/'fees-Cargo.lock.snapshot').write_bytes(raw)
all_manifest=[];missing=[];bad=[]
for pkg in lock['package']:
 if not pkg.get('source','').startswith('registry+'):continue
 try:m=manifest(pkg['name'],pkg['version'])
 except StopIteration:missing.append(pkg);continue
 m['crate_checksum_matches_lock']=m['crate_sha256']==pkg['checksum'];all_manifest.append(m);rv=m['rust_version']
 if m['edition']=='2024' or (rv and tuple(int(x) for x in rv.split('.')[:2])>(1,79)):bad.append(m)
chosen=[('blake3','1.8.2'),('proc-macro-crate','3.3.0'),('toml_edit','0.22.27'),('indexmap','2.11.4'),('hashbrown','0.16.1'),('unicode-segmentation','1.12.0')]
candidates=[manifest(*p) for p in chosen]
index={}
for path in (ROOT/'registry').glob('*.jsonl'):
 index[path.stem]={x['vers']:x for x in map(json.loads,path.read_text().splitlines())}
for c in candidates:
 entry=index[c['name']][c['version']];c['sparse_index_metadata']=entry;c['crate_checksum_matches_official_index']=entry['cksum']==c['crate_sha256']
output={'source_lockfile':str(lockpath),'lockfile_version':lock['version'],'lockfile_sha256':digest(raw),'packages':len(lock['package']),'cached_registry_packages':len(all_manifest),'uncached_packages':missing,'incompatible_cached_manifests':bad,'candidate_manifests':candidates,'all_manifests':all_manifest}
(ROOT/'fees-lock-compatibility.json').write_text(json.dumps(output,indent=2)+'\n')
print('lock',output['lockfile_sha256'],'incompatible',len(bad),'candidates',len(candidates),'all local file checksums',all(m['manifest_matches_registry_file_checksum'] and m['crate_checksum_matches_lock'] for m in all_manifest),'candidate official checksums',all(m['manifest_matches_registry_file_checksum'] and m['crate_checksum_matches_official_index'] for m in candidates))
