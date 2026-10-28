# mux.py FILE VARIANTS.py FNSTART_PREFIX OUT : append variant copies of fn (starting at line beginning with FNSTART_PREFIX) to FILE -> OUT
# VARIANTS.py defines V = [(name, [(old,new),...]), ...]; each variant = fn renamed to <fname>_<name> with replacements applied
import sys,re
f,vf,pref,out=sys.argv[1:5]
L=open(f).read().split('\n')
s=next(i for i,l in enumerate(L) if l.startswith(pref))
e=next(i for i in range(s,len(L)) if L[i]=='}')
body='\n'.join(L[s:e+1])
fname=re.match(r'pub fn (\w+)',L[s]).group(1)
ns={};exec(open(vf).read(),ns)
add=[]
for name,reps in ns['V']:
    b=body.replace('pub fn '+fname+'(','pub fn '+fname+'_'+name+'(',1)
    for o,n in reps:
        if o not in b: print('MISSING in',name,':',o[:60]); sys.exit(1)
        b=b.replace(o,n)
    add.append(b)
open(out,'w').write('\n'.join(L)+'\n'+'\n'.join(add)+'\n')
print('variants',len(add))
