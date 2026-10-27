from pathlib import Path
import hashlib,io,json,tarfile,urllib.request
W=Path(__file__).resolve().parent;P=W/'mayhem-whole-parser'
def blob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def identity(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
receipt=json.loads((P/'source-tree.json').read_bytes());revision=receipt['revision']
url='https://api.github.com/repos/otter-sec/anchor/tarball/'+revision
archive=P/'anchor-source.tar.gz'
if not archive.exists():
    with urllib.request.urlopen(url,timeout=90)as response:archive.write_bytes(response.read())
data=archive.read_bytes();root=P/'historical';root.mkdir(exist_ok=False)
selected={r['path']:r for r in receipt['files']};found={}
with tarfile.open(fileobj=io.BytesIO(data),mode='r:gz')as tf:
    for member in tf:
        parts=member.name.split('/',1)
        if len(parts)!=2 or parts[1]not in selected:continue
        name=parts[1];r=selected[name];assert member.isfile()and name not in found and r['mode']=='100644'
        b=tf.extractfile(member).read();assert len(b)==r['size']and blob(b)==r['sha'],name
        path=root/name;path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(b);found[name]=identity(b)
assert set(found)==set(selected)
origin=json.loads((P/'historical-idl-origin.json').read_bytes())
if (P/'historical-pump.json').exists():b=(P/'historical-pump.json').read_bytes()
else:
    with urllib.request.urlopen(origin['download_url'],timeout=90)as response:b=response.read()
assert blob(b)==origin['sha']and len(b)==origin['size'];(P/'historical-pump.json').write_bytes(b)
result=dict(archive=dict(url=url,**identity(data)),source_files=found,historical_idl=identity(b),target_executions=0)
(P/'acquisition.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8',newline='\n')
print('Git blobs verified',len(found),'archive',len(data),'historical IDL',len(b))
