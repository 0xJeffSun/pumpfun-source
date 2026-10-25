"""Bounded lexical source index for the sealed Rust files; no Rust compilation."""
import re, hashlib

def sha(b): return hashlib.sha256(b).hexdigest()
def mask(s):
    # Preserve positions while ignoring quoted strings and nested Rust comments.
    out=list(s); i=0
    while i<len(s):
        j=i
        if s.startswith('//',i):
            j=s.find('\n',i); j=len(s) if j<0 else j
        elif s.startswith('/*',i):
            j=i+2; depth=1
            while j<len(s) and depth:
                if s.startswith('/*',j): depth+=1;j+=2
                elif s.startswith('*/',j): depth-=1;j+=2
                else:j+=1
            assert depth==0
        elif s[i]=='"':
            j=i+1
            while j<len(s):
                if s[j]=='\\':j+=2
                elif s[j]=='"':j+=1;break
                else:j+=1
        elif s[i]=="'" and re.match(r"'(?:\\.|[^'\n])'",s[i:]):
            j=i+len(re.match(r"'(?:\\.|[^'\n])'",s[i:]).group())
        if j>i:
            for k in range(i,min(j,len(s))):
                if s[k]!='\n':out[k]=' '
            i=j
        else:i+=1
    return ''.join(out)
def close(m,start):
    d=0
    for i in range(start,len(m)):
        if m[i]=='{':d+=1
        elif m[i]=='}':
            d-=1
            if not d:return i+1
    raise ValueError('unclosed body')
def index(data):
    s=data.decode();m=mask(s);rows=[]
    for f in re.finditer(r'\bfn\s+([A-Za-z_][A-Za-z_0-9]*)',m):
        a=f.start();b=close(m,m.index('{',f.end()))
        rows.append(dict(name=f.group(1),start_byte=len(s[:a].encode()),end_byte=len(s[:b].encode()),start_line=s.count('\n',0,a)+1,end_line=s.count('\n',0,b)+1,sha256=sha(s[a:b].encode())))
    contexts=[]
    for f in re.finditer(r'#\[derive\(Accounts\)\]',m):
        st=re.search(r'\bstruct\s+(\w+)',m[f.end():]);assert st
        a=f.start(); pos=f.end()+st.end();b=close(m,m.index('{',pos))
        contexts.append(dict(name=st.group(1),start_byte=len(s[:a].encode()),end_byte=len(s[:b].encode()),start_line=s.count('\n',0,a)+1,end_line=s.count('\n',0,b)+1,sha256=sha(s[a:b].encode())))
    return rows,contexts
