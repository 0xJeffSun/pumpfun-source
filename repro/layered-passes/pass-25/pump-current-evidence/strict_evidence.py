"""Known-seal evidence traversal, never follows symlinks or runs payloads."""
from pathlib import Path,PurePosixPath
import hashlib,json,os,stat
CACHE={'__pycache__','.pytest_cache','.mypy_cache','.ruff_cache'}
def plain(p):
 p=Path(os.path.abspath(p))
 for q in [*reversed(p.parents),p]:assert not stat.S_ISLNK(q.lstat().st_mode),str(q)
 return p
def data(p):
 p=plain(p)
 with os.fdopen(os.open(p,os.O_RDONLY|getattr(os,'O_NOFOLLOW',0)),'rb')as f:
  assert stat.S_ISREG(os.fstat(f.fileno()).st_mode);return f.read()
def strict_package(root,seal):
 root=plain(root);assert isinstance(seal,str)and len(seal)==64
 raw=data(root/'manifest.json');assert hashlib.sha256(raw).hexdigest()==seal
 assert data(root/'manifest.sha256')==(seal+'  manifest.json\n').encode()
 m=json.loads(raw);dirs={''};files=set()
 for n in m:
  p=PurePosixPath(n);assert str(p)==n and not p.is_absolute()and'..'not in p.parts and n not in ['manifest.json','manifest.sha256'];dirs.update(str(q)for q in p.parents if str(q)!='.')
 def walk(folder):
  for x in os.scandir(folder):
   p=Path(x.path);n=p.relative_to(root).as_posix();mode=x.stat(follow_symlinks=False).st_mode
   assert not stat.S_ISLNK(mode)and x.name not in CACHE and p.suffix not in ['.pyc','.pyo'],n
   if stat.S_ISDIR(mode):assert n in dirs,n;walk(p)
   else:assert stat.S_ISREG(mode),n;files.add(n)
 walk(root);assert files==set(m)|{'manifest.json','manifest.sha256'}
 for n,v in m.items():
  b=data(root/n);assert hashlib.sha256(b).hexdigest()==v['sha256']and len(b)==v['bytes'],n
 return m
