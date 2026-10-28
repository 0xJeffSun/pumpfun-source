import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07/gen')
from lines import *
name=sys.argv[1]; root=clone(name,base=L+'/v/d1/src')
# (a) 0x6f3e8 legacy_sell::buyback_fee_recipient forms (multiplexed at lib.rs:367)
s=F(root,'sell.rs')
s.sub('    global.validate_buyback_fee_recipient(&account.key()).map(|_|account)\n','    let result=global.validate_buyback_fee_recipient(&account.key());result.map(|_|account)\n')
HB="#[inline(never)]\npub fn %s<'a,'info>(remaining_accounts:&'a [AccountInfo<'info>],global:&Global,index:usize)->Result<&'a AccountInfo<'info>>{\n    require!(index<remaining_accounts.len(),PumpError::BuybackFeeRecipientMissing);let account=&remaining_accounts[index];\n"
V={'bfr_b':'    global.validate_buyback_fee_recipient(&account.key())?;\n    Ok(account)\n}\n',
   'bfr_c':'    let key=account.key();global.validate_buyback_fee_recipient(&key).map(|_|account)\n}\n',
   'bfr_d':'    match global.validate_buyback_fee_recipient(&account.key()){Ok(())=>Ok(account),Err(e)=>Err(e)}\n}\n',
   'bfr_e':'    global.validate_buyback_fee_recipient(&account.key()).map(|_|account)\n}\n'}
s.save(); open(s.p,'a').write(''.join('\n'+HB%k+v for k,v in V.items()))
g=F(root,'lib.rs')
g.sub('     let bb=crate::legacy_sell::buyback_fee_recipient(rem,&a.global,1)?;','     let bb=match rem.len(){11=>crate::legacy_sell::bfr_b(rem,&a.global,1)?,12=>crate::legacy_sell::bfr_c(rem,&a.global,1)?,13=>crate::legacy_sell::bfr_d(rem,&a.global,1)?,14=>crate::legacy_sell::bfr_e(rem,&a.global,1)?,_=>crate::legacy_sell::buyback_fee_recipient(rem,&a.global,1)?};')
g.save()
# (b) 0x7f010 check_quote in the original shape (scaffold copies admit_o/ctac_o with by-value keys, original param order)
t=F(root,'trade_v3.rs')
i=t.l.index('fn check_quote(a:&SellV3)->Result<(Option<u8>,Option<(u64,u64,u64)>)>{')+1
j=i
while t.l[j-1]!='}': j+=1
n=j-i+1
NEW='''#[inline(never)]
fn check_quote(a:&SellV3)->Result<(bool,Option<(u64,u64,u64)>)>{
 let is_native=a.bonding_curve.quote_mint==Pubkey::default();
 let quote_mint=a.quote_mint.key();
 let quote_token_program=a.quote_token_program.key();
 if !is_native{
  admit_o(a.associated_quote_bonding_curve.as_ref(),&a.bonding_curve.to_account_info(),quote_mint,quote_token_program,&a.quote_mint.to_account_info(),&a.quote_token_program.to_account_info(),false,a.user.as_ref(),a.system_program.as_ref())?;
  ctac_o(a.associated_quote_user.as_ref(),a.user.as_ref(),quote_mint,quote_token_program)?;
 }
 validate_buyback_fee_recipient_account(&a.global,a.buyback_fee_recipient.as_ref(),is_native,&quote_mint,&quote_token_program)?;
 let fee=if is_native{None}else{quote_fee_snapshot(&a.quote_mint.to_account_info())?};
 Ok((is_native,fee))
}'''.split('\n')
assert len(NEW)<=n,(len(NEW),n)
t.rep(i,'\n'.join(NEW+['']*(n-len(NEW))))
print('check_quote lines',i,j)
t.sub('''#[inline(never)]
fn v3_quote_context(a:&SellV3)->Result<(bool,Option<(u64,u64,u64)>)>{
    let (decimals,quote_fee)=check_quote(a)?;
    let is_sol=decimals.is_none();
    if is_sol{a.global.validate_buyback_fee_recipient(&a.buyback_fee_recipient.key())?;}
    Ok((is_sol,quote_fee))
}''','\n\n\n\n\n\n')
t.sub('    let (is_sol,quote_fee)=v3_quote_context(a)?;','    let (is_sol,quote_fee)=check_quote(a)?;')
t.sub('''    let (quote_decimals,quote_fee)=check_quote(a)?;
    let is_sol=quote_decimals.is_none();
    if is_sol{a.global.validate_buyback_fee_recipient(&a.buyback_fee_recipient.key())?;}''','''    let (is_sol,quote_fee)=check_quote(a)?;
    let quote_decimals:Option<u8>=if is_sol{None}else{Some(a.quote_mint.decimals)};
''')
t.sub('''    let (quote_decimals,quote_fee)=check_quote(a)?;
    let is_sol=quote_decimals.is_none();''','''    let (is_sol,quote_fee)=check_quote(a)?;
    let quote_decimals:Option<u8>=if is_sol{None}else{Some(a.quote_mint.decimals)};''')
t.save()
assert 'validate_buyback_fee_recipient(&a.buyback_fee_recipient.key())' in t.l[1129]; t.l[1129]=''; t.save()
nxt=t.l[1126:1131]
print('line1130:',[x[:90] for x in nxt])
open(t.p,'a').write('''
#[inline(never)]
pub fn admit_o<'info>(account:&AccountInfo<'info>,authority:&AccountInfo<'info>,mint:Pubkey,token_program:Pubkey,mint_info:&AccountInfo<'info>,token_program_info:&AccountInfo<'info>,allow_create:bool,payer:&AccountInfo<'info>,system_program:&AccountInfo<'info>)->Result<()>{
 crate::buy_v2::admit_associated_token_account(account,authority,&mint,&token_program,payer,mint_info,allow_create,system_program,token_program_info)
}
#[inline(never)]
pub fn ctac_o<'info>(account:&AccountInfo<'info>,authority:&AccountInfo<'info>,mint:Pubkey,token_program:Pubkey)->Result<()>{
 crate::buy_v2::check_token_account(account,authority,&mint,&token_program)
}
''')
print('ok',root)
