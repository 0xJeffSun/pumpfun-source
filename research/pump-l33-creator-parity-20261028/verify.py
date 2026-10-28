#!/usr/bin/env python3
"""Verify source composition, builds, census, runtime receipts, and controls."""
from pathlib import Path
import argparse
import gzip
import hashlib
import json
import shutil
import subprocess
import sys
import tempfile

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
ROOT = next(path for path in HERE.parents if (path / 'evidence/original/pump/deployed.so').is_file())
sys.path.insert(0, str(HERE))
import audit_focused  # noqa: E402
import audit_full_runtime  # noqa: E402
import measure  # noqa: E402
from parity_checks import FINAL, L33, STAGE_B, load_json, require, sha256, verify_manifest  # noqa: E402

FINAL_UNSTRIPPED = '377284984eab6852e3f65466475d9c4093a8cd3d919397b2f395d2d5d45976d4'
STAGE_B_UNSTRIPPED = 'b7a3147d6d1f6c2646b4eac736308b0c31c33dd33c616950c15be0a55295cb9c'
L33_UNSTRIPPED = '9392550f34c084425deb45e3e72e4cd38e047da7685cb2ac4a2ba30851f54740'
FINAL_SOURCE = '5ba90070245c9d3c97109ef6adbc379abcd27e615d99bf45f5ed70e7ab6e93a5'
STAGE_B_SOURCE = '5202f373db5e1d6388f0f2635ec6c033f20a26dc5249e5a6e09d8abb56bc99b3'
BASE_SOURCE = '27f0d167bc76b541c5ef2410aa57535b74d9552b26eef1e50cbb9034143313af'


def apply_patches(patches):
    base = ROOT / 'research/claude-pump-integration-20261027/r37-layout-33/source/programs/pump/src/creator/admin_cto.rs'
    require(sha256(base) == BASE_SOURCE, 'L33 parent source changed')
    with tempfile.TemporaryDirectory() as directory:
        temporary = Path(directory)
        target = temporary / 'programs/pump/src/creator/admin_cto.rs'
        target.parent.mkdir(parents=True)
        shutil.copy2(base, target)
        for patch in patches:
            result = subprocess.run(['git', 'apply', str(Path(patch).resolve())], cwd=temporary,
                                    text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
            require(result.returncode == 0, f'patch composition failed: {result.stdout}')
        return target.read_bytes()


def verify_source(patch_path=None):
    diagnostics = ROOT / 'research/pump-l32-creator-log-parity-20261028/source.patch'
    order = ROOT / 'research/pump-l32-admin-cto-log-order-20261028/source.patch'
    require(sha256(diagnostics) ==
            'd00b5b18a8cadd745a20e9a3273991298cf9ccd6fd341e54600c785864045307',
            'diagnostics patch changed')
    require(sha256(order) ==
            '34edb0d6c6e0572cf9d27fef3c956e7b2779a9f1bc0470a084494b47fb5ce9a4',
            'collection-order patch changed')
    stage_b = apply_patches([diagnostics])
    final = apply_patches([diagnostics, order])
    combined = apply_patches([patch_path or HERE / 'source.patch'])
    require(hashlib.sha256(stage_b).hexdigest() == STAGE_B_SOURCE, 'Stage B source mismatch')
    require(hashlib.sha256(final).hexdigest() == FINAL_SOURCE, 'final source composition mismatch')
    require(combined == final, 'combined source.patch is not the two-patch composition')
    require(stage_b.count(b'\n') == final.count(b'\n'), 'source line count changed')
    return {'base': BASE_SOURCE, 'stage_b': STAGE_B_SOURCE, 'final': FINAL_SOURCE,
            'changed_files': ['programs/pump/src/creator/admin_cto.rs']}


def verify_artifact(path, expected, label):
    require(sha256(path) == expected, f'{label}: artifact hash mismatch')


def source_map(record):
    result = {}
    for path, digest in record['primary_source_sha256'].items():
        marker = 'programs/pump/'
        require(marker in path, f'unexpected source key: {path}')
        result[path.split(marker, 1)[1]] = digest
    return result


def verify_builds():
    l33 = ROOT / 'research/claude-pump-integration-20261027/r37-layout-33'
    verify_artifact(l33 / 'candidate.so', L33, 'L33 stripped')
    verify_artifact(l33 / 'unstripped.so', L33_UNSTRIPPED, 'L33 unstripped')
    artifacts = {
        'stage-b': (HERE / 'builds/stage-b', STAGE_B, STAGE_B_UNSTRIPPED, STAGE_B_SOURCE),
        'final-1': (HERE / 'builds/final-1', FINAL, FINAL_UNSTRIPPED, FINAL_SOURCE),
        'final-2': (HERE / 'builds/final-2', FINAL, FINAL_UNSTRIPPED, FINAL_SOURCE),
    }
    records = {'stage-a': load_json(HERE / 'builds/stage-a/build-comparison.json')}
    for name, (directory, stripped, unstripped, _source) in artifacts.items():
        verify_artifact(directory / 'candidate.so', stripped, f'{name} stripped')
        verify_artifact(directory / 'unstripped.so', unstripped, f'{name} unstripped')
        records[name] = load_json(directory / 'build-comparison.json')
    expected = {
        'stage-a': (L33, L33_UNSTRIPPED, BASE_SOURCE),
        'stage-b': (STAGE_B, STAGE_B_UNSTRIPPED, STAGE_B_SOURCE),
        'final-1': (FINAL, FINAL_UNSTRIPPED, FINAL_SOURCE),
        'final-2': (FINAL, FINAL_UNSTRIPPED, FINAL_SOURCE),
    }
    warning_counts = {}
    source_maps = {}
    for name, record in records.items():
        stripped, unstripped, source_digest = expected[name]
        require(record.get('returncode') == 0 and record.get('source_unchanged') is True,
                f'{name}: unsuccessful or source-mutating build')
        require(record.get('target_libraries_unchanged') is True, f'{name}: target libraries changed')
        require(record.get('selected_toolchain') == 'v1.44' and record.get('target') == 'sbpf-solana-solana',
                f'{name}: wrong toolchain')
        profile = record.get('target_library_profile', {})
        require(profile.get('name') == 'linux-v1.44-sbpf', f'{name}: wrong target profile')
        require(profile.get('profile_spec_sha256') ==
                '7e2461b5ec54416d6b64508af1e2677f63afd83d35e9a3eeae6ca877ae879f1e',
                f'{name}: profile spec changed')
        require(profile.get('file_manifest_sha256') ==
                'a769d7293191d15f5610521fa86ac83dc267be964130369cff116f9ea933cbe8',
                f'{name}: target library manifest changed')
        require(record['comparison']['candidate_sha256'] == stripped and
                record['unstripped_sha256'] == unstripped, f'{name}: build receipt hash mismatch')
        smap = source_map(record)
        require(smap.get('src/creator/admin_cto.rs') == source_digest,
                f'{name}: compiled admin_cto source mismatch')
        source_maps[name] = smap
        log = gzip.decompress((HERE / f'builds/{name}/build.log.gz').read_bytes())
        require(hashlib.sha256(log).hexdigest() == record['build_log_sha256'],
                f'{name}: build log mismatch')
        text = log.decode(errors='replace')
        require('stack offset' not in text.lower(), f'{name}: stack-offset warning introduced')
        warning_counts[name] = sum('warning:' in line for line in text.splitlines())
    base = source_maps['stage-a']
    for name, smap in source_maps.items():
        require(set(smap) == set(base), f'{name}: compiled source inventory changed')
        differences = [path for path in base if base[path] != smap[path]]
        expected_difference = [] if name == 'stage-a' else ['src/creator/admin_cto.rs']
        require(differences == expected_difference, f'{name}: unrelated compiled source changed')
    require(len(set(warning_counts.values())) == 1, f'compiler warning count changed: {warning_counts}')
    require((HERE / 'builds/final-1/candidate.so').read_bytes() ==
            (HERE / 'builds/final-2/candidate.so').read_bytes(), 'repeated stripped builds differ')
    require((HERE / 'builds/final-1/unstripped.so').read_bytes() ==
            (HERE / 'builds/final-2/unstripped.so').read_bytes(), 'repeated unstripped builds differ')
    return {'hashes': {name: {'stripped': values[0], 'unstripped': values[1]}
                       for name, values in expected.items()},
            'warning_counts': warning_counts, 'stack_offset_warnings': 0,
            'repeated_final_builds_identical': True}


def run_negative_controls():
    result = subprocess.run(
        [sys.executable, str(HERE / 'test_negative_controls.py')], cwd=ROOT,
        text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    require(result.returncode == 0, result.stdout)
    require('Ran 15 tests' in result.stdout and result.stdout.rstrip().endswith('OK'),
            f'negative controls did not complete: {result.stdout}')
    return 15


def files_for_manifest():
    return {
        str(path.relative_to(HERE)): sha256(path)
        for path in sorted(HERE.rglob('*'))
        if path.is_file() and path.name != 'MANIFEST.json' and '__pycache__' not in path.parts
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write-manifest', action='store_true')
    args = parser.parse_args()
    manifest = HERE / 'MANIFEST.json'
    if args.write_manifest:
        require(all(not path.is_symlink() for path in HERE.rglob('*')), 'packet symlink rejected')
        manifest.write_text(json.dumps(files_for_manifest(), indent=2, sort_keys=True) + '\n')
        return
    verify_manifest(HERE, manifest)
    provenance = load_json(HERE / 'provenance.json')
    require(provenance['upstream_parent_sha'] == '3719d910d297ad62497e2ef1b12e263d2059f2ae',
            'parent provenance changed')
    baseline = load_json(ROOT / 'research/claude-pump-integration-20261027/r37-layout-33/runtime-review/L33-RUNTIME-REVIEW.json')
    require(baseline['ordered_main_log_difference_families'] == {
        'source_file_path_only': 27,
        'missing_creator_non_system_notice': 5,
        'missing_canonical_pool_notice': 3,
        'ordinary_message_order': 6,
        'missing_creator_quote_frozen_notice': 9,
    } and baseline['non_filename_log_differences'] == 23 and not baseline['state_differences'],
            'retained L33 baseline changed')
    source = verify_source()
    builds = verify_builds()
    census = measure.run()
    focused = audit_focused.analyze()
    full = audit_full_runtime.analyze()
    require(load_json(HERE / 'runtime/focused-summary.json') == focused,
            'focused summary is not derived from receipts')
    compact = dict(full)
    differences = compact.pop('remaining_differences')
    require(load_json(HERE / 'runtime/full-summary.json') == compact,
            'full summary is not derived from receipts')
    require(load_json(HERE / 'runtime/ordered-log-mismatches.json.gz') == differences,
            'ordered-log classification is not derived from receipts')
    negatives = run_negative_controls()
    print(json.dumps({
        'status': 'verified', 'source': source, 'builds': builds, 'census': census,
        'focused': focused, 'full': compact, 'negative_controls': negatives,
    }, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
