# vscore.py IN.ll ADDR NAMEFMT K [-v k] : score variants NAMEFMT%k (k=0..K-1) by extracting each fn and llc; line imms masked
import sys,os,re,subprocess
sys.path.insert(0,os.path.dirname(__file__)); import irlib
src,addr,fmt,K=sys.argv[1],sys.argv[2],sys.argv[3],int(sys.argv[4])
def nm(k):
    if k==0: return fmt.split(',')[0]
    n=fmt.split(',')[1]%k; return '%d%s17h'%(len(n),n)
verbose=int(sys.argv[6]) if len(sys.argv)>6 and sys.argv[5]=='-v' else None
T=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'ir','tmp')
s=open(src).read()
def mask(B):
    return [re.sub(r'^(stw \[r10 - 0x[0-9a-f]+\]), 0x([0-9a-f]+)$',lambda m: m.group(1)+(', LINE' if 0x100<=int(m.group(2),16)<0x500 else ', 0x'+m.group(2)),x) for x in B]
A=mask(irlib.orig(addr))
for k in range(K):
    if verbose is not None and k!=verbose: continue
    sub=nm(k)
    if not re.search(r'(?m)^define [^\n]*'+re.escape(sub),s): print(k,sub,'NOT DEFINED (merged?)'); continue
    tmp=os.path.join(T,'v.ll'); 
    subprocess.run(['python3','-I',os.path.join(os.path.dirname(__file__),'irone.py'),src,tmp,sub],check=True)
    o,err=irlib.llc(open(tmp).read(),'v%d'%k,T)
    if o is None: print(k,'LLC FAIL',err[:200]); continue
    B=mask(irlib.objfn(o,sub)); a,b,d=irlib.ndiff(A,B)
    print(k,sub,'len',len(A),len(B),'diff -%d +%d'%(a,b),flush=True)
    if verbose is not None:
        for l in d[:int(os.environ.get('VMAX','60'))]: print(l)
