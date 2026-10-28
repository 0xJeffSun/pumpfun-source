import os
def edit(b):
    L=b.split('\n')
    names=os.environ['MV'].split(',')   # list of alloca names to move (kept in given order)
    after=os.environ['AFTER']
    lines=[]
    for n in names:
        i=next(k for k,l in enumerate(L) if l.startswith(f'  {n} = alloca'))
        lines.append(L.pop(i))
    j=next(k for k,l in enumerate(L) if l=='start:') if after=='start:' else next(k for k,l in enumerate(L) if l.startswith(f'  {after} = alloca'))
    for x in reversed(lines): L.insert(j+1,x)
    return '\n'.join(L)
