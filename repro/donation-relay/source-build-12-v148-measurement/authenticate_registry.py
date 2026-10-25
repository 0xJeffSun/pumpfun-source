"""Authenticate postbuild registry roots against immutable original build12 maps."""
from pathlib import Path
import hashlib,json,re,tarfile,tomllib
P=Path(__file__).resolve().parent;REPO=next(p for p in P.parents if(p/'repro/donation-relay/source-build-12-idl-discriminator-owned').is_dir());H=lambda b:hashlib.sha256(b).hexdigest();old=REPO/'repro/donation-relay/source-build-12-idl-discriminator-owned';sealed={r['name']+'-'+r['version']:r for r in json.loads((old/'launcher/resolved-source-archive-equality.json').read_text())};W=P/'cargo-home/registry/src/index.crates.io-6f17d22bba15001f';import argparse
a=argparse.ArgumentParser();a.add_argument('--phase',choices=['before','after'],required=True);phase=a.parse_args().phase
text=(P/'build-01/build.log').read_text()if phase=='after'else'';used=set(re.findall(re.escape(str(W))+r'/([^/\s]+)/',text));lock={p['name']+'-'+p['version']:p for p in tomllib.loads((P/'source/Cargo.lock').read_text())['package']if p.get('source')};rows=[]
for name,package in lock.items():
 archive=P/'cargo-home/registry/cache/index.crates.io-6f17d22bba15001f'/(name+'.crate');assert H(archive.read_bytes())==package['checksum']==sealed[name]['archive_sha256'];files={}
 with tarfile.open(archive)as tf:
  for m in tf:
   if not m.isfile():continue
   path=Path(m.name);assert path.parts[0]==name and '..'not in path.parts;n=str(Path(*path.parts[1:]));b=tf.extractfile(m).read();assert(W/name/n).read_bytes()==b;files[n]=H(b)
 assert files==sealed[name]['files'];actual={str(f.relative_to(W/name))for f in(W/name).rglob('*')if f.is_file()};assert actual-set(files)<=set(['.cargo-ok']);rows.append(dict(package=name,archive_sha256=package['checksum'],verified_source_files=len(files),archive_member_hash_inventory_sha256=H(json.dumps(files,sort_keys=True,separators=(',',':')).encode()),positively_observed_compiled=name in used,matches_original_sealed_member_map=True))
assert used<=set(lock);(P/('registry-'+phase+'.json')).write_text(json.dumps(dict(scope='All232frozenlockroots after onebuild, exactauthenticmemberbytes; positiveactualcompiledrootsetfromverbosecommands',all_registry_roots=len(rows),source_files=sum(r['verified_source_files']for r in rows),compiled_registry_roots=len(used),compiled_source_files=sum(r['verified_source_files']for r in rows if r['positively_observed_compiled']),packages=rows),indent=2)+'\n');print(json.dumps(dict(all_roots=len(rows),actual_compiled_roots=len(used),all_files=sum(r['verified_source_files']for r in rows),compiled_files=sum(r['verified_source_files']for r in rows if r['positively_observed_compiled']))))
