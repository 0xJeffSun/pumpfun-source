from pathlib import Path,PurePosixPath
import concurrent.futures,hashlib,json,shutil,subprocess,tarfile,threading
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-framework';V=P/'locked-vendor';V.mkdir(exist_ok=False);A=P/'locked-archives';A.mkdir(exist_ok=False)
existing=json.loads((P/'historical-existing-packages.json').read_bytes());missing=json.loads((P/'historical-missing-packages.json').read_bytes());receipts=[]
def sha(p):
    with p.open('rb')as f:return hashlib.file_digest(f,'sha256').hexdigest()
def save(name,obj):(P/name).write_text(json.dumps(obj,indent=2)+'\n',encoding='utf8',newline='\n')
for r in existing:
    src=Path(r['path']);check=json.loads((src/'.cargo-checksum.json').read_bytes());assert check['package']==r['checksum']
    assert {p.relative_to(src).as_posix()for p in src.rglob('*')if p.is_file()and p.name!='.cargo-checksum.json'}==set(check['files'])
    assert all(not(src/n).is_symlink()and sha(src/n)==h for n,h in check['files'].items())
    dst=V/(r['name']+'-'+r['version']);shutil.copytree(src,dst)
    receipts.append(dict(name=r['name'],version=r['version'],package_sha256=r['checksum'],method='existing checksum-verified vendor copy',source=str(src),files=len(check['files'])))
save('locked-vendor-existing.json',receipts)
def acquire(r):
    name=r['name']+'-'+r['version'];arc=A/(name+'.crate');url='https://static.crates.io/crates/'+r['name']+'/'+name+'.crate';cached=None
    for root in(P/'archives',W/'mayhem-whole-parser/archives'):
        cp=root/(name+'.crate')
        if cp.exists()and sha(cp)==r['checksum']:cached=cp;break
    if cached:shutil.copyfile(cached,arc)
    else:
        with(A/(name+'.log')).open('wb')as log:
            c=subprocess.run(['curl.exe','--fail','--location','--retry','1','--connect-timeout','15','--max-time','90','--output',str(arc),url],stdout=log,stderr=log,creationflags=subprocess.CREATE_NO_WINDOW)
        c.check_returncode()
    assert sha(arc)==r['checksum'],name;files={};dst=V/name
    with tarfile.open(arc)as tf:
        for m in tf:
            p=PurePosixPath(m.name);assert not p.is_absolute()and p.parts[0]==name and'..'not in p.parts and':'not in m.name and'\\'not in m.name
            if m.isdir():continue
            assert m.isfile();rel=p.relative_to(name).as_posix();assert rel not in files and rel!='.cargo-checksum.json'
            b=tf.extractfile(m).read();out=dst/rel;out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(b);files[rel]=hashlib.sha256(b).hexdigest()
    (dst/'.cargo-checksum.json').write_text(json.dumps(dict(files=files,package=r['checksum']),sort_keys=True)+'\n',encoding='utf8',newline='\n')
    receipt=dict(name=r['name'],version=r['version'],package_sha256=r['checksum'],method='cached archive'if cached else'downloaded archive',url=url,cached_source=str(cached)if cached else None,archive_bytes=arc.stat().st_size,files=len(files))
    (A/(name+'.receipt.json')).write_text(json.dumps(receipt,indent=2)+'\n',encoding='utf8',newline='\n');return receipt
success=[];failures=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=5)as pool:
    futures={pool.submit(acquire,r):r for r in missing}
    for future in concurrent.futures.as_completed(futures):
        r=futures[future]
        try:success.append(future.result())
        except Exception as e:failures.append(dict(name=r['name'],version=r['version'],error_type=type(e).__name__,error=str(e)))
        if(len(success)+len(failures))%25==0:print('Checked',len(success),'download/cache packages; failures',len(failures),flush=True)
save('locked-vendor-acquisition.json',dict(existing=receipts,archives=sorted(success,key=lambda r:(r['name'],r['version'])),failures=failures))
assert not failures,failures
print('Historical registry closure ready:',len(receipts)+len(success),'packages',sum(r['archive_bytes']for r in success),'archive bytes',flush=True)
