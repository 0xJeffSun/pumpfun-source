from pathlib import Path,PurePosixPath
from concurrent.futures import ThreadPoolExecutor,as_completed
from datetime import datetime,timezone
import hashlib,json,tarfile,urllib.request,time
W=Path(__file__).resolve().parent;P=W/'mayhem-native-build';C=P/'crates';C.mkdir(exist_ok=True)
V=P/'vendor';V.mkdir(exist_ok=True)
packages=json.loads((P/'locked-packages.json').read_bytes())
def sha(raw):return hashlib.sha256(raw).hexdigest()
def acquire(p):
    name=p['name']+'-'+p['version'];archive=C/(name+'.crate')
    url='https://static.crates.io/crates/'+p['name']+'/'+name+'.crate'
    log=dict(name=name,url=url,expected_sha256=p['checksum'],started_at=datetime.now(timezone.utc).isoformat(),attempts=[])
    try:
        if not archive.exists():
            for attempt in range(3):
                try:
                    with urllib.request.urlopen(url,timeout=60) as response:raw=response.read()
                    log['attempts'].append(dict(attempt=attempt+1,bytes=len(raw),sha256=sha(raw)))
                    assert sha(raw)==p['checksum'],'publisher archive checksum differs'
                    archive.write_bytes(raw);break
                except Exception as error:
                    log['attempts'].append(dict(attempt=attempt+1,error_type=type(error).__name__,error=str(error)))
                    if attempt==2:raise
                    time.sleep(1+attempt)
        raw=archive.read_bytes();assert sha(raw)==p['checksum']
        root=V/name;root.mkdir(exist_ok=False);files={}
        with tarfile.open(archive,'r:gz') as tar:
            for m in tar:
                q=PurePosixPath(m.name)
                if m.isdir():continue
                assert m.isfile(),(name,m.name,m.type)
                assert not q.is_absolute() and '..' not in q.parts and '\\' not in m.name and ':' not in m.name
                assert q.parts[0]==name and len(q.parts)>1
                relative=PurePosixPath(*q.parts[1:]).as_posix()
                assert relative not in files
                data=tar.extractfile(m).read();dest=root/relative;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data)
                files[relative]=sha(data)
        (root/'.cargo-checksum.json').write_text(json.dumps(dict(package=p['checksum'],files=files))+'\n')
        log.update(status='complete',bytes=len(raw),sha256=sha(raw),extracted_files=len(files))
    except Exception as error:
        log.update(status='failed',error_type=type(error).__name__,error=str(error))
    log['finished_at']=datetime.now(timezone.utc).isoformat()
    (C/(name+'.json')).write_text(json.dumps(log,indent=2)+'\n')
    return log
results=[]
with ThreadPoolExecutor(max_workers=6) as pool:
    futures=[pool.submit(acquire,p) for p in packages]
    for future in as_completed(futures):
        row=future.result();results.append(row)
        if row['status']!='complete' or len(results)%25==0:print(len(results),'/',len(packages),row['name'],row['status'],flush=True)
(P/'crate-acquisition.json').write_text(json.dumps(results,indent=2)+'\n')
assert len(results)==215 and all(r['status']=='complete' for r in results),'retained acquisition failures'
print('all215lockedarchivesverified',sum(r['bytes'] for r in results),'bytes',flush=True)
