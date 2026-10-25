#!/usr/bin/env python3
"""Check immutable checkpoint evidence and actual current sources/helper provenance."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
CHECKPOINTS = {
    'repro/pump_fees/sharing-authorize-main-v144': ('4049a50a07bfb8a4c51b95776607e86abc3ca1588a8d29f7dfde769a5ed51135', 'helpers', None),
    'repro/pump/admin-cto-error-batch-main-fortyeight': ('4cd1fa3085fd7602d70acbd40e130e33a2232e53771086aff14201b5e7f18890', 'main/build-helpers', 'main/README.final.md'),
    'repro/pump_fees/sharing-fourth-cpi-main-v144': ('b68d33f0d133b1f1283dfa2ce833e2f9c1f398c6c7b16fd177fa91ab74deacfd', 'helpers', None),
    'repro/pump/admin-cto-owned6083-main-fortyeight': ('a994e09c2a8f418fc11f08014542b932333167783224db1f83659fdd62e39e39', 'main/build-helpers', 'main/README.final.md'),
    'repro/pump/admin-cto-owned-main-fortyeight': ('d2e32871cf1a734e05d5e52f30d0b187df97f27061e0d6e1719d2c9f2124778f', 'main/build-helpers', 'main/README.final.md'),
    'repro/pump_amm/init-logical-module-main-v144': ('b420fbb329c8204a130b7bc41fa4db6ac9612f4008836a8961ee95a3ef91cf14', 'main/helpers', 'main/README.final.md'),
    'repro/pump_fees/sharing-second-pump-cpi-main-v144': ('8377e097b9f6d06bf45f3261237f9e6f3513b9ff0f2581c4bc045b4dd91229c3', 'helpers', None),
}
TRANSITION = 'repro/layered-passes/pass-21/build-helper-transition'
TRANSITION_SEAL = 'eb9173e77c85d1b5e55c8556b52e002ad655e5abe3b8a430a13e5a7fe7cb3223'
OLD_HELPER = 'bb683621ffc4297c58f030cb03da54484b7370b786fd8eda965a37f4b3198ee9'
NEW_HELPER = 'e0eccab6f54fee2996039beb53075d9a7b3f411706a90634a44420dec7b173c1'
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
read = lambda p: json.loads(p.read_text())


def verify_manifest(package, expected):
    assert sha(package / 'manifest.json') == expected
    manifest = read(package / 'manifest.json')
    files = manifest.get('files', manifest)
    for name, value in files.items():
        part = Path(name)
        assert not part.is_absolute() and '..' not in part.parts, name
        path = package / part
        assert path.is_file() and not path.is_symlink(), path
        digest = value['sha256'] if isinstance(value, dict) else value
        assert sha(path) == digest, path
    return files


def verify(program, root):
    status = read(root / 'repro/status.json')[program]
    suffix = '/main/candidate.so'
    assert status['candidate_artifact'].endswith(suffix)
    name = status['candidate_artifact'][:-len(suffix)]
    assert name in CHECKPOINTS, ('Checkpoint needs explicit bridge review', name)
    seal, helper_prefix, final_readme = CHECKPOINTS[name]
    package = root / name
    verify_manifest(package, seal)
    scratch_bindings = {
        'repro/pump_fees/sharing-authorize-main-v144': ('repro/pump_fees/sharing-authorize-v144', '52cd978029f67b8c79e738131fa2bec3251de8fdfc2a22270e1464b210125ba7'),
        'repro/pump/admin-cto-error-batch-main-fortyeight': ('repro/pump/admin-cto-error-batch-fortyeight', 'd9d6adc2f5d1533c04999626f93d1aef6a6d0acfb100a11483b4ca777ef62cd6'),
        'repro/pump_fees/sharing-fourth-cpi-main-v144': ('repro/pump_fees/sharing-fourth-cpi-v144', 'e21ebdbc98cf49cb391697ae0b50699814107d292caab68a83c22a3265641fd4'),
    }
    if name in scratch_bindings:
        scratch, scratch_seal = scratch_bindings[name]
        verify_manifest(root / scratch, scratch_seal)
    report = read(root / status['comparison_report'])
    assert root / status['comparison_report'] == package / 'main/build-comparison.json'
    assert report['selected_toolchain'] in ('v1.44', 'v1.52')
    command = report['command']
    assert command[command.index('--tools-version') + 1] == report['selected_toolchain']
    candidate = root / status['candidate_artifact']
    assert sha(candidate) == report['comparison']['candidate_sha256'] == status['candidate_sha256']
    for source, digest in report['source_sha256'].items():
        assert sha(root / source) == digest, source
    if final_readme:
        crate = 'pump' if program == 'pump' else 'pump-amm'
        assert (root / 'programs' / crate / 'README.md').read_bytes() == (package / final_readme).read_bytes()
    controls_prefix = 'controls' if name == 'repro/pump_fees/sharing-authorize-main-v144' else 'main/controls'
    gate = read(package / controls_prefix / 'gate-before.json')
    transitions = []
    for helper, recorded in gate['helpers'].items():
        assert sha(package / helper_prefix / helper) == recorded, helper
        actual = sha(root / helper)
        if actual == recorded:
            continue
        assert helper == 'scripts/build_partial_candidate.py' and (recorded, actual) in ((OLD_HELPER, NEW_HELPER), (NEW_HELPER, OLD_HELPER)), helper
        proof = root / TRANSITION
        verify_manifest(proof, TRANSITION_SEAL)
        assert sha(proof / 'before.py') == OLD_HELPER and sha(proof / 'after.py') == NEW_HELPER
        subprocess.run([sys.executable, '-B', str(proof / 'verify.py')], check=True, capture_output=True)
        transitions.append({'path': helper, 'recorded_sha256': recorded, 'current_sha256': actual, 'proof_seal': TRANSITION_SEAL})
    # Immutable verifier retains its original helper checks and all source/artifact
    # evidence. Current-source and reviewed-helper checks are performed above.
    subprocess.run([sys.executable, '-B', str(package / 'verify.py')], check=True, capture_output=True)
    return {'status': 'PASS', 'program': program, 'candidate_sha256': sha(candidate), 'source_inputs': len(report['source_sha256']),
            'actual_current_sources_checked': True, 'reviewed_helper_transitions': transitions,
            'recorded_toolchain': report['selected_toolchain'], 'target_executions': 0, 'original_global_failure_exits_rewritten': False}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('program', choices=['pump', 'pump_amm', 'pump_fees'])
    parser.add_argument('--repo', type=Path, default=ROOT)
    args = parser.parse_args()
    print(json.dumps(verify(args.program, args.repo.resolve()), indent=2))
