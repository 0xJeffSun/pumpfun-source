from pathlib import Path,PurePosixPath
import hashlib,json,shutil,subprocess,tarfile
W=Path(__file__).resolve().parent;R=W/'pumpfun-source';D=W/'mayhem-v2-phases';D.mkdir(exist_ok=False);A=W/'mayhem-amm-lifetimes';rev='e91c97097f334683d3f905ff0b0eb91612b4f51e';prefix='research/mayhem-current436-v2-controls-20261027/'
names=['README.md','manifest.json','summary.json','event-store-order.json','tools/curve-latest-analyze.py','tools/curve-event-stores.py','tools/curve-first-fields.py']
for label in ['r','x3','y','z']:names +=[label+'/source.tar.gz',label+'/source-inputs.json',label+'/source-delta.json']
names+=['r/build/symbols.so','r/build/candidate.so','r/diagnostics/fast-curve-after436-buyv2-r-buy_v2_handler-cfg.json.gz','r/diagnostics/fast-curve-after436-buyv2-r-sell_v2_handler-cfg.json.gz']
rows=[]
for n in names:
 p=prefix+n;b=subprocess.run(['git','cat-file','blob',rev+':'+p],cwd=R,capture_output=True,check=True).stdout;oid=subprocess.run(['git','rev-parse',rev+':'+p],cwd=R,capture_output=True,text=True,check=True).stdout.strip();assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==oid
 f=D/'upstream'/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b);rows.append(dict(path=p,local='upstream/'+n,git_blob=oid,bytes=len(b),sha256=hashlib.sha256(b).hexdigest()))
manifest=json.loads((D/'upstream/manifest.json').read_text());assert all(r['local']=='upstream/manifest.json' or manifest[r['local'].removeprefix('upstream/')]==r['sha256'] for r in rows)
for label in ['r','x3','y','z']:
 with tarfile.open(D/'upstream'/label/'source.tar.gz') as t:
  files={};seen=set()
  for m in t:
   n=PurePosixPath(m.name);assert not n.is_absolute() and '..' not in n.parts and ':' not in m.name and '\\' not in m.name and m.name not in seen;seen.add(m.name)
   if m.isdir():continue
   assert m.isfile();files[m.name]=t.extractfile(m).read()
  assert len(files)==67
 for name,b in files.items():f=D/'upstream'/label/'source'/name;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b)
shutil.copytree(A/'current438/source',D/'source-current439')
for n in ['buy_pump_swap.rs','pump_amm_interface.rs']:shutil.copyfile(A/'merged439/sources/shipped/instructions'/n,D/'source-current439/src/instructions'/n)
assert {p.relative_to(D/'source-current439').as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in (D/'source-current439').rglob('*') if p.is_file()}==json.loads((A/'merged439/sources/source-inputs.json').read_text())
(D/'acquisition.json').write_text(json.dumps(dict(revision=rev,files=rows,manifest_hashes_verified=True,current439_source_binding=str(A/'merged439/acquisition.json')),indent=2)+'\n',encoding='utf-8');print('Bound',len(rows),'research blobs and complete current439 plus four historical67-file sources.')
