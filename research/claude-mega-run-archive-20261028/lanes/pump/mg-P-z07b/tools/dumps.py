#!/usr/bin/env python3
"""dumps.py LOG : for each 'IR Dump After' of the filtered function, print pass name + compact block order
 (labels) with markers: E=end_day call, N=PumpError::name call, P=panic_bounds_check, X=expect_failed, R=ret, L=loop backedge"""
import sys,re
t=open(sys.argv[1]).read()
parts=re.split(r'\n?; \*\*\* IR Dump After ', t)[1:]
prev=None
for p in parts:
    name=p.split(' on ')[0].split()[0]
    body=p.split('\n',1)[1] if '\n' in p else ''
    if 'define' not in body: continue
    blocks=re.split(r'\n(?=[\w."$\-]+:)', body)
    seq=[]
    for b in blocks:
        lab=b.split(':')[0].split('\n')[-1][:28]
        m=''
        if 'end_day' in b and 'call' in b: m+='E'
        if 'PumpError4name' in b or 'with_values' in b: m+='N'
        if 'panic_bounds_check' in b: m+='P'
        if 'expect_failed' in b: m+='X'
        if '\n  ret ' in b: m+='R'
        seq.append(lab+('['+m+']' if m else ''))
    s=' '.join(seq)
    if s!=prev: print('==',name, len(seq)); print('  ',s[:3000]); prev=s
