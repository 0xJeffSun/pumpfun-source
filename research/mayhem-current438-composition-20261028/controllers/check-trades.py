from pathlib import Path
import base64,hashlib,importlib.util,json,re
R=Path.cwd();D=R/'work/latest-review-20261027/qualified438-runtime';O=D/'runtime/trades';C=D/'candidate.so';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();expected='b69ee99d83cb1eaaa999082dc707560e95e1540174f27b5e6a8e1438cc4c34fc';assert sha(C)==expected
source=R/'research/mayhem-source-origin-recovery-20261027/runtime/trade_check.py';s=importlib.util.spec_from_file_location('current438_trade_check',source);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
commands=json.loads((O/'commands.json').read_bytes());assert commands['candidate_sha256']==expected and all(sha(Path(p))==h for p,h in commands['input_hashes'].items())
result=[];candidate=C.read_bytes();mayhem='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e';original=R/'evidence/original/mayhem/deployed.so';original_hash=sha(original)
for row in commands['runs']:
 name=row['family'];path=O/(name+'.json');report=json.loads(path.read_bytes());v=m.check_trade_receipts(name,report,candidate,R)
 assert v['exact_noncompute_logs']==v['cases']
 for pair in report['cases']:
  for kind,digest in [('original',original_hash),('candidate',expected)]:
   for phase in ['before','after']:
    acc=pair[kind][phase][mayhem];assert acc['executable']and acc['data_sha256']==digest
    if acc.get('data_base64') is not None:assert hashlib.sha256(base64.b64decode(acc['data_base64'])).hexdigest()==digest
 assert all(sha(Path(p))==h for p,h in row['input_hashes'].items());v.update(receipt_sha256=sha(path));result.append(v);print(name,v['cases'],flush=True)
assert sum(x['cases']for x in result)==6636 and sha(C)==expected
final=dict(candidate_sha256=expected,case_pairs=6636,signed_transaction_records=sum(x['signed_transaction_records']for x in result),exact_noncompute_logs=sum(x['exact_noncompute_logs']for x in result),results=result,checker_sha256=sha(source),verification_controller_sha256=sha(Path(__file__)),producer_input_hashes_unchanged=True)
(O/'verification.json').write_text(json.dumps(final,indent=2)+'\n');print(json.dumps(final,indent=2))
