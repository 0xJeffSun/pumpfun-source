"""Freeze the exact serializer-only build and complete fresh regressions."""
from pathlib import Path
import gzip
import hashlib
import json
import shutil
import tarfile

WORK = Path(__file__).resolve().parent
ROOT = WORK.parents[1]
BASE = ROOT / 'repro/pump_amm/multi-hop-thirty-seven'
BUILD = WORK / 'build'
RESULTS = WORK / 'results'
DEST = WORK / 'handoff'
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
candidate = BUILD / 'artifacts/pump_amm_recovered.so'
expected = 'b656628b9f43c1b18edecbe58f8275be3829c52604a1926f540dcdb64eb8f257'
assert sha(candidate) == expected
before = json.loads((WORK / 'main-before-sha256.json').read_text())
for path, digest in before.items():
    assert sha(ROOT / path) == digest, path
prior_manifest = json.loads((BASE / 'manifest-sha256.json').read_text())
for path, digest in prior_manifest.items():
    assert sha(BASE / path) == digest, path
build = json.loads((BUILD / 'build-comparison.json').read_text())
attempt = json.loads((BUILD / 'build-attempt.json').read_text())
assert attempt['returncode'] == 0 and attempt['source_unchanged']
assert attempt['source_sha256'] == attempt['source_after_sha256'] == build['source_sha256']
assert len(build['source_sha256']) == 18
tests = json.loads((RESULTS / 'summary.json').read_text())
assert tests['candidate_sha256'] == expected and tests['case_count'] == 17462 and tests['suite_count'] == 25 and not tests['mismatches']
for group in ['test-source-sha256.json', 'runtime-input-sha256.json']:
    for path, digest in json.loads((RESULTS / group).read_text()).items():
        assert sha(ROOT / path) == digest, path
DEST.mkdir(exist_ok=False)
for name in ['README.md', 'global-config-serializer.patch', 'source-delta.json',
             'main-before-sha256.json', 'function-match.json', 'function-match.log',
             'independent-comparisons.json', 'independent-compare.log',
             'test-environment.json', 'run-regressions.py', 'match-serializer.py',
             'elf_analysis.py', 'independent-compare.py', 'package.py']:
    shutil.copyfile(WORK / name, DEST / name)
for name in ['build-attempt.json', 'build-comparison.json']:
    shutil.copyfile(BUILD / name, DEST / name)
(DEST / 'build.log.gz').write_bytes(gzip.compress((BUILD / 'build.log').read_bytes(), mtime=0))
shutil.copyfile(candidate, DEST / 'pump_amm_recovered.so')
shutil.copyfile(BUILD / 'target/sbf-solana-solana/release/pump_amm_recovered.so', DEST / 'unstripped.so')
with tarfile.open(DEST / 'source-snapshot.tar.gz', 'w:gz') as archive:
    for path, digest in build['source_sha256'].items():
        assert sha(ROOT / path) == digest, path
        archive.add(ROOT / path, arcname=path)
for name in ['test-source-sha256.json', 'runtime-input-sha256.json', 'test-snapshot.tar.gz', 'regression-run.json']:
    shutil.copyfile(RESULTS / name, DEST / name)
for suite, count in tests['suites'].items():
    receipt = RESULTS / (suite + '.json')
    report = json.loads(receipt.read_text())
    assert report['candidate_sha256'] == expected and report['case_count'] == count and not report['mismatches']
    for extension in ['json', 'log']:
        path = RESULTS / (suite + '.' + extension)
        (DEST / (suite + '.' + extension + '.gz')).write_bytes(gzip.compress(path.read_bytes(), mtime=0))
shutil.copytree(BASE / 'compiler-provenance', DEST / 'compiler-provenance')
match = json.loads((WORK / 'function-match.json').read_text())
assert match['all_direct_targets_have_matching_full_bodies']
summary = {'scope': 'Scratch AMM37 serializer-only source correction, all prior suites rerun; main unchanged pending root integration.',
           'instruction_bodies': 37, 'idl_instruction_count': 38, 'remaining_idl_instructions': ['create_config'],
           'candidate_bytes': candidate.stat().st_size, 'candidate_sha256': expected,
           'full_byte_equality': False, 'elf_extent_byte_equality': False,
           'validated_cases': tests['case_count'], 'suites': tests['suites'], 'mismatches': [],
           'additional_unique_cases': 0, 'source_inputs': len(build['source_sha256']),
           'test_helper_inputs': len(json.loads((RESULTS / 'test-source-sha256.json').read_text())),
           'runtime_inputs': len(json.loads((RESULTS / 'runtime-input-sha256.json').read_text())),
           'global_config_exit_bytes': match['selected_function']['bytes'],
           'global_config_exit_normalized_match': True,
           'direct_calls_with_matching_bounded_target_bodies': len(match['direct_target_checks']),
           'prior_checkpoint': str(BASE.relative_to(ROOT)), 'prior_manifest_sha256': sha(BASE / 'manifest-sha256.json'),
           'main_source_changed': False, 'main_source_build_verified': False}
(DEST / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
manifest = {str(p.relative_to(DEST)): sha(p) for p in sorted(DEST.rglob('*')) if p.is_file()}
(DEST / 'manifest-sha256.json').write_text(json.dumps(manifest, indent=2) + '\n')
for path, digest in manifest.items():
    assert sha(DEST / path) == digest, path
status = {'package': str(DEST.relative_to(ROOT)), 'manifest_sha256': sha(DEST / 'manifest-sha256.json'),
          'package_files': len(manifest), **summary}
(WORK / 'handoff-status.json').write_text(json.dumps(status, indent=2) + '\n')
print(json.dumps(status, indent=2))
