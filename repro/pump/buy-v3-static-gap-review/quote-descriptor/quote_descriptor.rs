//! Source-only BuyV3 quote descriptor hypothesis from original 94908/17c850.
//! Not compiled or integrated; natural source origins and native Rust ABI remain
//! unproved. No extension processor or account mutation is implemented here.
use anchor_lang::prelude::*;
use anchor_spl::token_2022::{ID as TOKEN_2022_ID, spl_token_2022::extension::transfer_fee::TransferFee};
use crate::PumpError;

/// Logical fields observed in original descriptor payload +8/+16/+24.
/// bps is decoded/consumed as u16; upper bits in its native word are padding.
/// This is not a claim that the historical declaration used these names/layout.
#[derive(Clone, Copy)]
pub struct QuoteFee {
    pub epoch: u64,
    pub maximum_fee: u64,
    pub basis_points: u16,
}
impl QuoteFee {
    fn library_fee(self) -> TransferFee {
        TransferFee { epoch: self.epoch.into(), maximum_fee: self.maximum_fee.into(),
            transfer_fee_basis_points: self.basis_points.into() }
    }
}

fn word(data: &[u8], at: usize) -> u64 {
    u64::from_le_bytes(data[at..at+8].try_into().unwrap())
}
fn half(data: &[u8], at: usize) -> u16 {
    u16::from_le_bytes(data[at..at+2].try_into().unwrap())
}

/// 17c850: custom full TLV walk. Deliberately not get_extension::<TransferFeeConfig>:
/// target rejects duplicate fee entries, tolerates unknown types/oversized fee
/// payloads and terminates at type0 or fewer than2 remaining bytes.
fn scan_schedule(data: &[u8]) -> Option<Option<(QuoteFee, QuoteFee)>> {
    if data.len() == 82 { return Some(None); }
    if data.len() < 167 { return None; }
    if data[82..165].iter().any(|b| *b != 0) || data[165] != 1 { return None; }
    let mut cursor = 166usize;
    let mut schedule = None;
    loop {
        let remaining = data.len() - cursor;
        if remaining < 2 { return Some(schedule); }
        let kind = half(data, cursor);
        if kind == 0 { return Some(schedule); }
        if remaining < 4 { return None; }
        let payload_len = usize::from(half(data, cursor + 2));
        let entry_len = payload_len + 4;
        if entry_len > remaining { return None; }
        if kind == 1 {
            if schedule.is_some() || payload_len < 108 { return None; }
            let payload = &data[cursor + 4..cursor + entry_len];
            let older = QuoteFee { epoch: word(payload,72), maximum_fee: word(payload,80),
                basis_points: half(payload,88) };
            let newer = QuoteFee { epoch: word(payload,90), maximum_fee: word(payload,98),
                basis_points: half(payload,106) };
            schedule = Some((older,newer));
        }
        cursor = cursor.checked_add(entry_len)?;
    }
}

/// Call only after original vault/user/buyback admission. Native preflight does
/// not call94908 at all; a legacy-owned token mint returnsNone without data/Clock.
/// Token2022 performs Clock::get even when its valid mint has no fee extension.
pub fn read_quote_fee(mint: &AccountInfo<'_>, native: bool) -> Result<Option<QuoteFee>> {
    if native || mint.owner != &TOKEN_2022_ID { return Ok(None); }
    let data = mint.try_borrow_data()?;
    let schedule = scan_schedule(&data).ok_or_else(|| error!(PumpError::UnsupportedQuoteMint))?;
    let epoch = Clock::get()?.epoch;
    let result = schedule.map(|(older,newer)| if epoch >= newer.epoch { newer } else { older });
    // Original94908 holds its shared data Ref until after Clock and selection.
    drop(data);
    Ok(result)
}

/// 94e28 ->17c3d8: calculate_fee (not inverse_fee); None maps PumpOverflow6024.
pub fn removal(fee: Option<QuoteFee>, gross: u64) -> Result<u64> {
    match fee {
        None => Ok(0),
        Some(fee) => fee.library_fee().calculate_fee(gross)
            .ok_or_else(|| error!(PumpError::Overflow)),
    }
}
/// 950e0: checked amount minus its transfer-fee removal.
pub fn net_amount(fee: Option<QuoteFee>, gross: u64) -> Result<u64> {
    gross.checked_sub(removal(fee,gross)?).ok_or_else(|| error!(PumpError::Overflow))
}
/// 95360 ->17c548: calculate_pre_fee_amount, not calculate_inverse_fee.
pub fn gross_amount(fee: Option<QuoteFee>, desired_net: u64) -> Result<u64> {
    match fee {
        None => Ok(desired_net),
        Some(fee) => fee.library_fee().calculate_pre_fee_amount(desired_net)
            .ok_or_else(|| error!(PumpError::Overflow)),
    }
}

/// 80df8 continuation AFTER its original ordered checked sums and raw buybacks.
/// Supplied unadapted_curve is total gross legs minus raw combined buyback.
/// Caller must use adapted_curve+raw_combined_buyback for max-cost and debit.
pub fn adapt_curve_cost(fee: Option<QuoteFee>, unadapted_curve: u64) -> Result<(u64,u64)> {
    let adapted_curve = gross_amount(fee,unadapted_curve)?;
    let trailing_adjustment = adapted_curve.checked_sub(unadapted_curve)
        .ok_or_else(|| error!(PumpError::Overflow))?;
    Ok((adapted_curve,trailing_adjustment))
}

/// Settlement84858/848a0, AFTER quote transfers: net both raw amounts separately.
/// First event's buyback is net(b1+b2)-net(b2), NOT net(b1) in general.
pub fn event_buybacks(fee: Option<QuoteFee>, raw_total: u64, raw_second: u64)
    -> Result<(u64,u64)> {
    let net_total = net_amount(fee,raw_total)?;
    let net_second = net_amount(fee,raw_second)?;
    let net_first = net_total.checked_sub(net_second)
        .ok_or_else(|| error!(PumpError::Overflow))?;
    Ok((net_first,net_second))
}
