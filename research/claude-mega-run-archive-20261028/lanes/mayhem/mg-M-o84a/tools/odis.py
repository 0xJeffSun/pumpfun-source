#!/usr/bin/env python3
"""odis.py START END [grep] -- print original deployed disassembly (absolute offsets) in [START,END)."""
import sys, re
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build')
import objsec, sbfdis, winreport
O = winreport.O
s, e = int(sys.argv[1]), int(sys.argv[2])
pat = sys.argv[3] if len(sys.argv) > 3 else None
code = O.b[s:e]
for pc, raw in objsec.insns(code):
    t = sbfdis.decode(code, None, pc, pc + len(raw), None, None)[0]['text']
    if pat is None or re.search(pat, t): print(f'{s+pc:7d} {pc:6d} {t}')
