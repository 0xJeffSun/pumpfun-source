#!/usr/bin/env python3
"""irname.py <in.ll> <fnregex> <out.ll>: rename numbered values/labels (%N, N:) inside one function to %vN so blocks/insns can be reordered."""
import sys,re
src,fn,out=sys.argv[1:4]
s=open(src).read()
m=re.search(r'\ndefine [^\n]*'+fn+r'[^\n]*\{\n',s); st=m.end(); en=s.index('\n}\n',st)
b=s[st:en]
b=re.sub(r'%(\d+)\b',r'%v\1',b)
b=re.sub(r'(?m)^(\d+):',r'v\1:',b)
open(out,'w').write(s[:st]+b+s[en:])
