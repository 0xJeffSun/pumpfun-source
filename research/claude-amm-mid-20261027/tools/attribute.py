#!/usr/bin/env python3
"""Attribute unmatched original windows to their most similar candidate symbols.
Read-only; hypotheses only (similarity is not equivalence)."""
import argparse, collections, difflib, json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from sbf import load, tokens


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--candidate', required=True)
    p.add_argument('--symbols', required=True)
    p.add_argument('--measure', required=True)
    p.add_argument('--lo', type=lambda x: int(x, 0), default=0x3d828)
    p.add_argument('--hi', type=lambda x: int(x, 0), default=0x724a0)
    p.add_argument('--top', type=int, default=3)
    p.add_argument('--output')
    a = p.parse_args()
    o, c, s = load(a.candidate, a.symbols)
    m = json.load(open(a.measure))
    rows = m['rows']
    orig2cand = {}
    claimed = collections.Counter()
    for r in rows:
        if r['matches']:
            orig2cand[r['start']] = r['matches'][0]['name']
            for mm in r['matches']:
                claimed[mm['start']] += 1
    cstart2name = {f['start']: f['name'] for f in s.funcs}
    funcs = sorted(s.funcs, key=lambda f: f['start'])

    def oname(t):
        return orig2cand.get(t, 'U:%x' % t)

    def cname(t):
        return cstart2name.get(t, 'c:%x' % t)

    targets = [r for r in rows if not r['matches'] and a.lo <= r['start'] <= a.hi]
    ctoks = {}
    for f in funcs:
        ctoks[f['start']] = tokens(s, f['start'], f['start'] + f['size'], cname, mask_frame=True)
    out = []
    for r in targets:
        st, en = r['start'], r['end']
        ot = tokens(o, st, en, oname, mask_frame=True)
        ocalls = collections.Counter(t[1] for t in ot if t[0] in ('call', 'syscall'))
        scored = []
        for f in funcs:
            n = f['size']
            if not (0.5 * (en - st) <= n <= 2.0 * (en - st)):
                continue
            ct = ctoks[f['start']]
            ccalls = collections.Counter(t[1] for t in ct if t[0] in ('call', 'syscall'))
            inter = sum((ocalls & ccalls).values()); union = sum((ocalls | ccalls).values()) or 1
            jac = inter / union
            sm = difflib.SequenceMatcher(None, ot, ct, autojunk=False)
            q = sm.quick_ratio()
            scored.append([jac * 0.5 + q * 0.5, jac, q, f, sm])
        scored.sort(key=lambda x: -x[0])
        best = []
        for sc, jac, q, f, sm in scored[:8]:
            ratio = sm.ratio()
            best.append({'name': f['name'], 'start': f['start'], 'size': f['size'], 'jaccard_calls': round(jac, 3),
                         'ratio': round(ratio, 3), 'claimed_by_orig': claimed.get(f['start'], 0)})
        best.sort(key=lambda b: -(b['ratio'] * 0.6 + b['jaccard_calls'] * 0.4))
        out.append({'start': st, 'end': en, 'size': en - st, 'callers': sorted({o_at for o_at, t in o.calls.items() if t == st}),
                    'best': best[:a.top]})
        b0 = best[0] if best else None
        print('%06x %6d  %s' % (st, en - st, '' if not b0 else '%-.95s  sz=%d r=%.3f j=%.3f cl=%d' % (b0['name'], b0['size'], b0['ratio'], b0['jaccard_calls'], b0['claimed_by_orig'])), flush=True)
    if a.output:
        Path(a.output).write_text(json.dumps(out, indent=1) + '\n')


if __name__ == '__main__':
    main()
