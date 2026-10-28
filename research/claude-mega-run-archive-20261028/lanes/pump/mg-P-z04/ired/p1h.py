import os
def edit(b):
    L=b.split('\n')
    i=int(os.environ.get('SRC','617')); t=int(os.environ.get('TGT','75'))
    x=L.pop(i); L.insert(t,x)
    return '\n'.join(L)
