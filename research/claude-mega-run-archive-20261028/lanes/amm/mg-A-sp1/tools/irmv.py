# irmv.py IN_ONE.ll FNSUB ADDR MOVE... : apply block moves (X>Y or X>END or X<Y (before Y)) and report odiff count
import sys,os
sys.path.insert(0,os.path.dirname(__file__)); import irlib
src,sub,addr=sys.argv[1:4]
M=irlib.Mod(open(src).read(),sub); order=list(range(len(M.blocks)))
for mv in sys.argv[4:]:
    if '>' in mv:
        x,y=mv.split('>'); xi=M.names.index(x); order.remove(xi)
        if y=='END': order.append(xi)
        else: order.insert(order.index(M.names.index(y))+1,xi)
    else:
        x,y=mv.split('<'); xi=M.names.index(x); order.remove(xi); order.insert(order.index(M.names.index(y)),xi)
T=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'ir','tmp')
o,err=irlib.llc(M.text(order),'mv',T)
if o is None: print('LLC FAIL',err[:300]); sys.exit(1)
A=irlib.orig(addr); B=irlib.objfn(o,sub); a,b,d=irlib.ndiff(A,B)
print(' '.join(sys.argv[4:]),'->',len(A),len(B),'-%d +%d'%(a,b))
if os.environ.get('V'):
    for l in d[:int(os.environ.get('V'))]: print(l)
