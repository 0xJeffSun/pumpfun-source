# rsm.py OBJ|SO NAME ORIGADDR [minhunk] : register+stack masked ratio and big structural hunks
import sys,re,difflib,importlib.util
spec=importlib.util.spec_from_file_location('oc','/Users/shawwalters/amm100-run/lanes/mg-A-mh2/tools/ocmp.py');oc=importlib.util.module_from_spec(spec);spec.loader.exec_module(oc)
path,nm,oa=sys.argv[1],sys.argv[2],int(sys.argv[3],16);mh=int(sys.argv[4]) if len(sys.argv)>4 else 4
A=oc.orig_ins(oa);B=oc.obj_ins(path,nm) if path.endswith('.o') else oc.so_ins(path,nm)
def mask(s):
    s=re.sub(r'\[r10 - 0x[0-9a-f]+\]','[S]',s);s=re.sub(r'(add64 r\d+), -0x[0-9a-f]+$',r'\1, -S',s);return re.sub(r'\br\d\b','R',s)
MA=[mask(x) for x in A];MB=[mask(x) for x in B]
sm=difflib.SequenceMatcher(None,MA,MB,autojunk=False)
print('reg+stack masked ratio %.4f (orig %d cand %d)'%(sm.ratio(),len(A),len(B)))
for t,i1,i2,j1,j2 in sm.get_opcodes():
    if t!='equal' and (i2-i1)+(j2-j1)>=mh: print(' ',t,f'o[{i1}:{i2}] c[{j1}:{j2}] {i2-i1}/{j2-j1}')
