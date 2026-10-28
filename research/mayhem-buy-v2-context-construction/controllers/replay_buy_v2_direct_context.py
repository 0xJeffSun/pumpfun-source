"""Fresh frozen corpus for the new direct-context artifact; no old receipt reuse."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
import json
import re
import subprocess
import time

W = Path(__file__).resolve().parent
D = W / 'buy-v2-current-ownership-runtime'
OUT = D / 'followup-direct-context'
PY = W / 'venv/bin/python'
ROOT = D / 'inputs'
CANDIDATE = W / 'buy-v2-direct-context-current432-build/candidate.so'
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(CANDIDATE) == 'cbe7daa9cd9a0ea087acac203e80b9a3fd9953a0376cdd83253bd6009fc6589a'
binding = json.loads((D / 'input-bindings.json').read_bytes())
assert all(sha(ROOT / n) == row['sha256'] for n, row in binding['inputs'].items())
OUT.mkdir()


def run(family):
    receipt = OUT / (family + '.json')
    assert not receipt.exists()
    command = [str(PY), '-B', str(W / 'run_buy_v2_observed.py'),
               '--candidate', str(CANDIDATE), '--family', family, '--output', str(receipt)]
    start = time.monotonic()
    with receipt.with_suffix('.stdout').open('wb') as output:
        result = subprocess.run(command, stdout=output, stderr=subprocess.STDOUT)
    record = dict(family=family, command=command, returncode=result.returncode,
                  seconds=time.monotonic() - start, stdout_sha256=sha(receipt.with_suffix('.stdout')))
    if result.returncode == 0:
        check = [str(PY), '-B', str(ROOT / 'scripts/verify_mayhem_buy_v2.py'),
                 '--receipts', str(receipt), '--candidate', str(CANDIDATE),
                 '--output', str(receipt.with_suffix('.verification.json'))]
        with receipt.with_suffix('.verification.stdout').open('wb') as output:
            verified = subprocess.run(check, stdout=output, stderr=subprocess.STDOUT)
        record.update(independent_command=check, independent_returncode=verified.returncode)
        if verified.returncode == 0:
            raw = json.loads(receipt.read_bytes())
            proof = json.loads(receipt.with_suffix('.verification.json').read_bytes())
            programs = json.loads(receipt.with_suffix('.program-bindings.json').read_bytes())
            assert raw['case_count'] == 613 and not raw['mismatches']
            assert proof['verified_signed_transactions'] == 1226 and not proof['mismatches']
            assert len(programs['records']) == 1226 and programs['frozen_inputs_unchanged']
            assert programs['candidate_sha256'] == sha(CANDIDATE)
            compute = re.compile(r' consumed \d+ of \d+ compute units')
            strict = lambda logs: [line for line in logs if not compute.search(line)]
            record.update(pairs=613, successes=proof['successful_cases'],
                rejection_cases=proof['rejection_cases'], independently_verified_signed_records=1226,
                noncompute_log_differences=sum(strict(p['original']['metadata']['logs']) != strict(p['candidate']['metadata']['logs']) for p in raw['cases']),
                raw_log_differences=sum(p['original']['metadata']['logs'] != p['candidate']['metadata']['logs'] for p in raw['cases']),
                receipt_sha256=sha(receipt), proof_sha256=sha(receipt.with_suffix('.verification.json')),
                programs_sha256=sha(receipt.with_suffix('.program-bindings.json')))
    receipt.with_suffix('.execution.json').write_text(json.dumps(record, indent=2) + '\n')
    return record


results = []
with ThreadPoolExecutor(max_workers=3) as pool:
    for task in as_completed([pool.submit(run, family) for family in ['native', 'token', 'token22']]):
        result = task.result()
        results.append(result)
        (OUT / 'completed.json').write_text(json.dumps(results, indent=2) + '\n')
        print(json.dumps(result, sort_keys=True), flush=True)
assert len(results) == 3 and all(r['returncode'] == r.get('independent_returncode') == 0 for r in results)
assert all(sha(ROOT / n) == row['sha256'] for n, row in binding['inputs'].items())
summary = dict(candidate_sha256=sha(CANDIDATE), runs=sorted(results, key=lambda r: r['family']),
               fresh_pairs=1839, independently_verified_signed_records=3678,
               frozen_input_files_unchanged=True,
               scope='New direct-context artifact only; previous parent/proposed receipts retain their own hashes and are not retagged. Real six-program observations and unchanged signed fixtures/checkers. No CPI-error callback coverage inferred.')
(OUT / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
print(json.dumps({k: v for k, v in summary.items() if k != 'runs'}, sort_keys=True))
