//! Source-only B4 composition fragment. No compiled/equivalence claim.
//! Natural source origins remain different from historical diagnostic metadata.
use anchor_lang::prelude::*;
use anchor_lang::solana_program::program_pack::Pack;
use anchor_spl::associated_token::get_associated_token_address_with_program_id;
use anchor_spl::token_2022::spl_token_2022;
use crate::{Global, PumpError};
use super::preflight_contract::BuybackAdmission;
use super::quote_helpers::{Recovery, UnresolvedBranch};

/// Uses the typed field; no assumption that wire order equals Rust memory order.
pub struct GlobalBuybackAdmission<'g> {
    recipients: &'g [Pubkey; 8],
}
impl<'g> GlobalBuybackAdmission<'g> {
    pub fn from_global(global: &'g Global) -> Self {
        Self { recipients: &global.buyback_fee_recipients }
    }
    /// Original 0x98438: zero rejection precedes the ordered eight-key search.
    fn authorize(&self, key: &Pubkey) -> Result<()> {
        require_keys_neq!(*key, Pubkey::default(), PumpError::BuybackFeeRecipientMissing);
        require!(self.recipients.contains(key), PumpError::BuybackFeeRecipientNotAuthorized);
        Ok(())
    }
}
impl BuybackAdmission for GlobalBuybackAdmission<'_> {
    fn check(&self, native: bool, recipient: &AccountInfo<'_>,
        mint: &Pubkey, program: &Pubkey) -> Result<Recovery<()>> {
        if native {
            self.authorize(recipient.key)?;
            return Ok(Recovery::Known(()));
        }
        // Original 0x7e490: no account creation or authority check before decode.
        require_keys_eq!(*recipient.owner, *program, PumpError::AccountTypeNotSupported);
        let authority = {
            let data = recipient.try_borrow_data()?;
            // The existing B4 fixed-layout decoder contract only. All extended
            // token layouts remain opaque analysis obligations, not rejections.
            if data.len() != 165 {
                return Ok(Recovery::Unresolved(UnresolvedBranch::TokenAccountLayout {
                    bytes: data.len(),
                }));
            }
            let token = spl_token_2022::state::Account::unpack(&data)?;
            require_keys_eq!(token.mint, *mint, PumpError::MintDoesNotMatchBondingCurve);
            token.owner
        }; // release Ref before membership / address derivation, on errors too
        self.authorize(&authority)?;
        // Keep the expression inside the equality macro: original derives once
        // for comparison, and again on mismatch to construct compared-key data.
        require_keys_eq!(*recipient.key,
            get_associated_token_address_with_program_id(&authority, mint, program),
            anchor_lang::error::ErrorCode::ConstraintSeeds);
        Ok(Recovery::Known(()))
    }
}
