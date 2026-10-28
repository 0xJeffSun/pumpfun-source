from pathlib import Path
import json,hashlib,gzip,lzma,tarfile,io,shutil,difflib
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');P=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-contribution-review/amm-v2-selector-20261028');J=Path('/home/ahi200/pumpfun-work/20261028-amm-v2-selector');T=R/'research/amm-v2-fee-selector-recovery';T.mkdir()
def write(name,data):
 p=T/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
def archive(files):
 raw=io.BytesIO()
 with tarfile.open(fileobj=raw,mode='w') as tf:
  for name,b in sorted(files.items()):
   m=tarfile.TarInfo(name);m.size=len(b);m.mode=0o644;tf.addfile(m,io.BytesIO(b))
 return gzip.compress(raw.getvalue(),mtime=0)
for label,src in [('baseline',J/'source-import-quote'),('candidate',J/'source-apply-match')]:write('sources/'+label+'.tar.gz',archive({p.relative_to(src).as_posix():p.read_bytes() for p in src.rglob('*') if p.is_file()}))
for label,src in [('baseline',J/'import-quote'),('candidate',J/'apply-match'),('repeat',J/'repeat')]:
 for name in ['launch.json','result.json']:write('builds/'+label+'/'+name,(src/name).read_bytes())
 for name in ['build.log','candidate.so','symbols.so']:write('builds/'+label+'/'+name+'.gz',gzip.compress((src/name).read_bytes(),mtime=0))
for label,src in [('baseline',J/'ir-import-quote'),('candidate',J/'ir-apply-match')]:
 for name in ['launch.json','result.json','function.ll','function.mir']:write('compiler/'+label+'/'+name,(src/name).read_bytes())
 for name in ['pump_amm_recovered.so','candidate.so','build.log']:write('compiler/'+label+'/'+name+'.gz',gzip.compress((src/name).read_bytes(),mtime=0))
write('compiler/route-module.ll.xz',lzma.compress((J/'ir-route-boundary/pump_amm_recovered.ll').read_bytes()))
for folder in ['codegen-layout','codegen-error-merge','codegen-route','codegen-route-order','regalloc-route']:
 for p in (J/folder).iterdir():
  if p.suffix in ['.asm','.diff','.json']:write('compiler/'+folder+'/'+p.name,p.read_bytes())
write('compiler/regalloc-route/passes.log.gz',gzip.compress((J/'regalloc-route/passes.log').read_bytes(),mtime=0))
for source,dest in [('runtime/triples.json.gz','runtime/triples.json.gz'),('observed.json.gz','runtime/observed.json.gz'),('runtime/inputs.json','runtime/inputs.json'),('runtime/summary.json','runtime/summary.json')]:write(dest,(J/source).read_bytes())
for p in P.glob('*.py'):write('controllers/'+p.name,p.read_bytes())
write('controllers/observer.py',(P.parent/'amm-incentive-regression-20261028/observer.py').read_bytes())
source='programs/pump-amm/src/curve/fees.rs';before=(J/'source-import-quote'/source).read_text();after=(J/'source-apply-match'/source).read_text();write('source.patch',''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/'+source,tofile='b/'+source)).encode());write('proposed/fees.rs',after.encode())
for name in ['materialize.py','rebuild.py','replay.py','test_runtime_controls.py']:write(name,(R/'research/amm-hop-gate-recovery'/name).read_bytes())
failed={}
for label in ['scoped-authority','owned-fees','selection-boundary','owned-selection','owned-direct','route-boundary','route-inverted','route-inverted2','route-returns','apply-boundary','route-early-inline']:
 for name in ['launch.json','result.json','build.log']:
  p=J/label/name
  if p.exists():failed[label+'/'+name]=p.read_bytes()
 p=J/('source-'+label)/source;failed[label+'/source.rs']=p.read_bytes()
 p=J/('measurement-'+label+'.json')
 if p.exists():failed[label+'/measurement.json']=p.read_bytes()
failed['prior-compressed.json']=(J/'prior-compressed.json').read_bytes();failed['STATUS.md']=(P/'STATUS.md').read_bytes();write('rejected.tar.gz',archive(failed));write('rejected-index.json',(json.dumps({n:hashlib.sha256(b).hexdigest() for n,b in failed.items()},indent=2)+'\n').encode())
review=json.loads((P/'latest-scope.json').read_text());review['recent']=[{k:p[k] for k in ['number','title','state','updated_at','html_url']} for p in review['recent']];write('overlap-review.json',(json.dumps(review,indent=2)+'\n').encode());print('packaged',T,flush=True)
