"""Read-only actual compiled registry closure against frozen authentic archives."""
from pathlib import Path
import hashlib,json,re,tarfile,tomllib
P=Path(__file__).resolve().parent;W=P/'cargo-home/registry/src/index.crates.io-6f17d22bba15001f';H=lambda b:hashlib.sha256(b).hexdigest();text=(P/'build-02/build.log').read_text();used=sorted(set(re.findall(re.escape(str(W))+r'/([^/\s]+)/',text)));lock={p['name']+'-'+p['version']:p for p in tomllib.loads((P/'crate/Cargo.lock').read_text())['package']if p.get('source','').startswith('registry+')};records=[]
for name in used:
 folder=W/name;archive=P/'cargo-home/registry/cache/index.crates.io-6f17d22bba15001f'/(name+'.crate');sha=H(archive.read_bytes());assert sha==lock[name]['checksum'];members={}
 with tarfile.open(archive)as tf:
  for m in tf:
   if not m.isfile():continue
   path=Path(m.name);assert path.parts[0]==name and '..'not in path.parts;n=str(Path(*path.parts[1:]));b=tf.extractfile(m).read();assert(folder/n).read_bytes()==b;members[n]=H(b)
 extra={str(p.relative_to(folder))for p in folder.rglob('*')if p.is_file()}-set(members);assert extra<=set(['.cargo-ok','.cargo-checksum.json'])
 records.append(dict(package=name,archive_sha256=sha,lock_checksum=lock[name]['checksum'],verified_source_files=len(members),archive_member_hash_inventory_sha256=H(json.dumps(members,sort_keys=True,separators=(',',':')).encode()),cargo_markers=sorted(extra)))
(P/'compiled-dependency-checks.json').write_text(json.dumps(dict(scope='Actualpositivelyobservedcompiledsource roots after single successfulbuild; frozenauthenticarchivechecksum/allmemberbytes/extra-source check',registry_namespace=W.name,compiled_registry_roots=len(used),source_files=sum(r['verified_source_files']for r in records),packages=records),indent=2)+'\n');print(len(used),'roots',sum(r['verified_source_files']for r in records),'files')
