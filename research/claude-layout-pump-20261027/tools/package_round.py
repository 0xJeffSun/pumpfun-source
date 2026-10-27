#!/usr/bin/env python3
"""Assemble one round's evidence directory (roundNN/) and its claims.json.

Inputs are lane-scratch directories produced by build.py (default-layout
baseline), derive_layout.py (layout) and either build.py --linker-script
(ordered builds) or relink.py (relink-only rounds). Measurement, translation,
residual, identification and unlock outputs are recomputed here from the saved
ELF and maps, so the packet never depends on scratch-only results.
"""
import sys
sys.dont_write_bytecode = True  # keep the packet free of __pycache__
import argparse
import gzip
import hashlib
import json
import shutil
from pathlib import Path

import classify
import disclose
import measure
import translation
import unlock

HERE = Path(__file__).resolve().parent
P = HERE.parent
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()


def gz(src, dst):
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_bytes(gzip.compress(Path(src).read_bytes(), compresslevel=9, mtime=0))


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--round', required=True)
    ap.add_argument('--frontier', required=True, help='repro/pump/main-contract-roundNN-20261027')
    ap.add_argument('--baseline-build', type=Path, required=True)
    ap.add_argument('--layout', type=Path, required=True)
    ap.add_argument('--ordered-builds', type=Path, nargs='*', default=[])
    ap.add_argument('--relink', type=Path, help='relink.py output (relink-only round)')
    ap.add_argument('--runtime-summary', type=Path)
    ap.add_argument('--runtime-adapter-dir', type=Path)
    ap.add_argument('--policy-controls', type=Path, help='policy_controls.py output for this round')
    a = ap.parse_args()
    root = measure.ROOT
    frontier = root / a.frontier
    cp = json.loads((frontier / 'CHECKPOINT.json').read_text())
    d = P / a.round
    previous_identification = None
    if (d / 'ordered/archive-identification.json').is_file():
        previous_identification = (d / 'ordered/archive-identification.json').read_bytes()
    if d.exists():
        shutil.rmtree(d)
    (d / 'baseline').mkdir(parents=True)
    (d / 'ordered').mkdir()
    shutil.copy2(a.layout / 'ordered.ld', d / 'ordered.ld')
    gz(a.layout / 'plan.json', d / 'plan.json.gz')
    b = a.baseline_build
    gz(b / 'link/link.map', d / 'baseline/link.map.gz')
    shutil.copy2(b / 'build-comparison.json', d / 'baseline/build.json')
    shutil.copy2(b / 'link/linker-invocation.json', d / 'baseline/linker-invocation.json')
    gz(b / 'build.log', d / 'baseline/build.log.gz')
    assert sha(b / 'unstripped.so') == cp['unstripped_sha256'], 'baseline build does not reproduce the published round'
    if a.ordered_builds:
        first = a.ordered_builds[0]
        elf, omap = first / 'unstripped.so', first / 'link/link.map'
        names, kinds = [], []
        for i, ob in enumerate(a.ordered_builds):
            tag = ['first', 'second', 'third'][i]
            assert sha(ob / 'unstripped.so') == sha(elf) and sha(ob / 'candidate.so') == sha(first / 'candidate.so')
            shutil.copy2(ob / 'build-comparison.json', d / f'ordered/build-{tag}.json')
            shutil.copy2(ob / 'link/linker-invocation.json', d / f'ordered/linker-invocation-{tag}.json')
            gz(ob / 'build.log', d / f'ordered/build-{tag}.log.gz')
            names.append(f'build-{tag}.json')
            compiled = sum(1 for line in (ob / 'build.log').read_text().splitlines() if line.strip().startswith('Compiling '))
            persistent = json.loads((ob / 'build-comparison.json').read_text()).get('persistent')
            kinds.append(f'{compiled} crates compiled' + (' (persistent target: root package cleaned and recompiled, dependencies reused)' if persistent else ''))
        cand_sha = sha(first / 'candidate.so')
        evidence = f'{len(names)} real build(s) with identical artifacts, equal to the relink: ' + '; '.join(kinds)
    else:
        elf, omap = a.relink / 'unstripped.so', a.relink / 'link.map'
        shutil.copy2(a.relink / 'relink.json', d / 'ordered/relink.json')
        names, cand_sha = [], sha(a.relink / 'candidate.so')
        evidence = 'relink of the recorded default-layout build with the generated script (relink output equals build.py output on every round where both ran)'
    gz(elf, d / 'ordered/unstripped.so.gz')
    gz(omap, d / 'ordered/link.map.gz')
    stripped = (a.ordered_builds[0] if a.ordered_builds else a.relink) / 'candidate.so'
    assert sha(stripped) == cand_sha
    gz(stripped, d / 'ordered/candidate.so.gz')
    windows_from = frontier / 'inventory.json.gz'
    windows = [{'start': w['start'], 'bytes': w['bytes']} for w in measure.read(windows_from)['windows']]
    base = measure.inventory(frontier / 'unstripped.so', windows)
    new = measure.inventory(elf, windows)
    (d / 'ordered/inventory.json.gz').write_bytes(gzip.compress(json.dumps(new, indent=1).encode(), mtime=0))
    tr = translation.check(frontier / 'unstripped.so', b / 'link/link.map', elf, omap)
    (d / 'ordered/translation.json').write_text(json.dumps(tr, indent=1) + '\n')
    plan = json.loads((a.layout / 'plan.json').read_text())
    res = classify.classify(new, plan, root / 'evidence/original/pump/deployed.so', elf, omap)
    (d / 'ordered/residuals.json.gz').write_bytes(gzip.compress(json.dumps(res, indent=1).encode(), mtime=0))
    ra = {w['start'] for w in base['windows'] if w['raw_match']}
    rb = {w['start'] for w in new['windows'] if w['raw_match']}
    na = {w['start'] for w in base['windows'] if w['normalized_matches']}
    nb = {w['start'] for w in new['windows'] if w['normalized_matches']}
    assert not (ra - rb) and not (na - nb), 'a match was lost'
    claims = {'frontier_packet': a.frontier,
              'baseline': {'unstripped_sha256': cp['unstripped_sha256'], 'candidate_sha256': cp['candidate_sha256'],
                           **{k: base['counts'][k] for k in ['normalized', 'raw', 'unmatched', 'matched_text_bytes', 'raw_text_bytes']}},
              'ordered': {'unstripped_sha256': sha(elf), 'candidate_sha256': cand_sha,
                          **{k: new['counts'][k] for k in ['normalized', 'raw', 'unmatched', 'matched_text_bytes', 'raw_text_bytes']}},
              'raw_gained_windows': sorted(rb - ra), 'raw_lost_windows': [], 'normalized_lost_windows': [],
              'translation': tr,
              'correspondence': disclose.disclose(plan['sections'], base),
              'call_only_blockers_top12': res['call_only_blockers'][:12],
              'residual_classes': res['counts'], 'residual_data_operands': res['data_operands'],
              'ordered_builds': names, 'evidence': evidence}
    if a.runtime_summary:
        (d / 'runtime/suites').mkdir(parents=True)
        shutil.copy2(a.runtime_summary, d / 'runtime/summary.json')
        for name in ['build-comparison.json', 'build-attempt.json']:
            shutil.copy2(a.runtime_adapter_dir / name, d / f'runtime/validator-{name}')
        s = json.loads(a.runtime_summary.read_text())
        assert s['candidate_sha256'] == cand_sha
        retained = a.runtime_adapter_dir / 'full.json.gz.suites'
        for row in s['suites']:
            src = retained / (row['suite'] + '.json.gz')
            assert sha(src) == row['result_sha256'], row['suite']
            shutil.copy2(src, d / 'runtime/suites' / (row['suite'] + '.json.gz'))
            gz(retained / (row['suite'] + '.loader.json'), d / 'runtime/suites' / (row['suite'] + '.loader.json.gz'))
        claims['runtime'] = {'summary': 'runtime/summary.json', 'suite_count': s['suite_count'], 'case_count': s['case_count'],
                             'diagnostic_log_cases': s['diagnostic_log_cases'], 'diagnostic_mismatches': s['diagnostic_mismatches']}
    # dependency-archive identification of unmatched windows and blocker pricing
    import subprocess, sys
    link = json.loads((b / 'link/linker-invocation.json').read_text())
    if all(Path(x).is_file() for x in link['incoming'] if x.endswith('.rlib')):
        subprocess.run([sys.executable, str(HERE / 'archive_identify.py'), '--linker-invocation', str(b / 'link/linker-invocation.json'),
                        '--windows', str(d / 'ordered/inventory.json.gz'), '--output', str(d / 'ordered/archive-identification.json')],
                       check=True, stdout=subprocess.DEVNULL)
    elif previous_identification:  # dependency archives no longer present: keep the earlier identical-input result
        (d / 'ordered/archive-identification.json').write_bytes(previous_identification)
    u = unlock.compute(plan, windows, frontier / 'unstripped.so')
    (d / 'ordered/unlock.json').write_text(json.dumps(u, indent=1) + '\n')
    claims['unlock'] = {'call_only_raw_now': u['call_only_raw_now'], 'raw_if_all_size_changing_windows_neutral': u['call_only_raw_if_all_neutral'],
                        'regions': [{k: r[k] for k in ['region', 'bytes', 'raw_if_neutral', 'gain']} | {'windows': len(r['windows'])} for r in u['regions']]}
    if a.policy_controls:
        pc = json.loads(a.policy_controls.read_text())
        assert pc['frontier_packet'] == a.frontier and pc['controls']['adopted']['unstripped_sha256'] == sha(elf)
        shutil.copy2(a.policy_controls, d / 'policy-controls.json')
    (d / 'claims.json').write_text(json.dumps(claims, indent=1) + '\n')
    print(json.dumps({'round': a.round, 'raw': [base['counts']['raw'], new['counts']['raw']],
                      'normalized': [base['counts']['normalized'], new['counts']['normalized']],
                      'gained': [hex(x) for x in sorted(rb - ra)], 'evidence': evidence}))


if __name__ == '__main__':
    main()
