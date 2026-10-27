from pathlib import Path
import sys,json,gzip,hashlib,base64,importlib.util
from solders.transaction import Transaction
W=Path(__file__).resolve().parent;R=W.parents[1];sys.path.insert(0,str(R/'scripts'))
candidate=Path(sys.argv[1]).resolve();out=Path(sys.argv[2]);out.mkdir(exist_ok=False);original=R/'evidence/original/mayhem/deployed.so';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
class Recorder:
 def __init__(self,vm):self.vm=vm;self.last=None
 def __getattr__(self,n):return getattr(self.vm,n)
 def send_transaction(self,tx):
  assert all(Transaction.from_bytes(bytes(tx)).verify_with_results());self.last=base64.b64encode(bytes(tx)).decode();return self.vm.send_transaction(tx)
lanes=[('fee-recipient','mayhem_validate_fee_recipient','RecipientFixture','cases'),('sweeps','mayhem_validate_sweeps','SweepFixture','rows'),('withdraw','mayhem_validate_withdraw','WithdrawFixture','cases'),('quote-withdraw','mayhem_validate_quote_withdraw','QuoteWithdrawFixture','rows')]
for label,module,klass,caseattr in lanes:
 m=__import__(module);cases=getattr(m,caseattr);cases=cases()if callable(cases)else cases;a=getattr(m,klass)(original);b=getattr(m,klass)(candidate);a.vm=Recorder(a.vm);b.vm=Recorder(b.vm);rows=[]
 for case in cases:
  x=a.execute(case);y=b.execute(case);fields=sorted(set(x)-{'logs'});assert set(x)==set(y)
  bad=[k for k in fields if x[k]!=y[k]]
  rows.append(dict(case=case,original=x,candidate=y,fields=fields,different_fields=bad,original_transaction_base64=a.vm.last,candidate_transaction_base64=b.vm.last))
 pins={str(p.relative_to(R)):sha(p)for p in [R/'scripts'/f'{n}.py'for n in ['mayhem_validate_admin','mayhem_validate_fee_recipient','mayhem_validate_sweeps','mayhem_validate_withdraw','mayhem_validate_quote_withdraw']]}
 result=dict(original_sha256=sha(original),candidate_sha256=sha(candidate),harness_sha256=pins,case_count=len(rows),signed_transactions=len(rows)*2,cases=rows,mismatches=[i for i,r in enumerate(rows)if r['different_fields']])
 (out/(label+'.json.gz')).write_bytes(gzip.compress((json.dumps(result,separators=(',',':'))+'\n').encode(),mtime=0));print(label,len(rows),result['mismatches'],flush=True)
 assert not result['mismatches']
