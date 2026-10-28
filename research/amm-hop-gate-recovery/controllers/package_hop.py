from pathlib import Path
import json,hashlib,gzip,lzma,tarfile,io,shutil,difflib
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');P=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-contribution-review/amm-fee-selection-resume-20261028');H=Path('/home/ahi200/pumpfun-work/20261028-amm-select-resume');G=Path('/home/ahi200/pumpfun-work/20261028-amm-incentive-regression');T=R/'research/amm-hop-gate-recovery';T.mkdir()
def write(name,data):
 p=T/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
def archive(root):
 raw=io.BytesIO()
 with tarfile.open(fileobj=raw,mode='w') as tf:
  for p in sorted(root.rglob('*')):
   if p.is_file():
    b=p.read_bytes();m=tarfile.TarInfo(p.relative_to(root).as_posix());m.size=len(b);m.mode=0o644;tf.addfile(m,io.BytesIO(b))
 return gzip.compress(raw.getvalue(),mtime=0)
for label,src in [('baseline',G/'source-guard'),('candidate',H/'source-hop-lp-first')]:write('sources/'+label+'.tar.gz',archive(src))
for label,src in [('baseline',G/'guard'),('candidate',H/'hop-lp-first'),('repeat',H/'hop-repeat')]:
 for name in ['launch.json','result.json']:write('builds/'+label+'/'+name,(src/name).read_bytes())
 for name in ['build.log','candidate.so','symbols.so']:write('builds/'+label+'/'+name+'.gz',gzip.compress((src/name).read_bytes(),mtime=0))
for label,src in [('baseline',H/'ir-hop-baseline'),('borrowed-helper',H/'ir-hop-apply-ref2'),('candidate',H/'ir-hop-lp-first')]:
 for name in ['launch.json','result.json','function.ll','function.mir']:write('compiler/'+label+'/'+name,(src/name).read_bytes())
 for name in ['pump_amm_recovered.so','build.log']:write('compiler/'+label+'/'+name+'.gz',gzip.compress((src/name).read_bytes(),mtime=0))
write('compiler/borrowed-helper/module.ll.xz',lzma.compress((H/'ir-hop-apply-ref2/pump_amm_recovered.ll').read_bytes()))
for p in (H/'hop-codegen-qualified2').iterdir():
 if p.suffix in ['.asm','.diff','.json']:write('compiler/codegen/'+p.name,p.read_bytes())
write('measurement.json',(H/'measurement-hop-lp-first.json').read_bytes())
for source,dest in [('hop-runtime/triples.json.gz','runtime/triples.json.gz'),('hop-observed.json.gz','runtime/observed.json.gz'),('hop-runtime/inputs.json','runtime/inputs.json'),('hop-runtime/summary.json','runtime/summary.json'),('runtime-audit.json','runtime/audit.json')]:write(dest,(H/source).read_bytes())
for p in P.glob('*.py'):write('controllers/'+p.name,p.read_bytes())
write('controllers/observer.py',(P.parent/'amm-incentive-regression-20261028/observer.py').read_bytes())
write('overlap-review.json',(P/'scope-refresh.json').read_bytes())
source='programs/pump-amm/src/instructions/swap/multi_hop_swap.rs';before=(G/'source-guard'/source).read_text();after=(H/'source-hop-lp-first'/source).read_text();write('source.patch',''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/'+source,tofile='b/'+source)).encode());write('proposed/multi_hop_swap.rs',after.encode())
sourcebase=R/'research/amm-fee-value-call-recovery'
write('materialize.py',(sourcebase/'materialize.py').read_bytes())
rebuild=(sourcebase/'rebuild.py').read_text().replace("os.utime(a.source / 'crates/native-transfer-fee/src/lib.rs', None)\n",'').replace("assert sum(line.strip().startswith('Running `') and '--crate-name native_transfer_fee ' in line for line in log.splitlines()) == 1\n",'');write('rebuild.py',rebuild.encode())
# Preserve rejected source controls, with their original measurements and launches.
for label in ['cpi-parts','cpi-tail','hop-mask','hop-mask-if','hop-borrow','hop-gates','hop-gates-copy','hop-apply','hop-apply-ref2','hop-gate-first']:
 for name in ['launch.json','result.json']:
  p=H/label/name
  if p.exists():write('rejected/'+label+'/'+name,p.read_bytes())
 p=H/('measurement-'+label+'.json')
 if p.exists():write('rejected/'+label+'/measurement.json',p.read_bytes())
 root=H/('source-'+label)
 if root.exists():
  part='programs/pump-amm/src/curve/fees.rs' if label.startswith('cpi-') else source
  write('rejected/'+label+'/source.rs',(root/part).read_bytes())
write('rejected/STATUS.md',(P/'STATUS.md').read_bytes())
print('packaged',T)
