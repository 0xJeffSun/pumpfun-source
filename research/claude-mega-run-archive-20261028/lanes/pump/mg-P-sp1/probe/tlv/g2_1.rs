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
pub fn v_aaacaabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacaabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacaadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacaadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacaadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacaadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacabaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacabaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacababk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacababk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacabbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacabbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacabbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacabbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacabdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacabdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacabdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacabdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
pub fn v_aaacbbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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

#[inline(never)]
pub fn v_aaacbbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_aaacbbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
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
        offset = match offset.checked_add(entry_len) { Some(o) => o, None => return Err(()) };
    }
}

#[inline(never)]
pub fn v_aaacbbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaacbbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaacbbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaacbbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aaaccbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaaaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaaaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaaaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaaaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaaabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaaabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaaabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaaabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaaadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaaadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaaadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaaadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaabaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaabaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaababk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaababk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaabbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaabbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaabbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaabbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaabdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaabdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaabdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabaabdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabababak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabababak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabababbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabababbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aababbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabacbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabbaaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabbaaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabbaaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabbaaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabbaabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabbaabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabbaabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabbaabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabbaadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabbaadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabbaadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
pub fn v_aabbaadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { return Ok(config) }
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
