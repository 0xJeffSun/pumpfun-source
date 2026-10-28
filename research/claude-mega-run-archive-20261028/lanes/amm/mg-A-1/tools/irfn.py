#!/usr/bin/env python3
"""irfn.py IR.ll NAME_SUBSTR [OUT] -> extract one function definition"""
import sys
f,sub=sys.argv[1],sys.argv[2]; out=[];on=False
for l in open(f,errors='replace'):
    if l.startswith('define ') and sub in l: on=True
    if on:
        out.append(l)
        if l.startswith('}'): break
t=''.join(out)
if len(sys.argv)>3: open(sys.argv[3],'w').write(t); print(len(out),'lines ->',sys.argv[3])
else: sys.stdout.write(t)
