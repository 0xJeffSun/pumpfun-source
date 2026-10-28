# hclass.py DIFF : classify odiff hunks into reg-only, stack-offset-only, structural (prints structural)
import re,sys
d=open(sys.argv[1]).read().split('\n'); hunks=[];cur=None
for l in d:
    if l.startswith('@@'): cur=[l,[],[]]; hunks.append(cur)
    elif cur and l.startswith('-'): cur[1].append(l[1:])
    elif cur and l.startswith('+'): cur[2].append(l[1:])
R=lambda x: re.sub(r'\br\d\b','R',x)
S=lambda x: re.sub(r'r10 - 0x[0-9a-f]+','r10-S',re.sub(r'add64 r1, -0x[0-9a-f]+','add64 r1, -S',R(x)))
J=lambda x: re.sub(r'([+-])0x[0-9a-f]+$','J',S(x))
c={'reg':0,'stack':0,'jump':0};st=[]
for h,a,b in hunks:
    if len(a)==len(b) and all(R(x)==R(y) for x,y in zip(a,b)): c['reg']+=1
    elif len(a)==len(b) and all(S(x)==S(y) for x,y in zip(a,b)): c['stack']+=1
    elif len(a)==len(b) and all(J(x)==J(y) for x,y in zip(a,b)): c['jump']+=1
    else: st.append((h,a,b))
print(c,'structural',len(st))
for h,a,b in st[:int(sys.argv[2]) if len(sys.argv)>2 else 15]: print(h,'|-',';'.join(a)[:170],'|+',';'.join(b)[:170])
