# mux2.py FILE VARIANTS.py OUT : VARIANTS.py defines FNS=[fn names forming a group, e.g. 'execute','account_size'] and
#   V=[(name,[(old,new),...]),...]. Each fn group (fn items incl. preceding #[...] attribute lines) is copied per variant with every
#   group fn renamed <fn>_<name> (calls inside the group updated), replacements applied, and appended to FILE -> OUT.
import sys,re
f,vf,out=sys.argv[1:4]
L=open(f).read().split('\n');ns={};exec(open(vf).read(),ns);FNS=ns['FNS']
def grab(fn):
    s=next(i for i,l in enumerate(L) if re.match(r'(pub(\(crate\))? )?fn '+fn+r'\b',l))
    while s>0 and L[s-1].startswith('#['): s-=1
    e=next(i for i in range(s,len(L)) if L[i]=='}')
    return '\n'.join(L[s:e+1])
grp='\n'.join(grab(fn) for fn in FNS)
add=[]
for name,reps in ns['V']:
    b=grp
    for o,n in reps:
        if o not in b: print('MISSING in',name,':',o[:70]); sys.exit(1)
        b=b.replace(o,n)
    for fn in FNS: b=re.sub(r'\b'+fn+r'\b',fn+'_'+name,b)
    b=b.replace('#[inline(always)]\n#[inline(always)]','#[inline(always)]')
    add.append(b)
open(out,'w').write('\n'.join(L)+'\n'+'\n'.join(add)+'\n'); print('variants',len(add))
