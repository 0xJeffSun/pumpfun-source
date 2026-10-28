#!/usr/bin/env python3
"""rostr.py <listing.txt> : for each lddw into .rodata, print the pc and a short printable preview of the target bytes."""
import sys,re,struct
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
import coords
blob=coords.ORIG; secs=coords.OS
ro=secs['.rodata']
for line in open(sys.argv[1]):
    m=re.match(r'(0x[0-9a-f]+)\s+lddw (r\d+), (0x[0-9a-f]+)',line.strip())
    if not m: continue
    v=int(m.group(3),16)
    for n,s in secs.items():
        if s['addr'] and s['addr']<=v<s['addr']+s['size']:
            o=v-s['addr']+s['offset']; b=blob[o:o+48]
            pr=''.join(chr(c) if 32<=c<127 else '.' for c in b)
            print(m.group(1),m.group(2),n,hex(v),pr); break
