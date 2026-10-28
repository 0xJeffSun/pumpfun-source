import sys,re
sys.path.insert(0,'tools')
from irfn import load, edit
src,dst,fn=sys.argv[1:4]
t=load(src)
def f(b):
    m=re.search(r'  %\.pn\.i = phi \{ i64, ptr \} \[ %99, (%\S+) \], \[ %144, (%\S+) \], \[ %111, (%"[^"]+"|%\S+) \]\n', b)
    assert m, 'no pn'
    p55,p83,p297=m.group(1),m.group(2),m.group(3)
    new=(f'  %pn.tag = phi i64 [ %_0.sroa.0.0.i.i, {p55} ], [ %_0.sroa.0.0.i17.i, {p83} ], [ %t297, {p297} ]\n'
         f'  %pn.ptr = phi ptr [ %_0.sroa.3.0.i.i, {p55} ], [ %_0.sroa.4.0.i.i, {p83} ], [ %p297, {p297} ]\n')
    b=b[:m.start()]+new+b[m.end():]
    b=b.replace('%145 = extractvalue { i64, ptr } %.pn.i, 0','%145 = add i64 %pn.tag, 0')
    b=b.replace('%147 = extractvalue { i64, ptr } %.pn.i, 1','%147 = getelementptr i8, ptr %pn.ptr, i64 0')
    # define t297/p297 from %111 in its block: insert after the %111 definition
    m2=re.search(r'\n(  %111 = [^\n]*)\n', b)
    b=b[:m2.end()]+'  %t297 = extractvalue { i64, ptr } %111, 0\n  %p297 = extractvalue { i64, ptr } %111, 1\n'+b[m2.end():]
    # drop the insertvalues in 55/83 (now unused)
    for v in ('%98','%99','%143','%144'):
        b=re.sub(r'\n  '+v+r' = insertvalue[^\n]*','',b)
    return b
t=edit(t,fn,f)
open(dst,'w').write(t)
