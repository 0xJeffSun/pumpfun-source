from pathlib import Path
import tarfile,json,hashlib,re,datetime
W=Path('work/linux-v144-provenance');archive=W/'platform-tools-linux-x86_64.tar.bz2';sha=lambda b:hashlib.sha256(b).hexdigest();release=json.loads((W/'release.json').read_text());asset=next(x for x in release['assets'] if x['name']==archive.name);assert archive.stat().st_size==asset['size']
records=[];dest=W/'selected';dest.mkdir(exist_ok=True)
with tarfile.open(archive,'r|bz2') as t:
 for m in t:
  if not m.isfile():continue
  name=m.name
  if '/sbf-solana-solana/lib/' in name and Path(name).name.startswith(('liballoc-','libcore-','libstd-')) and name.endswith('.rlib') or name.endswith('/rust/bin/rustc') or name.endswith('/rust/bin/cargo'):
   b=t.extractfile(m).read();out=dest/Path(name).name;out.write_bytes(b);paths=sorted(set(x.decode('ascii') for x in re.findall(rb'/(?:home|Users)/[^\x00\x20-\x20\x7f-\xff]{1,200}/library/alloc/src/string\.rs',b)));records.append({'member':name,'bytes':len(b),'sha256':sha(b),'saved_as':str(out),'alloc_string_paths':paths})
report={'retrieved_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'release_url':release['html_url'],'release_tag':release['tag_name'],'release_commit':release['target_commitish'],'asset_url':asset['browser_download_url'],'asset_id':asset['id'],'asset_size':asset['size'],'publisher_digest':asset.get('digest'),'download_sha256':sha(archive.read_bytes()),'release_metadata_sha256':sha((W/'release.json').read_bytes()),'selected_members':records,'scope':'Official archive read only; no compiler execution, build, source edits or binary patches.'};(W/'archive-evidence.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(records,indent=2))
