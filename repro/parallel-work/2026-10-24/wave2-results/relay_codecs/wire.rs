//! Scratch pure wire parsers, NOT recovered historical Rust or an Anchor ABI.
//! Static-only; never compiled or run. Rust 2021-compatible source, no dependencies.
//! Input includes the discriminator. It is not consumed or mutated. Extra bytes
//! are returned verbatim. No owner/PDA/signer, account policy, allocation or CPI.
//! Error variants below are local parser diagnostics, NOT original program errors.
use core::convert::TryInto;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum WireError {
    ShortDiscriminator,
    WrongDiscriminator,
    ShortBody,
    InvalidState(u8),
}
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum StateTag { Zero, One }
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Common {
    pub bump: u8,
    pub state: StateTag,
    pub config_id: [u8; 32],
    pub mint: [u8; 32],
}
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct DebouncerV1 { pub common: Common, pub total_amount: u64 }
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct DistributionV1 { pub common: Common, pub epoch: u128, pub total_amount: u64 }
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct EpochTrackerV1 { pub common: Common, pub current_epoch: u128 }
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct SwapReceiptV1 { pub bump: u8, pub distribution: [u8; 32], pub output_amount: u64 }

pub const DEBOUNCER_DISCRIMINATOR: [u8; 8] = [137,137,192,77,110,184,189,28];
pub const DISTRIBUTION_DISCRIMINATOR: [u8; 8] = [228,175,114,137,165,18,11,14];
pub const EPOCH_TRACKER_DISCRIMINATOR: [u8; 8] = [130,12,50,226,170,109,160,155];
pub const SWAP_RECEIPT_DISCRIMINATOR: [u8; 8] = [230,238,44,28,252,27,66,222];

fn header(b: &[u8], expected: [u8; 8]) -> Result<(), WireError> {
    let actual = b.get(..8).ok_or(WireError::ShortDiscriminator)?;
    if actual != expected.as_slice() { return Err(WireError::WrongDiscriminator); }
    Ok(())
}
fn bytes<const N: usize>(b: &[u8], offset: usize) -> Result<[u8; N], WireError> {
    // Only fixed offsets and widths below reach this helper.
    b.get(offset..offset + N).ok_or(WireError::ShortBody)?
        .try_into().map_err(|_| WireError::ShortBody)
}
fn common(b: &[u8]) -> Result<Common, WireError> {
    let bump = *b.get(8).ok_or(WireError::ShortBody)?;
    let tag = *b.get(9).ok_or(WireError::ShortBody)?;
    // Original bodies check state before the config/mint and numeric lengths.
    let state = match tag {
        0 => StateTag::Zero,
        1 => StateTag::One,
        other => return Err(WireError::InvalidState(other)),
    };
    Ok(Common { bump, state, config_id: bytes(b, 10)?, mint: bytes(b, 42)? })
}
// Complete original wrapper/body [505216,507440); minimum total length 82.
pub fn debouncer(b: &[u8]) -> Result<(DebouncerV1, &[u8]), WireError> {
    header(b, DEBOUNCER_DISCRIMINATOR)?;
    let common = common(b)?;
    let total_amount = u64::from_le_bytes(bytes(b, 74)?);
    Ok((DebouncerV1 { common, total_amount }, &b[82..]))
}
// Complete original wrapper/body [507440,509800); minimum total length 98.
pub fn distribution(b: &[u8]) -> Result<(DistributionV1, &[u8]), WireError> {
    header(b, DISTRIBUTION_DISCRIMINATOR)?;
    let common = common(b)?;
    let epoch = u128::from_le_bytes(bytes(b, 74)?);
    let total_amount = u64::from_le_bytes(bytes(b, 90)?);
    Ok((DistributionV1 { common, epoch, total_amount }, &b[98..]))
}
// Complete original wrapper/body [509800,512088); minimum total length 90.
pub fn epoch_tracker(b: &[u8]) -> Result<(EpochTrackerV1, &[u8]), WireError> {
    header(b, EPOCH_TRACKER_DISCRIMINATOR)?;
    let common = common(b)?;
    let current_epoch = u128::from_le_bytes(bytes(b, 74)?);
    Ok((EpochTrackerV1 { common, current_epoch }, &b[90..]))
}
// Complete original wrapper/body [513680,515416); minimum total length 49.
pub fn swap_receipt(b: &[u8]) -> Result<(SwapReceiptV1, &[u8]), WireError> {
    header(b, SWAP_RECEIPT_DISCRIMINATOR)?;
    let bump = *b.get(8).ok_or(WireError::ShortBody)?;
    let distribution = bytes(b, 9)?;
    let output_amount = u64::from_le_bytes(bytes(b, 41)?);
    Ok((SwapReceiptV1 { bump, distribution, output_amount }, &b[49..]))
}
// No unchecked decoder API: the original unchecked bodies have a <8-byte
// panic edge. No MintWhitelist implementation: allocation/error behavior open.
