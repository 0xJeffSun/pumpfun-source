"""Freeze the verified main-path AMM serializer checkpoint without central edits."""
from pathlib import Path
import gzip
import hashlib
import json
import shutil
import tarfile

WORK = Path(__file__).resolve().parent
ROOT = WORK.parents[1]
SCRATCH = WORK / 'handoff'
MAIN = WORK / 'main-build'
DEST = ROOT / 'repro/pump_amm/serialization-thirty-seven'
PRIOR = ROOT / 'repro/pump_amm/multi-hop-thirty-seven'
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
scratch_manifest_hash = '0daac9774836925e6dce12ba0324ea0bc6f4558fb5c545dc56614e658303cd9f'
assert sha(SCRATCH / 'manifest-sha256.json') == scratch_manifest_hash
for path, digest in json.loads((SCRATCH / 'manifest-sha256.json').read_text()).items():
    assert sha(SCRATCH / path) == digest, path
candidate = MAIN / 'artifacts/pump_amm_recovered.so'
scratch_candidate = SCRATCH / 'pump_amm_recovered.so'
assert candidate.read_bytes() == scratch_candidate.read_bytes(), 'Main build differs; do not reuse scratch runtime receipts'
expected = sha(candidate)
report = json.loads((MAIN / 'build-comparison.json').read_text())
attempt = json.loads((MAIN / 'build-attempt.json').read_text())
scratch_report = json.loads((SCRATCH / 'build-comparison.json').read_text())
assert attempt['returncode'] == 0 and attempt['source_unchanged']
assert attempt['source_sha256'] == attempt['source_after_sha256'] == report['source_sha256']
assert len(report['source_sha256']) == 18
scratch_inputs = {str(Path(path).relative_to('work/pump-amm-serializer-only/crate')): digest for path, digest in scratch_report['source_sha256'].items()}
main_inputs = {str(Path(path).relative_to('programs/pump-amm')): digest for path, digest in report['source_sha256'].items()}
assert main_inputs == scratch_inputs
for path, digest in report['source_sha256'].items():
    assert sha(ROOT / path) == digest, path
for name in ['test-source-sha256.json', 'runtime-input-sha256.json']:
    for path, digest in json.loads((SCRATCH / name).read_text()).items():
        assert sha(ROOT / path) == digest, path
DEST.mkdir(exist_ok=False)
shutil.copytree(SCRATCH, DEST / 'scratch-build')
for name in ['build-attempt.json', 'build-comparison.json']:
    shutil.copyfile(MAIN / name, DEST / name)
(DEST / 'build.log.gz').write_bytes(gzip.compress((MAIN / 'build.log').read_bytes(), mtime=0))
shutil.copyfile(candidate, DEST / 'pump_amm_recovered.so')
shutil.copyfile(MAIN / 'target/sbf-solana-solana/release/pump_amm_recovered.so', DEST / 'unstripped.so')
with tarfile.open(DEST / 'source-snapshot.tar.gz', 'w:gz') as archive:
    for path in report['source_sha256']:
        archive.add(ROOT / path, arcname=path)
for name in ['global-config-serializer.patch', 'function-match.json', 'independent-comparisons.json',
             'runtime-input-sha256.json', 'test-source-sha256.json', 'test-snapshot.tar.gz',
             'test-environment.json', 'regression-run.json']:
    shutil.copyfile(SCRATCH / name, DEST / name)
shutil.copytree(SCRATCH / 'compiler-provenance', DEST / 'compiler-provenance')
shutil.copyfile(WORK / 'README-main.md', DEST / 'README.md')
shutil.copyfile(Path(__file__), DEST / 'promotion-package-script.py')
summary = json.loads((SCRATCH / 'summary.json').read_text())
for suite, count in summary['suites'].items():
    src = SCRATCH / (suite + '.json.gz')
    receipt = json.loads(gzip.decompress(src.read_bytes()))
    assert receipt['candidate_sha256'] == expected and receipt['case_count'] == count and not receipt['mismatches']
    shutil.copyfile(src, DEST / (suite + '-differential.json.gz'))
identity = {'scope': 'Clean main-path build is whole-file identical to the separately built scratch candidate. All25 suites freshly executed against scratch; their exact receipts apply to main by full executable identity. No additional unique cases are claimed.',
            'main_candidate': str(candidate.relative_to(ROOT)),
            'scratch_candidate': str(scratch_candidate.relative_to(ROOT)),
            'main_sha256': expected, 'scratch_sha256': sha(scratch_candidate),
            'whole_file_equal': True, 'bytes': candidate.stat().st_size,
            'main_build_inputs': report['source_sha256'],
            'scratch_build_inputs': scratch_report['source_sha256'],
            'source_contents_equal_after_path_mapping': True,
            'validated_cases': 17462, 'suite_count': 25,
            'main_build_attempt_sha256': sha(MAIN / 'build-attempt.json'),
            'scratch_build_attempt_sha256': sha(SCRATCH / 'build-attempt.json'),
            'scratch_package_manifest_sha256': scratch_manifest_hash,
            'scratch_package_files': 80,
            'fresh_regression_run_sha256': sha(SCRATCH / 'regression-run.json')}
(DEST / 'main-scratch-identity.json').write_text(json.dumps(identity, indent=2) + '\n')
summary.update(scope='Main-path AMM37 GlobalConfig serializer correction; full original ELF identity remains false.',
               main_source_changed=True, main_source_build_verified=True,
               main_scratch_whole_file_equal=True, runtime_evidence_reused_by_whole_file_identity=True)
(DEST / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
commands = json.loads((PRIOR / 'replay-commands.json').read_text())['commands']
for row in commands:
    row['command'][row['command'].index('--candidate') + 1] = str((DEST / 'pump_amm_recovered.so').relative_to(ROOT))
    row['command'][row['command'].index('--output') + 1] = 'work/amm37-serialization-replay/' + row['suite'] + '.json'
(DEST / 'replay-commands.json').write_text(json.dumps({'scope': 'Reproduction commands targeting this final candidate; actual executed scratch commands are preserved in regression-run.json.', 'commands': commands}, indent=2) + '\n')
status = json.loads((ROOT / 'repro/status.json').read_text())['pump_amm']
old = str(PRIOR.relative_to(ROOT)); new = str(DEST.relative_to(ROOT))
for key in ['candidate_artifact', 'comparison_report', 'build_log', 'candidate_build_identity_report']:
    assert old in status[key], key
    status[key] = status[key].replace(old, new)
status['validation_reports'] = [path.replace(old, new) for path in status['validation_reports']]
status['prior_checkpoint'] = old
status['global_config_serialization_report'] = new + '/function-match.json'
(WORK / 'status-entry.json').write_text(json.dumps(status, indent=2) + '\n')
manifest = {str(path.relative_to(DEST)): sha(path) for path in sorted(DEST.rglob('*')) if path.is_file()}
(DEST / 'manifest-sha256.json').write_text(json.dumps(manifest, indent=2) + '\n')
for path, digest in manifest.items():
    assert sha(DEST / path) == digest, path
result = {'changed_owned_paths': ['programs/pump-amm/src/state.rs', new + '/'],
          'state_source_sha256': sha(ROOT / 'programs/pump-amm/src/state.rs'),
          'replacement_status': str((WORK / 'status-entry.json').relative_to(ROOT)),
          'main_candidate_sha256': expected, 'main_candidate_bytes': candidate.stat().st_size,
          'main_input_files': len(report['source_sha256']),
          'test_input_files': len(json.loads((DEST / 'test-source-sha256.json').read_text())),
          'runtime_input_files': len(json.loads((DEST / 'runtime-input-sha256.json').read_text())),
          'package_files': len(manifest), 'manifest_sha256': sha(DEST / 'manifest-sha256.json'),
          'validated_cases': 17462, 'suites': 25, 'main_scratch_whole_file_equal': True,
          'main_source_frozen': True}
(WORK / 'final-handoff-status.json').write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps(result, indent=2))
