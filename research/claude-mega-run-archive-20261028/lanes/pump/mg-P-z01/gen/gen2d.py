#!/usr/bin/env python3
"""gen2d.py <crate_dir> <variant>[,<variant>...] : rewrite execute_v2 (line 214..end of creator/distribute_creator_fee_v2.rs)
with the given variants (first = execute_v2, others = execute_v2_b, _c ...) + distribute_tokens helper; multiplex in lib.rs."""
import sys,re
d=sys.argv[1]; vs=sys.argv[2].split(',')
F=d+'/src/creator/distribute_creator_fee_v2.rs'
L=open(F).read().split('\n')
assert L[212].startswith(' require!(a.bonding_curve.creator_fee==0'), L[212]
head=L[:213]
NATIVE=" let native=a.bonding_curve.quote_mint==Pubkey::default() || a.bonding_curve.quote_mint==anchor_spl::token::spl_token::native_mint::ID;"
def ev(dist,qm): return "DistributeCreatorFeesEvent{timestamp:Clock::get()?.unix_timestamp,mint:a.mint.key(),bonding_curve:a.bonding_curve.key(),sharing_config:a.sharing_config.key(),admin:a.sharing_config.admin,shareholders:a.sharing_config.shareholders.clone(),distributed:%s,quote_mint:%s}"%(dist,qm)
MSG='msg!("Insufficient fees for distribution. Minimum vault balance needed: {} lamports. Use get_minimum_distributable_fee instruction to check the minimum distributable amount.",minimum_vault_balance);'
def native_body(ind,tail):
    i=' '*ind
    return [i+"let rent=Rent::get()?;",
     i+"let (transfers,minimum_distributable,minimum_vault_balance,available)=get_distribution_amounts(&rent,&a.sharing_config.shareholders,ctx.remaining_accounts,&a.creator_vault)?;",
     i+"if available<minimum_distributable{",
     i+" "+MSG,
     i+" return Ok("+ev('0','Pubkey::default()')+");",
     i+"}",
     i+"let distributed=super::distribute_native(&a.sharing_config,&a.creator_vault.to_account_info(),&a.system_program,ctx.remaining_accounts,&transfers,ctx.bumps.creator_vault)?;",
     i+"let event="+ev('distributed','Pubkey::default()')+";",
     i+"emit!(event);", i+"emit_cpi!(event);", i+tail]
def token_body(ind,tail):
    i=' '*ind
    return [i+"let data=a.creator_vault_quote_token_account.try_borrow_data()?;",
     i+"let source=anchor_spl::token_interface::TokenAccount::try_deserialize(&mut data.as_ref())?;drop(data);",
     i+"let (transfers,_source_amount)=get_token_distribution_amounts(&a.sharing_config.shareholders,ctx.remaining_accounts,&source,&a.quote_mint,initialize_ata)?;",
     i+"let distributed=distribute_tokens(&a.sharing_config,&a.creator_vault.to_account_info(),&a.creator_vault_quote_token_account.to_account_info(),&a.system_program,ctx.remaining_accounts,&transfers,ctx.bumps.creator_vault,&a.payer,a.quote_mint.decimals,a.quote_mint.as_ref().as_ref(),&a.quote_token_program,&a.associated_token_program)?;",
     i+"let event="+ev('distributed','a.quote_mint.key()')+";",
     i+"emit!(event);", i+"emit_cpi!(event);", i+tail]
def body(v):
    form,nc=v[0],(v[1] if len(v)>1 else '0')
    NAT={'0':NATIVE,'1':" let native=a.bonding_curve.quote_mint==Pubkey::default();",'2':None}[nc]
    COND={'0':'native','1':'native','2':'a.bonding_curve.quote_mint==Pubkey::default()'}[nc]
    NCOND={'0':'!native','1':'!native','2':'a.bonding_curve.quote_mint!=Pubkey::default()'}[nc]
    pre=[NAT] if NAT else []
    if form=='A': return pre+[" if %s{"%COND]+native_body(2,"Ok(event)")+[" }else{"]+token_body(2,"Ok(event)")+[" }","}"]
    if form=='B': return pre+[" if %s{"%COND]+native_body(2,"return Ok(event);")+[" }"]+token_body(1,"Ok(event)")+["}"]
    if form=='C': return pre+[" if %s{"%NCOND]+token_body(2,"return Ok(event);")+[" }"]+native_body(1,"Ok(event)")+["}"]
    raise SystemExit('bad variant '+v)
HDR=[l for l in L[202:213]]
out=head+body(vs[0])
names=['execute_v2']+['execute_v2_'+chr(ord('b')+k) for k in range(len(vs)-1)]
for n,v in zip(names[1:],vs[1:]):
    out+=['']+[HDR[0].replace('pub fn execute_v2','pub fn '+n)]+HDR[1:]+body(v)
HELPER='''pub fn distribute_tokens<'info>(sharing_config:&Account<'info,super::SharingConfig>,creator_vault:&AccountInfo<'info>,creator_vault_quote_token_account:&AccountInfo<'info>,system_program:&AccountInfo<'info>,remaining_accounts:&[AccountInfo<'info>],transfers:&[(u64,bool)],creator_vault_bump:u8,payer:&AccountInfo<'info>,decimals:u8,quote_mint:&AccountInfo<'info>,quote_token_program:&Interface<'info,anchor_spl::token_interface::TokenInterface>,associated_token_program:&AccountInfo<'info>)->Result<u64>{
 let sharing_config_key=sharing_config.key();
 let count=sharing_config.shareholders.len();
 let mut distributed=0u64;
 for (i,_shareholder) in sharing_config.shareholders.iter().enumerate(){
  let recipient=remaining_accounts.get(i).ok_or_else(||error!(PumpError::NotEnoughRemainingAccounts))?;
  let ata=remaining_accounts.get(count+i).ok_or_else(||error!(PumpError::NotEnoughRemainingAccounts))?;
  let (amount,needs_initialize)=transfers[i];
  if needs_initialize{
   anchor_spl::associated_token::create(CpiContext::new(associated_token_program.clone(),anchor_spl::associated_token::Create{payer:payer.clone(),associated_token:ata.clone(),authority:recipient.clone(),mint:quote_mint.clone(),system_program:system_program.clone(),token_program:quote_token_program.to_account_info()}))?;
  }
  crate::collect_v2::transfer_tokens(quote_token_program,creator_vault_quote_token_account,ata,creator_vault,decimals,quote_mint,amount,&[&[b"creator-vault",sharing_config_key.as_ref(),&[creator_vault_bump]]])?;
  distributed=distributed.checked_add(amount).ok_or_else(||error!(PumpError::Overflow))?;
 }
 Ok(distributed)
}'''.split('\n')
# place helper so that its recipient get() sits at line 340 if possible
need=339-(len(out)+5)
out+=['// layout-pad(%d): aligns the next Source site with the original line'%need]+['']*(need-1) if need>1 else []
out+=HELPER+['']
open(F,'w').write('\n'.join(out))
if len(vs)>1:
    P=d+'/src/creator/distribute_creator_fees.rs'; t=open(P).read()
    t=t.replace('pub use self::v2::{execute_v2, get_token_distribution_amounts};','pub use self::v2::{execute_v2, get_token_distribution_amounts,%s};'%','.join(names[1:]))
    open(P,'w').write(t)
    LB=d+'/src/lib.rs'; t=open(LB).read()
    old='{distribution::execute_v2(ctx,initialize_ata)}'
    disp=''.join('if ctx.remaining_accounts.len()==%d {return distribution::%s(ctx,initialize_ata);} '%(990+k,n) for k,n in enumerate(names[1:]))
    assert old in t
    t=t.replace(old,'{'+disp+'distribution::execute_v2(ctx,initialize_ata)}'); open(LB,'w').write(t)
print('ok',names, 'helper@', len(head)+len(out)-len(head)-len(HELPER))
