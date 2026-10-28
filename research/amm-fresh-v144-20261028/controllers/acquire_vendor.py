from pathlib import Path,PurePosixPath
from concurrent.futures import ThreadPoolExecutor
import hashlib,io,json,tarfile,tomllib,urllib.request
D=Path(__file__).resolve().parent
rows=[p for p in tomllib.loads((D/'source/Cargo.lock').read_text())['package'] if 'checksum' in p]
(D/'archives').mkdir(exist_ok=True);(D/'vendor').mkdir(exist_ok=True)
def one(row):
 n=row['name']+'-'+row['version'];url=f'https://static.crates.io/crates/{row["name"]}/{n}.crate';a=D/'archives'/(n+'.crate')
 if not a.exists():a.write_bytes(urllib.request.urlopen(url,timeout=120).read())
 b=a.read_bytes();assert hashlib.sha256(b).hexdigest()==row['checksum'],n
 v=D/'vendor'/n;v.mkdir(exist_ok=True);files={}
 with tarfile.open(fileobj=io.BytesIO(b)) as t:
  for m in t.getmembers():
   p=PurePosixPath(m.name)
   assert p.parts[0]==n and not p.is_absolute() and '..' not in p.parts and ':' not in m.name and '\\' not in m.name
   if m.isdir():continue
   assert m.isfile(),m.name
   name=PurePosixPath(*p.parts[1:]).as_posix();assert name not in files
   data=t.extractfile(m).read();dest=v/name;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data);files[name]=hashlib.sha256(data).hexdigest()
 (v/'.cargo-checksum.json').write_bytes((json.dumps(dict(package=row['checksum'],files=files),sort_keys=True)+'\n').encode())
 return dict(name=n,url=url,bytes=len(b),sha256=row['checksum'],files=len(files))
with ThreadPoolExecutor(max_workers=8) as ex:
 receipts=list(ex.map(one,rows))
(D/'vendor-acquisition.json').write_bytes((json.dumps(receipts,indent=2)+'\n').encode());print('Verified and extracted',len(receipts),'locked packages,',sum(x['bytes'] for x in receipts),'archive bytes')
