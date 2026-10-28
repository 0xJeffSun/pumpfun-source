"""In-memory negative controls; never modify the retained evidence."""
from pathlib import Path
from unittest.mock import patch
import base64,gzip,json,os,runpy,shutil,tempfile
HERE=Path(__file__).resolve().parent
real_read=Path.read_bytes
observed=json.loads(gzip.decompress(real_read(HERE/'runtime/observed.json.gz')))
def check(label,mutate):
 altered=json.loads(json.dumps(observed));mutate(altered)
 replacement=gzip.compress(json.dumps(altered).encode(),mtime=0)
 def read(path):
  return replacement if path==HERE/'runtime/observed.json.gz' else real_read(path)
 with patch.object(Path,'read_bytes',read):
  try:runpy.run_path(str(HERE/'audit_runtime.py'),run_name='__main__')
  except (AssertionError,ValueError):pass
  else:raise AssertionError('accepted '+label)
 print('PASS rejected',label)
def signature(data):
 row=data['transactions'][0];raw=bytearray(base64.b64decode(row['transaction_base64']));raw[1]^=1
 row['transaction_base64']=base64.b64encode(raw).decode()
def loaded_hash(data):
 row=data['transactions'][0]
 row['amm_program_sha256']='0'*64
 row['loaded_programs']['pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA']['sha256']='0'*64
check('corrupted actual signature',signature)
check('forged actual loaded ELF hash',loaded_hash)

def inventory_check(label, setup, expected, unavailable_ok=False, forbid_manifest_read=False):
 with tempfile.TemporaryDirectory(prefix='hop-inventory-') as temporary:
  root=Path(temporary).resolve();packet=root/'packet';shutil.copytree(HERE,packet)
  try:setup(root,packet)
  except (OSError,NotImplementedError) as error:
   if not unavailable_ok:raise
   print('SKIP',label,type(error).__name__);return
  attempted=[]
  def guarded_read(path):
   if forbid_manifest_read or path!=packet/'MANIFEST.json':
    attempted.append(str(path))
    raise AssertionError('unexpected payload or external read')
   return real_read(path)
  with patch.object(Path,'read_bytes',guarded_read):
   try:runpy.run_path(str(packet/'verify.py'),run_name='__main__')
   except AssertionError as error:assert str(error)==expected,(label,str(error))
   else:raise AssertionError('accepted '+label)
  assert not attempted,(label,attempted)
  print('PASS rejected',label,'before payload or external reads')

def nested_manifest(root,packet):
 directory=packet/'unexpected';directory.mkdir();(directory/'MANIFEST.json').write_text('{}\n')
def external_symlink(root,packet):
 outside=root/'external-sentinel';outside.write_text('must not be read\n')
 (packet/'external-link').symlink_to(outside)
def fifo(root,packet):
 if not hasattr(os,'mkfifo'):raise NotImplementedError('FIFO unavailable')
 os.mkfifo(packet/'unexpected-fifo')
def root_manifest_symlink(root,packet):
 (packet/'MANIFEST.json').unlink()
 outside=root/'external-manifest';outside.write_text('{}\n')
 (packet/'MANIFEST.json').symlink_to(outside)
def root_manifest_fifo(root,packet):
 if not hasattr(os,'mkfifo'):raise NotImplementedError('FIFO unavailable')
 (packet/'MANIFEST.json').unlink();os.mkfifo(packet/'MANIFEST.json')

inventory_check('extra nested MANIFEST.json',nested_manifest,'packet file inventory')
inventory_check('external symlink',external_symlink,'packet symlink',unavailable_ok=True)
inventory_check('FIFO',fifo,'packet special file',unavailable_ok=True)
inventory_check('root-manifest symlink',root_manifest_symlink,'packet symlink',unavailable_ok=True,forbid_manifest_read=True)
inventory_check('root-manifest FIFO',root_manifest_fifo,'packet special file',unavailable_ok=True,forbid_manifest_read=True)

# The ELF reader is imported transitively by analyze.py; it must be bound before use.
dependency=HERE.parents[1]/'scripts/analyze.py'
def changed_dependency(path):
 return real_read(path)+b'\n# altered verifier input\n' if path==dependency else real_read(path)
with patch.object(Path,'read_bytes',changed_dependency):
 try:runpy.run_path(str(HERE/'verify.py'),run_name='__main__')
 except AssertionError as error:assert str(error)=='scripts/analyze.py'
 else:raise AssertionError('accepted altered transitive ELF reader')
print('PASS rejected altered transitive ELF reader')
