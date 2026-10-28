#!/usr/bin/env python3
"""tsz.py <build.log> <type substring>...: print field offsets (computed in print order, padding honoured) for matching types."""
import sys, re
log = open(sys.argv[1]).read().splitlines()
pats = sys.argv[2:]
i = 0
while i < len(log):
    m = re.match(r"print-type-size type: `(.*)`: (\d+) bytes", log[i])
    if m and any(p == m.group(1) for p in pats):
        print('%s (%s B)' % (m.group(1), m.group(2))); off = 0; j = i + 1
        while j < len(log) and not log[j].startswith('print-type-size type:'):
            l = log[j]
            f = re.match(r"print-type-size +field `(\.[^`]+)`: (\d+) bytes(?:, offset: (\d+) bytes)?", l)
            p = re.match(r"print-type-size +padding: (\d+) bytes", l)
            v = re.match(r"print-type-size +variant `([^`]+)`: (\d+) bytes", l)
            if v: print('  variant %s %s' % (v.group(1), v.group(2))); off = 0
            if p: off += int(p.group(1))
            if f:
                o = int(f.group(3)) if f.group(3) else off
                print('  0x%-4x %-40s %s' % (o, f.group(1), f.group(2))); off = o + int(f.group(2))
            j += 1
        i = j; continue
    i += 1
