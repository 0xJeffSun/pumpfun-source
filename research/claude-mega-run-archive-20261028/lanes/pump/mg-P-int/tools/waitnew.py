#!/usr/bin/env python3
"""Block until a delivery dir W/deliveries/mg-P-* not listed in inputs/ (or given known list) gets a delivery.json, or timeout.
  waitnew.py [timeout_s]   -> prints NEW <name> ... or TIMEOUT"""
import sys, time
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'); ME = W / 'lanes/mg-P-int'
known = {p.name for p in (ME / 'inputs').iterdir()} | {l.strip() for l in (ME / 'inputs/IGNORED.txt').read_text().split()} if (ME / 'inputs/IGNORED.txt').exists() else {p.name for p in (ME / 'inputs').iterdir()}
t0 = time.time(); lim = float(sys.argv[1]) if len(sys.argv) > 1 else 540
while time.time() - t0 < lim:
    new = sorted(d.name for d in (W / 'deliveries').glob('mg-P-*') if d.name not in known and (d / 'delivery.json').exists())
    if new:
        time.sleep(5); print('NEW', ' '.join(new)); sys.exit(0)
    time.sleep(15)
print('TIMEOUT')
