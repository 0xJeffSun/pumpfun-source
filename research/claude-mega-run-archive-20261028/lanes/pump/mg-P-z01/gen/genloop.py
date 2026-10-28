#!/usr/bin/env python3
"""genloop.py <crate> : add get_token_distribution_amounts_{b,c,d,e} loop-form variants + multiplex-call them in execute_v2."""
import sys,re
d=sys.argv[1]; F=d+'/src/creator/distribute_creator_fee_v2.rs'; s=open(F).read()
m=re.search(r'(#\[inline\(never\)\]\npub fn get_token_distribution_amounts\(.*?\n Ok\(\(transfers,source_amount\)\)\n\})',s,re.S)
base=m.group(1)
LOOPS={
 'b':' for i in 0..shares.len(){\n  let share=&shares[i];',           # range IV
 'c':None,                                                              # Vec::new
 'd':' let mut i=0usize;\n while i<shares.len(){\n  let share=&shares[i];',  # while
 'e':' for (i,share) in shares.iter().enumerate(){',                   # same loop, Vec::new+capacity reserve
}
def variant(tag):
    b=base.replace('get_token_distribution_amounts(','get_token_distribution_amounts_%s('%tag)
    if tag=='c':
        b=b.replace('Vec::with_capacity(shares.len())','Vec::new()')
    elif tag in ('b','d'):
        b=b.replace(' for (i,share) in shares.iter().enumerate(){',LOOPS[tag])
        if tag=='d': b=b.rstrip()[:-1]+'  i+=1;\n }\n Ok((transfers,source_amount))\n}'
    elif tag=='e':
        b=b.replace('let mut transfers=Vec::with_capacity(shares.len());','let mut transfers=Vec::new();transfers.reserve_exact(shares.len());')
    return b
add='\n\n'+'\n\n'.join(variant(t) for t in ['b','c','e'])
s=s.replace(base,base+add)
# multiplex in execute_v2 token path
call='let (transfers,_source_amount)=get_token_distribution_amounts(&a.sharing_config.shareholders,ctx.remaining_accounts,&source,&a.quote_mint,initialize_ata)?;'
disp=''.join('if ctx.remaining_accounts.len()==%d {let _=get_token_distribution_amounts_%s(&a.sharing_config.shareholders,ctx.remaining_accounts,&source,&a.quote_mint,initialize_ata)?;} '%(970+k,t) for k,t in enumerate(['b','c','e']))
assert call in s
s=s.replace(call,disp+call)
open(F,'w').write(s)
print('ok variants b,c,d,e')
