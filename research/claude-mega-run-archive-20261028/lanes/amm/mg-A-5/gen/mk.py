# mk.py TEMPLATE OUT : a line ending in '//@N' must land on line N (marker stripped).
# Blank filler lines are inserted at the nearest preceding '//PAD' line (which is removed).
import sys,re
src=open(sys.argv[1]).read().split('\n')
if src and src[-1]=='': src=src[:-1]
out=[];pend=None;bad=0
for l in src:
    if l.strip()=='//PAD':
        pend=len(out);continue
    t=re.search(r'\s*//@(\d+)\s*$',l)
    if t:
        want=int(t.group(1));l=l[:t.start()]
        k=want-(len(out)+1)
        if k<0 or (k>0 and pend is None):
            print('ALIGN FAIL want',want,'have',len(out)+1,l.strip()[:70]);bad+=1
        elif k>0:
            out[pend:pend]=['']*k
        pend=None
    out.append(l)
open(sys.argv[2],'w').write('\n'.join(out)+'\n')
print('lines',len(out),'bad',bad)
