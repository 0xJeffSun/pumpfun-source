//! Static proposal only. No host integration, build, or runtime claim.
//! Recovery::Unresolved is an analysis boundary, NEVER a ProgramError or success.
use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, program_pack::Pack, system_program};
use anchor_spl::token_2022::spl_token_2022;
use anchor_spl::associated_token::{get_associated_token_address_with_program_id,
    spl_associated_token_account::instruction::create_associated_token_account_idempotent};
use crate::PumpError;

pub enum Recovery<T> { Known(T), Unresolved(UnresolvedBranch) }
pub enum UnresolvedBranch {
    TokenAccountLayout { bytes: usize },
    Token2022QuoteMetadata,
    BuybackAuthorization,
}

// 0x185ed0 -> 0x194388: only the fully evidenced fixed-size account path is proposed.
// Other layouts are not rejected and are not sent to a legacy implementation.
fn ordinary_account(data: &[u8]) -> Result<Recovery<spl_token_2022::state::Account>> {
    if data.len() != 165 {
        return Ok(Recovery::Unresolved(UnresolvedBranch::TokenAccountLayout { bytes: data.len() }));
    }
    Ok(Recovery::Known(spl_token_2022::state::Account::unpack(data)?))
}

// 0x14910. All AccountInfos here were admitted by the enclosing typed parser.
// Historical errors include source origins; these require/equality macros only
// propose logical errors and attached key ordering, not original diagnostics.
pub fn quote_vault<'info>(
    vault: &AccountInfo<'info>, authority: &AccountInfo<'info>, mint: &Pubkey,
    token_program_key: &Pubkey, mint_info: &AccountInfo<'info>,
    token_program_info: &AccountInfo<'info>, allow_create: bool,
    payer: &AccountInfo<'info>, system: &AccountInfo<'info>,
) -> Result<Recovery<()>> {
    let expected = get_associated_token_address_with_program_id(
        authority.key, mint, token_program_key);
    require_keys_eq!(*vault.key, expected, anchor_lang::error::ErrorCode::ConstraintSeeds);
    if vault.owner == &system_program::ID {
        require!(allow_create, anchor_lang::error::ErrorCode::AccountNotInitialized);
        let ix = create_associated_token_account_idempotent(
            payer.key, authority.key, mint, token_program_key);
        // 0x15f70 -> 0x1a0508, ordinary invoke; exactly six AccountInfos.
        // No data Ref is held across this CPI. Allocation/rent/init belongs to ATA.
        invoke(&ix, &[payer.clone(), vault.clone(), authority.clone(),
            mint_info.clone(), system.clone(), token_program_info.clone()])?;
    }
    // 0x15fc0 returns to 0x14b08: owner is checked after a successful CPI too.
    require_keys_eq!(*vault.owner, *token_program_key, PumpError::AccountTypeNotSupported);
    let data = vault.try_borrow_data()?;
    let account = match ordinary_account(&data)? {
        Recovery::Known(account) => account,
        Recovery::Unresolved(gap) => return Ok(Recovery::Unresolved(gap)),
    };
    require_keys_eq!(account.mint, *mint, PumpError::MintDoesNotMatchBondingCurve);
    // No extra account.owner == authority check occurs in 0x14910.
    drop(data);
    Ok(Recovery::Known(()))
}

// 0x160d0: a token account, not necessarily an ATA. No create attempt here.
pub fn quote_user<'info>(account: &AccountInfo<'info>, user: &AccountInfo<'info>,
    mint: &Pubkey, token_program_key: &Pubkey) -> Result<Recovery<()>> {
    require_keys_eq!(*account.owner, *token_program_key, PumpError::AccountTypeNotSupported);
    let data = account.try_borrow_data()?;
    let token = match ordinary_account(&data)? {
        Recovery::Known(token) => token,
        Recovery::Unresolved(gap) => return Ok(Recovery::Unresolved(gap)),
    };
    require_keys_eq!(token.mint, *mint, PumpError::MintDoesNotMatchBondingCurve);
    require_keys_eq!(token.owner, *user.key, PumpError::AccountTypeNotSupported);
    drop(data);
    Ok(Recovery::Known(()))
}

pub fn is_native(stored_quote: &Pubkey) -> bool { *stored_quote == Pubkey::default() }

// 0x94908, reached after vault/user/buyback admission on token paths.
// No extra mint deserialize or decimals read belongs in this ordinary branch.
pub fn ordinary_quote_metadata(mint_info: &AccountInfo<'_>) -> Recovery<Option<()>> {
    if mint_info.owner == &spl_token_2022::ID {
        Recovery::Unresolved(UnresolvedBranch::Token2022QuoteMetadata)
    } else {
        Recovery::Known(None)
    }
}
