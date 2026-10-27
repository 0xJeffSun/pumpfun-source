#!/usr/bin/env python3
"""Re-apply the layout recipe to any AMM checkpoint source (one command).

  1. default-layout Linux build of the checkpoint (captures map + SDK script);
  2. tools/dataplan.py (text order + readonly-data order) or tools/plan.py
     (--text-only) on that build;
  3. ordered Linux build with the generated script;
  4. repository AMM measurement of both builds and a no-loss comparison.

Every step writes into --work; nothing in the source tree is modified.
"""
import argparse, json, subprocess, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import plan as planmod  # noqa: E402

ROOT = planmod.ROOT


def run(cmd):
    print('+', ' '.join(map(str, cmd)), flush=True)
    subprocess.run([str(c) for c in cmd], check=True)


def measure(build, out):
    run([sys.executable, '-B', ROOT / 'repro/pump_amm/focused-diagnostics-20261026/measure.py',
         '--candidate', build / 'artifacts/candidate.so', '--symbols', build / 'artifacts/unstripped.so', '--output', out])
    return json.loads(out.read_text())


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--source', type=Path, required=True)
    ap.add_argument('--work', type=Path, required=True)
    ap.add_argument('--cargo-home', type=Path, required=True)
    ap.add_argument('--target-cache', type=Path, required=True)
    ap.add_argument('--lock', type=Path, required=True)
    ap.add_argument('--text-only', action='store_true')
    ap.add_argument('--allow-new-deps', action='store_true')
    a = ap.parse_args()
    w = a.work.resolve()
    w.mkdir(parents=True, exist_ok=False)
    common = ['--source', a.source, '--cargo-home', a.cargo_home, '--target-cache', a.target_cache, '--lock', a.lock]
    if a.allow_new_deps:
        common.append('--allow-new-deps')
    run([sys.executable, '-B', HERE / 'build_linux.py', '--output', w / 'default'] + common)
    gen = HERE / ('plan.py' if a.text_only else 'dataplan.py')
    run([sys.executable, '-B', gen, '--symbols', w / 'default/artifacts/unstripped.so', '--map', w / 'default/link/link.map',
         '--default-script', w / 'default/link/sdk-default.ld', '--out-dir', w / 'plan'])
    run([sys.executable, '-B', HERE / 'build_linux.py', '--output', w / 'ordered', '--ordered', w / 'plan/ordered.ld'] + common)
    before, after = measure(w / 'default', w / 'default-measure.json'), measure(w / 'ordered', w / 'ordered-measure.json')
    lost = [hex(x['start']) for x, y in zip(before['rows'], after['rows'])
            if (x['raw_match'] and not y['raw_match']) or (x['matches'] and not y['matches'])]
    summary = {k: [before[k], after[k]] for k in ('raw_matches', 'normalized_matches', 'unmatched')}
    summary['lost_windows'] = lost
    (w / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
    print(json.dumps(summary, indent=2))
    assert not lost, 'layout lost a match; do not adopt'


if __name__ == '__main__':
    main()
