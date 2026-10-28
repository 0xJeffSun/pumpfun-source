# irmv.py IN.ll OUT.ll FUNC_SUB [mv BLOCK AFTER]... [sub OLDFILE NEWFILE]... : move IR basic blocks / substitute text inside one function
import sys,re
t=open(sys.argv[1]).read()
m=re.search(r'\ndefine [^\n]*'+re.escape(sys.argv[3])+r'[^\n]*\{\n',t); s=m.start()+1; e=t.index('\n}\n',s)+3
f=t[s:e]
f=re.sub(r'%(\d+)\b',r'%v\1',f)
def blocks(f):
    lines=f.split('\n'); head=[];bl=[];cur=None
    for i,l in enumerate(lines):
        mm=re.match(r'^([\w.$"\-]+):',l)
        if mm and i>0:
            cur=[mm.group(1),[l]];bl.append(cur)
        elif cur is None: head.append(l)
        else: cur[1].append(l)
    return head,bl
args=sys.argv[4:]
while args:
    op=args.pop(0)
    if op=='sub':
        old=re.sub(r'%(\d+)\b',r'%v\1',open(args.pop(0)).read()); new=re.sub(r'%(\d+)\b',r'%v\1',open(args.pop(0)).read()); assert f.count(old)==1,(old[:60],f.count(old)); f=f.replace(old,new)
    elif op=='rep':  # inline literal replace OLD NEW
        old=re.sub(r'%(\d+)\b',r'%v\1',args.pop(0).replace('\\n','\n')); new=re.sub(r'%(\d+)\b',r'%v\1',args.pop(0).replace('\\n','\n')); assert f.count(old)==1,(old[:60],f.count(old)); f=f.replace(old,new)
    elif op=='mv':
        b=args.pop(0); after=args.pop(0)
        head,bl=blocks(f)
        i=[k for k,x in enumerate(bl) if x[0]==b][0]; blk=bl.pop(i)
        j=[k for k,x in enumerate(bl) if x[0]==after][0]; bl.insert(j+1,blk)
        f='\n'.join(head+[l for x in bl for l in x[1]])
open(sys.argv[2],'w').write(t[:s]+f+t[e:])
