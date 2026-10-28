#!/usr/bin/env python3
"""rt2.py <candidate.so> <out.json>: run the frozen two-curve Pump fixture (tokenkeg_two_curve) original vs candidate
WITHOUT the build-report binding (lane-local behavior check only; integrators run the bound 44-suite corpus)."""
import importlib.util, json, sys
from pathlib import Path
ROOT = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/full')
sys.path.insert(0, str(ROOT / 'scripts'))
H = ROOT / 'repro/pump/tokenkeg-two-curve-fortyeight/harness/pump_tokenkeg_two_curve_differential.py'
spec = importlib.util.spec_from_file_location('pump_two_curve_frozen', H); fx = importlib.util.module_from_spec(spec); spec.loader.exec_module(fx)
cand = Path(sys.argv[1]).resolve(); rows = []
for name, sell, amount, mode, limit in fx.fixtures():
    o = fx.invoke(sell, amount, mode, limit); c = fx.invoke(sell, amount, mode, limit, cand)
    fields = ('error', 'events', 'inner', 'return_data', 'before', 'after', 'pump_calls', 'token_calls')
    rows.append({'case': name, 'mismatches': [k for k in fields if o[k] != c[k]], 'orig_error': o['error']})
json.dump(rows, open(sys.argv[2], 'w'), indent=0)
bad = [r for r in rows if r['mismatches']]
print(json.dumps({'cases': len(rows), 'mismatched': len(bad), 'orig_successes': sum(r['orig_error'] is None for r in rows), 'bad': bad[:5]}))
