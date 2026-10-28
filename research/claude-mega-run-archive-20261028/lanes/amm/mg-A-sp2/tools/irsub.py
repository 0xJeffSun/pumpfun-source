#!/usr/bin/env python3
"""irsub.py IN.ll OUT.ll FNSUB EDITS.py -> apply python edit function edit(fn_text)->fn_text to one function"""
import sys
src,out,sub,ed=sys.argv[1:5]
t=open(src,errors='replace').read()
i=t.index('\ndefine ',0)
# find the function
pos=0
while True:
    i=t.index('\ndefine ',pos)
    j=t.index('\n}\n',i)
    if sub in t[i:t.index('\n',i+1)]: break
    pos=j
fn=t[i:j+3]
g={}
exec(open(ed).read(),g)
nf=g['edit'](fn)
open(out,'w').write(t[:i]+nf+t[j+3:])
print('edited',len(fn),'->',len(nf))
