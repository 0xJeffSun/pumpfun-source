"""Bounded integrity mutations; no compiler or target VM execution."""
from pathlib import Path
import importlib.util,tempfile,shutil,contextlib,io,gzip,json,hashlib
HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('helper_packet_verify',HERE/'verify.py');v=importlib.util.module_from_spec(spec);spec.loader.exec_module(v)
def reject(label,change):
 with tempfile.TemporaryDirectory(prefix='publication556-mutation-',dir=HERE.parent)as temp:
  target=Path(temp)/'packet';shutil.copytree(HERE,target);change(target);old=v.HERE;v.HERE=target
  try:
   try:
    with contextlib.redirect_stdout(io.StringIO()):v.verify()
   except(AssertionError,ValueError,OSError):pass
   else:raise AssertionError('mutation accepted: '+label)
  finally:v.HERE=old
 print('PASS rejected '+label)
def source(root):
 p=root/'sources/candidate/programs/pump-fees/src/sharing_update.rs';p.write_bytes(p.read_bytes()+b'\n')
def artifact(root):
 p=root/'artifacts/candidate-candidate.so.gz';b=bytearray(p.read_bytes());b[len(b)//2]^=1;p.write_bytes(b)
def extra(root):(root/'unexpected-evidence.txt').write_text('not authenticated\n')
def symlink(root):(root/'unexpected-link').symlink_to(root/'README.md')
def alias(root):
 p=root/'sources/candidate/programs/pump-fees/src/sharing_update.rs';p.with_name(p.name+'.gz').write_bytes(gzip.compress(p.read_bytes(),mtime=0))
 rows={str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest()for p in sorted(root.rglob('*'))if p.is_file()and p.name!='manifest.json'}
 (root/'manifest.json').write_text(json.dumps(rows,indent=2)+'\n')

if __name__=='__main__':
 v.verify()
 for label,change in [('source change',source),('artifact change',artifact),('extra member',extra),('symlink',symlink),('resealed ambiguous source alias',alias)]:reject(label,change)
