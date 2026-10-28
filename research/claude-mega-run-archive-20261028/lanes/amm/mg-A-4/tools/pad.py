# pad.py TEMPLATE OUT : lines '<indent>//PAD' expand to N comment lines so the next //@N marker lands exactly.
import sys,re
t=open(sys.argv[1]).read().splitlines()
out=[];pend=None;bad=0
for l in t:
    if l.strip()=='//PAD':
        pend=(len(out),re.match(r'\s*',l).group(0));continue
    m=re.search(r'\s*//@(\d+)\s*$',l)
    if m:
        want=int(m.group(1)); l=l[:m.start()]
        if pend is not None:
            k=want-(len(out)+1)
            if k<0: print('PAD negative',want,k); bad+=1; k=0
            out[pend[0]:pend[0]]=[pend[1]+'//']*k; pend=None
        if len(out)+1!=want: print('anchor want',want,'got',len(out)+1,l.strip()[:60]); bad+=1
    out.append(l)
open(sys.argv[2],'w').write('\n'.join(out)+'\n'); print('lines',len(out),'bad',bad)
