from pathlib import Path
import importlib.util,hashlib,json,gzip
R=Path('/workspace/scratch/cbbf9356faa0/pumpfun-current');W=R.parent/'mayhem-native-work'
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
sha=lambda b:hashlib.sha256(b).hexdigest()
runner=R/'research/mayhem-initializer-source-origins/runtime/replay.py';replay=module('replay',runner)
harness=R/'research/mayhem-initializer-validation/harness/pump_create_mayhem_differential.py';h=module('pump_create',harness)
original=R/'evidence/original/mayhem/deployed.so';candidate=W/'initializer-direct-fields-preclock-build/candidate.so';output=W/'initializer-direct-fields-runtime/pump-cpi.json.gz';assert not output.exists()
rows=[];records=[];fields=['before','after','error','events','inner','return']
for case in h.cases():
 if case['case']=='zero-creator-is-rejected':continue
 pair=[]
 for binary in [original,candidate]:
  records.clear();h.LiteSVM=lambda:replay.VM(replay.RealVM().with_sigverify(True).with_blockhash_check(True),records,{h.MAYHEM:binary,h.PROGRAM:h.ORIGINAL_PUMP})
  value=h.run(case,h.ORIGINAL_PUMP,binary);pair.append((value,list(records)))
 x,y=pair;diff=[f for f in fields if x[0][f]!=y[0][f]]
 if [v['signed_transaction_base64'] for v in x[1]]!=[v['signed_transaction_base64'] for v in y[1]]:diff.append('signed_transactions')
 rows.append(dict(case=case,original=x[0],candidate=y[0],original_executions=x[1],candidate_executions=y[1],differences=diff));print(case['case'],diff,flush=True)
report=dict(schema='initializer-machine-paths-cpi-v1',kind='pump-cpi',candidate_sha256=sha(candidate.read_bytes()),original_sha256=sha(original.read_bytes()),runner_sha256=sha(Path(__file__).read_bytes()),harness_sha256={str(p.relative_to(R)):sha(p.read_bytes()) for p in [runner,harness]},compared_fields=fields,case_count=len(rows),cases=rows,mismatches=[r['case']['case'] for r in rows if r['differences']])
output.write_bytes(gzip.compress(json.dumps(report,sort_keys=True).encode(),mtime=0));assert len(rows)==16 and not report['mismatches']
print('PASS',len(rows),flush=True)
