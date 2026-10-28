# irmove.py IN.ll OUT.ll FUNCSUB BLOCK AFTERBLOCK : move basic block BLOCK to right after AFTERBLOCK in function FUNCSUB
import sys,re
src,dst,fsub,blk,after=sys.argv[1:6]
lines=open(src).read().split('\n')
i0=next(i for i,l in enumerate(lines) if l.startswith('define ') and fsub in l)
i1=next(i for i in range(i0,len(lines)) if lines[i]=='}')
body=[re.sub(r'^(\d+):',r'v\1:',re.sub(r'%(\d+)\b',r'%v\1',l)) for l in lines[i0+1:i1]]
lines[i0]=re.sub(r'%(\d+)\b',r'%v\1',lines[i0])
# split into blocks
blocks=[];cur=None
for l in body:
    m=re.match(r'^([A-Za-z0-9_.$-]+):',l)
    if m:
        cur=[m.group(1),[l]];blocks.append(cur)
    else:
        if cur is None: cur=['__entry',[l]];blocks.append(cur)
        else: cur[1].append(l)
names=[b[0] for b in blocks]
b=blocks.pop(names.index(blk))
names=[x[0] for x in blocks]
blocks.insert(names.index(after)+1,b)
new=lines[:i0+1]+[l for bb in blocks for l in bb[1]]+lines[i1:]
open(dst,'w').write('\n'.join(new))
