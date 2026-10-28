#!/usr/bin/env python3
"""irchunk.py <pa.txt> <idx> [full]: print the CFG skeleton (labels, terminators, stores to %_0, phis count) of dump #idx."""
import re,sys
t=open(sys.argv[1]).read(); i=int(sys.argv[2]); full=len(sys.argv)>3
c=re.split(r'^; \*\*\* IR Dump After ',t,flags=re.M)[i+1]
print(c.split('\n',1)[0][:80])
for l in c.split('\n')[1:]:
    if full or re.match(r'^[A-Za-z0-9_.$"\-]+:',l) or re.match(r'^\s+(br|switch|ret|resume|unreachable)\b',l) or re.search(r'store [^\n]*%_0\b',l) or ' = or i1' in l or 'select i1' in l or re.search(r'icmp',l):
        print(l[:140])
