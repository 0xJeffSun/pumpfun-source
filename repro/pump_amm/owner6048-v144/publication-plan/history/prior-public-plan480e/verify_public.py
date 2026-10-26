"""Saved-byte public reader/verifier. Optional deep checks never execute targets."""
from pathlib import Path
import argparse,json,hashlib,sys,tempfile,subprocess
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_bytes())
def safe(root,rel):
 assert not Path(rel).is_absolute()and'..'not in Path(rel).parts;p=root/rel
 for q in[p,*p.parents]:
  if q==root.parent:break
  assert not q.is_symlink(),q
 return p
def verify_physical(root):
 assert H(root/'manifest.json')==(root/'manifest.sha256').read_text().split()[0];files=J(root/'manifest.json');assert set(files)=={str(p.relative_to(root))for p in root.rglob('*')if p.is_file()and p not in[root/'manifest.json',root/'manifest.sha256']}
 for p in root.rglob('*'):assert not p.is_symlink(),p
 for n,h in files.items():assert H(safe(root,n))==h and(root/n).stat().st_size<=64*1024*1024,n
 return J(root/'logical-files.json')
def chunks(root,record):
 for part in record['parts']:
  p=safe(root,part['path']);assert p.stat().st_size==part['bytes']and H(p)==part['sha256'];yield p.read_bytes()
def logical_bytes(root,name):
 record=J(root/'logical-files.json')[name];b=b''.join(chunks(root,record));assert len(b)==record['bytes']and hashlib.sha256(b).hexdigest()==record['sha256'];return b
def check(root):
 rows=verify_physical(root)
 for name,record in rows.items():
  safe(root,name);hasher=hashlib.sha256();size=0
  for block in chunks(root,record):hasher.update(block);size+=len(block)
  assert size==record['bytes']and hasher.hexdigest()==record['sha256'],name
 binding=J(root/'publication-binding.json');i=json.loads(logical_bytes(root,'main/identity.json'));r=json.loads(logical_bytes(root,'runtime/runtime-summary.json'));x=json.loads(logical_bytes(root,'main/controller-exit.json'))
 assert x['returncode']==x['build_helper_returncode']==0 and i['whole_candidate_equal']and i['whole_symbols_equal']
 assert hashlib.sha256(logical_bytes(root,'main/candidate.so')).hexdigest()==binding['candidate_sha256']==i['actual_candidate_sha256'];assert hashlib.sha256(logical_bytes(root,'main/unstripped.so')).hexdigest()==binding['symbols_sha256']==i['actual_symbols_sha256']
 assert r['suite_count']==25 and r['case_count']==17462 and r['signature_count']==35418 and r['transaction_count']==35074 and not r['mismatches']
 assert json.loads(logical_bytes(root,'runtime/controller-exit.json'))['returncode']==0
 for role,seal in [('emitted','d153ca5c4bee7e592e363e5622db0c2f1e8462c170604fe5aed7c59cc59dd806'),('spill','ec888cb60bc9e09163ddd8f4ad817011045c788d2c19a053f59bf4ac46f43d89')]:assert hashlib.sha256(logical_bytes(root,role+'/manifest.json')).hexdigest()==seal
 return rows
def main():
 a=argparse.ArgumentParser();a.add_argument('--saved-deep',action='store_true');x=a.parse_args();rows=check(P);executed=[]
 if x.saved_deep:
  # All original bytes, including >64MiB raw receipts, are restored losslessly
  # in this disposable tree. Compiler/runtime controllers remain uninvoked.
  with tempfile.TemporaryDirectory(prefix='amm-owner-public-saved-',dir=P.parent)as td:
   T=Path(td)
   for name,record in rows.items():
    p=safe(T,name);p.parent.mkdir(parents=True,exist_ok=True)
    with p.open('xb')as out:
     for b in chunks(P,record):out.write(b)
    assert H(p)==record['sha256'];p.chmod(record['mode'])
   for relative in ['emitted/verify.py','spill/verify.py','runtime/verify_runtime.py','runtime/verify_nochange_logs.py']:
    result=subprocess.run([sys.executable,'-B',str(T/relative)],cwd=(T/relative).parent,capture_output=True);sys.stdout.buffer.write(result.stdout);sys.stderr.buffer.write(result.stderr);assert result.returncode==0,(relative,result.returncode);executed.append({'saved_verifier':relative,'returncode':result.returncode,'stdout_sha256':hashlib.sha256(result.stdout).hexdigest(),'stderr_sha256':hashlib.sha256(result.stderr).hexdigest()})
 print(json.dumps({'status':'PASS_LOSSLESS_PUBLIC_SAVED_BYTES','logical_files':len(rows),'split_original_files':sum(len(r['parts'])>1 for r in rows.values()),'maximum_physical_payload_bytes':max((P/n).stat().st_size for n in J(P/'manifest.json')),'saved_verifiers':executed,'compiler_VM_runs':0,'strict6048_compared_diagnostic_coverage':0,'whole_original_equal':False},indent=2))
if __name__=='__main__':main()
