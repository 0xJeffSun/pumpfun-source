"""Verify used cached registry source files against locked authentic crate archives."""
from pathlib import Path
import hashlib,json,re,tarfile,tomllib
P=Path(__file__).resolve().parent;W=P/'cargo-home/registry/src/index.crates.io-1949cf8c6b5b557f';H=lambda b:hashlib.sha256(b).hexdigest();text=(P/'build-01/build.log').read_text();used=sorted(set(re.findall(re.escape(str(W))+r'/([^/\s]+)/',text)));lock=tomllib.loads((P/'crate/Cargo.lock').read_text());packages={p['name']+'-'+p['version']:p for p in lock['package'] if p.get('source','').startswith('registry+')};records=[]
for name in used:
 folder=W/name;archive=P/'cargo-home/registry/cache/index.crates.io-1949cf8c6b5b557f'/(name+'.crate');a=H(archive.read_bytes());assert a==packages[name]['checksum'];members={}
 with tarfile.open(archive) as tf:
  for m in tf:
   if not m.isfile():continue
   path=Path(m.name);assert path.parts[0]==name and '..' not in path.parts;relative=str(Path(*path.parts[1:]));b=tf.extractfile(m).read();assert (folder/relative).read_bytes()==b,(name,relative);members[relative]=H(b)
 actual={str(p.relative_to(folder)) for p in folder.rglob('*') if p.is_file()};assert actual-set(members)<=set(['.cargo-ok']), (name,actual-set(members))
 records.append({'package':name,'lock_package_checksum':packages[name]['checksum'],'verified_source_files':len(members),'archive_sha256':a,'archive_member_hash_inventory_sha256':H(json.dumps(members,sort_keys=True,separators=(',',':')).encode())})
(P/'compiled-dependency-checks.json').write_text(json.dumps({'scope':'Compiledregistryrootspositivelyobservedinverboserustcinvocations;allactualsourcefilesexceptCargoextractionmarkerverifiedbytewiseagainstcratearchiveshashmatchinglock;noinstall/update/network','packages':records,'compiled_registry_roots':len(used)},indent=2)+'\n');print(json.dumps({'compiled_registry_roots':len(used),'source_files_checked':sum(r['verified_source_files'] for r in records)}))
