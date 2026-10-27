"""Fresh signed initializer replay with actual VM program-account attestation."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json,sys
from solders.litesvm import LiteSVM as RealVM
from solders.transaction import Transaction
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
class VM:
 def __init__(self,inner,records,programs):self.inner,self.records,self.programs=inner,records,programs
 def __getattr__(self,name):
  attr=getattr(self.inner,name)
  if not callable(attr):return attr
  def call(*args,**kw):
   if name=='send_transaction':
    tx=args[0];assert all(tx.verify_with_results());att={}
    for program,path in self.programs.items():
     account=self.inner.get_account(program)
     if account is None:continue
     expected=sha(path.read_bytes());actual=sha(bytes(account.data));assert account.executable and actual==expected,(str(program),actual,expected)
     att[str(program)]=dict(sha256=actual,bytes=len(account.data),executable=account.executable)
    assert len(att)==len(self.programs)
    self.records.append(dict(signed_transaction_base64=base64.b64encode(bytes(tx)).decode(),program_accounts=att))
   result=attr(*args,**kw)
   if isinstance(result,RealVM):self.inner=result;return self
   return result
  return call
def run(root,candidate,output):
 output.mkdir(parents=True,exist_ok=False);original=root/'evidence/original/mayhem/deployed.so';common=dict(schema='initializer-source-origins-runtime-v1',candidate_sha256=sha(candidate.read_bytes()),original_sha256=sha(original.read_bytes()),runner_sha256=sha(Path(__file__).read_bytes()))
 matrix_path=root/'research/mayhem-initializer-validation/validation_matrix.py';fixture_path=root/'repro/behavioral-recovery/scripts/mayhem_initialize_state_differential.py';matrix=module('matrix',matrix_path);fixture=module('fixture',fixture_path);records=[]
 fields=['error','anchor_errors','before','after','events','inner','return','signed_transaction_base64'];rows=[]
 for case in matrix.cases():
  pair=[]
  for binary in [original,candidate]:
   records.clear();fixture.LiteSVM=lambda:VM(RealVM().with_sigverify(True).with_blockhash_check(True),records,{fixture.MAY:binary});value=matrix.execute(fixture,binary,case);pair.append((value,list(records)))
  x,y=pair;diff=[f for f in fields if x[0][f]!=y[0][f]];assert x[0]['error']is not None
  rows.append(dict(case=case,original=x[0],candidate=y[0],original_executions=x[1],candidate_executions=y[1],differences=diff));print('rejection',case['name'],diff,flush=True)
 report=dict(common,kind='rejections',harness_sha256={str(matrix_path.relative_to(root)):sha(matrix_path.read_bytes()),str(fixture_path.relative_to(root)):sha(fixture_path.read_bytes())},compared_fields=fields,case_count=len(rows),cases=rows,mismatches=[r['case']['name']for r in rows if r['differences']]);(output/'rejections.json.gz').write_bytes(gzip.compress(json.dumps(report,sort_keys=True).encode(),mtime=0));assert not report['mismatches'] and len(rows)==53
 harness_path=root/'research/mayhem-initializer-validation/harness/pump_create_mayhem_differential.py';h=module('pump_create',harness_path);rows=[];fields=['before','after','error','events','inner','return']
 for case in h.cases():
  if case['case']=='zero-creator-is-rejected':continue
  pair=[]
  for binary in [original,candidate]:
   records.clear();h.LiteSVM=lambda:VM(RealVM().with_sigverify(True).with_blockhash_check(True),records,{h.MAYHEM:binary,h.PROGRAM:h.ORIGINAL_PUMP});value=h.run(case,h.ORIGINAL_PUMP,binary);pair.append((value,list(records)))
  x,y=pair;diff=[f for f in fields if x[0][f]!=y[0][f]]
  if [v['signed_transaction_base64']for v in x[1]]!=[v['signed_transaction_base64']for v in y[1]]:diff.append('signed_transactions')
  rows.append(dict(case=case,original=x[0],candidate=y[0],original_executions=x[1],candidate_executions=y[1],differences=diff));print('pump-cpi',case['case'],diff,flush=True)
 report=dict(common,kind='pump-cpi',harness_sha256={str(harness_path.relative_to(root)):sha(harness_path.read_bytes())},compared_fields=fields,case_count=len(rows),cases=rows,mismatches=[r['case']['case']for r in rows if r['differences']]);(output/'pump-cpi.json.gz').write_bytes(gzip.compress(json.dumps(report,sort_keys=True).encode(),mtime=0));assert not report['mismatches'] and len(rows)==16
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--repository-root',type=Path,required=True);p.add_argument('--candidate',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();run(a.repository_root.resolve(),a.candidate.resolve(),a.output.resolve())
