use anchor_lang::prelude::*;
use crate::{AdminGlobal, PumpError};










































































































pub fn update_buyback_config(ctx: Context<AdminGlobal>, buyback_basis_points: Option<u64>) -> Result<()> {
    let global = &mut ctx.accounts.global;
    if let Some(value) = buyback_basis_points {
        global.set_buyback_basis_points(value)?;
    }
    let ra = ctx.remaining_accounts;
    match ra.len() {
        0 => {}
        8 => {
            let recipients = [ra[0].key(), ra[1].key(), ra[2].key(), ra[3].key(), ra[4].key(), ra[5].key(), ra[6].key(), ra[7].key()];
            global.set_buyback_fee_recipients(recipients)?;
        }
        _ => return err!(PumpError::WrongBuybackFeeRecipientsCount),
    }
    Ok(())
}
