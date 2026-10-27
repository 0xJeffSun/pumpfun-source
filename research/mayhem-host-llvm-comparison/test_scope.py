"""Check that resealed changes to retained evidence are rejected."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,shutil,tempfile
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('host_verify',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
def run():
 v.verify(P)
 results=[]
 for kind in ['IR-byte','object-byte','command-input','source-input','identity-claim','nested-manifest']:
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p,ignore=shutil.ignore_patterns('__pycache__'))
   if kind=='nested-manifest':
    (p/'nested').mkdir();(p/'nested/manifest.json').write_text('{}')
   elif kind in ['IR-byte','object-byte']:
    f=p/('artifacts/input.ll.gz'if kind=='IR-byte'else'artifacts/object.o.gz');b=bytearray(gzip.decompress(f.read_bytes()));b[128]^=1;f.write_bytes(gzip.compress(b,mtime=0))
   else:
    f=p/({'command-input':'captured/linux-llc-receipt.json','source-input':'source-inputs.json','identity-claim':'captured/comparison.json'}[kind]);j=json.loads(f.read_bytes())
    if kind=='command-input':j['command'][-3]='/different/input.ll'
    elif kind=='source-input':j['src/state.rs']='0'*64
    else:j['whole_object_identical']=False
    f.write_text(json.dumps(j,indent=2)+'\n')
   if kind!='nested-manifest':(p/'manifest.json').write_text(json.dumps({str(x.relative_to(p)):hashlib.sha256(x.read_bytes()).hexdigest()for x in p.rglob('*')if x.is_file()and x!=p/'manifest.json'},indent=2)+'\n')
   try:v.verify(p)
   except AssertionError:results.append({'mutation':kind,'rejected':True});continue
   raise AssertionError('accepted '+kind)
 return results
if __name__=='__main__':print(json.dumps(run(),indent=2))
