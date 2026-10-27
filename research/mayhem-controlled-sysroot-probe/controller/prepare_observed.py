"""Materialize hash-verified SDK components in the workspace; do not install tools."""
from pathlib import Path,PurePosixPath
from datetime import datetime,timezone
import hashlib,json,re,subprocess,sys,tarfile
W=Path(__file__).resolve().parent;P=W/'windows-typeid-probe';P.mkdir(exist_ok=True)
host=sys.argv[1];assert host in ('windows','linux','darwin')
metadata=json.loads((W/'v154-linux-release-metadata.json').read_bytes())
names=dict(windows='platform-tools-windows-x86_64.tar.bz2',linux='platform-tools-linux-x86_64.tar.bz2',darwin='platform-tools-osx-aarch64.tar.bz2')
asset,=[a for a in metadata['assets'] if a['name']==names[host]]
archive= P/names[host] if host=='windows' else W/('mayhem-alloc-provenance/linux' if host=='linux' else 'v154-static-probe')/names[host]
if not archive.exists():
    argv=['curl.exe','--fail','--location','--connect-timeout','30','--max-time','600','--output',str(archive),asset['browser_download_url']]
    started=datetime.now(timezone.utc).isoformat();r=subprocess.run(argv,capture_output=True,timeout=630)
    (P/(host+'-download.stdout.log')).write_bytes(r.stdout);(P/(host+'-download.stderr.log')).write_bytes(r.stderr)
    (P/(host+'-download.json')).write_text(json.dumps(dict(url=asset['browser_download_url'],started_at=started,finished_at=datetime.now(timezone.utc).isoformat(),exit=r.returncode),indent=2)+'\n')
    assert r.returncode==0
with archive.open('rb') as f:digest=hashlib.file_digest(f,'sha256').hexdigest()
assert archive.stat().st_size==asset['size'] and 'sha256:'+digest==asset['digest']
print(host,'verified complete publisher archive',digest,flush=True)
target=P/('windows-sdk' if host=='windows' else host+'-sysroot')
target.mkdir(exist_ok=True);records=[];headers=[]
with tarfile.open(archive,'r|bz2') as t:
    for m in t:
        name=m.name.removeprefix('./');p=PurePosixPath(name)
        headers.append(dict(name=name,bytes=m.size,type=m.type.decode(),linkname=m.linkname))
        generic=re.fullmatch(r'rust/lib/rustlib/sbpf-solana-solana/lib/[^/]+',name)
        needed=bool(generic) or name=='version.md'
        if host=='windows':needed=needed or name.startswith('rust/bin/') or (name.startswith(('rust/','llvm/')) and name.lower().endswith('.dll'))
        if not needed or m.isdir():continue
        assert m.isfile(),('nonregular selected component',name,m.type,m.linkname)
        assert not p.is_absolute() and '..' not in p.parts and '\\' not in name and ':' not in name
        raw=t.extractfile(m).read();destination=target.joinpath(*p.parts)
        destination.parent.mkdir(parents=True,exist_ok=True)
        if destination.exists():assert destination.read_bytes()==raw
        else:destination.write_bytes(raw)
        records.append(dict(path=name,bytes=len(raw),sha256=hashlib.sha256(raw).hexdigest()))
        if name.endswith(('rustc.exe','version.md')):print(host,records[-1],flush=True)
assert len(records)>10
(P/(host+'-components.json')).write_text(json.dumps(dict(asset=asset,archive_sha256=digest,selection='generic-v0 target files and version; Windows additionally rust/bin and Rust/LLVM DLLs',files=records),indent=2)+'\n',encoding='utf-8',newline='\n')
(P/(host+'-archive-headers.json')).write_text(json.dumps(headers,indent=2)+'\n',encoding='utf-8',newline='\n')
print(host,'materialized',len(records),'regular components;',sum(r['bytes'] for r in records),'bytes',flush=True)
