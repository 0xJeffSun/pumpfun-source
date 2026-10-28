import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools')
from mk import make
MV='migrate_v2.rs'
OLD_ATA=" for (dest,wallet,m,tp) in [(&pb,&pool,&base_mint,&tok),(&pq,&pool,&wsol,&qt),(&tmpb,&pa,&base_mint,&tok),(&tmpq,&pa,&wsol,&qt)]{if native{create_associated_account(&ata,&pa,dest,wallet,m,&sys,tp,Some(&curve),&[pas])?;}else{create_associated_account(&ata,&user,dest,wallet,m,&sys,tp,None,&[])?;}}"
NEW_ATA=" let bump=ctx.bumps.pool_authority;create_token_account_v2(a,bump,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;create_token_account_v2(a,bump,&a.pool_quote_token_account,&a.pool,&a.quote_mint,native,&a.quote_token_program)?;create_token_account_v2(a,bump,&a.pool_authority_mint_account,&a.pool_authority,&a.base_mint,native,&a.base_token_program)?;create_token_account_v2(a,bump,&a.pool_authority_quote_account,&a.pool_authority,&a.quote_mint,native,&a.quote_token_program)?;"
OLD_FUND=" if native{move_lamports(&curve,&tmpq,quote)?;call(&qt,&[(&tmpq,false,true),(&a.rent.to_account_info(),false,false),(&curve,false,false)],vec![17],&[])?;}else if quote>0{let mut transfer=vec![12];transfer.extend_from_slice(&quote.to_le_bytes());transfer.push(a.quote_mint.decimals);call(&qt,&[(&a.associated_quote_bonding_curve.to_account_info(),false,true),(&wsol,false,false),(&tmpq,false,true),(&curve,true,false)],transfer,&[cs])?;}"
NEW_FUND=" fund_quote_token_account_v2(&ctx,quote,native)?;"
OLD_BOOST_START=" if !mayhem && (ctx.remaining_accounts.len()==2 || crate::migrate::native_payments::boost_enabled(&cfg)) {"
ATA_FN='''#[inline(never)]
pub fn create_token_account_v2<'info>(a:&MigrateV2<'info>,bump:u8,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,native:bool,token_program:&AccountInfo<'info>)->Result<()>{
 let token_program=token_program.clone();
 if native{
  create_token_account_signed(a,&a.bonding_curve,account,wallet,mint,token_program,&[&[b"pool-authority",a.base_mint.key().as_ref(),&[bump]]])?;
 }else{
  create_token_account_user(a,account,wallet,mint,token_program)?;
 }
 Ok(())
}
#[inline(always)]
fn create_token_account_signed<'info>(a:&MigrateV2<'info>,curve:&Account<'info,crate::trade_types::BondingCurve>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,token_program:AccountInfo<'info>,signer_seeds:&[&[&[u8]]])->anchor_lang::solana_program::entrypoint::ProgramResult{
 let ix=Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.pool_authority.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false),AccountMeta::new_readonly(curve.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()};
 invoke_signed(&ix,&[a.pool_authority.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program,curve.to_account_info()],signer_seeds)
}
#[inline(always)]
fn create_token_account_user<'info>(a:&MigrateV2<'info>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,token_program:AccountInfo<'info>)->anchor_lang::solana_program::entrypoint::ProgramResult{
 let ix=Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.user.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()};
 anchor_lang::solana_program::program::invoke(&ix,&[a.user.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program])
}
'''
FUND_FN='''#[inline(never)]
fn fund_quote_token_account_v2<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>,amount:u64,native:bool)->Result<()>{
 let a=&ctx.accounts;
 if native{
  a.bonding_curve.sub_lamports(amount)?;a.pool_authority_quote_account.add_lamports(amount)?;
  anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::token::ID,accounts:vec![AccountMeta::new(a.pool_authority_quote_account.key(),false),AccountMeta::new_readonly(a.rent.key(),false),AccountMeta::new(a.bonding_curve.key(),false)],data:anchor_spl::token::spl_token::instruction::TokenInstruction::SyncNative.pack()},&[a.pool_authority_quote_account.to_account_info(),a.rent.to_account_info(),a.bonding_curve.to_account_info()])?;
 }else{
  transfer_quote_from_curve(a,a.quote_token_program.to_account_info(),&a.associated_quote_bonding_curve,&a.quote_mint,&a.bonding_curve,amount,&[&[b"bonding-curve",a.base_mint.key().as_ref(),&[ctx.bumps.bonding_curve]]])?;
 }
 Ok(())
}
#[inline(always)]
fn transfer_quote_from_curve<'info>(a:&MigrateV2<'info>,token_program:AccountInfo<'info>,from:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,authority:&Account<'info,crate::trade_types::BondingCurve>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{
 if amount==0{return Ok(())}
 let decimals=mint.decimals;
 anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(token_program.clone(),anchor_spl::token_2022::TransferChecked{from:from.clone(),to:a.pool_authority_quote_account.to_account_info(),authority:authority.to_account_info(),mint:mint.to_account_info()},signer_seeds),amount,decimals)
}
'''
BOOST_FN='''#[inline(never)]
pub fn init_pump_amm_boost_v2<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>)->Result<()>{
 let a=&ctx.accounts;
 if a.bonding_curve.is_mayhem_mode{return Ok(());}
 let [boost,vault]=ctx.remaining_accounts else {
  require!(!crate::migrate::native_payments::boost_enabled(&a.amm_global_config),PumpError::NotEnoughRemainingAccounts);
  return Ok(());
 };
 let initial_balance=a.pool_authority.lamports();
 let rent=Rent::get()?;
 let funding=rent.minimum_balance(quote_token_account_size(a)?);
 crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,funding)?;
 let bump=ctx.bumps.pool_authority;let init=move |signer_seeds:&[&[&[u8]];1]|pump_amm::cpi::init_boost(CpiContext::new_with_signer(a.pump_amm.to_account_info(),pump_amm::cpi::accounts::InitBoost{pool:a.pool.to_account_info(),global_config:a.amm_global_config.to_account_info(),creator:a.pool_authority.to_account_info(),base_mint:a.base_mint.to_account_info(),quote_mint:a.quote_mint.to_account_info(),pool_base_token_account:a.pool_base_token_account.to_account_info(),pool_quote_token_account:a.pool_quote_token_account.to_account_info(),boost_vault_authority:boost.clone(),boost_vault:vault.clone(),quote_token_program:a.quote_token_program.to_account_info(),system_program:a.system_program.to_account_info(),associated_token_program:a.associated_token_program.to_account_info(),event_authority:a.pump_amm_event_authority.to_account_info(),program:a.pump_amm.to_account_info()},signer_seeds));init(&[&[b"pool-authority",a.base_mint.key().as_ref(),&[bump]]])?;
 let after_balance=a.pool_authority.lamports();
 refund_pool_authority(a,bump,&a.user.to_account_info(),after_balance.saturating_sub(initial_balance))?;
 crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,initial_balance.saturating_sub(after_balance))
}
'''
SIZE_FN='''fn quote_token_account_size<'info>(a:&MigrateV2<'info>)->Result<usize>{
 if a.quote_token_program.key()==anchor_spl::token::ID{return Ok(165)}
 required_quote_account_len(&a.quote_mint.to_account_info().try_borrow_data()?).ok_or_else(||error!(PumpError::UnsupportedQuoteMint))
}
'''
def boost_edit(src_text):
    # replace the inline boost block (from OLD_BOOST_START to its closing ' }' line) with one call line + blank lines (line-neutral)
    lines=src_text.split('\n')
    i=next(k for k,l in enumerate(lines) if l==OLD_BOOST_START)
    j=next(k for k in range(i+1,len(lines)) if lines[k]==' }')
    n=j-i+1
    new=[' init_pump_amm_boost_v2(&ctx)?;']+['']*(n-1)
    return '\n'.join(lines[:i]+new+lines[j+1:])
def variant(name, ata=ATA_FN, fund=FUND_FN, boost=BOOST_FN, size=SIZE_FN, extra_edits=()):
    import os
    base_has_fund = NEW_FUND in open('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/src/src/'+MV).read()
    edits=[(MV,OLD_ATA,NEW_ATA)]+([] if base_has_fund else [(MV,OLD_FUND,NEW_FUND)])
    d=make(name,edits+list(extra_edits))
    p=d+'/src/'+MV; s=open(p).read(); s=boost_edit(s)
    if not s.endswith('\n'): s+='\n'
    s+=ata+('' if base_has_fund else fund)
    n=s.count('\n')
    # boost: require! is index 5 of BOOST_FN -> must land on 658
    s+='\n'*(658-5-(n+1)); s+=boost
    n=s.count('\n')
    # size: error line is index 2 of SIZE_FN -> 747
    s+='\n'*(747-2-(n+1)); s+=size
    open(p,'w').write(s)
    return d
if __name__=='__main__':
    print(variant('R1'))
