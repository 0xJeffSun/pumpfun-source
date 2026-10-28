#!/usr/bin/env python3
"""cmp.py CAND.so BASE_ROWS.json [--json OUT_ROWS] : measure.py rows of CAND vs BASE rows: normalized+raw gains/losses."""
import json, sys, types
from pathlib import Path
T = Path('/Users/shawwalters/amm100-run/shared/tools')
m = types.ModuleType('measure'); p = T / 'measure.py'; m.__file__ = str(p)
src = p.read_text().split("if __name__ == '__main__':")[0]
exec(compile(src, str(p), 'exec'), m.__dict__)
c, rows = m.measure(sys.argv[1])
base = {r['original']: r for r in json.loads(Path(sys.argv[2]).read_text())}
ng = [r['original'] for r in rows if r['match'] and not base[r['original']]['match']]
nl = [r['original'] for r in rows if not r['match'] and base[r['original']]['match']]
rg = [r['original'] for r in rows if r['raw'] and not base[r['original']]['raw']]
rl = [r['original'] for r in rows if not r['raw'] and base[r['original']]['raw']]
res = dict(normalized=sum(bool(r['match']) for r in rows), raw=sum(r['raw'] for r in rows),
           norm_gains=ng, norm_losses=nl, raw_gains=len(rg), raw_losses=rl, no_losses=not nl and not rl)
print(json.dumps(res) if len(rg) > 20 else json.dumps(dict(res, raw_gains=rg)))
if '--json' in sys.argv: Path(sys.argv[sys.argv.index('--json') + 1]).write_text(json.dumps(rows, indent=0))
