"""Verify the saved focused receipts without executing any program instruction."""
from pathlib import Path
import base64
import collections
import gzip
import hashlib
import json
from solders.transaction import VersionedTransaction
import focused as f

W = Path(__file__).resolve().parent
R = W.parents[1]
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
initial_report = json.load(gzip.open(W / 'focused.json.gz', 'rt'))
report = json.load(gzip.open(W / 'focused-current.json.gz', 'rt'))
assert initial_report['results'] == report['results'], 'Portability rerun changed focused outcomes or transactions'
assert report['cases'] == 507 and report['mismatches'] == 0
for path, digest in report['bound_inputs_sha256'].items():
    assert sha(R / path) == digest, path
base = json.loads((W / 'source-provenance.json').read_text())
for path, digest in base['main42_source_sha256'].items():
    assert sha(R / path) == digest, path
old = json.loads((R / 'work/pump-quote-control-inventory.json').read_text())
for path, digest in old['file_sha256'].items():
    assert sha(R / path) == digest, path
build = json.loads((W / 'build/build-attempt.json').read_text())
assert build['returncode'] == 0 and build['source_unchanged']
assert build['source_sha256'] == build['source_after_sha256']
for path, digest in build['source_sha256'].items():
    assert sha(R / path) == digest, path
allowed = {kp.pubkey() for kp in f.KEYS.values()}
executions = signatures = failures = 0
for row in report['results']:
    assert row['matches'] and not row['different_fields']
    assert all(row['original'][k] == row['candidate'][k] for k in report['compare_keys'])
    for side in ['original', 'candidate']:
        x = row[side]
        raw = base64.b64decode(x['transaction_base64'])
        tx = VersionedTransaction.from_bytes(raw)
        assert bytes(tx) == raw and hashlib.sha256(raw).hexdigest() == x['transaction_sha256']
        assert all(tx.verify_with_results()) and x['signature_verification'] == tx.verify_with_results()
        assert x['sigverify_enabled'] and x['blockhash_check_enabled']
        assert str(tx.message.recent_blockhash) == x['blockhash']
        assert tx.message.account_keys[0] == f.PAYER.pubkey()
        required = tx.message.header.num_required_signatures
        assert set(tx.message.account_keys[:required]).issubset(allowed)
        assert len(tx.message.instructions) == 1
        ix = tx.message.instructions[0]
        assert tx.message.account_keys[ix.program_id_index] == f.PROGRAM
        assert bytes(ix.data)[:8] == bytes(f.IX[row['instruction']]['discriminator'])
        if x['error']:
            failures += 1
            rollback = x['rollback']
            assert rollback['nonpayer_accounts_unchanged'] and rollback['payer_except_fee_unchanged']
            assert rollback['charged_fee'] == rollback['expected_signature_fee'] == len(tx.signatures) * 5000
        executions += 1
        signatures += len(tx.signatures)
summary = {'cases': report['cases'], 'mismatches': 0, 'executions': executions,
           'verified_signatures': signatures, 'failed_executions_with_verified_rollback': failures,
           'by_instruction': dict(collections.Counter(x['instruction'] for x in report['results'])),
           'main42_source_files_unchanged': len(base['main42_source_sha256']),
           'historical_files_unchanged': len(old['file_sha256']),
           'candidate_source_files_unchanged': len(build['source_sha256']),
           'receipt_sha256': sha(W / 'focused-current.json.gz'),
           'initial_focused_receipt_sha256': sha(W / 'focused.json.gz'),
           'portability_rerun_results_identical': True,
           'verifier_sha256': sha(Path(__file__)),
           'claim_limit': 'This focused verifier alone establishes no full main42 regression or Surfpool acceptance; those results are recorded separately.'}
(W / 'verification.json').write_text(json.dumps(summary, indent=2) + '\n')
print(json.dumps(summary, indent=2))
