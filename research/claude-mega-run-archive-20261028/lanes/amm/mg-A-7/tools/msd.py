import re,collections,sys
def norm(f,regs):
    out=[]
    for l in open(f):
        p=l.split(None,1)
        if len(p)<2: continue
        try: int(p[0],16)
        except: continue
        i=p[1].strip()
        i=re.sub(r'<.*>','',i).strip(); i=re.sub(r'lddw (r\d), 0x[0-9a-f]+',r'lddw \1, X',i)
        i=re.sub(r'(j\w+ .*), [+-]0x[0-9a-f]+$',r'\1, OFF',i); i=re.sub(r'^ja [+-]0x[0-9a-f]+','ja OFF',i)
        i=re.sub(r'^call .*','call',i)
        if not regs: i=re.sub(r'\br\d\b','R',i); i=re.sub(r'\[R - 0x[0-9a-f]+\]','[R - S]',i) if 'r10' not in l else i
        if not regs: i=re.sub(r'\[R - 0x[0-9a-f]+\]','[FP-S]',i)
        out.append(i)
    return out
a=collections.Counter(norm(sys.argv[1],0)); b=collections.Counter(norm(sys.argv[2],0))
print('orig-only',sum((a-b).values()),'cand-only',sum((b-a).values()))
print('O:',sorted((a-b).items())); print('C:',sorted((b-a).items()))
