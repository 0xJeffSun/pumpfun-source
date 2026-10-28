"""Run the unchanged fourteen trade suites locally and retain their full receipts."""
import argparse
from concurrent.futures import ThreadPoolExecutor
import gzip
import hashlib
import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]


def commands(candidate, output):
    specs = [('buy', 'mayhem_buy_differential.py', 'twenty/buy', []),
             ('sell', 'mayhem_sell_differential.py', 'nineteen/sell', [])]
    for family in ('native', 'token', 'token22'):
        for side, checkpoint in (('buy', 'twentytwo'), ('sell', 'twentyone')):
            specs.append((f'{side}-v2-{family}', f'mayhem_{side}_v2_differential.py',
                          f'{checkpoint}/{side}-v2', ['--family', family]))
        for side in ('buy', 'sell'):
            specs.append((f'{side}-amm-{family}', 'mayhem_pump_swap_differential.py',
                          f'twentyfour/{side}-pump-swap',
                          ['--family', family, '--instruction', f'{side}_pump_swap']))
    return [(name, [sys.executable, '-B', str(ROOT / 'scripts' / script),
                    '--candidate', str(candidate), '--output', str(output / (name + '.json')),
                    *([] if name == 'sell' else ['--cases', str(ROOT / 'repro/mayhem' / (cases + '-cases.json'))]), *extra])
            for name, script, cases, extra in specs]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--candidate', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    parser.add_argument('--jobs', type=int, default=4)
    parser.add_argument('--only', help='Run one named suite, e.g. sell')
    args = parser.parse_args()
    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=False)
    candidate = args.candidate.resolve()
    runs = commands(candidate, output)
    if args.only:
        runs = [spec for spec in runs if spec[0] == args.only]
        assert len(runs) == 1, args.only

    def run(spec):
        name, cmd = spec
        with (output / (name + '.log')).open('wb') as log:
            result = subprocess.run(cmd, cwd=ROOT, stdout=log, stderr=log)
        row = dict(family=name, command=cmd, returncode=result.returncode)
        if result.returncode == 0:
            report = json.loads((output / (name + '.json')).read_bytes())
            data = (json.dumps(report, separators=(',', ':')) + '\n').encode()
            (output / (name + '.json.gz')).write_bytes(gzip.compress(data, mtime=0))
            row.update(cases=report['case_count'], mismatches=len(report['mismatches']))
        print(json.dumps({k: v for k, v in row.items() if k != 'command'}), flush=True)
        return row

    with ThreadPoolExecutor(max_workers=args.jobs) as executor:
        rows = list(executor.map(run, runs))
    (output / 'commands.json').write_text(json.dumps(dict(
        candidate_sha256=hashlib.sha256(candidate.read_bytes()).hexdigest(), runs=rows), indent=2) + '\n')
    assert all(r['returncode'] == 0 and r['mismatches'] == 0 for r in rows)
    if not args.only:
        assert sum(r['cases'] for r in rows) == 6636


if __name__ == '__main__':
    main()
