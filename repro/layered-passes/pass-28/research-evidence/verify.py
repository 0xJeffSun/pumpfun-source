"""Read-only lossless archive verification. Never imports or executes retained code."""
from pathlib import Path,PurePosixPath
import argparse,json,hashlib,gzip,tarfile,io
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def verify(seal):
 assert H((P/'manifest.json').read_bytes())==seal==(P/'manifest.sha256').read_text().split()[0]
 rows=json.loads((P/'manifest.json').read_bytes());assert set(rows)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and str(p.relative_to(P))not in ['manifest.json','manifest.sha256']}
 for n,r in rows.items():
  q=PurePosixPath(n);assert not q.is_absolute()and'..'not in q.parts;f=P/n;assert not f.is_symlink()and f.stat().st_size==r['bytes']and H(f.read_bytes())==r['sha256']
 j=json.loads((P/'inventory.json').read_bytes());raw=gzip.decompress((P/'archive.tar.gz').read_bytes());assert H(raw)==j['archive_raw_sha256']and len(raw)==j['archive_raw_bytes'];seen={}
 with tarfile.open(fileobj=io.BytesIO(raw),mode='r:')as t:
  for f in t:
   q=PurePosixPath(f.name);assert not q.is_absolute()and'..'not in q.parts and f.isfile()and f.name not in seen and f.name in j['members'];r=j['members'][f.name];b=t.extractfile(f).read();assert len(b)==f.size==r['bytes']and H(b)==r['sha256']and f.mode==r['mode']and f.mtime==0 and f.uid==f.gid==0
   if'git_blob'in r:assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob']
   seen[f.name]=b
 assert set(seen)==set(j['members'])and len(seen)==212 and len(j['groups'])==2
 for group,g in j['groups'].items():
  files={n[len(group)+1:]:b for n,b in seen.items()if n.startswith(group+'/')};assert H(files['manifest.json'])==g['seal'];m=json.loads(files['manifest.json']);m=m.get('files',m);assert len(m)==g['payloads']and set(files)==set(m)|{'manifest.json','manifest.sha256'}
  for n,r in m.items():assert H(files[n])==(r['sha256']if isinstance(r,dict)else r)
 return {'passed':True,'retained_groups':2,'exact_member_bytes_and_modes':212,'archived_code_executed':False,'new_body_data_analysis':False,'compiler_VM_probe_runs':0}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--expected-seal',required=True);x=a.parse_args();print(json.dumps(verify(x.expected_seal)))
