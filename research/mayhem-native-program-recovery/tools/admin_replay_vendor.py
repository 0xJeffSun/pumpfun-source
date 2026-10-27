from pathlib import Path
import importlib.util,json,gzip,base64,hashlib
from solders.transaction import Transaction
R=Path(__file__).resolve().parents[2];P=R/'repro/mayhem/global-params-layout-recovery/tools/admin_runner.py';s=importlib.util.spec_from_file_location('adminh',P);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
class Recorder:
 def __init__(self,vm):self.vm=vm;self.last=None
 def __getattr__(self,n):return getattr(self.vm,n)
 def send_transaction(self,tx):
  assert all(Transaction.from_bytes(bytes(tx)).verify_with_results());self.last=base64.b64encode(bytes(tx)).decode();return self.vm.send_transaction(tx)
candidate=R/'work/mayhem-priority-20261027/system-vendor-clean-build/candidate.so';original=R/'evidence/original/mayhem/deployed.so';a=m.Fixture(original);b=m.Fixture(candidate);a.vm=Recorder(a.vm);b.vm=Recorder(b.vm);rows=[]
for c in m.cases():
 if c['op']=='initialize_global_params':continue
 x=a.execute(c);y=b.execute(c);diff=[k for k in ['error','data','lamports','events','inner_instructions','owner','admin_lamports_delta','payer_lamports_delta']if x[k]!=y[k]]
 rows.append(dict(case=c,original=x,candidate=y,different_fields=diff,original_transaction_base64=a.vm.last,candidate_transaction_base64=b.vm.last))
r=dict(candidate_sha256=hashlib.sha256(candidate.read_bytes()).hexdigest(),original_sha256=hashlib.sha256(original.read_bytes()).hexdigest(),case_count=len(rows),signed_transactions=2*len(rows),mismatches=[x['case']['name']for x in rows if x['different_fields']],initializers_excluded=True,cases=rows)
out=R/'work/mayhem-priority-20261027/vendor-admin.json.gz';out.write_bytes(gzip.compress((json.dumps(r,indent=2)+'\n').encode(),mtime=0));print(r['case_count'],r['mismatches']);assert len(rows)==1032 and not r['mismatches']
