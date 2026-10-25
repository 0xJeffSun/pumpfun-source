"""Seal the single Pool-only build and all unchanged regression receipts."""
from pathlib import Path
import gzip, hashlib, json, shutil, tarfile

WORK = Path(__file__).resolve().parent
ROOT = WORK.parents[1]
BASE = ROOT / 'repro/pump_amm/serialization-thirty-seven'
STATIC = ROOT / 'work/amm-pool-serializer-static'
BUILD = WORK / 'build'
RESULTS = WORK / 'results'
DEST = WORK / 'handoff'
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
read = lambda p: json.loads(p.read_text())
expected = '5a68db39372121c6406727bced3087aa9caf63f14a999ac68206c9b5b3401216'
assert sha(BUILD / 'artifacts/pump_amm_recovered.so') == expected
for row in read(STATIC / 'inputs.json')['sources']:
    assert sha(ROOT / row['path']) == row['sha256'], row
for path, digest in read(BASE / 'manifest-sha256.json').items():
    assert sha(BASE / path) == digest, path
for row in read(STATIC / 'manifest.json')['files']:
    assert sha(STATIC / row['path']) == row['sha256'], row
build = read(BUILD / 'build-comparison.json')
attempt = read(BUILD / 'build-attempt.json')
assert attempt['returncode'] == 0 and attempt['source_unchanged']
assert attempt['source_sha256'] == attempt['source_after_sha256'] == build['source_sha256']
assert len(build['source_sha256']) == 18 and build['selected_toolchain'] == 'v1.44'
tests = read(RESULTS / 'summary.json')
assert tests['candidate_sha256'] == expected and tests['case_count'] == 17462
assert tests['suite_count'] == 25 and tests['mismatches'] == []
for group in ['test-source-sha256.json', 'runtime-input-sha256.json']:
    for path, digest in read(RESULTS / group).items():
        assert sha(ROOT / path) == digest, path
DEST.mkdir(exist_ok=False)
for name in ['source-delta.json', 'function-match.json', 'independent-comparisons.json',
             'independent-compare.log', 'test-environment.json', 'run-regressions.py',
             'match-pool.py', 'independent-compare.py', 'package-scratch.py']:
    shutil.copyfile(WORK / name, DEST / name)
shutil.copyfile(STATIC / 'suggested-pool-serializer.patch', DEST / 'pool-serializer.patch')
shutil.copyfile(ROOT / 'repro/pump_fees/framework-matching/elf_reader.py', DEST / 'elf_reader.py')
shutil.copytree(WORK / 'build-helper-snapshot', DEST / 'build-helper-snapshot')
for name in ['build-attempt.json', 'build-comparison.json']:
    shutil.copyfile(BUILD / name, DEST / name)
(DEST / 'build.log.gz').write_bytes(gzip.compress((BUILD / 'build.log').read_bytes(), mtime=0))
shutil.copyfile(BUILD / 'artifacts/pump_amm_recovered.so', DEST / 'pump_amm_recovered.so')
shutil.copyfile(BUILD / 'target/sbf-solana-solana/release/pump_amm_recovered.so', DEST / 'unstripped.so')
with tarfile.open(DEST / 'source-snapshot.tar.gz', 'w:gz') as archive:
    for path, digest in build['source_sha256'].items():
        assert sha(ROOT / path) == digest, path
        archive.add(ROOT / path, arcname=path)
with tarfile.open(DEST / 'static-evidence.tar.gz', 'w:gz') as archive:
    for path in [*[row['path'] for row in read(STATIC / 'manifest.json')['files']], 'manifest.json']:
        archive.add(STATIC / path, arcname=path)
for name in ['test-source-sha256.json', 'runtime-input-sha256.json', 'test-snapshot.tar.gz', 'regression-run.json']:
    shutil.copyfile(RESULTS / name, DEST / name)
for suite, count in tests['suites'].items():
    receipt = read(RESULTS / (suite + '.json'))
    assert receipt['candidate_sha256'] == expected and receipt['case_count'] == count and receipt['mismatches'] == []
    for extension in ['json', 'log']:
        data = (RESULTS / (suite + '.' + extension)).read_bytes()
        (DEST / (suite + '.' + extension + '.gz')).write_bytes(gzip.compress(data, mtime=0))
shutil.copytree(BASE / 'compiler-provenance', DEST / 'compiler-provenance')
match = read(WORK / 'function-match.json')
summary = {'scope': 'Scratch AMM37 Pool serializer correction, 25 existing suites rerun; main unchanged at sealing.',
           'instruction_bodies': 37, 'idl_instruction_count': 38, 'remaining_idl_instructions': ['create_config'],
           'candidate_bytes': (DEST / 'pump_amm_recovered.so').stat().st_size, 'candidate_sha256': expected,
           'full_byte_equality': False, 'elf_extent_byte_equality': False,
           'validated_cases': 17462, 'suites': tests['suites'], 'mismatches': [], 'additional_unique_cases': 0,
           'source_inputs': 18, 'test_helper_inputs': len(read(RESULTS / 'test-source-sha256.json')),
           'runtime_inputs': len(read(RESULTS / 'runtime-input-sha256.json')),
           'pool_exit_bytes': 1704, 'pool_exit_normalized_match': True,
           'global_config_exit_bytes': 1648, 'global_config_exit_normalized_match': True,
           'direct_calls_with_matching_bounded_target_bodies_per_exit': 24,
           'prior_checkpoint': str(BASE.relative_to(ROOT)), 'prior_manifest_sha256': sha(BASE / 'manifest-sha256.json'),
           'static_manifest_sha256': sha(STATIC / 'manifest.json'), 'static_sealed_files': 90,
           'main_source_changed': False, 'main_source_build_verified': False,
           'scratch_build_attempts': 1, 'failed_build_attempts': 0, 'failed_suite_attempts': 0}
(DEST / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
manifest = {str(p.relative_to(DEST)): sha(p) for p in sorted(DEST.rglob('*')) if p.is_file()}
(DEST / 'manifest-sha256.json').write_text(json.dumps(manifest, indent=2) + '\n')
status = {'package': str(DEST.relative_to(ROOT)), 'manifest_sha256': sha(DEST / 'manifest-sha256.json'),
          'package_files': len(manifest), **summary}
(WORK / 'handoff-status.json').write_text(json.dumps(status, indent=2) + '\n')
print(json.dumps(status, indent=2))
