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
pub fn v_abbbbabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbbabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbbadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbbadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbbadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbbadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbbbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbbbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbbbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbbbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbbbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbbbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbbbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbbbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbbbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbbbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_abbbbbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbbbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_abbbcaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbbcbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcaaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcaaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcaaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcaaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcaabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcaabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcaabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcaabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcaadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcaadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcaadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcaadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcabaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcabaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcababk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcababk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcabbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcabbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcabbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcabbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcabdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcabdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcabdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcabdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        let Some(_) = rest.get(..4) else { return Err(()) };
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
pub fn v_abbcbaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbcbbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_abbccbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaaaaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaaaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaaaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaaaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaaabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaaabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaaabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaaabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaaadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaaadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaaadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaaadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaabaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaabaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaababk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaababk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaabbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaabbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaabbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaabbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaabdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaabdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaabdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaaabdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaabaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaabaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaabaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaabaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaababak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaababak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaababbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaababbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaabadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaabadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaabadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
pub fn v_baaabadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
        if rest.len() < 2 { return Ok(config) }
        let tag = read_u16(rest, 0);
        if tag == 0 { return Ok(config) }
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
