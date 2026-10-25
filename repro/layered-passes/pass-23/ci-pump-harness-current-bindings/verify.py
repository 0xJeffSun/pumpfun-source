"""Read-only Pump CI preparation and complete saved-binding verification."""
from pathlib import Path
import argparse,hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent
ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path,required=True);R=ap.parse_args().repo.resolve()
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
m=J(P/'manifest.json');assert set(m)=={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file() and x!=P/'manifest.json' and '__pycache__' not in x.parts}
for name,digest in m.items():assert H((P/name).read_bytes())==digest,name
assert (R/'scripts/prepare_pump_nested_runtime.py').read_bytes()==(P/'after/prepare_pump_nested_runtime.py').read_bytes()
proof=J(P/'proof.json');record=J(P/'preparation.json');q=R/proof['harness_package']
assert H((q/'manifest.json').read_bytes())==proof['harness_manifest_sha256']==record['frozen_harness_seal']
prefix='runtime-layer/nested-harness/';selected={n[len(prefix):]:v for n,v in J(q/'manifest.json').items() if n.startswith(prefix)};assert len(selected)==6
for name,value in selected.items():assert H((q/prefix/name).read_bytes())==value['sha256']==record['copied_harness_sha256'][name]
main=R/proof['current_package'];report_path=main/'main/build-comparison.json';attempt_path=main/'main/build-attempt.json'
report=J(report_path);attempt=J(attempt_path);sources=report['source_sha256']
assert sources==attempt['source_sha256']==attempt['source_after_sha256'] and attempt['returncode']==0 and attempt['source_unchanged']
assert record['status']=='PASS' and record['target_executions']==0 and record['source_inputs']==len(sources)==37
assert record['current_checkpoint']==proof['current_package']
assert record['candidate_sha256']==report['comparison']['candidate_sha256']==H((main/'main/candidate.so').read_bytes())
assert record['build_report_sha256']==H(report_path.read_bytes()) and record['build_attempt_sha256']==H(attempt_path.read_bytes())
assert record['historical_source_map_sha256']==selected['expected-source-map.json']['sha256']
assert record['current_source_map_sha256']==H((json.dumps(sources,indent=2,sort_keys=True)+'\n').encode())
status=J(R/'repro/status.json')['pump'];assert status['candidate_artifact']==proof['current_package']+'/main/candidate.so' and status['comparison_report']==proof['current_package']+'/main/build-comparison.json'
subprocess.run([sys.executable,'-B',str(R/'scripts/verify_current_checkpoint.py'),'pump','--repo',str(R)],check=True,capture_output=True,cwd=R)
print(json.dumps({'passed':True,'sealed_harness_files':6,'current_pump_inputs':37,'saved_preparation_record_fully_bound':True,'target_executions':0},indent=2))
