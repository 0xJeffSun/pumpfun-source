from pathlib import Path
import json,hashlib,shutil,tarfile,gzip
r=Path('work/pump-amm-legacy-sell');main=r/'main-build-06';scratch=r/'build-05';dest=Path('repro/pump_amm/legacy-sell-thirty-three');sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a=main/'artifacts/pump_amm_recovered.so';b=scratch/'artifacts/pump_amm_recovered.so';assert a.read_bytes()==b.read_bytes(),'Main binary differs; rerun all22 suites'
report=json.loads((main/'build-comparison.json').read_text());attempt=json.loads((main/'build-attempt.json').read_text());assert attempt['returncode']==0 and attempt['source_unchanged']
for p,h in report['source_sha256'].items():assert sha(Path(p))==h,p
for p,h in json.loads((scratch/'results/test-source-sha256.json').read_text()).items():assert sha(Path(p))==h,p
newtest=json.loads((r/'maintained-portability.json').read_text());oldtest=json.loads((scratch/'results/legacy_sell.json').read_text());assert newtest['cases']==oldtest['cases'];assert not newtest['mismatches'];assert newtest['candidate_sha256']==sha(a)
shutil.copytree(r/'handoff',dest)
for n in ['build-attempt.json','build-comparison.json','source-snapshot.tar.gz','build.log.gz']:
 (dest/'scratch-build').mkdir(exist_ok=True);shutil.move(dest/n,dest/'scratch-build'/n)
for n in ['build-attempt.json','build-comparison.json']:shutil.copyfile(main/n,dest/n)
(dest/'build.log.gz').write_bytes(gzip.compress((main/'build.log').read_bytes(),mtime=0));shutil.copyfile(a,dest/'pump_amm_recovered.so')
with tarfile.open(dest/'source-snapshot.tar.gz','w:gz') as t:
 for p in report['source_sha256']:t.add(p,arcname=p)
identity={'scope':'The independently clean main-path build is whole-file identical to the scratch candidate that ran all22 suites. Reuse all21 existing suite receipts and retain the original559-case scratch receipt. The maintained559-case harness was rerun from /tmp on the identical scratch executable; its cases are exactly equal, not additional unique cases.','main_candidate':str(a),'scratch_candidate':str(b),'main_sha256':sha(a),'scratch_sha256':sha(b),'whole_file_equal':True,'bytes':a.stat().st_size,'main_build_inputs':report['source_sha256'],'scratch_build_inputs':json.loads((scratch/'build-comparison.json').read_text())['source_sha256'],'validated_unique_cases':15194,'main_build_attempt_sha256':sha(main/'build-attempt.json'),'scratch_build_attempt_sha256':sha(scratch/'build-attempt.json'),'maintained_harness':'scripts/pump_amm_legacy_sell_differential.py','maintained_harness_sha256':sha(Path('scripts/pump_amm_legacy_sell_differential.py')),'maintained_portability_receipt_sha256':sha(r/'maintained-portability.json'),'maintained_vs_scratch_case_bytes_equal':True,'portability_working_directory':'/tmp'}
(dest/'main-scratch-identity.json').write_text(json.dumps(identity,indent=2)+'\n')
shutil.move(dest/'legacy_sell-differential.json.gz',dest/'scratch-build/legacy_sell-differential.json.gz');(dest/'legacy_sell-differential.json.gz').write_bytes(gzip.compress((r/'maintained-portability.json').read_bytes(),mtime=0))
# Keep the exact original executed test closure and command record; add the maintained closure.
for n in ['test-source-sha256.json','test-snapshot.tar.gz','regression-run.json']:shutil.move(dest/n,dest/'scratch-build'/n)
tests=json.loads((scratch/'results/test-source-sha256.json').read_text());tests.pop(str(r/'differential.py'));tests['scripts/pump_amm_legacy_sell_differential.py']=sha(Path('scripts/pump_amm_legacy_sell_differential.py'));tests[str(r/'independent-compare.py')]=sha(r/'independent-compare.py');tests[str(r/'promote-package.py')]=sha(r/'promote-package.py')
(dest/'test-source-sha256.json').write_text(json.dumps(tests,indent=2)+'\n')
with tarfile.open(dest/'test-snapshot.tar.gz','w:gz') as t:
 for p in tests:assert sha(Path(p))==tests[p];t.add(p,arcname=p)
commands=json.loads((scratch/'results/regression-run.json').read_text())
for row in commands:
 if row['suite']=='legacy_sell':row['command'][1]='scripts/pump_amm_legacy_sell_differential.py'
 row['command'][row['command'].index('--candidate')+1]=str(dest/'pump_amm_recovered.so');row['command'][row['command'].index('--output')+1]='work/amm33-replay/'+row['suite']+'.json'
 for field in ['returncode','stdout','stderr']:row.pop(field,None)
(dest/'replay-commands.json').write_text(json.dumps({'scope':'Commands to replay the preserved suites; actual scratch executed commands remain in scratch-build/regression-run.json.','commands':commands},indent=2)+'\n')
summary=json.loads((dest/'summary.json').read_text());summary.update({'scope':'Main-path AMM33 legacy sell checkpoint with bounded local parity. Full binary identity remains false.','main_source_changed':True,'main_scratch_whole_file_equal':True,'runtime_evidence_reused_by_whole_file_identity':True,'test_helper_inputs':len(tests),'maintained_harness_portability_cases':559,'maintained_harness_portability_cases_are_additional':False});(dest/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
shutil.copyfile(r/'README-promotion.md',dest/'README.md');shutil.copyfile(r/'promote-package.py',dest/'promotion-package-script.py')
status=json.loads(Path('repro/status.json').read_text())['pump_amm'];old='repro/pump_amm/compiler-v144';new=str(dest)
for k in ['candidate_artifact','comparison_report','build_log','candidate_build_identity_report']:status[k]=status[k].replace(old,new)
status['implemented_handlers'].append('sell');status['validated_cases']=15194;status['validation_reports']=[x.replace(old,new) for x in status['validation_reports']]+[str(dest/'legacy_sell-differential.json.gz')];status['prior_checkpoint']=old;status['legacy_sell_recovery_report']='audit/pump_amm/LEGACY_SELL_RECOVERY.md';(r/'status-entry.json').write_text(json.dumps(status,indent=2)+'\n')
docs=['programs/pump-amm/README.md','audit/pump_amm/LEGACY_SELL_RECOVERY.md'];(dest/'documentation-sha256.json').write_text(json.dumps({p:sha(Path(p)) for p in docs},indent=2)+'\n')
manifest={str(p.relative_to(dest)):sha(p) for p in sorted(dest.rglob('*')) if p.is_file() and p.name!='manifest-sha256.json'};(dest/'manifest-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'candidate_sha256':sha(a),'candidate_bytes':a.stat().st_size,'main_input_files':len(report['source_sha256']),'test_input_files':len(tests),'package_files':len(manifest),'manifest_sha256':sha(dest/'manifest-sha256.json'),'status_entry':str(r/'status-entry.json')},indent=2))
