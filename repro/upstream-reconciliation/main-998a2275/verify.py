"""Opaque retained Git bytes; no archived module import, compiler, target or probe."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,tarfile,gzip,io,stat
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def verify(seal,root=None):
 assert H((P/'manifest.json').read_bytes())==seal==(P/'manifest.sha256').read_text().split()[0]
 m=json.loads((P/'manifest.json').read_bytes());assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p.name not in ['manifest.json','manifest.sha256']}
 for n,r in m.items():
  p=P/n;assert not p.is_symlink()and H(p.read_bytes())==r['sha256']and p.stat().st_size==r['bytes']
 j=json.loads((P/'inventory.json').read_bytes());raw=gzip.decompress((P/'archive.tar.gz').read_bytes());assert H(raw)==j['archive_raw_sha256']and len(raw)==j['archive_raw_bytes'];expected={v['member']:v for x in j['rows']for v in x['versions'].values()if v is not None};seen=set()
 with tarfile.open(fileobj=io.BytesIO(raw),mode='r:')as t:
  for f in t:
   name=PurePosixPath(f.name);assert not name.is_absolute()and'..'not in name.parts and f.isfile()and f.name in expected and f.name not in seen;seen.add(f.name);v=expected[f.name];b=t.extractfile(f).read();assert len(b)==v['bytes']==f.size and H(b)==v['sha256'];assert f.mode==(int(v['git_mode'],8)&0o777)and f.mtime==0 and f.uid==f.gid==0;assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==v['git_blob']
 assert seen==set(expected)and len(j['rows'])==23
 if root is not None:
  root=root.resolve()
  for x in j['rows']:
   v=x['versions']['selected_before']or x['versions']['incoming'];p=root/x['path']
   for a in[p,*p.parents]:
    if a==root.parent:break
    assert not a.is_symlink()
   assert H(p.read_bytes())==v['sha256']and p.stat().st_size==v['bytes']and bool(p.stat().st_mode&stat.S_IXUSR)==(v['git_mode']=='100755')
 return {'passed':True,'incoming_paths':23,'retained_versions':25,'selected_status_preserved':root is not None,'archived_code_executed':False,'compiler_VM_probe_runs':0}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--expected-seal',required=True);a.add_argument('--current-root',type=Path);x=a.parse_args();print(json.dumps(verify(x.expected_seal,x.current_root)))
