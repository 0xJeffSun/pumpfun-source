"""Recover orchestration metadata after the legacy QC integer-count schema.

All raw receipts/logs are preserved. Only QC is repeated to record its process
exit explicitly; all other completed runner results are checked from the exact
orchestration log. This does not add unique comparison cases.
"""
from pathlib import Path
import gzip,hashlib,json,subprocess,sys
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if (p/'evidence/upstream/pump.json').is_file())
O=W/'differential';C=W/'build/artifacts/pump_recovered.so';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
expected=sha(C);original=sha(R/'evidence/original/pump/deployed.so')
def read(p):
 raw=p.read_bytes();return json.loads(gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw)
rows=[]
for line in (W/'differential-orchestration.log').read_text().splitlines():
 try:row=json.loads(line)
 except ValueError:continue
 if 'returncode'in row:rows.append(row)
assert len(rows)==36 and len({r['suite']for r in rows})==36
assert all(r['suite']!='quote_control' for r in rows)
for row in rows:
 p=O/(row['suite']+'.json.gz');assert sha(p)==row['receipt_sha256']
 assert row['returncode']==0 and row['bound_hashes_match']and not row['mismatches'],row
old=O/'quote_control.json.gz';before=old.read_bytes();(O/'quote_control-first-receipt.json.gz').write_bytes(before)
(O/'quote_control-first.log').write_bytes((O/'quote_control.log').read_bytes())
cmd=[sys.executable,str(R/'scripts/pump_quote_control_fresh_differential.py'),'--candidate',str(C),'--output',str(old)]
with (O/'quote_control.log').open('w')as log:proc=subprocess.run(cmd,cwd=R,stdout=log,stderr=subprocess.STDOUT)
data=read(old);previous=json.loads(gzip.decompress(before));assert data==previous
bound=data['bound_inputs_sha256'];assert proc.returncode==0 and data['cases']==507 and data['mismatches']==0
assert bound[str(C.relative_to(R))]==expected and bound['evidence/original/pump/deployed.so']==original
for p,h in bound.items():assert sha(R/p)==h,p
rows.append({'suite':'quote_control','family':'quote_control','command':cmd,'returncode':proc.returncode,'log_sha256':sha(O/'quote_control.log'),'case_count':data['cases'],'candidate_sha256':bound[str(C.relative_to(R))],'original_sha256':bound['evidence/original/pump/deployed.so'],'mismatches':[],'receipt_sha256':sha(old),'receipt_gzip':True,'bound_hashes_match':True,'repeated_for_explicit_exit_record':True,'first_receipt_sha256':sha(O/'quote_control-first-receipt.json.gz'),'repeat_json_identical':True})
(O/'run.json').write_text(json.dumps(rows,indent=2)+'\n')
assert sum(r['case_count']for r in rows)==9217
summary={'candidate_sha256':expected,'original_sha256':original,'suite_count':37,'published48_suites':36,'published48_cases':9161,'partial_curve_cases':56,'case_count':9217,'full_byte_equality':False,'mismatches':[],'orchestration_collection_note':'The initial collector assumed cases was always a list; QC records an integer count plus a results list. Its completed receipt was retained and repeated once to explicitly record process exit. No runtime/source correction or additional unique cases.'}
(O/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps(summary,indent=2))
