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
pub fn v_baaabbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaabbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_baaabbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaabbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        match tag { 1 => {
            if config.is_some() { return Err(()); }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_baaabbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaabbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_baaabbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaabbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        match tag { 1 => {
            let None = config else { return Err(()) };
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_baaabbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaabbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
}

#[inline(never)]
pub fn v_baaabbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaabbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
        match tag { 1 => {
            match config { Some(_) => return Err(()), None => {} }
            if length < 108 { return Err(()); }
            config = Some(read_config(rest));
        } _ => {} }
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_baaacaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baaacbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabaaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabaaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabaaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabaaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabaabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabaabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabaabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabaabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabaadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabaadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabaadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabaadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baababaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baababaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabababk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabababk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baababbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baababbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baababbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baababbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baababdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baababdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baababdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baababdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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

#[inline(never)]
pub fn v_baabbabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabbbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baabcbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacaaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacaaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacaaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacaaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacaabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacaabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacaabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacaabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacaadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacaadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacaadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacaadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacabaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacabaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacababk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacababk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacabbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacabbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacabbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacabbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacabdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacabdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacabdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacabdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
pub fn v_baacbbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
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
