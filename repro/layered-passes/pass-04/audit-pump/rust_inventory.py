"""Bounded lexical inventory, not a Rust compiler or macro expander."""
import re

def mask(s):
    # Preserve positions/newlines while suppressing Rust comments and string contents.
    out=list(s); i=0
    def blank(a,b):
        for k in range(a,b):
            if s[k]!='\n':out[k]=' '
    while i<len(s):
        if s.startswith('//',i):
            j=s.find('\n',i);j=len(s) if j<0 else j;blank(i,j);i=j
        elif s.startswith('/*',i):
            j=i+2;d=1
            while j<len(s) and d:
                if s.startswith('/*',j):d+=1;j+=2
                elif s.startswith('*/',j):d-=1;j+=2
                else:j+=1
            blank(i,j);i=j
        elif s[i]=='"':
            j=i+1
            while j<len(s):
                if s[j]=='\\':j+=2
                elif s[j]=='"':j+=1;break
                else:j+=1
            blank(i,j);i=j
        elif s[i]=="'" and re.match(r"'(?:\\.|[^'\n])'",s[i:]):
            m=re.match(r"'(?:\\.|[^'\n])'",s[i:]);j=i+len(m[0]);blank(i,j);i=j
        else:i+=1
    return ''.join(out)

def funcs(s):
    m=mask(s);rows=[]
    for hit in re.finditer(r'\bfn\s+(\w+)\s*(?=[<(])',m):
        a=hit.start();o=m.find('{',hit.end());semi=m.find(';',hit.end())
        if semi>=0 and (o<0 or semi<o):b=semi+1;body=False
        else:
            d=1;b=o+1;body=True
            while b<len(m) and d:
                d+=(m[b]=='{')-(m[b]=='}');b+=1
            assert d==0
        rows.append(dict(name=hit[1],start=s.count('\n',0,a)+1,end=s.count('\n',0,b-1)+1,a=a,b=b,body=body))
    return rows

