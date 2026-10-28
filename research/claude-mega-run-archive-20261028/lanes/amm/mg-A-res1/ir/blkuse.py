# blkuse.py IN.ll OUT.ll MODE
import sys,re
t=open(sys.argv[1]).read(); mode=sys.argv[3]
fs='16set_coin_creator3set17'
m=re.search(r'\ndefine [^\n]*'+re.escape(fs)+r'[^\n]*\{\n',t); s=m.start()+1; e=t.index('\n}\n',s)+3
f=t[s:e].split('\n')
lam=next(k for k,l in enumerate(f) if l.strip().startswith('%_70.val = load ptr')); dat=lam+1
ic=next(k for k in range(dat,len(f)) if f[k].strip().startswith('%165 = icmp ne ptr %_70.val48'))
asm=ic+1; assert 'llvm.assume' in f[asm]
f[ic]=f[ic].replace('%165 =','%nn165 ='); f[asm]=f[asm].replace('(i1 %165)','(i1 %nn165)')
if mode=='icmp_up':
    I=f[ic]; del f[ic]; f.insert(dat+1,I)
elif mode=='icmp_assume_up':
    I,A=f[ic],f[asm]; del f[asm]; del f[ic]; f.insert(dat+1,A); f.insert(dat+1,I)
elif mode=='no_assume':
    del f[asm]; del f[ic]
open(sys.argv[2],'w').write(t[:s]+'\n'.join(f)+t[e:]); print(mode)
