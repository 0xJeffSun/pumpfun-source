# irorder.py IN.ll OUT.ll FUNCSUB ORDERSPEC : reorder blocks; ORDERSPEC = comma list of block names (prefix* = all blocks with prefix, in current order); unlisted blocks keep relative order at end
import sys,re
src=open(sys.argv[1]).read();out=sys.argv[2];sub=sys.argv[3];spec=sys.argv[4].split(',')
m=[mm for mm in re.finditer(r'^define [^\n]*',src,re.M) if sub in mm.group(0)][0]
i=m.start();j=src.index('\n}\n',i)
head,body,tail=src[:i],src[i:j],src[j:]
body=re.sub(r'%(\d+)\b',r'%v\1',body)
lines=body.split('\n');defl=lines[0];blocks=[];cur=None
for l in lines[1:]:
    mm=re.match(r'^([\w.$-]+):',l)
    if mm: cur=[mm.group(1),[l]];blocks.append(cur)
    elif cur is None: cur=['__entry',[l]];blocks.append(cur)
    else: cur[1].append(l)
names=[b[0] for b in blocks];used=[];order=[]
for s in spec:
    if s.endswith('*'): sel=[n for n in names if n.startswith(s[:-1]) and n not in used]
    else: sel=[s] if s in names else []
    if not sel: print('MISSING',s)
    for n in sel: used.append(n);order.append(n)
rest=[n for n in names if n not in used]
if rest: print('unlisted(appended):',rest)
bm={b[0]:b for b in blocks}
open(out,'w').write(head+defl+'\n'+'\n'.join('\n'.join(bm[n][1]) for n in order+rest)+tail)
