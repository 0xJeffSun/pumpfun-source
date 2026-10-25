"""Freeze all new-candidate validation before authorized main-path promotion."""
from pathlib import Path
import gzip
import hashlib
import json
import shutil
import tarfile

W = Path(__file__).resolve().parent
R = W.parents[1]
D = W / 'handoff'
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
expected = 'c9c364b59fca69ecc395c1e7911d55fc7997631daa0dd0b0bcf37d7f0dfa4804'
assert sha(W / 'build/artifacts/pump_recovered.so') == expected
verification = json.loads((W / 'independent-verification.json').read_text())
assert verification['total_differential_cases'] == 9161 and verification['total_differential_suites'] == 36
assert verification['surfpool_comparisons'] == 1024 and verification['surfpool_signed_transactions'] == 2048
assert not verification['mismatches']
inputs = json.loads((W / 'inputs-before.json').read_text())
for group in ['harness_sha256', 'repository_fixture_snapshot_sha256', 'orchestration_sha256', 'main42_source_before']:
    for p, digest in inputs[group].items():
        assert sha(R / p) == digest, p
focused = W / 'focused-handoff'
assert sha(focused / 'manifest.json') == inputs['focused_handoff_manifest_sha256']
for p, digest in json.loads((focused / 'manifest.json').read_text()).items():
    assert sha(focused / p) == digest, p
D.mkdir(exist_ok=False)
shutil.copytree(focused, D / 'focused-handoff')
def cp(src, dst):
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(src, dst)
def gz(src, dst):
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_bytes(gzip.compress(src.read_bytes(), mtime=0))
cp(W / 'README-regression.md', D / 'README.md')
for name in ['inputs-before.json', 'source-provenance.json', 'quote-control.patch', 'regression-harness-snapshot.tar.gz',
             'independent-verification.json', 'verification.json', 'run-regressions.py', 'run-surfpool.py',
             'verify-evidence.py', 'verify-focused.py', 'freeze-regressions.py']:
    cp(W / name, D / name)
for name in ['build-attempt.json', 'build-comparison.json']:
    cp(W / 'build' / name, D / name)
gz(W / 'build/build.log', D / 'build.log.gz')
cp(W / 'build/artifacts/pump_recovered.so', D / 'candidate.so')
cp(W / 'build/target/sbf-solana-solana/release/pump_recovered.so', D / 'unstripped.so')
build = json.loads((W / 'build/build-comparison.json').read_text())
with tarfile.open(D / 'source-snapshot.tar.gz', 'w:gz') as t:
    for p, digest in build['source_sha256'].items():
        assert sha(R / p) == digest, p
        t.add(R / p, arcname=p)
before = {str(Path(p).relative_to('programs/pump')): h for p, h in inputs['main42_source_before'].items()}
after = {str(Path(p).relative_to('work/pump-quote-control-main42/crate')): h for p, h in build['source_sha256'].items()}
changed = sorted(p for p in set(before) | set(after) if before.get(p) != after.get(p))
assert changed == ['src/lib.rs', 'src/quote_control/initialize_quote_control.rs', 'src/quote_control/mod.rs',
                   'src/quote_control/state.rs', 'src/quote_control/update_quote_control_mints.rs'], changed
(D / 'source-delta.json').write_text(json.dumps({'before': before, 'scratch_after': after,
    'changed_paths': changed, 'main_source_unchanged': True}, indent=2) + '\n')
suites = {}
copy_map = {}
for row in json.loads((W / 'differential/run.json').read_text()):
    p = W / 'differential' / (row['suite'] + '.json.gz')
    raw = p.read_bytes()
    plain = gzip.decompress(raw) if raw.startswith(b'\x1f\x8b') else raw
    report = json.loads(plain)
    report.setdefault('case_count', len(report['cases']))
    suites[row['suite']] = report
    dest = D / 'differential' / p.name
    dest.parent.mkdir(exist_ok=True)
    dest.write_bytes(raw if raw.startswith(b'\x1f\x8b') else gzip.compress(raw, mtime=0))
    copy_map[str(dest.relative_to(D))] = {'executed_path': str(p.relative_to(R)),
        'executed_file_sha256': sha(p), 'stored_file_sha256': sha(dest), 'decompressed_sha256': hashlib.sha256(plain).hexdigest()}
    gz(W / 'differential' / (row['suite'] + '.log'), D / 'differential' / (row['suite'] + '.log.gz'))
for name in ['run.json', 'summary.json']:
    cp(W / 'differential' / name, D / 'differential' / name)
focused_receipt = W / 'focused-current.json.gz'
q = json.load(gzip.open(focused_receipt, 'rt'))
assert q['cases'] == 507 and q['mismatches'] == 0
q['case_count'] = q['cases']
suites['quote_control'] = q
cp(focused_receipt, D / 'differential/quote_control.json.gz')
cp(W / 'focused-current.log', D / 'differential/quote_control.log')
cp(R / 'scripts/pump_quote_control_fresh_differential.py', D / 'harness/scripts/pump_quote_control_fresh_differential.py')
for name in ['focused-portability-v1.py', 'focused-portability-v1.json.gz', 'focused-portability-v1.log']:
    cp(W / name, D / 'portability-intermediate' / name)
(D / 'portability-intermediate/README.md').write_text(
    'This intermediate metadata-portability run passed all 507 cases, but it predates explicit per-source-file binding. '
    'Its exact script and receipts are preserved. The maintained final runner and current 507-case receipts supersede it; '
    'these repeated cases are not counted again.\n')
historical = json.loads((R / 'work/pump-quote-control-inventory.json').read_text())
historical_files = dict(historical['file_sha256'])
historical_files.update({p: value['sha256'] for p, value in historical['current_binary_files'].items()})
for path, digest in historical_files.items():
    assert sha(R / path) == digest, path
    cp(R / path, D / 'historical-unaccepted' / path)
(D / 'historical-unaccepted/README.md').write_text(
    '# Unaccepted historical provenance\n\n'
    'These exact old source/helper/build/receipt files and currently inventoried binaries are preserved without accepting their results. '
    'The 491-case reports lack complete source and executable bindings; build1 retains 36 mismatches. '
    'The old static report names a candidate hash that differs from the binary currently at its path. '
    'Only the new candidate and fresh bound receipts elsewhere in this package count toward current acceptance. '
    'No historical executable or transaction was modified or used as compiler input.\n')
(D / 'historical-unaccepted/manifest.json').write_text(json.dumps(historical_files, indent=2) + '\n')
aggregate = {'scope': '48 recovered handlers plus unchanged partial v3/create_v2 routes. Fresh candidate regressions; known sell_v2 transfer-fee gap remains explicit.',
             'candidate_sha256': expected, 'original_sha256': verification['original_sha256'],
             'case_count': 9161, 'mismatches': [], 'group_cases': {'prior_main42': 8654, 'quote_control': 507}, 'suites': suites}
(D / 'all-differential.json.gz').write_bytes(gzip.compress((json.dumps(aggregate, separators=(',', ':')) + '\n').encode(), mtime=0))
executables = {}
for row in json.loads((W / 'surfpool/run.json').read_text()):
    directory = R / row['output']
    dest = D / 'surfpool' / row['name']
    dest.mkdir(parents=True)
    for p in sorted(directory.iterdir()):
        if not p.is_file():
            continue
        if p.suffix == '.so':
            digest = sha(p)
            assert digest == (expected if p.name == 'candidate.so' else verification['original_sha256'])
            executables[str(p.relative_to(R))] = digest
        elif p.suffix in ['.json', '.log']:
            target = dest / (p.name + '.gz')
            gz(p, target)
            copy_map[str(target.relative_to(D))] = {'executed_path': str(p.relative_to(R)),
                'executed_file_sha256': sha(p), 'stored_file_sha256': sha(target), 'decompressed_sha256': sha(p)}
        else:
            raise AssertionError(('Unexpected Surfpool output', str(p)))
    gz(W / 'surfpool' / (row['name'] + '.log'), dest / 'runner.log.gz')
cp(W / 'surfpool/run.json', D / 'surfpool-run.json')
(D / 'surfpool-executable-sha256.json').write_text(json.dumps(executables, indent=2) + '\n')
(D / 'receipt-copy-map.json').write_text(json.dumps(copy_map, indent=2) + '\n')
summary = {'scope': 'Frozen scratch candidate and fresh tests before main promotion.',
           'candidate_sha256': expected, 'candidate_bytes': 1478960, 'instruction_bodies': 48,
           'partial_paths': ['buy_v3', 'sell_v3', 'buy_exact_quote_in_v3', 'create_v2'],
           'differential_suites': 36, 'differential_cases': 9161,
           'differential_groups': {'prior_main42': 8654, 'quote_control': 507},
           'quote_control_executions': 1014, 'quote_control_verified_signatures': 2008,
           'surfpool_runners': 28, 'surfpool_comparisons': 1024, 'surfpool_signed_transactions': 2048,
           'surfpool_verified_signatures': verification['surfpool_verified_signatures'],
           'main_source_changed': False, 'full_byte_equality': False, 'known_sell_v2_gap_preserved': True,
           'source_inputs': 35, 'prior_harness_inputs': 86, 'fresh_quote_control_harness_inputs': 1,
           'runtime_inputs': 27, 'mismatches': [],
           'limitations': ['Existing sell_v2 quote-transfer-fee minimum/output and fee-event gap unchanged.',
                          'V3 trades and create_v2 remain partial, including existing depth-one nested-creation limits.',
                          'Stopped Mayhem initializer, Pump incentives and v3 token extensions/fees are excluded.',
                          'Quote-control focused checks use LiteSVM synthetic state; existing Surfpool runners exercise prior handlers.',
                          'Full historical source/compiler/dependency identity remains unresolved.']}
(D / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
manifest = {str(p.relative_to(D)): sha(p) for p in sorted(D.rglob('*')) if p.is_file()}
(D / 'manifest-sha256.json').write_text(json.dumps(manifest, indent=2) + '\n')
for p, digest in manifest.items():
    assert sha(D / p) == digest, p
status = {'package': str(D.relative_to(R)), 'files': len(manifest), 'manifest_sha256': sha(D / 'manifest-sha256.json'), **summary}
(W / 'handoff-status.json').write_text(json.dumps(status, indent=2) + '\n')
print(json.dumps(status, indent=2))
