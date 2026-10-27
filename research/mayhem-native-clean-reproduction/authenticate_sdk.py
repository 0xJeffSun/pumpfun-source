from pathlib import Path
import tarfile,hashlib,json,os
import argparse
a=argparse.ArgumentParser();a.add_argument('--work',type=Path,required=True);args=a.parse_args();B=args.work.resolve();P=Path(__file__).resolve().parent;sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
for version in ['1.54','1.52']:
 info=json.loads((P/'toolchains'/('sdk-'+version+'-full.json')).read_bytes());arc=B/('platform-tools-v'+version+'.tar.bz2');root=B/('sdk-'+version);assert sha(arc)==info['archive_sha256'];files={};links={}
 with tarfile.open(arc,mode='r|bz2')as t:
  for m in t:
   path=Path(m.name);assert not path.is_absolute() and '..'not in path.parts
   dest=root/path
   if m.isfile():
    h=hashlib.file_digest(t.extractfile(m),'sha256').hexdigest();assert sha(dest)==h,m.name;files[path.as_posix()]=h
   elif m.issym():assert dest.is_symlink()and os.readlink(dest)==m.linkname,m.name;links[path.as_posix()]=m.linkname
 actual={f.relative_to(root).as_posix()for f in root.rglob('*')if f.is_file()and not f.is_symlink()};assert actual==set(files),(len(actual),len(files),actual-set(files))
 report=dict(version=version,url=info['url'],archive_sha256=info['archive_sha256'],files=files,symlinks=links,scope='Every regular installed SDK file equals its authenticated official Linux archive member; symlink targets equal archive declarations.')
 assert report==json.loads((P/'toolchains'/('sdk-'+version+'-full.json')).read_bytes());print(version,len(files),len(links),'verified',flush=True)
