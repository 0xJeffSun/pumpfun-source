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

impl TransferFeeConfig {
    #[inline]
    pub fn get_epoch_fee(&self, epoch: u64) -> &Fee {
        if epoch >= self.newer_transfer_fee.epoch {
            &self.newer_transfer_fee
        } else {
            &self.older_transfer_fee
        }
    }
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

/// Native Token-2022 mint parser: returns the TransferFeeConfig extension, if any.
#[inline(never)]
pub fn get_transfer_fee_config(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> {
    if data.len() == MINT_LEN {
        return Ok(None);
    }
    if data.len() < ACCOUNT_LEN + 2 {
        return Err(());
    }
    if data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) {
        return Err(());
    }
    if data[ACCOUNT_LEN] != 1 {
        return Err(());
    }
    let tlv = &data[ACCOUNT_LEN + 1..];
    let mut offset = 0usize;
    let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 {
            break;
        }
        let tag = read_u16(rest, 0);
        if tag == 0 {
            break;
        }
        if rest.len() < 4 {
            return Err(());
        }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() {
            return Err(());
        }
        if tag == 1 {
            if config.is_some() {
                return Err(());
            }
            if length < 108 {
                return Err(());
            }
            config = Some(TransferFeeConfig {
                older_transfer_fee: Fee {
                    epoch: read_u64(rest, 76),
                    maximum_fee: read_u64(rest, 84),
                    basis_points: read_u16(rest, 92),
                },
                newer_transfer_fee: Fee {
                    epoch: read_u64(rest, 94),
                    maximum_fee: read_u64(rest, 102),
                    basis_points: read_u16(rest, 110),
                },
            });
        }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config)
}

#[inline(never)]
pub fn quote_extensions_supported(data:&[u8],allow_token_extensions:bool)->bool {
 if data.len()==82{return true;}
 if data.len()<167 || data[82..165].iter().any(|&b|b!=0) || data[165]!=1{return false;}
 let tlv=&data[166..];
 let mut seen=0u64;
 let mut offset=0usize;
 loop{
  let Some(rest)=tlv.get(offset..) else {return false};
  if rest.len()<2{return true;}
  let kind=u16::from_le_bytes(rest[..2].try_into().unwrap());
  if kind==0{return true;}
  if rest.len()<4{return false;}
  let size=u16::from_le_bytes(rest[2..4].try_into().unwrap()) as usize;
  if size+4>rest.len(){return false;}
  match kind{
   18|19=>{},
   1|4|6|12|14|16|25|26=>if !allow_token_extensions{return false;},
   _=>return false,
  }
  let bit=1u64<<kind;
  if seen&bit!=0{return false;}
  if !extension_data_valid(kind,&rest[4..size+4]){return false;}
  seen|=bit;
  offset=match offset.checked_add(size+4){Some(next)=>next,None=>return false};
 }
}
fn extension_data_valid(kind:u16,bytes:&[u8])->bool{
 match kind{
  14=>bytes.len()>=64 && bytes[32..64].iter().all(|&b|b==0),
  6=>!bytes.is_empty() && bytes[0]==1,
  1=>bytes.len()>=108,
  _=>true,
 }
}

macro_rules! cfg_of { ($rest:expr) => { TransferFeeConfig {
    older_transfer_fee: Fee { epoch: read_u64($rest, 76), maximum_fee: read_u64($rest, 84), basis_points: read_u16($rest, 92) },
    newer_transfer_fee: Fee { epoch: read_u64($rest, 94), maximum_fee: read_u64($rest, 102), basis_points: read_u16($rest, 110) } } } }
macro_rules! head { ($data:expr) => {
    if $data.len() == MINT_LEN { return Ok(None); }
    if $data.len() < ACCOUNT_LEN + 2 { return Err(()); }
    if $data[MINT_LEN..ACCOUNT_LEN].iter().any(|b| *b != 0) { return Err(()); }
    if $data[ACCOUNT_LEN] != 1 { return Err(()); } } }

#[inline(never)] pub fn x_aaaaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaaaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaaaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaaaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaaabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaaabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaabaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaabab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaabad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaabba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaabbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaabbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaacaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaacab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaacad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaacba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaacbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaacbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aababa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aababb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aababd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabcaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabcab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabcad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabcba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabcbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aabcbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aacaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aacaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aacaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aacaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aacabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aacabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aacbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aacbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aacbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aacbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aacbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aacbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaccaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaccab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaccad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaccba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaccbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_aaccbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abaaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abaaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abaaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abaaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abaabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abaabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ababaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ababab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ababad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ababba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ababbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ababbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abacaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abacab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abacad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abacba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abacbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abacbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbcaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbcab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbcad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbcba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbcbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abbcbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abcaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abcaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abcaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abcaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abcabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abcabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abcbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abcbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abcbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abcbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abcbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abcbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abccaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abccab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abccad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abccba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abccbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_abccbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acaaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acaaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acaaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acaaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acaabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acaabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acabaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acabab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acabad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acabba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acabbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acabbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acacaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acacab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acacad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acacba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acacbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acacbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbcaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbcab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbcad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbcba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbcbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acbcbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_accaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_accaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_accaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_accaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_accabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_accabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_accbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_accbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_accbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_accbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_accbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_accbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acccaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acccab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acccad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acccba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acccbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_acccbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.len() < 2 { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baaaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baaaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baaaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baaaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baaabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baaabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baabaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baabab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baabad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baabba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baabbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baabbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baacaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baacab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baacad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baacba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baacbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baacbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bababa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bababb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bababd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babcaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babcab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babcad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babcba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babcbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_babcbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bacaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bacaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bacaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bacaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bacabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bacabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bacbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bacbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bacbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bacbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bacbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bacbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baccaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baccab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baccad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baccba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baccbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_baccbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbaaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbaaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbaaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbaaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbaabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbaabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbabaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbabab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbabad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbabba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbabbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbabbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbacaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbacab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbacad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbacba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbacbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbacbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbcaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbcab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbcad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbcba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbcbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbbcbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbcaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbcaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbcaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbcaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbcabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbcabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbcbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbcbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbcbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbcbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbcbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbcbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbccaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbccab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbccad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbccba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbccbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bbccbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcaaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcaaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcaaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcaaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcaabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcaabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcabaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcabab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcabad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcabba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcabbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcabbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcacaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcacab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcacad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcacba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcacbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcacbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbcaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbcab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbcad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbcba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbcbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcbcbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bccaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bccaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bccaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bccaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bccabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bccabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bccbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bccbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bccbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bccbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bccbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bccbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcccaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcccab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcccad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcccba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcccbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_bcccbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        let Some(_) = rest.get(..2) else { break };
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caaaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caaaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caaaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caaaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caaabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caaabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caabaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caabab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caabad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caabba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caabbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caabbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caacaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caacab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caacad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caacba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caacbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caacbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cababa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cababb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cababd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabcaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabcab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabcad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabcba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabcbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cabcbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cacaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cacaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cacaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cacaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cacabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cacabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cacbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cacbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cacbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cacbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cacbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cacbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caccaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caccab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caccad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caccba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caccbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_caccbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag == 0 { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbaaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbaaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbaaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbaaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbaabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbaabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbabaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbabab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbabad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbabba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbabbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbabbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbacaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbacab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbacad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbacba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbacbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbacbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbcaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbcab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbcad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbcba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbcbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbbcbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbcaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbcaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbcaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbcaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbcabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbcabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbcbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbcbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbcbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbcbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbcbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbcbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbccaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbccab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbccad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbccba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbccbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cbccbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        match tag { 0 => break, _ => {} }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccaaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccaaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccaaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccaaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccaabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccaabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccabaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccabab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccabad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccabba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccabbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccabbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccacaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccacab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccacad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccacba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccacbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccacbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        if rest.len() < 4 { return Err(()); }
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbcaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbcab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbcad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbcba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbcbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccbcbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        rest.get(2..4).ok_or(())?;
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cccaaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cccaab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cccaad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cccaba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cccabb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cccabd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        if entry_len > rest.len() { return Err(()); }
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cccbaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cccbab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cccbad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cccbba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cccbbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_cccbbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        rest.get(..entry_len).ok_or(())?;
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccccaa(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccccab(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccccad(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        if tag == 1 { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccccba(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { if config.is_some() { return Err(()); } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccccbb(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { let None = config else { return Err(()) }; if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }

#[inline(never)] pub fn x_ccccbd(data: &[u8]) -> Result<Option<TransferFeeConfig>, ()> { head!(data);
    let tlv = &data[ACCOUNT_LEN + 1..]; let mut offset = 0usize; let mut config = None;
    loop {
        let rest = tlv.get(offset..).ok_or(())?;
        if rest.get(..2).is_none() { break; }
        let tag = read_u16(rest, 0);
        if tag != 0 {} else { break; }
        let Some(_) = rest.get(..4) else { return Err(()) };
        let length = read_u16(rest, 2) as usize;
        let entry_len = length + 4;
        let Some(_) = rest.get(..entry_len) else { return Err(()) };
        match tag { 1 => { match config { Some(_) => return Err(()), None => {} } if length < 108 { return Err(()); } config = Some(cfg_of!(rest)); } _ => {} }
        offset = offset.checked_add(entry_len).ok_or(())?;
    }
    Ok(config) }
