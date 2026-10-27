#!/usr/bin/env python3
"""Scan REPO/work/amm-* (read-only) for notes/measurements touching my window range."""
import json, os, re, sys, time, gzip
from pathlib import Path
R = Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work')
LO, HI = 0x3d828, 0x724a0
base = json.load(open(sys.argv[1]))
unm = {r['start'] for r in base['rows'] if not r['matches']}
mine = {s for s in unm if LO <= s <= HI}
cutoff = time.time() - float(sys.argv[2] if len(sys.argv) > 2 else 4) * 3600
hexre = re.compile(r'0x([0-9a-fA-F]{5})\b')
for d in sorted(R.glob('amm-*')):
    if not d.is_dir() or d.stat().st_mtime < cutoff:
        continue
    mentioned = set()
    for f in list(d.glob('*.md')) + list(d.glob('*/*.md')):
        try:
            t = f.read_text(errors='ignore')
        except Exception:
            continue
        for m in hexre.finditer(t):
            v = int(m.group(1), 16)
            if v in mine:
                mentioned.add(v)
    gains = set()
    for f in list(d.glob('measurement*.json')) + list(d.glob('*/measurement*.json')):
        try:
            m = json.load(open(f))
        except Exception:
            continue
        if 'rows' not in m:
            continue
        for r in m['rows']:
            if isinstance(r, dict) and r.get('matches') and r.get('start') in mine:
                gains.add((r['start'], f.name))
    if mentioned or gains:
        print(d.name, time.strftime('%H:%M', time.localtime(d.stat().st_mtime)))
        if mentioned:
            print('   notes mention:', ' '.join(hex(x) for x in sorted(mentioned)))
        if gains:
            print('   measured gains in my range:', sorted({(hex(a), b) for a, b in gains}))
