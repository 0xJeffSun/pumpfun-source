"""Publish main-path reproduction of the sealed Pool-only scratch experiment."""
from pathlib import Path
import gzip, hashlib, json, shutil, tarfile

WORK=Path(__file__).resolve().parent; ROOT=WORK.parents[1]
SCRATCH=WORK/'handoff'; MAIN=WORK/'main-build'
DEST=ROOT/'repro/pump_amm/pool-serialization-thirty-seven'
PRIOR=ROOT/'repro/pump_amm/serialization-thirty-seven'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
read=lambda p:json.loads(p.read_text())
scratch_manifest='f61f415fe889fa3b77fdb22b1bf2dc07d4ab4b70ff2e09faad3ea7dc4b94c897'
assert sha(SCRATCH/'manifest-sha256.json')==scratch_manifest
for path,digest in read(SCRATCH/'manifest-sha256.json').items():assert sha(SCRATCH/path)==digest,path
for path,digest in read(PRIOR/'manifest-sha256.json').items():assert sha(PRIOR/path)==digest,path
candidate=MAIN/'artifacts/pump_amm_recovered.so'
assert candidate.read_bytes()==(SCRATCH/'pump_amm_recovered.so').read_bytes()
expected=sha(candidate); build=read(MAIN/'build-comparison.json'); attempt=read(MAIN/'build-attempt.json')
assert attempt['returncode']==0 and attempt['source_unchanged']
assert attempt['source_sha256']==attempt['source_after_sha256']==build['source_sha256']
scratch_build=read(SCRATCH/'build-comparison.json')
assert {str(Path(p).relative_to('programs/pump-amm')):h for p,h in build['source_sha256'].items()}=={str(Path(p).relative_to('work/amm-pool-serializer-recovery/crate')):h for p,h in scratch_build['source_sha256'].items()}
for group in [build['source_sha256'],read(SCRATCH/'test-source-sha256.json'),read(SCRATCH/'runtime-input-sha256.json')]:
    for path,digest in group.items():assert sha(ROOT/path)==digest,path
DEST.mkdir(exist_ok=False)
shutil.copytree(SCRATCH,DEST/'scratch-build')
for name in ['build-attempt.json','build-comparison.json']:shutil.copyfile(MAIN/name,DEST/name)
(DEST/'build.log.gz').write_bytes(gzip.compress((MAIN/'build.log').read_bytes(),mtime=0))
shutil.copyfile(candidate,DEST/'pump_amm_recovered.so')
shutil.copyfile(MAIN/'target/sbf-solana-solana/release/pump_amm_recovered.so',DEST/'unstripped.so')
with tarfile.open(DEST/'source-snapshot.tar.gz','w:gz')as archive:
    for path in build['source_sha256']:archive.add(ROOT/path,arcname=path)
for name in ['pool-serializer.patch','static-evidence.tar.gz','function-match.json','independent-comparisons.json',
             'runtime-input-sha256.json','test-source-sha256.json','test-snapshot.tar.gz','test-environment.json','regression-run.json']:
    shutil.copyfile(SCRATCH/name,DEST/name)
shutil.copytree(SCRATCH/'compiler-provenance',DEST/'compiler-provenance')
shutil.copyfile(WORK/'README-main.md',DEST/'README.md')
shutil.copyfile(WORK/'verify-package.py',DEST/'verify.py')
shutil.copyfile(Path(__file__),DEST/'promotion-package-script.py')
reader=(SCRATCH/'elf_reader.py').read_text()
old="REPO=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())"
assert old in reader
(DEST/'elf_reader_portable.py').write_text(reader.replace(old,"REPO=next((p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file()), Path.cwd())"))
summary=read(SCRATCH/'summary.json')
for suite in summary['suites']:shutil.copyfile(SCRATCH/(suite+'.json.gz'),DEST/(suite+'-differential.json.gz'))
identity={'scope':'Clean main-path build is whole-file identical to the separately built, freshly tested scratch candidate.',
          'main_sha256':expected,'scratch_sha256':sha(SCRATCH/'pump_amm_recovered.so'),'bytes':candidate.stat().st_size,
          'whole_file_equal':True,'source_contents_equal_after_path_mapping':True,
          'main_build_inputs':build['source_sha256'],'scratch_build_inputs':scratch_build['source_sha256'],
          'main_build_attempt_sha256':sha(MAIN/'build-attempt.json'),'scratch_build_attempt_sha256':sha(SCRATCH/'build-attempt.json'),
          'scratch_package_manifest_sha256':scratch_manifest,'scratch_package_files':81,
          'fresh_regression_run_sha256':sha(SCRATCH/'regression-run.json'),'validated_cases':17462,'suite_count':25}
(DEST/'main-scratch-identity.json').write_text(json.dumps(identity,indent=2)+'\n')
summary.update(scope='Main-path AMM37 Pool serializer correction; full original ELF identity remains false.',
               main_source_changed=True,main_source_build_verified=True,main_scratch_whole_file_equal=True,
               runtime_evidence_reused_by_whole_file_identity=True,main_build_attempts=1)
(DEST/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
commands=read(PRIOR/'replay-commands.json')['commands']
for row in commands:
    row['command'][row['command'].index('--candidate')+1]=str((DEST/'pump_amm_recovered.so').relative_to(ROOT))
    row['command'][row['command'].index('--output')+1]='work/amm37-pool-serialization-replay/'+row['suite']+'.json'
(DEST/'replay-commands.json').write_text(json.dumps({'scope':'Existing suite replay commands; actual scratch invocations retained in regression-run.json.','commands':commands},indent=2)+'\n')
status=read(ROOT/'repro/status.json')['pump_amm']; old=str(PRIOR.relative_to(ROOT)); new=str(DEST.relative_to(ROOT))
for key in ['candidate_artifact','comparison_report','build_log','candidate_build_identity_report']:
    assert old in status[key],key
    status[key]=status[key].replace(old,new)
status['validation_reports']=[p.replace(old,new)for p in status['validation_reports']]
status['prior_checkpoint']=old
status['global_config_serialization_report']=new+'/function-match.json'
status['pool_serialization_report']=new+'/function-match.json'
status['pool_serialization_recovery_report']='audit/pump_amm/POOL_SERIALIZATION_RECOVERY.md'
(WORK/'status-entry.json').write_text(json.dumps(status,indent=2)+'\n')
manifest={str(p.relative_to(DEST)):sha(p)for p in sorted(DEST.rglob('*'))if p.is_file()}
(DEST/'manifest-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
result={'changed_owned_paths':['programs/pump-amm/src/state.rs','programs/pump-amm/README.md','audit/pump_amm/POOL_SERIALIZATION_RECOVERY.md',new+'/'],
        'replacement_status':str((WORK/'status-entry.json').relative_to(ROOT)),
        'state_source_sha256':sha(ROOT/'programs/pump-amm/src/state.rs'),'main_candidate_sha256':expected,
        'main_candidate_bytes':candidate.stat().st_size,'main_input_files':18,'test_input_files':36,'runtime_input_files':13,
        'package_files':len(manifest),'manifest_sha256':sha(DEST/'manifest-sha256.json'),
        'validated_cases':17462,'suites':25,'main_scratch_whole_file_equal':True,'main_source_frozen':True}
(WORK/'final-handoff-status.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
