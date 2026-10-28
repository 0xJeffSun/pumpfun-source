# blkexp.py IN.ll OUT.ll MODE : export-status experiments on the _70 arm error path of set
import sys,re
t=open(sys.argv[1]).read(); mode=sys.argv[3]
fs='16set_coin_creator3set17'
m=re.search(r'\ndefine [^\n]*'+re.escape(fs)+r'[^\n]*\{\n',t); s=m.start()+1; e=t.index('\n}\n',s)+3
f=t[s:e].split('\n')
lam=next(k for k,l in enumerate(f) if l.strip().startswith('%_70.val = load ptr'))
dat=lam+1
LAMADDR=re.search(r'ptr (%authority_info[^,]*),',f[lam]).group(1); DATADDR=re.search(r'ptr (%authority_info[^,]*),',f[dat]).group(1)
def nextblock_start(label_sub):
    return next(k for k,l in enumerate(f) if k>lam and l.startswith(label_sub))
if mode=='e1':   # weak-dec block of lam reloads the pointer
    b=nextblock_start('bb1.i.i.i.i250:')
    f.insert(b+1,'  %_70.valr = load ptr, ptr '+LAMADDR+', align 8')
    for k in range(b+2,b+6): f[k]=f[k].replace('%_70.val,','%_70.valr,').replace('ptr %_70.val, i64','ptr %_70.valr, i64')
elif mode=='e2': # data ptr loaded in its first use block instead of bb61
    D=f[dat]; del f[dat]
    b=next(k for k,l in enumerate(f) if k>lam and l.startswith('"_ZN4core3ptr84drop_in_place') and 'exit.i.i244' in l)
    f.insert(b+1,D)
open(sys.argv[2],'w').write(t[:s]+'\n'.join(f)+t[e:]); print(mode)
