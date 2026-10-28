"""In-memory negative controls; never modify the retained evidence."""
from pathlib import Path
from unittest.mock import patch
import base64,gzip,json,runpy
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
