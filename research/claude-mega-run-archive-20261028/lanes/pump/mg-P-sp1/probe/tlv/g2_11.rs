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
pub fn v_bbbbcbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbbcbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbbcbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbbcbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbbcbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbbcbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcaaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcaaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcaaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcaaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcaabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcaabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcaabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcaabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcaadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcaadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcaadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcaadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcabaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcabaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcababk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcababk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcabbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcabbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcabbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcabbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcabdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcabdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcabdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcabdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbcbbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccaaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccaaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccaabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccaabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccabak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccabak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccabbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccabbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccadak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccadak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccadbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccadbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccbaak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccbaak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccbabk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccbabk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccbbak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccbbak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccbbbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccbbbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccbdak1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccbdak3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccbdbk1(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
pub fn v_bbbccbdbk3(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN { return Ok(None); }
    if data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if data[ACCOUNT_LEN] != 1 { return Err(()); }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let Some(rest) = tlv.get(offset..) else { return Err(()) };
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
