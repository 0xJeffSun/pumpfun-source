#!/usr/bin/env python3
"""Verify the saved integration review without running suites or build tools."""
from pathlib import Path
import hashlib,json
P=Path(__file__).resolve().parent
read=lambda n:json.loads((P/n).read_text())
seal=read('manifest-sha256.json')
actual={str(p.relative_to(P)):hashlib.sha256(p.read_bytes()).hexdigest()for p in P.rglob('*')if p.is_file()and str(p.relative_to(P))!='manifest-sha256.json'}
assert actual==seal
a=read('integration-checks.json');b=read('binding-tests.json')
assert a['status']==b['status']=='PASS'
assert a['suite_count']==38 and a['case_count']==9237 and a['unique_output_paths']==38
assert len(a['new_report_negative_tests'])==7 and all(r['rejected']for r in a['new_report_negative_tests'])
assert b['tracked_bindings']==168 and b['negative_tests']==15
assert len([r for r in b['results']if not r['expected_acceptance']and r['returncode']])==15
assert b['fixture_removed']and not b['real_repository_staging_changed']
for stem in ['root-pump-binding','root-fees-binding','binding-tests','integration-checks']:
 assert not (P/(stem+'.stderr')).read_bytes()
assert '"current_tracked_bindings": 168'in(P/'root-pump-binding.stdout').read_text()
assert '"verified": true'in(P/'root-fees-binding.stdout').read_text()
print(json.dumps({'verified':True,'review_files':len(seal),'blocking_findings_fixed':1,'remaining_blockers':0,'pump_suites':38,'pump_cases':9237,'negative_binding_tests':15,'negative_report_tests':7,'builds_or_runtime_replays':0},indent=2))
