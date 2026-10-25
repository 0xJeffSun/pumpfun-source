//! Source composition boundary, deliberately not a replacement handler.
//! Inputs describe original context roles, not an asserted Rust field layout.
use anchor_lang::prelude::*;
use super::quote_helpers::*;
pub struct QuoteInputs<'a, 'info> {
    pub stored_quote: &'a Pubkey,
    pub quote_mint: &'a AccountInfo<'info>,
    pub quote_program: &'a AccountInfo<'info>,
    pub curve: &'a AccountInfo<'info>,
    pub curve_quote: &'a AccountInfo<'info>,
    pub user: &'a AccountInfo<'info>,
    pub user_quote: &'a AccountInfo<'info>,
    pub system: &'a AccountInfo<'info>,
    pub buyback_recipient: &'a AccountInfo<'info>,
}
// Original 0x7e490 uses global recipient authorization (0x98438). Binding the
// full Global representation/authorization remains explicit, without a stub
// implementation or a default success. This interface is not original ABI.
pub trait BuybackAdmission {
    fn check(&self, native: bool, recipient: &AccountInfo<'_>,
        mint: &Pubkey, program: &Pubkey) -> Result<Recovery<()>>;
}
pub struct QuoteAdmission { pub native: bool, pub ordinary_metadata: Option<()> }
pub fn preflight(a: &QuoteInputs<'_, '_>, buyback: &impl BuybackAdmission)
    -> Result<Recovery<QuoteAdmission>> {
    // Upstream typed relation: supplied mint == stored mint OR
    // stored mint == zero AND supplied mint == WSOL. Do not reverse it.
    let native = is_native(a.stored_quote);
    if !native {
        match quote_vault(a.curve_quote, a.curve, a.quote_mint.key,
            a.quote_program.key, a.quote_mint, a.quote_program,
            false, a.user, a.system)? { // caller slot -0xfe8 at 0x7f5c0
            Recovery::Known(()) => (),
            Recovery::Unresolved(gap) => return Ok(Recovery::Unresolved(gap)),
        }
        match quote_user(a.user_quote, a.user, a.quote_mint.key, a.quote_program.key)? {
            Recovery::Known(()) => (),
            Recovery::Unresolved(gap) => return Ok(Recovery::Unresolved(gap)),
        }
    }
    match buyback.check(native, a.buyback_recipient, a.quote_mint.key, a.quote_program.key)? {
        Recovery::Known(()) => (),
        Recovery::Unresolved(gap) => return Ok(Recovery::Unresolved(gap)),
    }
    let metadata = if native { None } else {
        match ordinary_quote_metadata(a.quote_mint) {
            Recovery::Known(metadata) => metadata,
            Recovery::Unresolved(gap) => return Ok(Recovery::Unresolved(gap)),
        }
    };
    Ok(Recovery::Known(QuoteAdmission { native, ordinary_metadata: metadata }))
}
