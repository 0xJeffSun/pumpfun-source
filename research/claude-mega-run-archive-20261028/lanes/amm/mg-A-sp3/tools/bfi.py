#!/usr/bin/env python3
"""bfi.py FN.ll [FUNCSUB] -> per-block frequency + calls (uses homebrew opt print<block-freq>); FN.ll = llvm-extract'ed module"""
import sys,re,subprocess
f=sys.argv[1]; sub=sys.argv[2] if len(sys.argv)>2 else ''
OPT='/opt/homebrew/opt/llvm/bin/opt'
t=open(f).read()
t=re.sub(r'(?m)^target triple = .*$','target triple = "bpfel"',t); open(f,'w').write(t)
out=subprocess.run([OPT,'-disable-output','-passes=print<block-freq>',f],capture_output=True,text=True).stderr
m=re.search(r'(?ms)^define [^\n]*'+re.escape(sub)+r'[^\n]*\{\n(.*?)^\}',t); body=m.group(1)
blocks=[];cur=['entry',[]]
for l in body.split('\n'):
    mm=re.match(r'^(\S+):',l)
    if mm: blocks.append(cur); cur=[mm.group(1),[]]; continue
    if l.strip(): cur[1].append(l.strip())
blocks.append(cur)
fs=[]; on=False
for l in out.split('\n'):
    if l.startswith('block-frequency-info') and sub in l: on=True; continue
    if on:
        mm=re.match(r'\s*- (\S*)\s*: float = ([0-9.e+-]+)',l)
        if mm: fs.append(float(mm.group(2)))
        elif fs: break
def short(c):
    c=re.sub(r'17h[0-9a-f]{16}E','',c); c=c.replace('$LT$','<').replace('$GT$','>').replace('$u20$',' ').replace('..','::')
    return c[-48:]
for (name,ins),fr in zip(blocks,fs):
    calls=[short(m.group(1)) for i in ins for m in [re.search(r'call [^@]*@"?([^"( ]+)',i)] if m and 'llvm.' not in m.group(1)]
    term=ins[-1] if ins else ''
    term=re.sub(r'\s+',' ',term)[:70]
    print(f'{name:>6} {fr:9.5f} | {"; ".join(calls)[:120]} | {term}')
