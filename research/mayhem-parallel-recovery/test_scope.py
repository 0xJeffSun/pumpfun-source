"""Reject source, binary and signed-receipt evidence substitutions."""
from pathlib import Path
import tempfile,shutil,importlib.util,hashlib,json,gzip
P=Path(__file__).resolve().parent;R=P.parents[1]
def mod(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def seal(p):
 (p/'manifest.json').write_text(json.dumps({f.relative_to(p).as_posix():hashlib.sha256(f.read_bytes()).hexdigest()for f in p.rglob('*')if f.is_file()and f.name!='manifest.json'and'__pycache__'not in f.parts},indent=2)+'\n')
def reject(fn):
 try:fn()
 except AssertionError:return
 raise AssertionError('forged evidence accepted')
def main():
 for mode in ['unsealed-source','resealed-parent-binary','resealed-duplicate-case']:
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);v=mod('parallel_negative',p/'verify.py');v.P=p;v.R=R
   if mode=='unsealed-source':
    f=p/'overrides/src/instructions/sell.rs';f.write_bytes(f.read_bytes()+b'\n');reject(lambda:v.verify(False))
   elif mode=='resealed-parent-binary':
    parent=R/'research/mayhem-full-curve-recovery'
    for label in ['recovered','repeat']:
     result=v.load(p/f'builds/{label}/result.json')
     for kind in ['candidate','symbols']:
      b=(parent/f'artifacts/recovered/{kind}.so.gz').read_bytes();(p/f'artifacts/{label}/{kind}.so.gz').write_bytes(b);result[kind+'_sha256']=v.sha(gzip.decompress(b))
     (p/f'builds/{label}/result.json').write_text(json.dumps(result))
    seal(p);reject(lambda:v.verify(False))
   else:
    f=p/'runtime/vendor-native.json.gz';run=v.load(f);run['cases'][1]=run['cases'][0];f.write_bytes(gzip.compress(json.dumps(run).encode(),mtime=0));seal(p)
    rt=mod('parallel_negative_runtime',p/'runtime_check.py');rt.P=p;rt.R=R;candidate=v.raw(p/'artifacts/recovered/candidate.so.gz');reject(lambda:rt.verify_runtime(candidate))
   print('PASS rejected',mode)
if __name__=='__main__':main()
