import os
def edit(b):
    L=b.split('\n')
    al=[k for k,l in enumerate(L) if ' = alloca ' in l]
    names=[L[k].split('=')[0].strip() for k in al]
    order=os.environ['ORDER'].split(',')   # full desired order of a subset; others keep relative positions
    lines={n:L[k] for n,k in zip(names,al)}
    rest=[n for n in names if n not in order]
    # place: keep everything before first ordered name, then ordered names, then rest in original order
    first=min(names.index(n) for n in order)
    new=[n for n in names[:first] if n not in order]+order+[n for n in names[first:] if n not in order]
    out=L[:al[0]]+[lines[n] for n in new]+L[al[-1]+1:]
    return '\n'.join(out)
