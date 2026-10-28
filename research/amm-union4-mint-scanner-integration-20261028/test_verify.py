#!/usr/bin/env python3
"""Reject resealed false counts, source claims and case observations."""
from pathlib import Path
import gzip,hashlib,json,shutil,subprocess,sys,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if (p/'evidence/original/pump_amm/deployed.so').is_file())
(R/'work').mkdir(exist_ok=True)
def seal(p):
 (p/'MANIFEST.json').write_text(json.dumps({str(f.relative_to(p)):hashlib.sha256(f.read_bytes()).hexdigest()for f in sorted(p.rglob('*'))if f.is_file()and f.name!='MANIFEST.json'and'__pycache__'not in f.parts},indent=2)+'\n')
def count(p):
 f=p/'builds/a/score.json';d=json.loads(f.read_text());d['normalized']=771;f.write_text(json.dumps(d))
def source(p):
 f=p/'source.patch';f.write_text(f.read_text().replace('length >= 108','length > 108'))
def observation(p):
 f=p/'runtime/reserved.json.gz';d=json.loads(gzip.decompress(f.read_bytes()));d['cases'][0]['candidate']['error']='mutated error while match flag stays true';raw=(json.dumps(d,separators=(',',':'))+'\n').encode();f.write_bytes(gzip.compress(raw,mtime=0))
 f=p/'runtime/progress.json';d=json.loads(f.read_text());next(x for x in d if x['suite']=='reserved')['receipt_sha256']=hashlib.sha256(raw).hexdigest();f.write_text(json.dumps(d))
for label,mutation,static in [('false-count',count,True),('wrong-source',source,True),('false-case',observation,False)]:
 with tempfile.TemporaryDirectory(prefix='amm-scanner-counterexample-',dir=R/'work')as t:
  p=Path(t)/'packet';shutil.copytree(P,p);mutation(p);seal(p)
  command=[sys.executable,'-I','-B',str(p/'verify.py')]+(['--static-only']if static else [])
  result=subprocess.run(command,capture_output=True,text=True)
  assert result.returncode!=0,(label,'accepted resealed counterexample')
  assert 'AssertionError'in result.stderr,(label,result.stderr)
  print(label,': rejected')
result=subprocess.run([sys.executable,'-I','-O','-B',str(P/'verify.py')],capture_output=True,text=True)
assert result.returncode!=0 and 'run without -O'in result.stderr
print('optimized Python: rejected')
