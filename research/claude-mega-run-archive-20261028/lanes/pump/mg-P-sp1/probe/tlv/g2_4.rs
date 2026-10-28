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
#[inline(never)]
pub fn v_abacbaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abacbaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abacbaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abacbaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abacbabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abacbabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abacbabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abacbabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abacbadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abacbadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abacbadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abacbadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abacbbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abacbbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abacbbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abacbbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abacbbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abacbbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abacbbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abacbbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abacbbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abacbbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abacbbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abacbbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abaccaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abaccaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abaccaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abaccaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abaccabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abaccabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abaccabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abaccabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abaccadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abaccadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abaccadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abaccadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abaccbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abaccbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abaccbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abaccbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abaccbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abaccbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abaccbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abaccbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abaccbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abaccbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abaccbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abaccbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbaaaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbaaaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbaaaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbaaaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbaaabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbaaabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbaaabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbaaabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbaaadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbaaadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbaaadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbaaadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbaabaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbaabaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbaababk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbaababk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbaabbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbaabbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbaabbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbaabbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbaabdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbaabdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbaabdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbaabdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbabaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbabaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbabaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbabaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbababak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbababak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbababbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbababbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbabadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbabadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbabadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbabadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbabbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbabbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbabbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbabbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbabbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbabbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbabbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbabbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbabbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbabbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbabbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbabbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbacaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbacaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbacaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbacaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbacabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbacabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbacabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbacabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbacadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbacadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbacadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbacadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbacbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbacbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbacbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbacbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbacbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbacbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbacbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbacbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbacbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbacbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbacbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbacbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbaaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbaaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbaaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbaaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbaabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbaabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbaabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbaabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbaadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbaadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbaadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbaadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbabaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbabaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbababk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbababk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbabbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbabbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbabbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbabbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbabdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbabdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbabdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbabdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbbaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbbaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbbaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbbaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbbabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee { epoch: read_u64(rest, 76), maximum_fee: read_u64(rest, 84), basis_points: read_u16(rest, 92) },
                newer_transfer_fee: Fee { epoch: read_u64(rest, 94), maximum_fee: read_u64(rest, 102), basis_points: read_u16(rest, 110) },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbbabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { return Ok(config) };
        let tag = read_u16(rest, 0);
        match tag { 0 => return Ok(config), _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}
