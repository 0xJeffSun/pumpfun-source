#!/usr/bin/env python3
"""osl.py <hex addr | +byteoff> [before] [after]: short slice of the original hop body listing around an address."""
import sys
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-hop/tools/hop_orig.s'
ls=[l.rstrip('\n') for l in open(L)]
a=sys.argv[1]; addr=0x5b3b0+int(a[1:],0) if a.startswith('+') else int(a,16)
b=int(sys.argv[2]) if len(sys.argv)>2 else 6; f=int(sys.argv[3]) if len(sys.argv)>3 else 6
idx=min(range(len(ls)),key=lambda i:abs(int(ls[i].split(':')[0],16)-addr))
for l in ls[max(0,idx-b):idx+f+1]:
    p,t=l.split(':',1); print(f"{int(p,16)-0x5b3b0:5x} {t.strip()[:70]}")
