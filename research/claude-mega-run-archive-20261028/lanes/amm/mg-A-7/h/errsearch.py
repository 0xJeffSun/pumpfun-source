# errsearch.py IN.ll FUNCSUB ORIG : moves of ERR blocks only (single + pairs from best singles)
import sys,re,os,subprocess,difflib
src,sub,oa=sys.argv[1:4]
sys.argv=['x',src,sub,oa]
exec(open('irs2.py').read().split("best=score(blocks)")[0])
def is_err(b): 
    body='\n'.join(b[1]); return body.count('store i64 2')==1 and len([l for l in b[1] if l.strip() and not l.strip().startswith(';')])<=3
errs=[b[0] for b in blocks if is_err(b)]
names=[b[0] for b in blocks]
print('errs',errs)
base=score(blocks);print('base',base)
def mv(bl,b,t):
    bl=[x for x in bl if x[0]!=b];k=[x for x in blocks if x[0]==b][0]
    idx=[x[0] for x in bl].index(t)+1 if t!='^' else 1;bl.insert(idx,k);return bl
res=[]
for b in errs:
    for t in names:
        if t==b: continue
        bl=mv(blocks,b,t);res.append((score(bl),f'{b}>{t}'))
res.sort();print('single',res[:6])
best1=[r for r in res if r[0][0]<base[0]][:5]
res2=[]
for (s1,m1) in best1:
    b1,t1=m1.split('>');bl1=mv(blocks,b1,t1)
    for b in errs:
        for t in names:
            if t==b or b==b1: continue
            bl=[x for x in bl1 if x[0]!=b];k=[x for x in bl1 if x[0]==b][0]
            idx=[x[0] for x in bl].index(t)+1;bl.insert(idx,k)
            res2.append((score(bl),m1,f'{b}>{t}'))
res2.sort();print('pairs',res2[:6])
