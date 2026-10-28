# mirsim.py FN.mir : simulate rustc codegen LLVM block creation order (RPO + lazy creation + succ merging)
import sys,re
t=open(sys.argv[1]).read().split('\n')
cur=None; blocks={}; order=[]
for l in t:
    m=re.match(r'    (bb\d+)(?: \(cleanup\))?: \{',l)
    if m: cur=m.group(1); blocks[cur]=[]; order.append(cur); continue
    if cur and l.strip()=='}': cur=None; continue
    if cur: blocks[cur].append(l.strip())
def term(b):
    tl=blocks[b][-1]
    if tl.startswith('switchInt'):
        tg=re.findall(r'(\w+): (bb\d+)',tl)
        vals=[x for x in tg if x[0]!='otherwise']; oth=[x[1] for x in tg if x[0]=='otherwise']
        succ=[x[1] for x in vals]+oth
        if len(vals)==1: ref=[vals[0][1]]+oth
        else: ref=oth+[x[1] for x in vals]
        return 'switch',succ,ref
    if tl.startswith('goto'):
        x=re.findall(r'bb\d+',tl); return 'goto',x,x
    if tl.startswith('return') or tl.startswith('unreachable'): return 'ret',[],[]
    if tl.startswith('assert'):
        x=re.findall(r'success: (bb\d+)',tl) or re.findall(r'-> (bb\d+)',tl)
        return 'assert',x,x+['PANIC']
    x=re.findall(r'return: (bb\d+)',tl)
    if x: return 'call',x,x
    x=re.findall(r'-> (bb\d+)',tl)
    return 'other',x,x
T={b:term(b) for b in order}
preds={b:[] for b in order}
for b in order:
    for s in T[b][1]: preds[s].append(b)
# rustc postorder: DFS, successors iterated next_back()
visited=set(['bb0']); post=[]; stack=[('bb0',list(T['bb0'][1]))]
while stack:
    b,it=stack[-1]
    if it:
        s=it.pop()  # next_back
        if s not in visited:
            visited.add(s); stack.append((s,list(T[s][1])))
    else:
        post.append(b); stack.pop()
rpo=post[::-1]
created=['bb0']; skip=set()
for b in rpo:
    if b in skip: continue
    if b not in created: created.append(b)
    while True:
        k,succ,ref=T[b]
        merge = len(succ)==1 and preds[succ[0]]==[b] and k in ('goto','call','other')
        if merge:
            skip.add(succ[0]); b=succ[0]; continue
        for s in ref:
            if s=='PANIC': continue
            if s not in created: created.append(s)
        break
print(' '.join(created))
