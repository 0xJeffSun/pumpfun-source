# tx_gen.py in.ll out.ll <fn-regex> <op>...   ops: rmlt:<alloca>  (remove lifetime markers of alloca)
import sys,re
src,dst,fn=sys.argv[1:4]; ops=sys.argv[4:]
t=open(src).read()
m=re.search(r'^define [^\n]*'+fn+r'[^\n]*$',t,re.M); s=m.start(); e=t.index('\n}\n',s); f=t[s:e]
for op in ops:
    k,v=op.split(':',1)
    if k=='rmlt':
        f=re.sub(r'\n  call void @llvm\.lifetime\.(start|end)\.p0\(i64 \d+, ptr nonnull %'+re.escape(v)+r'\)','',f)
open(dst,'w').write(t[:s]+f+t[e:]); print('ok')
