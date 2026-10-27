from pathlib import Path,PurePosixPath
import concurrent.futures,hashlib,json,subprocess,tarfile,tomllib
P=Path(__file__).resolve().parent/'mayhem-historical-framework';A=P/'locked-archives';V=P/'locked-vendor'
meta=json.loads((P/'metadata-05/stdout.log').read_bytes());old=tomllib.loads((P/'historical/Cargo.lock').read_text(encoding='utf8'))['package'];pins={(p['name'],p['version']):p.get('checksum')for p in old}
pkgs=[p for p in meta['packages']if p.get('source')]
def check(p):
    label=p['name']+'-'+p['version'];arc=A/(label+'.crate');url='https://static.crates.io/crates/'+p['name']+'/'+label+'.crate';checksum=pins[(p['name'],p['version'])]
    if not arc.exists():
        with(A/(label+'.log')).open('wb')as log:c=subprocess.run(['curl.exe','--fail','--location','--retry','1','--connect-timeout','15','--max-time','90','--output',str(arc),url],stdout=log,stderr=log,creationflags=subprocess.CREATE_NO_WINDOW)
        c.check_returncode()
    assert hashlib.sha256(arc.read_bytes()).hexdigest()==checksum;files={}
    with tarfile.open(arc)as tf:
        for m in tf:
            q=PurePosixPath(m.name);assert not q.is_absolute()and q.parts[0]==label and'..'not in q.parts and':'not in m.name and'\\'not in m.name
            if m.isdir():continue
            assert m.isfile();name=q.relative_to(label).as_posix();assert name not in files
            b=tf.extractfile(m).read();files[name]=hashlib.sha256(b).hexdigest()
    ck=json.loads((V/label/'.cargo-checksum.json').read_bytes());assert ck['files']==files and ck['package']==checksum,label
    assert all(hashlib.sha256((V/label/n).read_bytes()).hexdigest()==h for n,h in files.items()),label
    return dict(name=p['name'],version=p['version'],url=url,archive_bytes=arc.stat().st_size,archive_sha256=checksum,files=files)
with concurrent.futures.ThreadPoolExecutor(max_workers=5)as ex:rows=list(ex.map(check,pkgs))
(P/'registry-archive-proof.json').write_text(json.dumps(rows,indent=2)+'\n',encoding='utf8',newline='\n');print('Authenticated',len(rows),'used registry packages;',sum(len(r['files'])for r in rows),'files;',sum(r['archive_bytes']for r in rows),'archive bytes')
