"""Materialize exact locked archive regular files; never npm install/lifecycle/bin linking."""
from pathlib import Path,PurePosixPath
import base64,hashlib,io,json,tarfile
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());lock=J(P/'resolution/package-lock.json');receipts=J(P/'archive-receipts.json')['archives'];root=P/'materialized-03';assert not root.exists();rows=[];planned=[]
for rec in receipts:
 raw=(P/rec['file']).read_bytes();assert hashlib.sha256(raw).hexdigest()==rec['sha256'];alg,digest=rec['integrity'].split('-',1);assert base64.b64encode(hashlib.new(alg,raw).digest()).decode()==digest
 t=tarfile.open(fileobj=io.BytesIO(raw),mode='r:gz');members=t.getmembers();seen=set();payload={};roots={PurePosixPath(m.name).parts[0]for m in members};assert len(roots)==1;archive_root=next(iter(roots))
 for m in members:
  n=PurePosixPath(m.name);assert not n.is_absolute()and'..'not in n.parts and n.parts[0]==archive_root,m.name;assert m.name not in seen;seen.add(m.name)
  if m.isdir():continue
  assert m.isfile(),(m.name,m.type);b=t.extractfile(m).read();payload[str(PurePosixPath(*n.parts[1:]))]=(b,m.mode)
 assert 'package.json'in payload;metadata=json.loads(payload['package.json'][0]);assert archive_root in ['package',metadata['name'].split('/')[-1]]or(metadata['name']=='@types/node'and metadata['version']=='12.20.55'and archive_root=='node v12.20'and rec['sha256']=='e29266aed51ed53bf01570a1bd8d0f0c435c83b44cbd10b7ef785d3bd8d3bdf1')
 for path in rec['lock_paths']:
  planned.append((path,metadata,payload,rec))
root.mkdir();(root/'package.json').write_bytes((P/'resolution/package.json').read_bytes())
for path,metadata,payload,rec in sorted(planned,key=lambda x:(len(PurePosixPath(x[0]).parts),x[0])):
  pin=lock['packages'][path];assert pin['version']==metadata['version'];dest=root/path;assert not dest.exists();dest.mkdir(parents=True)
  for name,(b,mode)in payload.items():
   f=dest/name;f.parent.mkdir(parents=True,exist_ok=True);assert not f.exists();f.write_bytes(b)
  rows.append({'lock_path':path,'name':metadata['name'],'version':metadata['version'],'archive_sha256':rec['sha256'],'regular_file_count':len(payload),'package_json_sha256':hashlib.sha256(payload['package.json'][0]).hexdigest(),'lifecycle_scripts_declared':{k:v for k,v in metadata.get('scripts',{}).items()if k in ['preinstall','install','postinstall']},'lifecycle_scripts_executed':False,'bin_links_created':False})
(P/'materialization-03.json').write_text(json.dumps({'scope':'Raw locked regular-file materialization, not npm-ci equivalence or native addon build. No package JS/lifecycle run.','rows':rows},indent=2)+'\n');print('Materialized',len(rows),'locknodes',sum(r['regular_file_count']for r in rows),'regular files')
