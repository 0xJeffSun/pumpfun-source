import sys,re; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07/gen')
from lines import *
name=sys.argv[1]; root=clone(name,base=L+'/v/p3/src')
t=F(root,'trade_v3.rs')
t.sub(' let is_native=a.bonding_curve.quote_mint==Pubkey::default();\n let quote_mint=a.quote_mint.key();',' let is_native=quote_is_native(&a.bonding_curve);\n let quote_mint=a.quote_mint.key();',count=2)
t.save()
src='\n'.join(t.l)
i=src.index('#[inline(never)]\nfn check_quote(a:&SellV3)'); j=src.index('\n}\n',i)+3
A=src[i:j]
GT='crate::transfer_fee_recovered::get_transfer_fee(&a.quote_mint.to_account_info())'
FEEL=' let fee=if is_native{None}else{%s?};\n'%GT
def var(nm,new):
    b=A.replace('fn check_quote(','fn %s('%nm); assert FEEL in b; return b.replace(FEEL,new)
FT='crate::trade::native_transfer_fee::Fee'
V=[var('cq_1',' const NO_FEE:Option<%s>=None;let fee=if is_native{NO_FEE}else{%s?};\n'%(FT,GT)),
   var('cq_2',' let fee=if is_native{None}else{Some(%s?)}.flatten();\n'%GT),
   var('cq_3',' let fee=if is_native{Option::<%s>::default()}else{%s?};\n'%(FT,GT)),
   var('cq_4',' let fee=if is_native{None}else{quote_mint_fee(&a.quote_mint)?};\n'),
   var('cq_5',' let mut fee=None;if !is_native{fee=%s?;}\n'%GT),
   var('cq_6',' let fee=match is_native{true=>None,false=>match %s{Ok(f)=>f,Err(e)=>return Err(e)}};\n'%GT)]
extra='\n'+'\n'.join(V)+'\nfn quote_is_native(curve:&BondingCurve)->bool{curve.quote_mint==Pubkey::default()}\nfn quote_mint_fee(mint:&InterfaceAccount<Mint>)->Result<Option<%s>>{crate::transfer_fee_recovered::get_transfer_fee(&mint.to_account_info())}\n'%FT
open(t.p,'a').write(extra)
t=F(root,'trade_v3.rs')
t.sub('    let (is_sol,quote_fee)=check_quote(a)?;let quote_fee','    let (is_sol,quote_fee)=if amount==11{cq_1(a)?}else if amount==12{cq_2(a)?}else if amount==13{cq_3(a)?}else if amount==14{cq_4(a)?}else if amount==15{cq_5(a)?}else if amount==16{cq_6(a)?}else{check_quote(a)?};let quote_fee')
t.save(); print('ok')
