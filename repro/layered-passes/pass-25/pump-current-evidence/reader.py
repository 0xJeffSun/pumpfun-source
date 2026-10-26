from pathlib import Path
import hashlib,json,io,tarfile
from strict_evidence import strict_package,data
OUTER='38558828d8187996e6f9f06db2b4054af7e65e29345a85f4417f71558312beba'
INNER='98c49ab1a0aaad83f51224df4aa44bbfb36308f53e8351dbed51298b87fdc67a'
MAIN='8ddf73d78e98005c8f68d189ada95add9690770bbd95c17ba42b25c6b0b95749'
SHA=lambda b:hashlib.sha256(b).hexdigest()
def context(wrapper,main):
 wrapper=Path(wrapper);main=Path(main);strict_package(wrapper,OUTER);strict_package(main,MAIN)
 raw=data(wrapper/'inner-manifest.json');assert SHA(raw)==INNER
 manifest=json.loads(raw);layout=json.loads(data(wrapper/'layout.json'));assert layout['inner_manifest_seal']==INNER and set(layout['files'])==set(manifest)
 return wrapper,main,manifest,layout
class Parts:
 def __init__(self,root,row):self.root=root;self.parts=row['parts'];self.row=row;self.i=0;self.stream=None;self.length=0;self.digest=hashlib.sha256()
 def read(self,n=-1):
  out=[];remaining=n
  while remaining!=0:
   if self.stream is None:
    if self.i==len(self.parts):break
    p=self.parts[self.i];assert p['offset']==self.length
    source=self.root/p['path'];assert SHA(data(source))==p['sha256'] and source.stat().st_size==p['bytes'];self.stream=source.open('rb');self.i+=1
   block=self.stream.read(1024*1024 if remaining<0 else remaining)
   if not block:self.stream.close();self.stream=None;continue
   self.digest.update(block);self.length+=len(block);out.append(block)
   if remaining>0:remaining-=len(block)
  return b''.join(out)
 def finish(self):
  while self.read(1024*1024):pass
  assert self.length==self.row['bytes']and self.digest.hexdigest()==self.row['sha256']
def logical(ctx,name):
 wrapper,main,m,l=ctx;row=l['files'][name];assert row['sha256']==m[name]['sha256']and row['bytes']==m[name]['bytes'];reader=Parts(wrapper,row);raw=reader.read();reader.finish();return raw
def archive_members(ctx,wanted):
 wrapper,main,m,l=ctx;name='runtime-repository.tar.gz';row=l['files'][name];assert row['sha256']==m[name]['sha256']and row['bytes']==m[name]['bytes'];reader=Parts(wrapper,row);catalog=json.loads(logical(ctx,'archive-members.json'))[name];found={}
 with tarfile.open(fileobj=reader,mode='r|gz')as tar:
  for member in tar:
   if member.name not in wanted:continue
   assert member.isfile()and not member.issym();raw=tar.extractfile(member).read();v=catalog[member.name];assert SHA(raw)==v['sha256']and len(raw)==v['bytes']and member.mode==v['mode'];found[member.name]=(raw,member.mode)
 reader.finish();assert set(found)==set(wanted),set(wanted)-set(found);return found
