# blkmeta.py IN.ll OUT.ll MODE
import sys,re
t=open(sys.argv[1]).read(); mode=sys.argv[3]
fs='16set_coin_creator3set17'
m=re.search(r'\ndefine [^\n]*'+re.escape(fs)+r'[^\n]*\{\n',t); s=m.start()+1; e=t.index('\n}\n',s)+3
f=t[s:e].split('\n')
lam=next(k for k,l in enumerate(f) if l.strip().startswith('%_70.val = load ptr')); dat=lam+1
call=max(k for k in range(lam) if '@"_ZN107_$LT$anchor_lang..error..Error' in f[k])
les=[k for k in range(call+1,lam) if 'lifetime.end' in f[k]]
if mode=='lam_plain': f[lam]=re.sub(r', !nonnull ![0-9]+|, !noundef ![0-9]+','',f[lam])
elif mode=='dat_nn': f[dat]=f[dat]+', !nonnull !2, !noundef !2'
elif mode=='le_before':
    LE=[f[k] for k in les]
    for k in reversed(les): del f[k]
    for x in reversed(LE): f.insert(call,x)
elif mode=='dat_before_call':
    D=f[dat]; del f[dat]; f.insert(call,D)
open(sys.argv[2],'w').write(t[:s]+'\n'.join(f)+t[e:]); print(mode)
