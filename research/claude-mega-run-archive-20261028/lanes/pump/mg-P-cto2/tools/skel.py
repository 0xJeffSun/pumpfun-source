#!/usr/bin/env python3
"""skel.py <blk.txt> <compact.txt> : merge block summary with E codes / msg lens from a compact listing."""
import sys,re
blk=open(sys.argv[1]).read().splitlines()
c=open(sys.argv[2]).read().splitlines()
ann={}
for l in c:
    m=re.match(r'\s*(\d+)\s+(.*)',l)
    if not m: continue
    i=int(m.group(1)); t=m.group(2)
    es=re.findall(r'E(\d{4})',t)
    if 'ERRBLK' in t or es: ann.setdefault(i,[]).extend('E'+e for e in es)
    mm=re.match(r'mov64 r2, (0x[0-9a-f]+)$',t)
    if mm: ann.setdefault(i,[]).append('r2='+mm.group(1))
for l in blk:
    m=re.match(r'(B\d+)\s+\+(\d+)\s+n=(\d+)\s*(.*)',l)
    if not m: print(l); continue
    b,s,n,rest=m.group(1),int(m.group(2)),int(m.group(3)),m.group(4)
    extra=[]
    for i in range(s,s+n):
        for a in ann.get(i,[]):
            if a.startswith('E'): extra.append(a)
    extra=sorted(set(extra))
    print(f"{b:5s}+{s:<5d}n={n:<4d}{rest} {' '.join(extra)}".rstrip())
