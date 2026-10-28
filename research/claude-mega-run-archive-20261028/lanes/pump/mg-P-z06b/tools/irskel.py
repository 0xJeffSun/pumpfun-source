#!/usr/bin/env python3
"""irskel.py <ll> <fnregex>: compact CFG skeleton of one function: block (preds) + key calls + terminator."""
import sys,re
s=open(sys.argv[1]).read(); rx=sys.argv[2]
m=re.search(r'\ndefine [^\n]*'+rx+r'[^\n]*\{',s); st=m.start(); en=s.index('\n}\n',st); f=s[st:en]
names={}
def short(x):
    x=re.sub(r'"?_ZN[0-9a-zA-Z_$.]*?(\d+)([a-z_0-9]+)17h[0-9a-f]{16}E"?',lambda m:m.group(2),x)
    return x
for blk in re.split(r'\n(?=[^\s;][^\n]*:)',f)[1:]:
    lines=blk.split('\n'); hdr=lines[0]
    lab=hdr.split(':')[0][:40]; preds=re.search(r'preds = (.*)$',hdr); pr=preds.group(1) if preds else ''
    pr=','.join(p.strip()[:24] for p in pr.split(','))
    calls=[]
    for l in lines[1:]:
        mm=re.search(r'call [^@]*@("?[^(" ]+"?)\(',l)
        if mm:
            n=mm.group(1)
            if 'lifetime' in n or 'llvm.memcpy' in n or 'llvm.memset' in n or 'noalias.scope' in n or 'assume' in n: continue
            n=re.sub(r'17h[0-9a-f]{16}E','',n); n=re.sub(r'^"?_ZN.*?(\d+)([A-Za-z_][A-Za-z_0-9]*)$',r'\2',n.strip('"'))
            calls.append(n[-28:])
        if re.search(r'\bphi\b',l): calls.append('phi:'+l.split('=')[0].strip()[:18])
    term=lines[-1].strip()
    term=re.sub(r', !\w+ !\d+','',term); term=re.sub(r'label %','',term)
    print(f'{lab:40s} <{pr[:60]}> {" ".join(calls)[:90]} || {term[:80]}')
