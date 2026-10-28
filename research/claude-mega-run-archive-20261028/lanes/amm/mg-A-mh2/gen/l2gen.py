# l2gen.py VARIANT : lane multi_hop_swap.rs = gen/mh_h6l11.rs with loop-2 (lines 312..366) variant; keeps total line count
import sys
L='/Users/shawwalters/amm100-run/lanes/mg-A-mh2'
P=L+'/src/programs/pump-amm/src/instructions/swap/multi_hop_swap.rs'
s=open(sys.argv[2] if len(sys.argv)>2 else L+'/gen/mh_h6l11.rs').read().split('\n')
blk=s[311:366]
curve=blk[3:31]   # lines 315..342 body of curve arm (excluding 'if' line and '} else {')
amm=blk[32:53]    # lines 344..364
head=blk[:3]      # 312..314
v=sys.argv[1]
if v=='a':   # AMM arm first
    new=head+['        if !is_curve_hop(hop)? {']+amm+['        } else {']+[x for x in curve[1:]]+['        }','    }']
elif v=='b': # named reallocs at arm start
    amm2=[x.replace('&mut BTreeSet::new(),','&mut reallocs,') for x in amm]
    new=head+blk[3:32]+['            let mut reallocs = BTreeSet::new();']+amm2+blk[53:]
elif v=='c': # loop/break form
    new=['    loop {','        if i >= hop_count {','            break;','        }']+blk[1:]
elif v=='d': # match on try_accounts instead of ?
    t='\n'.join(blk); t=t.replace('                &mut BTreeSet::new(),\n            )?;','                &mut BTreeSet::new(),\n            )\n            .map_err(|e| e)?;')
    new=t.split('\n')
elif v in ('e','f','g'):
    amm2=[x.replace('&mut BTreeSet::new(),','&mut reallocs,') for x in amm]
    inner=['        let mut end = i;','        while end < hop_count','            && is_curve_hop(&remaining[end.saturating_mul(5)..end.saturating_mul(5).saturating_add(5)])?','        {','            end = end.saturating_add(1);','        }']
    cond={'e':'        if end > i {','f':'        if end != i {','g':'        if i < end {'}[v]
    cbody=blk[10:31]   # lines 322..342
    new=head+inner+[cond]+cbody+['        } else {','            let mut reallocs = BTreeSet::new();']+amm2+['        }','    }']
else: raise SystemExit('unknown')
assert all(x.strip()=='' for x in s[366:388])
n=388-311; assert len(new)<=n, (len(new),n)
new=new+['']*(n-len(new))
s[311:388]=new
assert 'require_gte!(amount, min_amount_out' in s[388], s[388]
open(P,'w').write('\n'.join(s)); print('wrote',v,len(new))
