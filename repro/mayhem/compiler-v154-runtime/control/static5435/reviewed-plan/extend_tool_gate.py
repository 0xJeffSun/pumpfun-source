"""Preparation-only full retained distribution provenance; no executable invocation."""
from pathlib import Path
import json,hashlib,tarfile,sys
P=Path(__file__).resolve().parent;T=Path('/Users/shawwalters/.cache/solana/v1.54/platform-tools');A=Path('/Users/shawwalters/Documents/Codex/2026-10-25/go/work/pumpfun-source/work/mayhem-v154-compiler-audit/platform-tools-v154-osx-aarch64.tar.bz2');H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();m=json.loads((P/'external-inputs.json').read_text());official={};links={}
with tarfile.open(A,mode='r|bz2')as tf:
 for entry in tf:
  n=entry.name.removeprefix('./').removeprefix('platform-tools/');f=T/n
  if entry.isfile():
   if not f.is_file():continue
   raw=tf.extractfile(entry).read();assert hashlib.sha256(raw).hexdigest()==H(f),n;official[n]=H(f);m[str(f)]=H(f)
  elif entry.issym()and f.is_symlink():
   assert f.readlink().as_posix()==entry.linkname,n;links[n]=entry.linkname
actual={str(f.relative_to(T))for f in T.rglob('*')if f.is_file()and not f.is_symlink()};assert actual==set(official),(len(actual),len(official),sorted(actual-set(official))[:10])
for n in ['llvm/bin/clang','llvm/bin/llvm-ar','llvm/bin/llvm-objdump','llvm/bin/llvm-objcopy','rust/bin/cargo','rust/bin/rustc','rust/bin/rustdoc']:assert(T/n).is_file();m[str(T/n)]=H(T/n)
m[str(Path(sys.executable).resolve())]=H(Path(sys.executable).resolve())
(P/'external-inputs.json').write_text(json.dumps(m,indent=2)+'\n');(P/'full-retained-tool-tree.json').write_text(json.dumps({'root':str(T),'regular_files':official,'symlinks':links,'scope':'Every retained regular file freshly byte-compared with official digest-authenticated archive; no claim missing unretained archive files used'},indent=2)+'\n');print('full retained tools',len(official),'symlinks',len(links),flush=True)
