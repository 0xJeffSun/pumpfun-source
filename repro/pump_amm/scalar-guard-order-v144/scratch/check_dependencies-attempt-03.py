from pathlib import Path
import hashlib,json,tomllib,tarfile
W=Path(__file__).resolve().parent;R=W.parents[1];CH=R/'work/pump-amm-v144/cargo-home';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();lock=tomllib.loads((W/'source/programs/pump-amm/Cargo.lock').read_text());rows=[]
for pkg in lock['package']:
 if 'checksum'not in pkg:continue
 name=pkg['name']+'-'+pkg['version'];archives=list((CH/'registry/cache').glob('*/'+name+'.crate'));sources=list((CH/'registry/src').glob('*/'+name));assert archives and sources,name
 assert all(sha(a)==pkg['checksum']for a in archives),name
 sources=sorted(sources,key=lambda p:p.parent.name);sources=[next(p for p in sources if p.parent.name=='index.crates.io-6f17d22bba15001f')]
 assert sha(archives[0])==pkg['checksum'],name
 excluded=[];checked={}
 with tarfile.open(archives[0],'r:gz')as archive:
  for member in archive.getmembers():
   if not member.isfile():continue
   relative=Path(member.name);assert not relative.is_absolute()and '..'not in relative.parts
   assert relative.parts[0]==name
   rel=Path(*relative.parts[1:]);assert rel.parts
   if rel.name.endswith('-keypair.json'):excluded.append(str(rel));continue
   expected=hashlib.sha256(archive.extractfile(member).read()).hexdigest();f=sources[0]/rel;assert not f.is_symlink();assert sha(f)==expected,(name,str(rel));checked[str(rel)]=expected
 rows.append({'name':pkg['name'],'version':pkg['version'],'archive_sha256':pkg['checksum'],'source_registry_directory':sources[0].parent.name,'archive_copy_count':len(archives),'verified_source_files':len(checked),'verified_source_manifest_sha256':hashlib.sha256(json.dumps(checked,sort_keys=True,separators=(',',':')).encode()).hexdigest(),'excluded_keypair_path_metadata':excluded})
report={'scope':'Postbuild read-only cache integrity of the1.79 registry directory observed in compiled dependency paths; duplicate archive cache directories are checked independently. Against unchanged locked registry archive checksums and exact public archive member bytes. This is not a prebuild observation or proof of the historical dependency graph. Public dependency content only; excluded filename metadata is retained without opening keypair files.','lockfile_sha256':sha(W/'source/programs/pump-amm/Cargo.lock'),'registry_packages':len(rows),'verified_source_files':sum(x['verified_source_files']for x in rows),'packages':rows}
(W/'dependency-integrity.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:v for k,v in report.items()if k!='packages'},indent=2))
