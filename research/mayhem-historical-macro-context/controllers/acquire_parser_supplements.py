from pathlib import Path,PurePosixPath
import concurrent.futures,hashlib,json,subprocess,tarfile
P=Path(__file__).resolve().parent/'mayhem-whole-parser';rows=json.loads((P/'supplement-packages.json').read_bytes())
(P/'archives').mkdir(exist_ok=True);(P/'supplements').mkdir(exist_ok=True)
def acquire(r):
    name=r['name']+'-'+r['version'];arc=P/'archives'/(name+'.crate');url='https://static.crates.io/crates/'+r['name']+'/'+name+'.crate'
    with(P/'archives'/(name+'.log')).open('wb')as log:
        c=subprocess.run(['curl.exe','--fail','--location','--retry','1','--connect-timeout','15','--max-time','90','--output',str(arc),url],stdout=log,stderr=log,creationflags=subprocess.CREATE_NO_WINDOW)
    c.check_returncode();assert hashlib.sha256(arc.read_bytes()).hexdigest()==r['checksum'];files={}
    with tarfile.open(arc)as t:
        for m in t:
            pp=PurePosixPath(m.name);assert pp.parts[0]==name and not pp.is_absolute()and'..'not in pp.parts
            if m.isdir():continue
            assert m.isfile(),m.name
            b=t.extractfile(m).read();out=P/'supplements'/m.name;out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(b)
            files[str(pp.relative_to(name))]=dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
    return dict(name=name,url=url,archive_bytes=arc.stat().st_size,archive_sha256=r['checksum'],files=files)
with concurrent.futures.ThreadPoolExecutor(max_workers=4)as ex:results=list(ex.map(acquire,rows))
(P/'supplement-receipts.json').write_text(json.dumps(results,indent=2)+'\n',encoding='utf8',newline='\n');print([(r['name'],len(r['files']))for r in results])
