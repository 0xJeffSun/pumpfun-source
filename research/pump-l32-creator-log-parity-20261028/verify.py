#!/usr/bin/env python3
"""Verify the L32 creator-diagnostic source, binaries, replay, and evidence."""
from pathlib import Path
import argparse
import gzip
import hashlib
import json
import shutil
import subprocess
import sys
import tempfile

if not __debug__:
    raise RuntimeError('optimized Python disables dependency assertions; refusing verification')

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
ROOT = next(path for path in HERE.parents if (path / 'evidence/original/pump/deployed.so').is_file())
L32 = ROOT / 'research/claude-pump-integration-20261027/r37-layout-32'
sys.path.insert(0, str(HERE))
import parity_checks as checks

PARENT_STRIPPED = '45c5af2485f6d8138b471cbd6b56e0bf59135dcefea15f055d6387b4f1ac0bca'
PARENT_UNSTRIPPED = '868a868be78e576143fdb8bc8c5a3681410e186a11856c62405ed5e217d0bc5c'
CANDIDATE_STRIPPED = '3461cd9b1878083bb3af3d30ec5765de6392072acf38184c96a7ca9c5c857d36'
CANDIDATE_UNSTRIPPED = 'f3aae993141c81277d8a14ac66331dbd59f646bd03d7a371ef201475af19a219'
BASE_SOURCE_SHA = '9c58445db61cc35d79f5fc7d83c3b75e57c7277299f8564b97fca581b0af53ca'
FINAL_SOURCE_SHA = 'e5c456a84fb0ee3b7984e0e697e0ea0f90738b96c021af702b7d6620b6a7460c'
MANIFEST = HERE / 'MANIFEST.json'


def run(path, *arguments):
    result = subprocess.run([sys.executable, str(path), *map(str, arguments)], cwd=ROOT,
                            text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                            check=False)
    checks.require(result.returncode == 0,
                   f'{Path(path).name} failed ({result.returncode}):\n{result.stdout}')
    return result.stdout


def packet_files():
    return {
        str(path.relative_to(HERE)): path
        for path in sorted(HERE.rglob('*'))
        if path.is_file() and path != MANIFEST
    }


def write_manifest():
    checks.require(all(not path.is_symlink() for path in HERE.rglob('*')), 'symlink rejected')
    MANIFEST.write_text(json.dumps({name: checks.sha256(path) for name, path in packet_files().items()},
                                   indent=2, sort_keys=True) + '\n')


def verify_source():
    base = L32 / 'source/programs/pump/src/creator/admin_cto.rs'
    checks.require(checks.sha256(base) == BASE_SOURCE_SHA, 'immutable L32 source changed')
    with tempfile.TemporaryDirectory() as directory:
        root = Path(directory)
        target = root / 'programs/pump/src/creator/admin_cto.rs'
        target.parent.mkdir(parents=True)
        shutil.copy2(base, target)
        applied = subprocess.run(['git', 'apply', str(HERE / 'source.patch')], cwd=root,
                                 text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                                 check=False)
        checks.require(applied.returncode == 0, f'source patch failed: {applied.stdout}')
        checks.require(checks.sha256(target) == FINAL_SOURCE_SHA, 'patched source hash mismatch')
        checks.require(len(target.read_text().splitlines()) == 700, 'source line count changed')


def verify_builds_and_census():
    result = checks.load_json(L32 / 'RESULT.json')
    checks.require(checks.sha256(L32 / 'candidate.so') == result['candidate_sha256'] == PARENT_STRIPPED,
                   'L32 parent stripped mismatch')
    checks.require(checks.sha256(L32 / 'unstripped.so') == result['unstripped_sha256'] == PARENT_UNSTRIPPED,
                   'L32 parent unstripped mismatch')
    matrix = checks.load_json(HERE / 'builds/build-matrix.json')
    for name in ('E-combined-1', 'E-combined-2'):
        folder = HERE / 'builds' / name
        checks.require(checks.sha256(folder / 'candidate.so') == CANDIDATE_STRIPPED,
                       f'{name}: stripped hash mismatch')
        checks.require(checks.sha256(folder / 'unstripped.so') == CANDIDATE_UNSTRIPPED,
                       f'{name}: unstripped hash mismatch')
        record = checks.load_json(folder / 'build-comparison.json')
        checks.require(record['returncode'] == 0 and record['source_unchanged'] and record['workspace_layout'],
                       f'{name}: build qualification flags failed')
        checks.require(record['selected_toolchain'] == 'v1.44', f'{name}: toolchain mismatch')
        checks.require(record['comparison']['candidate_sha256'] == CANDIDATE_STRIPPED and
                       record['unstripped_sha256'] == CANDIDATE_UNSTRIPPED,
                       f'{name}: build record hash mismatch')
        checks.require(record['target_library_profile']['profile_spec_sha256'] ==
                       '7e2461b5ec54416d6b64508af1e2677f63afd83d35e9a3eeae6ca877ae879f1e',
                       f'{name}: target library profile mismatch')
    first = (HERE / 'builds/E-combined-1/candidate.so').read_bytes()
    second = (HERE / 'builds/E-combined-2/candidate.so').read_bytes()
    checks.validate_repeated_build(first, second, CANDIDATE_STRIPPED)
    checks.validate_repeated_build(
        (HERE / 'builds/E-combined-1/unstripped.so').read_bytes(),
        (HERE / 'builds/E-combined-2/unstripped.so').read_bytes(), CANDIDATE_UNSTRIPPED)
    census = checks.load_json(HERE / 'measurement/function-census.json')
    for name, counts in census['configurations'].items():
        checks.require(counts == {'normalized': 990, 'raw': 166, 'total': 1035,
                                  'unmatched': 45, 'matched_text_bytes': 1446072},
                       f'{name}: census mismatch')
        inventory = checks.load_json(HERE / f'measurement/{name}-inventory.json.gz')
        checks.require(inventory['counts'] == {
            'normalized': 990, 'raw': 166, 'total': 1035,
            'unmatched': 45, 'matched_text_bytes': 1446072,
        }, f'{name}: saved inventory mismatch')
    checks.require(not any(census[key] for key in
                           ('normalized_gains', 'normalized_losses', 'raw_gains', 'raw_losses')),
                   'function window gain/loss set changed')
    checks.require(matrix['repeated_final_builds_identical'], 'build matrix reproducibility false')


def verify_runtime():
    original = json.loads(run(HERE / 'analyze_original_cases.py'))
    checks.require(original['case_count'] == 17, 'original affected-case scope mismatch')
    focused = json.loads(run(HERE / 'focused_replay.py'))
    checks.require(focused['combined_restored_notices'] == 17 and
                   focused['combined_remaining_message_order_cases'] == 6 and
                   focused['structured_mismatches'] == 0,
                   'focused replay acceptance failed')
    full = json.loads(run(HERE / 'audit_full_runtime.py'))
    checks.require(full['counts']['pairs'] == 10468 and full['non_filename_log_differences'] == 6 and
                   full['filename_only_log_differences'] == 52 and not full['state_differences'],
                   'full runtime acceptance failed')
    negative = run(HERE / 'test_negative_controls.py')
    checks.require('Ran 20 tests' in negative and negative.rstrip().endswith('OK'),
                   'negative controls did not all pass')
    return original, focused, full


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write-manifest', action='store_true')
    parser.add_argument('--write-summary', action='store_true')
    args = parser.parse_args()
    if args.write_manifest:
        write_manifest()
        return
    if not args.write_summary:
        checks.require(MANIFEST.is_file() and not MANIFEST.is_symlink(), 'manifest missing or symlinked')
        checks.verify_manifest(HERE, json.loads(MANIFEST.read_text()))
    verify_source()
    verify_builds_and_census()
    original, focused, full = verify_runtime()
    summary = {
        'status': 'verified',
        'parent_stripped_sha256': PARENT_STRIPPED,
        'parent_unstripped_sha256': PARENT_UNSTRIPPED,
        'candidate_stripped_sha256': CANDIDATE_STRIPPED,
        'candidate_unstripped_sha256': CANDIDATE_UNSTRIPPED,
        'normalized_matches': 990,
        'raw_matches': 166,
        'affected_original_cases': original['case_count'],
        'focused_paired_case_executions': focused['paired_case_executions'],
        'full_corpus_pairs': full['counts']['pairs'],
        'remaining_non_filename_log_differences': full['non_filename_log_differences'],
        'remaining_filename_only_log_differences': full['filename_only_log_differences'],
        'negative_controls': 20,
    }
    saved = HERE / 'verification-summary.json'
    if args.write_summary:
        saved.write_text(json.dumps(summary, indent=2, sort_keys=True) + '\n')
    else:
        checks.require(saved.is_file() and summary == json.loads(saved.read_text()),
                       'verification summary changed')
    print(json.dumps(summary, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
