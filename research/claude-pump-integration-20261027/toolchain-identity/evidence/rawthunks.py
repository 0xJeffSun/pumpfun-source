#!/usr/bin/env python3
"""Scan any file (rlib/.o/.so) at every byte offset for the TypeId thunk pattern; print (lo,hi) pairs with counts."""
import re, struct, sys
from collections import Counter
pat = re.compile(rb'\x18([\x00-\x0f])\x00\x00(.{4})\x00\x00\x00\x00(.{4})\x7b(.)\x08\x00\x00\x00\x00\x00\x18([\x00-\x0f])\x00\x00(.{4})\x00\x00\x00\x00(.{4})\x7b(.)\x00\x00\x00\x00\x00\x00\x95\x00\x00\x00\x00\x00\x00\x00', re.S)
for path in sys.argv[1:]:
    b = open(path, 'rb').read(); c = Counter()
    for m in pat.finditer(b):
        hi = struct.unpack('<I', m.group(2))[0] | struct.unpack('<I', m.group(3))[0] << 32
        lo = struct.unpack('<I', m.group(6))[0] | struct.unpack('<I', m.group(7))[0] << 32
        c[(lo, hi)] += 1
    print(path.split('/platform-tools/')[0].split('/')[-1] if '/platform-tools/' in path else path, path.split('/')[-1])
    for (lo, hi), n in c.items():
        print(f'   lo={lo:016x} hi={hi:016x} x{n}')
