#![no_std]

const ONE_IN_BASIS_POINTS: u128 = 10_000;

#[derive(Clone, Copy, Debug)]
pub struct DecodedTransferFee {
    pub epoch: u64,
    pub maximum_fee: u64,
    pub transfer_fee_basis_points: u16,
}

impl DecodedTransferFee {
    #[inline(never)]
pub fn calculate_fee(&self, amount:u64)->Option<u64> {
    if amount==0 {return Some(0); }
    let bps=self.transfer_fee_basis_points as u128;
    if bps==0 { return Some(0); }
    let n=(amount as u128).checked_mul(bps)?;
    let raw=n.checked_add(10000)?.checked_sub(1)?.checked_div(10000)?.try_into().ok()?;
    Some(core::cmp::min(raw,self.maximum_fee))
}

    #[inline(never)]
    pub fn calculate_pre_fee_amount(&self, post_fee_amount: u64) -> Option<u64> {
        let transfer_fee_basis_points = self.transfer_fee_basis_points as u128;
        match (transfer_fee_basis_points, post_fee_amount) {
            (0, _) => Some(post_fee_amount),
            (_, 0) => Some(0),
            (ONE_IN_BASIS_POINTS, _) => self.maximum_fee.checked_add(post_fee_amount),
            _ => {
                let numerator = (post_fee_amount as u128).checked_mul(ONE_IN_BASIS_POINTS)?;
                let denominator = ONE_IN_BASIS_POINTS.checked_sub(transfer_fee_basis_points)?;
                let raw_pre_fee_amount = Self::ceil_div(numerator, denominator)?;

                if raw_pre_fee_amount.checked_sub(post_fee_amount as u128)? >= self.maximum_fee as u128 {
                    post_fee_amount.checked_add(self.maximum_fee)
                } else {
                    u64::try_from(raw_pre_fee_amount).ok()
                }
            }
        }
    }

    fn ceil_div(numerator: u128, denominator: u128) -> Option<u128> {
        numerator
            .checked_add(denominator)?
            .checked_sub(1)?
            .checked_div(denominator)
    }
}

/// Accepts legacy SPL mints and Token-2022 mints whose extensions PumpSwap supports.
pub fn supported_mint_data(data: &[u8], allow_extensions: bool) -> bool {
    if data.len() == 82 {
        return true;
    }
    if data.len() < 167 {
        return false;
    }
    if data[82..165].iter().any(|byte| *byte != 0) || data[165] != 1 {
        return false;
    }
    let tlv = &data[166..];
    let mut offset = 0usize;
    let mut seen = 0u32;
    loop {
        let remaining = match tlv.get(offset..) {
            Some(remaining) => remaining,
            None => return false,
        };
        if remaining.len() < 2 {
            return true;
        }
        let kind = u16::from_le_bytes(remaining[..2].try_into().unwrap());
        if kind == 0 {
            return true;
        }
        if remaining.len() < 4 {
            return false;
        }
        let length = u16::from_le_bytes(remaining[2..4].try_into().unwrap()) as usize;
        let entry_size = length + 4;
        if entry_size > remaining.len() {
            return false;
        }
        let supported = match kind {
            1 | 4 | 6 | 12 | 14 | 16 | 25 | 26 => allow_extensions,
            18 | 19 => true,
            _ => false,
        };
        if !supported {
            return false;
        }
        let bit = 1u32 << kind;
        if seen & bit != 0 {
            return false;
        }
        match kind {
            1 => { if length < 108 { return false; } },
            6 => { if length == 0 || remaining[4] != 1 { return false; } },
            14 => { if length < 64 || remaining[36..68].iter().any(|byte| *byte != 0) { return false; } },
            _ => {},
        }
        seen |= bit;
        offset = match offset.checked_add(entry_size) {
            Some(next) => next,
            None => return false,
        };
    }
}

fn read_fee(bytes: &[u8]) -> DecodedTransferFee {
    DecodedTransferFee {
        epoch: u64::from_le_bytes(bytes[..8].try_into().unwrap()),
        maximum_fee: u64::from_le_bytes(bytes[8..16].try_into().unwrap()),
        transfer_fee_basis_points: u16::from_le_bytes(bytes[16..18].try_into().unwrap()),
    }
}

/// Extract the epoch fee pair while validating the Token-2022 mint TLV envelope.
pub fn decode_transfer_fees(
    data: &[u8],
) -> Result<Option<(DecodedTransferFee, DecodedTransferFee)>, ()> {
    let is_mint = data.len() == 82;
    if !is_mint && data.len() < 167 {
        return Err(());
    }
    if is_mint {
        return Ok(None);
    }
    if data[82..165].iter().any(|byte| *byte != 0) {
        return Err(());
    }
    if data[165] != 1 {
        return Err(());
    }
    let tlv = &data[166..];
    let mut fees = None;
    let mut offset = 0usize;
    loop {
        let remaining = match tlv.get(offset..) {
            Some(remaining) => remaining,
            None => return Err(()),
        };
        if remaining.len() < 2 {
            return Ok(fees);
        }
        let kind = u16::from_le_bytes(remaining[..2].try_into().unwrap());
        let is_fee_config = kind == 1;
        if kind == 0 {
            return Ok(fees);
        }
        if remaining.len() < 4 {
            return Err(());
        }
        let length = u16::from_le_bytes(remaining[2..4].try_into().unwrap()) as usize;
        let entry_size = length + 4;
        let value = match remaining.get(4..entry_size) {
            Some(value) => value,
            None => return Err(()),
        };
        if is_fee_config {
            if fees.is_some() {
                return Err(());
            }
            if length < 108 {
                return Err(());
            }
            fees = Some((read_fee(&value[72..90]), read_fee(&value[90..108])));
        }
        offset = match offset.checked_add(entry_size) {
            Some(next) => next,
            None => return Err(()),
        };
    }
}
