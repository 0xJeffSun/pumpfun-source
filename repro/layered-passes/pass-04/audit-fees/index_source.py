"""Bounded Rust declaration indexer, not a compiler or macro expander."""
import re, hashlib

def masked(text):
    # Preserve offsets while masking comments and ordinary strings. The admitted
    # files contain no raw strings with Rust declarations or character braces.
    pattern = r'//[^\n]*|/\*[\s\S]*?\*/|"(?:\\.|[^"\\])*"'
    return re.sub(pattern, lambda m: ''.join('\n' if c=='\n' else ' ' for c in m[0]), text)

def declarations(data, kind='fn'):
    text=data.decode('utf-8'); clean=masked(text); out=[]
    for m in re.finditer(r'\b'+kind+r'\s+([A-Za-z_][A-Za-z_0-9]*)',clean):
        pos=m.end(); level=0
        # Signatures in this fixed corpus contain no const-generic braces.
        square=0
        while pos<len(clean):
            ch=clean[pos]
            if ch=='[': square+=1
            elif ch==']': square-=1
            elif ch=='{' or (ch==';' and square==0): break
            pos+=1
        if pos==len(clean): raise ValueError('unterminated declaration')
        has_body=clean[pos]=='{'
        end=pos+1
        if has_body:
            level=1
            while level:
                if end>=len(clean): raise ValueError('unterminated body')
                level+=(clean[end]=='{')-(clean[end]=='}'); end+=1
        a=len(text[:m.start()].encode()); b=len(text[:end].encode())
        out.append(dict(name=m[1],start_byte=a,end_byte=b,start_line=text.count('\n',0,m.start())+1,end_line=text.count('\n',0,end)+1,has_body=has_body,sha256=hashlib.sha256(data[a:b]).hexdigest()))
    return out

def contexts(data):
    text=data.decode(); out=[]
    for row in declarations(data,'struct'):
        before=text[:len(data[:row['start_byte']].decode())]
        # The derive immediately preceding each context is within its attribute prelude.
        boundary=max(before.rfind('}'),before.rfind(';'))
        if re.search(r'#\[derive\(Accounts\)\]',before[boundary:]): out.append(row)
    return out

def cpi_sites(data):
    text=data.decode(); clean=masked(text); out=[]
    for m in re.finditer(r'\b(call|invoke|invoke_signed|transfer_checked|transfer|emit_cpi)\s*!?\s*\(',clean):
        if re.search(r'fn\s*$',clean[max(0,m.start()-8):m.start()]): continue
        start=m.start(); pos=m.end(); depth=1
        while depth:
            if pos>=len(clean):raise ValueError('unbalanced call')
            depth+=(clean[pos]=='(')-(clean[pos]==')');pos+=1
        a=len(text[:start].encode()); b=len(text[:pos].encode())
        out.append(dict(name=m[1],start_byte=a,end_byte=b,start_line=text.count('\n',0,start)+1,end_line=text.count('\n',0,pos)+1,sha256=hashlib.sha256(data[a:b]).hexdigest(),expression=data[a:b].decode()))
    return out
