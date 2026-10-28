# blkedit.py IN.ll OUT.ll MODE : edit the post-Error::from block of the _70 arm in set
import sys,re
t=open(sys.argv[1]).read(); mode=sys.argv[3]
fs='16set_coin_creator3set17'
m=re.search(r'\ndefine [^\n]*'+re.escape(fs)+r'[^\n]*\{\n',t); s=m.start()+1; e=t.index('\n}\n',s)+3
f=t[s:e].split('\n')
lam=next(k for k,l in enumerate(f) if l.strip().startswith('%_70.val = load ptr'))
dat=lam+1; assert f[dat].strip().startswith('%_70.val48 = load ptr')
call=max(k for k in range(lam) if '@"_ZN107_$LT$anchor_lang..error..Error' in f[k])
les=[k for k in range(call+1,lam) if 'lifetime.end' in f[k]]
L,D=f[lam],f[dat]
if mode=='dat_first':      # data load right after call
    del f[dat]; f.insert(call+1,D)
elif mode=='both_first':   # both loads right after call (data, lam)
    del f[dat]; del f[lam]; f.insert(call+1,L); f.insert(call+1,D)
elif mode=='both_first_ld':
    del f[dat]; del f[lam]; f.insert(call+1,D); f.insert(call+1,L)
elif mode=='no_le':
    for k in reversed(les): del f[k]
elif mode=='le_after':
    LE=[f[k] for k in les]
    for k in reversed(les): del f[k]
    i=next(k for k,l in enumerate(f) if l.strip().startswith('%_70.val48 = load ptr'))
    for x in reversed(LE): f.insert(i+1,x)
open(sys.argv[2],'w').write(t[:s]+'\n'.join(f)+t[e:]); print(mode,'call',call,'les',les,'lam',lam)
