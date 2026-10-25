#!/usr/bin/env python3
"""Read-only main acceptance verification, portable once populated and sealed."""
from pathlib import Path
import argparse,hashlib,json,re,sys
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
p=argparse.ArgumentParser();p.add_argument('--current-main',type=Path);a=p.parse_args()
m=J(P/'manifest.json');assert set(m['files'])=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in [P/'manifest.json',P/'manifest.sha256']}
for n,h in m['files'].items():assert H(P/n)==h,n
assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().strip()
ref=P/'reference';main=P/'main';r=J(ref/'promotion-preconditions.json')
assert H(ref/'manifest.json')==(ref/'manifest.sha256').read_text().strip()=='51dc9359eb90ce9109860d5814402d387b35a513502db3305e68db2ec2a092b8'
reference_manifest=J(ref/'manifest.json')['files']
for n in ['promotion-preconditions.json','candidate.so','unstripped.so','tools-before.json','dependency-integrity-before.json','dependency-integrity-after.json','runtime-summary.json','promote_main_once.py','build-records/build-comparison.json']:assert H(ref/n)==reference_manifest[n],n
assert (main/'candidate.so').read_bytes()==(ref/'candidate.so').read_bytes()
assert (main/'unstripped.so').read_bytes()==(ref/'unstripped.so').read_bytes()
identity=J(main/'identity.json');assert identity['whole_candidate_equal'] and identity['whole_symbols_equal']
assert identity['candidate_sha256']==H(main/'candidate.so')==r['candidate_sha256']
assert identity['symbols_sha256']==H(main/'unstripped.so')==r['symbols_sha256']
assert identity['source']==r['proposed_source'];assert identity['README_sha256']==r['proposed_readme_sha256']
assert len(r['proposed_source'])==22
for n,h in r['proposed_source'].items():
 assert H(main/'source'/n)==h,n
 if a.current_main:assert H(a.current_main/n)==h,n
assert H(main/'source/programs/pump-amm/README.md')==r['proposed_readme_sha256']
if a.current_main:assert H(a.current_main/'programs/pump-amm/README.md')==r['proposed_readme_sha256']
attempt=J(main/'build-attempt.json');assert attempt['returncode']==0 and attempt['source_unchanged']
assert attempt['source_sha256']==attempt['source_after_sha256']==r['proposed_source']
assert attempt['selected_toolchain']=='v1.44';assert H(main/'build.log')==attempt['build_log_sha256']
comparison=J(main/'build-comparison.json');assert comparison['source_sha256']==r['proposed_source'];assert comparison['comparison']['candidate_sha256']==r['candidate_sha256'];assert comparison['comparison']==J(ref/'build-records/build-comparison.json')['comparison']
for n in ['build-exit.json','dependencies-before-exit.json','dependencies-after-exit.json','runner-exit.json']:assert J(main/n)['returncode']==0,n
for n in ['dependency-integrity-before.json','dependency-integrity-after.json']:assert J(main/n)==J(ref/'dependency-integrity-before.json')
assert J(ref/'dependency-integrity-before.json')==J(ref/'dependency-integrity-after.json')
assert J(ref/'helper-sha256.json')=={n.removeprefix('source/'):h for n,h in reference_manifest.items() if n.startswith('source/scripts/')}
observed=J(main/'packaging-observations.json');assert observed['tools']==J(ref/'tools-before.json')['tools']
assert observed['sdk_source']==J(ref/'tools-before.json')['sdk_source']
assert observed['helpers']==J(ref/'helper-sha256.json')
for n,h in observed['helpers'].items():
 assert H(main/'helpers'/n)==h,n
 if a.current_main:assert H(a.current_main/n)==h,n
assert H(main/'promote_main_once.py')==reference_manifest['promote_main_once.py']
assert not re.search(r'stack (?:offset|frame|size)|exceed.*stack|LLVM ERROR|error:',(main/'build.log').read_text(),re.I)
runtime=J(ref/'runtime-summary.json');assert runtime['status']=='PASS' and runtime['case_count']==17462 and runtime['signature_count']==35418
print(json.dumps({'status':'PASS','main_candidate_sha256':r['candidate_sha256'],'source_files':22,'README_checked':True,'main_equals_tested_candidate_and_symbols':True,'saved_runtime_comparisons_transferred':17462,'saved_signature_checks':35418,'fresh_runtime_execution':False,'fresh_build_execution':False,'tool_evidence_limit':'Before-build tool/SDK checks are established by exact executed promotion script and successful runner exit. Packaging observations establish a later independent check; no process-level compiler trace is invented.'}))
