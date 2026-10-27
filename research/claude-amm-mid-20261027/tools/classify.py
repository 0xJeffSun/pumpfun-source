#!/usr/bin/env python3
"""Classify residual differences between each unmatched window and its best candidate (from attribute.py)."""
import argparse, difflib, json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from sbf import load, insns
from wdiff import norm_key
from errsites import sites


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--candidate', required=True); p.add_argument('--symbols', required=True)
    p.add_argument('--attribution', required=True)
    a = p.parse_args()
    o, c, s = load(a.candidate, a.symbols)
    att = json.load(open(a.attribution))
    for w in att:
        st, en = w['start'], w['end']
        if not w['best']:
            print('%06x %5d none' % (st, en - st)); continue
        b = w['best'][0]
        cs, ce = b['start'], b['start'] + b['size']
        oi = list(insns(o, st, en)); ci = list(insns(s, cs, ce))
        ok = [norm_key(o, *x) for x in oi]; ck = [norm_key(s, *x) for x in ci]
        osites = sites(o, st, en); csites = sites(s, cs, ce)
        cats = {'frame': 0, 'imm': 0, 'other': 0}
        nd = 0
        if len(oi) == len(ci):
            for x, y, kx, ky in zip(oi, ci, ok, ck):
                if kx == ky:
                    continue
                nd += 1
                if x[1] == y[1] and x[2] == y[2] and x[3] == y[3] and x[5] == y[5] and (x[2] == 10 or x[3] == 10):
                    cats['frame'] += 1
                elif x[1] == y[1] and x[2] == y[2] and x[3] == y[3] and x[4] == y[4]:
                    cats['imm'] += 1
                else:
                    cats['other'] += 1
            shape = 'EQ'
        else:
            sm = difflib.SequenceMatcher(None, ok, ck, autojunk=False)
            nd = sum(max(i2 - i1, j2 - j1) for t, i1, i2, j1, j2 in sm.get_opcodes() if t != 'equal')
            shape = 'NE'
        osl = sorted({(x['file'].split('/src/')[-1], tuple(x['line_candidates'][:1])) for x in osites})
        csl = sorted({(x['file'].split('/src/')[-1], tuple(x['line_candidates'][:1])) for x in csites})
        print('%06x %5d %s cand=%5d d=%4d %s r=%.3f %-60s O:%s C:%s' % (
            st, en - st, shape, b['size'], nd, cats if shape == 'EQ' else '', b['ratio'], b['name'][-60:], osl[:4], csl[:4]))


if __name__ == '__main__':
    main()
