//! Source composition fragment only. Not installed, compiled or a complete repair.
//! Implements the evidenced bit-0 call gate and early error propagation.
//! The closure MUST implement the missing 0x7e490 contract; no stub is supplied.
use anchor_lang::prelude::*;

fn checked_protocol_preflight<F>(flag: u8, check: F) -> Result<()>
where
    F: FnOnce() -> Result<()>,
{
    if flag & 1 != 0 {
        check()?;
    }
    Ok(())
}

// Required insertion in execute, after admit_vaults(&h)? and before let buy:
// checked_protocol_preflight(flag, || {
//     recovered_dependency(
//         &a.global, a.buyback_fee_recipient.to_account_info(), 0,
//         h.quote_mint.key(), anchor_spl::token::ID,
//     )
// })?;
//
// recovered_dependency is deliberately NOT defined. The Result adapter must map
// original success tag 2 and forward its error; body effects and constraints are
// unknown. The arguments above are source-level identities, not a claimed original
// Rust function name or ABI. Selected program is Tokenkeg only under this domain.
