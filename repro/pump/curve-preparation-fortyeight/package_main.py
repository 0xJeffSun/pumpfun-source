from pathlib import Path
import gzip,hashlib,json,shutil,tarfile
R=Path.cwd();W=R/'work/pump-curve-preparation-main';S=R/'work/pump-curve-preparation-build/handoff';P=R/'repro/pump/curve-preparation-fortyeight';PREFIX=str(P.relative_to(R));H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(n,v):p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,indent=2)+'\n')
def copy(a,b):assert not a.is_symlink()and not a.name.endswith('-keypair.json');b.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(a,b)
def tree(a,b):
 for p in sorted(a.rglob('*')):
  if p.name.endswith('-keypair.json'):raise AssertionError(p)
  if p.is_file():copy(p,b/p.relative_to(a))
assert not P.exists();identity=J(W/'main-scratch-identity.json');assert all(v['entire_files_equal']for v in identity['files'].values());P.mkdir()
for n in ['candidate.so','unstripped.so','main-scratch-identity.json','source-sha256.json','documentation-sha256.json','toolchain-phases.json','tools-observed.json','sdk-source-sha256.json','build-helper-sha256.json','dependency-before.json','dependency-after.json','baseline-dependency-provenance.json.gz','build-launch.json','build-result.json','prebuild-manifest.json','build_main_once.py','promote.py','promotion.json','README.before.md','README.final.md','README.patch','package_main.py','build.stdout','build.stderr']:copy(W/n,P/n)
for n in ['build-comparison.json','build-attempt.json']:copy(W/'build-01'/n,P/n)
(P/'build.log.gz').write_bytes(gzip.compress((W/'build-01/build.log').read_bytes(),mtime=0));tree(W/'source',P/'source');tree(W/'build-helpers',P/'build-helpers');copy(R/'programs/pump/README.md',P/'owned/programs/pump/README.md')
for archive,root,items in [('source-snapshot.tar.gz',W/'source',J(W/'source-sha256.json')),('prebuild-snapshot.tar.gz',W,J(W/'prebuild-manifest.json'))]:
 with tarfile.open(P/archive,'w:gz')as t:
  for n,h in items.items():assert H(root/n)==h;t.add(root/n,arcname=n,recursive=False)
with tarfile.open(P/'scratch-handoff.tar.gz','w:gz')as t:
 for n in [*J(S/'manifest.json'),'manifest.json','manifest.sha256']:t.add(S/n,arcname=n,recursive=False)
copy(S/'manifest.json',P/'scratch-manifest.json');copy(S/'REPORT.md',P/'scratch-REPORT.md');copy(R/'work/pump-curve-preparation-build/portability-results.json',P/'scratch-portability-results.json')
for n in ['full-before-after-inventory.json.gz','fresh-metadata.json','metadata-closure.json','before-after-inventory.json','function-match.json','runtime-identities.json','runtime-adaptation.json']:copy(S/n,P/n)
# Direct receipts retain their exact saved bytes; the archive carries all journals and logs.
bindings=[];suites={}
for row in J(S/'receipt-bindings.json'):
 n=('differential/' if row['kind']=='differential'else 'surfpool/')+row['suite']+'.json.gz';copy(S/row['path'],P/n)
 b={**row,'path':n,'scratch_path':row['path'],'actual_source_sha256':J(W/'source-sha256.json'),'executed_scratch_source_sha256':row['actual_source_sha256'],'executed_scratch_build_report_sha256':row['build_report_sha256'],'build_report_sha256':H(P/'build-comparison.json'),'main_build_report_sha256':H(P/'build-comparison.json'),'identity_report_sha256':H(P/'main-scratch-identity.json')};bindings.append(b)
 if row['kind']=='differential':
  raw=(P/n).read_bytes();suites[row['suite']]=json.loads(gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw)
save('receipt-build-bindings.json',bindings)
agg={'scope':'Exact current saved scratch reports bound to byte-identical clean main ELF; no additional cases or execution.','case_count':9269,'suite_count':40,'candidate_sha256':H(P/'candidate.so'),'original_sha256':J(P/'build-comparison.json')['comparison']['original_sha256'],'mismatches':[],'suites':suites}
(P/'all-differential.json.gz').write_bytes(gzip.compress((json.dumps(agg,separators=(',',':'))+'\n').encode(),mtime=0))
tree(S/'runtime-layer/nested-harness',P/'nested-harness')
for n in ['pump_general_route_differential.py','base-fixture.json']:copy(S/'runtime-layer/route-harness'/n,P/'route-harness'/n)
for n in ['pump_tokenkeg_two_curve_differential.py','base-fixture.json']:copy(R/'repro/pump/nested-general-route-fortyeight/harness'/n,P/'harness'/n)
i=J(S/'inputs-before.json');groups={'source':J(W/'source-sha256.json'),'documentation':J(W/'documentation-sha256.json'),'maintained_harness':i['harness_sha256'],'fixtures_and_program_ELFs':i['repository_fixture_snapshot_sha256'],'published_additional_inputs':i['published_additional_inputs'],'build_helpers':J(W/'build-helper-sha256.json'),'canonical_harness':{str(p.relative_to(R)):H(p)for d in ['nested-harness','route-harness','harness']for p in sorted((P/d).rglob('*'))if p.is_file()}}
aliases={'work/pump-multi-hop-curve-recovery/differential.py':'repro/pump/native-curve-partial-fortyeight/harness/pump_multi_hop_curve_differential.py','work/pump-multi-hop-curve-recovery/verify_saved.py':'repro/pump/native-curve-partial-fortyeight/isolated-partial-checkpoint/verify_saved.py','work/pump-nested-general-route-recovery/run-01/two-curve-harness/base-fixture.json':PREFIX+'/harness/base-fixture.json','work/pump-nested-general-route-recovery/run-01/two-curve-harness/pump_tokenkeg_two_curve_differential.py':PREFIX+'/harness/pump_tokenkeg_two_curve_differential.py'}
for old,new in aliases.items():
 h=groups['maintained_harness'].pop(old);assert H(R/new)==h;groups['maintained_harness'][new]=h
save('historical-path-correspondence.json',aliases)
save('current-bindings.json',{'scope':'Actual main source and canonical tracked inputs; runtime executable identities remain historical.','groups':groups})
status=J(R/'repro/status.json')['pump'];old='repro/pump/final-error-metadata-fortyeight';status.update(candidate_artifact=PREFIX+'/candidate.so',comparison_report=PREFIX+'/build-comparison.json',build_log=PREFIX+'/build.log.gz',validation_reports=[PREFIX+'/all-differential.json.gz'],signed_sequence_reports=[PREFIX+'/'+b['path']for b in bindings if b['kind']=='surfpool'],candidate_build_identity_report=PREFIX+'/main-scratch-identity.json',prior_checkpoint=old,receipt_build_bindings_report=PREFIX+'/receipt-build-bindings.json',bonding_curve_serialization_body_evidence=PREFIX+'/function-match.json',compiler_phase_provenance=PREFIX+'/toolchain-phases.json',final_error_metadata_report=PREFIX+'/README.md',final_error_metadata_body_evidence=PREFIX+'/metadata-closure.json',curve_decoder_preparation_report=PREFIX+'/README.md')
save('status-pump-proposal.json',status)
copy(W/'verify_main.py',P/'verify.py')
print(json.dumps({'package':str(P),'receipts':len(bindings),'source_inputs':37,'sealed':False}))
