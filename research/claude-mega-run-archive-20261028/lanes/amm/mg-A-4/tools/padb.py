# padb.py TEMPLATE OUT : '<indent>//PAD' lines expand to N blank lines so the next //@N marker lands exactly on line N.
import sys,re
t=open(sys.argv[1]).read().splitlines()
out=[];pend=None;bad=0
for l in t:
    if l.strip()=='//PAD':
        pend=len(out);continue
    m=re.search(r'\s*//@(\d+)\s*$',l)
    if m:
        want=int(m.group(1)); l=l[:m.start()]
        if pend is not None:
            k=want-(len(out)+1)
            if k<0: print('PAD negative',want,k); bad+=1; k=0
            out[pend:pend]=['']*k; pend=None
        if len(out)+1!=want: print('anchor want',want,'got',len(out)+1,l.strip()[:60]); bad+=1
    out.append(l)
open(sys.argv[2],'w').write('\n'.join(out)+'\n'); print('lines',len(out),'bad',bad)
