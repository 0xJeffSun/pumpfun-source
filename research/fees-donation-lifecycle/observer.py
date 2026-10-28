"""Read-only observer around unchanged canonical local fixtures."""
from pathlib import Path
import base64,gzip,hashlib,json,os,runpy,sys
sys.dont_write_bytecode=True
R=Path(__file__).resolve().parents[2]
out=Path(sys.argv[1]);script=Path(sys.argv[2]).resolve();argv=sys.argv[2:]
reads={};busy=False;loads={};count=0;signatures=0
sha=lambda b:hashlib.sha256(b).hexdigest()
def audit(event,args):
 global busy
 if busy or event!='open':return
 name,mode,flags=args
 if not isinstance(name,(str,bytes,os.PathLike)):return
 p=Path(name).resolve()
 try:n=p.relative_to(R).as_posix()
 except ValueError:return
 if not p.is_file()or (mode and any(c in mode for c in 'wax+')):return
 if '__pycache__'in p.parts or p.suffix=='.pyc':raise AssertionError('cached Python input')
 if n in reads:return
 busy=True
 try:reads[n]=sha(p.read_bytes())
 finally:busy=False
sys.addaudithook(audit)
from solders.litesvm import LiteSVM
from solders.transaction_metadata import FailedTransactionMetadata
FEES=json.loads((R/'evidence/upstream/pump_fees.json').read_bytes())['address']
original_load=LiteSVM.add_program_from_file;original_send=LiteSVM.send_transaction
original_sigverify=LiteSVM.with_sigverify;original_blockhash=LiteSVM.with_blockhash_check
def load(self,program,path):
 p=Path(path).resolve();key=str(p)
 if key not in loads:loads[key]=dict(path=key,sha256=sha(p.read_bytes()),bytes=p.stat().st_size)
 result=original_load(self,program,path)
 if not hasattr(self,'_observed_programs'):self._observed_programs={}
 self._observed_programs[str(program)]=loads[key]['sha256']
 return result
def sigverify(self,enabled):
 assert enabled is True;return original_sigverify(self,enabled)
def blockhash(self,enabled):
 assert enabled is True;return original_blockhash(self,enabled)
def send(self,tx):
 global count,signatures
 raw=bytes(tx);checks=tx.verify_with_results();assert checks and all(checks)
 programs=dict(getattr(self,'_observed_programs',{}));assert FEES in programs
 def snap():
  result={}
  for key in sorted(set(tx.message.account_keys),key=str):
   a=self.get_account(key)
   if a is not None and a.executable:continue
   result[str(key)]=None if a is None else dict(lamports=a.lamports,owner=str(a.owner),data=bytes(a.data).hex(),executable=a.executable)
  return result
 before=snap();result=original_send(self,tx);assert bytes(tx)==raw
 failed=isinstance(result,FailedTransactionMetadata);meta=result.meta()if failed else result;m=json.loads(meta.to_json())
 row=dict(sequence=count,transaction_base64=base64.b64encode(raw).decode(),signature_fields=len(checks),loaded_programs=programs,fees_sha256=programs[FEES],error=str(result.err())if failed else None,before=before,after=snap(),logs=meta.logs(),inner=m['inner_instructions'],return_data=m['return_data'])
 stream.write((json.dumps(row,separators=(',',':'))+'\n').encode());count+=1;signatures+=len(checks)
 return result
LiteSVM.add_program_from_file=load;LiteSVM.send_transaction=send
LiteSVM.with_sigverify=sigverify;LiteSVM.with_blockhash_check=blockhash
sys.path.insert(0,str(script.parent));sys.argv=argv
with out.with_suffix('.jsonl.gz').open('xb')as target:
 with gzip.GzipFile(filename='',mode='wb',fileobj=target,mtime=0)as stream:
  try:runpy.run_path(str(script),run_name='__main__')
  finally:
   assert all(sha((R/n).read_bytes())==h for n,h in reads.items())
   assert all(sha(Path(n).read_bytes())==record['sha256']for n,record in loads.items())
   document=dict(observer_sha256=sha(Path(__file__).read_bytes()),script=script.relative_to(R).as_posix(),script_sha256=sha(script.read_bytes()),transactions=count,signature_fields=signatures,loaded_files=loads,input_reads=reads,scope='Unmodified normally signed local fixtures; all message non-executable account snapshots, raw logs, inner instructions and return data observed. No network or signature bypass.')
   out.with_suffix('.json').write_text(json.dumps(document,indent=2)+'\n')
