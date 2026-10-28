#!/usr/bin/env python3
"""near.py START END [--score score.json]: original windows in [START,END) with match status + matched symbol."""
import sys, json
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import original_windows
from win import demangle
a=sys.argv[1:]; s=int(a[0],16); e=int(a[1],16)
sc='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/deliveries/mg-P-lib-01/score.json'
if '--score' in a: sc=a[a.index('--score')+1]
inv=json.load(open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L12/inventory.json'))['windows']
cur=json.load(open(sc))['windows']
for w in original_windows():
    st=w['start']
    if s<=st<e:
        m=cur.get(str(st),{}).get('normalized'); sym=inv.get(str(st),{}).get('symbols') or ['']
        print(hex(st), w['bytes'], 'M' if m else 'U', demangle(sym[0])[:90])
