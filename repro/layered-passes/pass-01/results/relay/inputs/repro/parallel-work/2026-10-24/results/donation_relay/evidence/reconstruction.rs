// SCRATCH RUST, NOT HISTORICAL SOURCE. Not compiled or executed.
// Static semantic normal forms: do not preserve Anchor result ABI, allocation,
// error precedence/details, owner/PDA/signer checks, or compute behavior.
// All byte offsets include the 8-byte account discriminator. Trailing bytes allowed.
// These are standalone codec sketches, not deployable relay handlers.

#[derive(Debug)]
pub enum CodecError { Short, Discriminator, State, Length }
fn arr<const N: usize>(b: &[u8], p: usize) -> Result<[u8; N], CodecError> {
    b.get(p..p.checked_add(N).ok_or(CodecError::Length)?)
        .ok_or(CodecError::Short)?.try_into().map_err(|_| CodecError::Short)
}
fn header(b: &[u8], d: [u8; 8]) -> Result<(), CodecError> {
    if arr::<8>(b, 0)? != d { return Err(CodecError::Discriminator); }
    Ok(())
}
// IDL names attached to byte roles corroborated by the fixed decoder windows.
#[derive(Debug)]
pub struct Common {
    pub bump: u8, pub state: u8, pub config_id: [u8; 32], pub mint: [u8; 32],
}
fn common(b: &[u8]) -> Result<Common, CodecError> {
    let bump = arr::<1>(b, 8)?[0];
    let state = arr::<1>(b, 9)?[0];
    if state > 1 { return Err(CodecError::State); }
    Ok(Common { bump, state, config_id: arr(b, 10)?, mint: arr(b, 42)? })
}
// Checked wrapper [505216,506304), body [506304,507440).
pub fn debouncer(b: &[u8]) -> Result<(Common, u64), CodecError> {
    header(b, [137,137,192,77,110,184,189,28])?;
    Ok((common(b)?, u64::from_le_bytes(arr(b, 74)?)))
}
// Checked wrapper [507440,508560), body [508560,509800).
pub fn distribution(b: &[u8]) -> Result<(Common, u128, u64), CodecError> {
    header(b, [228,175,114,137,165,18,11,14])?;
    Ok((common(b)?, u128::from_le_bytes(arr(b, 74)?),
        u64::from_le_bytes(arr(b, 90)?)))
}
// Checked wrapper [509800,510920), body [510920,512088).
pub fn epoch_tracker(b: &[u8]) -> Result<(Common, u128), CodecError> {
    header(b, [130,12,50,226,170,109,160,155])?;
    Ok((common(b)?, u128::from_le_bytes(arr(b, 74)?)))
}
// Checked wrapper [513680,514800), body [514800,515416).
pub fn swap_receipt(b: &[u8]) -> Result<(u8, [u8;32], u64), CodecError> {
    header(b, [230,238,44,28,252,27,66,222])?;
    Ok((arr::<1>(b, 8)?[0], arr(b, 9)?, u64::from_le_bytes(arr(b, 41)?)))
}
// MintWhitelistV1: IDL wire model, prefix/body [513224,513680) delegates
// vector reading to [60320,61568). The borrowed representation below deliberately
// omits captured vector allocation/growth/panic behavior. It is not a translation
// of that helper and does not prove equal resource-limited acceptance.
pub fn mint_whitelist_view(b: &[u8]) -> Result<(u8, &[u8]), CodecError> {
    header(b, [73,115,177,235,234,1,95,67])?;
    let bump = arr::<1>(b, 8)?[0];
    let n = u32::from_le_bytes(arr(b, 9)?) as usize;
    let end = 13usize.checked_add(n.checked_mul(32).ok_or(CodecError::Length)?)
        .ok_or(CodecError::Length)?;
    Ok((bump, b.get(13..end).ok_or(CodecError::Short)?))
}
// Exact local register-level pure normal form [629280,629312).
// No claim about original name, Rust type, or relay-domain role.
pub fn unnamed_629280(input: u64) -> u64 {
    if input == 355 { 357 } else { input }
}
