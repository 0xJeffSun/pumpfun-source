"""Materialize exact locked archive regular files; never npm install/lifecycle/bin linking."""
from pathlib import Path,PurePosixPath
import base64,hashlib,io,json,tarfile
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());lock=J(P/'resolution/package-lock.json');receipts=J(P/'archive-receipts.json')['archives'];root=P/'materialized-02';assert not root.exists();root.mkdir();(root/'package.json').write_bytes((P/'resolution/package.json').read_bytes());rows=[];planned=[]
for rec in receipts:
 raw=(P/rec['file']).read_bytes();assert hashlib.sha256(raw).hexdigest()==rec['sha256'];alg,digest=rec['integrity'].split('-',1);assert base64.b64encode(hashlib.new(alg,raw).digest()).decode()==digest
 t=tarfile.open(fileobj=io.BytesIO(raw),mode='r:gz');members=t.getmembers();seen=set();payload={}
 for m in members:
  n=PurePosixPath(m.name);assert not n.is_absolute()and'..'not in n.parts and n.parts[0]=='package',m.name;assert m.name not in seen;seen.add(m.name)
  if m.isdir():continue
  assert m.isfile(),(m.name,m.type);b=t.extractfile(m).read();payload[str(PurePosixPath(*n.parts[1:]))]=(b,m.mode)
 assert 'package.json'in payload;metadata=json.loads(payload['package.json'][0])
 for path in rec['lock_paths']:
  planned.append((path,metadata,payload,rec))
for path,metadata,payload,rec in sorted(planned,key=lambda x:(len(PurePosixPath(x[0]).parts),x[0])):
  pin=lock['packages'][path];assert pin['version']==metadata['version'];dest=root/path;assert not dest.exists();dest.mkdir(parents=True)
  for name,(b,mode)in payload.items():
   f=dest/name;f.parent.mkdir(parents=True,exist_ok=True);assert not f.exists();f.write_bytes(b)
  rows.append({'lock_path':path,'name':metadata['name'],'version':metadata['version'],'archive_sha256':rec['sha256'],'regular_file_count':len(payload),'package_json_sha256':hashlib.sha256(payload['package.json'][0]).hexdigest(),'lifecycle_scripts_declared':{k:v for k,v in metadata.get('scripts',{}).items()if k in ['preinstall','install','postinstall']},'lifecycle_scripts_executed':False,'bin_links_created':False})
(P/'materialization-02.json').write_text(json.dumps({'scope':'Raw locked regular-file materialization, not npm-ci equivalence or native addon build. No package JS/lifecycle run.','rows':rows},indent=2)+'\n');print('Materialized',len(rows),'locknodes',sum(r['regular_file_count']for r in rows),'regular files')
