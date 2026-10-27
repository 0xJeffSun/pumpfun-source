from pathlib import Path
import hashlib,json,tarfile,tomllib
W=Path(__file__).resolve().parent;registry=Path.home()/'.cargo/registry';index='index.crates.io-6f17d22bba15001f';lock=tomllib.loads((W/'source/Cargo.lock').read_text());rows=[];files=0
sha=lambda b:hashlib.sha256(b).hexdigest()
for p in lock['package']:
 if not p.get('source','').startswith('registry+'):continue
 name=p['name']+'-'+p['version'];archive=registry/'cache'/index/(name+'.crate');src=registry/'src'/index/name
 assert sha(archive.read_bytes())==p['checksum'],name
 count=0
 with tarfile.open(archive,'r:gz')as tar:
  for member in tar.getmembers():
   if not member.isfile():continue
   path=Path(member.name);assert path.parts[0]==name and '..'not in path.parts
   relative=Path(*path.parts[1:]);data=tar.extractfile(member).read();assert (src/relative).is_file()and (src/relative).read_bytes()==data,(name,str(relative));count+=1
 files+=count;rows.append(dict(name=name,checksum=p['checksum'],files=count))
(W/'registry-check.json').write_text(json.dumps(dict(packages=len(rows),files=files,source=str(registry/'src'/index),all_match=True,rows=rows),indent=2)+'\n');print('Registry checked:',len(rows),'packages,',files,'files')
