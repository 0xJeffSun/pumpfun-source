from pathlib import Path,PurePosixPath
import hashlib,json,tarfile
D=Path(__file__).resolve().parent;a=D/'platform-tools-linux-x86_64.tar.bz2'
assert a.stat().st_size==490710349
out=D/'linux-sysroot';out.mkdir(exist_ok=False);rows=[]
with tarfile.open(a,'r|bz2') as t:
 for m in t:
  name=m.name.removeprefix('./')
  if not (name.startswith('rust/lib/rustlib/sbpf-solana-solana/lib/') or name=='version.md'):continue
  p=PurePosixPath(name)
  assert not p.is_absolute() and '..' not in p.parts and ':' not in name and '\\' not in name
  if m.isdir():continue
  assert m.isfile(),name
  b=t.extractfile(m).read();dest=out/name;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(b)
  rows.append(dict(path=name,bytes=len(b),sha256=hashlib.sha256(b).hexdigest()))
with a.open('rb') as f:digest=hashlib.file_digest(f,'sha256').hexdigest()
(D/'linux-sysroot-inputs.json').write_bytes((json.dumps(dict(archive_bytes=a.stat().st_size,archive_sha256=digest,url='https://github.com/anza-xyz/platform-tools/releases/download/v1.44/platform-tools-linux-x86_64.tar.bz2',files=rows),indent=2)+'\n').encode())
print('Retained',len(rows),'components',sum(x['bytes'] for x in rows),'bytes',digest)
