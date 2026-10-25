"""Verify the immutable Pump48 package, current source, and saved signed evidence."""
from pathlib import Path
import argparse
import base64
import gzip
import hashlib
import json
from solders.transaction import VersionedTransaction

parser = argparse.ArgumentParser()
parser.add_argument('--package', type=Path, default=Path(__file__).resolve().parent)
a = parser.parse_args()
D = a.package.resolve()
R = next(p for p in D.parents if (p / 'evidence/upstream/pump.json').is_file())
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
def load(p):
    raw = p.read_bytes()
    return json.loads(gzip.decompress(raw) if raw.startswith(b'\x1f\x8b') else raw)
manifest = load(D / 'manifest-sha256.json')
actual = {str(p.relative_to(D)) for p in D.rglob('*') if p.is_file() and p != D / 'manifest-sha256.json'}
assert actual == set(manifest)
for p, digest in manifest.items():
    assert sha(D / p) == digest, p
identity = load(D / 'main-scratch-identity.json')
expected = 'c9c364b59fca69ecc395c1e7911d55fc7997631daa0dd0b0bcf37d7f0dfa4804'
assert identity['whole_file_equal'] and identity['main_sha256'] == identity['scratch_sha256'] == expected
assert sha(D / 'candidate.so') == expected and (D / 'candidate.so').stat().st_size == 1478960
assert (D / 'candidate.so').read_bytes() == (D / 'focused-handoff/candidate.so').read_bytes()
current = load(D / 'source-harness-sha256.json')
for group in ['source_sha256', 'harness_sha256', 'repository_fixture_snapshot_sha256']:
    for p, digest in current[group].items():
        assert sha(R / p) == digest, p
assert len(current['source_sha256']) == 35 and len(current['harness_sha256']) == 87
assert len(current['repository_fixture_snapshot_sha256']) == 27
build = load(D / 'build-comparison.json')
assert build['source_sha256'] == current['source_sha256'] == identity['main_build_inputs']
assert build['comparison']['candidate_sha256'] == expected and not build['comparison']['full_byte_equality']
original = sha(R / 'evidence/original/pump/deployed.so')
assert original == build['comparison']['original_sha256']
assert hashlib.sha256(gzip.decompress((D / 'build.log.gz').read_bytes())).hexdigest() == build['build_log_sha256']
for p, entry in load(D / 'scratch-package-bindings.json')['files'].items():
    assert sha(D / entry['path']) == entry['sha256'], p
aggregate = load(D / 'all-differential.json.gz')
assert aggregate['candidate_sha256'] == expected and aggregate['original_sha256'] == original
assert aggregate['case_count'] == 9161 and not aggregate['mismatches']
assert len(aggregate['suites']) == 36 and sum(x['case_count'] for x in aggregate['suites'].values()) == 9161
assert all(not x.get('mismatches', x.get('failures', [])) for x in aggregate['suites'].values())
def count_txs(value):
    transactions = signatures = 0
    def walk(v):
        if isinstance(v, dict):
            if isinstance(v.get('transaction_base64'), str):
                yield v['transaction_base64']
            for key, child in v.items():
                if key != 'transaction_base64':
                    yield from walk(child)
        elif isinstance(v, list):
            for child in v:
                yield from walk(child)
    for encoded in walk(value):
        raw = base64.b64decode(encoded)
        tx = VersionedTransaction.from_bytes(raw)
        assert bytes(tx) == raw and all(tx.verify_with_results())
        transactions += 1
        signatures += len(tx.signatures)
    return transactions, signatures
surf_transactions = surf_signatures = comparisons = 0
rows = load(D / 'surfpool-run.json')
assert len(rows) == 28
for row in rows:
    assert row['returncode'] == 0 and row['candidate_sha256'] == expected and row['runner_unchanged']
    found = []
    for p in (D / 'surfpool' / row['name']).glob('pump-*-transactions.json.gz'):
        r = load(p)
        if isinstance(r, dict) and 'candidate_sha256' in r and 'signed_transactions' in r:
            found.append(r)
    assert len(found) == 1, row['name']
    r = found[0]
    assert r['candidate_sha256'] == expected and r['original_sha256'] == original
    assert not r['mismatches'] and not r.get('unexpected_original_errors', []) and not r.get('unexpected_errors', [])
    txs, sigs = count_txs({'original': r['original'], 'candidate': r['candidate']})
    assert txs == r['signed_transactions'] == 2 * r['cases']
    comparisons += r['cases']
    surf_transactions += txs
    surf_signatures += sigs
assert (comparisons, surf_transactions, surf_signatures) == (1024, 2048, 2980)
q = load(D / 'differential/quote_control.json.gz')
assert q['cases'] == 507 and not q['mismatches']
assert count_txs(q['results']) == (1014, 2008)
prefix = 'work/pump-quote-control-main42/'
for p, digest in q['bound_inputs_sha256'].items():
    if p == prefix + 'build/artifacts/pump_recovered.so':
        actual_path = D / 'candidate.so'
    elif p == prefix + 'build/build-comparison.json':
        actual_path = D / 'scratch-build/build-comparison.json'
    elif p.startswith(prefix + 'crate/'):
        actual_path = R / 'programs/pump' / p.removeprefix(prefix + 'crate/')
    else:
        actual_path = R / p
    assert sha(actual_path) == digest, p
for row in q['results']:
    assert row['matches'] and not row['different_fields']
    assert all(row['original'][k] == row['candidate'][k] for k in q['compare_keys'])
    for side in ['original', 'candidate']:
        r = row[side]
        assert r['sigverify_enabled'] and r['blockhash_check_enabled'] and all(r['signature_verification'])
        tx = VersionedTransaction.from_bytes(base64.b64decode(r['transaction_base64']))
        assert str(tx.message.recent_blockhash) == r['blockhash']
        if r['error']:
            rollback = r['rollback']
            assert rollback['nonpayer_accounts_unchanged'] and rollback['payer_except_fee_unchanged']
            assert rollback['charged_fee'] == rollback['expected_signature_fee'] == len(tx.signatures) * 5000
print(json.dumps({'package_files_verified': len(manifest), 'manifest_sha256': sha(D / 'manifest-sha256.json'),
    'candidate_sha256': expected, 'main_scratch_whole_file_equal': True, 'source_files': 35, 'harness_files': 87,
    'runtime_files': 27, 'differential_suites': 36, 'differential_cases': 9161,
    'surfpool_runners': 28, 'surfpool_comparisons': comparisons,
    'surfpool_signed_transactions': surf_transactions, 'surfpool_verified_signatures': surf_signatures,
    'quote_control_transactions': 1014, 'quote_control_verified_signatures': 2008,
    'full_original_byte_equality': False}, indent=2))
