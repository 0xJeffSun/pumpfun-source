# compose2.py CB BUY [EXACT] : full buy.rs = uses + cashback tpl (anchors) + base 108-210 + buy tpl (anchors) +
#   execute (base 348-656, or EXACT tpl) + base 657-708 + BuyEvent; patches lib.rs buy line (line-neutral).
import sys,re,os
U='/Users/shawwalters/amm100-run/lanes/mg-union/u744/src/programs/pump-amm/src/'
U753='/Users/shawwalters/amm100-run/lanes/mg-union/u753/src/programs/pump-amm/src/'
D='/Users/shawwalters/amm100-run/lanes/mg-A-3/src/programs/pump-amm/src/'
src=open(U+'instructions/swap/buy.rs').read().split('\n')
L=lambda a,b: src[a-1:b]
bad=0
def pad(tpl,start):
    global bad
    out=[];pend=None
    for l in tpl:
        if l.strip()=='//PAD': pend=len(out);continue
        m=re.search(r'\s*//@(\d+)\s*$',l)
        if m:
            want=int(m.group(1)); l=l[:m.start()]
            if pend is not None:
                k=want-(start+len(out))
                if k<0: print('PAD negative',want,k); bad+=1; k=0
                out[pend:pend]=['']*k; pend=None
            if start+len(out)!=want: print('anchor',want,'got',start+len(out),l.strip()[:50]); bad+=1
        out.append(l)
    return out
rd=lambda f: open(f).read().rstrip('\n').split('\n')
out=[src[0]]+L(48,49)
out+=pad(['//PAD']+rd(sys.argv[1]),len(out)+1)
if len(out)>107: print('CB TOO LONG',len(out)); bad+=1
out+=['']*(107-len(out))
out+=L(108,210)
out+=pad(['//PAD']+rd(sys.argv[2]),len(out)+1)
out+=['','']
if len(sys.argv)>3: out+=pad(['//PAD']+rd(sys.argv[3]),len(out)+1)
else: out+=L(348,656)
out+=L(657,708)
while out[-1]=='': out.pop()
out+=['']+L(3,47)+['']
open(D+'instructions/swap/buy.rs','w').write('\n'.join(out))
lib=open(U753+'lib.rs').read().split('\n')
i=next(k for k,l in enumerate(lib) if l.strip().startswith('pub fn buy<'))
lib[i]=lib[i].replace('legacy_buy::execute::<false>(','legacy_buy::buy(')
if len(sys.argv)>3:
    j=next(k for k,l in enumerate(lib) if l.strip().startswith('pub fn buy_exact_quote_in<'))
    lib[j]=lib[j].replace('legacy_buy::execute::<true>(','legacy_buy::buy_exact_quote_in(')
if os.environ.get('LIBUSE'):
    k=next(k for k,l in enumerate(lib) if l.startswith('pub use instructions::{boost, liquidity, swap::trade_v2};'))
    lib[k]='pub use instructions::{boost, liquidity, swap::{buy, trade_v2}};'
open(D+'lib.rs','w').write('\n'.join(lib))
print('lines',len(out),'bad',bad)
