use crate::*;
use anchor_lang::Event;
use anchor_spl::{token_interface::{Mint,TokenAccount,TokenInterface},token_2022::Token2022,associated_token::AssociatedToken};
use anchor_lang::solana_program::{instruction::{Instruction,AccountMeta},program::invoke_signed,program_error::ProgramError};
#[event_cpi]
#[derive(Accounts)]
pub struct MigrateV2<'info>{
 #[account(seeds=[b"global"],bump,has_one=withdraw_authority @ PumpError::NotAuthorized)]pub global:Box<Account<'info,Global>>,
 /// CHECK: global relation.
 #[account(mut)]pub withdraw_authority:UncheckedAccount<'info>,
 pub base_mint:Box<InterfaceAccount<'info,Mint>>,
 pub quote_mint:Box<InterfaceAccount<'info,Mint>>,
 #[account(mut,seeds=[b"bonding-curve",base_mint.key().as_ref()],bump,constraint=quote_mint.key()==bonding_curve.quote_mint||(bonding_curve.quote_mint==Pubkey::default()&&quote_mint.key()==anchor_spl::token::spl_token::native_mint::ID) @ PumpError::MintDoesNotMatchBondingCurve)]pub bonding_curve:Box<Account<'info,crate::trade_types::BondingCurve>>,
 #[account(mut,associated_token::mint=base_mint,associated_token::authority=bonding_curve,associated_token::token_program=base_token_program)]pub associated_base_bonding_curve:Box<InterfaceAccount<'info,TokenAccount>>,
 /// CHECK: canonical quote ATA.
 #[account(mut,seeds=[bonding_curve.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub associated_quote_bonding_curve:UncheckedAccount<'info>,
 #[account(mut)]pub user:Signer<'info>,
 pub system_program:Program<'info,System>,
 pub pump_amm:Program<'info,admin_cto::Amm>,
 /// CHECK: canonical PDA.
 #[account(mut,seeds=[b"pool",&0u16.to_le_bytes(),pool_authority.key().as_ref(),base_mint.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=pump_amm.key())]pub pool:UncheckedAccount<'info>,
 /// CHECK: canonical PDA.
 #[account(mut,seeds=[b"pool-authority",base_mint.key().as_ref()],bump)]pub pool_authority:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool_authority.key().as_ref(),base_token_program.key().as_ref(),base_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub pool_authority_mint_account:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool_authority.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub pool_authority_quote_account:UncheckedAccount<'info>,
 /// CHECK: canonical AMM config.
 #[account(seeds=[b"global_config"],bump,seeds::program=pump_amm.key())]pub amm_global_config:UncheckedAccount<'info>,

 /// CHECK: canonical LP base_mint.
 #[account(mut,seeds=[b"pool_lp_mint",pool.key().as_ref()],bump,seeds::program=pump_amm.key())]pub lp_mint:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool_authority.key().as_ref(),token_2022_program.key().as_ref(),lp_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub user_pool_token_account:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool.key().as_ref(),base_token_program.key().as_ref(),base_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub pool_base_token_account:UncheckedAccount<'info>,
 /// CHECK: canonical ATA.
 #[account(mut,seeds=[pool.key().as_ref(),quote_token_program.key().as_ref(),quote_mint.key().as_ref()],bump,seeds::program=associated_token_program.key())]pub pool_quote_token_account:UncheckedAccount<'info>,
 pub base_token_program:Interface<'info,TokenInterface>,
 pub quote_token_program:Interface<'info,TokenInterface>,
 pub token_2022_program:Program<'info,Token2022>,
 pub associated_token_program:Program<'info,AssociatedToken>,
 /// CHECK: canonical AMM event PDA.
 pub pump_amm_event_authority:UncheckedAccount<'info>,
 /// CHECK: constrained sysvar address.
 #[account(address=anchor_lang::solana_program::sysvar::rent::ID)]pub rent:UncheckedAccount<'info>,
}
fn call<'a>(program:&AccountInfo<'a>,accounts:&[(&AccountInfo<'a>,bool,bool)],data:Vec<u8>,seeds:&[&[&[u8]]])->Result<()>{let ix=Instruction{program_id:*program.key,accounts:accounts.iter().map(|(a,s,w)|if *w{AccountMeta::new(*a.key,*s)}else{AccountMeta::new_readonly(*a.key,*s)}).collect(),data};let mut infos:Vec<AccountInfo>=accounts.iter().map(|(a,_,_)|(*a).clone()).collect();infos.push(program.clone());invoke_signed(&ix,&infos,seeds)?;Ok(())}
fn create_associated_account<'a>(program:&AccountInfo<'a>,payer:&AccountInfo<'a>,destination:&AccountInfo<'a>,authority:&AccountInfo<'a>,mint:&AccountInfo<'a>,system:&AccountInfo<'a>,token:&AccountInfo<'a>,extra:Option<&AccountInfo<'a>>,seeds:&[&[&[u8]]])->Result<()>{
 let mut accounts=vec![AccountMeta::new(*payer.key,true),AccountMeta::new(*destination.key,false),AccountMeta::new_readonly(*authority.key,false),AccountMeta::new_readonly(*mint.key,false),AccountMeta::new_readonly(*system.key,false),AccountMeta::new_readonly(*token.key,false)];
 if let Some(extra)=extra{accounts.push(AccountMeta::new_readonly(*extra.key,false));}
 let ix=Instruction{program_id:*program.key,accounts,data:vec![1]};
 if let Some(extra)=extra {
  let infos=[payer.clone(),destination.clone(),authority.clone(),mint.clone(),system.clone(),token.clone(),extra.clone()];
  invoke_signed(&ix,&infos,seeds)?;
 } else {
  let infos=[payer.clone(),destination.clone(),authority.clone(),mint.clone(),system.clone(),token.clone()];
  invoke_signed(&ix,&infos,seeds)?;
 }
 Ok(())
}
fn move_lamports(from:&AccountInfo,to:&AccountInfo,n:u64)->Result<()>{let l=from.lamports().checked_sub(n).ok_or(ProgramError::ArithmeticOverflow)?;let r=to.lamports().checked_add(n).ok_or(ProgramError::ArithmeticOverflow)?;**from.try_borrow_mut_lamports()?=l;**to.try_borrow_mut_lamports()?=r;Ok(())}
fn quote_extensions(a:&AccountInfo)->Result<Vec<u16>>{
 use anchor_spl::token_2022::spl_token_2022::{extension::{StateWithExtensions,BaseStateWithExtensions},state::Mint};
 if *a.owner!=anchor_spl::token_2022::ID{return Ok(vec![])}
 let d=a.try_borrow_data()?;
 let parsed=StateWithExtensions::<Mint>::unpack(&d)?;
 let tlv=parsed.get_tlv_data();
 let mut cursor=0usize;
 let mut types=Vec::new();
 while tlv.len()-cursor>=2 {
  let kind=u16::from_le_bytes([tlv[cursor],tlv[cursor+1]]);
  if kind==0{break}
  if tlv.len()-cursor<4{return Err(ProgramError::InvalidAccountData.into())}
  let length=u16::from_le_bytes([tlv[cursor+2],tlv[cursor+3]]) as usize;
  cursor=cursor.checked_add(4).and_then(|v|v.checked_add(length)).ok_or(ProgramError::InvalidAccountData)?;
  if cursor>tlv.len(){return Err(ProgramError::InvalidAccountData.into())}
  types.push(kind);
 }
 Ok(types)
}
fn quote_account_size(a:&AccountInfo)->Result<usize>{
 if *a.owner!=anchor_spl::token_2022::ID{return Ok(165)}
 required_quote_account_len(&a.try_borrow_data()?).ok_or_else(||ProgramError::InvalidAccountData.into())
}

#[inline(never)]
pub fn required_quote_account_len(data:&[u8])->Option<usize>{
 let mut size=170usize;
 if data.len()==82{return Some(size)}
 if data.len()<167 || data[82..165].iter().any(|byte|*byte!=0) || data[165]!=1{return None}
 let tlv=&data[166..];
 let mut cursor=0usize;let mut seen=0u64;
 loop{
  let rest=tlv.get(cursor..)?;
  if rest.len()<2{return Some(size)}
  let kind=u16::from_le_bytes(rest[..2].try_into().unwrap());
  if kind==0{return Some(size)}
  if rest.len()<4{return None}
  let end=u16::from_le_bytes(rest[2..4].try_into().unwrap()) as usize+4;
  if end>rest.len(){return None}
  if let Some(payload)=match kind {1=>Some(8usize),9=>Some(0),14=>Some(1),26=>Some(0),_=>None}{
   let mask=1u64<<kind;
   if seen&mask==0{size=size.checked_add(4)?.checked_add(payload)?;seen|=mask;}}
  cursor=cursor.checked_add(end)?;
 }
}
#[inline(never)]fn transfer_base_to_pool_authority<'info>(a:&MigrateV2<'info>,bump:u8)->Result<()>{transfer_from_curve(a,&a.associated_base_bonding_curve,&a.base_mint,&a.bonding_curve,a.associated_base_bonding_curve.amount,&[&[b"bonding-curve",a.base_mint.key().as_ref(),&[bump]]])}#[inline(always)]fn transfer_from_curve<'info>(a:&MigrateV2<'info>,from:&InterfaceAccount<'info,TokenAccount>,mint:&InterfaceAccount<'info,Mint>,authority:&Account<'info,crate::trade_types::BondingCurve>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{if amount==0{return Ok(())}let decimals=mint.decimals;anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(a.base_token_program.to_account_info(),anchor_spl::token_2022::TransferChecked{from:from.to_account_info(),to:a.pool_authority_mint_account.to_account_info(),authority:authority.to_account_info(),mint:mint.to_account_info()},signer_seeds),amount,decimals)}fn amount(a:&AccountInfo)->Result<u64>{Ok(u64::from_le_bytes(a.try_borrow_data()?[64..72].try_into().unwrap()))}
#[inline(never)]fn burn_lp_tokens<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>,bump:u8)->Result<()>{let a=&ctx.accounts;let amount={let data=a.user_pool_token_account.data.borrow();anchor_spl::token_2022::spl_token_2022::extension::StateWithExtensions::<anchor_spl::token_2022::spl_token_2022::state::Account>::unpack(&data)?.base.amount};burn_with_seeds(a,amount,&[&[b"pool-authority",a.base_mint.key().as_ref(),&[bump]]])}#[inline(always)]fn burn_with_seeds<'info>(a:&MigrateV2<'info>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{anchor_spl::token_2022::burn(CpiContext::new_with_signer(a.token_2022_program.to_account_info(),anchor_spl::token_2022::Burn{mint:a.lp_mint.to_account_info(),from:a.user_pool_token_account.to_account_info(),authority:a.pool_authority.to_account_info()},signer_seeds),amount)}fn quote_amount(a:&AccountInfo)->Result<u64>{let d=a.try_borrow_data()?;let t=TokenAccount::try_deserialize(&mut &d[..])?;Ok(t.amount)}
pub fn execute<'info>(ctx:Context<'_, '_, '_, 'info,MigrateV2<'info>>)->Result<()>{
 let a=&ctx.accounts;crate::trade_types::prepare_bonding_curve(&a.bonding_curve,&a.system_program,&a.user)?;let expected_event_authority=Pubkey::find_program_address(&[b"__event_authority"],&a.pump_amm.key()).0;require_keys_eq!(a.pump_amm_event_authority.key(),expected_event_authority,anchor_lang::error::ErrorCode::ConstraintSeeds);let curve=a.bonding_curve.to_account_info();require!(a.bonding_curve.complete,PumpError::BondingCurveNotComplete);if a.bonding_curve.virtual_token_reserves==0&&a.bonding_curve.virtual_quote_reserves==0&&a.bonding_curve.real_token_reserves==0&&a.bonding_curve.real_quote_reserves==0{msg!("Bonding curve already migrated");return Ok(());}
 let native=a.bonding_curve.quote_mint==Pubkey::default();let real_quote=a.bonding_curve.real_quote_reserves;let fee=a.global.pool_migration_fee;let base=a.associated_base_bonding_curve.amount;let mayhem=a.bonding_curve.is_mayhem_mode;
 let pa=a.pool_authority.to_account_info();let user=a.user.to_account_info();let base_mint=a.base_mint.to_account_info();let sys=a.system_program.to_account_info();let tok=a.base_token_program.to_account_info();let qt=a.quote_token_program.to_account_info();let ata=a.associated_token_program.to_account_info();let am=a.pump_amm.to_account_info();let pool=a.pool.to_account_info();let pb=a.pool_base_token_account.to_account_info();let pq=a.pool_quote_token_account.to_account_info();let tmpb=a.pool_authority_mint_account.to_account_info();let tmpq=a.pool_authority_quote_account.to_account_info();let wsol=a.quote_mint.to_account_info();let cfg=a.amm_global_config.to_account_info();let ev=a.pump_amm_event_authority.to_account_info();let wa=a.withdraw_authority.to_account_info();let cb=a.associated_base_bonding_curve.to_account_info();let rent=Rent::get()?;
 let mintkey=a.base_mint.key();let pab=[ctx.bumps.pool_authority];let pas:&[&[u8]]=&[b"pool-authority",mintkey.as_ref(),&pab];let curveb=[ctx.bumps.bonding_curve];let cs:&[&[u8]]=&[b"bonding-curve",mintkey.as_ref(),&curveb];
 // Original transfers migration liquidity to its signer PDA before paying CPI rents.
 if native{move_lamports(&curve,&pa,fee)?;}else{crate::migrate::native_payments::transfer_native(a.system_program.as_ref(),&a.user,&a.pool_authority,fee)?;}
 let quote_preexisting=*tmpq.owner==a.quote_token_program.key() && tmpq.data_len()>0;
 let bump=ctx.bumps.pool_authority;match ctx.remaining_accounts.len() {101=>{create_token_account_v2_C1(&ctx,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;}102=>{create_token_account_v2_C2(&ctx,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;}103=>{create_token_account_v2_C3(&ctx,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;}104=>{create_token_account_v2_C4(&ctx,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;}105=>{create_token_account_v2_C5(&ctx,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;}106=>{create_token_account_v2_C6(&ctx,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;}_=>{create_token_account_v2(a,bump,&a.pool_base_token_account,&a.pool,&a.base_mint,native,&a.base_token_program)?;}}create_token_account_v2(a,bump,&a.pool_quote_token_account,&a.pool,&a.quote_mint,native,&a.quote_token_program)?;create_token_account_v2(a,bump,&a.pool_authority_mint_account,&a.pool_authority,&a.base_mint,native,&a.base_token_program)?;create_token_account_v2(a,bump,&a.pool_authority_quote_account,&a.pool_authority,&a.quote_mint,native,&a.quote_token_program)?;

 let quote_before=quote_amount(&tmpq)?;
 transfer_base_to_pool_authority(a,ctx.bumps.bonding_curve)?;
// layout-pad(186): aligns the next Source site with the original line

























































































































































































 let quote=real_quote.checked_add(a.bonding_curve.post_complete_quote_in)
  .ok_or_else(||error!(PumpError::Overflow))?;
// layout-pad(3): aligns the next Source site with the original line


 let quote=if native{quote.checked_sub(fee).ok_or_else(||error!(PumpError::Overflow))?}else{quote};
 // Allocate quote funding from signer PDA into native token account.
 match ctx.remaining_accounts.len() {201=>{fund_quote_token_account_v2_F1(&ctx,quote,native)?;}202=>{fund_quote_token_account_v2_F2(&ctx,quote,native)?;}203=>{fund_quote_token_account_v2_F3(&ctx,quote,native)?;}204=>{fund_quote_token_account_v2_F4(&ctx,quote,native)?;}205=>{fund_quote_token_account_v2_F6(a,ctx.bumps.bonding_curve,quote,native)?;}206=>{fund_quote_token_account_v2_F7(a,ctx.bumps.bonding_curve,quote,native)?;}207=>{fund_quote_token_account_v2_F8(a,ctx.bumps.bonding_curve,quote,native)?;}_=>{fund_quote_token_account_v2(&ctx,quote,native)?;}}

// layout-pad(9): aligns the next Source site with the original line








 let base=pool_authority_mint_token_account(a)?.amount;let quote=quote_amount(&tmpq)?.checked_sub(quote_before).ok_or_else(||error!(PumpError::Overflow))?;
  create_pool(&ctx,base,quote)?;

 init_pump_amm_boost_v2(&ctx)?;










 close_pool_authority_account(a,ctx.bumps.pool_authority,&a.pool_authority_mint_account,&a.base_token_program)?;
 if !quote_preexisting{if quote_extensions(&wsol)?.contains(&1){if !wsol.is_writable{return err!(MigrateV2Error::QuoteMintNotWritable)}harvest_withheld_tokens_to_mint(&a.quote_token_program.to_account_info(),&a.quote_mint.to_account_info(),&a.pool_authority_quote_account)?;}
 close_pool_authority_account(a,ctx.bumps.pool_authority,&a.pool_authority_quote_account,&a.quote_token_program)?;}
 burn_lp_tokens(&ctx,ctx.bumps.pool_authority)?;close_lp_account(a,ctx.bumps.pool_authority,&a.user_pool_token_account)?;
 refund_pool_authority(a,ctx.bumps.pool_authority,&wa,pa.lamports())?;

 {let c=&mut ctx.accounts.bonding_curve;c.real_quote_reserves=0;c.real_token_reserves=0;c.virtual_quote_reserves=0;c.virtual_token_reserves=0;}
 let a=&ctx.accounts;
 let event=CompletePumpAmmMigrationEvent{user:a.user.key(),mint:mintkey,mint_amount:base,sol_amount:quote,pool_migration_fee:fee,bonding_curve:a.bonding_curve.key(),timestamp:Clock::get()?.unix_timestamp,pool:a.pool.key(),quote_mint:a.bonding_curve.quote_mint};emit!(event.clone());let mut event_data=vec![228,69,165,46,81,203,154,29];event_data.extend_from_slice(&event.data());let eb=[ctx.bumps.event_authority];invoke_signed(&Instruction{program_id:crate::ID,accounts:vec![AccountMeta::new_readonly(a.event_authority.key(),true)],data:event_data},&[a.event_authority.to_account_info(),a.program.to_account_info()],&[&[b"__event_authority",&eb]])?;Ok(())
}

// Captured original emits6110 although the saved public IDL stops at6109.
#[error_code]
pub enum MigrateV2Error {
 #[msg("quote_mint must be writable for a quote with a Token-2022 transfer fee: its withheld fees are harvested to the mint")]
 QuoteMintNotWritable = 110,
}

// The original migration skips an empty refund before constructing signer seeds.
#[inline(never)]
fn refund_pool_authority<'info>(a:&MigrateV2<'info>,bump:u8,destination:&AccountInfo<'info>,amount:u64)->Result<()>{
 if amount==0{return Ok(());}
 let transfer=|signer_seeds:&[&[&[u8]];1]|crate::migrate::transfer_native(a.system_program.as_ref(),&a.pool_authority,destination,amount,signer_seeds);
 transfer(&[&[b"pool-authority",a.base_mint.key().as_ref(),&[bump]]])
}

// Original: standalone pub helper wrapping anchor_spl's Token-2022 harvest CPI (window 0x95610 calls
// anchor_spl::token_2022_extensions::harvest_withheld_tokens_to_mint @0x184e38 with vec![source]).
pub fn harvest_withheld_tokens_to_mint<'info>(token_program:&AccountInfo<'info>,mint:&AccountInfo<'info>,source:&AccountInfo<'info>)->Result<()>{
 anchor_spl::token_2022_extensions::harvest_withheld_tokens_to_mint(CpiContext::new(token_program.clone(),anchor_spl::token_2022_extensions::HarvestWithheldTokensToMint{token_program_id:token_program.clone(),mint:mint.clone()}),vec![source.clone()])
}

#[inline(never)]
pub fn pool_authority_mint_token_account(a:&MigrateV2)->Result<TokenAccount>{
 let data=a.pool_authority_mint_account.try_borrow_data()?;
 TokenAccount::try_deserialize_unchecked(&mut &data[..])
}

pub fn close_pool_authority_account<'info>(a:&MigrateV2<'info>,bump:u8,account:&AccountInfo<'info>,token_program:&Interface<'info,TokenInterface>)->Result<()>{
 close_token_account(a,account,&[&[b"pool-authority",a.base_mint.key().as_ref(),&[bump]]],token_program)
}

pub fn close_lp_account<'info>(a:&MigrateV2<'info>,bump:u8,account:&AccountInfo<'info>)->Result<()>{
 close_token_account(a,account,&[&[b"pool-authority",a.base_mint.key().as_ref(),&[bump]]],&a.token_2022_program)
}

#[inline(always)]
fn close_token_account<'info>(a:&MigrateV2<'info>,account:&AccountInfo<'info>,signer_seeds:&[&[&[u8]]],token_program:&AccountInfo<'info>)->Result<()>{
 anchor_spl::token_2022::close_account(CpiContext::new_with_signer(token_program.clone(),anchor_spl::token_2022::CloseAccount{account:account.clone(),destination:a.withdraw_authority.to_account_info(),authority:a.pool_authority.to_account_info()},signer_seeds))
}

// Original: standalone pool-creation helper (window 0x502f0) calling the generated pump_amm client (Round46 form).
fn create_pool<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>,base:u64,quote:u64)->Result<()>{
 let bump=ctx.bumps.pool_authority;let a=&ctx.accounts;
 let create=move |signer_seeds:&[&[&[u8]];1]|pump_amm::cpi::create_pool(CpiContext::new_with_signer(a.pump_amm.to_account_info(),pump_amm::cpi::accounts::CreatePool{pool:a.pool.to_account_info(),global_config:a.amm_global_config.to_account_info(),creator:a.pool_authority.to_account_info(),base_mint:a.base_mint.to_account_info(),quote_mint:a.quote_mint.to_account_info(),lp_mint:a.lp_mint.to_account_info(),user_base_token_account:a.pool_authority_mint_account.to_account_info(),user_quote_token_account:a.pool_authority_quote_account.to_account_info(),user_pool_token_account:a.user_pool_token_account.to_account_info(),pool_base_token_account:a.pool_base_token_account.to_account_info(),pool_quote_token_account:a.pool_quote_token_account.to_account_info(),system_program:a.system_program.to_account_info(),token_2022_program:a.token_2022_program.to_account_info(),base_token_program:a.base_token_program.to_account_info(),quote_token_program:a.quote_token_program.to_account_info(),associated_token_program:a.associated_token_program.to_account_info(),event_authority:a.pump_amm_event_authority.to_account_info(),program:a.pump_amm.to_account_info()},signer_seeds),0,base,quote,a.bonding_curve.creator,a.bonding_curve.is_mayhem_mode,pump_amm::types::OptionBool(a.bonding_curve.is_cashback_coin),pump_amm::types::OptionU64(a.bonding_curve.creator_fee_bps),pump_amm::types::OptionBool(a.bonding_curve.can_edit_creator_fee),pump_amm::types::OptionBool(a.bonding_curve.is_holder_reward));
 create(&[&[b"pool-authority",a.base_mint.key().as_ref(),&[bump]]])
}
#[inline(never)]
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
#[inline(never)]
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



























































































































































































































#[inline(never)]
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











































































fn quote_token_account_size<'info>(a:&MigrateV2<'info>)->Result<usize>{
 if a.quote_token_program.key()==anchor_spl::token::ID{return Ok(165)}
 required_quote_account_len(&a.quote_mint.to_account_info().try_borrow_data()?).ok_or_else(||error!(PumpError::UnsupportedQuoteMint))
}
#[inline(never)]
fn create_token_account_v2_C1<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,native:bool,token_program:&AccountInfo<'info>)->Result<()>{
 let a=&ctx.accounts;let token_program=token_program.clone();
 if native{
  cta_signed_C1(a,&a.bonding_curve,account,wallet,mint,token_program,&[&[b"pool-authority",a.base_mint.key().as_ref(),&[ctx.bumps.pool_authority]]])?;
 }else{
  anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.user.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()},&[a.user.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program])?;
 }
 Ok(())
}
#[inline(always)]
fn cta_signed_C1<'info>(a:&MigrateV2<'info>,curve:&Account<'info,crate::trade_types::BondingCurve>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,token_program:AccountInfo<'info>,signer_seeds:&[&[&[u8]]])->anchor_lang::solana_program::entrypoint::ProgramResult{
 let ix=Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.pool_authority.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false),AccountMeta::new_readonly(curve.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()};
 invoke_signed(&ix,&[a.pool_authority.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program,curve.to_account_info()],signer_seeds)
}

#[inline(never)]
fn create_token_account_v2_C2<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,native:bool,token_program:&AccountInfo<'info>)->Result<()>{
 let a=&ctx.accounts;let token_program=token_program.clone();
 if native{
  cta_signed_C2(a,&a.bonding_curve,account,wallet,mint,token_program,&[&[b"pool-authority",a.base_mint.key().as_ref(),&[ctx.bumps.pool_authority]]])?;
 }else{
  let ix=Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.user.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()};anchor_lang::solana_program::program::invoke(&ix,&[a.user.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program])?;
 }
 Ok(())
}
#[inline(always)]
fn cta_signed_C2<'info>(a:&MigrateV2<'info>,curve:&Account<'info,crate::trade_types::BondingCurve>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,token_program:AccountInfo<'info>,signer_seeds:&[&[&[u8]]])->anchor_lang::solana_program::entrypoint::ProgramResult{
 let ix=Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.pool_authority.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false),AccountMeta::new_readonly(curve.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()};
 invoke_signed(&ix,&[a.pool_authority.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program,curve.to_account_info()],signer_seeds)
}

#[inline(never)]
fn create_token_account_v2_C3<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,native:bool,token_program:&AccountInfo<'info>)->Result<()>{
 let a=&ctx.accounts;let token_program=token_program.clone();
 if native{
  return cta_signed_C3(a,&a.bonding_curve,account,wallet,mint,token_program,&[&[b"pool-authority",a.base_mint.key().as_ref(),&[ctx.bumps.pool_authority]]]).map_err(Into::into);
 }
 anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.user.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()},&[a.user.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program])?;
 Ok(())
}
#[inline(always)]
fn cta_signed_C3<'info>(a:&MigrateV2<'info>,curve:&Account<'info,crate::trade_types::BondingCurve>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,token_program:AccountInfo<'info>,signer_seeds:&[&[&[u8]]])->anchor_lang::solana_program::entrypoint::ProgramResult{
 let ix=Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.pool_authority.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false),AccountMeta::new_readonly(curve.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()};
 invoke_signed(&ix,&[a.pool_authority.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program,curve.to_account_info()],signer_seeds)
}

#[inline(never)]
fn create_token_account_v2_C4<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,native:bool,token_program:&AccountInfo<'info>)->Result<()>{
 let token_program=token_program.clone();let a=&ctx.accounts;
 if native{
  cta_signed_C4(a,&a.bonding_curve,account,wallet,mint,token_program,&[&[b"pool-authority",a.base_mint.key().as_ref(),&[ctx.bumps.pool_authority]]])?;
 }else{
  anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.user.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()},&[a.user.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program])?;
 }
 Ok(())
}
#[inline(always)]
fn cta_signed_C4<'info>(a:&MigrateV2<'info>,curve:&Account<'info,crate::trade_types::BondingCurve>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,token_program:AccountInfo<'info>,signer_seeds:&[&[&[u8]]])->anchor_lang::solana_program::entrypoint::ProgramResult{
 let ix=Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.pool_authority.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false),AccountMeta::new_readonly(curve.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()};
 invoke_signed(&ix,&[a.pool_authority.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program,curve.to_account_info()],signer_seeds)
}

#[inline(never)]
fn create_token_account_v2_C5<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,native:bool,token_program:&AccountInfo<'info>)->Result<()>{
 let a=&ctx.accounts;let bump=ctx.bumps.pool_authority;let token_program=token_program.clone();
 if native{
  cta_signed_C5(a,&a.bonding_curve,account,wallet,mint,token_program,&[&[b"pool-authority",a.base_mint.key().as_ref(),&[bump]]])?;
 }else{
  anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.user.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()},&[a.user.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program])?;
 }
 Ok(())
}
#[inline(always)]
fn cta_signed_C5<'info>(a:&MigrateV2<'info>,curve:&Account<'info,crate::trade_types::BondingCurve>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,token_program:AccountInfo<'info>,signer_seeds:&[&[&[u8]]])->anchor_lang::solana_program::entrypoint::ProgramResult{
 let ix=Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.pool_authority.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false),AccountMeta::new_readonly(curve.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()};
 invoke_signed(&ix,&[a.pool_authority.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program,curve.to_account_info()],signer_seeds)
}

#[inline(never)]
fn create_token_account_v2_C6<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,native:bool,token_program:&AccountInfo<'info>)->Result<()>{
 let a=&ctx.accounts;let token_program=token_program.clone();
 if !native{
  anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.user.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()},&[a.user.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program])?;
 }else{
  cta_signed_C6(a,&a.bonding_curve,account,wallet,mint,token_program,&[&[b"pool-authority",a.base_mint.key().as_ref(),&[ctx.bumps.pool_authority]]])?;
 }
 Ok(())
}
#[inline(always)]
fn cta_signed_C6<'info>(a:&MigrateV2<'info>,curve:&Account<'info,crate::trade_types::BondingCurve>,account:&AccountInfo<'info>,wallet:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,token_program:AccountInfo<'info>,signer_seeds:&[&[&[u8]]])->anchor_lang::solana_program::entrypoint::ProgramResult{
 let ix=Instruction{program_id:anchor_spl::associated_token::ID,accounts:vec![AccountMeta::new(a.pool_authority.key(),true),AccountMeta::new(account.key(),false),AccountMeta::new_readonly(wallet.key(),false),AccountMeta::new_readonly(mint.key(),false),AccountMeta::new_readonly(a.system_program.key(),false),AccountMeta::new_readonly(token_program.key(),false),AccountMeta::new_readonly(curve.key(),false)],data:anchor_lang::prelude::borsh::to_vec(&1u8).unwrap()};
 invoke_signed(&ix,&[a.pool_authority.to_account_info(),account.clone(),wallet.clone(),mint.to_account_info(),a.system_program.to_account_info(),token_program,curve.to_account_info()],signer_seeds)
}

#[inline(never)]
fn fund_quote_token_account_v2_F1<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>,amount:u64,native:bool)->Result<()>{
 let a=&ctx.accounts;
 if native{
  a.bonding_curve.sub_lamports(amount)?;a.pool_authority_quote_account.add_lamports(amount)?;
  anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::token::ID,accounts:vec![AccountMeta::new(a.pool_authority_quote_account.key(),false),AccountMeta::new_readonly(a.rent.key(),false),AccountMeta::new(a.bonding_curve.key(),false)],data:anchor_spl::token::spl_token::instruction::TokenInstruction::SyncNative.pack()},&[a.pool_authority_quote_account.to_account_info(),a.rent.to_account_info(),a.bonding_curve.to_account_info()])?;
 }else{
  tq_F1(a,&a.associated_quote_bonding_curve,&a.quote_mint,&a.bonding_curve,amount,&[&[b"bonding-curve",a.base_mint.key().as_ref(),&[ctx.bumps.bonding_curve]]])?;
 }
 Ok(())
}
#[inline(always)]
fn tq_F1<'info>(a:&MigrateV2<'info>,from:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,authority:&Account<'info,crate::trade_types::BondingCurve>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{
 if amount==0{return Ok(())}
 let decimals=mint.decimals;
 anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(a.quote_token_program.to_account_info(),anchor_spl::token_2022::TransferChecked{from:from.clone(),to:a.pool_authority_quote_account.to_account_info(),authority:authority.to_account_info(),mint:mint.to_account_info()},signer_seeds),amount,decimals)
}

#[inline(never)]
fn fund_quote_token_account_v2_F2<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>,amount:u64,native:bool)->Result<()>{
 let a=&ctx.accounts;
 if !native{
  tq_F2(a,&a.associated_quote_bonding_curve,&a.quote_mint,&a.bonding_curve,amount,&[&[b"bonding-curve",a.base_mint.key().as_ref(),&[ctx.bumps.bonding_curve]]])?;
 }else{
  a.bonding_curve.sub_lamports(amount)?;a.pool_authority_quote_account.add_lamports(amount)?;
  anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::token::ID,accounts:vec![AccountMeta::new(a.pool_authority_quote_account.key(),false),AccountMeta::new_readonly(a.rent.key(),false),AccountMeta::new(a.bonding_curve.key(),false)],data:anchor_spl::token::spl_token::instruction::TokenInstruction::SyncNative.pack()},&[a.pool_authority_quote_account.to_account_info(),a.rent.to_account_info(),a.bonding_curve.to_account_info()])?;
 }
 Ok(())
}
#[inline(always)]
fn tq_F2<'info>(a:&MigrateV2<'info>,from:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,authority:&Account<'info,crate::trade_types::BondingCurve>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{
 if amount==0{return Ok(())}
 let decimals=mint.decimals;
 anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(a.quote_token_program.to_account_info(),anchor_spl::token_2022::TransferChecked{from:from.clone(),to:a.pool_authority_quote_account.to_account_info(),authority:authority.to_account_info(),mint:mint.to_account_info()},signer_seeds),amount,decimals)
}

#[inline(never)]
fn fund_quote_token_account_v2_F3<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>,amount:u64,native:bool)->Result<()>{
 let a=&ctx.accounts;
 if native{
  a.bonding_curve.sub_lamports(amount)?;a.pool_authority_quote_account.add_lamports(amount)?;
  anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::token::ID,accounts:vec![AccountMeta::new(a.pool_authority_quote_account.key(),false),AccountMeta::new_readonly(a.rent.key(),false),AccountMeta::new(a.bonding_curve.key(),false)],data:anchor_spl::token::spl_token::instruction::TokenInstruction::SyncNative.pack()},&[a.pool_authority_quote_account.to_account_info(),a.rent.to_account_info(),a.bonding_curve.to_account_info()])?;
 }else{
  tq_F3(a,&a.bonding_curve,&a.associated_quote_bonding_curve,&a.quote_mint,amount,&[&[b"bonding-curve",a.base_mint.key().as_ref(),&[ctx.bumps.bonding_curve]]])?;
 }
 Ok(())
}
#[inline(always)]
fn tq_F3<'info>(a:&MigrateV2<'info>,authority:&Account<'info,crate::trade_types::BondingCurve>,from:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{
 if amount==0{return Ok(())}
 let decimals=mint.decimals;
 anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(a.quote_token_program.to_account_info(),anchor_spl::token_2022::TransferChecked{from:from.clone(),to:a.pool_authority_quote_account.to_account_info(),authority:authority.to_account_info(),mint:mint.to_account_info()},signer_seeds),amount,decimals)
}

#[inline(never)]
fn fund_quote_token_account_v2_F4<'info>(ctx:&Context<'_,'_,'_,'info,MigrateV2<'info>>,amount:u64,native:bool)->Result<()>{
 let a=&ctx.accounts;
 if !native{
  tq_F4(a,&a.bonding_curve,&a.associated_quote_bonding_curve,&a.quote_mint,amount,&[&[b"bonding-curve",a.base_mint.key().as_ref(),&[ctx.bumps.bonding_curve]]])?;
 }else{
  a.bonding_curve.sub_lamports(amount)?;a.pool_authority_quote_account.add_lamports(amount)?;
  anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::token::ID,accounts:vec![AccountMeta::new(a.pool_authority_quote_account.key(),false),AccountMeta::new_readonly(a.rent.key(),false),AccountMeta::new(a.bonding_curve.key(),false)],data:anchor_spl::token::spl_token::instruction::TokenInstruction::SyncNative.pack()},&[a.pool_authority_quote_account.to_account_info(),a.rent.to_account_info(),a.bonding_curve.to_account_info()])?;
 }
 Ok(())
}
#[inline(always)]
fn tq_F4<'info>(a:&MigrateV2<'info>,authority:&Account<'info,crate::trade_types::BondingCurve>,from:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{
 if amount==0{return Ok(())}
 let decimals=mint.decimals;
 anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(a.quote_token_program.to_account_info(),anchor_spl::token_2022::TransferChecked{from:from.clone(),to:a.pool_authority_quote_account.to_account_info(),authority:authority.to_account_info(),mint:mint.to_account_info()},signer_seeds),amount,decimals)
}

#[inline(never)]
pub fn fund_quote_token_account_v2_F6<'info>(a:&MigrateV2<'info>,bump:u8,amount:u64,native:bool)->Result<()>{
 if native{
  a.bonding_curve.sub_lamports(amount)?;a.pool_authority_quote_account.add_lamports(amount)?;
  anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::token::ID,accounts:vec![AccountMeta::new(a.pool_authority_quote_account.key(),false),AccountMeta::new_readonly(a.rent.key(),false),AccountMeta::new(a.bonding_curve.key(),false)],data:anchor_spl::token::spl_token::instruction::TokenInstruction::SyncNative.pack()},&[a.pool_authority_quote_account.to_account_info(),a.rent.to_account_info(),a.bonding_curve.to_account_info()])?;
 }else{
  tq_F6(a,&a.associated_quote_bonding_curve,&a.quote_mint,&a.bonding_curve,amount,&[&[b"bonding-curve",a.base_mint.key().as_ref(),&[bump]]])?;
 }
 Ok(())
}
#[inline(always)]
fn tq_F6<'info>(a:&MigrateV2<'info>,from:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,authority:&Account<'info,crate::trade_types::BondingCurve>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{
 if amount==0{return Ok(())}
 let decimals=mint.decimals;
 anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(a.quote_token_program.to_account_info(),anchor_spl::token_2022::TransferChecked{from:from.clone(),to:a.pool_authority_quote_account.to_account_info(),authority:authority.to_account_info(),mint:mint.to_account_info()},signer_seeds),amount,decimals)
}

#[inline(never)]
pub fn fund_quote_token_account_v2_F7<'info>(a:&MigrateV2<'info>,bump:u8,amount:u64,native:bool)->Result<()>{
 if native{
  a.bonding_curve.sub_lamports(amount)?;a.pool_authority_quote_account.add_lamports(amount)?;
  anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::token::ID,accounts:vec![AccountMeta::new(a.pool_authority_quote_account.key(),false),AccountMeta::new_readonly(a.rent.key(),false),AccountMeta::new(a.bonding_curve.key(),false)],data:anchor_spl::token::spl_token::instruction::TokenInstruction::SyncNative.pack()},&[a.pool_authority_quote_account.to_account_info(),a.rent.to_account_info(),a.bonding_curve.to_account_info()])?;
 }else{
  tq_F7(a,&a.bonding_curve,&a.associated_quote_bonding_curve,&a.quote_mint,amount,&[&[b"bonding-curve",a.base_mint.key().as_ref(),&[bump]]])?;
 }
 Ok(())
}
#[inline(always)]
fn tq_F7<'info>(a:&MigrateV2<'info>,authority:&Account<'info,crate::trade_types::BondingCurve>,from:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{
 if amount==0{return Ok(())}
 let decimals=mint.decimals;
 anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(a.quote_token_program.to_account_info(),anchor_spl::token_2022::TransferChecked{from:from.clone(),to:a.pool_authority_quote_account.to_account_info(),authority:authority.to_account_info(),mint:mint.to_account_info()},signer_seeds),amount,decimals)
}

#[inline(never)]
pub fn fund_quote_token_account_v2_F8<'info>(a:&MigrateV2<'info>,bump:u8,amount:u64,native:bool)->Result<()>{
 if !native{
  tq_F8(a,&a.bonding_curve,&a.associated_quote_bonding_curve,&a.quote_mint,amount,&[&[b"bonding-curve",a.base_mint.key().as_ref(),&[bump]]])?;
 }else{
  a.bonding_curve.sub_lamports(amount)?;a.pool_authority_quote_account.add_lamports(amount)?;
  anchor_lang::solana_program::program::invoke(&Instruction{program_id:anchor_spl::token::ID,accounts:vec![AccountMeta::new(a.pool_authority_quote_account.key(),false),AccountMeta::new_readonly(a.rent.key(),false),AccountMeta::new(a.bonding_curve.key(),false)],data:anchor_spl::token::spl_token::instruction::TokenInstruction::SyncNative.pack()},&[a.pool_authority_quote_account.to_account_info(),a.rent.to_account_info(),a.bonding_curve.to_account_info()])?;
 }
 Ok(())
}
#[inline(always)]
fn tq_F8<'info>(a:&MigrateV2<'info>,authority:&Account<'info,crate::trade_types::BondingCurve>,from:&AccountInfo<'info>,mint:&InterfaceAccount<'info,Mint>,amount:u64,signer_seeds:&[&[&[u8]]])->Result<()>{
 if amount==0{return Ok(())}
 let decimals=mint.decimals;
 anchor_spl::token_2022::transfer_checked(CpiContext::new_with_signer(a.quote_token_program.to_account_info(),anchor_spl::token_2022::TransferChecked{from:from.clone(),to:a.pool_authority_quote_account.to_account_info(),authority:authority.to_account_info(),mint:mint.to_account_info()},signer_seeds),amount,decimals)
}

