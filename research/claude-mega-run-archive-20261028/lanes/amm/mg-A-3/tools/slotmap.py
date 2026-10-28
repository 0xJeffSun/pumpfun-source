# slotmap.py ORIGLIST CANDLIST : align by noslot-equal instructions, report orig->cand slot offset mapping
import sys,re,difflib,collections
def rd(f):
    r=[]
    for l in open(f):
        m=re.match(r'\s*([0-9a-f]+)\s+(.*)',l)
        if m and not m.group(2).startswith('=='):
            i=m.group(2).strip(); i=re.sub(r'lddw (r\d+), (0x[0-9a-f]+|RELOC)',r'lddw \1, K',i); i=re.sub(r'^call .*','call',i)
            i=re.sub(r'^(j\w+ .*?)[+-]0x[0-9a-f]+$',r'\1 J',i); i=re.sub(r'^ja .*','ja J',i); r.append(i)
    return r
A=rd(sys.argv[1]);B=rd(sys.argv[2])
S=lambda i:re.sub(r'r10 - 0x[0-9a-f]+','r10 - S',re.sub(r'add64 (r\d+), -0x[0-9a-f]+$',r'add64 \1, -S',i))
sm=difflib.SequenceMatcher(None,[S(x) for x in A],[S(x) for x in B],autojunk=False)
mp=collections.defaultdict(collections.Counter)
for t,i1,i2,j1,j2 in sm.get_opcodes():
    if t=='equal':
        for a,b in zip(A[i1:i2],B[j1:j2]):
            x=re.findall(r'r10 - (0x[0-9a-f]+)',a) or re.findall(r'add64 r\d+, -(0x[0-9a-f]+)$',a)
            y=re.findall(r'r10 - (0x[0-9a-f]+)',b) or re.findall(r'add64 r\d+, -(0x[0-9a-f]+)$',b)
            if x and y: mp[int(x[0],16)][int(y[0],16)]+=1
for o in sorted(mp):
    c=mp[o]; best=c.most_common(1)[0][0]
    print(f'{o:#x}->{best:#x} d={o-best:+#x} n={sum(c.values())}'+('' if len(c)==1 else f' ALT{dict(c)}'))
