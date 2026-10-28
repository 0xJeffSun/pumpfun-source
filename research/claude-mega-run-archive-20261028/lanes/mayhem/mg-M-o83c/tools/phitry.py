"""phitry.py IR ORDER [ORDER...]: reorder the event-join phis (block holding sol_amount phi) to ORDER (short keys; ptr phis
keep their relative place at the front unless listed) and llc+score."""
import sys,re; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83c/tools'); import irlib
FULL={'qvb':'quote_vault_balance','sqd':'state_quote_deployed','gsd':'global_sol_deployed','vq':'virtual_quote','rq':'real_quote',
 'gqd':'global_quote_deployed','sa':'sol_amount','svb':'sol_vault_balance','ssd':'state_sol_deployed','vs':'virtual_sol','rs':'real_sol'}
def joinblock(h):
    ls=h.split('\n')
    for i,l in enumerate(ls):
        m=re.match(r'^([^\s;][^:]*):',l)
        if m:
            j=i+1; names=[]
            while j<len(ls) and ' = phi ' in ls[j]: names.append(re.match(r'\s*%([^ ]+) = phi',ls[j]).group(1)); j+=1
            if any(n.startswith('sol_amount') for n in names): return m.group(1),names
def tryorder(IR,order,label='pt'):
    pre,h,post=irlib.load(IR); blk,names=joinblock(h)
    ptrs=[n for n in names if not any(n.startswith(v) for v in FULL.values())]
    keys=order.split(',')
    full=[k if k.startswith('_') else [n for n in names if n.startswith(FULL[k]+'.') or n==FULL[k]][0] for k in keys]
    if not any(k.startswith('_') for k in keys): full=ptrs+full
    h2=irlib.set_phi_order(h,blk,full)
    return irlib.run(IR,h2,label),blk
if __name__=='__main__':
    for o in sys.argv[2:]: print(tryorder(sys.argv[1],o),o)
