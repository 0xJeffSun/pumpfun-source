from pathlib import Path
import hashlib,json,tomllib,tarfile
P=Path(__file__).resolve().parent;ROOT=P.parents[1]
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
lock=tomllib.loads((P/'source/programs/mayhem/Cargo.lock').read_text())
base=ROOT/'work/mayhem-burn-fixtures/cargo-home/registry/src';rows=[]
for dep in lock['package']:
 if not dep.get('source','').startswith('registry+'):continue
 hits=list(base.glob('*/'+dep['name']+'-'+dep['version']));assert len(hits)==1,(dep['name'],hits)
 folder=hits[0]
 archives=list((base.parent/'cache').glob('*/'+dep['name']+'-'+dep['version']+'.crate'));assert len(archives)==1
 archive=archives[0];assert H(archive)==dep['checksum'],dep['name']
 count=0
 with tarfile.open(archive) as t:
  for member in t.getmembers():
   if not member.isfile():continue
   rel=Path(member.name).relative_to(dep['name']+'-'+dep['version'])
   assert (folder/rel).read_bytes()==t.extractfile(member).read(),(dep['name'],str(rel))
   count+=1
 rows.append({'name':dep['name'],'version':dep['version'],'locked_package_checksum':dep['checksum'],'verified_files':count,'crate_archive_sha256':H(archive)})

current=json.loads((P/'build01/build-comparison.json').read_text());old=json.loads((ROOT/'repro/mayhem/twentyfour/build-comparison.json').read_text())
for key in ['rustc_sha256','sdk_source_sha256','selected_toolchain']:assert current[key]==old[key],key
(P/'dependency-integrity.json').write_text(json.dumps({'scope':'Every locked registry package archive SHA256 equals Cargo.lock; every retained archive member file equals extracted registry source. Tool/SBF SDK equality compared with accepted baseline.','registry_packages':rows,'selected_toolchain':current['selected_toolchain'],'rustc_sha256':current['rustc_sha256'],'sdk_source_sha256':current['sdk_source_sha256']},indent=2)+'\n')
print(len(rows),'locked registry packages verified; selected compiler and SDK match accepted baseline.')
