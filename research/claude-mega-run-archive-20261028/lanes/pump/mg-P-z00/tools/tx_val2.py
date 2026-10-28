import sys,re
src,dst=sys.argv[1],sys.argv[2]
t=open(src).read()
m=re.search(r'^define [^\n]*create_v2[^\n]*update_metadata_authority[^\n]*$',t,re.M)
s=m.start(); e=t.index('\n}\n',s); f=t[s:e]
a='  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 1 dereferenceable(32) %val,'
lines=f.split('\n')
k=[i for i,l in enumerate(lines) if l.startswith(a)][0]
assert 'lifetime.end.p0(i64 40, ptr nonnull %_21)' in lines[k-1], lines[k-1]
endR=lines.pop(k-1)            # remove R end before val memcpy
k-=1
lines.insert(k,'  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %val)')
lines.insert(k+2,endR)         # R end after val memcpy
for j in range(k,len(lines)):
    if 'token_metadata_update_authority17' in lines[j] and 'call {' in lines[j]:
        lines.insert(j+1,'  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %val)'); break
open(dst,'w').write(t[:s]+'\n'.join(lines)+t[e:]); print('ok')
