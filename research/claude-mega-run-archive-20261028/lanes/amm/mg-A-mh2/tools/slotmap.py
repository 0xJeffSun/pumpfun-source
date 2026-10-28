# slotmap.py SO ORIGADDR NAME [v] : align orig/cand with stack offsets masked; print masked ratio + orig->cand slot map
import sys,re,difflib,collections
sys.path.insert(0,'/Users/shawwalters/amm100-run/lanes/mg-A-mh2/tools')
import importlib.util
spec=importlib.util.spec_from_file_location('oc','/Users/shawwalters/amm100-run/lanes/mg-A-mh2/tools/ocmp.py');oc=importlib.util.module_from_spec(spec);spec.loader.exec_module(oc)
path,oa,nm=sys.argv[1],int(sys.argv[3-1+0] if False else sys.argv[2],16),sys.argv[3]
B=oc.obj_ins(path,nm) if path.endswith('.o') else oc.so_ins(path,nm)
A=oc.orig_ins(oa)
def mask(s):
    s=re.sub(r'\[r10 - 0x[0-9a-f]+\]','[S]',s)
    s=re.sub(r'(add64 r\d+), -0x[0-9a-f]+$',r'\1, -S',s)
    return s
def offs(s):
    r=re.findall(r'\[r10 - (0x[0-9a-f]+)\]',s)
    if not r:
        mm=re.match(r'add64 r\d+, -(0x[0-9a-f]+)$',s)
        if mm: r=[mm.group(1)]
    return [int(x,16) for x in r]
MA=[mask(x) for x in A];MB=[mask(x) for x in B]
sm=difflib.SequenceMatcher(None,MA,MB,autojunk=False)
eq=sum(i2-i1 for t,i1,i2,j1,j2 in sm.get_opcodes() if t=='equal')
print(f'masked: orig {len(A)} cand {len(B)} equal {eq} ratio {sm.ratio():.4f}')
mp=collections.defaultdict(collections.Counter)
for t,i1,i2,j1,j2 in sm.get_opcodes():
    if t!='equal': continue
    for k in range(i2-i1):
        oa_=offs(A[i1+k]);ob=offs(B[j1+k])
        for x,y in zip(oa_,ob):
            if x<0xf00: mp[x][y]+=1
if len(sys.argv)>4:
    for x in sorted(mp):
        print(f'{x:4x} -> '+' '.join(f'{y:x}x{c}' for y,c in mp[x].most_common(3)))
