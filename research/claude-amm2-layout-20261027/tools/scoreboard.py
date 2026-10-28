#!/usr/bin/env python3
"""Distance-to-identity scoreboard from one or more elfdiff.py JSON reports (plain or .gz).

For every region of the original ELF extent it prints, per report, the bytes that are
  in place      equal at the same file offset (identity needs all of them),
  layout-only   reproduced content at another offset or an equivalent relocated operand
                (becomes in place once everything before it has the original size and order),
  missing       content the candidate does not reproduce (unmatched windows, original-only data,
                operands whose target does not correspond, header fields that follow from sizes).
usage: scoreboard.py LABEL=report.json[.gz] [LABEL=report.json ...]
"""
import gzip, json, sys
from pathlib import Path


def load(p):
    b = Path(p).read_bytes()
    return json.loads(gzip.decompress(b) if p.endswith('.gz') else b)


def split(classes):
    good = lambda k: k == 'in-place' or 'displaced-equal' in k or k.endswith('equivalent')
    inp = classes.get('in-place', 0)
    lay = sum(v for k, v in classes.items() if good(k)) - inp
    mis = sum(v for k, v in classes.items() if not good(k))
    return inp, lay, mis


def main():
    reps = [(a.split('=', 1)[0], load(a.split('=', 1)[1])) for a in sys.argv[1:]]
    names = [r['region'] for r in reps[0][1]['regions']]
    head = '| region | original bytes | ' + ' | '.join(f'{l}: in place / layout-only / missing' for l, _ in reps) + ' |'
    print(head)
    print('| --- | ---: |' + ' ---: |' * len(reps))
    tot = [[0, 0, 0] for _ in reps]
    for n in names:
        cells, size = [], None
        for i, (_, r) in enumerate(reps):
            reg = next((x for x in r['regions'] if x['region'] == n), None)
            if reg is None:
                cells.append('-')
                continue
            s = split(reg['classes'])
            size = sum(reg['classes'].values())
            for j in range(3):
                tot[i][j] += s[j]
            cells.append(' / '.join(f'{v:,}' for v in s))
        print(f'| {n} | {size:,} | ' + ' | '.join(cells) + ' |')
    ext = sum(tot[0])
    print(f'| **ELF extent** | **{ext:,}** | ' + ' | '.join(' / '.join(f'**{v:,}**' for v in t) for t in tot) + ' |')
    for l, r in reps:
        i = r['identity']
        t = r.get('text_windows') or {}
        print(f'\n{l}: candidate {r["candidate"]["sha256"][:16]}…, extent delta {i["elf_extent_delta"]:+,} B, '
              f'complete ELF equal {i["complete_elf_equal"]}, candidate-only bytes {i["candidate_only_bytes"]:,}')


if __name__ == '__main__':
    main()
