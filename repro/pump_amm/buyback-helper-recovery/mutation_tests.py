#!/usr/bin/env python3
"""Negative tests update object hashes so rejection must come from binding/invariant checks."""
from pathlib import Path
import base64,gzip,hashlib,json,shutil,subprocess,sys,tempfile
P=Path(__file__).resolve().parent;results=[]
def mutate(root,name,fn):
 m=json.loads((root/'manifest.json').read_text());r=m[name];raw=gzip.decompress((root/r['storage']).read_bytes());raw=fn(raw);blob=gzip.compress(raw,mtime=0);(root/r['storage']).write_bytes(blob);r.update(sha256=hashlib.sha256(raw).hexdigest(),bytes=len(raw),gzip_sha256=hashlib.sha256(blob).hexdigest());(root/'manifest.json').write_text(json.dumps(m,indent=2)+'\n')
def json_mut(fn):
 def change(raw):
  x=json.loads(raw);fn(x);return (json.dumps(x,separators=(',',':'))+'\n').encode()
 return change
def signature(x):
 t=x['transactions'][0];raw=bytearray(base64.b64decode(t['transaction_base64']));raw[1]^=1;t['transaction_base64']=base64.b64encode(raw).decode();t['transaction_sha256']=hashlib.sha256(raw).hexdigest()
def seal(root):
 pins={str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest()for p in sorted(root.rglob('*'))if p.is_file()and p.name not in ['package-sha256.json','package-sha256.txt']}
 (root/'package-sha256.json').write_text(json.dumps(pins,indent=2)+'\n');(root/'package-sha256.txt').write_text(hashlib.sha256((root/'package-sha256.json').read_bytes()).hexdigest()+'\n')
tests=[
 ('source-binding','compiled source binding',lambda d:mutate(d,'sources/final/programs/pump-amm/src/state/global_config.rs',lambda x:x+b'\n')),
 ('elf-binding','artifact identity',lambda d:mutate(d,'artifacts/final-candidate.so',lambda x:x[:-1]+bytes([x[-1]^1]))),
 ('runtime-comparison','recomputed runtime comparison',lambda d:mutate(d,'runtime/final/legacy_buy.json',json_mut(lambda x:x['cases'][0]['candidate'].__setitem__('error','forged')))),
 ('signature','cryptographic signature',lambda d:mutate(d,'runtime/final/legacy_buy-transactions.json',json_mut(signature))),
 ('counts','full window counts',lambda d:(lambda x:((x['final_counts'].__setitem__('raw',94)),(d/'metadata.json').write_text(json.dumps(x))))(json.loads((d/'metadata.json').read_text()))),
]
for name,expected,change in tests:
 with tempfile.TemporaryDirectory() as td:
  d=Path(td)/'package';shutil.copytree(P,d);change(d);seal(d);r=subprocess.run([sys.executable,'-B',str(P/'verify.py'),str(d)],capture_output=True,text=True);passed=r.returncode!=0 and expected in r.stderr;results.append(dict(test=name,rejected=r.returncode!=0,expected_reason=expected,expected_reason_observed=passed));assert passed,(name,r.stdout,r.stderr)
print(json.dumps(results,indent=2))
