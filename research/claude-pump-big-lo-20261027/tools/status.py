#!/usr/bin/env python3
"""Per-window status of the big-lo targets in a candidate build (triage.py logic restricted to big-lo).

  status.py <unstripped.so> [--windows 0x..,0x..]
Prints: matched (normalized) / coord (equal length, only Source line/filename-length immediates differ) /
equal-len (n noncoord slots) / body (no equal-length candidate function).
"""
import argparse, json, sys
from collections import defaultdict
from pathlib import Path
H = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
sys.path.insert(0, str(H))
from score import sections, body, normalize, original_windows, score, candidate_functions  # noqa
from coords import sites, ORIG, OS  # noqa
from win import demangle  # noqa
ap = argparse.ArgumentParser()
ap.add_argument('cand', type=Path)
ap.add_argument('--windows')
ap.add_argument('--targets', type=Path, default=Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/targets/big-lo.json'))
a = ap.parse_args()
want = {int(x, 16) for x in a.windows.split(',')} if a.windows else {int(w['start'], 16) for w in json.loads(a.targets.read_text())['windows']}
blob = a.cand.read_bytes(); cs = sections(blob)
cur = score(a.cand)
bylen = defaultdict(list)
for s, n, nm in candidate_functions(a.cand):
    bylen[n].append((s, nm))
for w in original_windows():
    if w['start'] not in want:
        continue
    if cur[w['start']]['normalized']:
        print(f"{w['start']:#08x} {w['bytes']:6d} MATCHED {'raw' if cur[w['start']]['raw'] else ''} {demangle(cur[w['start']]['symbols'][0])[:90]}"); continue
    osites = sites(ORIG, OS, w['start'], w['raw'])
    cslots = set()
    for s in osites:
        cslots |= {s['len_slot'], s['line_slot']}
    on = normalize(w['raw'], w['start'], OS)
    best = None
    for (s, nm) in bylen.get(w['bytes'], []):
        cn = normalize(body(blob, cs, s, w['bytes']), s, cs)
        diff = [i for i in range(0, len(on), 8) if on[i:i + 8] != cn[i:i + 8]]
        nc = [d for d in diff if d not in cslots]
        key = (len(nc), len(diff))
        if best is None or key < best[0]:
            best = (key, s, nm)
    if best is None:
        print(f"{w['start']:#08x} {w['bytes']:6d} body")
    else:
        (nnc, nd), s, nm = best
        print(f"{w['start']:#08x} {w['bytes']:6d} {'COORD-ONLY' if nnc == 0 else 'equal-len'} noncoord={nnc} diff={nd} {s:#x} {demangle(nm)[:90]}")
