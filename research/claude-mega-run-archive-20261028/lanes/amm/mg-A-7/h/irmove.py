# irmove.py IN.ll OUT.ll FUNCSUB  "blk>after" ["blk>after" ...]  ('^' as after = move to just after entry)
import sys,re
src=open(sys.argv[1]).read();out=sys.argv[2];sub=sys.argv[3]
i=src.index('define');
while sub not in src[i:src.index('\n',i)]: i=src.index('\ndefine',i)+1
j=src.index('\n}\n',i)
head,body,tail=src[:i],src[i:j],src[j:]
body=re.sub(r'%(\d+)\b',r'%v\1',body)
lines=body.split('\n');defl=lines[0];rest=lines[1:]
blocks=[];cur=None
for l in rest:
    m=re.match(r'^([\w.$-]+):',l)
    if m: cur=[m.group(1),[l]];blocks.append(cur)
    elif cur is None: cur=['__entry',[l]];blocks.append(cur)
    else: cur[1].append(l)
for mv in sys.argv[4:]:
    b,a=mv.split('>')
    k=[x for x in blocks if x[0]==b][0];blocks.remove(k)
    if a=='^': idx=1
    else: idx=[x[0] for x in blocks].index(a)+1
    blocks.insert(idx,k)
open(out,'w').write(head+defl+'\n'+'\n'.join('\n'.join(x[1]) for x in blocks)+tail)
