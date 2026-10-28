import sys,re
src,dst=sys.argv[1],sys.argv[2]; mode=sys.argv[3] if len(sys.argv)>3 else 'fwd'
t=open(src).read()
m=re.search(r'^define [^\n]*create_v2[^\n]*update_metadata_authority[^\n]*$',t,re.M)
s=m.start(); e=t.index('\n}\n',s); f=t[s:e]
L=f.split('\n')
k=[i for i,l in enumerate(L) if '(32) %val, ptr' in l][0]
endR=L[k-1]; assert 'lifetime.end.p0(i64 40, ptr nonnull %_21)' in endR
cpT=L[k-2]
newA=L[k].replace('%_20.sroa.5, i64 32','%45, i64 32')
if mode=='fwd':      # T<-R, A<-R (forwarded), then end R
    L[k-2:k+1]=[cpT,'  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %val)',newA,endR]
elif mode=='fwdS':   # start A; T<-R; A<-R; end R
    L[k-2:k+1]=['  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %val)',cpT,newA,endR]
elif mode=='sT':   # start A; T<-R; A<-T; end R
    L[k-2:k+1]=['  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %val)',cpT,L[k],endR]
elif mode=='sT2':   # start A; T<-R; end R; A<-T
    L[k-2:k+1]=['  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %val)',cpT,endR,L[k]]
elif mode=='fwdA':   # A<-R first, then T<-R, end R
    L[k-2:k+1]=['  call void @llvm.lifetime.start.p0(i64 32, ptr nonnull %val)',newA,cpT,endR]
for j in range(k,len(L)):
    if 'token_metadata_update_authority17' in L[j] and 'call {' in L[j]:
        L.insert(j+1,'  call void @llvm.lifetime.end.p0(i64 32, ptr nonnull %val)'); break
open(dst,'w').write(t[:s]+'\n'.join(L)+t[e:]); print('ok',mode)
