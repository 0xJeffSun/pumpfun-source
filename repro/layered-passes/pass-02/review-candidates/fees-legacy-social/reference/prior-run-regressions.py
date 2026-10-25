from pathlib import Path
import concurrent.futures,hashlib,json,subprocess,sys,time,tarfile
R=Path(__file__).resolve().parents[2];W=Path(__file__).resolve().parent
C=W/'main-build-01/artifacts/pump_fees_candidate.so';O=R/'evidence/original/pump_fees/deployed.so';OUT=W/'runtime-main-01';OUT.mkdir()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
build=json.loads((W/'main-build-01/build-comparison.json').read_text())
assert sha(C)==sha(W/'build-02/artifacts/pump_fees_candidate.so')=='c181b0ba75aee67369385e04908d89088552c1fad756bf5a21d7fb21979e6a58'
assert len(build['source_sha256'])==22
for p,h in build['source_sha256'].items():assert sha(R/p)==h,p
prior=R/'repro/pump_fees/fee-config-serialization-v144'
harness=json.loads((prior/'harness-source-sha256.json').read_text())
for p,h in harness.items():assert sha(R/p)==h,p
jobs=[('differential','scripts/fees_validate_all.py',17331),('initializer-history','repro/pump_fees/initializer-history/replay_history.py',2),('initializer-rejections','repro/pump_fees/initializer-history/negative_differential.py',28),('messages','scripts/fees_error_messages_differential.py',2),('codec-rejections','scripts/fees_external_codec_differential.py',9),('compared-values','repro/pump_fees/fee-config-serialization-v144/compared_values.py',9),('authority-logs','repro/pump_fees/fee-config-serialization-v144/authority_logs.py',3),('signed-transfers','repro/pump_fees/fee-config-serialization-v144/signed_transfers.py',56),('serialization-error','repro/pump_fees/fee-config-serialization-v144/serialization_error.py',1),('donation-sequence','scripts/fees_donation_sequence.py',None)]
for _,p,_ in jobs:harness[p]=sha(R/p)
runtime=json.loads((prior/'runtime-inputs.json').read_text())['input_sha256']
for p,h in runtime.items():assert sha(R/p)==h,p
for name,d in [('source-sha256.json',build['source_sha256']),('harness-source-sha256.json',harness),('runtime-inputs.json',runtime)]: (OUT/name).write_text(json.dumps(d,indent=2)+'\n')
with tarfile.open(OUT/'harness-snapshot.tar.gz','w:gz') as t:
 for p in harness:t.add(R/p,arcname=p,recursive=False)
results=[]
def run(row):
 name,script,expected=row;path=OUT/(name+'.json');command=[sys.executable,str(R/script),'--candidate',str(C),'--output',str(path)];start=time.monotonic()
 with (OUT/(name+'.log')).open('wb') as log:result=subprocess.run(command,cwd=R,stdout=log,stderr=subprocess.STDOUT)
 entry={'name':name,'command':command,'returncode':result.returncode,'elapsed_seconds':time.monotonic()-start,'report':str(path.relative_to(R)),'expected_cases':expected,'executed_candidate_sha256':sha(C),'actual_source_sha256':build['source_sha256'],'build_report_sha256':sha(W/'main-build-01/build-comparison.json')}
 if path.exists():
  d=json.loads(path.read_text());entry.update(report_sha256=sha(path),case_count=d.get('case_count'),mismatches=d.get('mismatches',d.get('failures',[])))
  assert d['candidate_sha256']==sha(C) and d['original_sha256']==sha(O),name
  assert not entry['mismatches'] and not d.get('unexpected_errors',[]) and not d.get('unexpected_original_errors',[]),name
  if expected is not None:assert d['case_count']==expected,name
  else:assert len(d['steps'])==10 and all(x['match'] and x['original']['signature_verification'] and x['candidate']['signature_verification'] for x in d['steps'])
 assert result.returncode==0,name
 assert sha(R/script)==harness[script],name
 print(name,'passed',expected if expected is not None else '10 steps',flush=True)
 return entry
try:
 with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
  for future in concurrent.futures.as_completed([pool.submit(run,row) for row in jobs]):
   results.append(future.result());(OUT/'progress.json').write_text(json.dumps(results,indent=2)+'\n')
 for p,h in {**build['source_sha256'],**harness,**runtime}.items():assert sha(R/p)==h,p
 total=sum(x['case_count'] for x in results if x['expected_cases'] is not None);assert total==17441
 (OUT/'summary.json').write_text(json.dumps({'candidate_sha256':sha(C),'original_sha256':sha(O),'comparison_receipts':total,'donation_sequence_steps':10,'reports':results,'source_inputs':22,'harness_inputs':len(harness),'runtime_inputs':len(runtime),'new_unique_cases':0,'mismatches':[]},indent=2)+'\n')
 print('ALL PASS',total,flush=True)
except BaseException as e:
 (OUT/'failure.json').write_text(json.dumps({'type':type(e).__name__,'error':str(e),'finished_results':results},indent=2)+'\n');raise
