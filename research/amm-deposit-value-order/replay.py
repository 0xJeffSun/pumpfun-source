"""Run unchanged AMM suites and retain losslessly compressed signed receipts."""
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import argparse
import gzip
import hashlib
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(__doc__)
    parser.add_argument('--candidate', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    candidate = args.candidate.resolve()
    out = args.output.resolve()
    out.mkdir(parents=True, exist_ok=False)
    base = ROOT / 'repro/pump_amm/pool-serialization-thirty-seven'
    specs = json.loads((base / 'replay-commands.json').read_text())['commands']
    counts = json.loads((base / 'summary.json').read_text())['suites']
    observer = ROOT / 'repro/pump_amm/owner6048-v144/runtime/observe_suite.py'
    inputs = {str(ROOT / s['command'][1]): sha(ROOT / s['command'][1]) for s in specs}
    inputs[str(observer)] = sha(observer)
    inputs[str(candidate)] = sha(candidate)
    assert len(specs) == 25 and sum(counts.values()) == 17462

    def run(spec):
        name = spec['suite']
        raw = out / f'{name}.json'
        sidecar = out / f'{name}-transactions.json.gz'
        command = list(spec['command'])
        command[0:2] = [sys.executable, str(ROOT / command[1])]
        command[command.index('--candidate') + 1] = str(candidate)
        command[command.index('--output') + 1] = str(raw)
        command = [sys.executable, str(observer), str(sidecar), *command[1:]]
        with (out / f'{name}.log').open('wb') as log:
            result = subprocess.run(command, cwd=ROOT, stdout=log, stderr=subprocess.STDOUT)
        assert result.returncode == 0, name
        data = raw.read_bytes()
        receipt = json.loads(data)
        assert receipt['candidate_sha256'] == inputs[str(candidate)]
        assert receipt['case_count'] == counts[name] and not receipt.get('mismatches', [])
        compressed = gzip.compress(data, mtime=0)
        assert gzip.decompress(compressed) == data
        (out / f'{name}.json.gz').write_bytes(compressed)
        raw.unlink()  # Only this controller's redundant uncompressed output.
        tx = json.loads(gzip.decompress(sidecar.read_bytes()))
        assert tx['transaction_count'] == 2 * counts[name] + (150 if name == 'boost' else 0)
        row = dict(suite=name, command=command, case_count=counts[name],
                   transactions=tx['transaction_count'], signatures=tx['signature_count'],
                   receipt_sha256=hashlib.sha256(data).hexdigest(), sidecar_sha256=sha(sidecar))
        print(json.dumps({k: row[k] for k in ('suite', 'case_count', 'transactions')}), flush=True)
        return row

    with ThreadPoolExecutor(max_workers=4) as pool:
        rows = [f.result() for f in as_completed([pool.submit(run, s) for s in specs])]
    assert all(sha(Path(p)) == h for p, h in inputs.items())
    report = dict(candidate_sha256=sha(candidate), cases=sum(r['case_count'] for r in rows),
                  suites=sorted(rows, key=lambda r: r['suite']), inputs=inputs, mismatches=[])
    (out / 'summary.json').write_text(json.dumps(report, indent=2) + '\n')
    print('PASS:', report['cases'], 'cases', flush=True)


if __name__ == '__main__':
    main()
