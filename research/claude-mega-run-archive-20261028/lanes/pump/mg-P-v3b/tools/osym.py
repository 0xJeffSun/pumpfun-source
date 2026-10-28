#!/usr/bin/env python3
"""osym.py <inventory.json> <out.json>: map original window start (hex) -> short name of matched symbol (or '?<hex>' if unmatched)."""
import json,sys,re
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from win import demangle
d=json.load(open(sys.argv[1]))['windows']; out={}
for k,v in d.items():
    a=int(k)
    if v.get('normalized') and v.get('symbols'):
        n=demangle(v['symbols'][0]); n=re.sub(r'::h[0-9a-f]{16}$','',n).replace('pump_recovered::','')
        out[hex(a)]=n[:90]
    else: out[hex(a)]='?'+hex(a)
json.dump(out,open(sys.argv[2],'w'),indent=0); print(len(out),sum(1 for v in out.values() if v.startswith('?')))
