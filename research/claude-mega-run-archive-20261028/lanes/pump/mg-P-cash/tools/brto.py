#!/usr/bin/env python3
"""brto.py <dis> <fn_start> <fn_end> <target...> : list branches/calls inside [start,end) whose real target is one of targets."""
import re,sys
dis=sys.argv[1]; s=int(sys.argv[2],16); e=int(sys.argv[3],16); tg=set(int(x,16) for x in sys.argv[4:])
pat=re.compile(r'^\s*([0-9a-f]+):\s+(j\w+|call)\s+(.*)$')
for l in open(dis):
    m=pat.match(l)
    if not m: continue
    pc=int(m.group(1),16)
    if not (s<=pc<e): continue
    ops=m.group(3).split(',')
    off=ops[-1].strip().split()[0]
    try: o=int(off,0)
    except: continue
    if m.group(2)!='call':
        if o>=0x8000 and o<0x10000: o-=0x10000
    else:
        if o>=0x80000000: o-=1<<32
    t=pc+8+o*8
    if t in tg: print(hex(pc), m.group(2), m.group(3).split('<')[0].strip(), '->', hex(t))
