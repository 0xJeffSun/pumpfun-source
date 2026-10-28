import os,re
def edit(b):
    L=b.split('\n')
    i=next(k for k,l in enumerate(L) if 'store i8 %bump, ptr %_12.i18' in l)
    j=next(k for k,l in enumerate(L) if k>i and 'store i64 3, ptr %80' in l)
    mode=os.environ.get('MODE','strip')
    if mode=='strip':
        for k in range(i-12,j+1): L[k]=L[k].replace(', !noalias !8766','')
    elif mode=='bumplast':
        x=L.pop(i); L.insert(j,x)
    elif mode=='stripall':
        L=[l.replace(', !noalias !8766','') for l in L]
    elif mode=='keyfirst':
        # move the key memcpy lines after the stores? (no) -> move lifetime starts before key memcpy
        pass
    return '\n'.join(L)
