from pathlib import Path
import gzip,hashlib,io,json,shutil,tarfile
W=Path(__file__).resolve().parent;D=W/'mayhem-fresh-host';D.mkdir(exist_ok=False);H=W/'mayhem-whole-parser';I=D/'host-inputs';I.mkdir()
shutil.copytree(W/'mayhem-dynamic-order/publication/controller',D/'controller')
shutil.copyfile(H/'source-tree.json',I/'source-tree.json');shutil.copyfile(H/'supplement-packages.json',I/'supplement-packages.json');shutil.copyfile(H/'supplement-receipts.json',I/'supplement-receipts.json')
rows=json.loads((I/'source-tree.json').read_text())['files'];files={}
for r in rows:
 b=(H/'historical'/r['path']).read_bytes();assert len(b)==r['size'] and hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['sha'];files[r['path']]=b
out=io.BytesIO()
with tarfile.open(fileobj=out,mode='w') as t:
 for n,b in sorted(files.items()):
  m=tarfile.TarInfo(n);m.size=len(b);m.mode=0o644;t.addfile(m,io.BytesIO(b))
(I/'historical-source.tar.gz').write_bytes(gzip.compress(out.getvalue(),mtime=0));lock=(H/'host-build-03/source/Cargo.lock').read_bytes();(I/'resolved-Cargo.lock').write_bytes(lock)
(I/'archives').mkdir()
for r in json.loads((I/'supplement-packages.json').read_text()):
 name=r['name']+'-'+r['version']+'.crate';b=(H/'archives'/name).read_bytes();assert hashlib.sha256(b).hexdigest()==r['checksum'];(I/'archives'/name).write_bytes(b)
pins={p.relative_to(I).as_posix():dict(bytes=p.stat().st_size,sha256=hashlib.sha256(p.read_bytes()).hexdigest()) for p in sorted(I.rglob('*')) if p.is_file()};(I/'inputs.json').write_bytes((json.dumps(pins,indent=2)+'\n').encode());print('Prepared',len(files),'historical source files and',len(pins),'input containers')
