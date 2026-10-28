#!/usr/bin/env python3
"""rmlt.py in.ll out.ll fnsubstr alloca1,alloca2|ALL [start|end|both]: remove lifetime markers on the given allocas in fn."""
import re,sys
src,out,fn,al=sys.argv[1:5]; which=sys.argv[5] if len(sys.argv)>5 else 'both'
s=open(src).read()
m=re.search(r'\ndefine [^\n]*'+re.escape(fn)+r'[^\n]*\{\n',s); st=m.end(); en=s.index('\n}\n',st)
body=s[st:en].split('\n'); names=al.split(',')
keep=[]; n=0
for l in body:
    mm=re.search(r'call void @llvm\.lifetime\.(start|end)\.p0\(i64 \d+, ptr( nonnull)? (%[\w.]+)\)',l)
    if mm and (which=='both' or which==mm.group(1)) and ('ALL' in names or mm.group(3) in names): n+=1; continue
    keep.append(l)
open(out,'w').write(s[:st]+'\n'.join(keep)+s[en:]); print('removed',n)
