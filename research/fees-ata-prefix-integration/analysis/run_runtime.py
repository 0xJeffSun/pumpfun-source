"""Run the unchanged canonical Fees suites in a bounded parallel pool."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import ast
import gzip
import hashlib
import json
import subprocess
import sys
import tempfile
import time

D = Path(__file__).resolve().parent
R = Path('/Users/shawwalters/.codex/worktrees/fees-withdraw-integration/pumpfun-source')
candidate = D / 'ata-prefix-qualified-candidate.so'
runner = R / 'scripts/fees_validate_all.py'
sha = lambda data: hashlib.sha256(data).hexdigest()
tree = ast.parse(runner.read_text())
loops = [n for n in ast.walk(tree) if isinstance(n, ast.For)
         and isinstance(n.target, ast.Tuple)
         and [getattr(e, 'id', None) for e in n.target.elts] == ['name', 'script']]
assert len(loops) == 1
suites = ast.literal_eval(loops[0].iter)
assert len(suites) == 18 and len(set(n for n, _ in suites)) == 18
original_sha = sha((R / 'evidence/original/pump_fees/deployed.so').read_bytes())
candidate_sha = sha(candidate.read_bytes())
start = time.monotonic()
receipts = {}
results = {}

def run_suite(name, script, folder):
    output = folder / (name + '.json')
    command = [sys.executable, '-B', str(R / 'scripts' / script),
               '--candidate', str(candidate), '--output', str(output)]
    script_sha = sha((R / 'scripts' / script).read_bytes())
    started = time.monotonic()
    proc = subprocess.run(command, capture_output=True, text=True)
    receipt = dict(command=command, exit_code=proc.returncode,
                   elapsed_seconds=time.monotonic() - started,
                   script_sha256=script_sha, stdout=proc.stdout, stderr=proc.stderr)
    (D / ('runtime-' + name + '-execution.json')).write_text(json.dumps(receipt, indent=2) + '\n')
    assert proc.returncode == 0, (name, proc.returncode, proc.stderr)
    assert sha((R / 'scripts' / script).read_bytes()) == script_sha
    result = json.loads(output.read_bytes())
    result.setdefault('case_count', len(result.get('cases', [])))
    assert result['original_sha256'] == original_sha
    assert result['candidate_sha256'] == candidate_sha
    assert not result.get('mismatches', result.get('failures', [])), name
    with gzip.open(D / ('runtime-' + name + '.json.gz'), 'wb') as stream:
        stream.write(json.dumps(result, separators=(',', ':')).encode() + b'\n')
    return name, result, receipt

with tempfile.TemporaryDirectory(prefix='fees-ata-runtime-') as tmp:
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = [pool.submit(run_suite, name, script, Path(tmp)) for name, script in suites]
        for future in as_completed(futures):
            name, result, receipt = future.result()
            results[name] = result
            receipts[name] = receipt
            print(name, result['case_count'], 'PASS', flush=True)

report = dict(scope='Unchanged canonical Fees handler suites; bounded runtime evidence only.',
              original_sha256=original_sha, candidate_sha256=candidate_sha,
              case_count=sum(r['case_count'] for r in results.values()), mismatches=[],
              suites={name: results[name] for name, _ in suites})
assert report['case_count'] == 17331
assert sha(candidate.read_bytes()) == candidate_sha
with gzip.open(D / 'runtime.json.gz', 'wb') as stream:
    stream.write(json.dumps(report, separators=(',', ':')).encode() + b'\n')
(D / 'runtime-execution.json').write_text(json.dumps(dict(
    jobs=4, canonical_runner_sha256=sha(runner.read_bytes()),
    candidate_sha256=candidate_sha, elapsed_seconds=time.monotonic() - start,
    suites={name: receipts[name] for name, _ in suites}), indent=2) + '\n')
print(json.dumps(dict(cases=report['case_count'], suites=len(suites), mismatches=[])))
