"""Package only a clean main build identical to the fully tested scratch executable."""
from pathlib import Path
import gzip
import hashlib
import json
import shutil
import tarfile

W = Path(__file__).resolve().parent
R = W.parents[1]
S = W / 'handoff'
M = W / 'main-build'
D = R / 'repro/pump/quote-control-fortyeight'
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
expected = 'c9c364b59fca69ecc395c1e7911d55fc7997631daa0dd0b0bcf37d7f0dfa4804'
scratch_manifest_hash = json.loads((W / 'handoff-status.json').read_text())['manifest_sha256']
assert sha(S / 'manifest-sha256.json') == scratch_manifest_hash
frozen = json.loads((S / 'manifest-sha256.json').read_text())
for p, digest in frozen.items():
    assert sha(S / p) == digest, p
candidate = M / 'artifacts/pump_recovered.so'
assert candidate.read_bytes() == (S / 'candidate.so').read_bytes()
assert sha(candidate) == expected and candidate.stat().st_size == 1478960
report = json.loads((M / 'build-comparison.json').read_text())
attempt = json.loads((M / 'build-attempt.json').read_text())
scratch = json.loads((S / 'build-comparison.json').read_text())
assert attempt['returncode'] == 0 and attempt['source_unchanged']
assert attempt['source_sha256'] == attempt['source_after_sha256'] == report['source_sha256']
before = {str(Path(p).relative_to('work/pump-quote-control-main42/crate')): h for p, h in scratch['source_sha256'].items()}
after = {str(Path(p).relative_to('programs/pump')): h for p, h in report['source_sha256'].items()}
assert before == after and len(after) == 35
for p, digest in report['source_sha256'].items():
    assert sha(R / p) == digest, p
inputs = json.loads((S / 'inputs-before.json').read_text())
for group in ['harness_sha256', 'repository_fixture_snapshot_sha256', 'orchestration_sha256']:
    for p, digest in inputs[group].items():
        assert sha(R / p) == digest, p
verification = json.loads((S / 'independent-verification.json').read_text())
fresh_runner = 'scripts/pump_quote_control_fresh_differential.py'
assert sha(R / fresh_runner) == verification['maintained_quote_control_runner_sha256']
shutil.copytree(S, D)
replaced = ['README.md', 'summary.json', 'build-attempt.json', 'build-comparison.json',
            'build.log.gz', 'source-snapshot.tar.gz', 'unstripped.so']
(D / 'scratch-build').mkdir()
for name in replaced + ['manifest-sha256.json']:
    shutil.move(D / name, D / 'scratch-build' / name)
bindings = {p: {'path': 'scratch-build/' + p if p in replaced else p, 'sha256': h} for p, h in frozen.items()}
for p, entry in bindings.items():
    assert sha(D / entry['path']) == entry['sha256'], p
(D / 'scratch-package-bindings.json').write_text(json.dumps({
    'scope': 'Every immutable tested scratch-package file is retained through this mapping.',
    'scratch_manifest_sha256': scratch_manifest_hash, 'scratch_files': len(frozen), 'files': bindings}, indent=2) + '\n')
for name in ['build-attempt.json', 'build-comparison.json']:
    shutil.copyfile(M / name, D / name)
(D / 'build.log.gz').write_bytes(gzip.compress((M / 'build.log').read_bytes(), mtime=0))
shutil.copyfile(candidate, D / 'candidate.so')
shutil.copyfile(M / 'target/sbf-solana-solana/release/pump_recovered.so', D / 'unstripped.so')
with tarfile.open(D / 'source-snapshot.tar.gz', 'w:gz') as archive:
    for path in report['source_sha256']:
        archive.add(R / path, arcname=path)
identity = {'scope': 'Clean main and scratch builds are whole-file identical; fresh scratch runtime receipts apply to main by exact executable identity.',
    'main_candidate': str(candidate.relative_to(R)), 'scratch_candidate': str((S / 'candidate.so').relative_to(R)),
    'main_sha256': expected, 'scratch_sha256': sha(S / 'candidate.so'), 'whole_file_equal': True, 'bytes': 1478960,
    'main_build_inputs': report['source_sha256'], 'scratch_build_inputs': scratch['source_sha256'],
    'source_contents_equal_after_path_mapping': True,
    'main_build_attempt_sha256': sha(M / 'build-attempt.json'), 'scratch_build_attempt_sha256': sha(S / 'build-attempt.json'),
    'scratch_package_manifest_sha256': scratch_manifest_hash,
    'differential_cases': 9161, 'differential_suites': 36, 'surfpool_comparisons': 1024,
    'surfpool_runners': 28, 'surfpool_signed_transactions': 2048,
    'surfpool_verified_signatures': verification['surfpool_verified_signatures'],
    'quote_control_executed_transactions': 1014, 'quote_control_verified_signatures': 2008}
(D / 'main-scratch-identity.json').write_text(json.dumps(identity, indent=2) + '\n')
summary = json.loads((S / 'summary.json').read_text())
summary.update(scope='Main Pump48 independent quote-control checkpoint; full original-byte equality remains false.',
    main_source_changed=True, main_scratch_whole_file_equal=True, runtime_evidence_applies_by_whole_file_identity=True)
(D / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
shutil.copyfile(W / 'README-main.md', D / 'README.md')
shutil.copyfile(Path(__file__), D / 'promotion-package-script.py')
shutil.copyfile(W / 'verify-package.py', D / 'verify-package.py')
helpers = dict(inputs['harness_sha256'])
helpers[fresh_runner] = sha(R / fresh_runner)
assert len(helpers) == 87
(D / 'source-harness-sha256.json').write_text(json.dumps({
    'source_sha256': report['source_sha256'], 'harness_sha256': helpers,
    'repository_fixture_snapshot_sha256': inputs['repository_fixture_snapshot_sha256'],
    'full_byte_equality': False}, indent=2) + '\n')
commands = {'scope': 'Replay commands for final candidate. Shared-port Surfpool runners must not overlap.', 'differential': [], 'surfpool': []}
for row in json.loads((S / 'differential/run.json').read_text()):
    cmd = list(row['command'])
    cmd[0] = 'work/test-env/bin/python'
    cmd[1] = str(Path(cmd[1]).relative_to(R))
    cmd[cmd.index('--candidate') + 1] = str((D / 'candidate.so').relative_to(R))
    cmd[cmd.index('--output') + 1] = 'work/pump-quote-control48-replay/differential/' + row['suite'] + '.json.gz'
    commands['differential'].append({'suite': row['suite'], 'family': row['family'], 'command': cmd})
commands['differential'].append({'suite': 'quote_control', 'family': 'quote_control', 'command': [
    'work/test-env/bin/python', fresh_runner, '--candidate', str((D / 'candidate.so').relative_to(R)),
    '--output', 'work/pump-quote-control48-replay/differential/quote_control.json.gz']})
for row in json.loads((S / 'surfpool-run.json').read_text()):
    commands['surfpool'].append({'suite': row['name'], 'family': row['family'], 'port': row['port'], 'command': [
        'work/test-env/bin/python', row['runner'], '--candidate', str((D / 'candidate.so').relative_to(R)),
        '--output', 'work/pump-quote-control48-replay/surfpool/' + row['name']]})
(D / 'replay-commands.json').write_text(json.dumps(commands, indent=2) + '\n')
docs = ['programs/pump/README.md', 'audit/pump/QUOTE_CONTROL_RECOVERY.md']
(D / 'documentation-sha256.json').write_text(json.dumps({p: sha(R / p) for p in docs}, indent=2) + '\n')
status = json.loads((R / 'repro/status.json').read_text())['pump']
old = 'repro/pump/holder-nested-fortytwo'
new = str(D.relative_to(R))
for key in ['candidate_artifact', 'comparison_report', 'build_log']:
    assert old in status[key], (key, status[key])
    status[key] = status[key].replace(old, new)
names = json.loads((R / 'work/pump-quote-control-inventory.json').read_text())['six_draft_handlers']
assert len(status['implemented_handlers']) == 42
for name in names:
    assert name not in status['implemented_handlers']
    status['implemented_handlers'].append(name)
assert len(status['implemented_handlers']) == 48
status['validation_reports'] = [new + '/all-differential.json.gz']
status['validated_cases'] = 9161
status['signed_sequence_reports'] = [new + '/surfpool/' + x['suite'] + '/' + Path(x['receipt']).name + '.gz'
    for x in sorted(verification['surfpool_suites'], key=lambda x: x['suite'])]
status['surfpool_comparisons'] = 1024
status['surfpool_signed_transactions'] = 2048
status['surfpool_verified_signatures'] = verification['surfpool_verified_signatures']
status['candidate_build_identity_report'] = new + '/main-scratch-identity.json'
status['prior_checkpoint'] = old
status['quote_control_recovery_report'] = 'audit/pump/QUOTE_CONTROL_RECOVERY.md'
status['quote_control_focused_cases'] = 507
status['quote_control_executed_transactions'] = 1014
status['quote_control_verified_signatures'] = 2008
assert any('sell_v2' in x and 'transfer-fee' in x for x in status['coverage_limitations'])
for p in status['validation_reports'] + status['signed_sequence_reports']:
    assert (R / p).is_file(), p
(W / 'status-entry.json').write_text(json.dumps(status, indent=2) + '\n')
manifest = {str(p.relative_to(D)): sha(p) for p in sorted(D.rglob('*')) if p.is_file()}
(D / 'manifest-sha256.json').write_text(json.dumps(manifest, indent=2) + '\n')
for p, digest in manifest.items():
    assert sha(D / p) == digest, p
owned = ['programs/pump/src/lib.rs', *['programs/pump/src/quote_control/' + name for name in [
    'initialize_quote_control.rs', 'mod.rs', 'state.rs', 'update_quote_control_mints.rs']], fresh_runner, *docs]
result = {'changed_owned_paths': owned + [new + '/'], 'sha256': {p: sha(R / p) for p in owned},
    'replacement_status': str((W / 'status-entry.json').relative_to(R)),
    'main_candidate_sha256': expected, 'main_candidate_bytes': 1478960, 'main_input_files': 35,
    'harness_input_files': 87, 'runtime_input_files': 27, 'package_files': len(manifest),
    'manifest_sha256': sha(D / 'manifest-sha256.json'), 'differential_cases': 9161, 'differential_suites': 36,
    'surfpool_comparisons': 1024, 'surfpool_runners': 28, 'surfpool_signed_transactions': 2048,
    'surfpool_verified_signatures': verification['surfpool_verified_signatures'],
    'quote_control_executed_transactions': 1014, 'quote_control_verified_signatures': 2008,
    'main_scratch_whole_file_equal': True, 'main_source_frozen': True}
(W / 'final-handoff-status.json').write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps(result, indent=2))
