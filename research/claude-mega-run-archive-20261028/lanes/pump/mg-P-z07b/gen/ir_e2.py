import sys,re
sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07b/tools')
from irfn import load, edit
t=load('ir/us_b.ll')
def split(b, lab):
    # find block text
    m=re.search(r'\n'+re.escape(lab)+r':[^\n]*\n(.*?\n  unreachable\n)', b, re.S)
    blk=m.group(0); body=m.group(1)
    # predecessors: branches referencing label
    refs=[x for x in re.finditer(r'br i1 [^\n]*label %'+re.escape(lab)+r'\b', b)]
    assert len(refs)==2, len(refs)
    # retarget second ref to a copy
    r=refs[1]; s=r.group(0).replace('%'+lab, '%'+lab+'.dup')
    b=b[:r.start()]+s+b[r.end():]
    b=b.replace(blk, blk+'\n'+lab+'.dup:\n'+body)
    return b
def f(b):
    for lab in ('bb34.i.i','bb70.i'):
        b=split(b,lab)
    return b
t=edit(t,'update_schedule',f)
open('ir/us_b_e2.ll','w').write(t)
