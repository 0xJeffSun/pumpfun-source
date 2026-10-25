"""Isolated official release extraction and selected archive/member proof."""
from pathlib import Path
import json,hashlib,tarfile
P=Path(__file__).resolve().parent;T=P/'platform-tools';A=P/'platform-tools-v148-osx-aarch64.tar.bz2';H=lambda b:hashlib.sha256(b).hexdigest();release=json.loads((P/'v1.48-release.json').read_text());asset=next(x for x in release['assets']if x['id']==254652490);assert A.stat().st_size==asset['size']==422197780;assert asset['digest']is None;digest=H(A.read_bytes());assert not T.exists();T.mkdir();selected={};count=0
with tarfile.open(A,'r|bz2')as z:
 for m in z:
  n=m.name.removeprefix('./');part=Path(n);assert not part.is_absolute()and'..'not in part.parts
  choose=m.isfile()and(n in['version.md','rust/bin/rustc','rust/bin/cargo','rust/bin/rustdoc','rust/lib/rustlib/aarch64-apple-darwin/bin/rust-lld','llvm/bin/llc','llvm/bin/llvm-objcopy','llvm/bin/llvm-ar','llvm/bin/llvm-objdump','llvm/bin/clang-19']or n.startswith('rust/lib/')and(n.endswith('.dylib')or'/sbf-solana-solana/lib/'in n or'/sbpf-solana-solana/lib/'in n))
  if choose:
   b=z.extractfile(m).read();f=T/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b);f.chmod(m.mode);assert H(f.read_bytes())==H(b);selected[n]={'bytes':len(b),'sha256':H(b),'archive_member':n,'archive_and_isolated_file_equal':True}
  else:z.extract(m,T,filter='data')
  count+=m.isfile()
version=(T/'version.md').read_text();assert'293a1b6c60a0b8d92593843c373539e21e3ba087'in version
legacy={n:v for n,v in selected.items()if n.startswith('rust/lib/rustlib/sbf-solana-solana/lib/')};assert legacy
(P/'distribution-verification.json').write_text(json.dumps({'release_id':release['id'],'asset_id':asset['id'],'asset_name':asset['name'],'asset_bytes':asset['size'],'official_url':asset['browser_download_url'],'archive_sha256':digest,'publisher_digest':None,'publisher_digest_match_claimed':False,'selected_files':selected,'selected_legacy_sysroot_files':len(legacy),'archive_regular_files':count,'version_md':version,'isolated_extraction':True,'global_alias_writes':False},indent=2)+'\n');print(json.dumps({'archive_sha256':digest,'selected_files':len(selected),'legacy_sysroot_files':len(legacy),'version_md':version}))
