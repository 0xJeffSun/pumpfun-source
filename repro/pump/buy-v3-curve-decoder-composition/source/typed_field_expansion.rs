// Illustrative field-deserialization expansion only. Do not add this beside
// the existing derive(Accounts) field: that already generates this operation.
// It is not a complete BuyV3 parser, constraint checker, or new call site.
use anchor_lang::prelude::*;
use crate::trade_types::BondingCurve;

fn parse_buy_v3_curve_field<'info, B>(
    program_id: &Pubkey,
    accounts: &mut &'info [AccountInfo<'info>],
    ix_data: &[u8],
    bumps: &mut B,
    reallocs: &mut std::collections::BTreeSet<Pubkey>,
) -> Result<Box<Account<'info, BondingCurve>>> {
    Box::<Account<'info, BondingCurve>>::try_accounts(
        program_id, accounts, ix_data, bumps, reallocs,
    ).map_err(|error| error.with_account_name("bonding_curve"))
}
