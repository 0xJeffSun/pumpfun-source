# usage: rtsum.py RUNTIME_DIR [OUT.json]  -> recompute runtime counts from saved outputs (stdlib only)
import json, gzip, re, sys
from pathlib import Path
D = Path(sys.argv[1]) / 'runtime'
load = lambda p: json.loads(gzip.decompress(p.read_bytes()) if p.suffix == '.gz' else p.read_bytes())
CU = re.compile(r'Program \S+ consumed \d+ of \d+ compute units')
logs = lambda r: [s for s in r['logs'] if not CU.fullmatch(s)]
out = dict(trades={}, sweeps={}, initializer={}, target_rates={})
MAY = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
ev = lambda r: [l for l in r['metadata']['logs'] if l.startswith('Program data: ')]
nl = lambda r: [CU.sub('Program <p> consumed <cu>', l) for l in r['metadata']['logs']]
def tdiff(c):
    o, n = c['original'], c['candidate']
    bad = [ph for ph in ('before', 'after') if {k: v for k, v in o[ph].items() if k != MAY} != {k: v for k, v in n[ph].items() if k != MAY}]
    bad += ['error'] * (o['error'] != n['error']) + [f for f in ('inner_instructions', 'return_data') if o['metadata'][f] != n['metadata'][f]]
    bad += ['events'] * (ev(o) != ev(n)) + ['logs'] * (nl(o) != nl(n))
    return bad
cmds = load(D / 'trades/commands.json')
for run in cmds['runs']:
    f = run['family']; d = load(D / 'trades' / (f + '.json'))
    bad = [i for i, c in enumerate(d['cases']) if c['different_fields'] or c['normalized_log_difference'] or tdiff(c)]
    out['trades'][f] = dict(cases=d['case_count'], listed=len(d['cases']), mismatches=len(d['mismatches']),
                            log_diffs=len(d['normalized_log_differences']), recomputed_bad=len(bad),
                            signed_transactions=d['signed_transactions'], candidate_sha256=d['candidate_sha256'])
for suite in ('sweeps', 'rates'):
    d = load(D / 'sweeps' / (suite + '.json.gz')); bad = 0; ctrl_logs = 0
    for row in d['cases']:
        a, b, c = (row['results'][s] for s in ('original', 'control', 'candidate'))
        if any(not (a[k] == b[k] == c[k]) for k in ('error', 'accounts', 'events', 'inner', 'return_data')) or logs(a) != logs(c): bad += 1
        ctrl_logs += logs(a) != logs(b)
    out['sweeps'][suite] = dict(cases=d['count'], listed=len(d['cases']), mismatches=bad, control_log_diffs=ctrl_logs,
                                signed_records=sum(len(r['receipts']) for r in d['cases']), binaries=d['binaries'])
for k in ('rejections', 'pump-cpi'):
    d = load(D / 'initializer' / (k + '.json.gz'))
    out['initializer'][k] = dict(cases=d['case_count'], listed=len(d['cases']), mismatches=len(d['mismatches']),
                                 recomputed_bad=sum(bool(c['differences']) for c in d['cases']), candidate_sha256=d['candidate_sha256'],
                                 signed_records=sum(len(c['original_executions']) + len(c['candidate_executions']) for c in d['cases']))
d = load(D / 'target-rates/differential.json'); a = load(D / 'target-rates/attested.json.gz')
out['target_rates'] = dict(cases=d['case_count'], listed=len(d['cases']), mismatches=len(d['mismatches']),
                           log_diffs=len(d['log_differences_modulo_cu']), candidate_vs_parent=len(d['candidate_vs_parent_differences']),
                           recomputed_bad=sum(not (c['equal'] and c['logs_equal_modulo_cu']) for c in d['cases']),
                           attested_records=sum(map(len, a['records'].values())), attested_binaries=len(a['records']),
                           original_outcomes=d['original_outcomes'])
t = out['trades']
out['totals'] = dict(trade_families=len(t), trade_cases=sum(v['cases'] for v in t.values()),
                     trade_mismatches=sum(v['mismatches'] + v['log_diffs'] + v['recomputed_bad'] for v in t.values()),
                     trade_signed_transactions=sum(v['signed_transactions'] for v in t.values()),
                     sweep_cases=out['sweeps']['sweeps']['cases'], rate_cases=out['sweeps']['rates']['cases'],
                     sweep_mismatches=out['sweeps']['sweeps']['mismatches'] + out['sweeps']['rates']['mismatches'],
                     initializer_cases=sum(v['cases'] for v in out['initializer'].values()),
                     initializer_mismatches=sum(v['mismatches'] + v['recomputed_bad'] for v in out['initializer'].values()),
                     target_rate_cases=out['target_rates']['cases'],
                     target_rate_mismatches=out['target_rates']['mismatches'] + out['target_rates']['log_diffs'] + out['target_rates']['recomputed_bad'])
s = json.dumps(out, indent=1)
if len(sys.argv) > 2: Path(sys.argv[2]).write_text(s + '\n')
print(json.dumps(out['totals'])); print({k: v['signed_records'] for k, v in out['sweeps'].items()}, out['target_rates']['attested_records'],
      {k: v['signed_records'] for k, v in out['initializer'].items()}, 'ctrl_log_diffs', {k: v['control_log_diffs'] for k, v in out['sweeps'].items()})
