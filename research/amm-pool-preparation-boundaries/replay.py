"""Run signed local matrices; use a new output directory outside the repo."""
from pathlib import Path
import argparse, datetime, json, os, subprocess, sys

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
OLD = 'repro/pump_amm/source-abi-recovery-20261027/results/build/candidate.so'
CURRENT = 'repro/pump_amm/transfer-abi-recovery-20261027/results/build/candidate.so'
LATEST = 'repro/pump_amm/quote-guard-recovery-20261027/results/build/candidate.so'


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--output', type=Path, required=True)
    p.add_argument('--only-643', action='store_true', help='Run only the two newer checkpoint matrices')
    a = p.parse_args()
    out = a.output.resolve()
    assert not out.is_relative_to(ROOT), 'Keep replay outputs outside the sealed checkout.'
    out.mkdir(parents=True, exist_ok=False)
    (ROOT / 'work').mkdir(exist_ok=True)  # Existing fixture scratch location.
    runs = [('old640-rent', 'rent', OLD),
        ('selected642-rent', 'rent', CURRENT), ('selected642-lengths', 'lengths', CURRENT),
        ('selected643-rent', 'rent', LATEST), ('selected643-lengths', 'lengths', LATEST)]
    for label, matrix, candidate in runs:
        if a.only_643 and not label.startswith('selected643'):
            continue
        d = out / label
        d.mkdir()
        # An absent cache prefix forces import source reads for the audit hook.
        env = dict(os.environ, PYTHONPYCACHEPREFIX=str(d / 'absent-bytecode-cache'))
        command = [sys.executable, '-B', str(HERE / 'observer.py'),
            str(d / 'transactions.json.gz'), str(HERE / 'probe.py'), '--matrix', matrix,
            '--candidate', str(ROOT / candidate), '--output', str(d / 'report.json.gz')]
        receipt = dict(argv=command, cwd=str(ROOT),
            env={'PYTHONPYCACHEPREFIX': env['PYTHONPYCACHEPREFIX']},
            started_utc=datetime.datetime.now(datetime.timezone.utc).isoformat())
        with (d / 'command.log').open('wb') as log:
            result = subprocess.run(command, cwd=ROOT, env=env, stdout=log, stderr=subprocess.STDOUT)
        receipt.update(exit_code=result.returncode,
            finished_utc=datetime.datetime.now(datetime.timezone.utc).isoformat())
        (d / 'command.json').write_text(json.dumps(receipt, indent=2)+'\n')
        print(label, result.returncode, flush=True)
        result.check_returncode()


if __name__ == '__main__':
    main()
