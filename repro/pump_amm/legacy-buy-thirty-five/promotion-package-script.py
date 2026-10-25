from pathlib import Path
import json,hashlib,shutil,tarfile,gzip
r=Path('work/pump-amm-legacy-buy');main=r/'main-build-04';scratch=r/'build-03';dest=Path('repro/pump_amm/legacy-buy-thirty-five');sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a=main/'artifacts/pump_amm_recovered.so';b=scratch/'artifacts/pump_amm_recovered.so';assert a.read_bytes()==b.read_bytes(),'Main binary differs; rerun all23 suites'
report=json.loads((main/'build-comparison.json').read_text());attempt=json.loads((main/'build-attempt.json').read_text());assert attempt['returncode']==0 and attempt['source_unchanged']
for p,h in report['source_sha256'].items():assert sha(Path(p))==h,p
oldtests=json.loads((scratch/'results/test-source-sha256.json').read_text())
with tarfile.open(scratch/'results/test-snapshot.tar.gz') as t:
 for p,h in oldtests.items():assert hashlib.sha256(t.extractfile(p).read()).hexdigest()==h,p
for p,h in oldtests.items():
 if p!='scripts/pump_amm_legacy_sell_differential.py':assert sha(Path(p))==h,p
checks={}
for family in ['buy','sell']:
 new=json.loads((r/('maintained-'+family+'-portability.json')).read_text());old=json.loads((scratch/'results'/('legacy_'+family+'.json')).read_text());assert new['cases']==old['cases'];assert not new['mismatches'];assert new['candidate_sha256']==sha(a);checks[family]={'case_count':new['case_count'],'case_results_equal':True,'main_receipt_sha256':sha(r/('maintained-'+family+'-portability.json')),'scratch_receipt_sha256':sha(scratch/'results'/('legacy_'+family+'.json')),'maintained_harness_sha256':sha(Path('scripts/pump_amm_legacy_'+family+'_differential.py'))}
shutil.copytree(r/'handoff',dest)
for n in ['build-attempt.json','build-comparison.json','source-snapshot.tar.gz','build.log.gz','test-source-sha256.json','test-snapshot.tar.gz','regression-run.json']:
 (dest/'scratch-build').mkdir(exist_ok=True);shutil.move(dest/n,dest/'scratch-build'/n)
for n in ['build-attempt.json','build-comparison.json']:shutil.copyfile(main/n,dest/n)
(dest/'build.log.gz').write_bytes(gzip.compress((main/'build.log').read_bytes(),mtime=0));shutil.copyfile(a,dest/'pump_amm_recovered.so')
with tarfile.open(dest/'source-snapshot.tar.gz','w:gz') as t:
 for p in report['source_sha256']:t.add(p,arcname=p)
identity={'scope':'Independently clean main-path build is whole-file identical to scratch build03. All23 suites ran against scratch. Reuse21 unchanged suite receipts by exact executable identity. The two maintained legacy harnesses ran from /tmp against the main executable; case results are exactly equal to scratch and do not add unique cases.','main_candidate':str(a),'scratch_candidate':str(b),'main_sha256':sha(a),'scratch_sha256':sha(b),'whole_file_equal':True,'bytes':a.stat().st_size,'main_build_inputs':report['source_sha256'],'scratch_build_inputs':json.loads((scratch/'build-comparison.json').read_text())['source_sha256'],'validated_unique_cases':16221,'main_build_attempt_sha256':sha(main/'build-attempt.json'),'scratch_build_attempt_sha256':sha(scratch/'build-attempt.json'),'maintained_harness_replays':checks,'portability_working_directory':'/tmp','prior_amm33_known_gap_evidence':'repro/pump_amm/legacy-sell-zero-fee-gap/receipt.json.gz','prior_gap_evidence_sha256':sha(Path('repro/pump_amm/legacy-sell-zero-fee-gap/receipt.json.gz'))}
(dest/'main-scratch-identity.json').write_text(json.dumps(identity,indent=2)+'\n')
for family in ['buy','sell']:
 name='legacy_'+family+'-differential.json.gz';shutil.move(dest/name,dest/'scratch-build'/name);(dest/name).write_bytes(gzip.compress((r/('maintained-'+family+'-portability.json')).read_bytes(),mtime=0))
tests=dict(oldtests)
for p in [str(r/'buy-differential.py'),str(r/'sell-differential.py')]:tests.pop(p)
for family in ['buy','sell']:p='scripts/pump_amm_legacy_'+family+'_differential.py';tests[p]=sha(Path(p))
for p in [r/'independent-compare.py',r/'promote-package.py']:tests[str(p)]=sha(p)
(dest/'test-source-sha256.json').write_text(json.dumps(tests,indent=2)+'\n')
with tarfile.open(dest/'test-snapshot.tar.gz','w:gz') as t:
 for p,h in tests.items():assert sha(Path(p))==h,p;t.add(p,arcname=p)
commands=json.loads((scratch/'results/regression-run.json').read_text())
for row in commands:
 if row['suite'] in ['legacy_buy','legacy_sell']:row['command'][1]='scripts/pump_amm_'+row['suite']+'_differential.py'
 row['command'][row['command'].index('--candidate')+1]=str(dest/'pump_amm_recovered.so');row['command'][row['command'].index('--output')+1]='work/amm35-replay/'+row['suite']+'.json'
 for field in ['returncode','stdout','stderr']:row.pop(field,None)
(dest/'replay-commands.json').write_text(json.dumps({'scope':'Reproduction commands; actual scratch executed commands remain in scratch-build/regression-run.json.','commands':commands},indent=2)+'\n')
summary=json.loads((dest/'summary.json').read_text());summary.update({'scope':'Main-path AMM35 legacy buy/exact-quote checkpoint with zero-fee cashback sell event correction. Bounded parity; full ELF identity remains false.','main_source_changed':True,'main_scratch_whole_file_equal':True,'runtime_evidence_reused_by_whole_file_identity':True,'test_helper_inputs':len(tests),'maintained_harness_portability_cases':1586,'maintained_harness_portability_cases_are_additional':False});(dest/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
shutil.copyfile(r/'README-promotion.md',dest/'README.md');shutil.copyfile(r/'promote-package.py',dest/'promotion-package-script.py')
status=json.loads(Path('repro/status.json').read_text())['pump_amm'];old='repro/pump_amm/legacy-sell-thirty-three';new=str(dest)
for k in ['candidate_artifact','comparison_report','build_log','candidate_build_identity_report']:status[k]=status[k].replace(old,new)
for n in ['buy','buy_exact_quote_in']:
 if n not in status['implemented_handlers']:status['implemented_handlers'].append(n)
status['validated_cases']=16221;status['validation_reports']=[x.replace(old,new) for x in status['validation_reports']]+[str(dest/'legacy_buy-differential.json.gz')];status['prior_checkpoint']=old;status['legacy_buy_recovery_report']='audit/pump_amm/LEGACY_BUY_RECOVERY.md';status['corrected_prior_gap_report']=str(dest/'sell-event-correction.json')
status['coverage_limitations']=[x for x in status.get('coverage_limitations',[]) if 'zero-creator-fee cashback sell probe' not in x]
if not status['coverage_limitations']:status.pop('coverage_limitations')
if status.get('known_gap_evidence')=='repro/pump_amm/legacy-sell-zero-fee-gap/receipt.json.gz':status.pop('known_gap_evidence')
(r/'status-entry.json').write_text(json.dumps(status,indent=2)+'\n')
docs=['programs/pump-amm/README.md','audit/pump_amm/LEGACY_BUY_RECOVERY.md','audit/pump_amm/LEGACY_SELL_RECOVERY.md'];(dest/'documentation-sha256.json').write_text(json.dumps({p:sha(Path(p)) for p in docs},indent=2)+'\n')
manifest={str(p.relative_to(dest)):sha(p) for p in sorted(dest.rglob('*')) if p.is_file() and p.name!='manifest-sha256.json'};(dest/'manifest-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'candidate_sha256':sha(a),'candidate_bytes':a.stat().st_size,'main_input_files':len(report['source_sha256']),'test_input_files':len(tests),'package_files':len(manifest),'manifest_sha256':sha(dest/'manifest-sha256.json'),'status_entry':str(r/'status-entry.json')},indent=2))
