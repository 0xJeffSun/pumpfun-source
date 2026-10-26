"""Install only this official asset into isolated scratch and bind selected bytes."""
from pathlib import Path
import hashlib,json,os,tarfile
P=Path(__file__).resolve().parent;A=P/'platform-tools-v147-osx-aarch64.tar.bz2';T=P/'platform-tools';H=lambda b:hashlib.sha256(b).hexdigest();release=json.loads((P/'v1.47-release.json').read_text());asset=next(x for x in release['assets']if x['name']=='platform-tools-osx-aarch64.tar.bz2');assert A.stat().st_size==asset['size'];digest=H(A.read_bytes());assert asset['digest'] is None;T.mkdir(exist_ok=False);selected={};regular_count=0
with tarfile.open(A,mode='r|bz2')as tf:
 for member in tf:
  name=member.name.removeprefix('./');parts=Path(name).parts;assert not Path(name).is_absolute()and '..'not in parts
  chosen=member.isfile()and(name in ['version.md','rust/bin/rustc','rust/bin/cargo','rust/bin/rustdoc','rust/lib/rustlib/aarch64-apple-darwin/bin/rust-lld','llvm/bin/llc','llvm/bin/llvm-objcopy','llvm/bin/llvm-ar']or name.startswith('rust/lib/')and(name.endswith('.dylib')or'/sbpf-solana-solana/lib/'in name))
  if chosen:
   b=tf.extractfile(member).read();dest=T/name;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(b);dest.chmod(member.mode);assert H(dest.read_bytes())==H(b);selected[name]=dict(bytes=len(b),sha256=H(b),archive_and_isolated_file_equal=True)
  else:tf.extract(member,T,filter='data')
  regular_count+=member.isfile()
version=(T/'version.md').read_text();assert '89fb68fd3298a1c6998337b891f975eb60b8a4e4' in version
assert 'rust/bin/rustc'in selected and any('libcore-'in name for name in selected)
out=dict(release_id=release['id'],asset_id=asset['id'],asset_name=asset['name'],asset_bytes=asset['size'],official_url=asset['browser_download_url'],archive_sha256=digest,publisher_digest=asset['digest'],publisher_digest_match_claimed=False,provenance='Downloaded official GitHub release asset over HTTPS; measured hash/size and isolated archive-member equality, no independent publisher checksum available',selected_files=selected,archive_regular_members=regular_count,version_md=version,no_global_toolchain_install=True)
(P/'distribution-verification.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(dict(archive_sha256=digest,selected_files=len(selected),version_md=version)))
