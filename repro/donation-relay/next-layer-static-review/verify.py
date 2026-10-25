#!/usr/bin/env python3
from pathlib import Path
import hashlib,json,os,subprocess,sys,tarfile,tempfile
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
m=J(P/'manifest.json');assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
files={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and str(p.relative_to(P))not in ['manifest.json','manifest.sha256']};assert files==set(m)
for n,h in m.items():assert not(P/n).is_symlink()and H((P/n).read_bytes())==h
meta=J(P/'envelope.json')
with tempfile.TemporaryDirectory(prefix='relay-static-review-')as tmp:
 root=Path(tmp)/'original';root.mkdir()
 with tarfile.open(P/'original-publication.tar.gz')as t:
  members=t.getmembers();assert sorted(x.name for x in members)==meta['archived_original_members']
  for item in members:
   n=Path(item.name);assert item.isfile()and not n.is_absolute()and'..'not in n.parts and not n.name.endswith('-keypair.json');d=root/n;d.parent.mkdir(parents=True,exist_ok=True);d.write_bytes(t.extractfile(item).read())
 assert H((root/'manifest.json').read_bytes())==meta['original_manifest_sha256']
 for n in meta['readable_original_members']:assert(P/'readable'/n).read_bytes()==(root/n).read_bytes()
 assert not any('__pycache__'in p.parts for p in(P/'readable').rglob('*'))
 r=subprocess.run([sys.executable,'-B',str(root/'verify.py')],cwd=root,env={**os.environ,'PYTHONPYCACHEPREFIX':str(Path(tmp)/'separate-cache'),'PYTHONDONTWRITEBYTECODE':'1'},capture_output=True,text=True);assert r.returncode==0,r.stdout+r.stderr
 print(json.dumps({'status':'PASS','original_manifest_sha256':meta['original_manifest_sha256'],'archive_members':len(members),'readable_members':len(meta['readable_original_members']),'inner_result':json.loads(r.stdout),'compiled':False,'target_executed':False},indent=2))
