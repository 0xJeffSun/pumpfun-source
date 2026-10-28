#!/usr/bin/env python3
"""blkmv.py <in.ll> <fnregex> <block> <after-block|END|FIRST2> <out.ll>: move one IR basic block (label: ... up to next label) after another block."""
import sys,re
src,fn,blk,after,out=sys.argv[1:6]
s=open(src).read()
m=re.search(r'\ndefine [^\n]*'+fn+r'[^\n]*\{\n',s); st=m.end(); en=s.index('\n}\n',st)
body=s[st:en]
# split into blocks
parts=re.split(r'\n(?=[A-Za-z0-9_.$"\-]+:)',body)
names=[p.split(':')[0].strip() if i>0 else 'ENTRY' for i,p in enumerate(parts)]
names[0]=parts[0].split(':')[0].strip()
i=names.index(blk); b=parts.pop(i); names.pop(i)
if after=='END': j=len(parts)
else: j=names.index(after)+1
parts.insert(j,b); names.insert(j,blk)
open(out,'w').write(s[:st]+'\n'.join(parts)+s[en:])
print('order:', ' '.join(n[:12] for n in names[:12]), '...')
