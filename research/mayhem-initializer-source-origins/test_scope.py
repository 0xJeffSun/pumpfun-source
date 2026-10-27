"""Mutation checks for data, provenance and signed runtime boundaries."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json,shutil,tempfile
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def load(p):return json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def save(p,v):
 b=(json.dumps(v,indent=2)+'\n').encode();p.write_bytes(gzip.compress(b,mtime=0)if p.suffix=='.gz'else b)
def seal(p):save(p/'manifest.json',{str(f.relative_to(p)):sha(f.read_bytes())for f in p.rglob('*')if f.is_file()and f.name!='manifest.json'and'__pycache__'not in f.parts})
def module(p):
 s=importlib.util.spec_from_file_location('scope_verify',p/'verify.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def mutate(p,name):
 if name in ['body-byte','Source-byte']:
  f=p/'artifacts/recovered/candidate.so.gz';b=bytearray(gzip.decompress(f.read_bytes()));b[288 if name=='body-byte'else 684100]^=1;f.write_bytes(gzip.compress(b,mtime=0))
 elif name=='extra-linker-argument':
  f=p/'config/repeat/invocation.json';j=load(f);j['forwarded'].append('--strip-all');save(f,j)
 elif name in ['unqualified-controller','unqualified-extra-argument']:
  f=p/'builds/unqualified/launch.json';j=load(f)
  if name=='unqualified-controller':j['controller_sha256']='0'*64
  else:j['command'].append('-Copt-level=0')
  save(f,j)
 elif name=='relabel-unqualified-runtime':
  f=p/'runtime/unqualified/accounts-init-source-cpi.json.gz';j=load(f);j['candidate_sha256']='03f1f70e6a33cb60a1a1fa7110cdecf03553ee30b1ff7b9a0e26905d0ba1c175';save(f,j)
 elif name=='wrong-program-attestation':
  f=p/'runtime/qualified/pump-cpi.json.gz';j=load(f);r=j['cases'][0]['candidate_executions'][0];r['program_accounts']['MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e']['sha256']=j['original_sha256'];save(f,j)
 elif name=='unsigned-transaction':
  f=p/'runtime/qualified/rejections.json.gz';j=load(f);row=j['cases'][0];b=bytearray(base64.b64decode(row['original']['signed_transaction_base64']));b[1]^=1;text=base64.b64encode(b).decode()
  for side in ['original','candidate']:row[side]['signed_transaction_base64']=text;row[side+'_executions'][0]['signed_transaction_base64']=text
  save(f,j);f=p/'runtime/unqualified/accounts-init-source-rejections.json.gz';j=load(f)
  for side in ['original','candidate']:j['cases'][0][side]['signed_transaction_base64']=text
  save(f,j)
 elif name=='missing-cpi-case':
  f=p/'runtime/qualified/pump-cpi.json.gz';j=load(f);j['cases'].pop();save(f,j)
 elif name=='paired-case-option':
  for f in [p/'runtime/qualified/pump-cpi.json.gz',p/'runtime/unqualified/accounts-init-source-cpi.json.gz']:
   j=load(f);j['cases'][0]['case']['duration_hours']=42;save(f,j)
 elif name in ['missing-execution','duplicate-execution']:
  f=p/'runtime/qualified/pump-cpi.json.gz';j=load(f);row=j['cases'][0]
  for side in ['original','candidate']:
   values=row[side+'_executions']
   if name=='missing-execution':values.pop()
   else:values[1]=values[0]
  save(f,j);f=p/'runtime/unqualified/accounts-init-source-cpi.json.gz';j=load(f);row=j['cases'][0]
  for side in ['original','candidate']:
   values=row[side+'_signed_transactions']
   if name=='missing-execution':values.pop()
   else:values[1]=values[0]
  save(f,j)
 elif name=='claimed-initializer-match':
  f=p/'proof.json';j=load(f);j['initializer_original_body_equal']=True;save(f,j)
 else:raise AssertionError(name)

def main(root):
 names=['body-byte','Source-byte','extra-linker-argument','unqualified-controller','unqualified-extra-argument','relabel-unqualified-runtime','wrong-program-attestation','unsigned-transaction','missing-cpi-case','paired-case-option','missing-execution','duplicate-execution','claimed-initializer-match'];results=[]
 for name in names:
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p,ignore=shutil.ignore_patterns('__pycache__'));mutate(p,name);seal(p)
   try:module(p).verify(root,runtime=True)
   except (AssertionError,ValueError,KeyError,TypeError):results.append(dict(mutation=name,rejected=True));continue
   raise AssertionError('Mutation accepted: '+name)
 return results
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repository-root',type=Path,required=True);a=p.parse_args();print(json.dumps(main(a.repository_root.resolve()),indent=2))
