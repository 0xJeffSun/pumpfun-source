"""Read-only exact file and immutable-package checks."""
from pathlib import Path,PurePosixPath
import hashlib,json
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def local(root,name):
 p=PurePosixPath(name);assert not p.is_absolute()and'..'not in p.parts,name
 f=root/name;assert f.is_file()and not f.is_symlink()and f.resolve()==f,name
 return f
def digest(root,name,expected):assert H(local(root,name))==expected,name
def sealed(root,seal):
 assert not root.is_symlink()and H(root/'manifest.json')==seal,root
 m=J(root/'manifest.json');payload=m.get('files',m);actual=set()
 for f in root.rglob('*'):
  assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc',f
  if f.is_file()and f not in[root/'manifest.json',root/'manifest.sha256']:actual.add(str(f.relative_to(root)))
 assert actual==set(payload),root
 for n,v in payload.items():digest(root,n,v['sha256']if isinstance(v,dict)else v)
 if(root/'manifest.sha256').exists():assert(root/'manifest.sha256').read_text().split()[0]==seal
