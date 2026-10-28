#!/usr/bin/env python3
"""Run the 14 Mayhem trade differential suites against one candidate.

The suite commands come from
research/mayhem-initializer-current-recovery-20261027/runtime/trades/commands.json.
Their Codex worktree prefix is rewritten to ROOT (a checkout with scripts/, repro/mayhem,
evidence/), and --candidate/--output are replaced.

usage: python -B run_trades.py ROOT CANDIDATE OUTDIR [JOBS] [--summarize-only]
Writes OUTDIR/<family>.json per suite and OUTDIR/summary.json with case counts,
mismatches and non-compute-unit log differences.
"""
import concurrent.futures as cf, json, re, subprocess, sys
from pathlib import Path

root, cand, out = Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve(), Path(sys.argv[3]).resolve()
jobs = int(sys.argv[4]) if len(sys.argv) > 4 else 3
out.mkdir(parents=True, exist_ok=True)
spec = json.loads((root / 'research/mayhem-initializer-current-recovery-20261027/runtime/trades/commands.json').read_text())
CX = '/Users/shawwalters/.codex/worktrees/pr-queue-review/pumpfun-source/'
PY = '/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/test-env/bin/python'
CU = re.compile(r'consumed \d+ of \d+ compute units')


def pairs(x):
    if isinstance(x, dict):
        if isinstance(x.get('original'), dict) and isinstance(x.get('candidate'), dict):
            yield x['original'], x['candidate']
        else:
            for v in x.values():
                yield from pairs(v)
    elif isinstance(x, list):
        for v in x:
            yield from pairs(v)


SUMMARIZE_ONLY = len(sys.argv) > 5 and sys.argv[5] == '--summarize-only'


def run(r):
    fam = r['family']; cmd = list(r['command']); cmd[0] = PY
    cmd = [a.replace(CX, str(root) + '/') for a in cmd]
    cmd[cmd.index('--candidate') + 1] = str(cand)
    cmd[cmd.index('--output') + 1] = str(out / f'{fam}.json')
    if SUMMARIZE_ONLY:
        p = subprocess.CompletedProcess(cmd, 0 if (out / f'{fam}.json').exists() else 1, '', '')
    else:
        p = subprocess.run(cmd, cwd=root, capture_output=True, text=True)
    row = {'family': fam, 'returncode': p.returncode, 'expected_cases': r.get('cases')}
    try:
        d = json.loads((out / f'{fam}.json').read_text())
        mm = d.get('mismatches', d.get('failures'))
        row['cases'] = d.get('case_count', d.get('cases') if isinstance(d.get('cases'), int) else len(d.get('cases', [])))
        row['mismatches'] = len(mm) if isinstance(mm, list) else mm
        n = diff = 0
        for o, c in pairs(d):
            if 'logs' in o and 'logs' in c:
                n += 1
                diff += [l for l in o['logs'] if not CU.search(l)] != [l for l in c['logs'] if not CU.search(l)]
        nl = d.get('normalized_log_differences')
        if nl is not None:  # the trade harnesses report their own normalized log comparison
            row['noncompute_log_diffs'] = len(nl) if isinstance(nl, list) else nl
            row['log_compared'] = row['cases']
        else:
            row['log_compared'] = n; row['noncompute_log_diffs'] = diff
        row['signed_transactions'] = d.get('signed_transactions')
    except Exception as e:  # noqa: BLE001
        row['error'] = repr(e); row['stderr_tail'] = p.stderr[-800:]
    print(json.dumps(row), flush=True)
    return row


with cf.ThreadPoolExecutor(jobs) as ex:
    rows = list(ex.map(run, spec['runs']))
summary = {'candidate': str(cand), 'runs': rows,
           'total_cases': sum(r.get('cases') or 0 for r in rows),
           'total_mismatches': sum(r.get('mismatches') or 0 for r in rows),
           'total_noncompute_log_diffs': sum(r.get('noncompute_log_diffs') or 0 for r in rows),
           'all_ok': all(r['returncode'] == 0 and r.get('mismatches') == 0 for r in rows)}
(out / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
print(json.dumps({k: v for k, v in summary.items() if k != 'runs'}))
