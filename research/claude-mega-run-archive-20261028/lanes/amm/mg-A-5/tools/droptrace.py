# droptrace.py RAWFN.ll CALLSUB... : for each call, follow its Break (error) path through unconditional branches; print chain of blocks + lifetime.end allocas
import sys,re
f=open(sys.argv[1]).read().split('\n')
blocks={};order=[];cur=None
for l in f:
    m=re.match(r'^([\w.]+):',l)
    if m: cur=m.group(1); blocks[cur]=[]; order.append(cur); continue
    if cur and l.strip(): blocks[cur].append(l.strip())
def term(b):
    j=" ".join(blocks[b]); k=max(j.rfind(" br "),j.rfind("switch "),j.rfind("br label")); return j[k:].strip()
def find_call_block(sub):
    for b in order:
        if any(sub in x and ' call ' in x for x in blocks[b]): return b
for sub in sys.argv[2:]:
    b=find_call_block(sub)
    t=term(b); labs=re.findall(r'label %([\w.]+)',t)
    # break block = the one that stores into %_0 / residual eventually; take label for 'i64 1'
    m=re.search(r'i64 1, label %([\w.]+)',t)
    eb=m.group(1) if m else labs[-1]
    chain=[];x=eb
    for _ in range(12):
        lts=[re.search(r'ptr (%[\w.]+)\)',y).group(1) for y in blocks[x] if 'lifetime.end' in y]
        chain.append(f'{x}{lts}')
        t=term(x)
        if t.startswith('br label %'): x=t.split('%')[1]
        else: break
    print(sub[:20],' -> '.join(chain)[:400])
