#!/usr/bin/env python3
"""For each unmatched original window in a range, find the nearest candidate body and classify diffs."""
import sys, json, difflib, collections, argparse
from sbfdis import *

def seq(elf, s, e):
    return lines(elf, s, e)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--measure', required=True)
    ap.add_argument('--cand', default=None)
    ap.add_argument('--lo', type=lambda x:int(x,0), default=0x2288)
    ap.add_argument('--hi', type=lambda x:int(x,0), default=0x3a5a0)
    ap.add_argument('--out', required=True)
    a = ap.parse_args()
    o = load(); c = cand(a.cand)
    m = json.load(open(a.measure))
    # candidate funcs that are already matched by some original window
    matched_c = set()
    for r in m['rows']:
        for x in r['matches']: matched_c.add(x['start'])
    cf = [f for f in c.funcs]
    cseq = {}
    def cs(f):
        if f['start'] not in cseq: cseq[f['start']] = seq(c, f['start'], f['start']+f['size'])
        return cseq[f['start']]
    hist = {}
    def h(lst):
        return collections.Counter(t.split(' ')[0] for t in lst)
    res = []
    for r in m['rows']:
        if r['matches'] or not (a.lo <= r['start'] <= a.hi): continue
        s, e = r['start'], r['end']; osq = seq(o, s, e); oh = h(osq); n = len(osq)
        scored = []
        for f in cf:
            if abs(f['size']-(e-s)) > max(64, 0.35*(e-s)): continue
            ch = h(cs(f))
            inter = sum((oh & ch).values()); score = 2*inter/(n+len(cs(f)))
            scored.append((score, f))
        scored.sort(key=lambda x: -x[0])
        best = []
        for score, f in scored[:8]:
            sm = difflib.SequenceMatcher(None, osq, cs(f), autojunk=False)
            ops = [op for op in sm.get_opcodes() if op[0] != 'equal']
            diffs = []
            for tag, i1, i2, j1, j2 in ops:
                diffs.append({'tag': tag, 'o': osq[i1:i2][:6], 'c': cs(f)[j1:j2][:6], 'on': i2-i1, 'cn': j2-j1})
            best.append({'ratio': round(sm.ratio(),4), 'start': f['start'], 'size': f['size'], 'name': f['name'], 'already_matched': f['start'] in matched_c, 'ndiff_ops': len(ops), 'diffs': diffs[:12]})
        best.sort(key=lambda x: -x['ratio'])
        res.append({'start': s, 'end': e, 'size': e-s, 'n': n, 'best': best[:3]})
        b = best[0] if best else None
        print(f"{s:#8x} {e-s:6d} ", f"{b['ratio']:.3f} {b['size']:6d} ndiff={b['ndiff_ops']:3d} {'M' if b['already_matched'] else ' '} {b['name'][:90]}" if b else 'none', flush=True)
    json.dump(res, open(a.out,'w'), indent=1)

if __name__ == '__main__':
    main()
