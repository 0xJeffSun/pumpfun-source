import re,difflib,sys
def norm(f):
    out=[]
    for l in open(f):
        p=l.split(None,1)
        if len(p)<2: continue
        try: o=int(p[0],16)
        except: continue
        i=p[1].strip(); i=re.sub(r'<.*>','',i).strip(); i=re.sub(r'lddw (r\d), 0x[0-9a-f]+',r'lddw \1, X',i); i=re.sub(r'^call .*','call',i)
        if len(sys.argv)>3: i=re.sub(r'([+-]0x[0-9a-f]+)$','OFF',i) if i.startswith('j') else i
        out.append((o,i))
    return out
a=norm(sys.argv[1]); b=norm(sys.argv[2])
sm=difflib.SequenceMatcher(None,[x[1] for x in a],[x[1] for x in b],autojunk=False)
for tag,i1,i2,j1,j2 in sm.get_opcodes():
    if tag!='equal':
        print(tag,hex(a[i1][0]) if i1<len(a) else '-',hex(b[j1][0]) if j1<len(b) else '-','|',' ; '.join(x[1] for x in a[i1:i2])[:160],'||',' ; '.join(x[1] for x in b[j1:j2])[:160])
