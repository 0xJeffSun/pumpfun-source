#!/usr/bin/env python3
"""passtrace.py <print-after-all.txt>: per pass, count err stores / or-folds / blocks; print only changes."""
import re,sys
t=open(sys.argv[1]).read()
chunks=re.split(r'^; \*\*\* IR Dump After ',t,flags=re.M)
prev=None
for i,c in enumerate(chunks[1:]):
    name=c.split('\n',1)[0][:60]
    n2=len(re.findall(r'store i64 2, ptr %_0',c)); nor=len(re.findall(r' = or i1 ',c))+len(re.findall(r'select i1 [^\n]*i1 true',c)); nb=len(re.findall(r'^[A-Za-z0-9_.$"\-]+:',c,re.M))+1
    key=(n2,nor,nb)
    if key!=prev: print(f'{i:3d} {name:60s} store2={n2} or={nor} blocks={nb}'); prev=key
