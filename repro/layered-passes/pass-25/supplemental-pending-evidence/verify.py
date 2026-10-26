"""Independent streamed archive-byte/member/permission verifier. Never imports archived code."""
from pathlib import Path,PurePosixPath
import argparse,json,hashlib,tarfile,stat
from strict_evidence import strict_package,data
KNOWN={'amm-source-proof':'32825564c9164b980185c4b85d62fc4f4d66ec5ca296a5076621c1301dcde141','amm-unexecuted-build-plan':'e3c3a9d36f0626091c428a943265d3e56f988722d77605e999c7b143e1cd7890','fees-no-change-static-review':'fcd5e6a09a1b40f1a7b014d9d970046fb8e6263ad3114651d9db4d04ff886d51','fees-admitted-with-values-static':'659afe6db95236c8fab594196e58a703ec69dfc5b2a3cb4fb0414fca1cf951b8','metadata-v2-unexecuted-proposal':'23082c205a00c409a7a045e5ced109e864cda39476d649e9af8fac73ce813202'}
P=Path(__file__).resolve().parent;p=argparse.ArgumentParser();p.add_argument('--expected-seal',required=True);a=p.parse_args();strict_package(P,a.expected_seal);index=json.loads(data(P/'archive-index.json'));assert {x['label']:x['known_inner_seal']for x in index['packages']}==KNOWN
class Parts:
 def __init__(self):self.i=0;self.stream=None;self.length=0;self.hash=hashlib.sha256()
 def read(self,n=-1):
  out=[];remaining=n
  while remaining!=0:
   if self.stream is None:
    if self.i==len(index['parts']):break
    row=index['parts'][self.i];assert row['offset']==self.length and row['bytes']<=64*1024*1024
    path=P/row['path'];raw=data(path);assert len(raw)==row['bytes']and hashlib.sha256(raw).hexdigest()==row['sha256'];self.stream=path.open('rb');self.i+=1
   raw=self.stream.read(1024*1024 if remaining<0 else remaining)
   if not raw:self.stream.close();self.stream=None;continue
   self.hash.update(raw);self.length+=len(raw);out.append(raw)
   if remaining>0:remaining-=len(raw)
  return b''.join(out)
assert hashlib.sha256(data(P/'prior-attempt/manifest.json')).hexdigest()=='62f04172a2ded93649a992a083442fb34b7afd01644074486527f45f8690710b'
prior=json.loads(data(P/'prior-attempt/manifest.json'))
for name,row in prior.items():
 if name=='archive-index.json'or name.startswith('parts/'):
  raw=data(P/name);assert hashlib.sha256(raw).hexdigest()==row['sha256']and len(raw)==row['bytes'],('unaltered firstarchive',name)
stream=Parts();seen=[];file_rows={label:{}for label in KNOWN};manifests={};sidecars={};directories=0
with tarfile.open(fileobj=stream,mode='r|gz')as tar:
 for member in tar:
  name=member.name.rstrip('/')if member.isdir()else member.name;rel=PurePosixPath(name);assert not rel.is_absolute()and'..'not in rel.parts and str(rel)==name;assert member.isdir()or member.isfile();assert name not in seen;seen.append(name);row=index['members'][name]
  assert row['type']==('directory'if member.isdir()else'file')
  assert member.mode==row['mode']&0o7777,(name,'permissionbits')
  assert stat.S_IFMT(row['mode'])==(stat.S_IFDIR if member.isdir()else stat.S_IFREG),(name,'filetypebits')
  for key in ['uid','gid','uname','gname','mtime']:assert getattr(member,key)==row[key],(name,key)
  assert member.size==row['bytes']
  if member.isdir():directories+=1;continue
  digest=hashlib.sha256();length=0;captured=[];label,filename=name.split('/',1);assert label in KNOWN
  with tar.extractfile(member)as source:
   while raw:=source.read(1024*1024):digest.update(raw);length+=len(raw);captured.append(raw)if filename in ['manifest.json','manifest.sha256']else None
  assert digest.hexdigest()==row['sha256']and length==row['bytes'];file_rows[label][filename]={'sha256':digest.hexdigest(),'bytes':length}
  if filename=='manifest.json':manifests[label]=b''.join(captured)
  elif filename=='manifest.sha256':sidecars[label]=b''.join(captured)
while stream.read(1024*1024):pass
assert stream.length==index['archive_bytes']and stream.hash.hexdigest()==index['archive_sha256']
assert seen==index['member_order']and set(seen)==set(index['members'])
for label,seal in KNOWN.items():
 assert hashlib.sha256(manifests[label]).hexdigest()==seal and sidecars[label]==(seal+'  manifest.json\n').encode();m=json.loads(manifests[label]);payload=m.get('files',m);assert set(file_rows[label])==set(payload)|{'manifest.json','manifest.sha256'}
 for name,value in payload.items():
  expected=value['sha256']if isinstance(value,dict)else value;assert file_rows[label][name]['sha256']==expected,(label,name)
  if isinstance(value,dict)and'bytes'in value:assert file_rows[label][name]['bytes']==value['bytes']
print(json.dumps({'passed':True,'outer_seal':a.expected_seal,'known_inner_seals':KNOWN,'complete_files':sum(len(v)for v in file_rows.values()),'complete_directories':directories,'archive_members':len(seen),'ordered_parts':len(index['parts']),'max_part_bytes':max(x['bytes']for x in index['parts']),'all_bytes_modes_metadata_verified':True,'archived_controllers_executed':0,'builds':0,'VM':0,'Fees_scope':'no-change limited static review','AMM_plan':'unexecuted','metadata_v2':'unexecuted proposal'}))
