#!/usr/bin/env python3
"""Verify the independent L32 follow-up packet from a fresh checkout."""
from pathlib import Path
import argparse
import hashlib
import json
import subprocess
import sys

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
ROOT = next(path for path in HERE.parents if (path / 'evidence/original/pump/deployed.so').is_file())
L32 = ROOT / 'research/claude-pump-integration-20261027/r37-layout-32'
MANIFEST = HERE / 'MANIFEST.json'
EXPECTED_STRIPPED = '45c5af2485f6d8138b471cbd6b56e0bf59135dcefea15f055d6387b4f1ac0bca'
EXPECTED_UNSTRIPPED = '868a868be78e576143fdb8bc8c5a3681410e186a11856c62405ed5e217d0bc5c'


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def files():
    return {
        str(path.relative_to(HERE)): path
        for path in sorted(HERE.rglob('*'))
        if path.is_file() and path != MANIFEST
    }


def write_manifest():
    require(all(not path.is_symlink() for path in HERE.rglob('*')), 'symlink rejected')
    MANIFEST.write_text(json.dumps({name: sha(path) for name, path in files().items()},
                                   indent=2, sort_keys=True) + '\n')


def verify_manifest():
    require(MANIFEST.is_file() and not MANIFEST.is_symlink(), 'manifest missing or symlinked')
    manifest = json.loads(MANIFEST.read_text())
    actual = files()
    require(set(actual) == set(manifest), f'unexpected files: {sorted(set(actual) ^ set(manifest))}')
    require(all(not path.is_symlink() for path in HERE.rglob('*')), 'symlink rejected')
    for name, expected in manifest.items():
        require(sha(actual[name]) == expected, f'manifest digest mismatch: {name}')


def run(*arguments, cwd=None, expect=0):
    result = subprocess.run(
        [sys.executable, *map(str, arguments)],
        cwd=cwd,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        check=False,
    )
    require(result.returncode == expect,
            f"command returned {result.returncode}, expected {expect}: {' '.join(map(str, arguments))}\n{result.stdout}")
    return result.stdout


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write-manifest', action='store_true')
    args = parser.parse_args()
    if args.write_manifest:
        write_manifest()
    verify_manifest()

    result = json.loads((L32 / 'RESULT.json').read_text())
    require(result['candidate_sha256'] == EXPECTED_STRIPPED, 'L32 stripped hash record mismatch')
    require(result['unstripped_sha256'] == EXPECTED_UNSTRIPPED, 'L32 unstripped hash record mismatch')
    require(sha(L32 / 'candidate.so') == EXPECTED_STRIPPED, 'L32 stripped artifact mismatch')
    require(sha(L32 / 'unstripped.so') == EXPECTED_UNSTRIPPED, 'L32 unstripped artifact mismatch')
    require(result['counts']['normalized'] == 990 and result['counts']['raw'] == 166,
            'L32 function census mismatch')

    staged = json.loads((HERE / 'staged-artifacts.json').read_text())['configurations']
    require(staged['D-combined']['stripped_sha256'] == EXPECTED_STRIPPED,
            'staged combined hash does not bind L32')
    require(staged['D-combined']['unstripped_sha256'] == EXPECTED_UNSTRIPPED,
            'staged combined unstripped hash does not bind L32')

    focused = json.loads(run(HERE / 'focused_replay.py'))
    require(focused['paired_case_executions'] == 3148, 'focused replay scope mismatch')
    require(focused['distinct_signed_transactions_verified'] == 150,
            'focused signed transaction count mismatch')
    require(focused['combined_corrected_notices'] == 115 and focused['structured_mismatches'] == 0,
            'focused replay result mismatch')

    accounting = json.loads(run(HERE / 'transaction_accounting.py'))
    require(accounting['direct_case_transactions_identical_between_l31_and_l32'],
            'L31/L32 direct transactions differ')
    require(accounting['L32']['direct_case_outcome_fields']['distinct'] == 2407,
            'direct transaction scope mismatch')
    require(accounting['L32']['all_transactions_inside_outcomes']['distinct'] == 2409,
            'outcome transaction scope mismatch')

    retained = json.loads(run(L32 / 'runtime-review/retained_vs_fresh.py', cwd=ROOT))
    require(retained['pairs'] == 10468 and retained['candidate_insert_only'] == 115,
            'retained-versus-fresh scope mismatch')
    require(retained['unexpected_count'] == 0, 'unexpected retained-versus-fresh differences')

    audit = json.loads(run(L32 / 'runtime-review/audit_saved_runtime.py', cwd=ROOT))
    require(audit['counts']['pairs'] == 10468 and not audit['state_differences'],
            'saved runtime audit mismatch')
    require(audit['non_filename_log_differences'] == 23,
            'ordered log difference count mismatch')

    verifier_output = run(L32 / 'verify.py')
    require('verified' in verifier_output.lower(), 'L32 verifier did not report success')
    optimized = subprocess.run(
        [sys.executable, '-O', str(L32 / 'verify.py')],
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        check=False,
    )
    require(optimized.returncode != 0 and 'optimized Python disables' in optimized.stdout,
            'L32 verifier did not reject optimized Python')

    normal_accounting = run(HERE / 'transaction_accounting.py')
    optimized_accounting = run('-O', HERE / 'transaction_accounting.py')
    require(normal_accounting == optimized_accounting, 'optimized accounting result differs')

    print(json.dumps({
        'status': 'verified',
        'l32_stripped_sha256': EXPECTED_STRIPPED,
        'l32_unstripped_sha256': EXPECTED_UNSTRIPPED,
        'normalized_matches': 990,
        'raw_matches': 166,
        'focused_paired_executions': 3148,
        'focused_distinct_signed_transactions': 150,
        'full_corpus_pairs_reaudited': 10468,
        'direct_distinct_transactions': 2407,
        'all_outcome_distinct_transactions': 2409,
        'remaining_non_filename_log_differences': 23,
        'optimized_main_verifier_rejected': True,
    }, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
