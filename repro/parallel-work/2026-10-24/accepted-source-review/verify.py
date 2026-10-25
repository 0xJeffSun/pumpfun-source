#!/usr/bin/env python3
"""Verify this saved review seal and output agreements; no handoff execution."""
from pathlib import Path
import hashlib
import json

P = Path(__file__).resolve().parent
sha = lambda b: hashlib.sha256(b).hexdigest()
read = lambda n: json.loads((P / n).read_text())
seal = read('manifest-sha256.json')
paths = list(P.rglob('*'))
assert not any(p.is_symlink() for p in paths)
actual = {str(p.relative_to(P)): sha(p.read_bytes()) for p in paths if p.is_file()
          and str(p.relative_to(P)) != 'manifest-sha256.json'}
assert actual == seal
audit = read('independent-checks.json')
assert audit['status'] == 'PASS' and not audit['substantive_findings']
assert audit['package_payload_files'] == {'pump': 271, 'fees': 143}
assert audit['pump']['existing_single_curve_body_unchanged']
assert audit['fees']['exactly_one_field_type_replacement']
assert audit['pump']['original_acceptance_transactions_preserved'] == 20
assert len(audit['fees']['historical_transactions']) == 2
for label in ['pump', 'fees']:
    assert (P / (label + '-portable-verifier.stdout')).read_bytes() == (P / (label + '-copied-verifier.stdout')).read_bytes()
    assert not (P / (label + '-portable-verifier.stderr')).read_bytes()
    assert not (P / (label + '-copied-verifier.stderr')).read_bytes()
pump = read('pump-portable-verifier.stdout')
assert pump['status'] == 'PASS' and pump['combined_differential_cases'] == 9237
assert pump['surfpool_comparisons'] == 1024 and pump['total_verified_signatures'] == 27236
fees = read('fees-portable-verifier.stdout')
assert fees['verified'] and fees['comparison_receipts'] == 17441 and fees['donation_steps'] == 10
assert fees['verified_signatures_in_encoded_fields'] == 17204 and fees['authentic_unchanged_historical_messages'] == 2
assert read('pump-arithmetic-verifier.stdout')['status'] == 'PASS'
assert not (P / 'independent-checks.stderr').read_bytes()
print(json.dumps({'verified': True, 'sealed_review_files': len(seal), 'substantive_findings': 0,
                  'pump_candidate_sha256': audit['pump']['candidate_sha256'],
                  'fees_candidate_sha256': audit['fees']['candidate_sha256'],
                  'source_program_build_runtime_executions': 0}, indent=2))
