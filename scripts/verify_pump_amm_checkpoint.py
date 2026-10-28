#!/usr/bin/env python3
"""Verify the selected AMM source recipe, saved proof, or its exact fresh replay."""
from pathlib import Path
import argparse
import hashlib
import importlib.util
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
CHECKPOINT = 'repro/pump_amm/v2-mint-clone-recovery-20261028'
ARTIFACT = CHECKPOINT + '/results/build/candidate.so'
CANDIDATE = 'dbb5dcfd1a1487e22d61ae68d22a9b74087b78a868a08ab974c7bdbb127f1500'
MANIFEST = 'fd4ba56a458aca4090376d75a02f26e4a62153834208189fe82aa59931a9bd8d'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


def verify(root=ROOT, runtime=None):
    root = Path(root).resolve()
    selected = json.loads((root / 'repro/status.json').read_text())['pump_amm']
    assert selected['candidate_artifact'] == ARTIFACT
    assert selected['candidate_sha256'] == CANDIDATE
    checkpoint = root / CHECKPOINT
    results = checkpoint / 'results'
    candidate = root / ARTIFACT
    assert sha(candidate) == CANDIDATE and sha(results / 'manifest.json') == MANIFEST
    allocation = selected['loader_allocation_control']
    allocation_root = root / allocation['proof_path']
    assert sha(allocation_root / 'manifest.json') == allocation['manifest_sha256']
    allocation_report = module('current_amm_loader_allocation', allocation_root / 'verify.py').verify(allocation_root)
    assert allocation_report['candidate_sha256'] == CANDIDATE
    assert allocation_report['equal_allocation_control_cases'] == 48
    assert allocation_report['equal_allocation_control_mismatches'] == 0
    upgradeable = selected['upgradeable_loader_control']
    upgradeable_root = root / upgradeable['proof_path']
    assert sha(upgradeable_root / 'manifest.json') == upgradeable['manifest_sha256']
    upgradeable_report = module('current_amm_upgradeable', upgradeable_root / 'verify.py').verify(upgradeable_root)
    assert upgradeable_report['candidate_sha256'] == CANDIDATE
    assert upgradeable_report['policy_cases'] == 24 and upgradeable_report['policy_mismatches'] == 0
    if runtime is None:
        # Capture only stdout: the saved verifier's stderr (its failing
        # assertion) must stay visible in the caller's log.
        result = subprocess.run(
            [sys.executable, '-B', str(checkpoint / 'verify_saved.py'), '--current-source'],
            cwd=root, text=True, stdout=subprocess.PIPE, check=True,
        )
        report = json.loads(result.stdout.strip().splitlines()[-1])
        assert report['current_source_checked'] and report['candidate_sha256'] == CANDIDATE
        return {'status': 'PASS', 'program': 'pump_amm', 'loader_allocation_control': allocation_report, 'upgradeable_loader_control': upgradeable_report, **report}
    entries = json.loads((results / 'manifest.json').read_text())
    assert set(entries) | {'manifest.json'} == {
        str(path.relative_to(results)) for path in results.rglob('*') if path.is_file()
    }
    for name, digest in entries.items():
        assert sha(results / name) == digest, name
    for name in ['verify_source_binding.py', 'workspace_recipe_v3.py']:
        assert sha(checkpoint / name) == sha(results / 'harness' / name)
    sys.path.insert(0, str(checkpoint))
    try:
        binding = module('selected_amm_source', checkpoint / 'verify_source_binding.py')
        bound = binding.verify(results / 'canonical-source', results / 'source',
                               results / 'build/build-comparison.json', candidate,
                               results / 'build/unstripped.so', results / 'dependency-proof', root)
    finally:
        sys.path.pop(0)
    assert bound['total_compiled_inputs_verified'] == 233 and bound['current_source_verified']
    dependencies = module('selected_amm_dependencies', results / 'dependency-proof/verify.py')
    assert dependencies.verify(results / 'canonical-source', results / 'build/build-comparison.json')['packages'] == 9
    runtime = Path(runtime).resolve()
    inputs = json.loads((runtime / 'inputs.json').read_text())
    assert inputs['candidate_sha256'] == CANDIDATE
    for name, digest in inputs['harness_sha256'].items():
        assert sha(root / name) == digest, name
    assert inputs['observer_sha256'] == sha(root / 'repro/pump_amm/owner6048-v144/runtime/observe_suite.py')
    audit = module('selected_amm_audit', checkpoint / 'compare_direct_cached.py')
    report = audit.audit(runtime, CANDIDATE)
    assert report['cases'] == 17462 and not report['mismatches']
    return {'status': 'PASS', 'program': 'pump_amm', 'candidate_sha256': CANDIDATE, 'loader_allocation_control': allocation_report, 'upgradeable_loader_control': upgradeable_report, **report}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, default=ROOT)
    parser.add_argument('--runtime', type=Path)
    args = parser.parse_args()
    print(json.dumps(verify(args.repo, args.runtime), indent=2))
