# inl_em.py IN.ll OUT.ll FUNCSUB : hand-inline the exchange_malloc(40,8) call inside FUNCSUB (diagnosis only)
import sys,re
src,dst,sub=sys.argv[1:4]
L=open(src).read().split('\n')
s=next(i for i,l in enumerate(L) if l.startswith('define') and sub in l)
e=next(i for i in range(s,len(L)) if L[i]=='}')
ci=next(i for i in range(s,e) if 'exchange_malloc' in L[i] and 'call' in L[i] and not L[i].lstrip().startswith(';'))
m=re.match(r'\s*(%[\w.]+) = call .*exchange_malloc[^(]*\(i64 noundef (\d+), i64 noundef (\d+)\)',L[ci]); res,sz,al=m.group(1),int(m.group(2)),int(m.group(3))
# block label containing ci
bi=max(i for i in range(s,ci) if re.match(r'^[\w.$-]+:',L[i]) or L[i].startswith('define'))
blk=re.match(r'^([\w.$-]+):',L[bi]).group(1) if not L[bi].startswith('define') else 'start'
# terminator of block
ti=next(i for i in range(ci,e) if re.match(r'\s+(br|switch|ret|unreachable)\b',L[i]))
succ=re.findall(r'label %([\w.$-]+)',L[ti])
hae=[l for l in L if 'handle_alloc_error' in l and l.startswith('declare')]
fn=re.search(r'@(\S+)\(',hae[0]).group(1) if hae else None
if fn is None: fn=re.search(r'@(_ZN5alloc5alloc18handle_alloc_error\w+)',open(src).read()).group(1)
new=[f'  %em1 = load i64, ptr inttoptr (i64 12884901888 to ptr), align 4294967296',
 f'  %em2 = icmp eq i64 %em1, 0',f'  %em3 = select i1 %em2, i64 12884934656, i64 %em1',
 f'  %em4 = tail call i64 @llvm.usub.sat.i64(i64 %em3, i64 {sz})',f'  %em5 = and i64 %em4, {-al}',
 f'  %em6 = icmp ult i64 %em5, 12884901896',f'  br i1 %em6, label %em_fail, label %em_ok','',
 'em_fail:',f'  tail call void @{fn}(i64 noundef {al}, i64 noundef {sz}) #34','  unreachable','',
 'em_ok:',f'  store i64 %em5, ptr inttoptr (i64 12884901888 to ptr), align 4294967296',f'  {res} = inttoptr i64 %em5 to ptr']
L[ci:ci+1]=new
# fix phis in successors
d=len(new)-1; e+=d
for sname in set(succ):
    si=next(i for i in range(s,e) if L[i].startswith(sname+':'))
    j=si+1
    while 'phi ' in L[j]:
        L[j]=re.sub(r'(\[ [^,\]]+, )%'+re.escape(blk)+r'( \])',r'\1%em_ok\2',L[j]); j+=1
open(dst,'w').write('\n'.join(L)); print('inlined in block',blk,'succ',succ)
