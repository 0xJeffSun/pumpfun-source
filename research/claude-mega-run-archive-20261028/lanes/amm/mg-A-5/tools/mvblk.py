# mvblk.py IN.ll OUT.ll FNSUB MOVES... : MOVES = "X>Y" (place block X right after block Y) or "X>END"; applied in order
import sys,re
s=open(sys.argv[1]).read(); sub=sys.argv[3]
import re as _r
m=_r.search(r'(?m)^define [^\n]*'+_r.escape(sub),s); st=m.start()-1; en=s.index('\n}\n',st)
f=s[st:en]
f=_r.sub(r'%(\d+)\b',r'%v\1',f); f=_r.sub(r'(?m)^(\d+):',r'v\1:',f)
head_end=f.index('\n',f.index('{'))+1
body=f[head_end:]
parts=re.split(r'(?m)^(?=[\w.$"-]+:)',body)
first=parts[0]; blks=[b.rstrip('\n')+'\n\n' for b in parts[1:]]
name=lambda b: b.split(':',1)[0]
for mv in sys.argv[4:]:
    x,y=mv.split('>')
    bx=next(b for b in blks if name(b)==x); blks.remove(bx)
    if not bx.endswith('\n\n'): bx=bx.rstrip('\n')+'\n\n'
    if y=='END': blks.append(bx)
    else:
        i=next(i for i,b in enumerate(blks) if name(b)==y); 
        if not blks[i].endswith('\n\n'): blks[i]=blks[i].rstrip('\n')+'\n\n'
        blks.insert(i+1,bx)
blks[-1]=blks[-1].rstrip('\n')+'\n'
open(sys.argv[2],'w').write(s[:st]+f[:head_end]+first+''.join(blks)+s[en:])
