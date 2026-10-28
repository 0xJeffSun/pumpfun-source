//! Token-2022 mint extension helpers (separate crate: the original links them as their own object).
/// Native fee schedule shape observed at the original pre-fee helper boundary.
#[repr(C)]
#[derive(Clone, Copy)]
pub struct Fee {
    pub epoch: u64,
    pub maximum_fee: u64,
    pub basis_points: u16,
}

impl Fee {
    #[inline(never)]
    pub fn calculate_fee(&self, pre_fee_amount: u64) -> Option<u64> {
        if pre_fee_amount == 0 {
            return Some(0);
        }
        let basis_points = self.basis_points as u128;
        if basis_points == 0 {
            return Some(0);
        }
        let numerator = (pre_fee_amount as u128).checked_mul(basis_points)?;
        let raw_fee: u64 = numerator.checked_add(10_000)?
            .checked_sub(1)?.checked_div(10_000)?.try_into().ok()?;
        Some(core::cmp::min(raw_fee, self.maximum_fee))
    }

    #[inline(never)]
    pub fn calculate_pre_fee_amount(&self, post_fee_amount: u64) -> Option<u64> {
        let basis_points = self.basis_points as u128;
        match (basis_points, post_fee_amount) {
            (0, _) => Some(post_fee_amount),
            (_, 0) => Some(0),
            (10_000, _) => self.maximum_fee.checked_add(post_fee_amount),
            _ => {
                let numerator = (post_fee_amount as u128).checked_mul(10_000)?;
                let denominator = 10_000u128.checked_sub(basis_points)?;
                let pre_fee_amount = numerator.checked_add(denominator)?
                    .checked_sub(1)?.checked_div(denominator)?;
                if pre_fee_amount.checked_sub(post_fee_amount as u128)? >= self.maximum_fee as u128 {
                    post_fee_amount.checked_add(self.maximum_fee)
                } else {
                    u64::try_from(pre_fee_amount).ok()
                }
            }
        }
    }
}


#[repr(C)]
#[derive(Clone, Copy)]
pub struct TransferFeeConfig {
    pub older_transfer_fee: Fee,
    pub newer_transfer_fee: Fee,
}
const MINT_LEN: usize = 82;
const ACCOUNT_LEN: usize = 165;
#[inline(always)]
fn read_u64(data: &[u8], offset: usize) -> u64 {
    unsafe { core::ptr::read_unaligned(data.as_ptr().add(offset) as *const u64) }
}
#[inline(always)]
fn read_u16(data: &[u8], offset: usize) -> u16 {
    unsafe { core::ptr::read_unaligned(data.as_ptr().add(offset) as *const u16) }
}
#[inline(always)]
fn read_fee(data: &[u8], offset: usize) -> Fee {
    Fee { epoch: read_u64(data, offset), maximum_fee: read_u64(data, offset + 8), basis_points: read_u16(data, offset + 16) }
}
#[inline(always)]
fn read_config(rest: &[u8]) -> TransferFeeConfig {
    TransferFeeConfig { older_transfer_fee: read_fee(rest, 76), newer_transfer_fee: read_fee(rest, 94) }
}

#[inline]
fn store_cfg(rest:&[u8], config:&mut Option<TransferFeeConfig>) -> Result<(),()> {
    if config.is_some() { return Err(()); }
    if read_u16(rest,2) < 108 { return Err(()); }
    *config = Some(read_config(rest));
    Ok(())
}
#[inline(never)]
pub fn w1(data:&[u8]) -> Result<Option<TransferFeeConfig>,()> {
    if data.len()==MINT_LEN { return Ok(None); }
    if data.len()<ACCOUNT_LEN+2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b!=0) { return Err(()); }
    if data[ACCOUNT_LEN]!=1 { return Err(()); }
    let tlv=&data[ACCOUNT_LEN+1..]; let mut offset=0usize; let mut config=None;
    loop {
        let rest=tlv.get(offset..).ok_or(())?;
        if rest.len()<2 { return Ok(config); }
        let tag=read_u16(rest,0);
        if tag==0 { return Ok(config); }
        if rest.len()<4 { return Err(()); }
        let length=read_u16(rest,2) as usize; let entry_len=length+4;
        if entry_len>rest.len() { return Err(()); }
        if tag==1 { store_cfg(rest,&mut config)?; }
        offset=offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn w2(data:&[u8]) -> Result<Option<TransferFeeConfig>,()> {
    if data.len()==MINT_LEN { return Ok(None); }
    if data.len()<ACCOUNT_LEN+2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b!=0) { return Err(()); }
    if data[ACCOUNT_LEN]!=1 { return Err(()); }
    let tlv=&data[ACCOUNT_LEN+1..]; let mut offset=0usize; let mut config=None;
    loop {
        let rest=tlv.get(offset..).ok_or(())?;
        if rest.len()<2 { return Ok(config); }
        let tag=read_u16(rest,0);
        if tag==0 { return Ok(config); }
        if rest.len()<4 { return Err(()); }
        let length=read_u16(rest,2) as usize; let entry_len=length+4;
        if entry_len>rest.len() { return Err(()); }
        if tag==1 {
            if config.is_some() { return Err(()); }
            if length<108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset=offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline]
fn check_len(length:usize)->Result<(),()>{ if length<108 {Err(())} else {Ok(())} }
#[inline]
fn check_dup(config:&Option<TransferFeeConfig>)->Result<(),()>{ if config.is_some() {Err(())} else {Ok(())} }
#[inline(never)]
pub fn w3(data:&[u8]) -> Result<Option<TransferFeeConfig>,()> {
    if data.len()==MINT_LEN { return Ok(None); }
    if data.len()<ACCOUNT_LEN+2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b!=0) { return Err(()); }
    if data[ACCOUNT_LEN]!=1 { return Err(()); }
    let tlv=&data[ACCOUNT_LEN+1..]; let mut offset=0usize; let mut config=None;
    loop {
        let rest=tlv.get(offset..).ok_or(())?;
        if rest.len()<2 { return Ok(config); }
        let tag=read_u16(rest,0);
        if tag==0 { return Ok(config); }
        if rest.len()<4 { return Err(()); }
        let length=read_u16(rest,2) as usize; let entry_len=length+4;
        if entry_len>rest.len() { return Err(()); }
        if tag==1 {
            check_dup(&config)?;
            check_len(length)?;
            config = Some(read_config(rest));
        }
        offset=offset.checked_add(entry_len).ok_or(())?;
    }
}
