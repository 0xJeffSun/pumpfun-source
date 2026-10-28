# nd2.py ORIGLIST CANDLIST : diff metrics: exact-normalized, regs-abstracted, slots-abstracted, both
import sys,re,difflib
def rd(f):
    r=[]
    for l in open(f):
        m=re.match(r'\s*([0-9a-f]+)\s+(.*)',l)
        if m:
            i=m.group(2).strip()
            if i.startswith('=='): continue
            i=re.sub(r'lddw (r\d+), (0x[0-9a-f]+|RELOC)',r'lddw \1, K',i); i=re.sub(r'^call .*','call',i)
            i=re.sub(r'^(j\w+ .*?)[+-]0x[0-9a-f]+$',r'\1 J',i); i=re.sub(r'^ja .*','ja J',i)
            r.append(i)
    return r
A=rd(sys.argv[1]);B=rd(sys.argv[2])
def sd(A,B):
    sm=difflib.SequenceMatcher(None,A,B,autojunk=False)
    return sum(max(i2-i1,j2-j1) for t,i1,i2,j1,j2 in sm.get_opcodes() if t!='equal')
R=lambda x:[re.sub(r'r\d+','R',i) for i in x]
S=lambda x:[re.sub(r'r10 - 0x[0-9a-f]+','r10 - S',re.sub(r'add64 (r\d+), -0x[0-9a-f]+$',r'add64 \1, -S',i)) for i in x]
print(f'len {len(A)}/{len(B)} exact {sd(A,B)} noreg {sd(R(A),R(B))} noslot {sd(S(A),S(B))} shape {sd(R(S(A)),R(S(B)))}')
