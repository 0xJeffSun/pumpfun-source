// Proposed private child of trade; NOT wired by containment.patch.
// Uses the existing locked Anchor API. Uncompiled static source hypothesis.
use anchor_lang::prelude::*;
use anchor_lang::Bumps;
use std::collections::BTreeSet;
use super::{buy, buy_ordinary_candidate, BuyV3, SellV3};

#[derive(Clone, Copy)]
pub enum BuyLane { Accepted, Ordinary }

// The caller must select the lane before either Accounts parser executes.
// `data` is the unchanged argument byte slice AFTER the instruction discriminator.
// The caller has already decoded both u64s and OptionBool using the existing
// instruction decoder. Preserve that decoder, discriminator, and error handling.
// Selection is reconstruction integration policy, never historical validation.
pub fn run_selected_buy<'info>(
    program_id: &Pubkey,
    raw: &'info [AccountInfo<'info>],
    data: &[u8],
    amount: u64,
    max_sol_cost: u64,
    lane: BuyLane,
) -> Result<()> {
    let mut remaining = raw;
    let mut reallocs = BTreeSet::new();
    match lane {
        BuyLane::Accepted => {
            let mut bumps = <SellV3<'info> as Bumps>::Bumps::default();
            let mut a = SellV3::try_accounts(program_id, &mut remaining, data,
                                           &mut bumps, &mut reallocs)?;
            buy(Context::new(program_id, &mut a, remaining, bumps),
                amount, max_sol_cost)?;
            a.exit(program_id)
        }
        BuyLane::Ordinary => {
            let mut bumps = <BuyV3<'info> as Bumps>::Bumps::default();
            let mut a = BuyV3::try_accounts(program_id, &mut remaining, data,
                                          &mut bumps, &mut reallocs)?;
            buy_ordinary_candidate(Context::new(program_id, &mut a, remaining, bumps),
                                   amount, max_sol_cost)?;
            a.exit(program_id)
        }
    }
}

// Read-only selection: no init, rent preparation, CPI, fee decode, or exit.
// Failed/ambiguous probes retain the accepted parser, not an invented success.
// Does not inspect or implement any Token2022 extension.
pub fn choose_buy_lane<'info>(raw: &'info [AccountInfo<'info>]) -> BuyLane {
    if raw.len() < 17 { return BuyLane::Accepted; }
    let legacy = anchor_spl::token::ID;
    if *raw[3].key != legacy || raw[1].owner != &legacy || raw[1].data_len() != 82
        || raw[6].owner != &legacy || raw[6].data_len() != 165
        || raw[9].owner != &legacy || raw[9].data_len() != 165
        || raw[2].owner != &legacy || raw[2].data_len() != 82
        || raw[5].data_len() < 166 {
        return BuyLane::Accepted;
    }
    let global = match Account::<crate::Global>::try_from(&raw[0]) {
        Ok(a) => a, Err(_) => return BuyLane::Accepted,
    };
    let curve = match Account::<crate::trade_types::BondingCurve>::try_from(&raw[5]) {
        Ok(a) => a, Err(_) => return BuyLane::Accepted,
    };
    if curve.is_mayhem_mode || curve.is_cashback_coin
        || *raw[8].key == global.whitelist_pda || global.buyback_basis_points > 10000 {
        return BuyLane::Accepted;
    }
    if curve.quote_mint != Pubkey::default()
        && (*raw[4].key != legacy || raw[7].owner != &legacy || raw[7].data_len() != 165
            || raw[10].data_len() != 165 || raw[13].data_len() != 165) {
        return BuyLane::Accepted;
    }
    BuyLane::Ordinary
}
