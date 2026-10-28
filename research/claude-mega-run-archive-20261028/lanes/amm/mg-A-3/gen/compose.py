# compose.py CBTEMPLATE [OUT]: build buy.rs = base buy.rs with BuyEvent moved to end, old distribute_cashback removed,
# new distribute_cashback (template with '//@N' end-of-line anchors and '//PAD' blank-expander lines) at the top.
import sys,re
B='/Users/shawwalters/amm100-run/lanes/mg-union/u744/src/programs/pump-amm/src/instructions/swap/buy.rs'
OUT=sys.argv[2] if len(sys.argv)>2 else '/Users/shawwalters/amm100-run/lanes/mg-A-3/src/programs/pump-amm/src/instructions/swap/buy.rs'
src=open(B).read().split('\n')
L=lambda a,b: src[a-1:b]          # 1-based inclusive
event=L(3,47); uses=L(48,49); mid=L(108,708)
def pad(tpl,start):
    out=[];pend=None;bad=0
    for l in tpl:
        if l.strip()=='//PAD': pend=len(out);continue
        m=re.search(r'\s*//@(\d+)\s*$',l)
        if m:
            want=int(m.group(1)); l=l[:m.start()]
            if pend is not None:
                k=want-(start+len(out)); 
                if k<0: print('PAD negative',want); bad+=1; k=0
                out[pend:pend]=['']*k; pend=None
            if start+len(out)!=want: print('anchor',want,'got',start+len(out),l.strip()[:50]); bad+=1
        out.append(l)
    return out,bad
tpl=open(sys.argv[1]).read().rstrip('\n').split('\n')
head=[src[0]]+uses
body,bad=pad(['//PAD']+tpl,len(head)+1)
top=head+body
if len(top)>107: print('TOO LONG',len(top)); bad+=1
top+=['']*(107-len(top))
out=top+mid
while out[-1]=='': out.pop()
out+=['']+event+['']
import os
if os.environ.get('EXTRA'): out+=open(os.environ['EXTRA']).read().split('\n')
open(OUT,'w').write('\n'.join(out))
print('lines',len(out),'bad',bad,'fn ends',len(head)+len(body))
