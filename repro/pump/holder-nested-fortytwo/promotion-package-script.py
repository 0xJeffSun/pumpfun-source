"""Promote only a whole-file-identical main build; leave central files untouched."""
from pathlib import Path
import gzip,hashlib,json,shutil,tarfile
W=Path(__file__).resolve().parent;R=W.parents[1];S=W/'handoff';M=W/'main-build';D=R/'repro/pump/holder-nested-fortytwo'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();scratch_manifest_hash='8343ad1a10d31bbb5557cea1d65a2c0761ae784298441e14b2dc67536cc1215f'
assert sha(S/'manifest-sha256.json')==scratch_manifest_hash
frozen=json.loads((S/'manifest-sha256.json').read_text())
for p,h in frozen.items():assert sha(S/p)==h,p
candidate=M/'artifacts/pump_recovered.so';assert candidate.read_bytes()==(S/'candidate.so').read_bytes()
expected=sha(candidate);assert expected=='c07e67b055c87da881b33c9e07bddf913d5b0beffa1cfe52169ba1bc3f6d2bbf'
report=json.loads((M/'build-comparison.json').read_text());attempt=json.loads((M/'build-attempt.json').read_text());scratch=json.loads((S/'build-comparison.json').read_text())
assert attempt['returncode']==0 and attempt['source_unchanged'] and attempt['source_sha256']==attempt['source_after_sha256']==report['source_sha256']
before={str(Path(p).relative_to('work/pump-holder-nested-main41/crate')):h for p,h in scratch['source_sha256'].items()}
after={str(Path(p).relative_to('programs/pump')):h for p,h in report['source_sha256'].items()}
assert before==after and len(after)==31
for p,h in report['source_sha256'].items():assert sha(R/p)==h,p
inputs=json.loads((S/'inputs-before.json').read_text())
for group in ['harness_sha256','repository_fixture_snapshot_sha256','orchestration_sha256']:
 for p,h in inputs[group].items():assert sha(R/p)==h,p
shutil.copytree(S,D)
replaced=['README.md','summary.json','build-attempt.json','build-comparison.json','build.log.gz','source-snapshot.tar.gz','unstripped.so']
(D/'scratch-build').mkdir()
for name in replaced+['manifest-sha256.json']:shutil.move(D/name,D/'scratch-build'/name)
bindings={p:{'path':'scratch-build/'+p if p in replaced else p,'sha256':h}for p,h in frozen.items()}
for p,entry in bindings.items():assert sha(D/entry['path'])==entry['sha256'],p
(D/'scratch-package-bindings.json').write_text(json.dumps({'scope':'Every file from the immutable tested scratch package is preserved at this mapping. The original package manifest is unchanged under scratch-build/.','scratch_manifest_sha256':scratch_manifest_hash,'scratch_files':len(frozen),'files':bindings},indent=2)+'\n')
for name in ['build-attempt.json','build-comparison.json']:shutil.copyfile(M/name,D/name)
(D/'build.log.gz').write_bytes(gzip.compress((M/'build.log').read_bytes(),mtime=0));shutil.copyfile(candidate,D/'candidate.so');shutil.copyfile(M/'target/sbf-solana-solana/release/pump_recovered.so',D/'unstripped.so')
with tarfile.open(D/'source-snapshot.tar.gz','w:gz')as t:
 for p in report['source_sha256']:t.add(R/p,arcname=p)
identity={'scope':'Clean main-path and scratch builds are entire-file identical. All35 differential suites and28 Surfpool runners executed against scratch; their fresh receipts apply to main by exact executable identity.',
 'main_candidate':str(candidate.relative_to(R)),'scratch_candidate':str((S/'candidate.so').relative_to(R)),
 'main_sha256':expected,'scratch_sha256':sha(S/'candidate.so'),'whole_file_equal':True,'bytes':candidate.stat().st_size,
 'main_build_inputs':report['source_sha256'],'scratch_build_inputs':scratch['source_sha256'],'source_contents_equal_after_path_mapping':True,
 'main_build_attempt_sha256':sha(M/'build-attempt.json'),'scratch_build_attempt_sha256':sha(S/'build-attempt.json'),
 'scratch_package_manifest_sha256':scratch_manifest_hash,'differential_cases':8654,'differential_suites':35,
 'surfpool_comparisons':1024,'surfpool_runners':28,'surfpool_signed_transactions':2048}
(D/'main-scratch-identity.json').write_text(json.dumps(identity,indent=2)+'\n')
summary=json.loads((S/'summary.json').read_text());summary.update(scope='Main Pump42 holder distribution and depth-one normal SOL-root creation checkpoint; full original-byte equality remains false.',main_source_changed=True,main_scratch_whole_file_equal=True,runtime_evidence_reused_by_whole_file_identity=True)
(D/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
shutil.copyfile(W/'README-main.md',D/'README.md');shutil.copyfile(Path(__file__),D/'promotion-package-script.py')
current={'source_sha256':report['source_sha256'],'harness_sha256':inputs['harness_sha256'],'repository_fixture_snapshot_sha256':inputs['repository_fixture_snapshot_sha256'],'full_byte_equality':False}
(D/'source-harness-sha256.json').write_text(json.dumps(current,indent=2)+'\n')
commands={'scope':'Commands for this final executable; actual scratch execution commands remain in differential/run.json and surfpool-run.json. Port-sharing Surfpool runners must not run simultaneously.', 'differential':[], 'surfpool':[]}
for row in json.loads((S/'differential/run.json').read_text()):
 cmd=list(row['command']);cmd[0]='work/test-env/bin/python';cmd[1]=str(Path(cmd[1]).relative_to(R));cmd[cmd.index('--candidate')+1]=str((D/'candidate.so').relative_to(R));cmd[cmd.index('--output')+1]='work/pump-holder-nested42-replay/differential/'+row['suite']+'.json.gz'
 commands['differential'].append({'suite':row['suite'],'family':row['family'],'command':cmd})
for row in json.loads((S/'surfpool-run.json').read_text()):
 commands['surfpool'].append({'suite':row['name'],'family':row['family'],'port':row['port'],'command':['work/test-env/bin/python',row['runner'],'--candidate',str((D/'candidate.so').relative_to(R)),'--output','work/pump-holder-nested42-replay/surfpool/'+row['name']]})
(D/'replay-commands.json').write_text(json.dumps(commands,indent=2)+'\n')
docs=['programs/pump/README.md','audit/pump/HOLDER_NESTED_RECOVERY.md']
(D/'documentation-sha256.json').write_text(json.dumps({p:sha(R/p)for p in docs},indent=2)+'\n')
status=json.loads((R/'repro/status.json').read_text())['pump'];old='repro/pump/creator-fortyone';new=str(D.relative_to(R))
for key in ['candidate_artifact','comparison_report','build_log']:assert old in status[key];status[key]=status[key].replace(old,new)
assert 'distribute_fee_to_holders'not in status['implemented_handlers'];status['implemented_handlers'].append('distribute_fee_to_holders');assert len(status['implemented_handlers'])==42
status['validation_reports']=[new+'/all-differential.json.gz'];status['validated_cases']=8654
status['partially_implemented_handlers']['create_v2']='Normal SOL and whitelisted token quote creation, holder creation, quote-control consumer admission/reserves, configured creator fee checks, and depth-one nested creation from a normal SOL-root quote coin. Mayhem, migrated-parent and deeper nested paths remain partial or unrecovered.'
verification=json.loads((S/'independent-verification.json').read_text())
status['signed_sequence_reports']=[new+'/surfpool/'+x['suite']+'/'+Path(x['receipt']).name+'.gz'for x in sorted(verification['surfpool_suites'],key=lambda x:x['suite'])]
status['surfpool_comparisons']=1024;status['surfpool_signed_transactions']=2048;status['candidate_build_identity_report']=new+'/main-scratch-identity.json';status['prior_checkpoint']=old;status['holder_nested_recovery_report']='audit/pump/HOLDER_NESTED_RECOVERY.md'
assert any('sell_v2'in x and 'transfer-fee'in x for x in status['coverage_limitations'])
for p in status['validation_reports']+status['signed_sequence_reports']:assert (R/p).is_file(),p
(W/'status-entry.json').write_text(json.dumps(status,indent=2)+'\n')
manifest={str(p.relative_to(D)):sha(p)for p in sorted(D.rglob('*'))if p.is_file()}
(D/'manifest-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
for p,h in manifest.items():assert sha(D/p)==h,p
owned=['programs/pump/src/holder_distribution.rs','programs/pump/src/lib.rs','programs/pump/src/create_v2.rs',*docs,
 'scripts/pump_holder_distribution_probe.py','scripts/pump_holder_distribution_differential.py','scripts/pump_holder_distribution_surfpool.py',
 'scripts/pump_create_nested_fixture.py','scripts/pump_create_nested_differential.py','scripts/pump_create_nested_surfpool.py']
result={'changed_owned_paths':owned+[new+'/'],'sha256':{p:sha(R/p)for p in owned},'replacement_status':str((W/'status-entry.json').relative_to(R)),
 'main_candidate_sha256':expected,'main_candidate_bytes':candidate.stat().st_size,'main_input_files':31,'harness_input_files':86,'runtime_input_files':27,
 'package_files':len(manifest),'manifest_sha256':sha(D/'manifest-sha256.json'),'differential_cases':8654,'differential_suites':35,
 'surfpool_comparisons':1024,'surfpool_runners':28,'surfpool_signed_transactions':2048,'main_scratch_whole_file_equal':True,'main_source_frozen':True}
(W/'final-handoff-status.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
