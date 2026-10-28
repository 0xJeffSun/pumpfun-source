import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z07/gen')
from lines import *
name=sys.argv[1]; root=clone(name)
t=F(root,'trade_v3.rs')
ATA='anchor_spl::associated_token::get_associated_token_address_with_program_id'
t.put(168,'''/// Buyback fee recipient admission (native: global membership of the account key; token: owner program, mint, membership of the token owner, canonical ATA).
pub fn validate_buyback_fee_recipient_account(global:&Global,recipient:&AccountInfo,is_native:bool,quote_mint:&Pubkey,quote_token_program:&Pubkey)->Result<()>{
 if is_native{return global.validate_buyback_fee_recipient(recipient.key());}

 require_keys_eq!(*recipient.owner,*quote_token_program,PumpError::AccountTypeNotSupported);
 let owner={
  let data=recipient.try_borrow_data()?;
  let mut slice:&[u8]=&data;
  let token=TokenAccount::try_deserialize_unchecked(&mut slice)?;



  require_keys_eq!(token.mint,*quote_mint,PumpError::MintDoesNotMatchBondingCurve);
  token.owner
 };
 global.validate_buyback_fee_recipient(owner)?;




 require_keys_eq!(recipient.key(),%s(&owner,quote_mint,quote_token_program),anchor_lang::error::ErrorCode::ConstraintSeeds);
 Ok(())
}'''%ATA)
t.save()
HDR='#[inline(never)]\npub fn %s(global:&Global,recipient:&AccountInfo,is_native:bool,quote_mint:&Pubkey,quote_token_program:&Pubkey)->Result<()>{\n if is_native{return global.validate_buyback_fee_recipient(recipient.key());}\n require_keys_eq!(*recipient.owner,*quote_token_program,PumpError::AccountTypeNotSupported);\n'
V={}
V['vbr_b']=''' let data=recipient.try_borrow_data()?;
 let mut slice:&[u8]=&data;
 let token=TokenAccount::try_deserialize_unchecked(&mut slice)?;
 require_keys_eq!(token.mint,*quote_mint,PumpError::MintDoesNotMatchBondingCurve);
 drop(data);
 global.validate_buyback_fee_recipient(token.owner)?;
 require_keys_eq!(recipient.key(),ATA(&token.owner,quote_mint,quote_token_program),anchor_lang::error::ErrorCode::ConstraintSeeds);
 Ok(())
}
'''
V['vbr_c']=''' let data=recipient.try_borrow_data()?;
 let mut slice:&[u8]=&data;
 let token=TokenAccount::try_deserialize_unchecked(&mut slice)?;
 require_keys_eq!(token.mint,*quote_mint,PumpError::MintDoesNotMatchBondingCurve);
 let owner=token.owner;
 drop(data);
 global.validate_buyback_fee_recipient(owner)?;
 require_keys_eq!(recipient.key(),ATA(&owner,quote_mint,quote_token_program),anchor_lang::error::ErrorCode::ConstraintSeeds);
 Ok(())
}
'''
V['vbr_d']=''' let token={
  let data=recipient.try_borrow_data()?;
  let mut slice:&[u8]=&data;
  let token=TokenAccount::try_deserialize_unchecked(&mut slice)?;
  require_keys_eq!(token.mint,*quote_mint,PumpError::MintDoesNotMatchBondingCurve);
  token
 };
 global.validate_buyback_fee_recipient(token.owner)?;
 require_keys_eq!(recipient.key(),ATA(&token.owner,quote_mint,quote_token_program),anchor_lang::error::ErrorCode::ConstraintSeeds);
 Ok(())
}
'''
V['vbr_e']=''' let owner={
  let data=recipient.try_borrow_data()?;
  let mut slice:&[u8]=&data;
  let token=TokenAccount::try_deserialize_unchecked(&mut slice)?;
  require_keys_eq!(token.mint,*quote_mint,PumpError::MintDoesNotMatchBondingCurve);
  token.owner
 };
 vref(global,&owner)?;
 require_keys_eq!(recipient.key(),ATA(&owner,quote_mint,quote_token_program),anchor_lang::error::ErrorCode::ConstraintSeeds);
 Ok(())
}
#[inline(never)]
pub fn vref(g:&Global,r:&Pubkey)->Result<()>{
 require_keys_neq!(*r,Pubkey::default(),PumpError::BuybackFeeRecipientMissing);
 require!(g.buyback_fee_recipients.contains(r),PumpError::BuybackFeeRecipientNotAuthorized);
 Ok(())
}
'''
V['vbr_f']=''' let data=recipient.try_borrow_data()?;
 let mut slice:&[u8]=&data;
 let token=TokenAccount::try_deserialize_unchecked(&mut slice)?;
 require_keys_eq!(token.mint,*quote_mint,PumpError::MintDoesNotMatchBondingCurve);
 drop(data);
 vref(global,&token.owner)?;
 require_keys_eq!(recipient.key(),ATA(&token.owner,quote_mint,quote_token_program),anchor_lang::error::ErrorCode::ConstraintSeeds);
 Ok(())
}
'''
extra=''.join('\n'+HDR%k+v.replace('ATA(',ATA+'(') for k,v in V.items())
open(t.p,'a').write(extra)
m=F(root,'multi_hop_curve_swap.rs')
m.sub('''            preflight_buyback_recipient(&a.global,&a.buyback_fee_recipient.to_account_info(),
                &h.quote_mint.key(),h.quote_mint.to_account_info().owner)?;''','''            {let qk=h.quote_mint.key();let tp=h.quote_mint.to_account_info().owner;let ai=a.buyback_fee_recipient.to_account_info();let s=qk.as_ref()[31];
             if s==11{crate::trade::vbr_b(&a.global,&ai,false,&qk,tp)?}else if s==12{crate::trade::vbr_c(&a.global,&ai,false,&qk,tp)?}else if s==13{crate::trade::vbr_d(&a.global,&ai,false,&qk,tp)?}else if s==14{crate::trade::vbr_e(&a.global,&ai,false,&qk,tp)?}else if s==15{crate::trade::vbr_f(&a.global,&ai,false,&qk,tp)?}else{crate::trade::validate_buyback_fee_recipient_account(&a.global,&ai,false,&qk,tp)?}}''')
m.sub('fn preflight_buyback_recipient(','#[allow(dead_code)] fn preflight_buyback_recipient(')
m.save()
print('ok',root)
