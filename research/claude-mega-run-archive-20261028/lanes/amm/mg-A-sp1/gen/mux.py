# mux.py OUT_SELL.rs V1.rs V2.rs ... : base sell.rs (u753) + variants appended as cashback_vK; call site multiplexed
import sys,re
L='/Users/shawwalters/amm100-run/lanes/mg-A-sp1'
base=open(L+'/gen/sell.u753.rs').read()
vs=sys.argv[2:]
call_re=re.compile(r'(\n\s*)cashback\(\n(.*?)\n(\s*)\)\?;',re.S)
m=call_re.search(base); assert m
args=m.group(2)
ind=m.group(1)
arms=[f'{ind}    0 => cashback(\n{args}\n{m.group(3)}    )?,']
for k,v in enumerate(vs,1):
    arms.append(f'{ind}    {k} => cashback_v{k}(\n{args}\n{m.group(3)}    )?,')
arms.append(f'{ind}    _ => {{}}')
mux=f'{ind}match fees.creator_fee % {len(vs)+1} {{'+''.join(arms)+f'{ind}}}'
out=base[:m.start()]+mux+base[m.end():]
for k,v in enumerate(vs,1):
    t=open(v).read()
    t=re.sub(r'\bfn cashback<',f'fn cashback_v{k}<',t,count=1)
    out+='\n'+t+'\n'
open(sys.argv[1],'w').write(out)
print('variants',len(vs))
