// Source-only compatibility orchestration, not recovered historical source.
// Included by trade.rs so generated account metadata stays in its existing scope.
#[derive(Debug, Default)]
pub struct BuyV3DispatchBumps {
    pub accepted: <SellV3<'static> as anchor_lang::Bumps>::Bumps,
    pub ordinary: <BuyV3<'static> as anchor_lang::Bumps>::Bumps,
}

pub enum BuyV3Dispatch<'info> {
    Accepted(SellV3<'info>),
    Ordinary(BuyV3<'info>),
}

impl<'info> anchor_lang::Bumps for BuyV3Dispatch<'info> {
    type Bumps = BuyV3DispatchBumps;
}

impl<'info> Accounts<'info, BuyV3DispatchBumps> for BuyV3Dispatch<'info> {
    fn try_accounts(
        program_id: &Pubkey,
        accounts: &mut &'info [AccountInfo<'info>],
        ix_data: &[u8],
        bumps: &mut BuyV3DispatchBumps,
        reallocs: &mut std::collections::BTreeSet<Pubkey>,
    ) -> Result<Self> {
        // No parser has run yet; never retry a parser after any error.
        if ordinary_buy_domain(*accounts) {
            BuyV3::try_accounts(program_id, accounts, ix_data,
                &mut bumps.ordinary, reallocs).map(Self::Ordinary)
        } else {
            SellV3::try_accounts(program_id, accounts, ix_data,
                &mut bumps.accepted, reallocs).map(Self::Accepted)
        }
    }
}

impl<'info> ToAccountInfos<'info> for BuyV3Dispatch<'info> {
    fn to_account_infos(&self) -> Vec<AccountInfo<'info>> {
        match self {
            Self::Accepted(a) => a.to_account_infos(),
            Self::Ordinary(a) => a.to_account_infos(),
        }
    }
}
impl<'info> ToAccountMetas for BuyV3Dispatch<'info> {
    fn to_account_metas(&self, is_signer: Option<bool>)
        -> Vec<anchor_lang::solana_program::instruction::AccountMeta> {
        match self {
            Self::Accepted(a) => a.to_account_metas(is_signer),
            Self::Ordinary(a) => a.to_account_metas(is_signer),
        }
    }
}
impl<'info> AccountsExit<'info> for BuyV3Dispatch<'info> {
    fn exit(&self, program_id: &Pubkey) -> Result<()> {
        match self {
            Self::Accepted(a) => a.exit(program_id),
            Self::Ordinary(a) => a.exit(program_id),
        }
    }
}

pub fn buy_dispatch<'info>(ctx: Context<'_, '_, '_, 'info, BuyV3Dispatch<'info>>,
    amount: u64, max_sol_cost: u64) -> Result<()> {
    // The generated wrapper owns the sole exit; this function does not exit.
    match ctx.accounts {
        BuyV3Dispatch::Accepted(a) => buy(Context::new(
            ctx.program_id, a, ctx.remaining_accounts, ctx.bumps.accepted),
            amount, max_sol_cost),
        BuyV3Dispatch::Ordinary(a) => buy_ordinary_candidate(Context::new(
            ctx.program_id, a, ctx.remaining_accounts, ctx.bumps.ordinary),
            amount, max_sol_cost),
    }
}

// Reuse actual generated 17-account client/CPI structs, under the name the
// locked program macro derives from Context<BuyV3Dispatch>. No empty metadata.
pub(crate) mod __client_accounts_buy_v3_dispatch {
    pub use super::__client_accounts_sell_v3::SellV3 as BuyV3Dispatch;
}
pub(crate) mod __cpi_client_accounts_buy_v3_dispatch {
    pub use super::__cpi_client_accounts_sell_v3::SellV3 as BuyV3Dispatch;
}

// The baseline manifest has no idl-build feature. If that feature is wired by
// root in the future, preserve the original generated account metadata too.
#[cfg(feature = "idl-build")]
impl<'info> BuyV3Dispatch<'info> {
    pub fn __anchor_private_gen_idl_accounts(
        accounts: &mut std::collections::BTreeMap<String, anchor_lang::idl::types::IdlAccount>,
        types: &mut std::collections::BTreeMap<String, anchor_lang::idl::types::IdlTypeDef>,
    ) -> Vec<anchor_lang::idl::types::IdlInstructionAccountItem> {
        SellV3::__anchor_private_gen_idl_accounts(accounts, types)
    }
}

// Selection is read-only domain classification, not account admission. Failed
// observation uses the accepted parser, which supplies its actual error. It
// never overrides a parser/body error or retries a failed ordinary parser.
fn buy_has_len(info: &AccountInfo<'_>, size: usize) -> bool {
    info.try_borrow_data().map(|data| data.len() == size).unwrap_or(false)
}
fn ordinary_buy_domain<'info>(raw: &'info [AccountInfo<'info>]) -> bool {
    if raw.len() < 17 { return false; }
    let legacy = anchor_spl::token::ID;
    // This first check routes the entire frozen 105-success base domain back
    // unchanged without decoding or borrowing any Token2022 account data.
    if *raw[3].key != legacy || raw[1].owner != &legacy { return false; }
    if !buy_has_len(&raw[1], 82)
        || raw[6].owner != &legacy || !buy_has_len(&raw[6], 165)
        || raw[9].owner != &legacy || !buy_has_len(&raw[9], 165)
        || raw[2].owner != &legacy || !buy_has_len(&raw[2], 82) {
        return false;
    }
    if !raw[5].try_borrow_data().map(|d| d.len() >= 166).unwrap_or(false) {
        return false;
    }
    // These temporary read-only decoded values are dropped before admission.
    // No Global/curve Account object is retained for a later stale exit.
    let global = match Account::<Global>::try_from(&raw[0]) {
        Ok(a) => a, Err(_) => return false,
    };
    let curve = match Account::<BondingCurve>::try_from(&raw[5]) {
        Ok(a) => a, Err(_) => return false,
    };
    if curve.is_mayhem_mode || curve.is_cashback_coin
        || *raw[8].key == global.whitelist_pda || global.buyback_basis_points > 10000 {
        return false;
    }
    // Preserve the accepted native aliases. Stored WSOL's interpretation is
    // incompatible between the two implementations, so it remains accepted.
    if curve.quote_mint == WSOL { return false; }
    if curve.quote_mint != Pubkey::default()
        && (*raw[4].key != legacy || raw[7].owner != &legacy
            || !buy_has_len(&raw[7], 165) || !buy_has_len(&raw[10], 165)
            || !buy_has_len(&raw[13], 165)) {
        return false;
    }
    true
}
