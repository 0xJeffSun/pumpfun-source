"""Fresh signed deposit triples around the two preserved overflow branches."""
from pathlib import Path
import argparse
import hashlib
import json
import os
import re
import struct
import sys

ROOT = Path(__file__).resolve().parents[2]
os.environ['PUMP_AMM_FRESH_VM'] = '1'
sys.path.insert(0, str(ROOT / 'scripts'))
import pump_amm_liquidity_differential as h


def cases():
    maximum = 2**127 - 1
    return [dict(name=n, amount=a, virtual=v, supply=s, error_line=line) for n, a, v, s, line in [
        ('unboosted', 1, 0, 2, None), ('boosted', 1, 1000, 2, None),
        ('wide-value', 1, 2**64, 2, None), ('zero-change', 0, maximum, 2, None),
        ('conversion-below', 2, 2**126 - 1, 1, 162),
        ('conversion-at', 2, 2**126, 1, 160),
        ('conversion-above', 2, 2**126 + 1, 1, 160),
        ('conversion-maximum', 2, maximum, 1, 160),
        ('addition-maximum', 1, maximum, 2, 162),
        ('addition-max-minus-one', 1, maximum - 1, 2, 162),
        ('addition-equal-supply', 2, maximum, 2, 162),
        ('multiply-overflow', 3, maximum, 1, 154),
    ]]


def observed(result):
    # Preserve every non-compute log verbatim; compare the remaining fields exactly.
    return {**result, 'logs': [line for line in result['logs'] if not re.fullmatch(
        r'Program \S+ consumed \d+ of \d+ compute units', line)]}


def main():
    parser = argparse.ArgumentParser(__doc__)
    parser.add_argument('--candidate', type=Path, required=True)
    parser.add_argument('--control', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    rows = []
    for case in cases():
        override = h.combine(h.mutate(h.pool, 203, struct.pack('<Q', case['supply'])),
                             h.mutate(h.vaultbase, 64, struct.pack('<Q', 100)),
                             h.mutate(h.vaultquote, 64, struct.pack('<Q', 100)))
        kwargs = dict(amount=case['amount'], virtual=case['virtual'],
                      mint_supply=case['supply'], overrides=override)
        a = h.run('deposit', **kwargs)
        b = h.run('deposit', candidate=args.control, **kwargs)
        c = h.run('deposit', candidate=args.candidate, **kwargs)
        if case['error_line'] is None:
            assert a['error'] is None, case
        else:
            assert a['error'] is not None and any(
                f"deposit.rs:{case['error_line']}." in line for line in a['logs']), case
        rows.append(dict(case=case, original=a, control=b, candidate=c,
                         match=observed(a) == observed(c),
                         control_exact=b == c, raw_logs_equal=a['logs'] == c['logs']))
    digest = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
    report = dict(candidate_sha256=digest(args.candidate), control_sha256=digest(args.control),
                  original_sha256=digest(ROOT / 'evidence/original/pump_amm/deployed.so'),
                  cases=rows, mismatches=[i for i, r in enumerate(rows) if not r['match'] or not r['control_exact']])
    args.output.write_text(json.dumps(report, separators=(',', ':')) + '\n')
    print('focused:', len(rows), 'triples;', len(report['mismatches']), 'mismatches')
    raise SystemExit(bool(report['mismatches']))


if __name__ == '__main__':
    main()
