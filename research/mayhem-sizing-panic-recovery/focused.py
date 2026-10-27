"""Replay BuyV2's zero-quote-reserve failure in all three quote families."""
import argparse
import gzip
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'scripts'))
import mayhem_buy_v2_fixture as fixture


def replay(control, candidate):
    rows = []
    for family in ('native', 'token', 'token22'):
        case = dict(name='quote_extreme_1_0_1', tokens=1,
                    curve_u64=[[8, 1], [16, 0]],
                    token_quote=family != 'native', quote_token22=family == 'token22')
        rows.append(dict(instruction='buy-v2', family=family, case=case,
                         results={name: fixture.run(case, binary) for name, binary in (
                             ('original', None), ('control', control), ('candidate', candidate))}))
    return dict(binaries={name: hashlib.sha256(path.read_bytes()).hexdigest()
                          for name, path in (('control', control), ('candidate', candidate))}, cases=rows)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    for name in ('control', 'candidate', 'output'):
        parser.add_argument('--' + name, required=True, type=Path)
    args = parser.parse_args()
    assert not args.output.exists()
    report = replay(args.control.resolve(), args.candidate.resolve())
    args.output.write_bytes(gzip.compress((json.dumps(report, separators=(',', ':')) + '\n').encode(), mtime=0))
    print(json.dumps(dict(cases=len(report['cases']), binaries=report['binaries'])))
