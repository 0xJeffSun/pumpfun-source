from pathlib import Path
import argparse,hashlib,json
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
p=argparse.ArgumentParser();p.add_argument('--current-main',type=Path);a=p.parse_args()
m=J(P/'manifest.json')['files'];assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in [P/'manifest.json',P/'manifest.sha256']}
for n,h in m.items():assert H(P/n)==h,n
assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().strip()
i=J(P/'acceptance-inputs.json');ref=P/'reference';main=P/'main';c=main/'controls'
assert H(ref/'scratch-manifest.json')==i['scratch_manifest_sha256'];sm=J(ref/'scratch-manifest.json')['files']
for n in i['reference_files']:assert H(ref/n)==sm[n]['sha256'],n
assert (main/'candidate.so').read_bytes()==(ref/'build01/artifacts/mayhem_recovered.so').read_bytes()
assert (main/'unstripped.so').read_bytes()==(ref/'build01/target/sbf-solana-solana/release/mayhem_recovered.so').read_bytes()
identity=J(c/'identity.json');assert identity['whole_candidate_equal']and identity['whole_symbols_equal']
assert H(main/'candidate.so')==i['candidate_sha256']==identity['candidate_sha256']
assert H(main/'unstripped.so')==i['symbols_sha256']==identity['symbols_sha256']
report=J(main/'build-comparison.json');sr=J(ref/'build01/build-comparison.json');attempt=J(main/'build-attempt.json')
assert report['source_sha256']==sr['source_sha256']==i['compiled_source']
assert report['comparison']==sr['comparison']
assert attempt['returncode']==0 and attempt['source_unchanged']
assert attempt['source_sha256']==attempt['source_after_sha256']==i['compiled_source']
assert H(main/'build.log')==attempt['build_log_sha256']==report['build_log_sha256']
for k in ['selected_toolchain','rustc_sha256','sdk_source_sha256']:assert report[k]==sr[k],k
for n in ['build-exit.json','dependencies-before-exit.json','dependencies-after-exit.json','runner-exit.json']:assert J(c/n)['returncode']==0,n
assert J(c/'dependency-integrity-before.json')==J(c/'dependency-integrity-after.json')==J(ref/'dependency-integrity.json')
for n,h in i['compiled_source'].items():
 assert H(P/'source'/n)==h,n
 if a.current_main:assert H(a.current_main/n)==h,n
readme='programs/mayhem/README.md';assert H(P/'source'/readme)==i['README_sha256']==H(ref/'proposal/README.md')
if a.current_main:assert H(a.current_main/readme)==i['README_sha256']
obs=J(P/'packaging-observations.json');g=J(ref/'gate-before.json')
for group in obs:assert obs[group]==g[group],group
for n in ['scripts/build_partial_candidate.py','scripts/build_source_manifest.py','scripts/compare.py']:
 assert H(P/'helpers'/n)==g['helpers'][n],n
 if a.current_main:assert H(a.current_main/n)==g['helpers'][n],n
assert not any(x in (main/'build.log').read_text()for x in ['Stack offset','LLVM ERROR','Error: Function'])
summary=J(ref/'summary.json');assert summary['instruction_comparisons']==9595 and summary['functional_mismatches']==0 and summary['burn_source_location_mismatch_rows']==3
print(json.dumps({'status':'PASS','candidate_sha256':i['candidate_sha256'],'main_executable_and_symbols_equal_tested':True,'compiled_source_files':len(i['compiled_source']),'functional_comparisons_transferred':9595,'known_burn_diagnostic_rows':3,'fresh_runtime':False,'fresh_build':False,'tool_evidence':'Observed before/after gates plus packaging-time identity; no per-process trace claimed'}))
