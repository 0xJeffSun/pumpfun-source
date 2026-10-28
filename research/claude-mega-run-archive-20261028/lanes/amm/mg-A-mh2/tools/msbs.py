# msbs.py OBJ|SO NAME ORIGADDR OI0 OI1 [maxlines] : masked (stack offsets as S) side-by-side of non-equal hunks with orig idx in [OI0,OI1)
import sys,re,difflib,importlib.util
spec=importlib.util.spec_from_file_location('oc','/Users/shawwalters/amm100-run/lanes/mg-A-mh2/tools/ocmp.py');oc=importlib.util.module_from_spec(spec);spec.loader.exec_module(oc)
path,nm,oa=sys.argv[1],sys.argv[2],int(sys.argv[3],16);o0,o1=int(sys.argv[4]),int(sys.argv[5]);mx=int(sys.argv[6]) if len(sys.argv)>6 else 40
B=oc.obj_ins(path,nm) if path.endswith('.o') else oc.so_ins(path,nm);A=oc.orig_ins(oa)
def mask(s):
    s=re.sub(r'\[r10 - 0x[0-9a-f]+\]','[S]',s);return re.sub(r'(add64 r\d+), -0x[0-9a-f]+$',r'\1, -S',s)
MA=[mask(x) for x in A];MB=[mask(x) for x in B]
sm=difflib.SequenceMatcher(None,MA,MB,autojunk=False);n=0
for t,i1,i2,j1,j2 in sm.get_opcodes():
    if t=='equal' or i2<o0 or i1>=o1: continue
    print(f'--{t} o[{i1}:{i2}] c[{j1}:{j2}]');n+=1
    for k in range(max(i2-i1,j2-j1)):
        a=MA[i1+k] if i1+k<i2 else ''; b=MB[j1+k] if j1+k<j2 else ''
        print(f'   {a:34s} | {b}');n+=1
        if n>=mx: sys.exit()
