#!/usr/bin/env python3
"""List an ambiguous identical-closure family: original closures (S file:line, callers) and candidate closures
(S file:line, caller symbols).  usage: closures.py --pairs pairs.json --candidate-symbols unstripped.so --windows 0x..,0x.."""
import argparse, collections, json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from sites import Sites
import cxxfilt_lite as dm
ap = argparse.ArgumentParser(); ap.add_argument('--pairs'); ap.add_argument('--candidate-symbols'); ap.add_argument('--windows')
a = ap.parse_args()
P = json.load(open(a.pairs))
O = Sites(P['original']); C = Sites(a.candidate_symbols)
def callers(st):
    d = collections.defaultdict(list)
    for at, t in st.elf.calls.items():
        w = st.window_of(at)
        d[t].append((w[0], at - w[0], w[2]) if w else (None, at, ''))
    return d
oc, cc = callers(O), callers(C)
os_ = collections.defaultdict(list)
for s in O.s_sites: os_[s['win']].append(s)
cs_ = collections.defaultdict(list)
for s in C.s_sites: cs_[s['win']].append(s)
wins = {w['start']: w for w in P['windows']}
seen = set()
for x in a.windows.split(','):
    st = int(x, 16); w = wins[st]
    print('O %#x %s:%s callers %s' % (st, *(lambda s: (s['file'].split('src/')[-1], s['line']) if s else ('?', '?'))(os_[st][0] if os_[st] else None),
          ['%#x+%#x' % (c[0], c[1]) for c in oc.get(st, [])]))
    for c in w.get('cands', []):
        seen.add(c)
for c in sorted(seen):
    s = cs_[c][0] if cs_[c] else None
    print('C %#x %s:%s callers %s' % (c, s['file'].split('src/')[-1] if s else '?', s['line'] if s else '?',
          [dm.short(k[2]) + '+%#x' % k[1] for k in cc.get(c, [])]))
