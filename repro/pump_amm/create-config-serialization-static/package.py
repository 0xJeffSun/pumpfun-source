from pathlib import Path
import json,hashlib,shutil,gzip,tarfile,difflib
w=Path(__file__).resolve().parent;root=w.parents[1];s=root/'work/pump-amm-create-config-static';b=s/'build-06';dest=w/'handoff';assert not dest.exists();dest.mkdir();sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
base=s/'handoff/manifest-sha256.json';assert sha(base)=='5b6a960d3c0583c1e3cbbe7966ca7ba61de0099da146d59af6086ec867493f5c'
for p,h in json.loads(base.read_text()).items():assert sha(base.parent/p)==h
for name in ['README.md','exit-diff.json','extract.py','exit.asm','io_error_conversion.asm','package.py']:shutil.copyfile(w/name,dest/name)
for name in ['build-attempt.json','build-comparison.json','function-match-bounded.log']:shutil.copyfile(b/name,dest/name)
for name in ['build.log','function-matches-exit.json','rejection-results.json','admin-results.json','fee-config-results.json']:(dest/(name+'.gz')).write_bytes(gzip.compress((b/name).read_bytes(),mtime=0))
shutil.copyfile(b/'artifacts/pump_amm_recovered.so',dest/'pump_amm_recovered.so');shutil.copyfile(b/'target/sbf-solana-solana/release/pump_amm_recovered.so',dest/'unstripped.so')
report=json.loads((b/'build-comparison.json').read_text())
with tarfile.open(dest/'source-snapshot.tar.gz','w:gz')as t:
 for p,h in report['source_sha256'].items():assert sha(root/p)==h,p;t.add(root/p,arcname=p)
helpers=[s/'match-exit.py',s/'elf_analysis.py',s/'rejection_probe.py',root/'scripts/build_partial_candidate.py',root/'scripts/build_source_manifest.py',root/'scripts/compare.py',root/'scripts/pump_amm_admin_differential.py',root/'scripts/pump_amm_fee_config_differential.py',root/'scripts/pump_amm_reusable_harness.py']
(dest/'helper-input-sha256.json').write_text(json.dumps({str(p.relative_to(root)):sha(p)for p in helpers},indent=2)+'\n')
with tarfile.open(dest/'helper-snapshot.tar.gz','w:gz')as t:
 for p in helpers:t.add(p,arcname=str(p.relative_to(root)))
for name in ['runtime-input-sha256.json','test-environment.json','main-unchanged.json']:shutil.copyfile(s/'handoff'/name,dest/name)
shutil.copytree(s/'handoff/compiler-provenance',dest/'compiler-provenance')
main=root/'programs/pump-amm/src/state.rs';scratch=s/'crate/programs/pump-amm/src/state.rs';proposal=scratch.read_text().removeprefix('mod global_config;\n');diff=''.join(difflib.unified_diff(main.read_text().splitlines(True),proposal.splitlines(True),fromfile='a/programs/pump-amm/src/state.rs',tofile='b/programs/pump-amm/src/state.rs'));assert diff.count('@@')==2;(dest/'global-config-serializer.patch').write_text(diff)
prior={'package':'work/pump-amm-create-config-static/handoff','manifest_sha256':sha(base),'package_files':69,'unchanged_verified':True};(dest/'prior-package.json').write_text(json.dumps(prior,indent=2)+'\n')
match=json.loads((b/'function-matches-exit.json').read_text());selected=[x for x in match['selected_functions']if x['matches']];calls=[c for x in selected for c in x['matches'][0]['direct_target_checks']];summary={'scope':'Static-only create_config with supported GlobalConfig serializer correction; main unchanged, no promotion/count increase.','candidate_sha256':sha(dest/'pump_amm_recovered.so'),'candidate_bytes':(dest/'pump_amm_recovered.so').stat().st_size,'source_inputs':len(report['source_sha256']),'helper_inputs':len(helpers),'complete_selected_body_matches':len(selected),'selected_functions_compared':len(match['selected_functions']),'direct_calls_compared':len(calls),'direct_calls_with_matching_target_bodies':sum(c['target_has_matching_full_body']for c in calls),'remaining_unmatched_direct_targets':sorted(set(c['original_target']for c in calls if not c['target_has_matching_full_body'])),'create_config_positive_cases':0,'full_byte_equality':False,'original_elf_extent_equality':False,'main_source_changed':False,'main_source_patch_compiled_separately':False,'all_25_suites_rerun':False,'suites':{}}
for name,n in [('rejection-results',372),('admin-results',8331),('fee-config-results',356)]:
 result=json.loads((b/(name+'.json')).read_text());assert result['candidate_sha256']==summary['candidate_sha256'];assert result['case_count']==n and not result['mismatches'];summary['suites'][name]=n
summary['scratch_total_cases']=sum(summary['suites'].values());(dest/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
manifest={str(p.relative_to(dest)):sha(p)for p in sorted(dest.rglob('*'))if p.is_file()and p.name!='manifest-sha256.json'};(dest/'manifest-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
for p,h in manifest.items():assert sha(dest/p)==h
result={'package':str(dest.relative_to(root)),'manifest_sha256':sha(dest/'manifest-sha256.json'),'package_files':len(manifest),**summary};(w/'handoff-status.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
