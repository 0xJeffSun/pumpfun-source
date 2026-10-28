#!/usr/bin/env python3
"""irmerge_v2.py IN.ll OUT.ll POS -> merge v2 Err-store blocks into one 'errst' block; POS = end|after_ts|after_41"""
import sys,re
src,dst,pos=sys.argv[1],sys.argv[2],sys.argv[3]
txt=open(src).read()
m=re.search(r'^define [^\n]*19select_and_apply_v2[^\n]*\n.*?^}\n',txt,re.S|re.M); f=m.group(0)
blocks=re.split(r'(?m)^(?=[^\s;][^\n]*:)',f)
head=blocks[0]; bl=blocks[1:]
def name(b): return b.split(':',1)[0].strip()
TS=[b for b in bl if name(b).startswith('"_ZN45_$LT$T$u20$as$u20$alloc..string..ToString')][0]
ts_name=name(TS)
incoming=[]
out=[]
store_re=re.compile(r'  %(\S+) = getelementptr inbounds i8, ptr %_0, i64 8\n  store i64 (%\S+), ptr %\1, align 8\n  %(\S+) = getelementptr inbounds i8, ptr %_0, i64 16\n  store ptr (%\S+), ptr %\3, align 8\n  store i64 1, ptr %_0, align 8\n  br label %bb40\n')
for b in bl:
    n=name(b); mm=store_re.search(b)
    if mm and n in ('bb41','bb38',ts_name):
        incoming.append((n,mm.group(2),mm.group(4)))
        b=b[:mm.start()]+'  br label %errst\n'+b[mm.end():]
    out.append(b)
assert len(incoming)==3, incoming
tag=', '.join(f'[ {t}, %{n} ]' for n,t,p in incoming); ptr=', '.join(f'[ {p}, %{n} ]' for n,t,p in incoming)
err=('errst:\n  %m.tag = phi i64 '+tag+'\n  %m.ptr = phi ptr '+ptr+'\n  %m.g1 = getelementptr inbounds i8, ptr %_0, i64 8\n  store i64 %m.tag, ptr %m.g1, align 8\n'
     '  %m.g2 = getelementptr inbounds i8, ptr %_0, i64 16\n  store ptr %m.ptr, ptr %m.g2, align 8\n  store i64 1, ptr %_0, align 8\n  br label %bb40\n\n')
idx={'end':[i for i,b in enumerate(out) if name(b)=='bb40'][0],
     'after_ts':[i for i,b in enumerate(out) if name(b)==ts_name][0]+1,
     'after_41':[i for i,b in enumerate(out) if name(b)=='bb41'][0]+1}[pos]
out.insert(idx,err)
nf=head+''.join(out)
open(dst,'w').write(txt.replace(f,nf)); print('merged',[n[:20] for n,_,_ in incoming],'pos',pos)
