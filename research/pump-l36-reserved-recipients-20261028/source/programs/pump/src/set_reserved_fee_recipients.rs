use anchor_lang::prelude::*;
use crate::{AdminGlobal,AdminReadonly,ReservedFeeRecipientsEvent,PumpError};
/// One primary reserved fee recipient plus seven additional ones.
pub const RESERVED_FEE_RECIPIENTS_LEN: usize = 8;















/// Sets the reserved fee recipients and the whitelist PDA.
///
/// The reserved fee recipients are passed as the first
/// `RESERVED_FEE_RECIPIENTS_LEN` remaining accounts. The first one becomes
/// `GlobalConfig::reserved_fee_recipient`, the other seven become
/// `GlobalConfig::reserved_fee_recipients`.
///
/// Every recipient must be a non-default, non-executable, rent exempt
/// account so that fee transfers to it can never fail.
pub fn execute(ctx: Context<AdminReadonly>, whitelist_pda: Pubkey) -> Result<()> {
    let remaining_accounts = ctx.remaining_accounts;
    let global_config = &mut ctx.accounts.global;
    // remaining_accounts:
    //   [0]    reserved_fee_recipient
    //   [1..8] reserved_fee_recipients
    //
    // Any further remaining accounts are ignored. The admin is trusted to
    // pass distinct accounts; duplicates are not rejected, they only reduce
    // the number of distinct reserved fee recipients the trade instructions
    // can pick from.
    require_gte!(
        remaining_accounts.len(),
        RESERVED_FEE_RECIPIENTS_LEN,
        PumpError::NotEnoughRemainingAccounts
    );

    let recipients: [Pubkey; RESERVED_FEE_RECIPIENTS_LEN] = remaining_accounts[..RESERVED_FEE_RECIPIENTS_LEN]
        .iter()
        .map(|account| account.key())
        .collect::<Vec<_>>()
        .try_into().map_err(|_| anchor_lang::error::ErrorCode::AccountNotEnoughKeys)
        .unwrap();

    let rent = Rent::get()?;
    {
        let mut accounts = remaining_accounts
            .iter()
            .take(RESERVED_FEE_RECIPIENTS_LEN)
            .enumerate();
        while let Some((i, account)) = accounts.next() {
            require_keys_neq!(
                account.key(),
                Pubkey::default(),
                PumpError::AllFeeRecipientsShouldBeNonZero
            );
            if account.executable {
                return Err(anchor_lang::error::Error::from(anchor_lang::error::ErrorCode::ConstraintExecutable)
                    .with_account_name(format!("reserved_fee_recipients[{}]", i)));
            }
            if unlikely(!rent.is_exempt(account.lamports(), account.try_data_len()?)) {
                return Err(anchor_lang::error::Error::from(anchor_lang::error::ErrorCode::ConstraintRentExempt)
                    .with_account_name(format!("reserved_fee_recipients[{}]", i)));
            }
        }
    }

    global_config.whitelist_pda = whitelist_pda;
    global_config.reserved_fee_recipient = recipients[0];
    global_config.reserved_fee_recipients.copy_from_slice(&recipients[1..]);

    let event = ReservedFeeRecipientsEvent {
        timestamp: Clock::get()?.unix_timestamp,
        reserved_fee_recipient: global_config.reserved_fee_recipient,
        reserved_fee_recipients: global_config.reserved_fee_recipients,
    };
    emit!(event);
    emit_cpi!(event);

    Ok(())
}



















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


#[inline]
#[cold]
fn cold() {}

#[inline]
fn unlikely(b: bool) -> bool {
    if b {
        cold();
    }
    b
}
