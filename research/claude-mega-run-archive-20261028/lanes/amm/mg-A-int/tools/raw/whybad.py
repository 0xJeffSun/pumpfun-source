#!/usr/bin/env python3
"""whybad.py CAND_SYMBOLS.so MAP : group not-raw-ready windows' wrong data slots by candidate atom."""
import sys, collections, json, types
sys.path.insert(0, '/Users/shawwalters/amm100-run/lanes/mg-A-raw/tools')
import lay
from pathlib import Path
L = lay.Layout(sys.argv[1], sys.argv[2])
mm = types.ModuleType('measure'); pm = lay.T / 'measure.py'; mm.__file__ = str(pm)
exec(compile(pm.read_text().split("if __name__ == '__main__':")[0], str(pm), 'exec'), mm.__dict__)
_, rows = mm.measure(sys.argv[1]); pr = L.predict(rows)
bya = collections.defaultdict(lambda: [set(), 0, collections.Counter()])
for w, v in pr.items():
    if v['ready']: continue
    for b in v['bad']:
        if 'cand' not in b or not b['kind'].startswith('data'): continue
        i, d = L.datom(int(b['cand'], 16)); r = L.drows[i]
        k = (r['owner'][-28:], r['sec'], r['size'])
        bya[k][0].add(w); bya[k][1] += 1
        bya[k][2][(d, int(b['orig'], 16) - L.dplace.get(i, 0) if i in L.dplace else None)] += 1
for k, (ws, n, dd) in sorted(bya.items(), key=lambda x: -len(x[1][0])):
    print(len(ws), n, k, 'placed@', 'pieces(cand_off->orig_off-delta):', list(dd.items())[:6])
print('not ready:', sorted(w for w, v in pr.items() if not v['ready']))
