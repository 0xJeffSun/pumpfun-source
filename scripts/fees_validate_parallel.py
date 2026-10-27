#!/usr/bin/env python3
"""Run the canonical Fees suites in isolated processes with bounded concurrency."""
import argparse
import ast
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import time

ROOT = Path(__file__).resolve().parents[1]


def canonical_plan():
    source = ROOT / 'scripts/fees_validate_all.py'
    tree = ast.parse(source.read_text())
    plans = [node for node in ast.walk(tree) if isinstance(node, ast.For)
             and isinstance(node.target, ast.Tuple)
             and [getattr(x, 'id', None) for x in node.target.elts] == ['name', 'script']]
    assert len(plans) == 1
    plan = ast.literal_eval(plans[0].iter)
    assert len(plan) == 18 and len({name for name, _ in plan}) == len(plan)
    scopes = [ast.literal_eval(value) for node in ast.walk(tree) if isinstance(node, ast.Dict)
              for key, value in zip(node.keys, node.values)
              if isinstance(key, ast.Constant) and key.value == 'scope']
    assert len(scopes) == 1
    return source, plan, scopes[0]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--candidate', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--jobs', type=int, default=4, choices=range(1, 9))
    args = parser.parse_args()
    candidate = args.candidate.resolve()
    output = args.output.resolve()
    receipt = output.with_name(output.stem + '-execution.json')
    assert candidate.is_file() and not output.exists() and not receipt.exists()
    source, plan, scope = canonical_plan()
    sha = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
    original = ROOT / 'evidence/original/pump_fees/deployed.so'
    candidate_sha, original_sha = sha(candidate), sha(original)
    started = time.monotonic()
    suites, executions = {}, {}
    with tempfile.TemporaryDirectory(prefix='fees-parallel-') as directory:
        folder = Path(directory)

        def execute(name, script):
            path = folder / (name + '.json')
            command = [sys.executable, '-B', str(ROOT / 'scripts' / script),
                       '--candidate', str(candidate), '--output', str(path)]
            tick = time.monotonic()
            result = subprocess.run(command, capture_output=True, text=True)
            record = {'command': command, 'exit_code': result.returncode,
                      'elapsed_seconds': time.monotonic() - tick,
                      'script_sha256': sha(ROOT / 'scripts' / script),
                      'stdout': result.stdout, 'stderr': result.stderr}
            if result.returncode:
                raise RuntimeError(json.dumps({'suite': name, **record}))
            suite = json.loads(path.read_text())
            suite.setdefault('case_count', len(suite['cases']))
            assert suite['original_sha256'] == original_sha
            assert suite['candidate_sha256'] == candidate_sha
            assert not suite.get('mismatches', suite.get('failures', []))
            return name, suite, record

        with ThreadPoolExecutor(max_workers=args.jobs) as executor:
            futures = [executor.submit(execute, name, script) for name, script in plan]
            for future in as_completed(futures):
                name, suite, record = future.result()
                suites[name], executions[name] = suite, record
                print(json.dumps({'suite': name, 'cases': suite['case_count'],
                                  'elapsed_seconds': record['elapsed_seconds']}), flush=True)

    assert sha(candidate) == candidate_sha and sha(original) == original_sha
    ordered = {name: suites[name] for name, _ in plan}
    report = {'scope': scope, 'original_sha256': original_sha,
              'candidate_sha256': candidate_sha,
              'case_count': sum(s['case_count'] for s in ordered.values()),
              'mismatches': [f'{name}: {item}' for name, s in ordered.items()
                             for item in s.get('mismatches', s.get('failures', []))],
              'suites': ordered}
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, separators=(',', ':')) + '\n')
    receipt.write_text(json.dumps({'jobs': args.jobs, 'canonical_runner_sha256': sha(source),
                                  'candidate_sha256': candidate_sha,
                                  'elapsed_seconds': time.monotonic() - started,
                                  'suites': {name: executions[name] for name, _ in plan}}, indent=2) + '\n')
    print(json.dumps({'cases': report['case_count'], 'mismatches': report['mismatches'],
                      'elapsed_seconds': time.monotonic() - started}), flush=True)


if __name__ == '__main__':
    main()
