"""Hash official archive and compare selected cached compiler/sysroot bytes read-only."""
from pathlib import Path
import hashlib,json,tarfile
P=Path(__file__).resolve().parent;T=Path('/Users/shawwalters/.cache/solana/v1.54/platform-tools');archive=P/'platform-tools-v154-osx-aarch64.tar.bz2'
H=lambda b:hashlib.sha256(b).hexdigest();release=json.loads((P/'v1.54-release.json').read_text());asset=next(a for a in release['assets'] if a['name']=='platform-tools-osx-aarch64.tar.bz2');sha=H(archive.read_bytes());assert archive.stat().st_size==asset['size'] and 'sha256:'+sha==asset['digest']
selected={};prefixes=set()
with tarfile.open(archive,mode='r|bz2') as tf:
 for m in tf:
  name=m.name.removeprefix('./');name=name.removeprefix('platform-tools/')
  if not m.isfile():continue
  chosen=name in ['version.md','rust/bin/rustc','rust/bin/cargo','rust/bin/rustdoc','rust/lib/rustlib/aarch64-apple-darwin/bin/rust-lld','llvm/bin/clang','llvm/bin/llc','llvm/bin/llvm-objcopy'] or name.startswith('rust/lib/') and (name.endswith('.dylib') or '/sbpf-solana-solana/lib/' in name)
  if chosen:
   b=tf.extractfile(m).read();p=T/name;assert p.is_file(),name;current=H(p.read_bytes());assert current==H(b),name;selected[name]={'bytes':len(b),'sha256':current}
assert 'rust/bin/rustc' in selected and any('/sbpf-solana-solana/lib/libcore-' in n for n in selected)
out={'official_release_url':release['html_url'],'asset_id':asset['id'],'asset_name':asset['name'],'asset_bytes':asset['size'],'asset_sha256':sha,'publisher_digest_matches':True,'cached_selected_bytes_match_official_archive':True,'selected_files':selected,'scope':'Selectedexecutable/dynamiclibrary/v0sysrootclosure;otherarchivefilesnotclaimedcheckedagainstcache'}
(P/'distribution-verification.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'publisher_digest_matches':True,'cached_selected_files_verified':len(selected),'asset_sha256':sha}))
