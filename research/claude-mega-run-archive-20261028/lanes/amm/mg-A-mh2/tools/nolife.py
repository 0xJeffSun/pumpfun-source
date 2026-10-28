# nolife.py IN.ll OUT.ll FUNCSUB name1,name2,... : drop llvm.lifetime.start/end on the named allocas inside the function (diagnosis only)
import sys,re
src,dst,sub,names=sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4].split(',')
L=open(src).read().split('\n');inf=False;n=0
pat=[re.compile(r'call void @llvm\.lifetime\.(start|end)\.p0\(i64 \d+, ptr (nonnull )?%'+re.escape(x)+r'\)') for x in names]
out=[]
for l in L:
    if l.startswith('define') and sub in l: inf=True
    elif inf and l=='}': inf=False
    if inf and any(p.search(l) for p in pat): n+=1; continue
    out.append(l)
open(dst,'w').write('\n'.join(out)); print('removed',n)
