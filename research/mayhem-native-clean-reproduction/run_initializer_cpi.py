from pathlib import Path
import importlib.util,sys,base64,gzip,json,hashlib
R=Path(__file__).resolve().parents[1].parent
P=R/'research/mayhem-initializer-validation/harness/pump_create_mayhem_differential.py'
s=importlib.util.spec_from_file_location('h',P);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
real_tx=m.Transaction;real_vm=m.LiteSVM;records=[]
class Transactions:
 @staticmethod
 def new_signed_with_payer(*args,**kw):
  tx=real_tx.new_signed_with_payer(*args,**kw)
  assert all(tx.verify_with_results())
  records.append(base64.b64encode(bytes(tx)).decode())
  return tx
m.Transaction=Transactions
m.LiteSVM=lambda:real_vm().with_sigverify(True).with_blockhash_check(True)
candidate=Path(sys.argv[1]).resolve();output=Path(sys.argv[2]).resolve();assert not output.exists()
rows=[]
for case in m.cases():
 if case['case']=='zero-creator-is-rejected':continue
 records.clear();original=m.run(case);otx=list(records)
 records.clear();current=m.run(case,m.ORIGINAL_PUMP,candidate);ctx=list(records)
 diffs=[f for f in ['before','after','error','events','inner','return']if original[f]!=current[f]]
 if otx!=ctx:diffs.append('signed_transaction_bytes')
 rows.append(dict(case=case,original=original,candidate=current,original_signed_transactions=otx,candidate_signed_transactions=ctx,differences=diffs))
 print(case['case'],diffs,flush=True)
report=dict(schema='accounts-lane-initializer-cpi-v1',runner_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),harness_sha256=hashlib.sha256(P.read_bytes()).hexdigest(),original_pump_sha256=hashlib.sha256(m.ORIGINAL_PUMP.read_bytes()).hexdigest(),candidate_sha256=hashlib.sha256(candidate.read_bytes()).hexdigest(),original_sha256=hashlib.sha256(m.ORIGINAL_MAYHEM.read_bytes()).hexdigest(),case_count=len(rows),mismatches=[x['case']['case']for x in rows if x['differences']],successful_original_cases=[x['case']['case']for x in rows if x['original']['error'] is None],all_transaction_signatures_verified=True,cases=rows)
output.write_bytes(gzip.compress(json.dumps(report).encode(),mtime=0));print(report['case_count'],report['mismatches'],report['successful_original_cases'])
