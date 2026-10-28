import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07/gen')
from lines import *; import sig
name=sys.argv[1]; root=clone(name)
print('sig',sig.apply(root))
t=F(root,'trade_v3.rs')
FEE='crate::trade::native_transfer_fee::Fee'
def cq(nm,body):
    return ('#[inline(never)]\nfn %s(a:&SellV3)->Result<(bool,Option<%s>)>{\n'%(nm,FEE))+body+'}\n'
A=''' let is_native=a.bonding_curve.quote_mint==Pubkey::default();
 let quote_mint=a.quote_mint.key();
 let quote_token_program=a.quote_token_program.key();
 if !is_native{
  crate::buy_v2::admit_associated_token_account(a.associated_quote_bonding_curve.as_ref(),&a.bonding_curve.to_account_info(),quote_mint,quote_token_program,&a.quote_mint.to_account_info(),&a.quote_token_program.to_account_info(),false,a.user.as_ref(),a.system_program.as_ref())?;
  crate::buy_v2::check_token_account(a.associated_quote_user.as_ref(),a.user.as_ref(),quote_mint,quote_token_program)?;
 }
 validate_buyback_fee_recipient_account(&a.global,a.buyback_fee_recipient.as_ref(),is_native,&quote_mint,&quote_token_program)?;
 let fee=if is_native{None}else{crate::transfer_fee_recovered::get_transfer_fee(&a.quote_mint.to_account_info())?};
 Ok((is_native,fee))
'''
B=A.replace(''' let is_native=a.bonding_curve.quote_mint==Pubkey::default();
 let quote_mint=a.quote_mint.key();
 let quote_token_program=a.quote_token_program.key();
''',''' let quote_mint=a.quote_mint.key();
 let quote_token_program=a.quote_token_program.key();
 let is_native=a.bonding_curve.quote_mint==Pubkey::default();
''')
C=A.replace(''' let fee=if is_native{None}else{crate::transfer_fee_recovered::get_transfer_fee(&a.quote_mint.to_account_info())?};
 Ok((is_native,fee))
''',''' if is_native{return Ok((is_native,None));}
 let fee=crate::transfer_fee_recovered::get_transfer_fee(&a.quote_mint.to_account_info())?;
 Ok((is_native,fee))
''')
i=t.l.index('fn check_quote(a:&SellV3)->Result<(Option<u8>,Option<(u64,u64,u64)>)>{')+1
j=i
while t.l[j-1]!='}': j+=1
NEW=cq('check_quote',A).rstrip('\n').split('\n')
assert len(NEW)<=j-i+1,(len(NEW),j-i+1)
t.rep(i,'\n'.join(NEW+['']*(j-i+1-len(NEW))))
CONV='let quote_fee=quote_fee.map(|f|(f.epoch,f.maximum_fee,f.basis_points as u64));'
t.sub('''#[inline(never)]
fn v3_quote_context(a:&SellV3)->Result<(bool,Option<(u64,u64,u64)>)>{
    let (decimals,quote_fee)=check_quote(a)?;
    let is_sol=decimals.is_none();
    if is_sol{a.global.validate_buyback_fee_recipient(&a.buyback_fee_recipient.key())?;}
    Ok((is_sol,quote_fee))
}''','\n\n\n\n\n\n')
t.sub('    let (is_sol,quote_fee)=v3_quote_context(a)?;','    let (is_sol,quote_fee)=check_quote(a)?;'+CONV)
t.sub('''    let (quote_decimals,quote_fee)=check_quote(a)?;
    let is_sol=quote_decimals.is_none();
    if is_sol{a.global.validate_buyback_fee_recipient(&a.buyback_fee_recipient.key())?;}''','''    let (is_sol,quote_fee)=check_quote_b(a)?;%s
    let quote_decimals:Option<u8>=if is_sol{None}else{Some(a.quote_mint.decimals)};
'''%CONV)
t.sub('''    let (quote_decimals,quote_fee)=check_quote(a)?;
    let is_sol=quote_decimals.is_none();''','''    let (is_sol,quote_fee)=check_quote_c(a)?;%s
    let quote_decimals:Option<u8>=if is_sol{None}else{Some(a.quote_mint.decimals)};'''%CONV)
k=[n for n,x in enumerate(t.l) if 'if is_sol{a.global.validate_buyback_fee_recipient(&a.buyback_fee_recipient.key())?;}' in x]
assert len(k)==1,k; t.l[k[0]]=''
t.save()
open(t.p,'a').write('\n'+cq('check_quote_b',B)+cq('check_quote_c',C))
print('ok',root)
