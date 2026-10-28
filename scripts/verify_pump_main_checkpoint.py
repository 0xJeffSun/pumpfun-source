#!/usr/bin/env python3
"""Verify the selected main-Pump source against its sealed, reproduced checkpoint."""
import argparse
import hashlib
import json
from pathlib import Path
from build_source_manifest import source_manifest
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
PACKAGE = 'repro/pump/main-contract-round47-20261027'
MANIFEST_SHA256 = '6f947fcbb1299a7ba106b814d03d1256f3a89c802a33384291f569980fffc405'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def verify(root):
    root = Path(root).resolve()
    selected = json.loads((root / 'repro/status.json').read_text())['pump']
    final = 'research/pump-final-composition-673-20261028'
    if selected['candidate_artifact'] == final + '/artifacts/candidate.so':
        def require(value, message):
            if not value:
                raise ValueError(message)
        packet = root / final
        cold = root / 'research/pump-final-composition-cold-20261028'
        require(sha(packet / 'MANIFEST.json') == selected['candidate_packet_manifest_sha256'] == '02646818f7a4d79b8c99daaa892a210f83f21e8995082f4082fa8cd9440404e4', 'Pump final composition seal')
        require(sha(cold / 'manifest.json') == selected['checkpoint_manifest_sha256'] == 'df461b8b5fd3ca0be4c842de1e8ab84cbb150a7b5f5fd89de26056d7dd3ea1f1', 'Pump actual empty-target repeat seal')
        # This sealed component explicitly rejects optimized Python. Its child
        # always runs normally, including when this public entry point uses -O.
        result = subprocess.run([sys.executable, '-B', str(packet / 'verify.py'), '--source-directory', str(root / 'programs/pump'), '--signatures'], cwd=root, capture_output=True, text=True, check=True)
        report = json.loads(result.stdout)
        require(report['candidate_sha256'] == selected['candidate_sha256'] == sha(root / selected['candidate_artifact']) == '199fd7379b6881adefd9e54803f75902176c17bded1718bfc1c59b1cf5bc8473', 'Pump final selected executable')
        require(selected['candidate_symbols_artifact'] == final + '/artifacts/unstripped.so' and report['unstripped_sha256'] == selected['symbols_sha256'] == sha(root / selected['candidate_symbols_artifact']) == '49df399b8a36a0a60de03e8d55f1417261dc451e44845ca9d17a94040968c680', 'Pump final selected symbols')
        import gzip
        require(gzip.decompress((packet / 'historical/original.so.gz').read_bytes()) == (root / 'evidence/original/pump/deployed.so').read_bytes(), 'Pump unchanged captured original')
        require(report['source_files'] == selected['canonical_source_inputs'] == 65 and selected['materialized_workspace_inputs'] == 66, 'Pump final compiler source scope')
        require(report['normalized_windows'] == selected['normalized_function_matches'] == 1019 and report['raw_windows'] == selected['raw_function_matches'] == 188, 'Pump final complete window memberships')
        require(report['broad_case_pairs'] == selected['validated_cases'] == 10468 and report['broad_signature_fields'] == selected['verified_transaction_signatures'] == 27875, 'Pump final broad runtime scope')
        require(report['strict_focused_cases'] == selected['focused_runtime_cases'] == 106 and report['strict_focused_transactions'] == selected['focused_runtime_transactions'] == 318 and report['strict_focused_signature_fields'] == selected['focused_runtime_signature_fields'] == 465, 'Pump final strict focused scope')
        require(report['legacy_cases'] == selected['legacy_runtime_cases'] == 284 and report['legacy_signature_fields'] == selected['legacy_runtime_signature_fields'] == 568, 'Pump final strict legacy scope')
        focus = json.loads((packet / 'FOCUSED-VERIFIED.json').read_text())
        require(focus['extension_case_pairs'] == selected['extension_runtime_cases'] == 126 and focus['extension_signature_fields_verified'] == selected['extension_runtime_signature_fields'] == 252, 'Pump final extension scope')
        for key, path in [('source_recipe', final + '/build.py'), ('source_builder', final + '/build.py'), ('source_binding_verifier', final + '/verify.py'), ('comparison_report', 'research/pump-final-composition-cold-20261028/builds/cold-01/build-comparison.json'), ('build_log', 'research/pump-final-composition-cold-20261028/builds/cold-01/build.log'), ('validation_report', final + '/runtime/full44.json.gz')]:
            require(selected[key] == path and (root / path).is_file(), 'Pump final selected ' + key)
        captured_packet = root / 'research/pump-create-captured-successor-20261028'
        require(sha(captured_packet / 'MANIFEST.json') == selected['captured_create_packet_manifest_sha256'] == '34ee132b379303b05c0a49439319e59cd0212a76818a3d9b5fd36baa89b318a1', 'Pump captured creation supplement seal')
        captured = json.loads(subprocess.check_output([sys.executable, '-O', '-B', str(captured_packet / 'verify.py')], cwd=root, text=True))
        require(captured['candidate_sha256'] == report['candidate_sha256'] and captured['cases'] == selected['captured_create_cases'] == 14 and captured['normally_signed_executions'] == captured['captured_pump_loads'] == 42 and captured['signature_fields_verified'] == selected['captured_create_signature_fields'] == 84 and captured['candidate_structured_or_strict_source_differences'] == 0, 'Pump captured creation scope')
        prior = selected['prior_closure_selection']
        require(sha(root / prior['path']) == prior['sha256'], 'Pump prior selection history')
        for gap in selected['historical_behavior_gaps']:
            require(sha(root / gap['report']) == gap['sha256'] and gap['candidate_sha256'] == 'acc5e6eba8c9295386443542847404e55a27d8e837402fb98de8ccffb679125f', 'Pump historical failure evidence')
        require(selected['known_behavior_gaps'] == [] and selected['full_byte_equality'] is False and selected['meaningful_elf_equal'] is False and selected['portable_empty_target_build'] is True, 'Pump final qualification scope')
        return {**report, 'status': 'PASS', 'current_source_verified': True, 'portable_empty_target_build': True, 'independent_builds': 3, 'captured_create': captured, 'known_behavior_gaps': [], 'goal_complete': False}
    successor = 'research/pump-create-used-boundaries-20261028'
    if selected['candidate_artifact'] == successor + '/artifacts/candidate.so':
        def require(value, message):
            if not value:
                raise ValueError(message)
        proof = root / 'research/pump-create-portable-repeat-20261028'
        require(sha(proof / 'manifest.json') == selected['checkpoint_manifest_sha256'] == '1d6870ccdc246852ff39cc17b781a2766e6b45dc5fc8eae7101c6b8975aa2409', 'Pump executed portable proof seal')
        require(sha(root / successor / 'MANIFEST.json') == 'bb76099bd1956b83889c66f7e794ba5c251f46d85a5dfc624c8775dd9b0d89af', 'Pump used-boundary source proof seal')
        result = subprocess.run([sys.executable, '-B', str(proof / 'verify.py'), '--repo', str(root)], cwd=root, capture_output=True, text=True, check=True)
        report = json.loads(result.stdout)
        require(report['candidate_sha256'] == selected['candidate_sha256'] == sha(root / selected['candidate_artifact']), 'Pump selected successor image')
        require(selected['candidate_symbols_artifact'] == successor + '/artifacts/unstripped.so' and report['symbols_sha256'] == selected['symbols_sha256'] == sha(root / selected['candidate_symbols_artifact']), 'Pump selected successor symbols')
        require(report['normalized_windows'] == selected['normalized_function_matches'] == 1019 and report['raw_windows'] == selected['raw_function_matches'] == 188, 'Pump successor membership')
        require(report['runtime_cases'] == selected['validated_cases'] == 10468 and report['focused_cases'] == selected['focused_runtime_cases'] == 75, 'Pump successor runtime scope')
        require(report['runtime_signature_fields'] == selected['verified_transaction_signatures'] == 27875 and report['focused_signature_fields'] == selected['focused_runtime_signature_fields'] == 318, 'Pump successor signature scope')
        require(report['current_source_verified'] and report['portable_empty_target_build'] and selected['full_byte_equality'] is False, 'Pump successor source/build scope')
        for gap in selected.get('known_behavior_gaps', []):
            require(sha(root / gap['report']) == gap['sha256'] and gap['candidate_sha256'] == report['candidate_sha256'], 'Pump known behavior gap binding')
        return {**report, 'known_behavior_gaps': selected.get('known_behavior_gaps', [])}
    current = 'repro/pump/canonical-frontier-20261028'
    if selected['candidate_artifact'] == current + '/candidate.so':
        def require(value, message):
            if not value:
                raise ValueError(message)
        packet = root / current
        seal = '3a4a8541cf82e5c0da0963c81f34e6a1c4de9ec6544d54052194e2020bbe2394'
        require(sha(packet / 'MANIFEST.json') == selected['checkpoint_manifest_sha256'] == seal, 'Pump canonical packet seal')
        # This sealed component explicitly rejects optimized Python. Launch a
        # normal interpreter so its historical assertions remain active.
        result = subprocess.run([sys.executable, '-B', str(packet / 'verify.py'), '--repo', str(root), '--signatures'], cwd=root, capture_output=True, text=True, check=True)
        report = json.loads(result.stdout)
        require(report['candidate_sha256'] == selected['candidate_sha256'] == sha(root / selected['candidate_artifact']), 'Pump selected executable')
        require(selected['candidate_symbols_artifact'] == current + '/unstripped.so', 'Pump selected symbol path')
        require(sha(root / selected['candidate_symbols_artifact']) == selected['symbols_sha256'], 'Pump selected symbols')
        require(report['normalized_windows'] == selected['normalized_function_matches'] == 1019 and report['raw_windows'] == selected['raw_function_matches'] == 188, 'Pump selected window counts')
        require(report['runtime_cases'] == selected['validated_cases'] == 10468 and report['focused_runtime_cases'] == 65, 'Pump selected runtime scope')
        require(report['portable_empty_target_build'] is True and selected['full_byte_equality'] is False, 'Pump reconstruction scope')
        require(report['runtime_transactions'] == selected['runtime_transaction_fields'] == 18343 and report['runtime_signature_fields'] == selected['verified_transaction_signatures'] == 27875, 'Pump retained signature scope')
        require(report['focused_transactions'] == selected['focused_runtime_transactions'] == 195 and report['focused_signature_fields'] == selected['focused_runtime_signature_fields'] == 258, 'Pump focused signature scope')
        for key, relative in [('source_recipe', '/compose.py'), ('source_builder', '/build.py'), ('build_log', '/portable-build/build.log.gz'), ('validation_report', '/runtime/full44.json.gz')]:
            require(selected[key] == current + relative and (root / selected[key]).is_file(), 'Pump selected ' + key)
        return {'status': 'PASS', 'actual_current_sources_checked': True, 'goal_complete': False, **report}
    package = root / PACKAGE
    assert sha(package / 'MANIFEST.json') == MANIFEST_SHA256
    checkpoint = json.loads((package / 'CHECKPOINT.json').read_text())
    status = json.loads((root / 'repro/status.json').read_text())['pump']
    assert status['candidate_artifact'] == PACKAGE + '/candidate.so'
    assert status['candidate_sha256'] == checkpoint['candidate_sha256']
    assert status['symbols_sha256'] == checkpoint['unstripped_sha256']
    assert not status['full_byte_equality'] and not checkpoint['goal_complete']
    for name, expected in checkpoint['primary_source_sha256'].items():
        path = root / 'programs/pump' / name
        assert not path.is_symlink() and sha(path) == expected, name
    compiled_inputs = source_manifest(root / 'programs/pump', root / 'programs/pump', root)
    actual = {str((root / name).relative_to(root / 'programs/pump')) for name in compiled_inputs}
    assert actual == set(checkpoint['primary_source_sha256'])
    subprocess.run([sys.executable, '-B', str(package / 'verify.py')],
                   cwd=root, check=True)
    return {'status': 'PASS', 'program': 'pump',
            'candidate_sha256': checkpoint['candidate_sha256'],
            'source_files': len(actual),
            'normalized_windows': checkpoint['normalized_windows'],
            'original_windows': checkpoint['original_windows'],
            'whole_elf_equal': False, 'goal_complete': False}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, default=ROOT)
    args = parser.parse_args()
    print(json.dumps(verify(args.repo), indent=2))
