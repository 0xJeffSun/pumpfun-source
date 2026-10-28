# bsearch.py IN_ONE.ll FNSUB ADDR ITERS SEED [MOVES...] : local search over IR block order minimizing diff vs orig
import sys,random,time,os
sys.path.insert(0,os.path.dirname(__file__))
import irlib
src,sub,addr,iters,seed=sys.argv[1],sys.argv[2],sys.argv[3],int(sys.argv[4]),int(sys.argv[5])
T=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'ir','tmp')
M=irlib.Mod(open(src).read(),sub); A=irlib.orig(addr)
order=list(range(len(M.blocks)))
def apply_moves(order,moves):
    for mv in moves:
        x,y=mv.split('>'); xi=M.names.index(x); order.remove(xi)
        if y=='END': order.append(xi)
        else: order.insert(order.index(M.names.index(y))+1,xi)
    return order
order=apply_moves(order,sys.argv[6:])
def ev(order,tag):
    o,err=irlib.llc(M.text(order),tag+str(seed),T)
    if o is None: return 10**9
    B=irlib.objfn(o,sub); return irlib.score(A,B)
t=time.time(); cur=ev(order,'s'); print('start',cur,'%.2fs'%(time.time()-t),flush=True)
best=cur;bo=order[:]
rnd=random.Random(seed)
for it in range(iters):
    o2=order[:]
    i=rnd.randrange(1,len(o2)); b=o2.pop(i); j=rnd.randrange(1,len(o2)+1); o2.insert(j,b)
    s=ev(o2,'s')
    if s<=cur:
        if s<cur: print(it,s,M.names[b],'->after',M.names[o2[j-1]],flush=True)
        order=o2;cur=s
        if s<best: best=s;bo=o2[:]
print('best',best)
open(T+'/order_%d.txt'%seed,'w').write('\n'.join(M.names[i] for i in bo)+'\n'); print('order saved')
