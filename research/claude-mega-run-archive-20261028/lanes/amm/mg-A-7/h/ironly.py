# ironly.py IN.ll OUT.ll FUNCSUB... : keep only definitions whose name contains a FUNCSUB; others -> declare
import sys,re
src=open(sys.argv[1]).read().split('\n');out=[];subs=sys.argv[3:]
i=0;n=len(src)
while i<n:
    l=src[i]
    if l.startswith('define '):
        name=re.search(r'@("[^"]+"|[\w.$]+)\(',l).group(1)
        j=i
        while src[j]!='}': j+=1
        if any(s in name for s in subs):
            out.extend(src[i:j+1])
        else:
            d=re.sub(r'^define ','declare ',l)
            d=re.sub(r'\)\s*(unnamed_addr\s*)?(#\d+\s*)?(personality [^{]*)?\{$',r') \1\2',d)
            d=re.sub(r' (internal|private|hidden|dso_local|linkonce_odr|weak_odr) ',' ',d)
            # drop param names
            out.append(d.rstrip())
        i=j+1;continue
    if ' = ' in l and ' alias ' in l and l.startswith('@'):
        i+=1;continue
    out.append(l);i+=1
open(sys.argv[2],'w').write('\n'.join(out))
