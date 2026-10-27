from pathlib import Path,PurePosixPath
import hashlib,json,subprocess,sys,tarfile,tomllib
P=Path(__file__).resolve().parent/'mayhem-historical-framework'
lock=tomllib.loads((P/'historical/Cargo.lock').read_text(encoding='utf8'))
rows=json.loads((P/'extra-packages.json').read_bytes())if(P/'extra-packages.json').exists()else[]
receipts=json.loads((P/'extra-receipts.json').read_bytes())if(P/'extra-receipts.json').exists()else[]
for spec in sys.argv[1:]:
    name,_,version=spec.partition('@')
    matches=[r for r in lock['package']if r['name']==name and'checksum'in r and(not version or r['version']==version)]
    assert len(matches)==1,(name,[(r['name'],r['version'])for r in matches])
    r=matches[0];label=name+'-'+r['version'];d=P/'supplements'/label;assert not d.exists()
    arc=P/'archives'/(label+'.crate');arc.parent.mkdir(exist_ok=True);url='https://static.crates.io/crates/'+name+'/'+label+'.crate'
    with(arc.with_suffix('.log')).open('wb')as log:
        c=subprocess.run(['curl.exe','--fail','--location','--retry','1','--connect-timeout','15','--max-time','90','--output',str(arc),url],stdout=log,stderr=log,creationflags=subprocess.CREATE_NO_WINDOW)
    c.check_returncode();assert hashlib.sha256(arc.read_bytes()).hexdigest()==r['checksum'];files={}
    with tarfile.open(arc)as tf:
        for m in tf:
            p=PurePosixPath(m.name);assert p.parts[0]==label and not p.is_absolute()and'..'not in p.parts and':'not in m.name and'\\'not in m.name
            if m.isdir():continue
            assert m.isfile();rel=p.relative_to(label).as_posix();assert rel not in files
            b=tf.extractfile(m).read();out=d/rel;out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(b);files[rel]=dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
    rows.append(dict(name=name,version=r['version'],checksum=r['checksum'],directory=str(d)))
    receipts.append(dict(name=name,version=r['version'],url=url,archive_bytes=arc.stat().st_size,archive_sha256=r['checksum'],files=files))
    for path,value in [('extra-packages.json',rows),('extra-receipts.json',receipts)]:
        (P/path).write_text(json.dumps(value,indent=2)+'\n',encoding='utf8',newline='\n')
    print(label,len(files),'files checked',flush=True)
