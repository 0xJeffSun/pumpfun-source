pub fn distribute_tokens<'info>(sharing_config:&Account<'info,super::SharingConfig>,creator_vault:&AccountInfo<'info>,creator_vault_quote_token_account:&AccountInfo<'info>,system_program:&AccountInfo<'info>,remaining_accounts:&[AccountInfo<'info>],transfers:&[(u64,bool)],creator_vault_bump:u8,payer:&AccountInfo<'info>,decimals:u8,quote_mint:&AccountInfo<'info>,quote_token_program:&Interface<'info,anchor_spl::token_interface::TokenInterface>,associated_token_program:&AccountInfo<'info>)->Result<u64>{
 let sharing_config_key=sharing_config.key();
 let creator_vault=creator_vault.to_account_info();
 let mut distributed=0u64;
 for (i,_shareholder) in sharing_config.shareholders.iter().enumerate(){
  let recipient=remaining_accounts.get(i).ok_or_else(||error!(PumpError::NotEnoughRemainingAccounts))?; //@340
  let (amount,initialize_ata)=transfers[i];
  let recipient_ata=remaining_accounts.get(transfers.len()+i).ok_or_else(||error!(PumpError::NotEnoughRemainingAccounts))?; //@346
  if initialize_ata{
   anchor_spl::associated_token::create(CpiContext::new(associated_token_program.clone(),anchor_spl::associated_token::Create{payer:payer.clone(),associated_token:recipient_ata.clone(),authority:recipient.clone(),mint:quote_mint.clone(),system_program:system_program.clone(),token_program:quote_token_program.to_account_info()}))?;
  }
  crate::collect_v2::transfer_tokens(quote_token_program,creator_vault_quote_token_account,recipient_ata,&creator_vault,decimals,quote_mint,amount,&[&[b"creator-vault",sharing_config_key.as_ref(),&[creator_vault_bump]]])?;
  distributed=distributed.checked_add(amount).ok_or_else(||error!(PumpError::Overflow))?; //@378
 }
 Ok(distributed)
}
