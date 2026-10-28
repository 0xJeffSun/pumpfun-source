# Make lane copies of the Codex qualified438 runtime controllers, retargeted (paths + expected hash only).
# usage: mkruntime.py RUNTIME_DIR CANDIDATE.so CONTROL.so CTL_DIR
import hashlib, json, shutil, sys
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-int'); K = W / 'codex438/controllers'; R = W / 'repo-ro'
D, cand, ctrl, C = (Path(x).resolve() for x in sys.argv[1:5])
CR = '/Users/shawwalters/.codex/worktrees/pr-queue-review/pumpfun-source/'
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()
(D / 'control').mkdir(parents=True); C.mkdir(parents=True, exist_ok=True)
shutil.copyfile(cand, D / 'candidate.so'); shutil.copyfile(ctrl, D / 'control/candidate.so')
exp = sha(D / 'candidate.so')
shutil.copyfile(K / 'initializer-producer.py', D / 'control/initializer-producer.py')
t = json.loads((K / 'trade-template.json').read_bytes())
for row in t['runs']:
    row['command'] = [x.replace(CR, str(R) + '/') for x in row['command']]
    assert not any('.codex' in x for x in row['command'])
(D / 'control/trade-template.json').write_text(json.dumps(t, indent=2) + '\n')
common = [("R=Path.cwd();D=R/'work/latest-review-20261027/qualified438-runtime'", f"R=Path({str(R)!r});D=Path({str(D)!r})"),
          ('b69ee99d83cb1eaaa999082dc707560e95e1540174f27b5e6a8e1438cc4c34fc', exp)]
extra = {'run_trades.py': [("template=Path(__file__).parent/'trade-template.json'", "template=D/'control/trade-template.json'"),
                           ('Fresh438 signed trade matrix', f'Fresh signed trade matrix (mg-M-int, candidate {exp[:8]})')],
         'run_target_rates.py': [("R=Path.cwd();W=R/'work/mayhem-priority-20261027';D=R/'work/latest-review-20261027/qualified438-runtime'",
                                  f"R=Path({str(R)!r});W=R/'work/mayhem-priority-20261027';D=Path({str(D)!r})"),
                                 ("driver=R/'work/latest-review-20261027/claude-fees-final-mayhem-o0073/tools/o73_ratelimit_differential.py'",
                                  "driver=R/'research/claude-fees-final-mayhem-o0073/tools/o73_ratelimit_differential.py'")]}
for n in ['run_trades.py', 'run_sweeps.py', 'run_initializer.py', 'run_target_rates.py']:
    s = (K / n).read_text()
    for a, b in extra.get(n, []) + common:
        if a in s: s = s.replace(a, b)
        elif a.startswith('b69ee') or a.startswith('R=Path.cwd()'): pass
        else: raise SystemExit(f'{n}: pattern missing {a[:40]}')
    assert 'Path.cwd()' not in s and 'latest-review' not in s, n
    (C / n).write_text(s)
print('expected', exp[:16], 'control', sha(D / 'control/candidate.so')[:16])
