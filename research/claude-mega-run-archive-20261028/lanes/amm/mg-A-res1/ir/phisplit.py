# phisplit.py IN.ll OUT.ll WHICH : split aggregate {i64,ptr} return phis into scalar phis (WHICH: pn | pn37 | both)
import sys,re
t=open(sys.argv[1]).read(); which=sys.argv[3]
fs='16set_coin_creator3set17'
m=re.search(r'\ndefine [^\n]*'+re.escape(fs)+r'[^\n]*\{\n',t); s=m.start()+1; e=t.index('\n}\n',s)+3
f=t[s:e].split('\n')
def split(name):
    p=next(k for k,l in enumerate(f) if l.strip().startswith('%'+name+' = phi { i64, ptr }'))
    inc=re.findall(r'\[ (%[\w.]+), (%[^\]]+) \]',f[p])
    ex0=f[p+1]; ex1=f[p+2]
    n0=re.match(r'\s*(%[\w.]+) = extractvalue',ex0).group(1); n1=re.match(r'\s*(%[\w.]+) = extractvalue',ex1).group(1)
    assert ('%s, 0'%('%'+name)) in ex0 and ('%s, 1'%('%'+name)) in ex1
    for v,_ in inc:
        c=next(k for k,l in enumerate(f) if l.strip().startswith(v+' = '))
        f.insert(c+1,'  %x'+v[1:]+'.0 = extractvalue { i64, ptr } '+v+', 0'); f.insert(c+2,'  %x'+v[1:]+'.1 = extractvalue { i64, ptr } '+v+', 1')
    p=next(k for k,l in enumerate(f) if l.strip().startswith('%'+name+' = phi { i64, ptr }'))
    f[p]='  %s = phi i64 %s'%(n0,', '.join('[ %x'+v[1:]+'.0, '+b+' ]' for v,b in inc))
    f[p+1]='  %s = phi ptr %s'%(n1,', '.join('[ %x'+v[1:]+'.1, '+b+' ]' for v,b in inc))
    del f[p+2]
for n in (['.pn','.pn37'] if which=='both' else [which]): split(n)
open(sys.argv[2],'w').write(t[:s]+'\n'.join(f)+t[e:]); print('split',which)
