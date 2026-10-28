# helpers to edit one function in a big .ll module
import re,sys
def load(p): return open(p).read()
def fn_span(t,name_sub):
    i=t.index('define '); 
    m=[mm.start() for mm in re.finditer(r'^define [^\n]*'+re.escape(name_sub),t,re.M)]
    assert len(m)==1,(name_sub,len(m)); s=m[0]; e=t.index('\n}\n',s)+3
    return s,e
def edit(t,name_sub,f):
    s,e=fn_span(t,name_sub); body=t[s:e]; nb=f(body); assert nb!=body,'no change'
    return t[:s]+nb+t[e:]
