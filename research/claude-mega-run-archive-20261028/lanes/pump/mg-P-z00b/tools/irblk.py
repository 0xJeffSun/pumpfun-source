#!/usr/bin/env python3
"""irblk.py <ll> <fnregex> <blk1,blk2,...|ALL> [maxlines]: print the named blocks of a function (metadata stripped, names shortened)."""
import re,sys
s=open(sys.argv[1]).read(); fn=sys.argv[2]; want=sys.argv[3].split(','); mx=int(sys.argv[4]) if len(sys.argv)>4 else 80
m=re.search(r'\ndefine [^\n]*'+fn+r'[^\n]*\{',s); st=m.start(); en=s.index('\n}\n',st)
f=s[st:en].split('\n')
cur='start' ; n=0
for l in f[1:]:
    mm=re.match(r'^([\w.\-]+):',l)
    if mm: cur=mm.group(1)
    if want!=['ALL'] and cur not in want: continue
    if 'llvm.dbg' in l or 'lifetime' in l and False: continue
    l=re.sub(r', !(dbg|noalias|alias\.scope|noundef|nonnull|align|range|prof|tbaa) !\d+','',l)
    l=re.sub(r'_ZN[\w$.]+?(\d+)([a-z_][\w$]*)17h[0-9a-f]{16}E',lambda x:x.group(2),l)
    print(l[:220]); n+=1
    if n>=mx: break
