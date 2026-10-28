# reach.py FUNC.txt LINE : count memory-access instructions reachable after LINE (CFG walk), by kind
import sys,re,collections
L=open(sys.argv[1]).read().split('\n'); start=int(sys.argv[2])-1
blocks={};order=[];cur=None;lab_of_line={}
for i,l in enumerate(L):
    m=re.match(r'^("?[^\s"]+"?|"[^"]+"):',l)
    if i==1 or (m and not l.startswith(' ')):
        cur=(m.group(1).strip('"') if m else 'start'); blocks[cur]=[]; order.append(cur)
    if cur is not None: blocks[cur].append(i); lab_of_line[i]=cur
def succs(b):
    t=L[blocks[b][-1]] if blocks[b] else ''
    for j in reversed(blocks[b]):
        if L[j].strip().startswith(('br ','switch ','ret ','unreachable','resume','invoke')) or L[j].strip().startswith(']'): t=' '.join(L[k] for k in blocks[b][blocks[b].index(j):]); break
    return [x.strip('"') for x in re.findall(r'label %("[^"]+"|[\w.$]+)',t)]
def kind(l):
    s=l.strip()
    if 'llvm.lifetime.start' in s: return 'lt.start'
    if 'llvm.lifetime.end' in s: return 'lt.end'
    if 'noalias.scope.decl' in s: return 'scopedecl'
    if 'llvm.assume' in s: return 'assume'
    if re.search(r'llvm\.mem(cpy|move|set)',s): return 'memintr'
    if re.search(r'= load ',s): return 'load'
    if s.startswith('store '): return 'store'
    if re.search(r'\bcall |\binvoke ',s) and not re.search(r'llvm\.(experimental\.noalias|dbg|[us]add|[us]sub|[us]mul|umin|umax|smin|smax|ctpop|ctlz|cttz|abs|fshl|fshr|bswap|expect)',s): return 'call'
    return None
b0=lab_of_line[start]; seen=set(); cnt=collections.Counter(); items=[]
first=[i for i in blocks[b0] if i>start]
for i in first:
    k=kind(L[i]); 
    if k: cnt[k]+=1; items.append((i+1,k))
stack=succs(b0)
while stack:
    b=stack.pop()
    if b in seen or b not in blocks: continue
    seen.add(b)
    for i in blocks[b]:
        k=kind(L[i])
        if k: cnt[k]+=1; items.append((i+1,k))
    stack+=succs(b)
print('blocks',len(seen),'total',sum(cnt.values()),dict(cnt))
if len(sys.argv)>3:
    for i,k in sorted(items):
        if k in sys.argv[3].split(','): print(i,k,L[i-1].strip()[:110])
