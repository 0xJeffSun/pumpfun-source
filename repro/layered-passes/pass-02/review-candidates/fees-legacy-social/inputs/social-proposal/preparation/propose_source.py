from pathlib import Path
import difflib,hashlib,json
P=Path(__file__).resolve().parent/'publication'
base=P/'inputs/current-source';out=P/'proposal';out.mkdir()
paths=['programs/pump-fees/src/social.rs','programs/pump-fees/src/instructions/fee_sharing/mod.rs']
s=(base/paths[0]).read_text()
start=s.index('   amount=token_amount(')
end=s.index('   let platform=[state.platform]',start)
replacement='''   crate::instructions::fee_sharing::admit_associated_token_account(
    &ctx.accounts.associated_social_fee_pda,&state.to_account_info(),&ctx.accounts.quote_mint.key(),
    &ctx.accounts.quote_token_program.key(),&ctx.accounts.quote_mint.to_account_info(),&ctx.accounts.quote_token_program,
    false,&ctx.accounts.social_claim_authority,&ctx.accounts.system_program)?;
   crate::instructions::fee_sharing::admit_associated_token_account(
    &ctx.accounts.associated_recipient,&ctx.accounts.recipient.to_account_info(),&ctx.accounts.quote_mint.key(),
    &ctx.accounts.quote_token_program.key(),&ctx.accounts.quote_mint.to_account_info(),&ctx.accounts.quote_token_program,
    true,&ctx.accounts.social_claim_authority,&ctx.accounts.system_program)?;
   amount={
    let data=ctx.accounts.associated_social_fee_pda.try_borrow_data()?;
    anchor_spl::token_interface::TokenAccount::try_deserialize(&mut &data[..])?.amount
   };
   if amount==0{return Ok(None);}
   before={
    let data=ctx.accounts.associated_recipient.try_borrow_data()?;
    anchor_spl::token_interface::TokenAccount::try_deserialize(&mut &data[..]).map(|account|account.amount).unwrap_or_default()
   };
'''
s=s[:start]+replacement+s[end:]
start=s.index('fn token_amount(');end=s.index('#[derive(Accounts)]',start)
s=s[:start]+s[end:]
m=(base/paths[1]).read_text()+'''
use anchor_lang::prelude::*;
use crate::FeeError;

// Reconstructed name; the original routine's historical identifier is unknown.
pub(crate) fn admit_associated_token_account<'info>(
    associated_account: &AccountInfo<'info>,
    wallet: &AccountInfo<'info>,
    mint: &Pubkey,
    token_program: &Pubkey,
    mint_info: &AccountInfo<'info>,
    token_program_info: &AccountInfo<'info>,
    create_if_missing: bool,
    payer: &Signer<'info>,
    system_program: &Program<'info, System>,
) -> Result<()> {
    let expected = anchor_spl::associated_token::get_associated_token_address_with_program_id(
        wallet.key, mint, token_program,
    );
    require_keys_eq!(*associated_account.key, expected, anchor_lang::error::ErrorCode::ConstraintSeeds);
    if associated_account.owner == &anchor_lang::system_program::ID {
        require!(create_if_missing, anchor_lang::error::ErrorCode::AccountNotInitialized);
        let instruction = anchor_spl::associated_token::spl_associated_token_account::instruction::create_associated_token_account_idempotent(
            payer.key, wallet.key, mint, token_program,
        );
        anchor_lang::solana_program::program::invoke(
            &instruction,
            &[
                payer.to_account_info(),
                associated_account.clone(),
                wallet.clone(),
                mint_info.clone(),
                system_program.to_account_info(),
                token_program_info.clone(),
            ],
        )?;
    }
    require_keys_eq!(*associated_account.owner, *token_program, FeeError::AccountTypeNotSupported);
    let data = associated_account.try_borrow_data()?;
    let account = anchor_spl::token_interface::TokenAccount::try_deserialize(&mut &data[..])?;
    require_keys_eq!(account.mint, *mint, FeeError::InvalidMint);
    Ok(())
}
'''
patch=[];mapping={}
for n,new in zip(paths,[s,m]):
 b=(base/n).read_text();d=out/n;d.parent.mkdir(parents=True,exist_ok=True);d.write_text(new)
 patch.extend(difflib.unified_diff(b.splitlines(keepends=True),new.splitlines(keepends=True),fromfile='a/'+n,tofile='b/'+n))
 mapping[n]={'before_sha256':hashlib.sha256(b.encode()).hexdigest(),'after_sha256':hashlib.sha256(new.encode()).hexdigest(),'source_only':True}
(P/'social-ata-helper.patch').write_text(''.join(patch))
(P/'proposal-source-map.json').write_text(json.dumps(mapping,indent=2)+'\n')
print(json.dumps(mapping,indent=2))
