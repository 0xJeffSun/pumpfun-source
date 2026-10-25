#!/usr/bin/env python3
"""Nine normally signed offline buyback cases, with exact compared-value logs."""
from pathlib import Path
import argparse, base64, hashlib, json, sys
ROOT = next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
sys.path.insert(0, str(ROOT/'scripts'))
import fees_buyback_differential as fixture
from solders.litesvm import LiteSVM
from solders.transaction import Transaction

def enforced_vm():
    return LiteSVM().with_sigverify(True).with_blockhash_check(True)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--candidate', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    fixture.LiteSVM = enforced_vm
    sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
    rows = []
    failures = []
    for handler in ['initialize_buyback','update_buyback_authority','update_buyback_claim_rate_limit']:
        for index in [7,8,255]:
            case = {'name': f'{handler}-compared-values-{index}', 'op': handler, 'index': index}
            original = fixture.run(case)
            candidate = fixture.run(case, args.candidate)
            expected = [] if index == 7 else ['Program log: Left: 8',f'Program log: Right: {index}']
            compared = lambda r: [line for line in r['logs'] if line.startswith(('Program log: Left:','Program log: Right:'))]
            checks = {'exact_compared_values': compared(original) == compared(candidate) == expected,
                      'expected_result': original['error'] == candidate['error'] and ((original['error'] is None) if index == 7 else ('6026' in original['error'])),
                      'state_balances_errors_inner_return': all(original[k] == candidate[k] for k in ['error','before','after','inner','return']),
                      'events': [s for s in original['logs'] if s.startswith('Program data:')] == [s for s in candidate['logs'] if s.startswith('Program data:')],
                      'normal_signatures_valid': all(all(Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).verify_with_results()) for r in [original,candidate])}
            if not all(checks.values()): failures.append(case['name'])
            rows.append({'case':case,'checks':checks,'expected_compared_value_lines':expected,'original':original,'candidate':candidate})
    result = {'scope':'Nine additional normally signed synthetic offline comparisons, overlapping index cases from the full regression. Runtime signature verification and blockhash checking explicitly enabled. Exact Left/Right logs are asserted; raw source-location and compute-unit differences remain retained and are not equated. No live submission.',
              'original_sha256':sha(fixture.ORIGINAL),'candidate_sha256':sha(args.candidate),
              'case_count':len(rows),'signed_transactions':2*len(rows),'mismatches':failures,
              'signature_verification_enabled':True,'blockhash_check_enabled':True,
              'runner_sha256':sha(Path(__file__)),
              'fixture_source_sha256':{str(p.relative_to(ROOT)):sha(p) for p in [ROOT/'scripts/fees_buyback_differential.py',ROOT/'scripts/fees_admin_differential.py']},
              'dependency_sha256':{name:sha(ROOT/f'evidence/dependencies/{name}/deployed.so') for name in ['spl_token','associated_token']},
              'cases':rows}
    args.output.parent.mkdir(parents=True,exist_ok=True)
    args.output.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({k:result[k] for k in ['candidate_sha256','case_count','signed_transactions','mismatches']}))
    assert not failures

if __name__ == '__main__': main()
