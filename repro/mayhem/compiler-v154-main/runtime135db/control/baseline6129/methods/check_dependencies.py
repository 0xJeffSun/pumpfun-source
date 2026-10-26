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

old=json.loads((ROOT/'repro/mayhem/buy-result-error-twentyfour/build01/build-comparison.json').read_text())
rustc=Path.home()/'.cache/solana/v1.52/platform-tools/rust/bin/rustc'
assert H(rustc)==old['rustc_sha256']
(P/'dependency-integrity-before.json').write_text(json.dumps({'scope':'All locked crate archives and source members verified before target execution; pinned compiler checked against accepted typed-buy baseline.','registry_packages':rows,'rustc_sha256':H(rustc)},indent=2)+'\n')
print(len(rows),'locked package archives and source trees verified.')
