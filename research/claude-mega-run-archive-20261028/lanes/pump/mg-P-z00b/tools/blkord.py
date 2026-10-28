#!/usr/bin/env python3
"""blkord.py <in.ll> <fnregex> <out.ll> <move>...: each move 'i-j>k' moves blocks with indices i..j (block list incl. entry=0,
as printed by blklist) to before the block currently at index k (indices refer to the ORIGINAL order); 'list' prints indices."""
import sys,re
src,fn,out=sys.argv[1:4]; moves=sys.argv[4:]
s=open(src).read()
m=re.search(r'\ndefine [^\n]*'+fn+r'[^\n]*\{\n',s); st=m.end(); en=s.index('\n}\n',st)
parts=re.split(r'\n(?=[A-Za-z0-9_.$"\-]+:)',s[st:en])
idx=list(range(len(parts)))
if moves==['list']:
    for i,p in enumerate(parts): print(i,re.sub(r'_ZN[\w$.]+?(\d+)([a-z_][\w$]*)17h[0-9a-f]{16}E','\\2',p.split('\n')[0].split(':')[0])[:50])
    sys.exit()
for mv in moves:
    a,k=mv.split('>'); i,j=(a.split('-')+[a])[:2] if '-' in a else (a,a); i,j,k=int(i),int(j),int(k)
    grp=[x for x in idx if i<=x<=j]; rest=[x for x in idx if not (i<=x<=j)]
    pos=rest.index(k) if k in rest else len(rest)
    idx=rest[:pos]+grp+rest[pos:]
open(out,'w').write(s[:st]+'\n'.join(parts[x] for x in idx)+s[en:])
