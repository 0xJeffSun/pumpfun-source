#!/usr/bin/env python3
"""Targeted original-vs-candidate differential for validate_sweep's rate-limit body (O0073).

The stock sweep suite (scripts/mayhem_validate_sweeps.py) never has a non-zero last-sweep field
and a non-zero sweep interval at the same time, so `last != 0 && interval != 0`, the
`last + interval` add (fee_recipients.rs:58:32) and the SweepFeeRateLimit require! (line 61) never
run there. This driver reuses that script's SweepFixture unchanged and adds cases that do.

  python -B o73_ratelimit_differential.py CHECKOUT CANDIDATE.so OUT.json [PARENT.so]

CHECKOUT is a repo checkout with scripts/ and evidence/ (the fixture loads the deployed original
and the captured dependency ELFs from it). Case fields map onto the fixture's own knobs:
  global_offset=166/global_value -> GlobalParams.field_10 (sweep interval, serialized offset 166)
  opaque -> FeeRecipient field_10 (bytes 0..8, native last sweep) ... field_34 (24..32, token last)
  timestamp -> Clock.unix_timestamp;  op='sweep_fees' is the trader path that calls validate_sweep.
"""
import hashlib, json, re, sys
from pathlib import Path

checkout, cand, out = Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve(), Path(sys.argv[3])
parent = Path(sys.argv[4]).resolve() if len(sys.argv) > 4 else None
sys.path.insert(0, str(checkout / 'scripts'))
import mayhem_validate_sweeps as S  # noqa: E402  (module-level code only builds the stock rows)

CU = re.compile(r'consumed \d+ of \d+ compute units')
FIELDS = ['error', 'accounts', 'events', 'inner', 'return_data']
I64 = 1 << 63


def opaque(native_last=0, token_last=0):
    b = bytearray(32)
    b[0:8] = (native_last % (1 << 64)).to_bytes(8, 'little')
    b[24:32] = (token_last % (1 << 64)).to_bytes(8, 'little')
    return b.hex()


rows = []
for native in (False, True):
    for interval in (1, 100, 200000, I64 - 1, I64, (1 << 64) - 1):
        for last in (1, 50, 100, 1000, I64 - 1, I64, (1 << 64) - 1):
            for ts in (-1000, 0, 99, 100, 101, 150, 1100, 200100, 200101, I64 - 1):
                nl, tl = (last, 0) if native else (0, last)
                rows.append(dict(op='sweep_fees', native=native, global_offset=166, global_value=interval,
                                 opaque=opaque(nl, tl), timestamp=ts))
    # field selection: the other field is non-zero, the selected one is zero -> must pass and write
    for ts in (0, 100, 200100):
        nl, tl = (0, 100) if native else (100, 0)
        rows.append(dict(op='sweep_fees', native=native, global_offset=166, global_value=200000,
                         opaque=opaque(nl, tl), timestamp=ts))
    # both fields set, different values
    for ts in (150, 1100, 200100, 200500):
        rows.append(dict(op='sweep_fees', native=native, global_offset=166, global_value=1000,
                         opaque=opaque(100, 200000), timestamp=ts))
    # admin path never calls validate_sweep: same inputs must not rate-limit
    rows.append(dict(op='sweep_fees_admin', native=native, global_offset=166, global_value=200000,
                     opaque=opaque(100, 100), timestamp=150))


def logs(r):
    return [CU.sub('consumed <cu>', x) for x in r['logs']]


def run(binary):
    fx = S.SweepFixture(binary)
    return [fx.execute(c) for c in rows]


orig_path = checkout / 'evidence/original/mayhem/deployed.so'
O, C = run(orig_path), run(cand)
P = run(parent) if parent else None
cases, mism, logd, pd = [], [], [], []
for i, (c, x, y) in enumerate(zip(rows, O, C)):
    eq = all(x[k] == y[k] for k in FIELDS)
    leq = logs(x) == logs(y)
    if not eq: mism.append(i)
    if not leq: logd.append(i)
    if P is not None and not (all(P[i][k] == y[k] for k in FIELDS) and logs(P[i]) == logs(y)):
        pd.append(i)
    cases.append(dict(case=c, original=x, candidate=y, equal=eq, logs_equal_modulo_cu=leq))
outcome = {}
for x in O:
    e = x['error'] or 'ok'
    m = re.search(r'fee_recipients\.rs:(\d+)', ' '.join(x['logs']))
    p = re.search(r'Panicked in ([^ ]+) at ([0-9:]+)', ' '.join(x['logs']))
    key = 'ok' if not x['error'] else (f'AnchorError fee_recipients.rs:{m.group(1)}' if m else
                                      (f'panic {p.group(1).split("/")[-1]}:{p.group(2)}' if p else e[:60]))
    outcome[key] = outcome.get(key, 0) + 1
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()
report = dict(scope='validate_sweep rate-limit body: last != 0 && interval != 0, add overflow, SweepFeeRateLimit, '
                    'field selection, admin bypass; stock SweepFixture, synthetic accounts',
              original_sha256=sha(orig_path), candidate_sha256=sha(cand),
              parent_sha256=sha(parent) if parent else None,
              harness_sha256={'scripts/mayhem_validate_sweeps.py': sha(checkout / 'scripts/mayhem_validate_sweeps.py'),
                               'driver': sha(__file__)},
              case_count=len(rows), mismatches=mism, log_differences_modulo_cu=logd,
              candidate_vs_parent_differences=pd if parent else None,
              original_outcomes=outcome, cases=cases)
out.write_text(json.dumps(report) + '\n')
print(json.dumps({k: report[k] for k in ('case_count', 'mismatches', 'log_differences_modulo_cu',
                                         'candidate_vs_parent_differences', 'original_outcomes')}, indent=1))
