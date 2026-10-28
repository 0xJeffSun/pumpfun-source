# irone.py IN.ll OUT.ll FNSUB [FNSUB2...] : keep only the given function bodies; others become declarations
import sys,re
s=open(sys.argv[1]).read(); keep=sys.argv[3:]
out=[];i=0
pat=re.compile(r'(?m)^define ([^\n]*)\{\n')
pos=0
for m in pat.finditer(s):
    if m.start()<pos: continue
    out.append(s[pos:m.start()])
    en=s.index('\n}\n',m.end())+3
    hdr=m.group(1)
    if any(k in hdr for k in keep):
        out.append(s[m.start():en])
    else:
        h=re.sub(r'^(internal|private|linkonce_odr|weak_odr|linkonce|weak|available_externally) ','',hdr)
        h=re.sub(r'\b(dso_local|hidden|unnamed_addr|local_unnamed_addr)\b ?','',h)
        h=re.sub(r' personality [^ ]+ ?',' ',h)
        h=re.sub(r' comdat(\([^)]*\))? ?',' ',h)
        h=re.sub(r' section "[^"]*"',' ',h)
        h=re.sub(r' !dbg !\d+','',h)
        h=re.sub(r' prologue [^ ]+','',h)
        # drop param names
        out.append('declare '+h.strip()+'\n')
    pos=en
out.append(s[pos:])
res=''.join(out)
import re as _r
body=''.join(x for x in out if x.startswith('define'))
lines=[]
for l in res.split('\n'):
    m=_r.match(r'^(@[^ ]+) = .*\balias\b',l)
    if m and m.group(1) not in body: continue
    lines.append(l)
res='\n'.join(lines)
open(sys.argv[2],'w').write(res)
