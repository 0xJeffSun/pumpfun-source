"""Hash/authenticate observed current registry source files against selected .crate members in memory. No extraction or execution."""
from pathlib import Path,PurePosixPath
import hashlib,io,json,tarfile
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 c=J(P/'capture.json');cache=J(P/'context/cache-allowlist.json')['files'];root=Path(c['cache_root']);groups={};aliases={}
 for raw,b in c['source_path_bindings'].items():
  if b['kind']!='approved-registry-source':continue
  raw_relative=PurePosixPath(raw).relative_to(PurePosixPath(c['cache_root']));original_package='/'.join(raw_relative.parts[:4]);assert original_package==b['package_root'],'Raw .. spelling escapes its named registry package'
  canonical=b['relative'];assert canonical.startswith(b['package_root']+'/')and'..'not in PurePosixPath(canonical).parts;groups.setdefault(b['package_root'],set()).add(canonical);aliases.setdefault(canonical,[]).append(raw)
 ledger=[];packages=[]
 for pkg,files in sorted(groups.items()):
  r=c['metadata_source_version_witnesses'][pkg];raw=(root/r['archive_path']).read_bytes();assert H(raw)==r['archive_sha256']==r['package_checksum']==cache[r['archive_path']]['sha256']
  prefix=r['name']+'-'+r['version']+'/'
  with tarfile.open(fileobj=io.BytesIO(raw),mode='r:gz')as archive:
   seen=set()
   for rel in sorted(files):
    member=prefix+rel[len(pkg)+1:];m=archive.getmember(member);assert m.isfile()and member not in seen;seen.add(member);source=root/rel;assert source.is_file()and all(not x.is_symlink()for x in[source,*source.parents]);actual=source.read_bytes();from_archive=archive.extractfile(m).read()
    assert actual==from_archive and H(actual)==cache[rel]['sha256']and len(actual)==cache[rel]['bytes']
    for alias in aliases[rel]:assert H(actual)==c['source_path_bindings'][alias]['sha256']
    ledger.append({'relative_source':rel,'package_root':pkg,'package_name':r['name'],'package_version':r['version'],'archive_path':r['archive_path'],'archive_sha256':H(raw),'archive_member':member,'source_sha256':H(actual),'source_bytes':len(actual),'archive_member_bytes':m.size,'source_equals_member_observed':True,'raw_path_aliases':sorted(aliases[rel])})
  packages.append({'root':pkg,'archive_sha256':H(raw),'observed_source_members':len(files)})
 excluded=[{'raw_source_path':raw,**b}for raw,b in c['source_path_bindings'].items()if b['kind']!='approved-registry-source']
 for n,h in c['metadata_before_after_sha256'].items():assert H((P/'target-metadata'/n).read_bytes())==h;assert H((Path(c['target_root'])/n).read_bytes())==h
 result={'status':'PASS_ALL_OBSERVED_REGISTRY_SOURCE_FILES_MATCH_APPROVED_LOCKED_ARCHIVE_MEMBERS','registry_source_raw_path_spellings':sum(len(v)for v in aliases.values()),'unique_registry_source_files':len(ledger),'registry_packages':len(packages),'source_file_bytes':sum(x['source_bytes']for x in ledger),'rows':ledger,'packages':packages,'non_registry_source_path_bindings':excluded,'package_local_dotdot_no_escape':True,'source_and_target_metadata_unchanged':True,'archive_bytes_retained':False,'source_file_bytes_retained':False,'replay_scope':'Portable verifier replays recorded hash/path/member relations; actual source/member byte equality is a capture observation. Exact archive and source bytes remain in authenticated build cache, not this metadata-only package.','native_compiler_target_VM_original_decoder_network_invocations':0}
 assert not(P/'archive-source-bindings.json').exists();(P/'archive-source-bindings.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:result[k]for k in['status','registry_source_raw_path_spellings','unique_registry_source_files','registry_packages','source_file_bytes']},indent=2))
if __name__=='__main__':main()
