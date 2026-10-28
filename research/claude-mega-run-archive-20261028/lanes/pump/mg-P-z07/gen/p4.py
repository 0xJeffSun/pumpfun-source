import sys,re; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07/gen')
from lines import *
name=sys.argv[1]; root=clone(name,base=L+'/v/p3/src')
t=F(root,'trade_v3.rs')
src='\n'.join(t.l)
i=src.index('#[inline(never)]\nfn check_quote(a:&SellV3)'); j=src.index('\n}\n',i)+3
A=src[i:j]
def var(nm,repl):
    b=A.replace('fn check_quote(','fn %s('%nm)
    for o,n in repl:
        assert o in b,(nm,o); b=b.replace(o,n)
    return b
FEEL=" let fee=if is_native{None}else{crate::transfer_fee_recovered::get_transfer_fee(&a.quote_mint.to_account_info())?};\n Ok((is_native,fee))"
V=[var('cq_d',[(' Ok((is_native,fee))',' return Ok((is_native,fee));')]),
   var('cq_e',[(FEEL," let fee=match is_native{true=>None,false=>crate::transfer_fee_recovered::get_transfer_fee(&a.quote_mint.to_account_info())?};\n Ok((is_native,fee))")]),
   var('cq_g',[(FEEL," Ok((is_native,if is_native{None}else{crate::transfer_fee_recovered::get_transfer_fee(&a.quote_mint.to_account_info())?}))")]),
   var('cq_o',[(' let is_native=a.bonding_curve.quote_mint==Pubkey::default();',' let not_native=a.bonding_curve.quote_mint!=Pubkey::default();'),(' if !is_native{',' if not_native{'),('false,a.user.as_ref()','false,a.user.as_ref()'),('buyback_fee_recipient.as_ref(),is_native,','buyback_fee_recipient.as_ref(),!not_native,'),(FEEL," let fee=if not_native{crate::transfer_fee_recovered::get_transfer_fee(&a.quote_mint.to_account_info())?}else{None};\n Ok((!not_native,fee))")]),
   var('cq_n',[(' let is_native=a.bonding_curve.quote_mint==Pubkey::default();',' let is_native=quote_is_native(&a.bonding_curve);')])]
open(t.p,'a').write('\n'+'\n'.join(V)+'\nfn quote_is_native(curve:&BondingCurve)->bool{curve.quote_mint==Pubkey::default()}\n')
t=F(root,'trade_v3.rs')
t.sub('    let (is_sol,quote_fee)=check_quote(a)?;let quote_fee','    let (is_sol,quote_fee)=if amount==11{cq_d(a)?}else if amount==12{cq_e(a)?}else if amount==13{cq_g(a)?}else if amount==14{cq_o(a)?}else if amount==15{cq_n(a)?}else{check_quote(a)?};let quote_fee')
t.save(); print('ok')
