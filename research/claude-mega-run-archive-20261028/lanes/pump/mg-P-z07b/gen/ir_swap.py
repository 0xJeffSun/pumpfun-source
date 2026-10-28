import sys,re
sys.path.insert(0,'tools')
from irfn import load, edit
src,dst,fn,blk=sys.argv[1:5]
t=load(src)
def f(b):
    i=b.index('\n'+blk)
    j=b.index('\n',i+1)
    # next two lines are phis: swap them
    lines=b[j+1:].split('\n',2)
    assert lines[0].lstrip().startswith('%') and ' phi ' in lines[0] and ' phi ' in lines[1], lines[:2]
    return b[:j+1]+lines[1]+'\n'+lines[0]+'\n'+lines[2]
t=edit(t,fn,f)
open(dst,'w').write(t)
