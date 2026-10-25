from pathlib import Path
import argparse,hashlib,json
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
p=argparse.ArgumentParser();p.add_argument('--current-main',type=Path);a=p.parse_args()
m=J(P/'manifest.json')['files'];assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().strip()
assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
ref=P/'reference';main=P/'main';ctl=main/'controls';i=J(P/'acceptance-inputs.json');sm=J(ref/'scratch-manifest.json')['files']
assert H(ref/'scratch-manifest.json')==i['scratch_manifest_sha256']==(ref/'scratch-manifest.sha256').read_text().strip()
for n,h in i['reference_files'].items():assert H(ref/n)==h==sm[n],n
identity=J(ctl/'identity.json');assert identity['whole_candidate_equal']and identity['whole_symbols_equal']and identity['tools_helpers_dependencies_unchanged']
for n in ['candidate.so','unstripped.so']:assert (main/n).read_bytes()==(ref/n).read_bytes()
assert H(main/'candidate.so')==identity['candidate_sha256']=='3fe52eea99e26866795348aad93fb821f834bf04290b4176a67ae0b7add0fcb5'
assert H(main/'unstripped.so')==identity['symbols_sha256']=='f11ba7729d613d72678924cfb35c0489adc828a4dd8dfe0581aa0c958a642717'
source=i['source'];assert len(source)==28 and source==identity['source']==J(ref/'proposed-source-sha256.json')
report=J(main/'build-comparison.json');attempt=J(main/'build-attempt.json');assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source
assert attempt['returncode']==0 and attempt['source_unchanged']
assert H(main/'build.log')==report['build_log_sha256']==attempt['build_log_sha256']
assert report['comparison']==J(ref/'build-01/build-comparison.json')['comparison']and not report['comparison']['full_byte_equality']
for n in ['build-exit.json','dependencies-before-exit.json','dependencies-after-exit.json','runner-exit.json']:assert J(ctl/n)['returncode']==0,n
assert J(ctl/'dependency-integrity-before.json')==J(ctl/'dependency-integrity-after.json')==J(ref/'dependency-integrity-before.json')==J(ref/'dependency-integrity-after.json')
gate=J(ctl/'gate-before.json');tools=J(ref/'tools-before.json');assert gate['tools']==tools['tools']==J(ref/'tools-after.json')['tools']
assert report['selected_toolchain']=='v1.44'and report['sdk_source_sha256']==tools['sdk_source']
assert identity['README_sha256_unchanged']==H(main/'README.before.md')==gate['README_sha256']
for n,h in source.items():
 assert H(main/'source'/n)==h,n
 if a.current_main:assert H(a.current_main/n)==h,n
for n,h in gate['helpers'].items():
 assert H(main/'helpers'/n)==h,n
 if a.current_main:assert H(a.current_main/n)==h,n
for n,h in tools['sdk_source'].items():assert H(main/'sdk-source'/n)==h,n
assert H(main/'README.final.md')==i['README_sha256']
if a.current_main:assert H(a.current_main/'programs/pump-amm/README.md')==i['README_sha256']
s=J(ref/'runtime-summary.json');assert s['status']=='PASS'and s['case_count']==17462 and s['signature_count']==35418 and not s['mismatches']
assert len(J(ref/'receipt-bindings.json'))==25
for key in ['init_parser','init_wrapper','init_handler','close_parser','close_wrapper','close_exit','sync_parser','sync_wrapper','claim_parser','claim_wrapper','claim_exit']:assert J(ref/'context-static.json')[key]['original_normalized_equal']
assert J(ref/'nochange-log-verification.json')['existing_message_cases']==113
for key in ['parser','wrapper','exit']:assert J(ref/'claim-static.json')[key]['complete_normalized_equal']
assert [n for n in J(ref/'accepted-source-sha256.json')if J(ref/'accepted-source-sha256.json')[n]!=source[n]]==['programs/pump-amm/src/lib.rs']
print(json.dumps({'status':'PASS','candidate_sha256':identity['candidate_sha256'],'whole_main_scratch_executable_equal':True,'whole_main_scratch_symbols_equal':True,'source_inputs':28,'saved_comparisons_bound':17462,'saved_signatures_bound':35418,'new_builds':0,'new_runtime_executions':0,'current_main_checked':bool(a.current_main)},indent=2))
