import sys,re
src,dst=sys.argv[1],sys.argv[2]
t=open(src).read()
i=t.index('update_metadata_authority'); i=t.rfind('\ndefine ',0,t.index('\n',i)) if False else None
# locate define line of the fn
m=re.search(r'^define [^\n]*create_v2[^\n]*update_metadata_authority[^\n]*$',t,re.M)
s=m.start(); e=t.index('\n}\n',s)
f=t[s:e]
a='  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 1 dereferenceable(32) %val,'
assert f.count(a)==1
f=f.replace(a,'  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %val)\n'+a)
lines=f.split('\n')
for k,l in enumerate(lines):
    if 'call { i64, ptr } @_ZN10anchor_spl21token_2022_extensions14token_metadata31token_metadata_update_authority' in l:
        lines.insert(k+1,'  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %val)'); break
f='\n'.join(lines)
open(dst,'w').write(t[:s]+f+t[e:])
print('ok')
