"""Fresh full frozen BuyV2 corpus on actual native parent and proposed artifacts."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
import json
import re
import subprocess
import time

W = Path(__file__).resolve().parent
D = W / 'buy-v2-current-ownership-runtime'
PY = W / 'venv/bin/python'  # Keep the venv launcher path, including its symlink.
ROOT = D / 'inputs'
labels = {'parent': W / 'qualified-current432-native-build/candidate.so',
          'proposed': W / 'buy-v2-typed-price-owned-error-current432-build/candidate.so'}
binding = json.loads((D / 'input-bindings.json').read_bytes())
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
assert all(sha(ROOT / name) == row['sha256'] for name, row in binding['inputs'].items())
assert sha(labels['parent']) == 'a6adc4f876da179b4ce3daeebd55d24d17ca1aad4fc288085c5a1c5ba15069c5'
assert sha(labels['proposed']) == '4dd7e106064ca03d9426acdcc7d41d6349a7ef17cc72f87de869d3a3e703c801'


def execute(item):
    label, family = item
    target = D / label / (family + '.json')
    assert not target.exists(), 'Never overwrite completed corpus evidence'
    target.parent.mkdir(parents=True, exist_ok=True)
    candidate = labels[label]
    command = [str(PY), '-B', str(W / 'run_buy_v2_observed.py'), '--candidate', str(candidate),
               '--family', family, '--output', str(target)]
    start = time.monotonic()
    with target.with_suffix('.stdout').open('wb') as out:
        run = subprocess.run(command, stdout=out, stderr=subprocess.STDOUT)
    result = dict(label=label, family=family, command=command,
                  returncode=run.returncode, seconds=time.monotonic() - start,
                  stdout_sha256=sha(target.with_suffix('.stdout')))
    if run.returncode == 0:
        check = [str(PY), '-B', str(ROOT / 'scripts/verify_mayhem_buy_v2.py'),
                 '--receipts', str(target), '--candidate', str(candidate),
                 '--output', str(target.with_suffix('.verification.json'))]
        with target.with_suffix('.verification.stdout').open('wb') as out:
            checked = subprocess.run(check, stdout=out, stderr=subprocess.STDOUT)
        result.update(independent_command=check, independent_returncode=checked.returncode,
                      independent_stdout_sha256=sha(target.with_suffix('.verification.stdout')))
        if checked.returncode == 0:
            report = json.loads(target.read_bytes())
            proof = json.loads(target.with_suffix('.verification.json').read_bytes())
            programs = json.loads(target.with_suffix('.program-bindings.json').read_bytes())
            assert report['case_count'] == 613 and not report['mismatches']
            assert proof['verified_signed_transactions'] == 1226 and not proof['mismatches']
            assert len(programs['records']) == 1226 and programs['frozen_inputs_unchanged']
            assert programs['candidate_sha256'] == sha(candidate)
            compute = re.compile(r' consumed \d+ of \d+ compute units')
            strict = lambda logs: [line for line in logs if not compute.search(line)]
            raw = sum(p['original']['metadata']['logs'] != p['candidate']['metadata']['logs'] for p in report['cases'])
            noncompute = sum(strict(p['original']['metadata']['logs']) != strict(p['candidate']['metadata']['logs']) for p in report['cases'])
            result.update(case_count=613, successes=report['successful_original_cases'],
                          rejection_cases=613 - report['successful_original_cases'],
                          verified_signed_records=1226, raw_log_differences=raw,
                          noncompute_log_differences=noncompute,
                          frozen_normalized_log_differences=len(report['normalized_log_differences']),
                          report_sha256=sha(target), independent_sha256=sha(target.with_suffix('.verification.json')),
                          program_bindings_sha256=sha(target.with_suffix('.program-bindings.json')))
    target.with_suffix('.execution.json').write_text(json.dumps(result, indent=2) + '\n')
    return result


results = []
work = [(label, family) for label in labels for family in ['native', 'token', 'token22']]
with ThreadPoolExecutor(max_workers=3) as pool:
    pending = {pool.submit(execute, item): item for item in work}
    for task in as_completed(pending):
        result = task.result()
        results.append(result)
        print(json.dumps(result, sort_keys=True), flush=True)
        (D / 'completed-runs.json').write_text(json.dumps(results, indent=2) + '\n')
assert len(results) == 6
assert all(r['returncode'] == r.get('independent_returncode') == 0 for r in results)
assert all(sha(ROOT / name) == row['sha256'] for name, row in binding['inputs'].items())
summary = dict(runs=sorted(results, key=lambda r: (r['label'], r['family'])),
               fresh_full_corpus_pairs=3678, independently_verified_signed_records=7356,
               input_files=17, input_files_unchanged=True,
               scope='1839 fresh original/candidate pairs per artifact, six real VM program hashes '
                     'before/after each signed execution. Initial one-pair smoke is separate and not '
                     'added to corpus/unique-case counts. No CPI-error callback coverage inferred.')
(D / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
print(json.dumps({k: v for k, v in summary.items() if k != 'runs'}, sort_keys=True))
