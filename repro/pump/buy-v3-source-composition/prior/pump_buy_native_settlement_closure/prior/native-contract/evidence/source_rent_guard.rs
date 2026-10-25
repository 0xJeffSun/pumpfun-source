  require!(!c.is_mayhem_mode,PumpError::MultiHopMayhemCurveNotSupported);
  require!(!c.is_holder_reward && h.bonding_curve.to_account_info().data_len()==166,PumpError::ReconstructionBranchUnsupported);
  require!(h.bonding_curve.to_account_info().lamports()>=Rent::get()?.minimum_balance(166),PumpError::ReconstructionBranchUnsupported);
  require!((native && c.quote_mint==Pubkey::default()) || (!native && c.quote_mint==root_mint),PumpError::ReconstructionBranchUnsupported);
  for mint in [&h.base_mint,&h.quote_mint]{
