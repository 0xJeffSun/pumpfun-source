#!/usr/bin/env python3
"""orng.py <dis> <start> <end> : print insns in [start,end) with real branch/call targets (objdump annotations dropped)."""
import re,sys
dis=sys.argv[1]; s=int(sys.argv[2],16); e=int(sys.argv[3],16)
pat=re.compile(r'^\s*([0-9a-f]+):\s+(\S+)\s*(.*)$')
for l in open(dis):
    m=pat.match(l)
    if not m: continue
    try: pc=int(m.group(1),16)
    except: continue
    if not (s<=pc<e): continue
    op=m.group(2); rest=re.sub(r'\s*<[^>]*>','',m.group(3))
    t=''
    if op.startswith('j') or op=='call':
        off=rest.split(',')[-1].strip()
        try:
            o=int(off,0)
            if op=='call' and o>=0x80000000: o-=1<<32
            t=' -> %x'%(pc+8+o*8)
        except: pass
    print('%x: %s %s%s'%(pc,op,rest,t))
