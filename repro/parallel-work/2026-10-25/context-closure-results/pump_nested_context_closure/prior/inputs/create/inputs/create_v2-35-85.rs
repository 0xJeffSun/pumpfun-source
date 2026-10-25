pub fn execute<'info>(ctx:Context<'_,'_,'_,'info,CreateV2<'info>>,name:String,symbol:String,uri:String,creator:Pubkey,is_mayhem_mode:bool,is_cashback_enabled:OptionBool,creator_fee_bps:CreationOptionU64,is_holder_reward:OptionBool)->Result<()>{
 // Other quote and Mayhem branches remain explicitly outside this reconstruction checkpoint.
 require!(!is_mayhem_mode,PumpError::ReconstructionBranchUnsupported);
 let a=&ctx.accounts;
 require!(a.global.create_v2_enabled,PumpError::CreateV2Disabled);
 require!(!is_cashback_enabled.0,PumpError::CashbackDeprecated);
 let creator=if is_holder_reward.0 {require!(a.global.is_holder_reward_enabled,PumpError::HolderRewardDisabled);Pubkey::find_program_address(&[b"holder-rewards",a.mint.key().as_ref()],&crate::ID).0}else{creator};
 require!(creator!=Pubkey::default(),PumpError::CreatorShouldNotBeZero);
 let mut depth=0u8;
 let (quote_mint,virtual_quote_reserves,can_configure_fee)=if ctx.remaining_accounts.is_empty(){(Pubkey::default(),a.global.initial_virtual_sol_reserves,false)}else{
  require!(ctx.remaining_accounts.len()>=3,PumpError::NotEnoughRemainingAccounts);
  let mint=&ctx.remaining_accounts[0];let ata=&ctx.remaining_accounts[1];let program=&ctx.remaining_accounts[2];
  require!(program.key()==anchor_spl::token::ID || program.key()==anchor_spl::token_2022::ID,PumpError::InvalidQuoteTokenProgram);
  require!(mint.owner==program.key,PumpError::UnsupportedQuoteMint);
  if program.key()==anchor_spl::token_2022::ID {require!(mint.key()!=token_interface::spl_token_2022::native_mint::id(),PumpError::UnsupportedQuoteMint);require!(quote_extensions_supported(&mint.try_borrow_data()?),PumpError::UnsupportedQuoteMint);}
  let (reserves,can_configure)=if a.global.whitelisted_quote_mints.contains(mint.key){(a.global.initial_virtual_quote_reserves,false)}else{
   require!(ctx.remaining_accounts.len()>=4,PumpError::UnsupportedQuoteMint);
   let control=&ctx.remaining_accounts[3];let expected=Pubkey::find_program_address(&[b"quote-control"],&crate::ID).0;
   require!(control.key()==expected && control.owner==&crate::ID,PumpError::InvalidQuoteControl);
   let data=control.try_borrow_data()?;
   require!(data.len()>=8 && data[..8]==CONTROL_DISCRIMINATOR,PumpError::InvalidQuoteControl);
   require!(data.len()>=108,PumpError::InvalidQuoteControl);
   let count=u32::from_le_bytes(data[104..108].try_into().unwrap()) as usize;
   let size=count.checked_mul(40).and_then(|n|n.checked_add(108)).ok_or_else(||error!(PumpError::InvalidQuoteControl))?;
   require!(data.len()>=size,PumpError::InvalidQuoteControl);
   let entry=data[108..size].chunks_exact(40).find(|entry|entry[..32]==mint.key().to_bytes());
   if let Some(entry)=entry{(u64::from_le_bytes(entry[32..40].try_into().unwrap()),true)}else{
    require!(ctx.remaining_accounts.len()>=5,PumpError::UnsupportedQuoteMint);
    let parent=&ctx.remaining_accounts[4];let expected=Pubkey::find_program_address(&[b"bonding-curve",mint.key.as_ref()],&crate::ID).0;
    require!(parent.key()==expected && parent.owner==&crate::ID,PumpError::InvalidQuoteBondingCurve);
    let bytes=parent.try_borrow_data()?;let root=crate::trade_types::BondingCurve::try_deserialize(&mut &bytes[..]).map_err(|_|error!(PumpError::InvalidQuoteBondingCurve))?;
    depth=root.depth.checked_add(1).ok_or_else(||error!(PumpError::CurveDepthExceeded))?;
    require!(depth<=a.global.max_curve_depth && depth<=5,PumpError::CurveDepthExceeded);
    require!(!root.is_mayhem_mode,PumpError::QuoteBondingCurveNotEligible);
    require!(root.depth==0,PumpError::QuoteChainAccountsRequired);
    require!(root.quote_mint==Pubkey::default(),PumpError::ReconstructionBranchUnsupported);
    require!(!root.complete,PumpError::QuoteCurveAwaitingMigration);
    (nested_sol_reserves(&a.global,&root)?,true)
   }
  };
  let expected=anchor_spl::associated_token::get_associated_token_address_with_program_id(&a.bonding_curve.key(),mint.key,program.key);
  require!(ata.key()==expected,PumpError::InvalidAssociatedQuoteBondingCurve);
  anchor_spl::associated_token::create(CpiContext::new(a.associated_token_program.to_account_info(),anchor_spl::associated_token::Create{payer:a.user.to_account_info(),associated_token:ata.clone(),authority:a.bonding_curve.to_account_info(),mint:mint.clone(),system_program:a.system_program.to_account_info(),token_program:program.clone()}))?;
  (mint.key(),reserves,can_configure)
 };
 let fee=if can_configure_fee && creator_fee_bps.0>0 {
  require!(a.global.creator_fee_configurable,PumpError::CreatorFeeNotConfigurable);
  require!(creator_fee_bps.0<=a.global.max_configurable_creator_fee_bps,PumpError::CreatorFeeBpsOutOfRange);
  creator_fee_bps.0
 }else{0};
 require!(name.len()<=32,PumpError::NameTooLong);require!(symbol.len()<=13,PumpError::SymbolTooLong);require!(uri.len()<=200,PumpError::UriTooLong);
