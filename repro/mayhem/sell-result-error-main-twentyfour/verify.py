from pathlib import Path
import argparse,hashlib,json
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
p=argparse.ArgumentParser();p.add_argument('--current-main',type=Path);a=p.parse_args()
m=J(P/'manifest.json')['files'];actual={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in [P/'manifest.json',P/'manifest.sha256']and '__pycache__'not in f.parts};assert actual==set(m)
for rel,row in m.items():assert H(P/rel)==row['sha256']and(P/rel).stat().st_size==row['bytes'],rel
assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
i=J(P/'acceptance-inputs.json');ref=P/'reference';main=P/'main';c=main/'controls'
assert H(ref/'scratch-manifest.json')==i['scratch_manifest_sha256'];sm=J(ref/'scratch-manifest.json')['files']
for rel in i['reference_files']:assert H(ref/rel)==sm[rel]['sha256'],rel
assert(main/'candidate.so').read_bytes()==(ref/'build01/artifacts/mayhem_recovered.so').read_bytes()
assert(main/'unstripped.so').read_bytes()==(ref/'build01/target/sbf-solana-solana/release/mayhem_recovered.so').read_bytes()
ident=J(c/'identity.json');assert ident['whole_candidate_equal']and ident['whole_symbols_equal']and ident['unchanged_helpers_runtime_tools']and not ident['README_changed_during_build']
assert H(main/'candidate.so')==i['candidate_sha256']==ident['candidate_sha256'];assert H(main/'unstripped.so')==i['symbols_sha256']==ident['symbols_sha256']
r=J(main/'build-comparison.json');sr=J(ref/'build01/build-comparison.json');at=J(main/'build-attempt.json')
prefix='work/mayhem-sell-result-error-build/source/'
assert all(n.startswith(prefix)for n in sr['source_sha256']);source={n.removeprefix(prefix):h for n,h in sr['source_sha256'].items()}
assert source==r['source_sha256']==i['compiled_source'];assert r['comparison']==sr['comparison']
assert at['returncode']==0 and at['source_unchanged'] and at['source_sha256']==at['source_after_sha256']==source
assert H(main/'build.log')==at['build_log_sha256']==r['build_log_sha256']
for key in ['selected_toolchain','rustc_sha256','sdk_source_sha256']:assert r[key]==sr[key],key
for rel in ['build-exit.json','dependencies-before-exit.json','dependencies-after-exit.json','runner-exit.json']:assert J(c/rel)['returncode']==0,rel
assert J(c/'dependency-integrity-before.json')==J(c/'dependency-integrity-after.json')==J(ref/'dependency-integrity-before.json')==J(ref/'dependency-integrity-after.json')
for rel,digest in source.items():
 assert H(P/'source'/rel)==digest
 if a.current_main:assert H(a.current_main/rel)==digest,rel
assert H(main/'build-time-README.md')==i['build_time_README_sha256']==ident['main_sources']['programs/mayhem/README.md']
assert H(P/'source/programs/mayhem/README.md')==i['README_sha256']==i['proposed_README_sha256']==H(ref/'proposal/README.md')
if a.current_main:assert H(a.current_main/'programs/mayhem/README.md')==i['README_sha256']
g=J(ref/'gate-before.json');obs=J(P/'packaging-observations.json')
for group in ['helpers','runtime_inputs','tools']:assert obs[group]==g[group]
for rel in ['scripts/build_partial_candidate.py','scripts/build_source_manifest.py','scripts/compare.py']:
 assert H(P/'helpers'/rel)==g['helpers'][rel]
 if a.current_main:assert H(a.current_main/rel)==g['helpers'][rel]
summary=J(ref/'summary.json');assert summary['instruction_comparisons']==9595 and summary['functional_mismatches']==0 and summary['burn_source_location_mismatch_rows']==3
v=J(ref/'portable-verification/result.json');assert v['unchanged_receipt_verifiers']==15 and v['retained_signatures_checked']==26500 and v['retained_transactions_signature_checked']==13284
assert not any(x in(main/'build.log').read_text()for x in ['LLVM ERROR','Error: Function','Stack offset'])
print(json.dumps({'status':'PASS','main_candidate_sha256':i['candidate_sha256'],'whole_executable_and_symbol_identity':True,'compiled_source_files':len(source),'functional_comparisons_bound':9595,'retained_signature_checks_bound':26500,'known_burn_source_location_rows':3,'new_builds':0,'new_target_executions':0,'README':'build-time snapshot and separately applied post-build proposal both preserved'}))
